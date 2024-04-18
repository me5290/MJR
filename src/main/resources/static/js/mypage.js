// url에서 mno 추출
let mno = new URL(location.href).searchParams.get('mno');
console.log(mno);

let myinfoContent = document.querySelector('#mypageContentBox');
let html= ``;
let onMyinforesult = 0;
let onSessionresult = 0;

const categoryLista=['','안산','시흥','수원','부천','안양','서울'];
const categoryListb=['','한식','일식','중식','양식','분식','패스트푸드'];

getsessioninfo();
onMyinfo();

// 세션 정보 가져오기
function getsessioninfo(){
    $.ajax({
        url:'/member/mypage/getsessioninfo',
        method:'get',
        async:false,
        success:(r)=>{
            console.log(r);
            onSessionresult = r;
        }
    })
}

// 1. 내정보
function onMyinfo(){
    $.ajax({
        url:'/member/mypage/myinfo',
        method:'get',
        data:{'mno':mno},
        async:false,
        success:(r)=>{
            console.log(r);

            if(r != ''){
                onMyinforesult = r;

                document.querySelector('.nav_btn_badge:nth-child(1)').classList.add('active');
                document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
                document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
                document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
                document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
                document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
                document.querySelector('.nav_btn_badge:nth-child(7)').classList.remove('active');

                html = ``;

                html += `
                    <div class="infoBox">
                        <h3>기본정보</h3>
                        <div class="infoFlexBox">
                            <img src="/img/default.jpg"/>
                            <ul>
                                <li>
                                    <p>이름</p><span>${r.mname}</span>
                                </li>
                                <li>
                                    <p>이메일</p><span>${r.memail}</span>
                                </li>
                                <li>
                                    <p>전화번호</p><span>${r.mphone}</span>
                                </li>
                                <li>
                                    <p>가입날짜</p><span>${r.mdate}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                `;
                myinfoContent.innerHTML = html;
            }else{
                alert('잘못된 접근 입니다.');
                location.href="/main";
            }
        }
    })
}

// 2. 회원정보 값 출력
function updateView(){
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(7)').classList.remove('active');

    html = ``;

    if(onSessionresult.mstate == 3 && onMyinforesult.mno != onSessionresult.mno){
        html += '';
    }else{
        html += `
            <h3 class="updateTitle">회원정보 변경</h3>
            <form id="updateForm">
                <ul>
                    <li>
                        <p>아이디</p>
                        <input type="text" id="mid" name="mid" value="${onMyinforesult.mid}" readonly/>
                    </li>
                    <li>
                        <p>비밀번호</p>
                        <input type="password" onkeyup="pwCheck()" id="mpw" name="mpw" placeholder="비밀번호 입력"/>
                        <span class="pwcheckbox"></span>
                    </li>
                    <li>
                        <p>비밀번호 확인</p>
                        <input type="password" onkeyup="pwCheck()" id="mpwconfirm" name="mpwconfirm" placeholder="비밀번호 재입력"/>
                        <span class="pwconfirmcheckbox"></span>
                    </li>
                    <li>
                        <p>이름</p>
                        <input type="text" id="mname" name="mname" value="${onMyinforesult.mname}" readonly/>
                    </li>
                    <li>
                        <p>생년월일</p>
                        <input type="text" id="mbirth" name="mbirth" value="${onMyinforesult.mbirth}" readonly/>
                    </li>
                    <li>
                        <p>성별</p>
                        <div class="radioBox">남자<input type="radio" checked value="남자" name="msex" readonly/></div>
                        <div class="radioBox">여자<input type="radio" value="여자" name="msex" readonly/></div>
                    </li>
                    <li>
                        <p>전화번호</p>
                        <input type="text" onkeyup="phoneCheck()" id="mphone" name="mphone" placeholder="전화번호 입력" value="${onMyinforesult.mphone}"/>
                        <span class="phonecheckbox"></span>
                    </li>
                    <li id="emailLi">
                        <p>이메일</p>
                        <div class="emailBox">
                            <input type="text" onkeyup="emailCheck()" id="memail" name="memail" placeholder="이메일 입력" value="${onMyinforesult.memail}"/>
                            <button class="send" type="button" onclick="authreq()">
                                인증번호 발송
                            </button>
                        </div>
                        <span class="emailcheckbox"></span>
                    </li>
                    <li>
                        <p>주소</p>
                        <input type="text" id="sample3_address" class="maddress" name="maddress" placeholder="주소" value="${onMyinforesult.maddress}">
                    </li>
                    <li class="imgBox">
                        <p>프로필 사진</p>
                        <input onchange="onChangeImg(this)" type="file" id="mimg" name="profileimg" accept="image/*"/>
                    </li>
                    <li class="priview">
                        <img id="preimg" src="/img/default.jpg"/>
                    </li>
                </ul>
                <button id="updateBtn" type="button" onclick="updateInfo()">수정 완료</button>
                <a href="/main"><button id="updatebackBtn" type="button">취소</button></a>
            </form>
        `;
    }

    myinfoContent.innerHTML = html;
}

