package com.anmory.allinone.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-10 下午4:39
 */

@Slf4j
@RestController
@RequestMapping("/heart")
public class HeartController {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String API_URL = "https://api.coze.cn/v1/workflow/run";
    private static final String apiToken = System.getenv("COZE_API_KEY");
    private final HttpClient httpClient = HttpClient.newHttpClient();

    @RequestMapping("/chat")
    public String chat(String query) throws IOException, InterruptedException {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("workflow_id", "7536868691222544425");

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("input", query);
        requestBody.put("parameters", parameters);

        // 转换为JSON字符串
        String jsonBody = objectMapper.writeValueAsString(requestBody);
        System.out.println("jsonBody: " + jsonBody);
        System.out.println("apiToken: " + apiToken);

        // 构建HTTP请求（方法通过POST()指定，无需在URL中包含）
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL)) // 此处仅使用正确的URL
                .header("Authorization", "Bearer " + apiToken)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody)) // 通过该方法指定POST请求
                .build();

        // 发送请求并获取响应
        HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString()
        );

        System.out.println(response.body());

        String responseBody = response.body();
        String output = "";
        // 返回json里面的data
        try {
            // 创建 ObjectMapper 实例
            ObjectMapper objectMapper = new ObjectMapper();

            // 解析外层 JSON
            JsonNode rootNode = objectMapper.readTree(responseBody);

            // 获取 data 字段（字符串化的 JSON）
            String dataString = rootNode.get("data").asText();

            // 再次解析 data 字符串为 JSON 对象
            JsonNode dataNode = objectMapper.readTree(dataString);

            // 提取 output 字段
            output = dataNode.get("output").asText();

            // 打印结果
            System.out.println("提取的 output 内容: " + output);

        } catch (Exception e) {
            System.err.println("解析 JSON 失败: " + e.getMessage());
        }
        return output;
    }
}
