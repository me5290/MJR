package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import project1.model.dao.StoreDao;
import project1.model.dto.PageDto;
import project1.model.dto.ReviewDto;
import project1.model.dto.StoreDto;


import java.util.List;
@EnableScheduling
@Service
public class StoreService {
    @Autowired
    private StoreDao storeDao;

    @Autowired
    private FileService fileService;

    //1. 가게 등록 처리
    public long doPostStoreReg(StoreDto storeDto) {
        System.out.println("StoreService.doPostStoreReg");
    String fileName1 = fileService.fileUpload(storeDto.getSimg1());
    String fileName2 = fileService.fileUpload(storeDto.getSimg2());
    String fileName3 = fileService.fileUpload(storeDto.getSimg3());
    String fileName4 = fileService.fileUpload(storeDto.getSimg4());
    if(fileName1!=null&&fileName2!=null&&fileName3!=null&&fileName4!=null){
        storeDto.setSfile1(fileName1);
        storeDto.setSfile2(fileName2);
        storeDto.setSfile3(fileName3);
        storeDto.setSfile4(fileName4);
    }else{return -1;}
        //2. DB처리
        return storeDao.doPostStoreReg(storeDto);

    }
    //1-1 가게이름 중복 검사

    public  boolean doGetNameCheck(String sname){
        System.out.println("StoreService.doGetNameCheck");
        System.out.println("sname = " + sname);
        return storeDao.doGetNameCheck(sname);
    }
    //1-2 사업자번호 중복 검사
    public  boolean doGetNumberCheck( String snumber){
        System.out.println("StoreService.doGetNameCheck");
        System.out.println("snumber = " + snumber);
        return storeDao.doGetNumberCheck(snumber);
    }
    //2. 가게 전체 출력
    public PageDto doGetStoreList(int page, int pageStoreSize,
                                  int categorya, int categoryb,
                                  String key, String keyword){
        System.out.println("StoreController.doGetStoreList");
        System.out.println("page = " + page + ", pageStoreSize = " + pageStoreSize + ", categorya = " + categorya + ", categoryb = " + categoryb + ", key = " + key + ", keyword = " + keyword);
        //페이지처리시 사용할 SQL 구문 : limit 시작레코드번호(0부터), 출력개수

        //1. 페이지당 게시물을 출력할 개수       [출력개수]
        //int pageStoreSize = 5;
        //2. 페이지당 게시물을 출력할 시작 레코드번호.    [시작레코드번호(0부터)
        int startRow= (page-1)*pageStoreSize;
        //3. 총 페이지수
        //1. 전체 게시물수
        int totalStoreSize = storeDao.getStoreSize(categorya,categoryb,key,keyword);
        System.out.println("totalBoardSize = " + totalStoreSize);
        //2. 총 페이지수 계산 (나머지값이 존재하면 +1)
        int totalPage = totalStoreSize % pageStoreSize == 0 ?
                totalStoreSize / pageStoreSize :
                totalStoreSize / pageStoreSize + 1;

        //4. 게시물 정보 요청
        List<StoreDto> list=storeDao.dogetStoreViewList(startRow,pageStoreSize,categorya,categoryb, key, keyword);

        //5. 페이징 버튼 개수
        //1. 페이지버튼 최대 개수
        int btnSize = 5;        //5개씩
        //2. 페이지버튼 시작번호
        int startBtn= 1+((page-1)/btnSize)*btnSize  ;        // 1번 버튼
        //3. 페이지버튼 끝번호
        int endBtn= btnSize+startBtn-1;                      // 5번 버튼
        // 만약에 페이지버튼의 끝번호가 총페이지수보다는 커질 수 없다.
        if(endBtn>=totalPage) endBtn=totalPage;



        //pageDto 구성 * 빌더패턴: 생성자의 단점(매개변수에 따른 유연성 부족)을 보완
        // new 연산자 없이 builder() 함수 이용한 객체 생성 라이브러리 제공
        // 사용방법: 클래스명.build().필드명(대입값).필드명(대입값).build();
        // 생성자보다 유연성이 좋음: 매개변수의 순서와 개수가 자유롭다
        //빌더패턴 vs 생성자 vs setter
        PageDto storePageDto =PageDto.builder()
                .page(page)
                .totalBoardSize(totalStoreSize)
                .totalPage(totalPage)
                .list(list)
                .startBtn(startBtn)
                .endBtn(endBtn)
                .build();
        return storePageDto ;
    }
    //2-2. 맛집 출력
    public PageDto doGetBestList(int page, int pageStoreSize,
                                       int categorya,int categoryb,
                                       String key, String keyword){
        System.out.println("StoreController.doGetStoreList");
        System.out.println("page = " + page + ", pageStoreSize = " + pageStoreSize + ", categorya = " + categorya + ", categoryb = " + categoryb + ", key = " + key + ", keyword = " + keyword);
        //페이지처리시 사용할 SQL 구문 : limit 시작레코드번호(0부터), 출력개수

        //1. 페이지당 게시물을 출력할 개수       [출력개수]
        //int pageStoreSize = 5;
        //2. 페이지당 게시물을 출력할 시작 레코드번호.    [시작레코드번호(0부터)
        int startRow= (page-1)*pageStoreSize;
        //3. 총 페이지수
        //1. 전체 게시물수
        int totalBoardSize = storeDao.getBestSize(categorya,categoryb,key,keyword);
        System.out.println("totalBoardSize = " + totalBoardSize);
        //2. 총 페이지수 계산 (나머지값이 존재하면 +1)
        int totalPage = totalBoardSize % pageStoreSize == 0 ?
                totalBoardSize / pageStoreSize :
                totalBoardSize / pageStoreSize + 1;

        //4. 게시물 정보 요청
        List<StoreDto> list=storeDao.doGetBestList(startRow,pageStoreSize,categorya,categoryb, key, keyword);

        //5. 페이징 버튼 개수
        //1. 페이지버튼 최대 개수
        int btnSize = 5;        //5개씩
        //2. 페이지버튼 시작번호
        int startBtn= 1+((page-1)/btnSize)*btnSize  ;        // 1번 버튼
        //3. 페이지버튼 끝번호
        int endBtn= btnSize+startBtn-1;                      // 5번 버튼
        // 만약에 페이지버튼의 끝번호가 총페이지수보다는 커질 수 없다.
        if(endBtn>=totalPage) endBtn=totalPage;



        //pageDto 구성 * 빌더패턴: 생성자의 단점(매개변수에 따른 유연성 부족)을 보완
        // new 연산자 없이 builder() 함수 이용한 객체 생성 라이브러리 제공
        // 사용방법: 클래스명.build().필드명(대입값).필드명(대입값).build();
        // 생성자보다 유연성이 좋음: 매개변수의 순서와 개수가 자유롭다
        //빌더패턴 vs 생성자 vs setter
        PageDto storePageDto =PageDto.builder()
                .page(page)
                .totalBoardSize(totalBoardSize)
                .totalPage(totalPage)
                .list(list)
                .startBtn(startBtn)
                .endBtn(endBtn)
                .build();
        return storePageDto ;
    }

