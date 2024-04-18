package project1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dto.StoreDto;
import project1.service.MapService;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/map")
public class MapController {
    @Autowired
    private MapService mapService;

    // 지도 페이지 요청
    @GetMapping("")
    public String getMap(){
        return "view/map";
    }

    // 업체 정보 요청
    @GetMapping("/storeinfo.do")
    @ResponseBody
    public List<StoreDto> doGetPosition(@RequestParam String east , @RequestParam String west , @RequestParam String south , @RequestParam String north){
        return mapService.doGetPosition(east,west,south,north);
    }


    // 전승호 ==============================================================
    // 검색 기능 ( 입력값 받아와서 입력값에 해당하는 주소정보 꺼내옴 )
    @GetMapping("/search.do")
    @ResponseBody
    public List<StoreDto> doGetSearch(@RequestParam String keyword){
        System.out.println("MapController.doGetSearch");

        return mapService.doGetSearch(keyword);
    }
    // 전승호 END ==========================================================

}
