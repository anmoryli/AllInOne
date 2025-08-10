package com.anmory.allinone.service;

import com.anmory.allinone.mapper.UserMapper;
import com.anmory.allinone.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午3:12
 */

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public int insert(String username, String password, String email, String phone) {
        return userMapper.insert(username, password, email, phone);
    }

    public int uploadAvatar(String username, String avatar) {
        return userMapper.uploadAvatar(username, avatar);
    }

    public int bindEmail(String username, String email) {
        return userMapper.bindEmail(username, email);
    }

    public int bindPhone(String username, String phone) {
        return userMapper.bindPhone(username, phone);
    }

    public int changePassword(String username, String password) {
        return userMapper.changePassword(username, password);
    }

    public int delete(Integer userId) {
        return userMapper.delete(userId);
    }

    public User selectById(Integer userId) {
        return userMapper.selectById(userId);
    }

    public User selectByName(String name) {
        return userMapper.selectByName(name);
    }

    public List<User> selectAll() {
        return userMapper.selectAll();
    }
}
