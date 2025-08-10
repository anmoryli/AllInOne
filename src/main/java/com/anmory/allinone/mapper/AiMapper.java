package com.anmory.allinone.mapper;

import com.anmory.allinone.model.Ai;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author Anmory/李梦杰
 * @description TODO
 * @date 2025-08-10 下午6:08
 */

@Mapper
public interface AiMapper {
    @Insert("insert into ai (query, content, user_id) values (#{query}, #{content}, #{userId})")
    int insert(String query, String content, Integer userId);

    @Select("select * from ai where user_id = #{userId}")
    List<Ai> selectByUserId(Integer userId);
}
