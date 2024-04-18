package project1.model.dao;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dto.ReviewDto;
import project1.model.dto.StoreDto;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class StoreDao extends Dao {
    //1. 가게 등록
    public long doPostStoreReg(StoreDto storeDto) {
        System.out.println("StoreDao.doPostStoreReg");
        System.out.println("storeDto = " + storeDto);
        try {
            String sql =
                    "insert into store(sname,sphone,simg1,simg2,simg3,simg4,sadress,scontent,snumber,categorya,categoryb,mno,slat,slng) " +
                            " value(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            ps = conn.prepareStatement(sql);
            ps.setString(1, storeDto.getSname());
            ps.setString(2, storeDto.getSphone());
            ps.setString(3, storeDto.getSfile1());
            ps.setString(4, storeDto.getSfile2());
            ps.setString(5, storeDto.getSfile3());
            ps.setString(6, storeDto.getSfile4());
            ps.setString(7, storeDto.getSadress());
            ps.setString(8, storeDto.getScontent());
            ps.setString(9, storeDto.getSnumber());
            ps.setInt(10, storeDto.getCategorya());
            ps.setInt(11, storeDto.getCategoryb());
            ps.setLong(12, storeDto.getMno());
            ps.setString(13,storeDto.getSlat());
            ps.setString(14,storeDto.getSlng());
            int count = ps.executeUpdate();
            if (count == 1) {
                System.out.println("등록성공");
                return 1;
            }

        } catch (Exception e) {
            System.out.println("e = " + e);
        }
        return 0;
    }
    //1-1 가게이름 중복 검사
    public  boolean doGetNameCheck(String sname){
        System.out.println("StoreDao.doGetNameCheck");
        System.out.println("sname = " + sname);
        try {
            String sql="select * from store where sname like '"+sname+"'";
            ps=conn.prepareStatement(sql);
            rs=ps.executeQuery();
            if(rs.next()){return true;}
        }catch (Exception e){
            System.out.println("e = " + e);
        }
        return false;
    }
    //1-2 사업자번호 중복 검사
    public  boolean doGetNumberCheck( String snumber){
        System.out.println("StoreDao.doGetNameCheck");
        System.out.println("snumber = " + snumber);
        try {
            String sql="select * from store where snumber like '"+snumber+"'";
            ps=conn.prepareStatement(sql);
            rs=ps.executeQuery();
            if(rs.next()){return true;}
        }catch (Exception e){
            System.out.println("e = " + e);
        }

        return false;
    }
    //2. 가게 전체 출력
    public List<StoreDto> dogetStoreViewList(int startrow, int pageStoreSize, int categorya, int categoryb, String key, String keyword) {
        System.out.println("StoreController.doGetStoreList");
        StoreDto storeDto = null;
        List<StoreDto> list = new ArrayList<>();
        try {
            String sql = "select * from store where (sstate= 1 or sstate = 2) " ;
            //================1. 만약에 카테고리 조건이 있으면 where 추가.
            // 1. 카테고리 구분
            // 1-1. 카테고리 A가 있는경우
            if(categorya>0 && categoryb==0){sql+=" and categorya = " + categorya;}
            // 1-2. 카테고리 A가 있고 카테고리 B가 있는경우
            else if(categorya>0 && categoryb>0){ sql +=" and categorya = " +categorya+" and categoryb =" +categoryb;}
            // 1-3. 카테고리 B만 있는경우
            else if (categorya==0 && categoryb > 0) {
                sql+=" and categoryb = " + categoryb;
            }

            //================2. 만약에 검색 있을때
            if(!keyword.isEmpty() ){ sql+= " and "+ key +" like '%"+keyword+"%' ";}


            sql+=" order by sno desc limit ? , ?";



            ps=conn.prepareStatement(sql);
            ps.setInt(1,startrow);
            ps.setInt(2,pageStoreSize);
            rs=ps.executeQuery();
            while(rs.next()){
                storeDto=  StoreDto.builder()
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
                System.out.println("sql = " + sql);
                System.out.println("list = " + list);
            }

        } catch (Exception e) {
            System.out.println("e = " + e);
        }

        return list;
    }
    //2-2. 맛집 출력
    public List<StoreDto> doGetBestList(int startrow, int pageStoreSize, int categorya, int categoryb, String key, String keyword) {
        System.out.println("StoreController.doGetStoreList");
        StoreDto storeDto = null;
        List<StoreDto> list = new ArrayList<>();
        try {
            String sql = "select * from store where sstate = 2 " ;
            //================1. 만약에 카테고리 조건이 있으면 and 추가.
            // 1. 카테고리 구분
            // 1-1. 카테고리 A가 있는경우
            if(categorya>0 && categoryb==0){sql+=" and categorya = " + categorya;}
            // 1-2. 카테고리 A가 있고 카테고리 B가 있는경우
            else if(categorya>0 && categoryb>0){ sql +=" and categorya = " +categorya+" and categoryb =" +categoryb;}
            // 1-3. 카테고리 B만 있는경우
            else if (categorya==0 && categoryb > 0) {
                sql+=" and categoryb = " + categoryb;
            }

            //================2. 만약에 검색 있을때
            if(!keyword.isEmpty() ){ sql+= " and "+ key +" like '%"+keyword+"%' ";}


            sql+=" order by sno desc limit ? , ?";



            ps=conn.prepareStatement(sql);
            ps.setInt(1,startrow);
            ps.setInt(2,pageStoreSize);
            rs=ps.executeQuery();
            while(rs.next()){
                storeDto=  StoreDto.builder()
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
                System.out.println("sql = " + sql);
                System.out.println("list = " + list);
            }

        } catch (Exception e) {
            System.out.println("e = " + e);
        }

        return list;
    }

    //2-3. 전체 게시물 수 호출
    public int getStoreSize(int categorya, int categoryb, String key, String keyword) {
        System.out.println("categorya = " + categorya + ", categoryb = " + categoryb + ", key = " + key + ", keyword = " + keyword);
        try{
            String sql = "select count(*) from store where (sstate= 1 or sstate = 2) ";

            //================1. 만약에 카테고리 조건이 있으면 and 추가.
            // 1. 카테고리 구분
            // 1-1. 카테고리 A가 있는경우
            if(categorya>0 && categoryb==0){sql+=" and categorya = " + categorya;}
            // 1-2. 카테고리 A가 있고 카테고리 B가 있는경우
            else if(categorya>0 && categoryb>0){ sql +=" and categorya = " +categorya+" and categoryb =" +categoryb;}
            // 1-3. 카테고리 B만 있는경우
            else if (categorya==0 && categoryb > 0) {
                sql+=" and categoryb = " + categoryb;
            }

            //================2. 만약에 검색 있을때
            if(!keyword.isEmpty() ){ sql+= " and "+ key +" like '%"+keyword+"%' ";}

            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            if( rs.next() ){ return rs.getInt(1); }
        }catch (Exception e ){  System.out.println("e = " + e);}
        return 0;
    }

    //2-4. 전체 게시물 수 호출
    public int getBestSize(int categorya, int categoryb, String key, String keyword) {
        System.out.println("categorya = " + categorya + ", categoryb = " + categoryb + ", key = " + key + ", keyword = " + keyword);
        try{
            String sql = "select count(*) from store where sstate = 2";

            //================1. 만약에 카테고리 조건이 있으면 and 추가.
            // 1. 카테고리 구분
            // 1-1. 카테고리 A가 있는경우
            if(categorya>0 && categoryb==0){sql+=" and categorya = " + categorya;}
            // 1-2. 카테고리 A가 있고 카테고리 B가 있는경우
            else if(categorya>0 && categoryb>0){ sql +=" and categorya = " +categorya+" and categoryb =" +categoryb;}
            // 1-3. 카테고리 B만 있는경우
            else if (categorya==0 && categoryb > 0) {
                sql+=" and categoryb = " + categoryb;
            }

            //================2. 만약에 검색 있을때
            if(!keyword.isEmpty() ){ sql+= " and "+ key +" like '%"+keyword+"%' ";}

            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            if( rs.next() ){ return rs.getInt(1); }
        }catch (Exception e ){  System.out.println("e = " + e);}
        return 0;
    }

    //3. 가게상세 페이지 호출
    public StoreDto doGetStoreInfo(int sno){
        StoreDto storeDto =null;
        System.out.println("StoreDao.doGetStoreInfo");
        try {
            String sql="select * from store where sno=? ";
            ps= conn.prepareStatement(sql);
            ps.setLong(1,sno); rs=ps.executeQuery();
            if(rs.next()){
                storeDto = StoreDto.builder()
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
            }

        }catch (Exception e){
            System.out.println("e = " + e);
        }

        return storeDto;
    }

    //4. 가게 정보 수정
    public Boolean doPutStore(StoreDto storeDto){
        System.out.println("StoreDao.doPutStore");
        try {
            String sql= "update store set sname=?,sphone=?,sadress=?,scontent=?,snumber=?," +
                    "categorya=?,categoryb=?, simg1=?, simg2=?, simg3=?, simg4=?, slat=?, slng=? where sno= ?";
            ps=conn.prepareStatement(sql);
            ps.setString(1,storeDto.getSname());
            ps.setString(2,storeDto.getSphone());
            ps.setString(3,storeDto.getSadress());
            ps.setString(4,storeDto.getScontent());
            ps.setString(5,storeDto.getSnumber());
            ps.setLong(6,storeDto.getCategorya());
            ps.setLong(7,storeDto.getCategoryb());
            ps.setString(8, storeDto.getSfile1());
            ps.setString(9, storeDto.getSfile2());
            ps.setString(10, storeDto.getSfile3());
            ps.setString(11, storeDto.getSfile4());
            ps.setString(12,storeDto.getSlat());
            ps.setString(13,storeDto.getSlng());
            ps.setLong(14, storeDto.getSno());

            int count=ps.executeUpdate();
            if(count==1){
                return true;
            }
        }catch (Exception e){
            System.out.println("e = " + e);
        }
        return false;
    }


    //5. 가게 정보 삭제
    public boolean doDeleteStore( int sno){System.out.println("StoreController.doDeleteStore");
        try {
            String sql="delete from store where sno="+sno;
            ps=conn.prepareStatement(sql);
            int count=ps.executeUpdate();
            if(count==1){
                return true;
            }

        }catch (Exception e){
            System.out.println("e = " + e);
        }
        return false;
    }
    //6. 리뷰 작성
    public boolean postReviewWrite(ReviewDto reviewDto){
        System.out.println("StoreController.postReviewWrite");
        try{

            String sql="insert into review(rvcontent,rvimg,mno,sno) values(?,?,?,?)";
            ps= conn.prepareStatement(sql);
            ps.setString(1,reviewDto.getRvcontent());
            ps.setString(2,reviewDto.getRvimg());
            ps.setInt(3,reviewDto.getMno());
            ps.setInt(4,reviewDto.getSno());
            int count= ps.executeUpdate();
            if(count==1){// 리뷰 썼을 때.////////////////// 승호 새벽 추가 기능 스타트 /////////////
                /*비짓함수(reviewDto);*/
                sql = "select count(*) from review where mno =? and sno =?";
                ps = conn.prepareStatement(sql);
                ps.setInt(1,reviewDto.getMno());
                ps.setInt(2,reviewDto.getSno());
                rs=ps.executeQuery();
                int visitCount = 0;
                if(rs.next()){visitCount = rs.getInt("count(*)");
                    sql = "insert into coupon(ckind, mno, sno) values (?,?,?)";
                    ps = conn.prepareStatement(sql);
                    if(visitCount==1){ ps.setInt(1, 0);} // 1번 방문시 ckind 0
                    else if(visitCount>=10){ ps.setInt(1, 3); } // 10번이상 방문시 ckind 3
                    else if(visitCount>=4){ ps.setInt(1, 2); } // 4번이상 방문시 ckind 2
                    else if(visitCount>=2){ ps.setInt(1, 1); } // 2번이상 방문시 ckind 1
                    ps.setInt(2,reviewDto.getMno());
                    ps.setInt(3,reviewDto.getSno());
                    int count2 = ps.executeUpdate();
                    if(count2==1){
                        return true;
                    }////////////////////////////////// 까지 완료

                }



            }
        }catch (Exception e){
            System.out.println("e = " + e);
        }

        return false;
    }
    //7. 리뷰 출력
    public List<ReviewDto> getReview(int sno){System.out.println("StoreDao.getReview");
        List<ReviewDto> list=new ArrayList<>();
        ReviewDto reviewDto=null;
        try {
            String sql="select * from review r join member m on r.mno= m.mno where sno="+sno;
            ps=conn.prepareStatement(sql);
            rs= ps.executeQuery();
            while (rs.next()){
                reviewDto=ReviewDto.builder()
                        .rvno(rs.getInt("rvno"))
                        .rvimg(rs.getString("rvimg"))
                        .rvcontent(rs.getString("rvcontent"))
                        .rvdate(rs.getString("rvdate"))
                        .sno(rs.getInt("sno"))
                        .mno(rs.getInt("mno"))
                        .mid(rs.getString("mid"))
                        .build();
                list.add(reviewDto);
            }

        }catch (Exception e){
            System.out.println("e = " + e);
        }
        return list;
    }

    //8. 맛집 등업
    public int getRevisitCount(int sno){
        System.out.println("StoreDao.getRevisitCount");
        try {
            int reviewCount=0;
            int reviewMCount=0;
            String sql="select count(*) from review where sno = " +sno+ " group by mno";
            ps=conn.prepareStatement(sql);
            rs= ps.executeQuery();
            while (rs.next()){
                reviewCount+= rs.getInt("count(*)");
                reviewMCount++;
                System.out.println("reviewCount = " + reviewCount);
                System.out.println("reviewMCount = " + reviewMCount);
            }
            if(reviewCount-reviewMCount>=5){
                String sql2 = "update store set sstate = 2 where sno = " +sno+ " and sstate=1";
                ps=conn.prepareStatement(sql2);
                int count= ps.executeUpdate();
                if (count==1){
                    System.out.println(" 맛집등업성공 ");
                }
            }

            return reviewCount-reviewMCount ;

        }catch (Exception e){
            System.out.println("e = " + e);
        }
        return 0;
    }

    // 9. 즐겨찾기 등록
    public boolean doGetSlikeCreate( int sno , int mno){
        System.out.println("StoreDao.doGetPlikeCreate");
        try {
            String sql="insert into slike values(?,?)";
            ps = conn.prepareStatement(sql);
            ps.setInt(1,mno);
            ps.setInt(2,sno);
            int count = ps.executeUpdate();
            if(count == 1){
                return true;
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return false;
    }

    // 10. 즐겨찾기 출력
    public boolean doGetSlikeRead( int sno , int mno){
        System.out.println("sno = " + sno);
        System.out.println("mno = " + mno);
        System.out.println("StoreDao.doGetPlikeRead");
        try {
            String sql="select * from slike where mno = ? and sno = ?";
            ps = conn.prepareStatement(sql);
            ps.setInt(1,mno);
            ps.setInt(2,sno);
            rs = ps.executeQuery();
            if(rs.next()){
                return true;
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return false;
    }

    // 11. 즐겨찾기 삭제
    public boolean doGetSlikeDelete( int sno , int mno){
        System.out.println("StoreDao.doGetSlikeDelete");
        try {
            String sql="delete from slike where mno = ? and sno = ?";
            ps = conn.prepareStatement(sql);
            ps.setInt(1,mno);
            ps.setInt(2,sno);
            int count = ps.executeUpdate();
            if(count == 1){
                return true;
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return false;
    }

    //12. 인증코드 생성 후 대입
    public boolean doGetScode(){
        System.out.println("StoreDao.doPostScode");
        int count=0;
        try {
            String sql= "select count(*) from store";
            ps=conn.prepareStatement(sql);
            rs= ps.executeQuery();
            if(rs.next()){
                count=rs.getInt("count(*)");
                System.out.println("count = " + count);
                for (int i=1; i<=count;i++){
                    Random rand =new Random();
                    String temp= Integer.toString(rand.nextInt(8)+1);
                    for (int j= 0; j<7;j++){
                        temp+=Integer.toString(rand.nextInt(9));
                    }
                    System.out.println("temp = " + temp);
                    String sql2= "update store set scode = "+temp+" where sno = "+i ;
                    ps=conn.prepareStatement(sql2);
                    int count2=ps.executeUpdate();
                    if(count2==1){
                        System.out.println("갱신성공"+i);
                    }
                }
                return true;
            }
        }catch (Exception e){
            System.out.println("e = " + e);
        }
        return false;
    }

    //13. 인증코드 인증
    public boolean doPostAuth(String scode ,int sno){
        System.out.println("StoreDao.doPostAuth");
        try {
            String sql="select * from store where scode = "+ scode +" and sno = "+sno;
            ps=conn.prepareStatement(sql);
            rs= ps.executeQuery();
            if(rs.next()){
                return true;
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return false;
    }

    //14. 작성자 인증
    public  boolean storeWriterAuth(long sno,String mid){
        try {
            String sql="select * from store s inner join member m "+
                    " on s.mno= m.mno"+
                    " where s.sno ="+sno+
                    " and m.mid = " +mid;
            ps=conn.prepareStatement(sql);
            rs= ps.executeQuery();
            if(rs.next()){return true;}
        }catch (Exception e){
            System.out.println("e = " + e);
        }return false;
    }
}