// ========== 페이지 관련 객체 만들기(여러개의 변수를 묶겠다.) =========== //
let pageObject = {
    detail : '',        // 검색할 DB테이블
    page : 1,           // 현재 페이지
    tablerows : 30,  // 현재 페이지당 표시할 게시물 수
    state : [0,1,2,3],            // 현재 카테고리
    key : '',   // 현재 검색 키
    keyword : ''        // 현재 검색
}

let func = {
    funct : adminDeMview(1)
}

console.log('adminDetail js 실행')
getsessioninfo();
// 세션 정보 가져오기
function getsessioninfo(){
    $.ajax({
        url:'/member/mypage/getsessioninfo',
        method:'get',
        async:false,
        success:(r)=>{
            if(r.mstate!=3){
            alert('잘못된 접근입니다.');
            location.href = "/main";
            }
        }
    })
}

window.onload = function() {
    let params = new URLSearchParams(window.location.search);
    let detail = params.get('detail');
    let sstate = params.get('sstate');
    console.log(sstate);
    if (detail === 'member') {
        pageObject.detail = "member"
        adminDeMview(1); // 첫 페이지 실행

    } else if (detail === 'board') {
        pageObject.detail = "board";
        adminDeBview(1); // 첫 페이지 실행

    }else if (detail === 'review') {
             pageObject.detail = "review";
             adminDeRVview(1); // 첫 페이지 실행

    }else if (detail === 'reply') {
        pageObject.detail = "reply";
        adminDeRPview(1); // 첫 페이지 실행

    } else if (detail === 'store') {
        pageObject.detail = "store";
        pageObject.state = sstate.split('').map(Number);
        adminDeSview(1,pageObject.state);

    }
}




