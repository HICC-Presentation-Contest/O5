//csrf token 건들지 말것
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');


//시간표 색
let timeTableBackgroundColorList = ['#e66767','#fed330','#26de81','#4b7bec','#ffda79','#f5cd79','#63cdda','#546de5','#6ab04c','#45aaf2']


// 요일 한국어에서 영어로 변환
function KorToEngOfDay(day) {
    switch (day) {
        case '월':
            return 'mon';
        case '화':
            return 'tue';
        case '수':
            return 'wed';
        case '목':
            return 'thu';
        case '금':
            return 'fri';
        case '토':
            return 'sat';
        case '일':
            return 'sun';
        default:
            return 0;
    }
}

function timeTableRemover() {
    document.getElementById('myTimeTable').innerHTML =
        "<tr>\n" +
        "                <td scope=\"col\" ;></td>\n" +
        "                <td scope=\"col\" ;>월</td>\n" +
        "                <td scope=\"col\" ;>화</td>\n" +
        "                <td scope=\"col\" ;>수</td>\n" +
        "                <td scope=\"col\" ;>목</td>\n" +
        "                <td scope=\"col\" ;>금</td>\n" +
        "                <td scope=\"col\" ;>토</td>\n" +
        "                <td scope=\"col\" ;>일</td>\n" +
        "            </tr>\n" +
        "            <!-- 1교시 -->\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">9:00 - 10:00</td>\n" +
        "                <td id=\"timeTable_mon_1\"></td>\n" +
        "                <td id=\"timeTable_tue_1\"></td>\n" +
        "                <td id=\"timeTable_wed_1\"></td>\n" +
        "                <td id=\"timeTable_thu_1\"></td>\n" +
        "                <td id=\"timeTable_fri_1\"></td>\n" +
        "                <td id=\"timeTable_sat_1\"></td>\n" +
        "                <td id=\"timeTable_sun_1\"></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">10:00 - 11:00</td>\n" +
        "                <td id=\"timeTable_mon_2\"></td>\n" +
        "                <td id=\"timeTable_tue_2\"></td>\n" +
        "                <td id=\"timeTable_wed_2\"></td>\n" +
        "                <td id=\"timeTable_thu_2\"></td>\n" +
        "                <td id=\"timeTable_fri_2\"></td>\n" +
        "                <td id=\"timeTable_sat_2\"></td>\n" +
        "                <td id=\"timeTable_sun_2\"></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">11:00 - 12:00</td>\n" +
        "                <td id=\"timeTable_mon_3\"></td>\n" +
        "                <td id=\"timeTable_tue_3\"></td>\n" +
        "                <td id=\"timeTable_wed_3\"></td>\n" +
        "                <td id=\"timeTable_thu_3\"></td>\n" +
        "                <td id=\"timeTable_fri_3\"></td>\n" +
        "                <td id=\"timeTable_sat_3\"></td>\n" +
        "                <td id=\"timeTable_sun_3\"></td>\n" +
        "            </tr>\n" +
        "\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">12:00 - 13:00</td>\n" +
        "                <td id=\"timeTable_mon_4\"></td>\n" +
        "                <td id=\"timeTable_tue_4\"></td>\n" +
        "                <td id=\"timeTable_wed_4\"></td>\n" +
        "                <td id=\"timeTable_thu_4\"></td>\n" +
        "                <td id=\"timeTable_fri_4\"></td>\n" +
        "                <td id=\"timeTable_sat_4\"></td>\n" +
        "                <td id=\"timeTable_sun_4\"></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">13:00 - 14:00</td>\n" +
        "                <td id=\"timeTable_mon_5\"></td>\n" +
        "                <td id=\"timeTable_tue_5\"></td>\n" +
        "                <td id=\"timeTable_wed_5\"></td>\n" +
        "                <td id=\"timeTable_thu_5\"></td>\n" +
        "                <td id=\"timeTable_fri_5\"></td>\n" +
        "                <td id=\"timeTable_sat_5\"></td>\n" +
        "                <td id=\"timeTable_sun_5\"></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">14:00 - 15:00</td>\n" +
        "                <td id=\"timeTable_mon_6\"></td>\n" +
        "                <td id=\"timeTable_tue_6\"></td>\n" +
        "                <td id=\"timeTable_wed_6\"></td>\n" +
        "                <td id=\"timeTable_thu_6\"></td>\n" +
        "                <td id=\"timeTable_fri_6\"></td>\n" +
        "                <td id=\"timeTable_sat_6\"></td>\n" +
        "                <td id=\"timeTable_sun_6\"></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">15:00 - 16:00</td>\n" +
        "                <td id=\"timeTable_mon_7\"></td>\n" +
        "                <td id=\"timeTable_tue_7\"></td>\n" +
        "                <td id=\"timeTable_wed_7\"></td>\n" +
        "                <td id=\"timeTable_thu_7\"></td>\n" +
        "                <td id=\"timeTable_fri_7\"></td>\n" +
        "                <td id=\"timeTable_sat_7\"></td>\n" +
        "                <td id=\"timeTable_sun_7\"></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">16:00 - 17:00</td>\n" +
        "                <td id=\"timeTable_mon_8\"></td>\n" +
        "                <td id=\"timeTable_tue_8\"></td>\n" +
        "                <td id=\"timeTable_wed_8\"></td>\n" +
        "                <td id=\"timeTable_thu_8\"></td>\n" +
        "                <td id=\"timeTable_fri_8\"></td>\n" +
        "                <td id=\"timeTable_sat_8\"></td>\n" +
        "                <td id=\"timeTable_sun_8\"></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">17:00 - 18:00</td>\n" +
        "                <td id=\"timeTable_mon_9\"></td>\n" +
        "                <td id=\"timeTable_tue_9\"></td>\n" +
        "                <td id=\"timeTable_wed_9\"></td>\n" +
        "                <td id=\"timeTable_thu_9\"></td>\n" +
        "                <td id=\"timeTable_fri_9\"></td>\n" +
        "                <td id=\"timeTable_sat_9\"></td>\n" +
        "                <td id=\"timeTable_sun_9\"></td>\n" +
        "            </tr>"
}

