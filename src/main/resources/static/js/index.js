$.ajax({
    url:'/algorithm/findstoreinfo',
    method:'get',
    async:false,
    success:(r)=>{
        let suggestion = document.querySelector('.suggestion');
        let html = ``;

        $.ajax({
            url:'/algorithm/print',
            method:'get',
            async:false,
            success:(r2)=>{
                let count = 0;
                for(let i = 0; i < r.length; i++){
                    if(r2 == r[i].categoryb){
                        if(r[i].sstate == 2){
                            if(count == 4){
                                return;
                            }else {
                                if(r[i].categorya == 1){
                                    r[i].categorya = '안산';
                                }else if(r[i].categorya == 2){
                                    r[i].categorya = '시흥';
                                }else if(r[i].categorya == 3){
                                    r[i].categorya = '수원';
                                }else if(r[i].categorya == 4){
                                    r[i].categorya = '부천';
                                }else if(r[i].categorya == 5){
                                    r[i].categorya = '안양';
                                }else if(r[i].categorya == 6){
                                    r[i].categorya = '서울';
                                }

                                if(r[i].categoryb == 1){
                                    r[i].categoryb = '한식';
                                }else if(r[i].categoryb == 2){
                                    r[i].categoryb = '일식';
                                }else if(r[i].categoryb == 3){
                                    r[i].categoryb = '중식';
                                }else if(r[i].categoryb == 4){
                                    r[i].categoryb = '양식';
                                }else if(r[i].categoryb == 5){
                                    r[i].categoryb = '분식';
                                }else if(r[i].categoryb == 6){
                                    r[i].categoryb = '패스트푸드';
                                }
                                html += `
                                    <li>
                                        <img src="/img/${r[i].sfile1}"/>
                                        <div class="mainContent">
                                            <p>${r[i].sname}<span>(${r[i].categorya})</span><span>(${r[i].categoryb})</span></p>
                                            <p>${r[i].scontent}</p>
                                        </div>
                                        <a href="/store/info?sno=${r[i].sno}"></a>
                                    </li>
                                `;
                                count++;
                            }
                        }
                    }
                }
            }
        })

        suggestion.innerHTML = html;
    }
})

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
});


/*
  주기적으로 화면 넘기기
*/
const getInterval = () => {
  return setInterval(() => {
    currentIndex++;
    currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
    innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
  }, 4000);
}

let interval = getInterval(); // interval 등록

// 배너 END==================================================================================

