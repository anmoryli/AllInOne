package com.anmory.allinone.mapper;

import com.anmory.allinone.model.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @author Anmory/李梦杰
 * @description TODO
 * @date 2025-08-07 下午2:57
 */

@Mapper
public interface UserMapper {
    @Insert("""
            insert into user (username, password, email, phone) values 
            (#{username}, #{password}, #{email}, #{phone})
            """)
    int insert(String username, String password, String email, String phone);

    @Update("""
            update user set avatar_path=#{avatar} where username=#{username}
            """)
    int uploadAvatar(String username, String avatar);

    @Update("""
            update user set email=#{email} where username=#{username}
            """)
    int bindEmail(String username, String email);

    @Update("""
            update user set phone=#{phone} where username=#{username}
            """)
    int bindPhone(String username, String phone);

    @Update("""
            update user set password=#{password} where username=#{username}
            """)
    int changePassword(String username, String password);

    @Delete("delete from user where user_id=#{userId}")
    int delete(Integer userId);

    @Select("select * from user where user_id=#{userId}")
    User selectById(Integer userId);

    @Select("select * from user where username=#{name}")
    User selectByName(String name);

    @Select("select * from user")
    List<User> selectAll();
}