function addClassToTimeTable(TimeTableClass) {
    timeTableRemover()
    // 수업이름
    let className = '';
    //  강의실 정보
    let lectureRoom = '';
    // 교수님
    let professorName = '';
    // 시간 정보
    let timeList = '';
    // 수업의 요일
    let day = '';
    // 수업의 요일의 시간
    let timeOfDay = '';
    // html에 넣을 id
    let id = '';
    // timeTableClass 각 수업마다, 이름, 시간으로 쪼갠다.
    for (let i = 0; i < TimeTableClass.length; i++) {
        className = TimeTableClass[i][0];
        let classNameList = className.split(' ');
        className = classNameList[0];

        lectureRoom = TimeTableClass[i][4];
        professorName = TimeTableClass[i][3];

        timeList = TimeTableClass[i][1].split(","); // 월2 화2 수2 이렇게 쪼개진다.
        for (let j = 0; j < timeList.length; j++) // 월234는 한번.
        {
            day = KorToEngOfDay(timeList[j].substr(0, 1)); // 월234에서 월 가져온다.
            timeOfDay = timeList[j].substring(1); // 2,3,4 가져온다.
            for (let k = 0; k < timeOfDay.length; k++) {
                id = "#timeTable_" + day + "_" + timeOfDay.substr(k, 1);
                let text =
                    className + '<br>'+ professorName +'<br>' + lectureRoom;
                $(id).html(text);
                // document.getElementById(id).innerHTML = text;
                $(id).css('background-color', timeTableBackgroundColorList[i]); // 색주기
            }

        }

    }

}


