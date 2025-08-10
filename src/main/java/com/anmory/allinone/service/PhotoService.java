package com.anmory.allinone.service;

import com.anmory.allinone.mapper.PhotoMapper;
import com.anmory.allinone.model.Photo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午3:45
 */

@Service
public class PhotoService {
    @Autowired
    private PhotoMapper photoMapper;

    public int insert(String name, String path, Float size, String place, Integer userId) {
        return photoMapper.insert(name, path, size, place, userId);
    }

    public int delete(Integer photoId) {
        return photoMapper.delete(photoId);
    }

    public Photo selectById(Integer photoId) {
        return photoMapper.selectById(photoId);
    }

    public List<Photo> selectByUserId(Integer userId) {
        return photoMapper.selectByUserId(userId);
    }

    public Photo selectLastPhotoByUserId(Integer userId) {
        return photoMapper.selectLastPhotoByUserId(userId);
    }
}
