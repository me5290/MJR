console.log("board.JS실행됨");
// 전체 게시글 출력용 JS

let pageInfo = {
    page:1,              // 현재페이지수
    pageBoardSize:5,     // 페이지에 출력할 게시물수
    categoryA:0,         // 지역 카테고리
    categoryB:0,         // 음식 카테고리
    key:"1",              // 현재검색 key
    keyword:""           // 현재 검색keyword
}



boardListAllView(1) // 처음출력은 1page
// 게시글 전체출력 (카테고리 무시)
function boardListAllView(page){
    // 페이지 정보에 입력받은 페이지 대입
    pageInfo.page = page;

    $.ajax({
        url: "/board/list.do",
        method : "get",
        data: pageInfo,
        success: function (response) {
            console.log(response);
    
            // 출력위치
            let boardTableBody = document.querySelector('#boardTableBody');
            // 출력물 만들기
            let html = ``;
                response.list.forEach(board => {
                    console.log(board);
                    html += `<tr>
                                <td>${board.bdate}</td>
                                <td class="nameHover" style="text-align: left;"><a href="/board/oneview?bno=${board.bno}">${board.bname}</a></td>
                                <td>${board.bcount}</td>
                                <td>
                                    <img src="/img/${board.mimg}" style="width:20px; border-radius:50%;"/>
                                    <span>${board.mid}</span>
                                </td>
                            </tr>`;
                });
            // 3. 출력
            boardTableBody.innerHTML = html;
            // ==페이지구성======================================= //////
            // 출력위치
            let pagination = document.querySelector('.pagination');
            // 내용
            let pagehtml = ``;
                // 이전버튼
                pagehtml += `<li class="page-item"><a class="page-link" onclick="boardListAllView(${page-1<1? 1 :page-1})">이전</a></li>`;

                // 페이지버튼 ( 막약 i가 현재페이지와 같으면 active 클래스 삽입 아니면 생략)
                for(let i = response.startBtn ; i <=response.endBtn; i++){
                    pagehtml +=`<li class="page-item ${page == i?'boardactive':''}"><a class="page-link " onclick="boardListAllView(${i})">${i}</a></li>`;
                }

                // 다음 버튼
                pagehtml +=`<li class="page-item"><a class="page-link" onclick="boardListAllView(${page+1>response.totalPage?response.totalPage:page+1})">다음</a></li>`;
            // 3. 출력
            pagination.innerHTML = pagehtml;
            document.querySelector('.keyword').value = '';// 검색 입력어 지우기
            pageInfo.keyword="";
            myBoardListBtn();// 로그인했는지 확인후 버튼 출력
        }
            
    });

}


// 게시글 카테고리A(지역) 선택함
function onCategoryAChoose(chooseCategoryA){
    // console.log(chooseCategoryA.value); 
    let categoryAChoose = document.querySelector('.categoryAChoose').value
    console.log(categoryAChoose);
    pageInfo.categoryA=chooseCategoryA.value;
    pageInfo.keyword='';

    boardListAllView(1);
}

// 게시글 카테고리B(음식분류) 선택함
function onCategoryBChoose(chooseCategoryB){
    pageInfo.categoryB=chooseCategoryB.value;
    pageInfo.keyword='';

    boardListAllView(1);
}

// 페이지 출력량 선택
function onPageBoardSize(page){
    pageInfo.pageBoardSize = page.value;
    pageInfo.keyword='';

    boardListAllView(1);
}

// 검색기능 실행
function doSearch(){
    console.log("doSearch()실행됨");
    pageInfo.keyword=document.querySelector('.keyword').value;
    pageInfo.key = document.querySelector('#searchQ').value;

    boardListAllView(1);
}
// 엔터치면 검색실행
function enterKey(){
    console.log("enterKey()실행됨");
    if(window.event.keyCode==13){
        console.log("enterKey()실행됨");
        doSearch();
    }
}


// 내글보기 ============================= 
    // 로그인상태인지 파악하는 함수
function myBoardListBtn(){
    console.log("myBoardList()실행됨");
    $.ajax({// 로그인 아이디 가져오기
        url : "/member/login/check.do",
        method : "get",
        success : function (loginId){
            // 출력위치
            let boardListButton = document.querySelector('#boardListButton')
            let html2 = ``;
            if(loginId!=""){// 로그인했을때
                html2 = `<button type="button" onclick="myBoardList(1)">내글보기</button>
                        <a href="/board/write"><button type="button">글쓰기</button></a>`;

                // 출력하기
                boardListButton.innerHTML = html2;
            }else{// 로그인안했으면 버튼 없음
                boardListButton.innerHTML = html2;
            }
        }// functhion end
    });// ajax 1 end
    
}



// 내글보기 (검색기능 활용)
function myBoardList(){
    pageInfo.key = "m.mid";// 키 작성자로 고정
    pageInfo.keyword = document.querySelector('.keyword').value;
    

    // 현재로그인한 ID 자바에 요청하기
    $.ajax({
        url: "/member/mypage/getsessioninfo",
        method : "get",
        async : false, // 동기화(순서대로)
        success: function (response) { // response = memberDto
            pageInfo.keyword = response.mid;
            boardListAllView(1);
        }
    });

}