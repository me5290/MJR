package project1.model.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ReviewDto {
    private int rvno;
    private String rvcontent;
    private String rvdate;
    private String rvimg;          //경로

    private MultipartFile rvfile;    //파일만들기

    private int sno;
    private int mno;
    // 원래 필드 ==
    // 빌더용 추가 필드 ==
    private String mid;

    // 빌더용 추가 필드 끝 ==
}
