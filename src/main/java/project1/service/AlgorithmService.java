package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import project1.model.dao.AlgorithmDao;
import project1.model.dao.StoreDao;
import project1.model.dto.AlgorithmDto;
import project1.model.dto.StoreDto;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Set;

@Service
public class AlgorithmService {
    @Autowired
    AlgorithmDao algorithmDao;

    public List<AlgorithmDto> getLoginReviewInfo(int mno){
        System.out.println("AlgorithmService.getLoginReviewInfo");
        return algorithmDao.getLoginReviewInfo(mno);
    }

    public Set<StoreDto> findStoreInfo(){
        return algorithmDao.findStoreInfo();
    }
}