package com.anmory.allinone.model;

import lombok.Data;

import java.util.Date;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午2:55
 */

@Data
public class User {
    private Integer userId;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String avatarPath;
    private String ipAddr;
    private Date createAt;
    private Date updateAt;
}
