let lat = 0 // 위도
let lng = 0 // 경도

//1. 가게 등록
function onReg(){
    let count = 0;
    for(let i =0; i<checkList.length;i++){
    if(checkList[i]){
    console.log(checkList[i]+(i+"번쨰인덱스 문제"));
    count++; console.log(count);
        }
    }
    if(count!=9){
        alert('입력사항들을 모두 정확히 입력해주세요');
        return;
    }
    console.log("onReg()");
    //1. 폼DOM 가져온다.
    let storeRegForm = document.querySelector('#storeRegForm');
    console.log(storeRegForm);
    //2. 폼 바이트 (바이너리) 객체 변환
    let storeRegFormData= new FormData(storeRegForm);
    console.log(storeRegFormData);
    // 3. 폼 속성( 위도 , 경도 ) 추가
    if( lat == 0 || lng == 0 ){
            alert('주소를 입력하셔야 등록이 가능합니다.');
            return;
        }
        storeRegFormData.set('slat',lat);
        storeRegFormData.set('slng',lng);
    //4. ajax 첨부파일 폼 전송
    $.ajax({
        url : "/store/reg.do" ,
        method : "post" ,
        data: storeRegFormData,
        contentType: false,
        processData: false,
        success : (r) => {
            console.log(r);
            if(r==0){
                alert('등록 실패: 관리자에게 문의: DB오류')
            }else if(r==-1){
                alert('등록실패: 관리자에게 문의 (첨부파일 오류)')
            }else if(r>=1){
            alert('등록 성공')
            location.href='/store/view';
            }else if(r==-2){
                alert('로그인을 하고 가게를 등록해주세요');
                location.href='/member/login';
            }
        }
    })
}
//=============================유효성 검사===============================
// 유효성 검사 체크현황
let checkList= [false,false,false,false,false,false,false,false,false]   // 가게이름 (한글자이상,중복이 아니게), 전화번호(xxx-xxx?-xxxx 형식), 가게주소(지도기능 넣고수정)
                            // 가게설명 (null이 아니게) ,사업자 번호(xxx-xx-xxxxx)중복없음, 이미지1,2,3,4(반드시 입력)

//2. 가게이름 유효성 검사(입력할 때마다)
function snameCheck(){console.log('snameCheck()');
    //1. 입력된 데이터 가져오기
    let sname = document.querySelector('#sname').value;    console.log( sname );
        // 2. 정규표현식 : 한글,영대소문자+숫자 조합의 1~30 글자 사이 규칙
        let 가게이름규칙 = /^[a-zA-Z0-9가-힣]{1,30}$/
        // 3. 정규표현식 에 따른 검사.
        if( 가게이름규칙.test(sname) ){
            $.ajax({
                url : `/store/reg/snamecheck` ,
                method : "get" ,
                data : { 'sname' : sname } ,
                success : (r)=>{
                    if( r ){  // true : 중복있다 , false : 중복없다.
                        document.querySelector('.snameCheckBox').innerHTML = `사용중인 가게명입니다.`;
                        checkList[0] = false; // 체크 현황 변경
                    }else{
                        document.querySelector('.snameCheckBox').innerHTML = `사용가능한 가게명입니다.`;
                        checkList[0] = true; // 체크 현황 변경
                    }
                } // success end
            }) // ajax end
        }else{
            // 유효성 검사 결과 출력
            document.querySelector('.snameCheckBox').innerHTML = ` 1~30글자 사이로 입력해주세요.`;
            checkList[0] = false; // 체크 현황 변경
        }
}

//3. 전화번호 유효성검사  000-0000-0000 00-0000-0000
function sphonecheck(){
    let sphone = document.querySelector('#sphone').value;
    let 전화번호규칙 = /^([0-9]{2,3})+[-]+([0-9]{3,4})+[-]+([0-9]{4})+$/
    let msg='-를 포함한 전화번호 형식으로 입력해주세요';
    checkList[1]=false;
    if(전화번호규칙.test(sphone)){
        msg='유효한 전화번호입니다.'; checkList[1]=true;
    }
    document.querySelector('.sphonecheckbox').innerHTML= msg;
}

//4. 지역 유효성 검사 (보류)