function adminDeMview(page){
    pageObject.detail = 'member'
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');

//   pageObject.detail = "member"
   pageObject.page = page; // 매개변수로 들어온 페이지를 현재페이지로 설정해주고,
   pageObject.state = [0,1,2,3];

   document.querySelector('#searchQ').innerHTML = `<option value="mid">아이디</option>
                                                   <option value="mname">이름</option>`;

   document.querySelector('#SearchKindBox').innerHTML = `<input class="keyword" onkeyup="enterKey1()" type="text" placeholder="Search" style="width:50%">
                                                                                 <button class="btn btn-outline-success" type="button" onclick="doSearch1()" style="width: 30%;">검색하기</button>`;


   $.ajax({
        url : "/admin/mview/detail",
        method : "get",
        data : pageObject,
        success : (r)=>{
            console.log(r);
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>
                    <th>회원 번호</th>
                  <th style="width: 25%">아이디</th>
                  <th style="width: 15%">이름</th>
                  <th style="width: 20%">가입 날짜</th>
                  <th>전화 번호</th>
                  <th style="width: 8%">비고</th>
                </tr>
            </thead>
            <tbody>
                `
            for(let i =0 ; i < r.list.length ; i++){
            if(r.list.length == i){break;}
            let daytime = r.list[i].mdate.split(" ");
                            if(r.list[i].mstate == 0){r.list[i].mstate = "일반"}
                            else if(r.list[i].mstate == 1){r.list[i].mstate = "정지"}
                            else if(r.list[i].mstate == 2){r.list[i].mstate = "탈퇴"}
                            else if(r.list[i].mstate == 3){r.list[i].mstate = "관리자"}
                            html += `
                                    <tr>
                                       <th><a href="/member/mypage?mno=${r.list[i].mno}">${r.list[i].mno}</a></th>
                                       <th><a href="/member/mypage?mno=${r.list[i].mno}">${r.list[i].mid}</a></th>
                                       <th>${r.list[i].mname}</th>
                                       <th>${daytime[0]}</th>
                                       <th>${r.list[i].mphone}</th>
                                        <th id="mselect${i}">
                                               <select id="select${i}"  onchange="onMUpdate(this.value, ${r.list[i].mno})">

                                       `;
                                       if(r.list[i].mstate=="일반"){
                                      html +=                           `
                                                                          <option value="0">${r.list[i].mstate}</option>
                                                                          <option value="1">정지</option>
                                                                          <option value="2">탈퇴</option>
                                                                          <option value="3">관리자</option>
                                                                          </select>`
                                      }else if(r.list[i].mstate=="정지"){
                                      html +=                           `
                                                                         <option value="1">${r.list[i].mstate}</option>
                                                                         <option value="0">일반</option>
                                                                         <option value="2>탈퇴</option>
                                                                         <option value="3">관리자</option>
                                                                         </select>`
                                      }else if(r.list[i].mstate=="탈퇴"){
                                      html +=                           `
                                                                         <option value="2">${r.list[i].mstate}</option>
                                                                         <option value="0">일반</option>
                                                                         <option value="1">정지</option>
                                                                         <option value="3">관리자</option>
                                                                         </select>`
                                      }else if(r.list[i].mstate=="관리자"){
                                      html +=                           `
                                                                         <option value="3">${r.list[i].mstate}</option>
                                                                         <option value="0">일반</option>
                                                                         <option value="1">정지</option>
                                                                         <option value="2">탈퇴</option>
                                                                         </select>`
                                      }
                                      html += `</th>
                                          </tr>`

                                    }
            html += "</tbody>";
            adminDeMtable.innerHTML = html;


            // 페이지네이션
            let pagination = document.querySelector('.pagination');
                        // 내용
                        let pagehtml = ``;
                            // 이전버튼
                            pagehtml += `<li class="page-item"><a class="page-link" onclick="adminDeMview(${page-1<1? 1 :page-1})">이전</a></li>`;

                            // 페이지버튼 ( 막약 i가 현재페이지와 같으면 active 클래스 삽입 아니면 생략)
                            for(let i = r.startBtn ; i <=r.endBtn; i++){
                                pagehtml +=`<li class="page-item"><a class="page-link ${page == i?'boardactive':''}" onclick="adminDeMview(${i})">${i}</a></li>`;
                            }

                            // 다음 버튼
                            pagehtml +=`<li class="page-item"><a class="page-link" onclick="adminDeMview(${page+1>r.totalPage?r.totalPage:page+1})">다음</a></li>`;
                        // 3. 출력
                        pagination.innerHTML = pagehtml;
                        document.querySelector('.keyword').value = '';// 검색 입력어 지우기
                        pageObject.keyword="";
        }
    })
}

function adminDeBview(page){
    pageObject.detail = 'board'
    console.log(page)
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');

//   pageObject.detail = "member"
   pageObject.page = page; // 매개변수로 들어온 페이지를 현재페이지로 설정해주고,

      document.querySelector('#searchQ').innerHTML = `<option value="b.bname">제목</option>
                                                      <option value="m.mid">아이디</option>
                                                      `;

      document.querySelector('#SearchKindBox').innerHTML = `<input class="keyword" onkeyup="enterKey2()" type="text" placeholder="Search" style="width:50%">
                                                                                       <button class="btn btn-outline-success" type="button" onclick="doSearch2()" style="width: 30%;">검색하기</button>`;



   $.ajax({
        url : "/admin/mview/detail",
        method : "get",
        data : pageObject,
        success : (r)=>{
        console.log(r);
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>
                    <th style="width: 10%">글 번호</th>
                    <th style="width: 32%">제목</th>
                    <th style="width: 20%">작성자</th>
                    <th style="width: 20%">작성일</th>
                    <th style="width: 10%">조회수</th>
                    <th style="width: 8%">비고</th>
                </tr>
            </thead>
            <tbody>
                `
            for(let i =0 ; i < r.list.length ; i++){
            if(r.list.length == i){break;}
            let daytime = r.list[i].bdate.split(" ");
                            html += `
                                    <tr>
                                       <th><a href="/board/oneview?bno=${r.list[i].bno}">${r.list[i].bno}</a></th>
                                       <th><a href="/board/oneview?bno=${r.list[i].bno}">${r.list[i].bname}</a></th>
                                       <th>${r.list[i].mid}</th>
                                       <th>${daytime[0]}</th>
                                       <th>${r.list[i].bcount}</th>
                                       <th><button type="button" onclick="onBoardDelete(${r.list[i].bno})"  style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                                   </tr>
                                    `}
            html += "</tbody>";
            adminDeMtable.innerHTML = html;

             // 페이지네이션
                        let pagination = document.querySelector('.pagination');
                                    // 내용
                                    let pagehtml = ``;
                                        // 이전버튼
                                        pagehtml += `<li class="page-item"><a class="page-link" onclick="adminDeBview(${page-1<1? 1 :page-1})">이전</a></li>`;

                                        // 페이지버튼 ( 막약 i가 현재페이지와 같으면 active 클래스 삽입 아니면 생략)
                                        for(let i = r.startBtn ; i <=r.endBtn; i++){
                                            pagehtml +=`<li class="page-item"><a class="page-link ${page == i?'boardactive':''}" onclick="adminDeBview(${i})">${i}</a></li>`;
                                        }

                                        // 다음 버튼
                                        pagehtml +=`<li class="page-item"><a class="page-link" onclick="adminDeBview(${page+1>r.totalPage?r.totalPage:page+1})">다음</a></li>`;
                                    // 3. 출력
                                    pagination.innerHTML = pagehtml;
                                    document.querySelector('.keyword').value = '';// 검색 입력어 지우기
                                    pageObject.keyword="";

        }
    })
}

