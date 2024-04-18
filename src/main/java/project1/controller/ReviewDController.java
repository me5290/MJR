package project1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.service.ReviewDService;

@Controller
public class ReviewDController {

    @Autowired
    ReviewDService reviewDService;

    @DeleteMapping("/rvdelete.do")
    @ResponseBody
    public boolean doReviewDelete(@RequestParam int rvno){
        System.out.println("ReviewDController.doReviewDelete");
        System.out.println("rvno = " + rvno);
        return reviewDService.doReviewDelete(rvno);
    }
}
