package project1.model.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class StoreDto {
    private long sno;
    private String sname;
    private String sphone;
    private String sadress;
    private String scontent;
    private int sstate;
    private String snumber;
    private int categorya;
    private int categoryb;
    private String slat;
    private String slng;

    private String sfile1;
    private String sfile2;
    private String sfile3;
    private String sfile4; // 경로

    private MultipartFile simg1;
    private MultipartFile simg2;
    private MultipartFile simg3;
    private MultipartFile simg4; // 파일만들기

    private long mno;

    // 빌더용 추가 필드
    private String mid;
    // 추가 필드 끝

}