function adminDeRPview(page){
    pageObject.detail = 'reply'
    console.log(page)
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');

//   pageObject.detail = "member"
   pageObject.page = page; // 매개변수로 들어온 페이지를 현재페이지로 설정해주고,

   document.querySelector('#searchQ').innerHTML = `<option value="rp.rpcontent">내용</option>
                                                   <option value="m.mid">아이디</option>
                                                   `;

   document.querySelector('#SearchKindBox').innerHTML = `<input class="keyword" onkeyup="enterKey3()" type="text" placeholder="Search" style="width:50%">
                                                                                    <button class="btn btn-outline-success" type="button" onclick="doSearch3()" style="width: 30%;">검색하기</button>`;


   $.ajax({
        url : "/admin/mview/detail",
        method : "get",
        data : pageObject,
        success : (r)=>{
        console.log(r);
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>
                    <th>댓글 내용</th>
                    <th style="width: 20%">작성일</th>
                    <th style="width: 20%">작성자</th>
                    <th style="width: 8%">비고</th>
                </tr>
            </thead>
            <tbody>
                `
            for(let i =0 ; i < r.list.length ; i++){
            if(r.list.length == i){break;}
            let daytime = r.list[i].rpdate.split(" ");
                            html += `
                                    <tr>
                                       <th><a href="/board/oneview?bno=${r.list[i].bno}">${r.list[i].rpcontent}</a></th>
                                       <th>${daytime[0]}</th>
                                       <th>${r.list[i].mid}</th>
                                       <th><button type="button" onclick="onReplyDelete(${r.list[i].rpno})" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                                   </tr>
                                    `}
            html += "</tbody>";
            adminDeMtable.innerHTML = html;


             // 페이지네이션
                        let pagination = document.querySelector('.pagination');
                                    // 내용
                                    let pagehtml = ``;
                                        // 이전버튼
                                        pagehtml += `<li class="page-item"><a class="page-link" onclick="adminDeRPview(${page-1<1? 1 :page-1})">이전</a></li>`;

                                        // 페이지버튼 ( 막약 i가 현재페이지와 같으면 active 클래스 삽입 아니면 생략)
                                        for(let i = r.startBtn ; i <=r.endBtn; i++){
                                            pagehtml +=`<li class="page-item"><a class="page-link ${page == i?'boardactive':''}" onclick="adminDeRPview(${i})">${i}</a></li>`;
                                        }

                                        // 다음 버튼
                                        pagehtml +=`<li class="page-item"><a class="page-link" onclick="adminDeRPview(${page+1>r.totalPage?r.totalPage:page+1})">다음</a></li>`;
                                    // 3. 출력
                                    pagination.innerHTML = pagehtml;
                                    document.querySelector('.keyword').value = '';// 검색 입력어 지우기
                                    pageObject.keyword="";


        }
    })
}

function adminDeRVview(page){
    pageObject.detail = 'review'
    console.log(page)
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');

//   pageObject.detail = "member"
   pageObject.page = page; // 매개변수로 들어온 페이지를 현재페이지로 설정해주고,

  document.querySelector('#searchQ').innerHTML = `<option value="rv.rvcontent">내용</option>
                                                  <option value="m.mid">아이디</option>
                                                  `;
  document.querySelector('#SearchKindBox').innerHTML = `<input class="keyword" onkeyup="enterKey4()" type="text" placeholder="Search" style="width:50%">
                                                                                   <button class="btn btn-outline-success" type="button" onclick="doSearch4()" style="width: 30%;">검색하기</button>`;


   $.ajax({
        url : "/admin/mview/detail",
        method : "get",
        data : pageObject,
        success : (r)=>{
        console.log(r);
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>

                   <th style="width: 40%">리뷰 내용</th>
                   <th>등록 사진</th>
                   <th style="width: 20%">작성일</th>
                   <th style="width: 20%">작성자</th>
                   <th style="width: 8%">비고</th>
                </tr>
            </thead>
            <tbody>
                `
            for(let i =0 ; i < r.list.length ; i++){
            if(r.list.length == i){break;}
            let daytime = r.list[i].rvdate.split(" ");
                            if(r.list[i].rvimg== null){
                                            html += `
                                                      <tr>
                                                          <th><a href="/store/info?sno=${r.list[i].sno}">${r.list[i].rvcontent}</a></th>
                                                          <th></th>
                                                          <th>${daytime[0]}</th>
                                                          <th>${r.list[i].mid}</th>
                                                          <th><button type="button" onclick="onRVDelete(${r.list[i].rvno})" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                                                      </tr>
                                            `
                                            }
                                            else{
                                            html += `
                                                      <tr>
                                                          <th><a href="/store/info?sno=${r.list[i].sno}">${r.list[i].rvcontent}</a></th>
                                                          <th><a href="/store/info?sno=${r.list[i].sno}"><img class="image-display" src="/img/${r.list[i].rvimg}" alt="No Image" style="width:45px; height:45px;"/></a></th>
                                                          <th>${daytime[0]}</th>
                                                          <th>${r.list[i].mid}</th>
                                                          <th><button type="button" onclick="onRVDelete(${r.list[i].rvno})" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                                                      </tr>
                                            `}



        }

        html += "</tbody> <style>tbody>tr{height: 45px;}; tbody>tr img{width: 45px;}</style>";
        adminDeMtable.innerHTML = html;


             // 페이지네이션
                        let pagination = document.querySelector('.pagination');
                                    // 내용
                                    let pagehtml = ``;
                                        // 이전버튼
                                        pagehtml += `<li class="page-item"><a class="page-link" onclick="adminDeRVview(${page-1<1? 1 :page-1})">이전</a></li>`;

                                        // 페이지버튼 ( 막약 i가 현재페이지와 같으면 active 클래스 삽입 아니면 생략)
                                        for(let i = r.startBtn ; i <=r.endBtn; i++){
                                            pagehtml +=`<li class="page-item"><a class="page-link ${page == i?'boardactive':''}" onclick="adminDeRVview(${i})">${i}</a></li>`;
                                        }

                                        // 다음 버튼
                                        pagehtml +=`<li class="page-item"><a class="page-link" onclick="adminDeRVview(${page+1>r.totalPage?r.totalPage:page+1})">다음</a></li>`;
                                    // 3. 출력
                                    pagination.innerHTML = pagehtml;
                                    document.querySelector('.keyword').value = '';// 검색 입력어 지우기
                                    pageObject.keyword="";
        }
    })
}

