package com.anmory.allinone.model;

import lombok.Data;

import java.util.Date;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午3:41
 */

@Data
public class Photo {
    private Integer photoId;
    private Integer userId;
    private String name;
    private String path;
    private Float size;
    private String place;
    private Date createAt;
    private Date updateAt;
}