// 3. 회원정보 수정
function updateInfo(){
    let memberUpdateForm = document.querySelector('#updateForm');

    let memberUpdateFormData = new FormData(memberUpdateForm);

    memberUpdateFormData.set('mno',onMyinforesult.mno);

    console.log(memberUpdateFormData);

    $.ajax({
        url:'/member/mypage/updateinfo',
        method:'post',
        data:memberUpdateFormData,
        contentType:false,
        processData:false,
        success:(r)=>{
            console.log(r);
            if(r){
                alert('수정 완료');
            }
        }
    })
}

// 4. 내가 쓴 글 보기
function myWriteList(){
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(7)').classList.remove('active');

    $.ajax({
        url:'/member/mypage/boardlist',
        method:'get',
        async:false,
        data:{mno:mno},
        success:(r)=>{
            console.log(r);

            html = ``;

            html += `
                <div class="myBoardBox" style="400px; overflow-y: auto;">
                    <h3>내가 쓴 글</h3>
                    <table class="myBoardTable">
                        <colgroup>
                            <col style="width:12%">
                            <col style="width:68%">
                            <col style="width:20%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>게시물 번호</th>
                                <th>제목</th>
                                <th>작성일자</th>
                            </tr>
                        </thead>
                        <tbody class="myWriteBoard">

                        </tbody>
                    </table>
                </div>


                <div class="myReplyBox" style="400px; overflow-y: auto;">
                    <h3>내가 쓴 댓글</h3>
                    <table class="myReplyTable" >
                        <colgroup>
                            <col style="width:12%">
                            <col style="width:68%">
                            <col style="width:20%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>게시물 번호</th>
                                <th>댓글내용</th>
                                <th>작성일자</th>
                            </tr>
                        </thead>
                        <tbody class="myWriteReply">
                            ${onReplyList()}
                        </tbody>
                    </table>
                </div>
            `;

            myinfoContent.innerHTML = html;

            let myWriteBoard = document.querySelector('.myWriteBoard');
            let htmlBoard = ``;

            r.forEach((board)=>{
                htmlBoard += `
                    <tr>
                        <td>${board.bno}</td>
                        <td><a href="/board/oneview?bno=${board.bno}">${board.bname}</a></td>
                        <td>${board.bdate}</td>
                    </tr>
                `
            })

            myWriteBoard.innerHTML = htmlBoard;


        }
    })
}

// 5. 내가 쓴 댓글 출력
function onReplyList(){
    let subHtml = ``;
    let myWriteReply2 = document.querySelector('.myWriteReply');
    $.ajax({
        url:'/member/mypage/replylist',
        async:false,
        method:'get',
        data:{mno:mno},
        success:(r)=>{
            console.log(r);

            r.forEach((reply)=>{
                subHtml += `
                    <tr>
                        <td>${reply.bno}</td>
                        <td><a href="/board/oneview?bno=${reply.bno}">${reply.rpcontent}</a></td>
                        <td>${reply.rpdate}</td>
                    </tr>
                `
            });
        }
    });
    return subHtml;
}

// 6. 내 가게 보기
function myStoreList(){
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(7)').classList.remove('active');

    $.ajax({
        url:'/member/mypage/mystore',
        method:'get',
        data:{mno:mno},
        async:false,
        success:(r)=>{
            console.log(r);

            let html = ``;

            r.forEach((result)=>{
                if(result.sstate == 0){
                    result.sstate = '승인 대기';
                }else if(result.sstate == 1){
                    result.sstate = '일반';
                }else if(result.sstate == 2){
                    result.sstate = '맛집 선정';
                }

                for(let i = 0; i < categoryLista.length; i++){
                    if(result.categorya == i){
                        result.categorya = categoryLista[i];
                        console.log(result.categorya);
                    }
                }

                for(let i = 0; i < categoryListb.length; i++){
                    if(result.categoryb == i){
                        result.categoryb = categoryListb[i];
                        console.log(result.categoryb);
                    }
                }

                html += `
                    <div class="myStoreWrap">
                        <div class="myStoreBox">
                            <div class="myStoreContent">
                                <div class="myStoreImgBox">
                                    <img src="/img/${result.sfile1}" style="width:100px;">
                                </div>
                                <div class="myStoreInfoBox">
                                    <h5>${result.sname}<span>(${result.categorya})</span><span>(${result.categoryb})</span></h5>
                                    <p>${result.scontent}</p>
                                    <p>${result.snumber}</p>
                                    <p>가게 상태 : ${result.sstate}</p>
                                </div>
                            </div>
                        </div>
                        <ul class="myStoreReviewBox">
                            ${myStoreReviewList(result.sno)}
                        </ul>
                    </div>
                `;
            })

            myinfoContent.innerHTML = html;
        }
    })
}