function adminDeSview(page , sstate){

    pageObject.detail = 'store';
     if (Array.isArray(sstate)) {
           pageObject.state = sstate;
        } else if (typeof sstate === "string") {
            pageObject.state = sstate.split('').map(Number);
        }

    console.log(pageObject.state);
    console.log(page)
    document.querySelector('.nav_btn_badge:nth-child(1)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(2)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(3)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(4)').classList.remove('active');
    if(pageObject.state.includes(0) || pageObject.state.includes(3)){
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.add('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.remove('active');
    }
    else if(pageObject.state.includes(1) || pageObject.state.includes(2)){
    document.querySelector('.nav_btn_badge:nth-child(5)').classList.remove('active');
    document.querySelector('.nav_btn_badge:nth-child(6)').classList.add('active');
    }

//   pageObject.detail = "member"
   pageObject.page = page; // 매개변수로 들어온 페이지를 현재페이지로 설정해주고,

      document.querySelector('#searchQ').innerHTML = `<option value="s.sname">가게명</option>
                                                      <option value="s.scontent">내용</option>
                                                      <option value="m.mid">아이디</option>
                                                      `;

      document.querySelector('#SearchKindBox').innerHTML = `<input class="keyword" onkeyup="enterKey5()" type="text" placeholder="Search" style="width:50%">
                                                                                       <button class="btn btn-outline-success" type="button" onclick="doSearch5()" style="width: 30%;">검색하기</button>`;

   $.ajax({
        url : "/admin/mview/detail",
        method : "get",
        data : pageObject,
        success : (r)=>{
        console.log(r);
            // 어디에
            let adminDeMtable = document.querySelector("#detailTable");
            // 무엇을
            let html = "";
            html += `
            <thead>
                <tr>
                    <th style="width: 20%">식당 이름</th>
                    <th style="width: 10%">대표 사진</th>
                    <th style="width: 32%">식당 설명</th>
                    <th style="width: 20%">작성자</th>
                    <th style="width: 10%">상태</th>
                    <th style="width: 8%">비고</th>
                </tr>
            </thead>
            <tbody>
                `
            for(let i =0 ; i < r.list.length ; i++){
            if(r.list.length == i){break;}
             if(r.list[i].sstate == 0){r.list[i].sstate = "승인 대기"}
                                        else if(r.list[i].sstate == 1){r.list[i].sstate = "승인"}
                                        else if(r.list[i].sstate == 2){r.list[i].sstate = "맛집 선정"}
                                        else if(r.list[i].sstate == 3){r.list[i].sstate = "반려"}
                                            html += `
                                                      <tr>
                                                          <th><a href="/store/info?sno=${r.list[i].sno}">${r.list[i].sname}</a></th>
                                                          <th><a href="/store/info?sno=${r.list[i].sno}"><img class="image-display" src="/img/${r.list[i].sfile1}" alt="No Image" style="width:45px; height:45px;"/></a></th>
                                                          <th>${r.list[i].scontent}</th>
                                                          <th>${r.list[i].mid}</th>

                                                           <th id="rselect1${i}">
                                                                                      <select id="rselect2${i}" onchange="onSUpdate(this.value, ${r.list[i].sno})">
                                                                  `
                                                                     if(r.list[i].sstate=="승인 대기"){
                                                                     html +=
                                                                                                         `
                                                                                                         <option value="0">${r.list[i].sstate}</option>
                                                                                                         <option value="1">승인</option>
                                                                                                         <option value="3">반려</option>
                                                                                                         </select>`
                                                                     }else if(r.list[i].sstate=="승인"){
                                                                     html +=
                                                                                                        `
                                                                                                        <option value="1">${r.list[i].sstate}</option>
                                                                                                        <option value="0">승인 대기</option>
                                                                                                        <option value="3">반려</option>
                                                                                                        </select>`
                                                                     }else if(r.list[i].sstate=="맛집 선정"){
                                                                                         html +=
                                                                                                                            `
                                                                                                                            <option value="2">${r.list[i].sstate}</option>
                                                                                                                            <option value="0">승인 대기</option>
                                                                                                                            <option value="1">승인</option>
                                                                                                                            <option value="3">반려</option>
                                                                                                                            </select>`

                                                                     }else if(r.list[i].sstate=="반려"){
                                                                     html +=
                                                                                                        `
                                                                                                        <option value="3">${r.list[i].sstate}</option>
                                                                                                        <option value="0">승인 대기</option>
                                                                                                        <option value="1">승인</option>
                                                                                                        </select>`

                                                                     }
                                                                     html += `</th>
                                                                     <th><button type="button" onclick="onSDelete(${r.list[i].sno},${pageObject.state})" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                                                                      </tr>`
        }

        html += "</tbody> <style>tbody>tr{height: 45px;}; tbody>tr img{width: 45px;}</style>";
        adminDeMtable.innerHTML = html;


             // 페이지네이션
                        let pagination = document.querySelector('.pagination');
                                    // 내용
                                    let pagehtml = ``;
                                        // 이전버튼
                                        pagehtml += `<li class="page-item"><a class="page-link" onclick="adminDeSview(${page-1<1? 1 :page-1},[${pageObject.state}])">이전</a></li>`;

                                        // 페이지버튼 ( 막약 i가 현재페이지와 같으면 active 클래스 삽입 아니면 생략)
                                        for(let i = r.startBtn ; i <=r.endBtn; i++){
                                            pagehtml +=`<li class="page-item"><a class="page-link ${page == i?'boardactive':''}" onclick="adminDeSview(${i},[${pageObject.state}])">${i}</a></li>`;
                                        }

                                        // 다음 버튼
                                        pagehtml +=`<li class="page-item"><a class="page-link" onclick="adminDeSview(${page+1>r.totalPage?r.totalPage:page+1},[${pageObject.state}])">다음</a></li>`;
                                    // 3. 출력
                                    pagination.innerHTML = pagehtml;
                                    document.querySelector('.keyword').value = '';// 검색 입력어 지우기
                                    pageObject.keyword="";
        }
    })
}

function toAdpage(){
    location.href="/admin"
}

function onBoardDelete(bno){ // 글 삭제 from boardOneView
    $.ajax({
        url : "/board/delete.do",
        method : "delete",
        data : {'bno' : bno},
        success : function(response){
            if(response){
                alert("안내] 삭제 처리 되었습니다.");
                adminDeBview(pageObject.page);;}
            else{alert("안내] 삭제 실패.");}
        }
    });
}

function onReplyDelete(rpno){
        $.ajax({
            url : "/board/replydelete",
            method : "delete",
            data : {'rpno' : rpno},
            success : function(response){
                if(response){
                    alert("안내] 삭제 처리 되었습니다.");
                    adminDeRPview(pageObject.page);;}
                else{alert("안내] 삭제 실패.");}
            }
        });
}

function onRVDelete(rvno){
        $.ajax({
            url : "/rvdelete.do",
            method : "delete",
            data : {'rvno' : rvno},
            success : function(response){
                if(response){
                    alert("안내] 삭제 처리 되었습니다.");
                    adminDeRVview(pageObject.page);}
                else{alert("안내] 삭제 실패.");}
            }
        });
}


function onSDelete(sno,sstate){
let params = new URLSearchParams(window.location.search);
    let sstate2 = params.get('sstate');
        $.ajax({
            url : "/store/delete.do",
            method : "delete",
            data : {'sno' : sno},
            success : function(response){
                if(response){
                    alert("안내] 삭제 처리 되었습니다.");

                    adminDeSview(pageObject.page , pageObject.state);}
                else{alert("안내] 삭제 실패.");}
            }
        });
}

function onSUpdate(sstate, sno){
let params = new URLSearchParams(window.location.search);
    let sstate2 = params.get('sstate');
        $.ajax({
            url : "/store/updatedo",
            method : "put",
            contentType: "application/json",
            data : JSON.stringify({'sno' : sno,
            'sstate' : sstate }),
            success : function(response){
                if(response){
                    alert("안내] 업데이트 완료.");

                    adminDeSview(pageObject.page , pageObject.state);
                    }
                else{alert("안내] 업데이트 실패.");}
            }
        });
}

function onMUpdate(mstate, mno){
    console.log(mstate);
        $.ajax({
            url : "/member/updatedo",
            method : "put",
            contentType: "application/json",
            data : JSON.stringify({'mno' : mno,
            'mstate' : mstate }),
            success : function(response){
                if(response){
                    alert("안내] 업데이트 완료.");
                    }
                else{alert("안내] 업데이트 실패.");}
            }
        });
}
/////////////////// 멤버 ///////////////////
// 엔터치면 검색실행
function enterKey1(){
    console.log("enterKey()실행됨");
    if(window.event.keyCode==13){
        console.log("enterKey()실행됨");
        doSearch1();
    }
}
// 검색기능 실행
function doSearch1(){
    console.log("doSearch()실행됨");
    pageObject.keyword=document.querySelector('.keyword').value;
    pageObject.key = document.querySelector('#searchQ').value;

    console.log(pageObject.key);
    console.log(pageObject.keyword);
    adminDeMview(1); // 첫 페이지 실행
}
/////////////////// 끝 ///////////////////

/////////////////// 게시글 ///////////////////
// 엔터치면 검색실행
function enterKey2(){
    console.log("enterKey()실행됨");
    if(window.event.keyCode==13){
        console.log("enterKey()실행됨");
        doSearch2();
    }
}
// 검색기능 실행
function doSearch2(){
    console.log("doSearch()실행됨");
    pageObject.keyword=document.querySelector('.keyword').value;
    pageObject.key = document.querySelector('#searchQ').value;

    console.log(pageObject.key);
    console.log(pageObject.keyword);
    adminDeBview(1); // 첫 페이지 실행
}
/////////////////// 끝 ///////////////////


/////////////////// 댓글 ///////////////////
// 엔터치면 검색실행
function enterKey3(){
    console.log("enterKey()실행됨");
    if(window.event.keyCode==13){
        console.log("enterKey()실행됨");
        doSearch3();
    }
}
// 검색기능 실행
function doSearch3(){
    console.log("doSearch()실행됨");
    pageObject.keyword=document.querySelector('.keyword').value;
    pageObject.key = document.querySelector('#searchQ').value;

    console.log(pageObject.key);
    console.log(pageObject.keyword);
    adminDeRPview(1); // 첫 페이지 실행
}
/////////////////// 끝 ///////////////////

/////////////////// 리뷰 ///////////////////
// 엔터치면 검색실행
function enterKey4(){
    console.log("enterKey()실행됨");
    if(window.event.keyCode==13){
        console.log("enterKey()실행됨");
        doSearch4();
    }
}
// 검색기능 실행
function doSearch4(){
    console.log("doSearch()실행됨");
    pageObject.keyword=document.querySelector('.keyword').value;
    pageObject.key = document.querySelector('#searchQ').value;

    console.log(pageObject.key);
    console.log(pageObject.keyword);
    adminDeRVview(1); // 첫 페이지 실행
}
/////////////////// 끝 ///////////////////

/////////////////// 가게 ///////////////////
// 엔터치면 검색실행
function enterKey5(){
    console.log("enterKey()실행됨");
    if(window.event.keyCode==13){
        console.log("enterKey()실행됨");
        doSearch5();
    }
}
// 검색기능 실행
function doSearch5(){
    console.log("doSearch()실행됨");
    pageObject.keyword=document.querySelector('.keyword').value;
    pageObject.key = document.querySelector('#searchQ').value;

    console.log(pageObject.key);
    console.log(pageObject.keyword);
    adminDeSview(1,pageObject.state); // 첫 페이지 실행
}
/////////////////// 끝 ///////////////////