package project1.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
public class CouponDto {

    private int cno;
    private int cstate;
    private String cdate;
    private int ckind;
    private int mno;
    private int sno;

    // 빌더용 추가 필드
    private String sname;
    private String sadress;
    private String slat;
    private String slng;
    private String sphone;

    private int categorya;
    private int categoryb;
}
