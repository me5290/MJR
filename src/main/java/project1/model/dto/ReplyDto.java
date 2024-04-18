package project1.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ReplyDto {
    private int rpno;
    private String rpcontent;
    private String rpdate;
    private int mno;
    private int bno;
    private int rpindex;
    // == 이까지 Reply 원래 필드
    // == 추가 필드 시작 ==
    private String mid;

    private boolean Ueserinfo ;

    // == 추가 필드 끝 ==
}
