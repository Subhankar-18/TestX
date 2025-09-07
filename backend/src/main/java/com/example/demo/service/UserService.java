package com.example.demo.service;

import com.example.demo.model.UserRole;
import com.example.demo.model.User;
import java.util.Set;


public interface UserService 
{
    //for creating user
    public User createUser(User user,Set<UserRole> roles) throws Exception;

    //get user by username
    public User getUser(String username);

    //delete user by id
    public void deleteUser(Long userId);

}