// 7. 내 가게 리뷰 보기
function myStoreReviewList(sno){
    console.log(sno);
    let subHtml = ``;
    $.ajax({
        url:'/member/mypage/mystore.review',
        method:'get',
        data:{sno:sno},
        async:false,
        success:(r)=>{
            console.log(r);
            r.forEach((result2)=>{
                subHtml += `
                    <li>
                        <div>
                            <img src="/img/${result2.rvimg}" style="width:100px;"/>
                        </div>
                        <div>${result2.rvcontent}</div>
                        <div>작성자</div>
                        <div>${result2.rvdate}</div>
                    </li>
                `;
            })
        }
    })
    return subHtml;
}


// 8. 내 쿠폰
function myCoupon(){
    $.ajax({
        url:'/member/mypage/mycoupon',
        method:'get',
        data: { 'mno': mno },
        success:(r)=>{
            console.log(r);

            document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(5)').classList.add('active');
            document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(7)').classList.remove('active');

            html = ``;


            // r 은 받아온 쿠폰dto 의 리스트

             r.forEach((result)=>{
                 if(result.categorya==1){result.categorya='안산';}
                 else if(result.categorya==2){result.categorya='시흥';}
                 else if(result.categorya==3){result.categorya='수원';}
                 else if(result.categorya==4){result.categorya='부천';}
                 else if(result.categorya==5){result.categorya='안양';}
                 else if(result.categorya==6){result.categorya='서울';};

                 if(result.categoryb==1){result.categoryb='한식';}
                 else if(result.categoryb==2){result.categoryb='일식';}
                 else if(result.categoryb==3){result.categoryb='중식';}
                 else if(result.categoryb==4){result.categoryb='양식';}
                 else if(result.categoryb==5){result.categoryb='분식';}
                 else if(result.categoryb==6){result.categoryb='패스트푸드';}

                 if(result.ckind==0){result.ckind="1000원 할인 쿠폰";}
                 else if(result.ckind==1){result.ckind="3000원 할인 쿠폰";}
                 else if(result.ckind==2){result.ckind="5000원 할인 쿠폰";}
                 else if(result.ckind==3){result.ckind="10000원 할인 쿠폰";}

                            html += `
                                <div class="cstate${result.cstate}" style="margin: 0 auto; border: 1px solid #0D0D0D; padding: 20px; margin: 20px; width: 400px; font-weight : bold; ">
                                    <div class="ckind" style="font-size: 28px;">
                                        ${result.ckind}
                                    </div>
                                    <div>
                                        <h5><span>${result.categorya}</span>-<span style="margin-right: 20px;">${result.categoryb}</span></h5>
                                        <h3 style="font-size: 25px;">${result.sname}</h3>
                                        <p>가게 주소 : ${result.sadress}</p>
                                        <p>전화번호 : ${result.sphone}</p>
                                        <p>쿠폰 발급 일 : ${result.cdate.split(" ")[0]}</p>
                                    </div>
                                </div>
                            `;
                        })


            myinfoContent.innerHTML = html;
        }
    })
}

// 9. 즐겨찾기
function favorites(){
    $.ajax({
        url:'/member/mypage/myfavorites',
        method:'get',
        data:{mno:mno},
        success:(r)=>{
            console.log(r);

            document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
            document.querySelector('.nav_btn_badge:nth-child(6)').classList.add('active');
            document.querySelector('.nav_btn_badge:nth-child(7)').classList.remove('active');

            html = ``;

            r.forEach((result)=>{
                html += `
                    <div>
                        <div class="starImgBox">
                            <img src="/img/yeslike.png" style="width:50px;">
                        </div>
                        <div>
                            <img src="/img/${result.sfile1}" style="width:100px;">
                        </div>
                        <div>
                            <h5>${result.sname}<span>${result.categorya}</span><span>${result.categoryb}</span></h5>
                            <p>${result.scontent}</p>
                            <p>${result.sadress}</p>
                            <p>${result.sphone}</p>
                        </div>
                    </div>
                `;
            })

            myinfoContent.innerHTML = html;
        }
    })
}

// 10. 회원탈퇴
function memberDelete(){
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(7)').classList.add('active');

    html = ``;

    html += `
        <div class="memberDelete">
            <h3>회원 탈퇴</h3>
            <input type="password" id="deletePw" name="mpw" placeholder="비밀번호 입력"/>
            <button type="button" onclick="onDelete()">확인</button>
        </div>
    `;
    myinfoContent.innerHTML = html;


}

// 10. 회원탈퇴 기능
function onDelete(){
    let mpw = document.querySelector('#deletePw').value;

    $.ajax({
        url:'/member/mypage/memberdelete',
        method:'get',
        data:{mpw:mpw},
        async : false,
        success:(r)=>{
            console.log(r);
            if(r){
                $.ajax({
                        url :'/member/logout.do',
                        method :'get',
                        async : false,
                        success :(r2)=>{
                            if(r2){
                                alert('회원 탈퇴 성공');
                                location.href='/main';
                            }
                        }
                    })
            }else{
                alert('비밀번호가 일치하지 않습니다.');
            }
        }
    })
}


