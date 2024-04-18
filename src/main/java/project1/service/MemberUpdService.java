package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project1.model.dao.MemberUpdDao;
import project1.model.dto.MemberUpdateDto;
import project1.model.dto.StoreUpdateDto;

@Service
public class MemberUpdService {

    @Autowired
    MemberUpdDao memberUpdDao;

    public boolean mstateUpdate(MemberUpdateDto memberUpdateDto){
        System.out.println("MemberUpdService.mstateUpdate");
        System.out.println("memberUpdateDto = " + memberUpdateDto.toString());
        return memberUpdDao.mstateUpdate(memberUpdateDto);
    }
}
