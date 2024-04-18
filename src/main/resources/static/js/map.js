let mypositionlat = 0; // 나의 위도
let mypositionlng = 0; // 나의 경도

var map = 0;
var clusterer = 0;
var markerImage = 0;
var markerPosition = 0;

let marker = 0;

// 현재 위치 가져오기
navigator.geolocation.getCurrentPosition(async (myLocation)=>{
    console.log(myLocation);

    mypositionlat = myLocation.coords.latitude;
    mypositionlng = myLocation.coords.longitude;

    console.log(myLocation.coords.latitude);
    console.log(myLocation.coords.longitude);



    map = new kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
        center : new kakao.maps.LatLng(mypositionlat, mypositionlng), // 지도의 중심좌표
        level : 4 // 지도의 확대 레벨
    });

// // 우클릭 이벤트(전승호 추가)====================================================
// 지도를 클릭한 위치에 표출할 마커입니다
let marker2 = new kakao.maps.Marker({ 
    // 지도 중심좌표에 마커를 생성합니다 
    position: map.getCenter(mypositionlat,mypositionlng)
}); 
// kakao.maps.event.addListener(map, 'rightclick', function (mouseEvent) {

//     // 클릭한 위도, 경도 정보를 가져옵니다 
//     var latlng2 = mouseEvent.latLng;
//     console.log(latlng2);
//     console.log(latlng2.La);

    
//     // 마커 위치를 클릭한 위치로 옮깁니다
//     marker2.setPosition(latlng2);

//     // 지도에 마커를 표시합니다
//     marker2.setMap(map);
    
//     mypositionlat= latlng2.La; // 위도 
//     mypositionlng = latlng2.Ma;; // 나의 경도
    
// });
// console.log(mypositionlat);
// console.log(mypositionlng);
// var latlng2 = {'Ma':mypositionlat,'La':mypositionlng};
// marker2.setPosition(mypositionlat,mypositionlng);
marker2.setMap(map);

// // 우클릭 이벤트(전승호 추가)END ====================================================

    var imageSrc = '/img/mapicon.png', // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(34, 46), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(10, 42)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치입니다

    clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 6 // 클러스터 할 최소 지도 레벨
    });
    nsew();
    console.log(clusterer);
    kakao.maps.event.addListener( map, 'dragend', ()=>{ nsew(); });
});



