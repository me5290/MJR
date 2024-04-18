package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.AlgorithmDto;
import project1.model.dto.StoreDto;

import java.util.*;

@Component
public class AlgorithmDao extends Dao{
    // 로그인한 멤버가 리뷰를 쓴 가게의 카테고리 가져오기
    public List<AlgorithmDto> getLoginReviewInfo(int mno){
        System.out.println("AlgorithmDao.getLoginReviewInfo");
        List<AlgorithmDto> list = new ArrayList<>();
        try {
            String sql="select * from review r inner join store s on r.sno = s.sno where r.mno = "+mno;
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                AlgorithmDto algorithmDto = AlgorithmDto.builder()
                        .category(rs.getInt("categoryb"))
                        .rvdate(rs.getString("rvdate"))
                        .build();
                list.add(algorithmDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }

    public Set<StoreDto> findStoreInfo(){
        Set<StoreDto> list = new HashSet<>();
        try {
            String sql="select * from store";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                StoreDto storeDto = StoreDto.builder()
                        .sno(rs.getLong("sno"))
                        .sname(rs.getString("sname"))
                        .sphone(rs.getString("sphone"))
                        .sadress( rs.getString("sadress"))
                        .scontent( rs.getString("scontent"))
                        .sstate( rs.getInt("sstate"))
                        .snumber( rs.getString("snumber"))
                        .categorya( rs.getInt("categorya"))
                        .categoryb( rs.getInt("categoryb"))
                        .sfile1( rs.getString("simg1"))
                        .sfile2( rs.getString("simg2"))
                        .sfile3( rs.getString("simg3"))
                        .sfile4( rs.getString("simg4"))
                        .slat(rs.getString("slat"))
                        .slng(rs.getString("slng"))
                        .mno(rs.getLong("mno"))
                        .build();
                list.add(storeDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }
}
