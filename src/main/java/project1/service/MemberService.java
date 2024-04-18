package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dao.MemberDao;
import project1.model.dto.BoardDto;
import project1.model.dto.CouponDto;
import project1.model.dto.MemberDto;
import project1.model.dto.ReplyDto;
import project1.model.dto.*;

import java.util.List;
import java.util.Map;

@Service
public class MemberService {
    @Autowired
    MemberDao memberDao;
    @Autowired
    FileService fileService;

    // 1. 회원가입 처리 요청
    public boolean doPostSignup(MemberDto memberDto){
        System.out.println("MemberService.doPostSignup");

        memberDto.setMbirth(memberDto.getYy()+memberDto.getMm()+memberDto.getDd());

        String fileName = "default.jpg";

        if(!memberDto.getProfileimg().isEmpty()){
            fileName = fileService.fileUpload(memberDto.getProfileimg());
            if (fileName == null){
                return false;
            }
        }
        memberDto.setMimg(fileName);

        return memberDao.doPostSignup(memberDto);
    }

    // 2. 아이디 중복검사
    public boolean doGetIdCheck(String mid){
        System.out.println("MemberService.doGetIdCheck");
        return memberDao.doGetIdCheck(mid);
    }

    // 3. 로그인 처리 요청
    public boolean doPostLogin(String loginId ,String loginPw){
        System.out.println("MemberService.doPostLogin");
        return memberDao.doPostLogin(loginId,loginPw);
    }

    // 4. 내정보
    public MemberDto doGetMyInfo(int mno){
        System.out.println("MemberController.doGetMyInfo");
        return memberDao.doGetMyInfo(mno);
    }

    // 4. 회원 정보 요청
    public MemberDto doGetLoginInfo(String mid){
        System.out.println("MemberService.doGetLoginInfo");
        return memberDao.doGetLoginInfo(mid);
    }

    // 5. 회원 정보 수정
    public boolean doPostUpdateInfo(MemberDto memberDto){
        System.out.println("MemberService.doPostUpdateInfo");
        return memberDao.doPostUpdateInfo(memberDto);
    }

    // 6. 내가 쓴 글 출력
    public List<BoardDto> doGetBoardList(int mno){
        return memberDao.doGetBoardList(mno);
    }

    // 7. 내가 쓴 댓글 출력
    public List<ReplyDto> doGetReplyList(int mno){
        return memberDao.doGetReplyList(mno);
    }

    // 8. 내 가게 출력
    public List<StoreDto> doGetStoreList(int mno){
        return memberDao.doGetStoreList(mno);
    }

    // 9. 내 가게 리뷰 출력
    public List<ReviewDto> doGetStoreReviewList(int sno){
        return memberDao.doGetStoreReviewList(sno);
    }

    // 11. 즐겨찾기 출력
    public List<StoreDto> doGetFavorites(int mno){
        System.out.println("MemberService.doGetFavorites");
        return memberDao.doGetFavorites(mno);
    }

    // 12. 회원 탈퇴
    public boolean doGetMemberDelete(String mpw){
        return memberDao.doGetMemberDelete(mpw);
    }

    // 13. 쿠폰 발급 ==================
    public List<CouponDto> doGetMyCoupon(int mno){
        return memberDao.doGetMyCoupon(mno);
    }
}
