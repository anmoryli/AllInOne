package com.anmory.allinone.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ApiServiceTest {

    @Autowired
    private ApiService apiService;
//    @Test
//    void sendFaceSwapRequest() throws Exception {
//        JsonNode ret = apiService.sendFaceSwapRequest(
//                "http://anmory.com:96/usr/local/nginx/files/station/jyz.jpg",
//                "http://anmory.com:96/usr/local/nginx/files/station/微信图片_20250809194753_44.jpg",
//                "imgSwap");
//        System.out.println(ret);
//    }
//
//    @Test
//    void getTaskResult() throws Exception {
//        JsonNode request = apiService.sendFaceSwapRequest(
//                "http://anmory.com:96/usr/local/nginx/files/station/jyz.jpg",
//                "http://anmory.com:96/usr/local/nginx/files/station/wawa.mp4",
//                "videoSwap");
//        System.out.println("request: " + request);
//        JsonNode ret = apiService.getTaskResult(request);
//        System.out.println("ret: " + ret);
//    }
    @Test
    void testImg() {
        try {
            URL url = new URL("https://api.yaohud.cn/api/v5/duitang?key=pv9eQ1A9BcnRW9msVP2&msg=漂亮小姐姐");
            HttpURLConnection connection = (HttpURLConnection)url.openConnection();

            // 设置请求方式
            connection.setRequestMethod("GET");
            connection.connect();

            // 获取响应码
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    // 读取到的内容给line变量
                    System.out.println(line);
                }
                reader.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}