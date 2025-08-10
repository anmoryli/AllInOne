package com.anmory.allinone.service;

import com.anmory.allinone.mapper.AiMapper;
import com.anmory.allinone.model.Ai;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-10 下午6:09
 */

@Service
public class AiService {
    @Autowired
    private AiMapper aiMapper;

    public int insert(String query, String content, Integer userId) {
        return aiMapper.insert(query, content, userId);
    }

    public List<Ai> selectByUserId(Integer userId) {
        return aiMapper.selectByUserId(userId);
    }
}
