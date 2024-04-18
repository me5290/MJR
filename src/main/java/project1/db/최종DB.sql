drop database if exists mzr;
create database mzr;
use mzr;

drop table if exists member;
create table member(
   mno int unsigned auto_increment primary key,   # 회원식별번호
    mid varchar(12) not null unique,   # 회원 아이디
    mpw varchar(16) not null,   # 회원 비밀번호
    mname varchar(20) not null,   # 회원 이름
    memail varchar(30) not null unique,   # 회원 이메일
    mphone varchar(14) not null unique,   # 회원 전화번호
    mbirth varchar(8) not null, # 회원 생일
    msex varchar(2) not null,   # 회원 성별
    maddress varchar(30) not null,# 회원 주소
    mdate datetime default now(),   # 회원가입 날짜
    mimg varchar(255) default 'default.jpg',   # 회원 프로필사진
    mstate int default 0   # 회원 계정상태 (0=일반회원 , 1=정지회원 , 2=탈퇴 , 3=관리자)
    #   mcoupon      # 보유한 쿠폰
);

select * from member where not mno = 1;

drop table if exists board;
create table board(
   bno int unsigned auto_increment primary key,   # 게시글 식별번호PK
    bname varchar(20) not null,                  # 게시글 제목
    bcontent longtext,                        # 게시글 내용(사진,글가능)
    bcount int default 0,                     # 게시글 조회수
    bdate datetime default now(),               # 게시글 최초등록날짜
    mno int unsigned,                        # 등록한 사람 회원번호
    categorya int not null,                     # 카테고리 지역 (인덱스번호로 식별함)
    categoryb int default 0,                  # 카테고리 메뉴유형 (인덱스번호로 식별함)
    foreign key(mno) references member(mno)      # 게시글 작성자  FK
);


drop table if exists reply;
create table reply(
   rpno int auto_increment primary key,         # 댓글번호
    rpcontent varchar(100) not null,   # 댓글내용
    rpdate datetime default now(),      # 댓글 최초등록일
    mno int unsigned,               # 댓글작성자 FK
    bno int unsigned,               # 게시글 식별번호 FK
    rpindex int unsigned default 0 not null,

    foreign key(mno) references member(mno),
    foreign key(bno) references board(bno) on delete cascade
);

drop table if exists store;
create table store(
	sno int unsigned auto_increment ,       # 가계 식별번호
    sname varchar(50) not null unique ,      #가계 이름
    sphone varchar(13) not null,   # 전화번호
    simg1 longtext not null,       # 대표 이미지1
    simg2 longtext not null,       # 이미지2
    simg3 longtext not null,       # 이미지3
    simg4 longtext not null,       # 이미지4
    sadress varchar(50) not null ,    # 가계주소
    scontent text not null,    # 가계설명
    sstate int not null default 0,      # 가계상태 0: 등록대기상태 1: 등록된 가게 2: 맛집 3: 반려 상태
    # srevisit int not null default 0,   # 총재방문횟수
    snumber varchar(20) not null unique, # 사업자 번호
    categorya int not null,                     # 카테고리 지역 (인덱스번호로 식별함)
    categoryb int default 0,                  # 카테고리 메뉴유형 (인덱스번호로 식별함)
    slat varchar(30) not null default 37.3218778,               -- 가게 위치 경도
    slng varchar(30) not null default 126.8308848,                  -- 가게 위치 위도
    scode char(8) not null default '12345678',				-- 리뷰시 필요한 인증코드

    mno int unsigned,      # FK

    primary key(sno),

   foreign key(mno) references member(mno)
);



drop table if exists review;
create table review(
	rvno int auto_increment,                  # 리뷰 식별번호
    rvcontent text not null,      # 리뷰 내용
    rvimg longtext,
    rvdate datetime default now(),   # 리뷰 작성일자
    sno int unsigned,                  # 가게번호
    mno int unsigned,                  # 리뷰 작성자 번호

    primary key(rvno),

    foreign key(mno) references member(mno),
    foreign key(sno) references store(sno) on delete cascade
);


drop table if exists slike;
create table slike(
	mno int unsigned,
    sno int unsigned,
    constraint plike_mno_fk foreign key(mno) references member(mno) on update cascade on delete cascade,
    constraint plike_pno_fk foreign key(sno) references store(sno) on update cascade on delete cascade
);

drop table if exists coupon;

