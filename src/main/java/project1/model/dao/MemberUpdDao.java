package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.MemberUpdateDto;


@Component
public class MemberUpdDao extends Dao{

    public boolean mstateUpdate(MemberUpdateDto memberUpdateDto){
        System.out.println("MemberUpdDao.mstateUpdate");
        try {
            String sql="update member set mstate=? where mno=? ";
            ps=conn.prepareStatement(sql);
            ps.setInt(1,memberUpdateDto.getMstate());
            ps.setInt(2,memberUpdateDto.getMno());
            int count = ps.executeUpdate();
            if(count==1){return true;}
        }catch (Exception e){
            System.out.println("e = " + e);
        }
        return false;
    }
}