// 결과 시간리스트
let ResultTimeTableList =
    [
        [
            ['스페인어', '월234', '1'],
            ['컴퓨터구조', '화2,수2,목2', '2'],
            ['컴퓨터네트워크', '수3,금23', '3'],
            ['알고리즘분석', '화5,수5,목5', '4'],
            ['프로그래밍언어론', '화9,금56', '5']
        ],
        [
            ['스페인어', '토234', '6'],
            ['컴퓨터구조', '화2,수2,목2', '7'],
            ['컴퓨터네트워크', '수3,금23', '8'],
            ['알고리즘분석', '화5,수5,목5', '9'],
            ['프로그래밍언어론', '화9,금56', '10']
        ],
        [
                ['스페인어', '일234', '11'],
                ['컴퓨터구조', '화2,수2,목2', '12'],
                ['컴퓨터네트워크', '수3,금23', '13'],
                ['알고리즘분석', '화5,수5,목5', '14'],
                ['프로그래밍언어론', '화9,금56', '15']
        ]

    ]





// 시간표 다중 슬라이드 코드
const swiper = new Swiper('.swiper-container', {
  //기본 셋팅
  //방향 셋팅 vertical 수직, horizontal 수평 설정이 없으면 수평
  direction: 'horizontal',
  //한번에 보여지는 페이지 숫자
  slidesPerView: 4,
  //페이지와 페이지 사이의 간격
  spaceBetween: 1,
  //버튼 클릭시 이동하는 칸수
  slidesPerGroup: 4,
  //슬라이드가 밀리지 않도록 보정
  centeredSlides: false,
  //드레그 기능 true 사용가능 false 사용불가
  debugger: true,
  //반복 기능 true 사용가능 false 사용불가
  loop: false,
  // 페이지 전환효과 slidesPerView효과와 같이 사용 불가
  // effect: 'fade',
  // 그룹수가 맞지 않을 경우 빈칸으로 메우기
  // 3개가 나와야 되는데 1개만 있다면 2개는 빈칸으로 채워서 3개를 만듬
  loopFillGroupWithBlank : true,


  //자동 스크를링

  //페이징
  pagination: {
    //페이지 기능
    el: '.swiper-pagination',
    //클릭 가능여부
    clickable: true,
  },

  //방향표
  navigation: {
    //다음페이지 설정
    nextEl: '.swiper-button-next',
    //이전페이지 설정
    prevEl: '.swiper-button-prev',
  },
});



