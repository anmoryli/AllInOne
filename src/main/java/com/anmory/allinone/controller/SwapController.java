package com.anmory.allinone.controller;

import com.anmory.allinone.model.Photo;
import com.anmory.allinone.model.Swap;
import com.anmory.allinone.service.ApiService;
import com.anmory.allinone.service.PhotoService;
import com.anmory.allinone.service.SwapService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-09 下午8:44
 */

@Slf4j
@RestController
@RequestMapping("/swap")
public class SwapController {
    @Autowired
    private SwapService swapService;
    @Autowired
    private ApiService apiService;
    @Autowired
    private PhotoService photoService;

    @RequestMapping("/swapImgFile")
    public String swapFace(String type,
                          MultipartFile src,
                          MultipartFile dst,
                          Integer userId) throws Exception {
        // 1.处理文件上传流程
        String srcName = src.getOriginalFilename();
        String dstName = dst.getOriginalFilename();
        log.info("src: " + src);
        log.info("dst: " + dst);
        String sSrcPath = "/usr/local/nginx/files/station/" + srcName;
        String sDstPath = "/usr/local/nginx/files/station/" + dstName;

        log.info("srcPath: " + sSrcPath);
        log.info("dstPath: " + sDstPath);

        File dir = new File("/usr/local/nginx/files/station");
        if(!dir.exists()) {
            dir.mkdirs();
        }
        FileOutputStream fosSrc = new FileOutputStream(sSrcPath);
        FileOutputStream fosDst = new FileOutputStream(sDstPath);

        fosSrc.write(src.getBytes());
        fosDst.write(dst.getBytes());
        log.info("文件上传成功");
        fosSrc.close();
        fosDst.close();
        // 2.调用接口进行换脸
        String finalDstPath = "http://anmory.com:96" + sDstPath;
        log.info("finalDstPath: " + finalDstPath);
        String finalSrcPath = "http://anmory.com:96" + sSrcPath;
        log.info("finalSrcPath: " + finalSrcPath);
        swapService.insert(finalSrcPath, finalDstPath, userId);
        JsonNode jsonNode = apiService.getTaskResult(apiService.sendFaceSwapRequest(finalDstPath, finalSrcPath, type));
        String ret = apiService.parseJson(jsonNode);
        Integer swapId = swapService.selectSwapIdBySrcPathAndDstPath(finalSrcPath, finalDstPath);
        swapService.updateSwapPath(ret, swapId);
        return ret;
    }

    @RequestMapping("/swapImgUrl")
    public String swapFaceUrl(String type,
                           String src,
                           String dst,
                           Integer userId) throws Exception {
        // 1.处理文件上传流程
        log.info("src: " + src);
        log.info("dst: " + dst);

        swapService.insert(src, dst, userId);
        // 2.调用接口进行换脸
        JsonNode jsonNode = apiService.getTaskResult(apiService.sendFaceSwapRequest(dst, src, type));
        String ret = apiService.parseJson(jsonNode);
        Integer swapId = swapService.selectSwapIdBySrcPathAndDstPath(src, dst);
        swapService.updateSwapPath(ret, swapId);
        return ret;
    }

    @RequestMapping("/updateForever")
    public boolean updateForever(Integer userId) {
        Swap swap = swapService.selectLastSwapByUserId(userId);
        Photo photo = photoService.selectLastPhotoByUserId(userId);
        String swapUrl = "http://anmory.com:96" + photo.getPath();
        swap.setSwapPath(swapUrl);
        swapService.updateSwapPath(swapUrl, swap.getSwapId());
        return true;
    }

    @RequestMapping("/selectByUserId")
    public List<Swap> selectByUserId(Integer userId) {
        return swapService.selectByUserId(userId);
    }
}
