const categoryLista=['0','안산','시흥','수원','부천','안양','서울'];
const categoryListb=['0','한식','일식','중식','양식','분식','패스트푸드'];
// 전승호 ========================================
let mypositionlat = 0; // 나의 위도
let mypositionlng = 0; // 나의 경도
let sno = new URL( location.href ).searchParams.get('sno');


//3. 리뷰 쓰기
function onReviewWrite(){
    console.log("onReviewWrite()")
    //1. 폼 가져오기
    let storeReviewForm= document.querySelector('.storeReviewForm');
    console.log(storeReviewForm);
    //2. 폼 바이트 객체 변환
    let storeReviewFormData= new FormData(storeReviewForm);
    console.log(storeReviewFormData);
    //3. 폼 데이터 추가
    storeReviewFormData.set('sno',sno);

    //4. 폼 전송
     $.ajax({
        url : "/store/review/write.do" ,
        method : "post",
        data: storeReviewFormData,
        contentType: false,
        processData: false,
        async: false,
        success : (r)=>{
            console.log(r);
            if( r ){  alert('리뷰 작성 성공');onReviewList();OnRevisitCount(); // 출력함수 실행위치
            location.href=`/store/info?sno=${sno}`;
            }
            else{ alert( '리뷰 작성 실패');}
        }
        }); // ajax end
}

//4. 리뷰 출력
function onReviewList(){
    $.ajax({
            url : "/store/review/do", method : "get", data : { "sno" : sno },
            async: false,
            success : (r)=>{ console.log( r );
                let reviewListBox = document.querySelector('.reviewListBox');
                let html = ``;
                    r.forEach( (review)=>{
                        html += `<div class= "rvbox">
                                    <div class= "rvTop">
                                        <span class="rvmid">${ review.mid}</span>
                                        <span class="rvdate">${ review.rvdate}</span>
                                    </div>
                                    <div class= "rvBottom">
                                        <img class=rvimg src='/img/${review.rvimg==null? 'default.jpg': review.rvimg}'>
                                        <span class="rvcontent">${ review.rvcontent}</span>
                                    </div>
                                </div>`
                    });
                reviewListBox.innerHTML = html;
            }
        })

}
//5. 총재방문 회수 가져오기
function OnRevisitCount(){
    $.ajax({
        url:"/store/revisit",
        method: "get",
        data: {"sno":sno},
        async: false,
        success:(r)=>{
        console.log(r);
        let storeInfoBox =document.querySelector('#storeInfoBox');
        let html =`<div class="srevisit storeInfo"> 재방문회수: ${r}</div>`
        }
    })
}

//6. 인증코드 검증칸생성
function authScodeCreate(){
    let authBox=document.querySelector('.authBox');
    let html = `<input type="text" name="scode" id="scode" placeholder="가게에서 받은 인증번호를 입력해주세요" >
                <button type="button" onclick="authScode()" >인증</button>
                `
                authBox.innerHTML=html;
}

//7. 인증코드 비교
function authScode(){
    let scode = document.querySelector('#scode').value;
    let onReviewBox= document.querySelector('.onReviewBox');
    console.log(scode);
    $.ajax({
        url:"/store/scode/auth.do",
        method: "post",
        data: {"sno":sno,"scode":scode},
        success:(r)=>{
        console.log(r);
        if( r ){
            alert('인증에 성공하였습니다.');
            let html=`
                <input type="file" name="rvfile" id="rvfile">
                <textarea name="rvcontent" class="rvcontent"></textarea>
                <button type="button" onclick="onReviewWrite()" >리뷰 작성</button>
            `
            onReviewBox.innerHTML=html
          }
        else{ alert( '인증코드가 일치하지 않습니다');}
        }
    })
}


