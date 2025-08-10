package com.anmory.allinone.controller;

import com.anmory.allinone.model.User;
import com.anmory.allinone.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午3:14
 */

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public User login(String username, String password, HttpSession  session) {
        if(username == null || password == null) return null;
        User user = userService.selectByName(username);
        if(user == null || !user.getPassword().equals(password)) return null;
        session.setAttribute("user", user);
        log.info("用户登录成功");
        return user;
    }

    @RequestMapping("/register")
    public User register(String username, String password, String email, String phone) {
        if(username == null || password == null) return null;
        User user = userService.selectByName(username);
        if(user != null) return null;
        log.info("用户注册成功");
        return userService.insert(username, password, email, phone) > 0 ? userService.selectByName(username) : null;
    }

    @RequestMapping("/logout")
    public void logout(HttpSession session) {
        session.removeAttribute("user");
        log.info("用户退出成功");
    }

    @RequestMapping("/delete")
    public int delete(Integer userId) {
        if(userId == null) return 0;
        log.info("用户删除成功");
        return userService.delete(userId);
    }

    @RequestMapping("/changePassword")
    public int changePassword(String username, String password) {
        if(username == null || password == null) return 0;
        log.info("用户修改密码成功");
        return userService.changePassword(username, password);
    }

    @RequestMapping("/uploadAvatar")
    public int uploadAvatar(String username, MultipartFile avatar) throws IOException {
        String name = avatar.getOriginalFilename();
        String path = "/usr/local/nginx/files/station/" + name;
        java.io.File dir  = new File("/usr/local/nginx/files/station/");
        if(!dir.exists()){
            dir.mkdirs();
        }
        FileOutputStream fos = new FileOutputStream(path);
        fos.write(avatar.getBytes());
        fos.close();
        if(username == null || avatar == null) return 0;
        log.info("用户上传头像成功");
        return userService.uploadAvatar(username, path);
    }

    @RequestMapping("/bindEmail")
    public int bindEmail(String username, String email) {
        if(username == null || email == null) return 0;
        log.info("用户绑定邮箱成功");
        return userService.bindEmail(username, email);
    }

    @RequestMapping("/bindPhone")
    public int bindPhone(String username, String phone) {
        if(username == null || phone == null) return 0;
        log.info("用户绑定手机成功");
        return userService.bindPhone(username, phone);
    }
}
