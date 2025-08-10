package com.anmory.allinone.model;

import lombok.Data;

import java.util.Date;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-10 下午6:06
 */

@Data
public class Ai {
    private Integer aiId;
    private Integer userId;
    private String query;
    private String content;
    private Date createAt;
    private Date updateAt;
}
