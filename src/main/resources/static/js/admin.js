// 관리자 페이지로 들어가면 나올 js
// 관리자 자기 데이터 및 세션에 관리자 저장.
let tablerows = 7; // 기본 7줄, 사진 있으면 4줄
getsessioninfo();
orderFunctions();
async function orderFunctions() {

    await adminMview(7);
    await adminBview(7);
    await adminRPview(7);
    await adminRVview(4);
    await adminS0view(4);
    await adminS1view(4);
}


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

async function adminMview(tablerows){ // 전체 회원
    console.log('adminMview() 실행, 전체회원불러오기')
    $.ajax({
        url : "/admin/mview",
        method : "get",
        success : (r)=>{
            // 어디에
            let adminMtable = document.querySelector("#adminMtable>tbody");
            // 무엇을
            let html = "";
            for(let i =0 ; i<tablerows ; i++){
            if(tablerows == i){break;}
            let daytime = r[i].mdate.split(" ");
                            if(r[i].mstate == 0){r[i].mstate = "일반"}
                            else if(r[i].mstate == 1){r[i].mstate = "정지"}
                            else if(r[i].mstate == 2){r[i].mstate = "탈퇴"}
                            else if(r[i].mstate == 3){r[i].mstate = "관리자"}
                            html += `
                                    <tr>
                                       <th><a href="/member/mypage?mno=${r[i].mno}">${r[i].mno}</a></th>
                                       <th><a href="/member/mypage?mno=${r[i].mno}">${r[i].mid}</a></th>
                                       <th>${r[i].mname}</th>
                                       <th>${daytime[0]}</th>
                                       <th>${r[i].mphone}</th>
                                       <th id="mselect${i}">
                                            <select id="select${i}"  onchange="onMUpdate(this.value, ${r[i].mno})">

                                    `;
                                   if(r[i].mstate=="일반"){
                                   html +=
                                                                       `
                                                                       <option value="0">${r[i].mstate}</option>
                                                                       <option value="1">정지</option>
                                                                       <option value="2">탈퇴</option>
                                                                       <option value="3">관리자</option>
                                                                       </select>`
                                   }else if(r[i].mstate=="정지"){
                                   html +=
                                                                      `
                                                                      <option value="1">${r[i].mstate}</option>
                                                                      <option value="0">일반</option>
                                                                      <option value="2">탈퇴</option>
                                                                      <option value="3">관리자</option>
                                                                      </select>`
                                   }else if(r[i].mstate=="탈퇴"){
                                   html +=
                                                                      `
                                                                      <option value="2">${r[i].mstate}</option>
                                                                      <option value="0">일반</option>
                                                                      <option value="1">정지</option>
                                                                      <option value="3">관리자</option>
                                                                      </select>`
                                   }else if(r[i].mstate=="관리자"){
                                   html +=
                                                                      `
                                                                      <option value="3">${r[i].mstate}</option>
                                                                      <option value="0">일반</option>
                                                                      <option value="1">정지</option>
                                                                      <option value="2">탈퇴</option>
                                                                      </select>`
                                   }
                                   html += `</th>
                                       </tr>`

                            }



            adminMtable.innerHTML = html;
        }
    })
    await someAsyncOperation();
}

async function adminBview(tablerows){ // 전체 게시글
    console.log('adminBview() 실행, 전체게시글불러오기')
    $.ajax({
        url : "/admin/bview",
        method : "get",
        success : (r)=>{
            console.log(r);
            // 어디에
            let adminBtable = document.querySelector("#adminBtable>tbody");
            // 무엇을
            let html = "";
            for(let i =0 ; i<tablerows ; i++){
            if(tablerows == i){break;}
            let daytime = r[i].bdate.split(" ");
                            html += `
                                        <tr>

                                           <th><a href="/board/oneview?bno=${r[i].bno}">${r[i].bno}</a></th>
                                           <th><a href="/board/oneview?bno=${r[i].bno}">${r[i].bname}</a></th>
                                           <th>${r[i].mid}</th>
                                           <th>${daytime[0]}</th>
                                           <th>${r[i].bcount}</th>
                                           <th><button type="button" onclick="onBoardDelete(${r[i].bno})" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                                       </tr>

                                    `}

            adminBtable.innerHTML = html;

        }
    })
    await someAsyncOperation();
}

async function adminRPview(tablerows){ // 전체 댓글
    console.log('adminRPview() 실행, 전체댓글 불러오기')
    $.ajax({
        url : "/admin/rpview",
        method : "get",
        success : (r)=>{
            console.log(r);
            // 어디에
            let adminRPtable = document.querySelector("#adminRPtable>tbody");
            // 무엇을
            let html = "";
            for(let i =0 ; i<tablerows ; i++){
            if(tablerows == i){break;}
            let daytime = r[i].rpdate.split(" ");
                            html += `
                                    <tr>

                                       <th><a href="/board/oneview?bno=${r[i].bno}">${r[i].rpcontent}</a></th>
                                       <th>${daytime[0]}</th>
                                       <th>${r[i].mid}</th>
                                       <th><button type="button" onclick="onReplyDelete(${r[i].rpno})" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                                   </tr>
                                    `}

            adminRPtable.innerHTML = html;

        }
    })
    await someAsyncOperation();
}



