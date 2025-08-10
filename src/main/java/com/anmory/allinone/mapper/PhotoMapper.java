package com.anmory.allinone.mapper;

import com.anmory.allinone.model.Photo;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author Anmory/李梦杰
 * @description TODO
 * @date 2025-08-07 下午3:42
 */

@Mapper
public interface PhotoMapper {
    @Insert("insert into photo (name, path, size, place, user_id) values (#{name}, #{path}, #{size}, #{place}, #{userId})")
    int insert(String name, String path, Float size, String place, Integer userId);

    @Delete("delete from photo where photo_id= #{photoId}")
    int delete(Integer photoId);

    @Select("select * from photo where photo_id= #{photoId}")
    Photo selectById(Integer photoId);

    @Select("select * from photo where user_id= #{userId}")
    List<Photo> selectByUserId(Integer userId);

    @Select("select * from photo where user_id= #{userId} order by photo_id desc limit 1")
    Photo selectLastPhotoByUserId(Integer userId);
}