//5. 가게 설명 유효성 검사
function scontentCheck(){
    // 1. 입력된 데이터 가져오기
        let scontent = document.querySelector('#scontent').value;    console.log( scontent );
        // 2. 정규표현식 한글,영대소문자+숫자 조합의 10~100 글자 사이 규칙
        let 가게설명 = /^[a-zA-Z0-9가-힣]{10,100}$/
        let msg='';
        checkList[3]=false;
        // 3. 정규표현식 에 따른 검사.
            console.log( 가게설명.test( scontent ) );
          if( 가게설명.test(scontent) ){
                msg='유효한 가게설명입니다'; checkList[3]=true;
          }else{msg='10~100글자사이로 가게 설명을 적어주세요'}
          document.querySelector('.scontentcheckbox').innerHTML =msg;
}

//6. 사업자번호 (유효성 검사)
function snumberCheck(){
    let snumber = document.querySelector('#snumber').value;    console.log( snumber );
        let 사업자번호규칙 = /^([0-9]{3})+[-]+([0-9]{2})+[-]+([0-9]{5})+$/  //숫자 xxx-xx-xxxxx
        if( 사업자번호규칙.test(snumber) ){
            $.ajax({
                url : `/store/reg/snumbercheck` ,
                method : "get" ,
                data : { 'snumber' : snumber } ,
                success : (r)=>{
                    if( r ){  // true : 중복있다 , false : 중복없다.
                        document.querySelector('.snumberCheckBox').innerHTML = `사용중인 사업자번호입니다.`;
                        checkList[4] = false; // 체크 현황 변경
                    }else{
                        document.querySelector('.snumberCheckBox').innerHTML = `사용가능한 사업자번호입니다.`;
                        checkList[4] = true; // 체크 현황 변경
                    }
                } // success end
            }) // ajax end
        }else{
            // 유효성 검사 결과 출력
            document.querySelector('.snumberCheckBox').innerHTML = ` xxx-xx-xxxxx형식의 숫자로만 입력해주세요`;
            checkList[4] = false; // 체크 현황 변경
        }
}

// 이미지변경1
function onChangeStoreImg1(se){
    let fileReader= new FileReader();
    fileReader.readAsDataURL(se.files[0]);
    fileReader.onload = se2 => {
    document.querySelector('#storePreimg1').src = se2.target.result
    }
    checkList[5]=true;
}
// 이미지변경2
function onChangeStoreImg2(se){
    let fileReader= new FileReader();
    fileReader.readAsDataURL(se.files[0]);
    fileReader.onload = se2 => {
    document.querySelector('#storePreimg2').src = se2.target.result
    }
    checkList[6]=true;
}
// 이미지변경3
function onChangeStoreImg3(se){
    let fileReader= new FileReader();
    fileReader.readAsDataURL(se.files[0]);
    fileReader.onload = se2 => {
    document.querySelector('#storePreimg3').src = se2.target.result
    }
    checkList[7]=true;
}
// 이미지변경4
function onChangeStoreImg4(se){
    let fileReader= new FileReader();
    fileReader.readAsDataURL(se.files[0]);
    fileReader.onload = se2 => {
    document.querySelector('#storePreimg4').src = se2.target.result
    }
    checkList[8]=true;
}

//지도 표시
 var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };

    //지도를 미리 생성
    var map = new daum.maps.Map(mapContainer, mapOption);
    //주소-좌표 변환 객체를 생성
    var geocoder = new daum.maps.services.Geocoder();
    //마커를 미리 생성
    var marker = new daum.maps.Marker({
        position: new daum.maps.LatLng(37.537187, 127.005476),
        map: map
    });


// 주소입력받기
    function sample5_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                var addr = data.address; // 최종 주소 변수

                // 주소 정보를 해당 필드에 넣는다.
                document.getElementById("sample5_address").value = addr;
                // 주소로 상세 정보를 검색
                geocoder.addressSearch(data.address, function(results, status) {
                    // 정상적으로 검색이 완료됐으면
                    if (status === daum.maps.services.Status.OK) {
                        checkList[2]=true;
                        var result = results[0]; //첫번째 결과의 값을 활용

                        // 해당 주소에 대한 좌표를 받아서
                        var coords = new daum.maps.LatLng(result.y, result.x);
                        lat=result.y; console.log;
                        lng=result.x; console.log;
                        // 지도를 보여준다.
                        mapContainer.style.display = "block";
                        map.relayout();
                        // 지도 중심을 변경한다.
                        map.setCenter(coords);
                        // 마커를 결과값으로 받은 위치로 옮긴다.
                        marker.setPosition(coords)
                    }
                });
            }
        }).open();
    }