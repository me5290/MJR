package project1.model.dto;

import lombok.*;

@AllArgsConstructor@NoArgsConstructor@Setter@Getter@ToString@Builder

public class BoardDto {
    // 담당자 전승호====
    private int bno;            // 게시글 식별번호PK
    private String bname;       // 게시글 제목 (최대 20자)
    private String bcontent;    // 게시글 내용(사진,글가능)
    private int bcount;      // 게시글 조회수 (기본값 0)
    private String bdate;       // 게시글최초등록날짜 (기본값 현재시간)
    private int mno;            // 등록한 사람 회원번호
    private int categorya;      // 카테고리 지역 (인덱스번호로 식별함)
    private int categoryb;      // 카테고리 메뉴유형 (인덱스번호로 식별함)

    private boolean ueserinfo;  // 본인이쓴글인지 판별용

    private String mid;         // 작성자 ID
    private String mimg;        // 작성자 프로필사진
    // 담당자 전승호 END====

}// class end
