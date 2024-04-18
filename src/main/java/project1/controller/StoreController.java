package project1.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project1.model.dao.StoreDao;
import project1.model.dto.MemberDto;
import project1.model.dto.PageDto;
import project1.model.dto.ReviewDto;
import project1.model.dto.StoreDto;
import project1.service.AlgorithmService;
import project1.service.MemberService;
import project1.service.StoreService;

import java.util.List;

@Controller
@RequestMapping("/store")
public class StoreController {

    @Autowired
    private StoreDao storeDao;
    //세션 불러오기
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private StoreService storeService;
    @Autowired
    private MemberService memberService;

    @Autowired
    private AlgorithmService algorithmService;

    //-------------------------------------------//

    //1. 가게 등록 처리
    @PostMapping("/reg.do")
    @ResponseBody
    public long doPostStoreReg(StoreDto storeDto){
        System.out.println("StoreController.doPostStoreReg");
        //1. 현재 로그인된 세션 호출
        Object object=request.getSession().getAttribute("logininfo");
        System.out.println("object = " + object);
        if(object==null) return -2;
        //2. 형 변환
        String mid = (String) object;
        //3. mid로 mno 가져오기
        MemberDto memberDto = memberService.doGetLoginInfo(mid);
        System.out.println("memberDto = " + memberDto);
        //4. 가입자 번호 대입
        storeDto.setMno(memberDto.getMno());
        return storeService.doPostStoreReg(storeDto);
    }

    //1-1 가게이름 중복 검사
    @GetMapping("/reg/snamecheck")
    @ResponseBody
    public  boolean doGetNameCheck(@RequestParam String sname){
        System.out.println("StoreController.doGetNameCheck");
        System.out.println("sname = " + sname);
        return storeService.doGetNameCheck(sname);
    }
    //1-2 사업자번호 중복 검사
    @GetMapping("/reg/snumbercheck")
    @ResponseBody
    public  boolean doGetNumberCheck(@RequestParam String snumber){
        System.out.println("StoreController.doGetNameCheck");
        System.out.println("snumber = " + snumber);
        return storeService.doGetNumberCheck(snumber);
    }

    //2. 가게 전체 출력 호출
    @GetMapping("/do")
    @ResponseBody
    public PageDto doGetStoreList(@RequestParam int page, @RequestParam int pageStoreSize,
                                    @RequestParam int categorya, @RequestParam int categoryb,
                                    @RequestParam String key, @RequestParam String keyword){
        System.out.println("StoreController.doGetStoreList");
        return storeService.doGetStoreList(page, pageStoreSize, categorya, categoryb, key, keyword) ;
    }
    //2-2. 맛집  호출
    @GetMapping("/best.do")
    @ResponseBody
    public PageDto doGetBestList(@RequestParam int page, @RequestParam int pageStoreSize,
                                       @RequestParam int categorya,@RequestParam int categoryb,
                                       @RequestParam String key, @RequestParam String keyword){
        System.out.println("StoreController.doGetStoreList");
        return storeService.doGetBestList(page, pageStoreSize, categorya, categoryb, key, keyword) ;
    }


    //3. 가게상세 페이지 호출
    @GetMapping("/info.do")
    @ResponseBody
    public StoreDto doGetStoreInfo(@RequestParam int sno){
        System.out.println("StoreController.doGetStoreInfo");

        return storeService.doGetStoreInfo(sno);
    }
    //4-0 가게 작성자인지 확인
    @GetMapping("/mnoCheck.do")
    @ResponseBody
    public long doMnoCheck(){
        //1. 현재 로그인된 세션 호출
        Object object=request.getSession().getAttribute("logininfo");
        System.out.println("object = " + object);
        //2. 형 변환
        String mid = (String) object;
        //3. mid로 mno 가져오기
        MemberDto memberDto = memberService.doGetLoginInfo(mid);
        System.out.println("memberDto = " + memberDto);
        return memberDto.getMno();
    }

    //4. 가게 정보 수정
    @PutMapping("/update.do")
    @ResponseBody
    public Boolean doPutStore(StoreDto storeDto){
        System.out.println("StoreController.doPutStore");
        return storeService.doPutStore(storeDto);
    }

    //5. 가게 정보 삭제
    @DeleteMapping("/delete.do")
    @ResponseBody
    public boolean doDeleteStore(@RequestParam int sno){System.out.println("StoreController.doDeleteStore");
        return storeService.doDeleteStore(sno);
    }

