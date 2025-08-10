package com.anmory.allinone.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeoutException;

/**
 * @author Anmory
 * @description 人脸/视频互换API服务
 * @date 2025-08-09 下午8:51
 */

@Service
public class ApiService {

    // 移除URL中的"POST"，仅保留正确的API地址
    private static final String API_URL = "https://api.vmodel.ai/api/tasks/v1/create";
//    private static final String apiToken = "-nLFIxYm0jkrdMGVVuky9T4Qntw7IqRVI83z2SjAgIf-v4KfYCcwg1on2VBGJ0MSzxRNgZRpV9PGXRhaswYSMA==";
    private static final String apiToken = System.getenv("SWAP_API_KEY");
    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JsonNode sendFaceSwapRequest(String swapImageUrl, String targetImageUrl, String type) throws Exception {
        String version = getVersion(type);
        System.out.println("API版本: " + version);
        if (version == null) {
            throw new IllegalArgumentException("无效的类型参数: " + type);
        }

        boolean disableSafetyChecker = true; // 根据实际需求调整

        Map<String, Object> requestBody = new HashMap<>();

        if(type.equals("imgSwap")) {
            // 构建请求体
            requestBody.put("version", version);

            Map<String, Object> input = new HashMap<>();
            input.put("swap_image", swapImageUrl);
            input.put("target_image", targetImageUrl);
            input.put("disable_safety_checker", disableSafetyChecker);
            requestBody.put("input", input);
        }
        else if(type.equals("videoSwap")) {
            // 构建请求体
            requestBody.put("version", version);

            Map<String, Object> input = new HashMap<>();
            input.put("target", swapImageUrl);
            input.put("source", targetImageUrl);
            input.put("disable_safety_checker", disableSafetyChecker);
            requestBody.put("input", input);
        }

        // 转换为JSON字符串
        String jsonBody = objectMapper.writeValueAsString(requestBody);
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

        // 解析JSON响应并返回
        return objectMapper.readTree(response.body());
    }

    // 假设在ApiService类中新增或修改此方法
    public JsonNode getTaskResult(JsonNode createTaskResponse) throws Exception {
        // 1. 从创建任务的响应中解析出task_id
        String taskId = null;
        if (createTaskResponse != null && createTaskResponse.has("code")
                && createTaskResponse.get("code").asInt() == 200) {

            // 检查result字段和task_id是否存在
            if (createTaskResponse.has("result")
                    && createTaskResponse.get("result").has("task_id")) {

                taskId = createTaskResponse.get("result").get("task_id").asText();
                System.out.println("task_id: " + taskId);
            } else {
                throw new IllegalArgumentException("创建任务响应中缺少task_id");
            }
        } else {
            throw new IllegalArgumentException("创建任务响应格式错误或请求失败");
        }

        // 2. 构建查询任务的URL
        String API_URL_GET = "https://api.vmodel.ai/api/tasks/v1/get/";
        String fullUrl = API_URL_GET + taskId;
        System.out.println("查询URL: " + fullUrl);

        // 3. 构建GET请求
//        String apiToken = "-nLFIxYm0jkrdMGVVuky9T4Qntw7IqRVI83z2SjAgIf-v4KfYCcwg1on2VBGJ0MSzxRNgZRpV9PGXRhaswYSMA==";
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(fullUrl))
                .header("Authorization", "Bearer " + apiToken)
                .header("Content-Type", "application/json")
                .GET()
                .build();

        // 4. 循环查询直到任务完成或失败
        int maxRetries = 100; // 最大重试次数
        int retryInterval = 3000; // 重试间隔(毫秒)，3秒
        int retryCount = 0;
        JsonNode taskResult = null;

        while (retryCount < maxRetries) {
            // 发送请求
            HttpResponse<String> response = httpClient.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );
            taskResult = objectMapper.readTree(response.body());
            System.out.println("第" + (retryCount + 1) + "次查询结果: " + taskResult);

            // 检查任务状态
            if (taskResult.has("result") && taskResult.get("result").has("status")) {
                String status = taskResult.get("result").get("status").asText();

                if ("succeeded".equals(status)) {
                    // 任务成功完成，返回结果
                    System.out.println("任务已完成，获取到output");
                    return taskResult;
                } else if ("failed".equals(status)) {
                    // 任务失败，抛出异常
                    String errorMsg = taskResult.get("result").has("error")
                            ? taskResult.get("result").get("error").asText()
                            : "未知错误";
                    throw new RuntimeException("任务执行失败: " + errorMsg);
                }
            }

            // 任务仍在处理中，等待后重试
            retryCount++;
            if (retryCount < maxRetries) {
                System.out.println("任务处理中，等待" + retryInterval + "ms后重试...");
                Thread.sleep(retryInterval);
            }
        }

        // 超过最大重试次数仍未完成
        throw new TimeoutException("任务处理超时，超过最大等待次数(" + maxRetries + ")");
    }

    public String parseJson(JsonNode jsonNode) {
        // 校验输入不为空
        if (jsonNode == null) {
            return null;
        }

        try {
            // 检查是否存在result节点
            if (jsonNode.has("result")) {
                JsonNode resultNode = jsonNode.get("result");

                // 检查是否存在output节点且状态为成功
                if (resultNode.has("output") &&
                        resultNode.has("status") &&
                        "succeeded".equals(resultNode.get("status").asText())) {

                    JsonNode outputNode = resultNode.get("output");

                    // 检查output是否为数组且包含元素
                    if (outputNode.isArray() && outputNode.size() > 0) {
                        // 返回数组第一个元素（图片URL）
                        return outputNode.get(0).asText();
                    }
                }
            }
        } catch (Exception e) {
            // 处理解析异常
            System.err.println("解析JSON失败: " + e.getMessage());
        }

        // 所有检查失败时返回null
        return null;
    }




    public String getVersion(String type) {
        if ("imgSwap".equals(type)) { // 用equals常量在前避免空指针
            return "a3c8d261fd14126eececf9812b52b40811e9ed557ccc5706452888cdeeebc0b6";
        } else if ("videoSwap".equals(type)) {
            return "537e83f7ed84751dc56aa80fb2391b07696c85a49967c72c64f002a0ca2bb224";
        }
        return null;
    }
}