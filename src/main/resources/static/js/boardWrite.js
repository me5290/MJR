console.log("보드Write실행됨")
// 썸머노트 실행 -====================================
$(document).ready(function() {

    // 썸머노트 옵션객체
    let option = {
        lang : 'ko-KR', // 한글패치
        height : 500    // 에디터 세로 크기
    }

    $('#summernote').summernote( option );
});
// ==========================================

// 글등록용 유효성확인용 변수
// 제목 내용
let wirteCheck = [false ,false];
// 입력글 등록하기
function doWrite(){

    // 데이터 위치
    let boardWriteForm = document.querySelector('.boardWriteForm');
    
    // 폼 객체화
    let boardForm = new FormData( boardWriteForm );

    // 유효성검사
        // 내용에 입력한값이 있을경우 채크 true로 변경
    let summernote = document.querySelector('#summernote').value;
    if(summernote.length>0){wirteCheck[1]=true;}

        // 1개라도 false면 실행중지
    for(let i = 0; i<wirteCheck.length; i++){
        if(wirteCheck[i]!=true){alert("입력을 확인해주세요."); return;}
    }
    
    

    $.ajax({
        url: "/board/create",
        method :"post",
        data: boardForm,
        contentType: false,
        processData : false,
        success: function (response) {

            if(response>=0){
                console.log("글쓰기 성공");
                alert("글 등록에 성공했습니다.")
                location.href='/board/oneview?bno='+response; // 개별글보기 페이지로
            }else if(response==0){
                console.log("글쓰기 실패");
                alert("글 등록에 실패했습니다.")
                location.href='/board/list';// 글 목록페이지로
            }else if(response==-1){
                alert("로그인 후 이용해주세요")
                location.href='/board/list'; // 글 목록페이지로
            }else if(response==-2){
                alert("등록오류]관리자에게 문의해주세요.!");
                location.href='/board/list'; // 글 목록페이지로
            }
            // response 0 : 실패
            // response -1 : 로그인정보가 없음
            // response -2 : SQL 오류
            // 1 이상 성공

        }
    });
   
}
// 제목 입력 유효성검사 (20글자까지만 가능)
function nameCondition(){

    let bname = document.querySelector('.bname').value;
// console.log(bname);
// console.log(bname.length);

    // 안내글 출력위치 
    let nameCondition = document.querySelector('#nameCondition');
    
    // 만약 
    if(bname.length>20){
        nameCondition.innerHTML = "20글자 내로 제목을 작성해주세요.";
        wirteCheck[0] = false;
    }else if(bname.length>0 && bname.length<=20){
        nameCondition.innerHTML = "";
        wirteCheck[0] = true;
    }
    
}