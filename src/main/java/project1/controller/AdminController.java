package project1.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project1.model.dto.*;
import project1.service.AdminService;
import project1.service.MemberService;

import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    HttpServletRequest request;

    @Autowired
    AdminService adminService;

    @Autowired
    MemberService memberService;


    @GetMapping("") // 회원 목록 전체 출력(첫 페이지)
    public String adminPage(){
        String mid = (String) request.getSession().getAttribute("logininfo");
        memberService.doGetLoginInfo(mid);
//        System.out.println("mid="+mid);
//        System.out.println("memberService.doGetLoginInfo(mid) = "+memberService.doGetLoginInfo(mid));
//        System.out.println("memberService.doGetLoginInfo(mid).toString() = "+memberService.doGetLoginInfo(mid).toString()); // 로그인 안할시 null로 뜸
        try{
            if(memberService.doGetLoginInfo(mid).getMstate()==3){
                return "/view/admin/admin";
            }
        }catch (Exception e){
            System.out.println(e);
        }

        return "index";
    }

    @GetMapping("/mview")
    @ResponseBody
    public List<MemberDto> adminMview(){
        System.out.println("AdminController.adminMview");
        return adminService.adminMview();
    }
    @GetMapping("/mview/detail")
    @ResponseBody
    public PageDto adminMview(@RequestParam String detail, @RequestParam int page, @RequestParam int tablerows,
                              @RequestParam(value="state[]") int[] state, @RequestParam String key,
                              @RequestParam String keyword){
        System.out.println("AdminController.adminMview");
        System.out.println("detail = " + detail + ", page = " + page + ", tablerows = " + tablerows + ", state = " + Arrays.toString(state) + ", key = " + key + ", keyword = " + keyword);
        return adminService.adminMview(detail, page, tablerows, state, key, keyword);
    }

    @GetMapping("/bview")
    @ResponseBody
    public List<BoardDto> adminBview(){
        System.out.println("AdminController.adminBview");
        return adminService.adminBview();
    }

    @GetMapping("/rpview")
    @ResponseBody
    public List<ReplyDto> adminRPview(){
        System.out.println("AdminController.adminRPview");
        return adminService.adminRPview();
    }

    @GetMapping("/rvview")
    @ResponseBody
    public List<ReviewDto> adminRVview(){
        System.out.println("AdminController.adminRVview");
        return adminService.adminRVview();
    }

    @GetMapping("/sview")
    @ResponseBody
    public List<StoreDto> adminSview(@RequestParam("sstates") int[] sstates){
        System.out.println("AdminController.adminSview");
        return adminService.adminSview(sstates);
    }

}
