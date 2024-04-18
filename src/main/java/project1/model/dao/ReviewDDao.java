package project1.model.dao;

import org.springframework.stereotype.Component;

@Component
public class ReviewDDao extends Dao{

    public boolean doReviewDelete( int rvno){
        System.out.println("ReviewDDao.doReviewDelete");
        try {
            String sql = "delete from review where rvno = "+rvno;
            ps = conn.prepareStatement(sql);
            ps.executeUpdate();
            return true;
        }catch (Exception e){
            System.out.println("e = " + e);
        }
        return false;
    }
}