    //6. 리뷰 작성 (rvcontent,rvimg,sno,mno)
    @PostMapping("/review/write.do")
    @ResponseBody
    public boolean postReviewWrite( ReviewDto reviewDto){
        System.out.println("reviewDto = " + reviewDto);
        System.out.println("StoreController.postReviewWrite");
        //1. 현재 로그인된 세션 호출
        Object object=request.getSession().getAttribute("logininfo");
        if(object==null) return false;
        //2. 형 변환
        String mid = (String) object;
        System.out.println("mid = " + mid);
        //3. mid로 mno 가져오기
        MemberDto memberDto = memberService.doGetLoginInfo(mid);
        System.out.println("memberDto = " + memberDto);
        //4. 가입자 번호 대입
        reviewDto.setMno( memberDto.getMno() );

        // 전승호 ======================================
            // 작성자와 스토어가 같은사람이면 작성불가능
        if(memberDto.getMno()/*작성자*/ == storeService.doGetStoreInfo(reviewDto.getSno()).getMno()/*가게주인*/ ){
            return false;
        }
        // 전승호 END ======================================

        return storeService.postReviewWrite(reviewDto);
    }

    //7. 리뷰 출력
    @GetMapping("/review/do")
    @ResponseBody
    public List<ReviewDto> getReview(int sno){System.out.println("StoreController.getReview");
        return storeService.getReview(sno);
    }

    //8. 맛집 등업
    @GetMapping("/revisit")
    @ResponseBody
    public int getRevisitCount(@RequestParam int sno){
        System.out.println("StoreController.getRevisitCount");
        System.out.println("sno = " + sno );
        return storeService.getRevisitCount(sno);
    }

    // 9. 즐겨찾기 등록
    @PostMapping("/slike.do")
    @ResponseBody
    public boolean doGetSlikeCreate(@RequestParam int sno){
        System.out.println("StoreController.doGetSlikeCreate");

        Object object = request.getSession().getAttribute("logininfo");
        if (object == null){
            return false;
        }
        int mno = memberService.doGetLoginInfo((String)object).getMno();

        return storeService.doGetSlikeCreate(sno,mno);
    }

    // 10. 즐겨찾기 출력
    @GetMapping("/slike.do")
    @ResponseBody
    public boolean doGetSlikeRead(@RequestParam int sno){
        System.out.println("StoreController.doGetSlikeRead");

        Object object = request.getSession().getAttribute("logininfo");
        if (object == null){
            return false;
        }
        int mno = memberService.doGetLoginInfo((String)object).getMno();

        return storeService.doGetSlikeRead(sno,mno);
    }

    // 11. 즐겨찾기 삭제
    @DeleteMapping("/slike.do")
    @ResponseBody
    public boolean doGetSlikeDelete(@RequestParam int sno){
        System.out.println("StoreController.doGetSlikeDelete");

        Object object = request.getSession().getAttribute("logininfo");
        if (object == null){
            return false;
        }
        int mno = memberService.doGetLoginInfo((String)object).getMno();

        return storeService.doGetSlikeDelete(sno,mno);
    }


    //13. 인증코드 인증
    @PostMapping("/scode/auth.do")
    @ResponseBody
    public boolean doPostAuth(@RequestParam String scode, @RequestParam int sno ){
        System.out.println("StoreController.doPostAuth");
        return storeService.doPostAuth(scode,sno);
    }





   //--------------------페이지 이동-------------------------//


    //1. 가게등록 페이지로 이동
    @GetMapping("/reg")
    public String viewReg(){
        System.out.println("StoreController.viewReg");
        return "/view/store/regStore";
    }
    //2. 가게 전체 출력 페이지로 이동
    @GetMapping("/view")
    public String viewStore(){
        System.out.println("StoreController.viewStore");
        return "/view/store/store";
    }
    //3. 가게상세 페이지로 이동
    @GetMapping("/info")
    public String viewInfo(){
        System.out.println("StoreController.viewInfo");
        return "/view/store/storeInfo";
    }
    //4. 가게 수정페이지로 이동
    @GetMapping("/update")
    public String getStoreUpdate(){return "/view/store/storeEdit";}

    //5. 맛집 페이지로 이동
    @GetMapping ("/best")
    public String viewBest(){
        System.out.println("StoreController.viewBest");
        return  "/view/store/best";
    }

}// class end
