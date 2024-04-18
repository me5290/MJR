package project1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dto.MemberUpdateDto;
import project1.model.dto.StoreUpdateDto;
import project1.service.MemberUpdService;


@Controller
public class MemberUpdController {

    @Autowired
    MemberUpdService memberUpdService;

    @PutMapping("/member/updatedo")
    @ResponseBody
    public boolean mstateUpdate(@RequestBody MemberUpdateDto memberUpdateDto){
        System.out.println("MemberUpdController.mstateUpdate");
        System.out.println("memberUpdateDto = " + memberUpdateDto.toString());
        return memberUpdService.mstateUpdate(memberUpdateDto);
    }
}
