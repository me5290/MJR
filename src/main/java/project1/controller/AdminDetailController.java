package project1.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import project1.service.MemberService;

@Controller
@RequestMapping("/adminDetailPage")
public class AdminDetailController {
    @Autowired
    HttpServletRequest request;
    @Autowired
    MemberService memberService;


    @GetMapping("")
    public String adminDetailPage(@RequestParam String detail){
        String mid = (String) request.getSession().getAttribute("logininfo");
        memberService.doGetLoginInfo(mid);
//        System.out.println("mid="+mid);
//        System.out.println("memberService.doGetLoginInfo(mid) = "+memberService.doGetLoginInfo(mid));
//        System.out.println("memberService.doGetLoginInfo(mid).toString() = "+memberService.doGetLoginInfo(mid).toString()); // 로그인 안할시 null로 뜸
        try{
            if(memberService.doGetLoginInfo(mid).getMstate()==3){
                return "/view/admin/adminDetailPage";
            }
        }catch (Exception e){
            System.out.println(e);
        }

        return "index";

    }


}