//오른쪽 리스트에 넣는 함수들
//리스트 자료형 생성 및 시간표 색상
function makingTableList(TimeTableClassList) {
    for (let i = 0; i < TimeTableClassList.length; i++){
        swiper.appendSlide(
            "<div class='swiper-slide' onclick='clickTimeTableListElement(this)'> " +
                '<table class="timeTableListElement" id="timeTableListElement_'+ i +'">'+
                    "            <tr>\n" +
                    "                <td class=\"timeTable_mon_1\"></td>\n" +
                    "                <td class=\"timeTable_tue_1\"></td>\n" +
                    "                <td class=\"timeTable_wed_1\"></td>\n" +
                    "                <td class=\"timeTable_thu_1\"></td>\n" +
                    "                <td class=\"timeTable_fri_1\"></td>\n" +
                    "                <td class=\"timeTable_sat_1\"></td>\n" +
                    "                <td class=\"timeTable_sun_1\"></td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "                <td class=\"timeTable_mon_2\"></td>\n" +
                    "                <td class=\"timeTable_tue_2\"></td>\n" +
                    "                <td class=\"timeTable_wed_2\"></td>\n" +
                    "                <td class=\"timeTable_thu_2\"></td>\n" +
                    "                <td class=\"timeTable_fri_2\"></td>\n" +
                    "                <td class=\"timeTable_sat_2\"></td>\n" +
                    "                <td class=\"timeTable_sun_2\"></td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "                <td class=\"timeTable_mon_3\"></td>\n" +
                    "                <td class=\"timeTable_tue_3\"></td>\n" +
                    "                <td class=\"timeTable_wed_3\"></td>\n" +
                    "                <td class=\"timeTable_thu_3\"></td>\n" +
                    "                <td class=\"timeTable_fri_3\"></td>\n" +
                    "                <td class=\"timeTable_sat_3\"></td>\n" +
                    "                <td class=\"timeTable_sun_3\"></td>\n" +
                    "            </tr>\n" +
                    "\n" +
                    "            <tr>\n" +
                    "                <td class=\"timeTable_mon_4\"></td>\n" +
                    "                <td class=\"timeTable_tue_4\"></td>\n" +
                    "                <td class=\"timeTable_wed_4\"></td>\n" +
                    "                <td class=\"timeTable_thu_4\"></td>\n" +
                    "                <td class=\"timeTable_fri_4\"></td>\n" +
                    "                <td class=\"timeTable_sat_4\"></td>\n" +
                    "                <td class=\"timeTable_sun_4\"></td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "                <td class=\"timeTable_mon_5\"></td>\n" +
                    "                <td class=\"timeTable_tue_5\"></td>\n" +
                    "                <td class=\"timeTable_wed_5\"></td>\n" +
                    "                <td class=\"timeTable_thu_5\"></td>\n" +
                    "                <td class=\"timeTable_fri_5\"></td>\n" +
                    "                <td class=\"timeTable_sat_5\"></td>\n" +
                    "                <td class=\"timeTable_sun_5\"></td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "                <td class=\"timeTable_mon_6\"></td>\n" +
                    "                <td class=\"timeTable_tue_6\"></td>\n" +
                    "                <td class=\"timeTable_wed_6\"></td>\n" +
                    "                <td class=\"timeTable_thu_6\"></td>\n" +
                    "                <td class=\"timeTable_fri_6\"></td>\n" +
                    "                <td class=\"timeTable_sat_6\"></td>\n" +
                    "                <td class=\"timeTable_sun_6\"></td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "                <td class=\"timeTable_mon_7\"></td>\n" +
                    "                <td class=\"timeTable_tue_7\"></td>\n" +
                    "                <td class=\"timeTable_wed_7\"></td>\n" +
                    "                <td class=\"timeTable_thu_7\"></td>\n" +
                    "                <td class=\"timeTable_fri_7\"></td>\n" +
                    "                <td class=\"timeTable_sat_7\"></td>\n" +
                    "                <td class=\"timeTable_sun_7\"></td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "                <td class=\"timeTable_mon_8\"></td>\n" +
                    "                <td class=\"timeTable_tue_8\"></td>\n" +
                    "                <td class=\"timeTable_wed_8\"></td>\n" +
                    "                <td class=\"timeTable_thu_8\"></td>\n" +
                    "                <td class=\"timeTable_fri_8\"></td>\n" +
                    "                <td class=\"timeTable_sat_8\"></td>\n" +
                    "                <td class=\"timeTable_sun_8\"></td>\n" +
                    "            </tr>\n" +
                    "            <tr>\n" +
                    "                <td class=\"timeTable_mon_9\"></td>\n" +
                    "                <td class=\"timeTable_tue_9\"></td>\n" +
                    "                <td class=\"timeTable_wed_9\"></td>\n" +
                    "                <td class=\"timeTable_thu_9\"></td>\n" +
                    "                <td class=\"timeTable_fri_9\"></td>\n" +
                    "                <td class=\"timeTable_sat_9\"></td>\n" +
                    "                <td class=\"timeTable_sun_9\"></td>\n" +
                    "            </tr>" +

                "</table>" +
            "</div>");

        // 시간표 넣기

        //수업 이름
        let className = '';
        // 시간 정보
        let timeList = '';
        // 수업의 요일
        let day = '';
        // 수업의 요일의 시간
        let timeOfDay = '';
        // html에 넣을 id
        let myClass = '';
        // 이부분이 시간표 색상 설정!, 순서대로 색깔이 지정 된다.
        // timeTableClass 각 수업마다, 이름, 시간으로 쪼갠다.
        for (let l = 0; l < TimeTableClassList[i].length; l++) {
            className = TimeTableClassList[i][l][0];
            timeList = TimeTableClassList[i][l][1].split(","); // 월2 화2 수2 이렇게 쪼개진다.
            for (let j = 0; j < timeList.length; j++) // 월234는 한번.
            {
                day = KorToEngOfDay(timeList[j].substr(0, 1)); // 월234에서 월 가져온다.
                timeOfDay = timeList[j].substring(1); // 2,3,4 가져온다.
                for (let k = 0; k < timeOfDay.length; k++) {
                    myClass = ".timeTable_" + day + "_" + timeOfDay.substr(k, 1);
                    $("#timeTableListElement_" + i + '> tbody > tr > ' +myClass).css('background-color', timeTableBackgroundColorList[l]); // 색주기
                }

            }

        }
    }
}
//
function clickTimeTableListElement(event){
    let idName = $(event.getElementsByClassName('timeTableListElement')).attr('id'); //테이블 id 가져오기
    // console.log('id:' + idName);
    let idNameList = idName.split('_');
    let listNumber = idNameList[1]; //timeTableList_1 이면 1만 가져오기
    addClassToTimeTable(ResultTimeTableList[listNumber]) // 결과리스트의 listNumber째의 리스트를 왼쪽 myTimeTable에 출력


}


