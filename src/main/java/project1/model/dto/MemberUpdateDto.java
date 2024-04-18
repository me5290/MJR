package project1.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MemberUpdateDto {
    private int mno;
    private int mstate;
}
