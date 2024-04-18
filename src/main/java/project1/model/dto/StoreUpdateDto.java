package project1.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class StoreUpdateDto {
    private int sno;
    private int sstate;
}