create table coupon(
	cno int unsigned auto_increment primary key,
    cstate boolean default 0,  -- 0은 사용 전 / 1은 사용 후
	cdate datetime default now(),
	ckind int not null,
	-- 0은 같은 가게 1번 방문시 1000원 할인
	-- 1은 같은 가게 2번 방문시 3000원 할인
	-- 2은 같은 가게 4번 방문시 5000원 할인
	-- 3은 같은 가게 10번 방문시 10000원 할인


	mno int unsigned,
    sno int unsigned,

    foreign key(mno) references member(mno) on delete cascade,
    foreign key(sno) references store(sno) on delete cascade
);



# 샘플 코드-----------------------------------------------------------------
#member
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('admin','admin','관리자','email', '010-0000-0000',00000000 , 0, '주소', 3);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('1id','1pw','1name','1email', '010-0000-0001',00000001 , 0, '주소1', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('2id','2pw','2name','2email', '010-0000-0002',00000002 , 0, '주소2', 1);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('3id','3pw','3name','3email', '010-0000-0003',00000003 , 0, '주소3', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('4id','4pw','4name','4email', '010-0000-0004',00000004 , 0, '주소4', 1);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('5id','5pw','5name','5email', '010-0000-0005',00000005 , 0, '주소5', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('6id','6pw','6name','6email', '010-0000-0006',00000006 , 0, '주소6', 1);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('7id','7pw','7name','7email', '010-0000-0007',00000007 , 0, '주소7', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('8id','8pw','8name','8email', '010-0000-0008',00000008 , 0, '주소8', 1);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('9id','9pw','9name','9email', '010-0000-0009',00000009 , 0, '주소9', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('10id','10pw','10name','10email', '010-0000-0010',00000010 , 1, '주소10', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('11id','11pw','11name','11email', '010-0000-0011',00000011 , 1, '주소11', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('12id','12pw','12name','12email', '010-0000-0012',00000012 , 1, '주소12', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('13id','13pw','13name','13email', '010-0000-0013',00000013 , 1, '주소13', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('14id','14pw','14name','14email', '010-0000-0014',00000014 , 1, '주소14', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('15id','15pw','15name','15email', '010-0000-0015',00000015 , 1, '주소15', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('16id','16pw','16name','16email', '010-0000-0016',00000016 , 1, '주소16', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('17id','17pw','17name','17email', '010-0000-0017',00000017 , 1, '주소17', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('18id','18pw','18name','18email', '010-0000-0018',00000018 , 1, '주소18', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('19id','19pw','19name','19email', '010-0000-0019',00000019 , 1, '주소19', 0);
insert into member(mid, mpw, mname, memail, mphone, mbirth, msex, maddress, mstate) values ('20id','20pw','20name','20email', '010-0000-0020',00000020 , 1, '주소20', 0);
# board
insert into board(bname, bcontent, mno, categorya, categoryb) values ('1번글', '1번내용', 1, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('2번글', '2번내용', 1, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('3번글', '3번내용', 1, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('4번글', '4번내용', 2, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('5번글', '5번내용', 2, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('6번글', '6번내용', 2, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('7번글', '7번내용', 3, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('8번글', '8번내용', 3, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('9번글', '9번내용', 3, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('10번글', '10번내용', 4, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('11번글', '11번내용', 4, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('12번글', '12번내용', 4, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('13번글', '13번내용', 5, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('14번글', '14번내용', 5, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('15번글', '15번내용', 5, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('16번글', '16번내용', 6, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('17번글', '17번내용', 6, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('18번글', '18번내용', 6, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('19번글', '19번내용', 7, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('20번글', '20번내용', 7, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('21번글', '21번내용', 7, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('22번글', '22번내용', 8, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('23번글', '23번내용', 8, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('24번글', '24번내용', 8, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('25번글', '25번내용', 9, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('26번글', '26번내용', 9, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('27번글', '27번내용', 9, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('28번글', '28번내용', 10, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('29번글', '29번내용', 10, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('30번글', '30번내용', 10, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('31번글', '31번내용', 11, 0, 0);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('32번글', '32번내용', 11, 0, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('33번글', '33번내용', 11, 1, 0);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('34번글', '34번내용', 1, 2, 2);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('35번글', '35번내용', 1, 3, 3);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('36번글', '36번내용', 1, 4, 4);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('37번글', '37번내용', 2, 5, 5);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('38번글', '38번내용', 2, 6, 6);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('39번글', '39번내용', 2, 2, 2);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('40번글', '40번내용', 3, 3, 3);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('41번글', '41번내용', 3, 4, 4);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('42번글', '42번내용', 3, 5, 5);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('43번글', '43번내용', 4, 6, 6);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('44번글', '44번내용', 4, 2, 2);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('45번글', '45번내용', 4, 3, 3);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('46번글', '46번내용', 5, 4, 4);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('47번글', '47번내용', 5, 5, 5);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('48번글', '48번내용', 5, 6, 6);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('49번글', '49번내용', 6, 7, 6);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('50번글', '50번내용', 6, 2, 3);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('51번글', '51번내용', 6, 2, 4);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('52번글', '52번내용', 7, 2, 5);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('53번글', '53번내용', 7, 2, 6);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('54번글', '54번내용', 7, 3, 4);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('55번글', '55번내용', 8, 3, 5);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('56번글', '56번내용', 8, 3, 6);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('57번글', '57번내용', 8, 4, 3);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('58번글', '58번내용', 9, 4, 5);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('59번글', '59번내용', 9, 4, 6);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('60번글', '60번내용', 9, 5, 2);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('61번글', '61번내용', 10, 5, 3);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('62번글', '62번내용', 10, 5, 4);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('63번글', '63번내용', 10, 5, 6);

insert into board(bname, bcontent, mno, categorya, categoryb) values ('64번글', '64번내용', 11, 6, 1);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('65번글', '65번내용', 11, 6, 2);
insert into board(bname, bcontent, mno, categorya, categoryb) values ('66번글', '66번내용', 11, 6, 3);


#reply
insert into reply(rpcontent, mno, bno, rpindex) values('1번댓글', 1, 1, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('2번댓글', 1, 2, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('3번댓글', 1, 3, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('4번댓글', 2, 1, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('5번댓글', 2, 2, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('6번댓글', 2, 3, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('7번댓글', 3, 2, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('8번댓글', 3, 3, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('9번댓글', 3, 4, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('10번댓글', 4, 4, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('11번댓글', 4, 5, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('12번댓글', 4, 6, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('13번댓글', 5, 6, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('14번댓글', 5, 7, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('15번댓글', 5, 8, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('16번댓글', 6, 8, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('17번댓글', 6, 9, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('18번댓글', 6, 10, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('19번댓글', 7, 10, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('20번댓글', 7, 11, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('21번댓글', 7, 12, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('22번댓글', 8, 12, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('23번댓글', 8, 13, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('24번댓글', 8, 14, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('25번댓글', 9, 14, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('26번댓글', 9, 15, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('27번댓글', 9, 16, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('28번댓글', 10, 16, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('29번댓글', 10, 17, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('30번댓글', 10, 18, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('31번댓글', 11, 18, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('32번댓글', 11, 19, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('33번댓글', 11, 20, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('34번댓글', 12, 20, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('35번댓글', 12, 21, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('36번댓글', 12, 22, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('37번댓글', 13, 22, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('38번댓글', 13, 23, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('39번댓글', 13, 24, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('40번댓글', 14, 24, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('41번댓글', 14, 25, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('42번댓글', 14, 26, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('43번댓글', 15, 26, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('44번댓글', 15, 27, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('45번댓글', 15, 28, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('46번댓글', 16, 28, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('47번댓글', 16, 29, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('48번댓글', 16, 30, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('49번댓글', 17, 30, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('50번댓글', 17, 31, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('51번댓글', 17, 32, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('52번댓글', 18, 33, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('53번댓글', 18, 1, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('54번댓글', 18, 2, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('55번댓글', 19, 3, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('56번댓글', 19, 3, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('57번댓글', 19, 4, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('58번댓글', 20, 4, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('59번댓글', 20, 5, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('60번댓글', 20, 6, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('61번댓글', 21, 6, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('62번댓글', 21, 7, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('63번댓글', 21, 8, 0);

insert into reply(rpcontent, mno, bno, rpindex) values('64번댓글', 2, 8, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('65번댓글', 2, 9, 0);
insert into reply(rpcontent, mno, bno, rpindex) values('66번댓글', 2, 10, 0);

# store
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('어썸레스토', '031-111-1112', 'ex1food1.jpg','ex1food2.jpg','ex1food3.jpg','ex1food4.jpg', '경기 안산시 상록구 이동공원로 43-1 1층', '안산 사동 분위기 있는 파스타', 2, '111-11-11111', 1, 4, 37.3096519, 126.8495772, 2);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('미소돈가스', '031-438-8252', 'ex2food1.jpg','ex2food2.jpg','ex2food3.jpg','ex2food4.jpg', '경기 안산시 상록구 광덕1로 375', '생과일을 갈아만든 새콤달콤한소스와 얼리지않은 생고기로 만들어 부드럽습니다', 2, 111-11-11112, 1, 2, 37.3084469, 126.8509734, 3);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('롯데리아 안산한양대점', '031-501-7474', 'ex3food1.jpg','ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기 안산시 상록구 광덕1로 379 한남빌딩Ⅰ', '롯데리아 안산한양대점Ⅰ', 2, 111-11-11113, 1, 6, 37.30848072978414, 126.85126192867756, 3);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('감탄떡볶이 한대역점', '031-417-3506', 'ex4food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기 안산시 상록구 광덕1로 370 코로스프라자', '감탄떡볶이 한대역점입니다', 2, 111-11-11114, 4, 5, 37.3076815100534, 126.85115918322465, 4);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('행복짬뽕', '031-407-3316', 'ex5food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', '경기 안산시 상록구 양지편로 32 조강프라자112호.행복짬뽕', '한대앞 먹자골목에 있어요', 2, 111-11-11115, 5, 3, 37.30892463654298, 126.8509198471104, 5);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('동해킹크랩대게', '031-111-1114', 'ex6food1.jpg','ex6food2.jpg','ex6food3.jpg','ex6food4.jpg', '경기 안산시 상록구 양지편로 37 1층', '안산 대게 안산 킹크랩 안산 랍스터', 2, 111-11-11116, 4, 2, 37.30973580694004, 126.85111001219349, 5);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('미스터빠삭 한대앞역점', '031-111-1113', 'ex7food1.jpg','ex7food2.jpg','ex7food3.jpg','ex7food4.jpg', '경기 안산시 상록구 광덕1로 386 1층 미스터빠삭 한대앞역점', '미스터빠삭 한대앞역점입니다', 2, 111-11-11117, 3, 2, 37.30856603366689, 126.85236442297533, 6);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('맛수원왕갈비', '031-417-6635', 'ex8food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg','경기도 안산시 상록구중보1길 18, 1층', '수원소생갈비선부동내용', 2, '111-22-33332', 1, 1, 37.30625800, 126.8496580, 7);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('명장한우', '031-415-0068', 'ex9food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기도 안산시 상록구 광덕1로 346, 301호', '명장한우명장한우명장한우', 2, '111-22-33334', 1, 1, 37.30637300, 126.8482930, 8);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('새벽순댓국', '031-502-4575', 'ex10food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기도 안산시 상록구 송호로 12-1', '새벽순댓국새벽순댓국새벽순댓국', 2, '111-22-33335', 1, 1, 37.31259000, 126.8481900, 9);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('서울깍두기', '031-416-0506', 'ex11food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기도 안산시 상록구 광덕1로 365, 105,106호', '서울깍두기서울깍두기서울깍두기', 2, '111-22-33336', 1, 1, 37.30779000, 126.8500160, 10);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('신촌설렁탕', '031-406-2561', 'ex12food1.jpg','ex6food2.jpg','ex6food3.jpg','ex6food4.jpg', '경기도 안산시 상록구 광덕1로 386, 110호', '신촌설렁탕신촌설렁탕신촌설렁탕', 2, '111-22-33337', 1, 1, 37.30837000, 126.8523500, 10);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('월남쌈', '031-406-2712', 'ex13food1.jpg','ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기도 안산시 상록구 송호1길 11', '월남쌈월남쌈월남쌈월남쌈', 2, '111-22-33338', 1, 3, 37.31178600, 126.8466350, 11);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('육덕봉', '031-409-8954','ex14food1.jpg', 'ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기도 안산시 상록구 충장로6길 22-2, 1층', '육덕봉육덕봉육덕봉육덕봉', 2, '111-22-33339', 1, 1,37.30834100, 126.8585990, 11);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('한양복국시', '031-502-0221','ex15food1.jpg', 'ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기도 안산시 상록구 송호1길 93', '한양복국시한양복국시한양복국시', 2, '111-22-33340', 1, 1,37.31169900, 126.8485980, 12);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('홍익궁중전통육개장', '031-409-6669', 'ex16food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', '경기도 안산시 상록구 송호3길 3, 1층', '홍익궁중전통육개장홍익궁중전통육개장', 2, '111-22-33341', 1, 1, 37.31212200, 126.8459050, 12);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('청담물갈비청담물갈비', '031-417-3892', 'ex17food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', '경기도 안산시 상록구 광덕1로 379, 1층 112~113호', '청담물갈비청담물갈비청담물갈비', 2,'111-22-33342', 1, 1, 37.30864932, 126.8512432, 13);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('엄마곱창', '031-777-7777', 'ex18food1.jpg','ex18food2.jpg','ex18food3.jpg','ex18food4.jpg', ' 경기도 안산시 상록구 이동 715-3, 101호 ', '곱창막창 다 진짜 맛있는 엄마곱창', 2, '111-22-33343', 1, 1, 37.30837724165778, 126.85090682762126, 13);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('지게자', '031-727-7777', 'ex19food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', ' 경기도 안산시 상록구 이동 715-3 ', '생과일을 갈아만든 새콤달콤한소스', 2, '111-22-33344', 1, 1, 37.3030912, 126.8580352, 13);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('집밥집', '031-126-1234', 'ex20food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', ' 경기도 안산시 상록구 이동 715-3 ', '얼리지않은 생고기로 만들어 부드럽습니다', 2, '121-22-33344', 3, 4, 37.2965376, 126.8547584, 2);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('어썸레스토2', '031-111-1112', 'ex1food1.jpg','ex1food2.jpg','ex1food3.jpg','ex1food4.jpg', '경기 안산시 상록구 이동공원로 43-1 1층', '안산 사동 분위기 있는 파스타', 1, '211-11-11111', 1, 4, 37.30965, 126.84957, 2);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('미소돈가스2', '031-438-8252', 'ex2food1.jpg','ex2food2.jpg','ex2food3.jpg','ex2food4.jpg', '경기 안산시 상록구 광덕1로 375', '생과일을 갈아만든 새콤달콤한소스와 얼리지않은 생고기로 만들어 부드럽습니다', 1, 222-11-11112, 1, 4, 37.308449, 126.850734, 3);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('롯데리아 안산한양대점2', '031-501-7474', 'ex3food1.jpg','ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기 안산시 상록구 광덕1로 379 한남빌딩Ⅰ', '롯데리아 안산한양대점Ⅰ', 1, 222-11-11113, 1, 6, 37.308480729714, 126.85126167756, 3);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('감탄떡볶이 한대역점2', '031-417-3506', 'ex4food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기 안산시 상록구 광덕1로 370 코로스프라자', '감탄떡볶이 한대역점입니다', 1, 222-11-11114, 4, 5, 37.30768150534, 126.851159182465, 4);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('행복짬뽕2', '031-407-3316', 'ex5food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', '경기 안산시 상록구 양지편로 32 조강프라자112호.행복짬뽕', '한대앞 먹자골목에 있어요', 1, 222-11-11115, 5, 3, 37.308924654298, 126.85091981104, 5);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('동해킹크랩대게2', '031-111-1114', 'ex6food1.jpg','ex6food2.jpg','ex6food3.jpg','ex6food4.jpg', '경기 안산시 상록구 양지편로 37 1층', '안산 대게 안산 킹크랩 안산 랍스터', 1, 222-11-11116, 4, 2, 37.309735894004, 126.851110019349, 5);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('미스터빠삭 한대앞역점2', '031-111-1113', 'ex7food1.jpg','ex7food2.jpg','ex7food3.jpg','ex7food4.jpg', '경기 안산시 상록구 광덕1로 386 1층 미스터빠삭 한대앞역점', '미스터빠삭 한대앞역점입니다', 1, 222-11-11117, 3, 4, 37.308566066689, 126.852342297533, 6);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('맛수원왕갈비2', '031-417-6635', 'ex8food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg','경기도 안산시 상록구중보1길 18, 1층', '수원소생갈비선부동내용', 1, '222-22-33332', 1, 1, 37.3065800, 126.849580, 7);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('명장한우2', '031-415-0068', 'ex9food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기도 안산시 상록구 광덕1로 346, 301호', '명장한우명장한우명장한우', 1, '222-22-33334', 1, 1, 37.3037300, 126.882930, 8);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('새벽순댓국2', '031-502-4575', 'ex10food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기도 안산시 상록구 송호로 12-1', '새벽순댓국새벽순댓국새벽순댓국', 1, '222-22-33335', 1, 1, 37.3125000, 126.881900, 9);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('서울깍두기2', '031-416-0506', 'ex11food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기도 안산시 상록구 광덕1로 365, 105,106호', '서울깍두기서울깍두기서울깍두기', 1, '222-22-33336', 1, 1, 37.3779000, 126.850160, 10);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('신촌설렁탕2', '031-406-2561', 'ex12food1.jpg','ex6food2.jpg','ex6food3.jpg','ex6food4.jpg', '경기도 안산시 상록구 광덕1로 386, 110호', '신촌설렁탕신촌설렁탕신촌설렁탕', 1, '222-22-33337', 1, 1, 37.3087000, 126.853500, 10);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('월남쌈2', '031-406-2712', 'ex13food1.jpg','ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기도 안산시 상록구 송호1길 11', '월남쌈월남쌈월남쌈월남쌈', 1, '222-22-33338', 1, 3, 37.3117800, 126.846350, 11);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('육덕봉2', '031-409-8954','ex14food1.jpg', 'ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기도 안산시 상록구 충장로6길 22-2, 1층', '육덕봉육덕봉육덕봉육덕봉', 1, '222-22-33339', 1, 1,37.3083400, 126.885990, 11);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('한양복국시2', '031-502-0221','ex15food1.jpg', 'ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기도 안산시 상록구 송호1길 93', '한양복국시한양복국시한양복국시', 1, '222-22-33340', 1, 1,37.3116900, 126.848980, 12);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('홍익궁중전통육개장2', '031-409-6669', 'ex16food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', '경기도 안산시 상록구 송호3길 3, 1층', '홍익궁중전통육개장홍익궁중전통육개장', 1, '222-22-33341', 1, 1, 37.3121220, 126.859050, 12);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('청담물갈비청담물갈비2', '031-417-3892', 'ex17food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', '경기도 안산시 상록구 광덕1로 379, 1층 112~113호', '청담물갈비청담물갈비청담물갈비', 1,'222-22-33342', 1, 1, 37.3086432, 126.851432, 13);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('엄마곱창2', '031-777-7777', 'ex18food1.jpg','ex18food2.jpg','ex18food3.jpg','ex18food4.jpg', ' 경기도 안산시 상록구 이동 715-3, 101호 ', '곱창막창 다 진짜 맛있는 엄마곱창', 1, '222-22-33343', 1, 1, 37.308377245778, 126.850902762126, 13);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('지게자2', '031-727-7777', 'ex19food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', ' 경기도 안산시 상록구 이동 715-3 ', '생과일을 갈아만든 새콤달콤한소스', 1, '222-22-33344', 1, 1, 37.303912, 126.858352, 13);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('집밥집2', '031-126-1234', 'ex20food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', ' 경기도 안산시 상록구 이동 715-3 ', '얼리지않은 생고기로 만들어 부드럽습니다', 1, '221-22-33344', 3, 4, 37.296536, 126.854784, 2);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('어썸레스토3', '031-111-1112', 'ex1food1.jpg','ex1food2.jpg','ex1food3.jpg','ex1food4.jpg', '경기 안산시 상록구 이동공원로 43-1 1층', '안산 사동 분위기 있는 파스타', 1, '333-11-11111', 1, 4, 37.309619, 126.895772, 2);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('미소돈가스3', '031-438-8252', 'ex2food1.jpg','ex2food2.jpg','ex2food3.jpg','ex2food4.jpg', '경기 안산시 상록구 광덕1로 375', '생과일을 갈아만든 새콤달콤한소스와 얼리지않은 생고기로 만들어 부드럽습니다', 1, 333-11-11112, 1, 4, 37.308469, 126.850734, 3);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('롯데리아 안산한양대점3', '031-501-7474', 'ex3food1.jpg','ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기 안산시 상록구 광덕1로 379 한남빌딩Ⅰ', '롯데리아 안산한양대점Ⅰ', 1, 333-11-11113, 1, 6, 37.308480778414, 126.851292867756, 3);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('감탄떡볶이 한대역점3', '031-417-3506', 'ex4food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기 안산시 상록구 광덕1로 370 코로스프라자', '감탄떡볶이 한대역점입니다', 1, 333-11-11114, 4, 5, 37.307681510534, 126.8511918322465, 4);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('행복짬뽕3', '031-407-3316', 'ex5food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', '경기 안산시 상록구 양지편로 32 조강프라자112호.행복짬뽕', '한대앞 먹자골목에 있어요', 1, 333-11-11115, 5, 3, 37.308923654298, 126.85198471104, 5);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('동해킹크랩대게3', '031-111-1114', 'ex6food1.jpg','ex6food2.jpg','ex6food3.jpg','ex6food4.jpg', '경기 안산시 상록구 양지편로 37 1층', '안산 대게 안산 킹크랩 안산 랍스터', 1, 333-11-11116, 4, 2, 37.309735804004, 126.851110012349, 5);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('미스터빠삭 한대앞역점3', '031-111-1113', 'ex7food1.jpg','ex7food2.jpg','ex7food3.jpg','ex7food4.jpg', '경기 안산시 상록구 광덕1로 386 1층 미스터빠삭 한대앞역점', '미스터빠삭 한대앞역점입니다', 1, 333-11-11117, 3, 4, 37.308603366689, 126.852362297533, 6);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('맛수원왕갈비3', '031-417-6635', 'ex8food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg','경기도 안산시 상록구중보1길 18, 1층', '수원소생갈비선부동내용', 1, '333-22-33332', 1, 1, 37.305800, 126.86580, 7);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('명장한우3', '031-415-0068', 'ex9food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기도 안산시 상록구 광덕1로 346, 301호', '명장한우명장한우명장한우', 1, '333-22-33334', 1, 1, 37.3063300, 126.848930, 8);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('새벽순댓국3', '031-502-4575', 'ex10food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기도 안산시 상록구 송호로 12-1', '새벽순댓국새벽순댓국새벽순댓국', 1, '333-22-33335', 1, 1, 37.3125900, 126.848100, 9);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('서울깍두기3', '031-416-0506', 'ex11food1.jpg','ex4food2.jpg','ex4food3.jpg','ex4food4.jpg', '경기도 안산시 상록구 광덕1로 365, 105,106호', '서울깍두기서울깍두기서울깍두기', 1, '333-22-33336', 1, 1, 37.3079000, 126.800160, 10);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('신촌설렁탕3', '031-406-2561', 'ex12food1.jpg','ex6food2.jpg','ex6food3.jpg','ex6food4.jpg', '경기도 안산시 상록구 광덕1로 386, 110호', '신촌설렁탕신촌설렁탕신촌설렁탕', 1, '333-22-33337', 1, 1, 37.3037000, 126.852500, 10);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('월남쌈3', '031-406-2712', 'ex13food1.jpg','ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기도 안산시 상록구 송호1길 11', '월남쌈월남쌈월남쌈월남쌈', 1, '333-22-33338', 1, 3, 37.3117800, 126.846350, 11);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('육덕봉3', '031-409-8954','ex14food1.jpg', 'ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기도 안산시 상록구 충장로6길 22-2, 1층', '육덕봉육덕봉육덕봉육덕봉', 1, '333-22-33339', 1, 1,37.3083100, 126.855990, 11);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('한양복국시3', '031-502-0221','ex15food1.jpg', 'ex3food2.jpg','ex3food3.jpg','ex3food4.jpg', '경기도 안산시 상록구 송호1길 93', '한양복국시한양복국시한양복국시', 1, '333-22-33340', 1, 1,37.3116900, 126.848580, 12);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('홍익궁중전통육개장3', '031-409-6669', 'ex16food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', '경기도 안산시 상록구 송호3길 3, 1층', '홍익궁중전통육개장홍익궁중전통육개장', 1, '333-22-33341', 1, 1, 37.312120, 126.84050, 12);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('청담물갈비청담물갈비3', '031-417-3892', 'ex17food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', '경기도 안산시 상록구 광덕1로 379, 1층 112~113호', '청담물갈비청담물갈비청담물갈비', 1,'333-22-33342', 1, 1, 37.308632, 126.85132, 13);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('엄마곱창3', '031-777-7777', 'ex18food1.jpg','ex18food2.jpg','ex18food3.jpg','ex18food4.jpg', ' 경기도 안산시 상록구 이동 715-3, 101호 ', '곱창막창 다 진짜 맛있는 엄마곱창', 1, '333-22-33343', 1, 1, 37.3083775778, 126.8509068126, 13);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('지게자3', '031-727-7777', 'ex19food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', ' 경기도 안산시 상록구 이동 715-3 ', '생과일을 갈아만든 새콤달콤한소스', 1, '333-22-33344', 1, 1, 37.303012, 126.880352, 13);
insert into store(sname, sphone, simg1, simg2, simg3, simg4, sadress, scontent, sstate, snumber, categorya, categoryb, slat, slng, mno) values ('집밥집3', '031-126-1234', 'ex20food1.jpg','ex5food2.jpg','ex5food3.jpg','ex5food4.jpg', ' 경기도 안산시 상록구 이동 715-3 ', '얼리지않은 생고기로 만들어 부드럽습니다', 1, '333-12-33344', 3, 4, 37.296576, 126.854584, 2);



# review
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex1food1.jpg', 1 , 7);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex1food1.jpg', 1 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex1food1.jpg', 1 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex1food1.jpg', 1 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex1food1.jpg', 1 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex1food1.jpg', 1 , 7);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex1food1.jpg', 1 , 7);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex2food1.jpg', 2 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex2food1.jpg', 2 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex2food1.jpg', 2 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex2food1.jpg', 2 , 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex2food1.jpg', 2, 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex2food1.jpg', 2 , 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex2food1.jpg', 2 , 11);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex3food4.jpg', 3 , 7);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex3food4.jpg', 3 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex3food4.jpg', 3 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex3food4.jpg', 3 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex3food4.jpg', 3 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex3food4.jpg', 3 , 7);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex3food4.jpg', 3 , 7);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex4food2.jpg', 4 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex4food2.jpg', 4 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex4food2.jpg', 4 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex4food2.jpg', 4 , 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex4food2.jpg', 4, 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex4food2.jpg', 4 , 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex4food2.jpg', 4 , 11);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex5food1.jpg', 5 , 7);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex5food1.jpg', 5 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex5food1.jpg', 5 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex5food1.jpg', 5 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex5food1.jpg', 5 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex5food1.jpg', 5 , 7);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex5food1.jpg', 5 , 7);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex6food3.jpg', 6 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex6food3.jpg', 6 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex6food3.jpg', 6 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex6food3.jpg', 6 , 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex6food3.jpg', 6, 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex6food3.jpg', 6 , 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex6food3.jpg', 6 , 11);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요','ex8food1.jpg', 8, 7);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요','ex8food1.jpg', 8 , 9);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요','ex8food1.jpg', 8 , 9);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요','ex8food1.jpg', 8 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요','ex8food1.jpg', 8 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요','ex8food1.jpg', 8 , 7);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요','ex8food1.jpg', 8 , 7);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex7food1.jpg', 7 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex7food1.jpg', 7 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex7food1.jpg', 7 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex7food1.jpg', 7 , 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex7food1.jpg', 7, 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex7food1.jpg', 7 , 11);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex7food1.jpg', 7 , 11);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex9food1.jpg', 9 , 7);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex9food1.jpg', 9 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex9food1.jpg', 9 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex9food1.jpg', 9 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex9food1.jpg', 9 , 10);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex9food1.jpg', 9 , 7);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex9food1.jpg', 9 , 7);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex10food1.jpg', 10 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex10food1.jpg', 10 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex10food1.jpg', 10 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex10food1.jpg', 10 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex10food1.jpg', 10 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex10food1.jpg', 10 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex10food1.jpg', 10 , 3);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex11food1.jpg', 11 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex11food1.jpg', 11 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex11food1.jpg', 11 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex11food1.jpg', 11 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex11food1.jpg', 11 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex11food1.jpg', 11 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex11food1.jpg', 11 , 3);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex12food1.jpg', 12 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex12food1.jpg', 12 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex12food1.jpg', 12 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex12food1.jpg', 12 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex12food1.jpg', 12 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex12food1.jpg', 12 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex12food1.jpg', 12 , 3);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex13food1.jpg', 13 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex13food1.jpg', 13 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex13food1.jpg', 13 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex13food1.jpg', 13 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex13food1.jpg', 13 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex13food1.jpg', 13 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex13food1.jpg', 13 , 3);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex14food1.jpg', 14 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex14food1.jpg', 14 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex14food1.jpg', 14 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex14food1.jpg', 14 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex14food1.jpg', 14 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex14food1.jpg', 14 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex14food1.jpg', 14 , 3);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex15food1.jpg', 15 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex15food1.jpg', 15 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex15food1.jpg', 15 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex15food1.jpg', 15 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex15food1.jpg', 15 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex15food1.jpg', 15 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex15food1.jpg', 15 , 3);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex16food1.jpg', 16 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex16food1.jpg', 16 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex16food1.jpg', 16 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex16food1.jpg', 16 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex16food1.jpg', 16 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex16food1.jpg', 16 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex16food1.jpg', 16 , 3);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex17food1.jpg', 17 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex17food1.jpg', 17 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex17food1.jpg', 17 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex17food1.jpg', 17 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex17food1.jpg', 17 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex17food1.jpg', 17 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex17food1.jpg', 17 , 3);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex18food1.jpg', 18 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex18food1.jpg', 18 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex18food1.jpg', 18 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex18food1.jpg', 18 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex18food1.jpg', 18 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex18food1.jpg', 18 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex18food1.jpg', 18 , 3);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex19food1.jpg', 19 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex19food1.jpg', 19 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex19food1.jpg', 19 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex19food1.jpg', 19 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex19food1.jpg', 19 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex19food1.jpg', 19 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex19food1.jpg', 19 , 3);

insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex20food1.jpg', 20 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex20food1.jpg', 20 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex20food1.jpg', 20 , 8);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex20food1.jpg', 20 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex20food1.jpg', 20 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex20food1.jpg', 20 , 3);
insert into review(rvcontent,rvimg, sno, mno) values ('맛있어요', 'ex20food1.jpg', 20 , 3);




# 샘플코드 END -------------------------------------------------------------
select*from member;
select * from board;
select*from reply;
select*from store;
select*from review;
select * from slike;
select*from coupon;

select * from board b join member m on b.mno = m.mno order by b.bno  desc;
select * from reply rp join member m on rp.mno = m.mno order by rp.rpno desc;
select * from review rv join member m on rv.mno = m.mno order by rv.rvno desc;
select * from store s join member m on s.mno=m.mno where m.mno=2
