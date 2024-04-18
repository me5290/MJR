package project1.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class FileService {
    String uploadPath = "C:\\Users\\504\\Desktop\\team4Project\\build\\resources\\main\\static\\img\\";
    //1. 업로드 메소드
    public String fileUpload(MultipartFile multipartFile){
        if(multipartFile.getOriginalFilename().equals("")){
            return null;
        }
        String uuid= UUID.randomUUID().toString();  System.out.println("uuid = " + uuid);
        String filename = uuid+"_"+multipartFile.getOriginalFilename().replaceAll("_","-");

        //1. 첨부파일 업로드 하기[업로드란 : 클라이언트의 바이트(대용량/파일)을 서버로 복사
        //1. 첨부파일을 저장할 경로
        //File 클래스: 파일 관련된 메소드 제공
        //new File(파일경로);
        File file = new File(uploadPath+ filename);
        System.out.println("file = " + file);
        //2.[무엇을] 첨부파일 객체
        // .transferTo
        try{
            multipartFile.transferTo(file);
        }catch (Exception e){
            System.out.println("e = " + e);
            return null;
        }
        return filename;
    }
}
