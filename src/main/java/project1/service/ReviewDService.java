package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project1.model.dao.ReviewDDao;

@Service
public class ReviewDService {

    @Autowired
    ReviewDDao reviewDDao;

    public boolean doReviewDelete( int rvno){
        System.out.println("ReviewDService.doReviewDelete");
        return reviewDDao.doReviewDelete(rvno);
    }
}
