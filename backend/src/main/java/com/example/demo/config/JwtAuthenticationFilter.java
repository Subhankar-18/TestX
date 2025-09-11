package com.example.demo.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.model.User;
import com.example.demo.service.impl.UserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    
    @Autowired
    private JwtUtils jwtUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String requestTokenHeader=request.getHeader("Authorization");
        System.out.println(requestTokenHeader);
        String username=null;
        String jwtToken=null;

        if(requestTokenHeader!=null&&requestTokenHeader.startsWith("Bearer ")){
            jwtToken=requestTokenHeader.substring(7);
            try{
                username = this.jwtUtil.extractUsername(jwtToken);
            }catch(ExpiredJwtException e){
                e.printStackTrace();
                System.out.println("jwt token expired");
            }catch(Exception e){
                e.printStackTrace();
            }
            
        }else{
            System.out.println("Invalid token hello");
        }
        
        //Validate the toke

        if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            final UserDetails userdetails=this.userDetailsServiceImpl.loadUserByUsername(username);
            if(this.jwtUtil.validateToken(jwtToken, userdetails)){
                //token is valid

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=
                new UsernamePasswordAuthenticationToken (userdetails,null,userdetails.getAuthorities());

                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }}
            else{
                System.out.println("Toekn in not valid");
            }

            filterChain.doFilter(request, response);

        }
    }
    