function getStoreInfo(east , west , south , north){
    $.ajax({
        url:'/algorithm/findstoreinfo',
        method:'get',
        async:false,
        success:(r)=>{
            let mapSideAlgorithm = document.querySelector('.mapSideAlgorithm');
            let htmlAlgorithm = ``;
            $.ajax({
                url:'/algorithm/print',
                method:'get',
                async:false,
                success:(r2)=>{
                    console.log(r);
                    console.log(r2);
                    htmlAlgorithm += `
                        <h2>추천</h2>
                    `;
                    let count = 0;
                    for(let i = 0; i < r.length; i++){
                        if(r2 == r[i].categoryb){
                            if(r[i].sstate == 2){
                                if(count == 3){
                                    return;
                                }else {
                                    htmlAlgorithm += `
                                        <li class="storeSideInfo storeSideList${r[i].sno}">
                                            <img src="/img/${r[i].sfile1}"/>
                                            <div>
                                                <h4>${r[i].sname}</h4>
                                                <p>${r[i].scontent}</p>
                                                <p><a href="#">${r[i].sphone}</a></p>
                                                <p>${r[i].sadress}</p>
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

            mapSideAlgorithm.innerHTML = htmlAlgorithm;
        }
    })
    $.ajax({
        url:'/map/storeinfo.do',
        method:'get',
        data:{
            east:east,
            west:west,
            south:south,
            north:north
        },
        async:false,
        success:(response)=>{
            console.log(response);

            // 전승호 추가부분 ====
            if(searchPlaces()){
                marker.setMap(null);
                response = mapSerch();
                console.log(response);
            }
            // ==========================

            // 사이드 바
            let mapSideContent = document.querySelector('.mapSideContent');
            let html = ``;
            html+=`
                <h2>일반</h2>
            `;

            response.forEach((store)=>{
                html += `
                    <li class="storeSideInfo storeSideList${store.sno}">
                        <img src="/img/${store.sfile1}"/>
                        <div>
                            <h4>${store.sname}</h4>
                            <p>${store.scontent}</p>
                            <p><a href="#">${store.sphone}</a></p>
                            <p>${store.sadress}</p>
                        </div>
                        <a href="/store/info?sno=${store.sno}"></a>
                    </li>
                `
            });
            mapSideContent.innerHTML = html;


            // 작성시작


            // 작성끝
            // 마커 찍기
            let markers = response.map((data)=>{
                // 1. 마커 생성
                marker = new kakao.maps.Marker({
                    position : new kakao.maps.LatLng(data.slat, data.slng),
                    image : markerImage
                })

                // 마커에 클릭이벤트를 등록합니다
                kakao.maps.event.addListener(marker, 'click', function() {
                    let locPosition = new kakao.maps.LatLng(data.slat, data.slng);
                    map.setCenter(locPosition);
                    // 마커 위에 인포윈도우를 표시합니다
                    let storeSideInfo = document.querySelectorAll('.storeSideInfo');

                    for(let i = 0; i < storeSideInfo.length; i++){
                        storeSideInfo[i].style.backgroundColor = '#fff'
                    }

                    let storeSideList = document.querySelector(`.storeSideList${data.sno}`);

                    storeSideList.style.backgroundColor = '#EBC394';

                    $('#mapSideBox').animate({scrollTop:$(storeSideList).offset().top}, 500);
                });

                return marker; // 2. 클러스터 저장하기 위해 반복문 밖으로 생성된 마커 반환
            });
            clusterer.clear();
            // 3. 클러스터러에 마커들을 추가합니다
            clusterer.addMarkers(markers);
        }
    });
}

// 동서남북 값 출력
function nsew(){
    // 지도 영역정보를 얻어옵니다
    let bounds = map.getBounds();

    // 영역정보의 남서쪽 정보를 얻어옵니다
    let swLatlng = bounds.getSouthWest();

    // 영역정보의 북동쪽 정보를 얻어옵니다
    let neLatlng = bounds.getNorthEast();
    console.log(swLatlng.La);
    console.log(swLatlng.Ma);
    console.log(neLatlng.La);
    console.log(neLatlng.Ma);

    let east = neLatlng.La;
    let west = swLatlng.La;
    let south = swLatlng.Ma;
    let north = neLatlng.Ma;

    getStoreInfo(east , west , south , north);
}

// 전승호 ================================================================





// 검색 키워드 유효성검사
function searchPlaces(){
    
    let keyword = document.querySelector('#mapkeyword').value;
    console.log('searchPlaces() 입력받은 keyword = '+keyword);

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        // alert('키워드를 입력해주세요!');
        return false;
    }
    return true;
}
// keyword 가 포함된 주소 찾아오기
    // 반환 = storeDto DB
function mapSerch(){
    console.log("mapSerch()실행 ");
    let keyword = document.querySelector('#mapkeyword').value;

    let storelist= [];
    $.ajax({
        url: "/map/search.do",
        method : "get",
        data: {'keyword':keyword},
        async : false,
        success: function (response) {
            console.log("mapSerch()Ajax 내용 = "+response);
            storelist=response;
        }
    });
    console.log(storelist);
    document.querySelector('#mapkeyword').value=='';


    // 거리 계산하는 부분 
        // 1. 임시배열에 위도경도 로 거리계산한 내용을 넣어둔다
    let sublist = [];
    for(let i = 0; i<storelist.length; i++){
        sublist[i] = qweasd(storelist[i])
    }
    console.log(sublist);
        // 2. 거리를 오름차순으로 정렬시키면서 원래 배열index를 스왑시켜줌
    let tmp;
    let tmp2;
    for(let j = 0; j<sublist.length; j++) {
        for(let k = j+1; k<sublist.length; k++) {
            if(sublist[j]>sublist[k]) { 
                tmp = sublist[j];
                tmp2 = storelist[j];
                
                sublist[j] = sublist[k];
                storelist[j] = storelist[k];

                sublist[k] = tmp;
                storelist[k] = tmp2;
            }
        }
    } //sort end
    console.log(storelist);
    
    
    return storelist;
}

// 거리계산-========================================
    // 매개변수 = 상점정보
function qweasd(store){
    // console.log("경도"+mypositionlat);
    // console.log(store);
    let 위도 = mypositionlat - store.slat; // 나의 위도
    let 경도 = mypositionlng - store.slng; // 나의 경도

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
  


// 전승호 END ============================================================