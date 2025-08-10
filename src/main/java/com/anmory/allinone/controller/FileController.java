package com.anmory.allinone.controller;

import com.anmory.allinone.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午4:20
 */

@Slf4j
@RestController
@RequestMapping("/file")
public class FileController {
    @Autowired
    private FileService fileService;

    @RequestMapping("/upload")
    public int upload(@RequestParam("file") MultipartFile file, String cate, Integer userId) throws IOException {
        String name = file.getOriginalFilename();
        String size = file.getSize() + "";
        String type = file.getContentType();
        String path = "/usr/local/nginx/files/station/" + name;
        java.io.File dir  = new File("/usr/local/nginx/files/station/");
        if(!dir.exists()){
            dir.mkdirs();
        }
        FileOutputStream fos = new FileOutputStream(path);
        fos.write(file.getBytes());
        log.info("文件上传成功");
        fos.close();
        return fileService.insert(name, path, cate, Float.parseFloat(size), type, userId);
    }

    @RequestMapping("/delete")
    public int delete(Integer fileId) {
        if(fileId == null) return 0;
        com.anmory.allinone.model.File file = fileService.selectById(fileId);
        if(fileService.delete(fileId) > 0) {
            new File(file.getPath()).delete();
            log.info("文件删除成功");
        }
        log.info("delete file: fileId={}", fileId);
        return 1;
    }

    @RequestMapping("download")
    public File download(Integer fileId) {
        log.info("download file: fileId={}", fileId);
        com.anmory.allinone.model.File file = fileService.selectById(fileId);
        if(file == null) return null;
        return new File(file.getPath());
    }

    @RequestMapping("/selectByUserId")
    public List<com.anmory.allinone.model.File> selectByUserId(Integer userId) {
        log.info("select file by userId: userId={}", userId);
        return fileService.selectByUserId(userId);
    }
}
