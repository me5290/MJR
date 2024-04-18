package project1.model.dto;

import lombok.*;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class AlgorithmDto {
    private int category;
    private String rvdate;
    private int score;
}
