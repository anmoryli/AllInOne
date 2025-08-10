package com.anmory.allinone.controller;

import com.anmory.allinone.model.Todo;
import com.anmory.allinone.service.TodoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-07 下午4:55
 */


@Slf4j
@RestController
@RequestMapping("/todo")
public class TodoController {
    @Autowired
    private TodoService todoService;

    @RequestMapping("/insert")
    public int insert(String content, Integer userId) {
        log.info("insert todo: content={}, userId={}", content, userId);
        return todoService.insert(content, userId);
    }

    @RequestMapping("/delete")
    public int delete(Integer todoId) {
        log.info("delete todo: todoId={}", todoId);
        return todoService.delete(todoId);
    }

    @RequestMapping("/isDone")
    public int isDone(Integer todoId) {
        log.info("isDone todo: todoId={}", todoId);
        return todoService.isDone(todoId);
    }

    @RequestMapping("/selectByUserId")
    public List<Todo> selectByUserId(Integer userId) {
        log.info("select todo by userId: userId={}", userId);
        return todoService.selectByUserId(userId);
    }

    @RequestMapping("/selectById")
    public Todo selectById(Integer todoId) {
        log.info("select todo by todoId: todoId={}", todoId);
        return todoService.selectById(todoId);
    }
}
