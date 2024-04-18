console.log("boardOneView JS실행됨");


// URL 에서 bno가져옴
let bno = new URL( location.href ).searchParams.get('bno'); 

view();
// 개별글 출력 함수
function view(){
    console.log("view()실행");
    // 출력위치
    let boardContent = document.querySelector('#boardContent');

    // 만들기
    let html = ``;
    $.ajax({
        url: "/board/oneview.do",
        method: "get",
        data: {'bno':bno},
        success: function (response) {
            console.log(response);
            let category = categoryaText(response);
            // 출력하기
            document.querySelector('#viewbname').innerHTML = response.bname;
            document.querySelector('#boardWriteInfo > img').src ="/img/"+response.mimg;
            document.querySelector('#writerName').innerHTML = response.mid;
            document.querySelector('#registrationDate').innerHTML = response.bdate;
            document.querySelector('#viewpoint').innerHTML = response.bcount;
            // 카테고리
            document.querySelector('#categoryA').innerHTML = category[0];
            document.querySelector('#categoryB').innerHTML = category[1];

            document.querySelector('#contentBox').innerHTML = response.bcontent;
            document.querySelector('#buttonBox').innerHTML =`
                <button class="ButtonOff ${response.ueserinfo?'ButtonOn':''}" type="button" onclick="location.href='/board/update?bno=${bno}'">수정</button>
                <button class="ButtonOff ${response.ueserinfo?'ButtonOn':''}" type="button" onclick="onBoardDelete()">삭제</button>
                <a class="ButtonOff ButtonOn" href="/board/list"><button type="button">목록으로</button></a>
                `;console.log(response.ueserinfo);

            replyView();// JS실행되면 게시글 출력하고 댓글 출력
        }
    });
    
}
// 카테고리 한글화 함수
function categoryaText(response){
    let category = [];
    if(response.categorya==0){category[0]='자유';}
    else if(response.categorya==1){category[0]='안산';}
    else if(response.categorya==2){category[0]='시흥';}
    else if(response.categorya==3){category[0]='수원';}
    else if(response.categorya==4){category[0]='부천';}
    else if(response.categorya==5){category[0]='안양';}
    else if(response.categorya==6){category[0]='서울';}
    
    
    if(response.categoryb==0){category[1]='';}
    else if(response.categoryb==1){category[1]='한식';}
    else if(response.categoryb==2){category[1]='일식';}
    else if(response.categoryb==3){category[1]='중식';}
    else if(response.categoryb==4){category[1]='양식';}
    else if(response.categoryb==5){category[1]='분식';}
    else if(response.categoryb==6){category[1]='패스트푸드';}

    return category;
}



// 댓글라인 ====================================

// 댓글 출력

function replyView(){

    // 출력위치
    let replyprint = document.querySelector('#replyprint');

    // 
    let html = ``;
    $.ajax({
        url: "/board/replyView.do",
        method: "get",
        data: {'bno':bno},
        success: function (response2) {
            console.log(response2);
            for(let i =0 ; i<response2.length; i++){
                html +=`
                    <div class="replyView">
                        <div class="rcContentBox">
                            <div class="rcContent">${response2[i].rpcontent}</div>
                            <div class="rcNameDate">
                                <div class="rcWriterName">${response2[i].mid}</div>
                                <div class="rcDate">${response2[i].rpdate}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            replyprint.innerHTML = html;
        }
    });// ajax종료
    
}




// 댓글작성 기능~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let replyWriteCheck = [false];
// 댓글입력 유효성검사 (50글자까지만 가능)
function replyContentMsg(){

    let replyContent = document.querySelector('#replyContent').value;
console.log(replyContent);
console.log(replyContent.length);

    // 안내글 출력위치 
    let replyContentMsg = document.querySelector('#replyContentMsg');
    
    // 만약 
    if(replyContent.length>20){
        replyContentMsg.innerHTML = "20글자 내로 댓글을 작성해주세요.";
        replyWriteCheck[0] = false;
    }else if(replyContent.length>0 && replyContent.length<=20){
        replyContentMsg.innerHTML = "";
        replyWriteCheck[0] = true;
    }
    
}
//댓글작성요청
function replyWrite(){
    
    for(let i = 0 ; i <replyWriteCheck.length; i++){
        // 유효성검사 실패시 함수 종료
        if(!replyWriteCheck[i]){alert("입력조건을 확인해주세요."); return;}
    }
    
    let replyContent = document.querySelector('#replyContent').value;
    
    // 가져온 값 엔터입력 <br/> 로 변환
    let reply= replyContent.replaceAll('\n', '<br/>');
    
    $.ajax({
        url: "/board/replyWrite",
        method: "post",
        data: {'bno':bno ,'rpcontent':reply },
        success: function (response) {
            console.log(response);
            // 0이상 = 성공  -1 = 로그인정보가 없음 -2 = sql등록 오류
            if(response > 0){alert("댓글등록 성공");}
            else if(response == -1){alert("로그인후 이용해주세요!");}
            else if(response == -2){alert("등록오류 ] code:-2 관리자에게 문의해주세요.");}
            
            // 작업후 기존페이지 새로고침
            location.href='/board/oneview?bno='+bno; // 개별글보기 페이지로
        }
    });
    
}

// 글 삭제하기
function onBoardDelete(){
    $.ajax({
        url : "/board/delete.do",
        method : "delete",
        data : {'bno':bno},
        success : function(response){
            if(response){
                alert("안내] 삭제처리 되었습니다.");
                location.href='/board/list';}
            else{alert("안내] 삭제실패.");}
        }
    });
}