package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dao.MapDao;
import project1.model.dto.StoreDto;

import java.util.List;
import java.util.Map;

@Service
public class MapService {
    @Autowired
    private MapDao mapDao;

    // 업체 위도,경도 요청
    public List<StoreDto> doGetPosition(String east , String west , String south , String north){
        return mapDao.doGetPosition(east,west,south,north);
    }

    // 전승호 ==============================================================
    // 검색 기능 ( 입력값 받아와서 입력값에 해당하는 주소정보 꺼내옴 )
    public List<StoreDto> doGetSearch(String keyword){
        System.out.println("MapService.doGetSearch");

        return mapDao.doGetSearch(keyword);
    }
    // 전승호 END ==========================================================
}//class end