// 체크박스 값 넘기기
function sendingSortValue(){
    // name이 같은 체크박스의 값들을 배열에 담는다.
    let sendingGroupList = [];
    let weekDayList = [];
    $("input[name='sortValue']:checked").each(function(i) {
        sendingGroupList.push($(this).val());
        if ($(this).val() == 'emptyDay'){ // 만약 공강일 있으면 공강일 리스트도 보낸다.
            $("input[name='weekDay']:checked").each(function(i) {
                weekDayList.push($(this).val());
                });
            }
    });
    // console.log(sendingGroupList);
    // console.log(weekDayList);
    $.ajax({
        url: 'sendSortValue',
        type: 'POST',
        // data부분은 딕셔너리로 넘겨준다
        // traditional: true, // 배열전달하기위한 조건
        data: {
            'resultTimeTableWithTF' : resultTimeTableWithTF,
            'sortValueList': JSON.stringify(sendingGroupList),
            'weekDayList' : JSON.stringify(weekDayList),
            'csrfmiddlewaretoken': csrftoken,
        },
        datatype: 'json',
        beforeSend: function (request) {
            // Performed before calling Ajax
            $("#mySpinner").show();

        },
        success: function (data) {
            $("#mySpinner").hide();
            ResultTimeTableList = data.resultTimeTable;
                // 시작할 때 왼쪽페이지에 넣어준다
            if(ResultTimeTableList.length != 0){

                addClassToTimeTable(ResultTimeTableList[0]);
                //결과리스트 출력
                makingTableList(ResultTimeTableList);
            }

        },

    });
}


let resultTimeTableWithTF = []
window.onload = function () {
    let objString = '';
    // 전페이지에서 결과 시간표 가져오기
    if(localStorage.getItem('resultTimeTable')){
        objString= localStorage.getItem('resultTimeTable');
    }
    if(localStorage.getItem('resultTimeTableList')){
        resultTimeTableWithTF = localStorage.getItem('resultTimeTableList');
    }
    ResultTimeTableList = JSON.parse(objString);
    // resultTimeTableWithTF = JSON.parse(resultTimeTableWithTF);
    console.log(ResultTimeTableList);
    // 시작할 때 왼쪽페이지에 넣어준다
    if(ResultTimeTableList != []) {
        addClassToTimeTable(ResultTimeTableList[0]);
        //결과리스트 출력
        makingTableList(ResultTimeTableList);
    }
}

 var weekdays = document.getElementById("weekdays");

 function toggleWeekdays(){
            if($("input:checkbox[id='savingFreeDay']").is(":checked") == true){
                weekdays.style.display = "block";
            } else {
                weekdays.style.display = "none";
            }
        }