let mypositionlat = 0; // 나의 위도
let mypositionlng = 0; // 나의 경도
navigator.geolocation.getCurrentPosition(async (myLocation)=>{
    console.log(myLocation);

    mypositionlat = myLocation.coords.latitude;  // 나의 위도
    mypositionlng = myLocation.coords.longitude; // 나의 경도

// 근거리 순 4개 (store 의 sstate == 2 인 것만)
aroundStore();
function aroundStore(){
  let pageObject = {// 출력을 위한 양식 
    page: 1,                    
    pageStoreSize: 5,           
    categorya : 0,              
    categoryb : 0,              
    key: '',                    
    keyword: ''                 
  };  

  // sstate == 2 가게만 가져오기
  $.ajax({
    url: "/store/best.do",
    method : "get",
    data:pageObject,
    async :false,
    success: function (response) { // sstate == 2 가게만 가져오기
      console.log(" 선정된 맛집들 ");
      console.log(response.list);  // 리스트

      // 거리 계산하는 부분 
        // 1. 임시배열에 위도경도 로 거리계산한 내용을 넣어둔다
      let sublist = [];
      // 만약 리스트의 수가 5개 이상이면
      if(response.list.length>=5){
        for(let i = 0; i<=4; i++){
          sublist[i] = distanceCalculation(response.list[i])
        }
      }else{
        for(let i = 0; i<response.list.length; i++){
          sublist[i] = distanceCalculation(response.list[i])
        }
      }
      
      console.log(sublist);
          // 2. 거리를 오름차순으로 정렬시키면서 원래 배열index를 스왑시켜줌
      let tmp;
      let tmp2;
      for(let j = 0; j<sublist.length; j++) {
          for(let k = j+1; k<sublist.length; k++) {
              if(sublist[j]>sublist[k]) { 
                  tmp = sublist[j];
                  tmp2 = response.list[j];
                  
                  sublist[j] = sublist[k];
                  response.list[j] = response.list[k];

                  sublist[k] = tmp;
                  response.list[k] = tmp2;
              }
          }
      } //sort end
      // 4개만 추려낸 가계 출력
      for(let a= 0; a<4; a++){
        if(response.list[a].categorya == 1){
            response.list[a].categorya = '안산';
        }else if(response.list[a].categorya == 2){
            response.list[a].categorya = '시흥';
        }else if(response.list[a].categorya == 3){
            response.list[a].categorya = '수원';
        }else if(response.list[a].categorya == 4){
            response.list[a].categorya = '부천';
        }else if(response.list[a].categorya == 5){
            response.list[a].categorya = '안양';
        }else if(response.list[a].categorya == 6){
            response.list[a].categorya = '서울';
        }

        if(response.list[a].categoryb == 1){
            response.list[a].categoryb = '한식';
        }else if(response.list[a].categoryb == 2){
            response.list[a].categoryb = '일식';
        }else if(response.list[a].categoryb == 3){
            response.list[a].categoryb = '중식';
        }else if(response.list[a].categoryb == 4){
            response.list[a].categoryb = '양식';
        }else if(response.list[a].categoryb == 5){
            response.list[a].categoryb = '분식';
        }else if(response.list[a].categoryb == 6){
            response.list[a].categoryb = '패스트푸드';
        }
        document.querySelector('#nearRestaurant').innerHTML += `
            <li>
                <img src="/img/${response.list[a].sfile1}"/>
                <div class="mainContent">
                    <p>${response.list[a].sname}<span>(${response.list[a].categorya})</span><span>(${response.list[a].categoryb})</span></p>
                    <p>${response.list[a].scontent}</p>
                </div>
                <a href="/store/info?sno=${response.list[a].sno}"></a>
            </li>
        `
      }


    }

  });
}
// 거리계산 함수
function distanceCalculation(store){
  

  let dist = distance(mypositionlat, mypositionlng, store.slat, store.slng);
  
  return dist;
}
// 거리계산 함수
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

});



// -------------- 게시글 전체글 5개 출력하기 -------------------------------
let pageInfo = {
  page:1,              // 현재페이지수
  pageBoardSize:10,     // 페이지에 출력할 게시물수
  categoryA:0,         // 지역 카테고리
  categoryB:0,         // 음식 카테고리
  key:"1",              // 현재검색 key
  keyword:""           // 현재 검색keyword
}

boardListAllView(1) // 출력은 1page 만 5개
// 게시글 전체출력 (카테고리 무시)
function boardListAllView(page){
  // 페이지 정보에 입력받은 페이지 대입
  pageInfo.page = page;

  $.ajax({
      url: "/board/list.do",
      method : "get",
      data: pageInfo,
      async: false,
      success: function (response) {
          console.log(response);
  
          // 출력위치
          let boardTableBody = document.querySelector('#boardTableBody1');
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
          
        
          pageInfo.keyword="";// 변수 초기화
      }
          
  });

}
// -------------- 인기글 5개 출력하기 -------------------------------
bestBoard()
function bestBoard(){
  $.ajax({
    url: "/board/bestlist.do",
    method : "get",
    data: pageInfo,
    async: false,
    success: function (response) {
      console.log("인기글 내용");
      console.log(response);

        // 출력위치
        let boardTableBody = document.querySelector('#boardTableBody2');
        // 출력물 만들기
        let html = ``;
        for(let i = 0; i<=9; i++){
          html += `<tr>
                        <td>${response.list[i].bdate}</td>
                        <td class="nameHover" style="text-align: left;"><a href="/board/oneview?bno=${response.list[i].bno}">${response.list[i].bname}</a></td>
                        <td>${response.list[i].bcount}</td>
                        <td>
                            <img src="/img/${response.list[i].mimg}" style="width:20px; border-radius:50%;"/>
                            <span>${response.list[i].mid}</span>
                        </td>
                    </tr>`;
        }
        // 3. 출력
        boardTableBody.innerHTML = html;
        
      
        pageInfo.keyword="";// 변수 초기화
    }
        
});
}

// 전승호END ===========================================