async function adminRVview(tablerows){ // 전체 리뷰
    console.log('adminRVview() 실행, 전체리뷰 불러오기')
    $.ajax({
        url : "/admin/rvview",
        method : "get",
        success : (r)=>{
            console.log(r);
            // 어디에
            let adminRVtable = document.querySelector("#adminRVtable>tbody");
            // 무엇을
            let html = "";
            for(let i =0 ; i<tablerows ; i++){
            if(tablerows == i){break;}
            let daytime = r[i].rvdate.split(" ");
                if(r[i].rvimg== null){
                html += `
                          <tr>
                              <th><a href="/store/info?sno=${r[i].sno}">${r[i].rvcontent}</a></th>
                              <th></th>
                              <th>${daytime[0]}</th>
                              <th>${r[i].mid}</th>
                              <th><button type="button" onclick="onRVDelete(${r[i].rvno})" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                          </tr>
                `
                }
                else{
                html += `
                          <tr>
                              <th><a href="/store/info?sno=${r[i].sno}">${r[i].rvcontent}</a></th>
                              <th><a href="/store/info?sno=${r[i].sno}"><img class="image-display" src="/img/${r[i].rvimg}" alt="No Image" style="width:45px; height:45px;"/></a></th>
                              <th>${daytime[0]}</th>
                              <th>${r[i].mid}</th>
                              <th><button type="button" onclick="onRVDelete(${r[i].rvno})"  style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                          </tr>
                `}
            }


            adminRVtable.innerHTML = html;

        }
    })
    await someAsyncOperation();
}

async function adminS0view(tablerows){
    let sstates = [0,3];
    let where = 'adminStable';
    adminSview(tablerows, where, sstates);
    await someAsyncOperation();
}

async function adminS1view(tablerows){
    let sstates = [1,2];
    let where = 'adminS2table';
    adminSview(tablerows, where, sstates);
    await someAsyncOperation();
}


async function adminSview(tablerows, where, sstates){ // 전체 식당
    console.log('adminSview() 실행, 음식점 불러오기')

    $.ajax({
        url : "/admin/sview?sstates="+ sstates,
        method : "get",
        success : (r)=>{
            console.log(r);

            // 어디에
            let adminStable = document.querySelector("#"+where+">tbody");

            // 무엇을
            let html = "";
            for(let i =0 ; i<r.length ; i++){
            if(tablerows == i){break;}
            console.log(r[i]);
//            let daytime = r[i].rvdate.split(" "); // 가게글은 등록 날짜 없네.
                            if(r[i].sstate == 0){r[i].sstate = "승인 대기"}
                            else if(r[i].sstate == 1){r[i].sstate = "승인"}
                            else if(r[i].sstate == 2){r[i].sstate = "맛집 선정"}
                            else if(r[i].sstate == 3){r[i].sstate = "반려"}

                html += `
                          <tr>
                              <th><a href="/store/info?sno=${r[i].sno}">${r[i].sname}</a></th>
                              <th><a href="/store/info?sno=${r[i].sno}"><img class="image-display" src="/img/${r[i].sfile1}" alt="No Image" style="width:45px; height:45px;"/></a></th>
                              <th>${r[i].scontent}</th>
                              <th>${r[i].mid}</th>

                              <th id="rselect1${i}">
                                    <select id="rselect2${i}" onchange="onSUpdate(this.value, ${r[i].sno})">
                `
                   if(r[i].sstate=="승인 대기"){
                   html +=
                                                       `
                                                       <option value="0">${r[i].sstate}</option>
                                                       <option value="1">승인</option>
                                                       <option value="3">반려</option>
                                                       </select>`
                   }else if(r[i].sstate=="승인"){
                   html +=
                                                      `
                                                      <option value="1">${r[i].sstate}</option>
                                                      <option value="0">승인 대기</option>
                                                      <option value="3">반려</option>
                                                      </select>`
                   }else if(r[i].sstate=="맛집 선정"){
                                       html +=
                                                      `
                                                      <option value="2">${r[i].sstate}</option>
                                                      <option value="0">승인 대기</option>
                                                      <option value="1">승인</option>
                                                      <option value="3">반려</option>
                                                      </select>`

                   }else if(r[i].sstate=="반려"){
                   html +=
                                                      `
                                                      <option value="3">${r[i].sstate}</option>
                                                      <option value="0">승인 대기</option>
                                                      <option value="1">승인</option>
                                                      </select>`

                   }
                   html += `</th>
                   <th><button type="button" onclick="onSDelete(${r[i].sno})" style="width:100%; font-size:18px; display : inline; height:100%; margin-top:0px; margin-bottom:0px">삭제</button></th>
                    </tr>`
                }
                adminStable.innerHTML = html;
        }

    })
    await someAsyncOperation();
}


async function someAsyncOperation() {
    // 비동기 작업 수행
    return new Promise(resolve => {
        setTimeout(resolve, 60); // 0.06초의 딜레이를 줌
    });



}

function toAdDetail(){
    location.href="/adminDetailPage?detail=member";
}

function onBoardDelete(bno){ // 글 삭제 from boardOneView
    $.ajax({
        url : "/board/delete.do",
        method : "delete",
        data : {'bno' : bno},
        success : function(response){
            if(response){
                alert("안내] 삭제 처리 되었습니다.");
                orderFunctions();}
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
                    orderFunctions();}
                else{alert("안내] 삭제실패.");}
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
                    orderFunctions();}
                else{alert("안내] 삭제 실패.");}
            }
        });
}

function onSDelete(sno){
        $.ajax({
            url : "/store/delete.do",
            method : "delete",
            data : {'sno' : sno},
            success : function(response){
                if(response){
                    alert("안내] 삭제 처리 되었습니다.");
                    orderFunctions();}
                else{alert("안내] 삭제 실패.");}
            }
        });
}

function onSUpdate(sstate, sno){
    console.log(sstate);
        $.ajax({
            url : "/store/updatedo",
            method : "put",
            contentType: "application/json",
            data : JSON.stringify({'sno' : sno,
            'sstate' : sstate }),
            success : function(response){
                if(response){
                    alert("안내] 업데이트 완료.");
                    orderFunctions();
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
                    orderFunctions();
                    }
                else{alert("안내] 업데이트 실패.");}
            }
        });
}