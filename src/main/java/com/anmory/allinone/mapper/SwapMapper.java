package com.anmory.allinone.mapper;

import com.anmory.allinone.model.Swap;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author Anmory/李梦杰
 * @description TODO
 * @date 2025-08-09 下午8:40
 */

@Mapper
public interface SwapMapper {
    @Insert("insert into swap(src_path, dst_path, user_id) values(#{srcPath}, #{dstPath}, #{userId})")
    int insert(String srcPath, String dstPath, Integer userId);

    @Insert("update swap set swap_path = #{swapPath} where swap_id = #{swapId}")
    int updateSwapPath(String swapPath, Integer swapId);

    @Select("select * from swap where user_id = #{userId}")
    List<Swap> selectByUserId(Integer userId);

    @Select("select swap_id from swap where src_path = #{srcPath} and dst_path = #{dstPath}")
    Integer selectSwapIdBySrcPathAndDstPath(String srcPath, String dstPath);

    @Select("select * from swap where swap_id = #{swapId}")
    Swap selectById(Integer swapId);

    @Select("select swap_id from swap where user_id = #{userId}")
    List<Integer> selectSwapIdsByUserId(Integer userId);

    @Select("select * from swap where user_id = #{userId} order by swap_id desc limit 1")
    Swap selectLastSwapByUserId(Integer userId);
}
