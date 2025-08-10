package com.anmory.allinone.mapper;

import com.anmory.allinone.model.File;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author Anmory/李梦杰
 * @description TODO
 * @date 2025-08-07 下午3:52
 */

@Mapper
public interface FileMapper {
    @Insert("insert into file (name, path, cate, size, type, user_id) values (#{name}, #{path}, #{cate}, #{size}, #{type}, #{userId})")
    int insert(String name, String path, String cate, Float size, String type, Integer userId);

    @Delete("delete from file where file_id= #{fileId}")
    int delete(Integer fileId);

    @Select("select * from file where user_id= #{userId}")
    List<File> selectByUserId(Integer userId);

    @Select("select * from file where file_id= #{fileId}")
    File selectById(Integer fileId);
}
