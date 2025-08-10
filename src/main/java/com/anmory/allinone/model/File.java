package com.anmory.allinone.model;

import lombok.Data;

import java.util.Date;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午3:51
 */

@Data
public class File {
    private Integer fileId;
    private Integer userId;
    private Integer parentId;
    private String cate; // 分类
    private String name;
    private String path;
    private Float size;
    private String type;
    private Date createAt;
    private Date updateAt;
}
