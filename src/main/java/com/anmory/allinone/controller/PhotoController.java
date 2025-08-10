package com.anmory.allinone.controller;

import com.anmory.allinone.model.Photo;
import com.anmory.allinone.service.PhotoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午3:46
 */

@Slf4j
@RestController
@RequestMapping("/photo")
public class PhotoController {
    @Autowired
    private PhotoService photoService;
    @RequestMapping("/upload")
    public int insert(@RequestParam ("file") MultipartFile file, Integer userId) throws IOException {
        String name = file.getOriginalFilename();
        String size = file.getSize() + "";
        Resource res = file.getResource();
        String place = res.getDescription();
        String path = "/usr/local/nginx/files/station/" + name;
        java.io.File dir  = new File("/usr/local/nginx/files/station/");
        if(!dir.exists()){
            dir.mkdirs();
        }
        FileOutputStream fos = new FileOutputStream(path);
        fos.write(file.getBytes());
        log.info("文件上传成功");
        fos.close();
        return photoService.insert(name, path, Float.parseFloat(size), place, userId);
    }

    @RequestMapping("/download")
    public Photo download(Integer photoId) {
        log.info("download photo: photoId={}", photoId);
        return photoService.selectById(photoId);
    }

    @RequestMapping("/delete")
    public int delete(Integer photoId) {
        if(photoId == null) return 0;
        com.anmory.allinone.model.Photo file = photoService.selectById(photoId);
        if(photoService.delete(photoId) > 0) {
            new File(file.getPath()).delete();
            log.info("文件删除成功");
        }
        log.info("delete file: fileId={}", photoId);
        return 1;
    }

    @RequestMapping("/selectById")
    public List<Photo> selectById(Integer userId) {
        log.info("select photo by id: photoId={}", userId);
        return photoService.selectByUserId(userId);
    }
}