    //3. 가게상세 페이지 호출
    public StoreDto doGetStoreInfo( int sno){
        System.out.println("StoreService.doGetStoreInfo");
        return storeDao.doGetStoreInfo(sno);
    }

    //4. 가게 정보 수정
    public Boolean doPutStore(StoreDto storeDto){
        System.out.println("StoreService.doPutStore");
        String fileName1 = fileService.fileUpload(storeDto.getSimg1());
        String fileName2 = fileService.fileUpload(storeDto.getSimg2());
        String fileName3 = fileService.fileUpload(storeDto.getSimg3());
        String fileName4 = fileService.fileUpload(storeDto.getSimg4());
        if(fileName1!=null&&fileName2!=null&&fileName3!=null&&fileName4!=null) {
            storeDto.setSfile1(fileName1);
            storeDto.setSfile2(fileName2);
            storeDto.setSfile3(fileName3);
            storeDto.setSfile4(fileName4);
        }
        return storeDao.doPutStore(storeDto);
    }

    //5. 가게 정보 삭제

    public boolean doDeleteStore(int sno){System.out.println("StoreController.doDeleteStore");
        boolean result=storeDao.doDeleteStore(sno);
        return result;
    }
    //6. 리뷰 작성
    public boolean postReviewWrite(ReviewDto reviewDto){
        System.out.println("StoreController.postReviewWrite");
        String fileName = fileService.fileUpload(reviewDto.getRvfile());
        if(fileName!=null){
            reviewDto.setRvimg(fileName);
        }
        return storeDao.postReviewWrite(reviewDto);
    }
    //7. 리뷰 출력
    public List<ReviewDto> getReview(int sno){System.out.println("StoreService.getReview");
        return storeDao.getReview(sno);
    }

    //8. 맛집 등업
    public int getRevisitCount(int sno){
        System.out.println("StoreService.getRevisitCount");
        return storeDao.getRevisitCount(sno);
    }

    // 9. 즐겨찾기 등록
    public boolean doGetSlikeCreate( int sno , int mno){
        System.out.println("StoreService.doGetSlikeCreate");

        return storeDao.doGetSlikeCreate(sno,mno);
    }

    // 10. 즐겨찾기 출력
    public boolean doGetSlikeRead( int sno , int mno){
        System.out.println("StoreService.doGetSlikeRead");

        return storeDao.doGetSlikeRead(sno,mno);
    }

    // 11. 즐겨찾기 삭제
    public boolean doGetSlikeDelete( int sno , int mno){
        System.out.println("StoreService.doGetSlikeDelete");

        return storeDao.doGetSlikeDelete(sno,mno);
    }

    //12. 인증코드 생성 후 대입

    @Scheduled(cron="0 0 */12 * * *") // (cron = "*/10 * * * * *")10초마다 실행
    public void doGetScode(){
        System.out.println("StoreService.doPostScode");
        storeDao.doGetScode();
        System.out.println("storeDao.doGetScode() = " + storeDao.doGetScode());
    }

    //13. 인증코드 인증
    public boolean doPostAuth(String scode, int sno){
        System.out.println("StoreService.doPostAuth");
        return storeDao.doPostAuth(scode, sno);
    }

    //14. 작성자 인증
    public  boolean storeWriterAuth(long sno,String mid){return storeDao.storeWriterAuth(sno,mid);}

}
