package com.anmory.allinone.service;

import com.anmory.allinone.mapper.FileMapper;
import com.anmory.allinone.model.File;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午4:21
 */

@Service
public class FileService {
    @Autowired
    private FileMapper fileMapper;

    public int insert(String name, String path, String cate, Float size, String type, Integer userId) {
        return fileMapper.insert(name, path, cate, size, type, userId);
    }

    public int delete(Integer fileId) {
        return fileMapper.delete(fileId);
    }

    public List<File> selectByUserId(Integer userId) {
        return fileMapper.selectByUserId(userId);
    }

    public File selectById(Integer fileId) {
        return fileMapper.selectById(fileId);
    }
}
