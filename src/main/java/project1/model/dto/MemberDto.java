package project1.model.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@ToString
@Builder
public class MemberDto {
    private int mno;
    private String mid;
    private String mpw;
    private String mname;
    private String memail;
    private String mphone;
    private String mbirth;
    private String yy;
    private String mm;
    private String dd;
    private String msex;
    private String maddress;
    private String mdate;
    private String mimg;
    private MultipartFile profileimg;
    private int mstate;
    private String mcoupon;
}