navigator.geolocation.getCurrentPosition(async (myLocation)=>{
    console.log(myLocation);

    mypositionlat = myLocation.coords.latitude;  // 나의 위도
    mypositionlng = myLocation.coords.longitude; // 나의 경도


// 전승호END ========================================

// HTML 주소에서 URL 정보 가져오기 sno(가게식별번호)

viewStore()
//1. 가게 상세페이지
function viewStore(){
    console.log("viewStore()");
    $.ajax({
        url: "/store/info.do",
        method:"get",
        data: {"sno":sno},
        async: false,
        success : (r)=>{

        // 가게 방문했을때 카테고리 전달(알고리즘)
        $.ajax({
            url:'/algorithm/visitstorecategory.do',
            method:'get',
            data:{'categoryb':r.categoryb},
            async:false
        })

        let storeInfoBox =document.querySelector('#storeInfoBox');
        let html =`
                                <div class="likeBtnBox">

                                </div>
                               <h1 class="sname storeInfo "> ${r.sname}</h1>
                               <div class="sphone storeInfo">가게전화번호: ${r.sphone}</div>
                               <div class="sadress storeInfo">가게주소: ${r.sadress}</div>
                               <div class="scontent storeInfo">가게설명: ${r.scontent}</div>
                               <div class="scategorya storeInfo">지역: ${categoryLista[r.categorya]}</div>
                               <div class="scategoryb storeInfo">음식분류: ${categoryListb[r.categoryb]}</div>
                               `
                    $.ajax({
                                       url:"/store/revisit",
                                       method: "get",
                                       data: {"sno":sno},
                                       async: false,
                                       success:(r)=>{
                                       console.log(r);
                                       html +=`<div class="srevisit storeInfo"> 재방문회수: ${r} 회</div>`
                                       }
                            })
                        html +=    `
                                        <div class="outer">
                                                    <div class="inner-list">
                                                        <div class="inner">
                                                           <img id="simg1" class="ssimg" alt="이미지 1" src='/img/${r.sfile1}'>
                                                        </div>
                                                        <div class="inner">
                                                             <img id="simg2" class="ssimg" alt="이미지 2" src='/img/${r.sfile2}'>
                                                        </div>
                                                        <div class="inner">
                                                            <img id="simg3" class="ssimg" alt="이미지 3" src='/img/${r.sfile3}'>
                                                        </div>
                                                        <div class="inner">
                                                            <img id="simg4" class="ssimg" alt="이미지 4" src='/img/${r.sfile4}'>
                                                        </div>
                                                    </div>
                                                           <button class="button-left"><</button>
                                                           <button class="button-right">></button>
                                                </div>



                                        `
                            ;
                            reviewValidation();
            console.log(r);
            // 현재 로그인된 아이디 또는 번호 ( 1.헤더 HTML 가져온다 . 2.서버에게 요청 )
            $.ajax({
                            url : "/store/mnoCheck.do",
                            method : 'get',
                            success : (loginMno)=>{
                            console.log(loginMno);
                            console.log(r.mno);
                                if( loginMno == r.mno ){
                                    let btnHTML = `<button class="boardBtn" type="button" onclick="onDelete( )"> 삭제하기 </button>`
                                       btnHTML += `<button class="boardBtn" type="button" onclick="location.href='/store/update?sno=${ r.sno }'"> 수정하기 </button>`
                                                   document.querySelector('.btnBox').innerHTML += btnHTML
                                }
                            } // success end
                        }) // ajax2 end



            //3. 출력
            storeInfoBox.innerHTML= html;
        }
    })
    console.log('onReviewList');
    onReviewList()
}




slikeState(sno );

// 전승호  ======================================================================


// 리뷰작성 유효성 검사만들기
    // 1. 나의 GPS거리가 식당의 위치랑 300m 이내인 가게인가
    
function reviewValidation(){
    console.log("reviewValidation()");

    // 현재 열람한 가게페이지 정보가져오기
    $.ajax({
        url : "/store/info.do",
        method : "get",
        data: {'sno':sno},
        async: false,
        success : function(response){ // storeDto
            console.log(response);
            console.log("내위치와 가계의 거리차이 = "+loadCalculate(response));
            if(loadCalculate(response)<=0.3){ //  300m
                // 리뷰쓴 가게 카테고리 전달(알고리즘)
                $.ajax({
                    url:'/algorithm/reviewgetcategory.do',
                    method:'get',
                    data:{'categoryb':response.categoryb},
                    async:false
                })
                console.log("300 m 이내임");
                // 만약 300m 이내에 서 페이지를 켯다면 
                    // 버튼 활성화 시켜줌
                document.querySelector(".onReviewWriteBtn").innerHTML = `
                    <button type="button"class=" " onclick="authScodeCreate()">인증하기</button>
                `
            }else{
                console.log("300 m 내 없음");
                document.querySelector(".onReviewWriteBtn").innerHTML = `
                    <button type="button"class=" BtnOff " disabled onclick="authScodeCreate()">인증하기</button>
                `
            }

        }

    });// ajax END

}

    // 매개변수 = 상점정보
function loadCalculate (store){
    // console.log("경도"+mypositionlat);
    // console.log(store);
    let 위도 = mypositionlat - store.slat; // 나의 위도
    console.log("나의 lat = "+mypositionlat);
    let 경도 = mypositionlng - store.slng; // 나의 경도
    console.log("나의 lnt = "+mypositionlng);

    // console.log(위도);
    // console.log(경도);
    // 매개변수 = 내위도 , 내경도 , 검색한곳위도 , 검색한곳경도
    let dist = distance(mypositionlat, mypositionlng, store.slat, store.slng);
    // console.log(dist+"KM 입니다");
    return dist;
}

    // 매개변수 = 내위도 , 내경도 , 검색한곳위도 , 검색한곳경도
function distance(lat1, lon1, lat2, lon2) {
    let R = 6371; // 지구 반지름 (단위: km)
    let dLat = deg2rad(lat2 - lat1); // 차이값 위도
    let dLon = deg2rad(lon2 - lon1); // 차이값 경도
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let distance = R * c; // 두 지점 간의 거리 (단위: km)
        return distance;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180);
    }

// 전승호 END ======================================================================
// 배너 ==================================================================================
const outer = document.querySelector('.outer');
const innerList = document.querySelector('.inner-list');
const inners = document.querySelectorAll('.inner');
let currentIndex = 0; // 현재 슬라이드 화면 인덱스

inners.forEach((inner) => {
  inner.style.width = `${outer.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
})

innerList.style.width = `${outer.clientWidth * inners.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

/*
  버튼에 이벤트 등록하기
*/
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');

buttonLeft.addEventListener('click', () => {
  currentIndex--;
  currentIndex = currentIndex < 0 ? 0 : currentIndex; // index값이 0보다 작아질 경우 0으로 변경
  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
  clearInterval(interval); // 기존 동작되던 interval 제거
  interval = getInterval(); // 새로운 interval 등록
});

buttonRight.addEventListener('click', () => {
  currentIndex++;
  currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
  clearInterval(interval); // 기존 동작되던 interval 제거
  interval = getInterval(); // 새로운 interval 등록
});/*
     주기적으로 화면 넘기기
   */
   const getInterval = () => {
     return setInterval(() => {
       currentIndex++;
       currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
       innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
     }, 40000000);
   }


let interval = getInterval(); // interval 등록

// 배너 END==================================================================================

}); // GeoLocation end
// 2.삭제기능
function onDelete(){
    $.ajax({
        url:"/store/delete.do", method:"delete", data:{'sno':sno}, success:(r)=>{
            if(r){alert('삭제성공'); location.href="/store/view";}
        else{alert('삭제실패');}
        }

    });
}

// 6. 즐겨찾기 실행
function slikeDo(sno , method){
    console.log('slikedo 실행');
    let result = false;
    $.ajax({
        url:'/store/slike.do',
        method:method,
        data:{sno:sno},
        async:false,
        success:(r)=>{
            console.log(r);
            result = r;
        }
    });
    if(method != 'get'){ // 순환 참조 해결 후 get실행
        slikeState(sno);
    }
    return result;
}




// 7. 즐겨찾기 출력
function slikeState(sno){
    console.log('즐찾 출력 실행');
    let result = slikeDo(sno,'get');
    if(result){
        document.querySelector('.likeBtnBox').innerHTML = `
            <a href="#" onclick="slikeDo(${sno},'delete')"><img src="/img/yeslike.png" style="width:50px"></a>
        `;
    }else{
        document.querySelector('.likeBtnBox').innerHTML = `
            <a href="#" onclick="slikeDo(${sno},'post')"><img src="/img/nolike.png" style="width:50px"></a>
        `;
    }
}
