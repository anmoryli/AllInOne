package com.anmory.allinone.service;

import com.anmory.allinone.mapper.TodoMapper;
import com.anmory.allinone.model.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午4:54
 */

@Service
public class TodoService {
    @Autowired
    private TodoMapper todoMapper;

    public int insert(String content, Integer userId) {
        return todoMapper.insert(content, userId);
    }

    public int delete(Integer todoId) {
        return todoMapper.delete(todoId);
    }

    public int isDone(Integer todoId) {
        return todoMapper.isDone(todoId);
    }

    public List<Todo> selectByUserId(Integer userId) {
        return todoMapper.selectByUserId(userId);
    }

    public Todo selectById(Integer todoId) {
        return todoMapper.selectById(todoId);
    }
}
