package project1.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dto.AlgorithmDto;
import project1.model.dto.MemberDto;
import project1.model.dto.StoreDto;
import project1.service.AlgorithmService;
import project1.service.MemberService;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/algorithm")
public class AlgorithmController {
    @Autowired
    AlgorithmService algorithmService;
    @Autowired
    MemberService memberService;
    @Autowired
    HttpServletRequest request;

    @GetMapping("/loginreviewinfo.do") // 로그인 할때 실행
    public void getLoginReviewInfo(){
        System.out.println("AlgorithmController.getLoginReviewInfo");
        String mid = (String) request.getSession().getAttribute("logininfo");
        int mno = memberService.doGetLoginInfo(mid).getMno();

        Calendar cal = Calendar.getInstance();
        LocalDate now = LocalDate.now();

        String nowmonth = Integer.toString(now.getMonthValue());
        if(now.getMonthValue() < 10){
            nowmonth = "0"+nowmonth;
        }

        // 현재날짜 int
        int nowdate = Integer.parseInt(now.getYear()+nowmonth+now.getDayOfMonth());

        // 1-1. 리뷰쓴 가게의 카테고리 번호 가져오기
        List<AlgorithmDto> categoryInfo = algorithmService.getLoginReviewInfo(mno);

        // 1-2. 리뷰 썻으면 해당 가게 카테고리에 +3
        for(int i = 0; i < categoryInfo.size(); i++){
            // 리뷰 날짜 쪼개기
            String[] datetime = categoryInfo.get(i).getRvdate().split(" ");
            String[] date = datetime[0].split("-");

            cal.set(Calendar.YEAR,Integer.parseInt(date[0]));
            cal.set(Calendar.MONTH,Integer.parseInt(date[1]));
            cal.set(Calendar.DATE,Integer.parseInt(date[2]));

            // 일주일 후 날짜
            cal.add(Calendar.DATE,7);

            String y = Integer.toString(cal.get(Calendar.YEAR));
            String m = Integer.toString(cal.get(Calendar.MONTH)+1);
            String d = Integer.toString(cal.get(Calendar.DATE));

            if(cal.get(Calendar.MONTH)+1 < 10){
                m = "0"+m;
            }

            // 리뷰등록 일주일 후 날짜 int
            int after7day = Integer.parseInt(y + m + d);

            for(int j = 0; j < 7; j++){
                if(categoryInfo.get(i).getCategory() == j){
                    if(nowdate <= after7day){
                        request.getSession().setAttribute("categoryb"+j,(int)request.getSession().getAttribute("categoryb"+j)+5);
                    }else{
                        request.getSession().setAttribute("categoryb"+j,(int)request.getSession().getAttribute("categoryb"+j)+3);
                    }
                }
            }
        }
    }

    @GetMapping("/reviewgetcategory.do") // 리뷰 썼을때 세션에 값 추가
    @ResponseBody
    public void reviewGetCategory(@RequestParam int categoryb){
        System.out.println("AlgorithmController.reviewGetCategory");
        for(int i = 0; i < 7; i++){
            if(categoryb == i){
                request.getSession().setAttribute("categoryb"+i,(int)request.getSession().getAttribute("categoryb"+i)+5);
            }
        }
    }

    @GetMapping("/visitstorecategory.do") // 가게 방문 했을때 세션에 값 추가
    @ResponseBody
    public void visitStoreCategory(@RequestParam int categoryb){
        System.out.println("AlgorithmController.visitStoreCategory");
        for(int i = 0; i < 7; i++){
            if(categoryb == i){
                request.getSession().setAttribute("categoryb"+i,(int)request.getSession().getAttribute("categoryb"+i)+1);
            }
        }
    }

    public int maxIndex = 0;
    @GetMapping("/print") // 세션에서 제일 높은 점수를 가진 인덱스 추출해서 보내기
    @ResponseBody
    public int algorithmPrint(){
        System.out.println("AlgorithmController.algorithmPrint");

        int categoryb0 = (int)request.getSession().getAttribute("categoryb0");
        int categoryb1 = (int)request.getSession().getAttribute("categoryb1");
        int categoryb2 = (int)request.getSession().getAttribute("categoryb2");
        int categoryb3 = (int)request.getSession().getAttribute("categoryb3");
        int categoryb4 = (int)request.getSession().getAttribute("categoryb4");
        int categoryb5 = (int)request.getSession().getAttribute("categoryb5");
        int categoryb6 = (int)request.getSession().getAttribute("categoryb6");

        int[] categoryScore = {categoryb0,categoryb1,categoryb2,categoryb3,categoryb4,categoryb5,categoryb6};
        int max = categoryScore[0];

        // i번째 categoryScore 값이 categoryScore 최댓값과 같으면 saveScore에 해당 인덱스 저장
        for (int i = 0; i < categoryScore.length; i++){
            if(categoryScore[i] > max){
                max = categoryScore[i];
                maxIndex = i;
            }
        }
        System.out.println(Arrays.toString(categoryScore));
        System.out.println("최대값 인덱스는"+maxIndex);

        return maxIndex;
    }

    @GetMapping("/findstoreinfo")
    @ResponseBody
    public Set<StoreDto> findStoreInfo(){
        return algorithmService.findStoreInfo();
    }
}
