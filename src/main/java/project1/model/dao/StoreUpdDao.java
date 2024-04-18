package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.StoreUpdateDto;

@Component
public class StoreUpdDao extends Dao{

    public boolean sstateUpdate(StoreUpdateDto storeUpdateDto){
        System.out.println("StoreUpdDao.sstateUpdate");
        System.out.println("storeUpdateDto = " + storeUpdateDto.toString());
        try {
            String sql="update store set sstate=? where sno=? ";
            ps=conn.prepareStatement(sql);
            ps.setInt(1,storeUpdateDto.getSstate());
            ps.setInt(2,storeUpdateDto.getSno());
            int count = ps.executeUpdate();
            if(count==1){return true;}
        }catch (Exception e){
            System.out.println("e = " + e);
        }
        return false;
    }

}
