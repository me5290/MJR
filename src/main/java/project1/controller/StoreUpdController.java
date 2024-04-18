package project1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dto.StoreUpdateDto;
import project1.service.StoreUpdService;

@Controller
public class StoreUpdController {

    @Autowired
    StoreUpdService storeUpdService;

    @PutMapping("/store/updatedo")
    @ResponseBody
    public boolean sstateUpdate(@RequestBody StoreUpdateDto storeUpdateDto){
        System.out.println("StoreUpdController.sstateUpdate");
        System.out.println("storeUpdateDto = " + storeUpdateDto.toString());
        return storeUpdService.sstateUpdate(storeUpdateDto);
    }
}
