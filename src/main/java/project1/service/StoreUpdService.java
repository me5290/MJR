package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project1.model.dao.StoreUpdDao;
import project1.model.dto.StoreUpdateDto;

@Service
public class StoreUpdService {

    @Autowired
    StoreUpdDao storeUpdDao;

    public boolean sstateUpdate(StoreUpdateDto storeUpdateDto){
        System.out.println("StoreUpdService.sstateUpdate");
        System.out.println("storeUpdateDto = " + storeUpdateDto.toString());
        return storeUpdDao.sstateUpdate(storeUpdateDto);
    }
}
