package com.anmory.allinone.service;

import com.anmory.allinone.mapper.SwapMapper;
import com.anmory.allinone.model.Swap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Anmory
 * @description TODO
 * @date 2025-08-09 下午8:44
 */

@Service
public class SwapService {
    @Autowired
    private SwapMapper swapMapper;

    public int insert(String srcPath, String dstPath, Integer userId) {
        return swapMapper.insert(srcPath, dstPath, userId);
    }

    public int updateSwapPath(String swapPath, Integer swapId) {
        return swapMapper.updateSwapPath(swapPath, swapId);
    }

    public List<Swap> selectByUserId(Integer userId) {
        return swapMapper.selectByUserId(userId);
    }

    public Swap selectById(Integer swapId) {
        return swapMapper.selectById(swapId);
    }

    public Integer selectSwapIdBySrcPathAndDstPath(String srcPath, String dstPath) {
        return swapMapper.selectSwapIdBySrcPathAndDstPath(srcPath, dstPath);
    }

    public List<Integer> selectSwapIdsByUserId(Integer userId) {
        return swapMapper.selectSwapIdsByUserId(userId);
    }

    public Swap selectLastSwapByUserId(Integer userId) {
        return swapMapper.selectLastSwapByUserId(userId);
    }
}
