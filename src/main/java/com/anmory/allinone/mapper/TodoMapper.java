package com.anmory.allinone.mapper;

import com.anmory.allinone.model.Todo;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @author Anmory/李梦杰
 * @description TODO
 * @date 2025-08-07 下午4:52
 */

@Mapper
public interface TodoMapper {
    @Insert("insert into todo (content, user_id) values (#{content}, #{userId})")
    int insert(String content, Integer userId);

    @Delete("delete from todo where todo_id= #{todoId}")
    int delete(Integer todoId);

    @Update("update todo set is_done=1 where todo_id= #{todoId}")
    int isDone(Integer todoId);

    @Select("select * from todo where user_id= #{userId}")
    List<Todo> selectByUserId(Integer userId);

    @Select("select * from todo where todo_id= #{todoId}")
    Todo selectById(Integer todoId);
}
