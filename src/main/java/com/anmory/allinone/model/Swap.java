package com.anmory.allinone.model;

import lombok.Data;

import java.util.Date;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-09 下午8:38
 */

@Data
public class Swap {
    private Integer swapId;
    private Integer userId;
    private String srcPath;
    private String dstPath;
    private String swapPath;
    private Date createAt;
    private Date updateAt;
}
