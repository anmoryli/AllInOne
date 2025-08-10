package com.anmory.allinone.model;

import lombok.Data;

import java.util.Date;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午4:51
 */

@Data
public class Todo {
    private Integer todoId;
    private Integer userId;
    private String content;
    private Integer isDone;
    private Date createdAt;
    private Date updatedAt;
}
