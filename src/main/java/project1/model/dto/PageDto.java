package project1.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
public class PageDto {
    // 지금 출력될 페이지 정보
    private int page;       // 페이지
    private int totalPage; // 총 게시물수


    // 페이지선택 출력용
    private int startBtn;   // 페이지버튼의 시작번호
    private int endBtn;     // 페이지버튼의 끝번호
    private int totalBoardSize;     // 총 게시물수


    // 실제 내용 //
    private Object list;
}
