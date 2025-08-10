package com.anmory.allinone.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.anmory.allinone.model.Ai;
import com.anmory.allinone.service.AiService;

import java.util.List;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-10 下午6:08
 */

@Slf4j
@RestController
@RequestMapping("/ai")
public class AiController {
    @Autowired
    private AiService aiService;

    @RequestMapping("/insert")
    public int insert(String query, String content, Integer userId) {
        log.info("insert ai: query={}, content={}, userId={}", query, content, userId);
        return aiService.insert(query, content, userId);
    }

    @RequestMapping("/selectByUserId")
    public List<Ai> selectByUserId(Integer userId) {
        log.info("select ai by userId: userId={}", userId);
        return aiService.selectByUserId(userId);
    }
}
