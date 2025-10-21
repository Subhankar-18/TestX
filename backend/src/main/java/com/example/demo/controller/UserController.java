package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import com.example.demo.service.UserService;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/user")
public class UserController
{
    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

//creating user api
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception
    {    //Encoding password with Bcrpt
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        Set <UserRole>roles=new HashSet<>();
        Role role=new Role();
        role.setRoleId(45L);
        role.setRoleName("NORMAL");

        UserRole userRole=new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        roles.add(userRole);
        return this.userService.createUser(user, roles);
    }

    
//Separating Normal user from admin and dedicated endpoint
    @PostMapping("/admin")
    public User createAdmin(@RequestBody User user) throws Exception {
    user.setPassword(this.passwordEncoder.encode(user.getPassword()));

    Set<UserRole> roles = new HashSet<>();
    Role role = new Role();
    role.setRoleId(1L);
    role.setRoleName("ADMIN");
    UserRole userRole = new UserRole();
    userRole.setUser(user);
    userRole.setRole(role);
    roles.add(userRole);
    return this.userService.createUser(user, roles);
}


//get user by id
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username")String username)
    {
        return this.userService.getUser(username);
    }

   
   
    //delete user by id
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId")Long userId)
    {
        this.userService.deleteUser(userId);
    }
}