// JavaScript source code

/*
1. makingNewTimeTable페이지에서 만들어진 새로운 시간표를
왼쪽의 생성된 시간표 페이지에 띄워주기 (크롤링된 내용을 띄워주는 걸로 일단 대신)
(되면 과목별로 색깔 다르게)
2. 그 표를 '기본시간표x'면 x개 만큼 만들어서 차례대로 html페이지에 띄우기
3. html파일에서 시간표를 누르면 왼쪽화면에다가 시간표 띄워주기
*/


// 크롤링 에시
var TimeTableClass =
    {
        '기본시간표1': [
            ['스페인어', '월234'],
            ['컴퓨터구조', '화2_수2_목2'],
            ['컴퓨터네트워크', '수3_금23'],
            ['알고리즘분석', '화5_수5_목5'],
            ['프로그래밍언어론', '화9_금56']
        ],
        '기본시간표2': [
            ['스페인어', '토234'],
            ['컴퓨터구조', '화2_수2_목2'],
            ['컴퓨터네트워크', '수3_금23'],
            ['알고리즘분석', '화5_수5_목5'],
            ['프로그래밍언어론', '화9_금56']
        ],
        '기본시간표3': [
            ['스페인어', '일234'],
            ['컴퓨터구조', '화2_수2_목2'],
            ['컴퓨터네트워크', '수3_금23'],
            ['알고리즘분석', '화5_수5_목5'],
            ['프로그래밍언어론', '화9_금56']
        ],

    }
;

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
        timeList = TimeTableClass[i][1].split("_"); // 월2 화2 수2 이렇게 쪼개진다.
        for (let j = 0; j < timeList.length; j++) // 월234는 한번.
        {
            day = KorToEngOfDay(timeList[j].substr(0, 1)); // 월234에서 월 가져온다.
            timeOfDay = timeList[j].substring(1); // 2,3,4 가져온다.
            for (let k = 0; k < timeOfDay.length; k++) {
                id = "#timeTable_" + day + "_" + timeOfDay.substr(k, 1);
                $(id).text(className);
            }

        }

    }

}


// // 딕셔너리를 받아서 개인 시간표 세팅하기 안의 함수
// function basicUserInformation(basicTimeTableName)
// {
//
// 	$('#myTimeTableName').html(basicTimeTableName);
// 	innerList = document.createElement('button');
// 	$(innerList).addClass( "list-group-item list-group-item-action" );
// 	$(innerList).text(basicTimeTableName);
// 	$('#timeTableNameList').append(innerList);
// }


// 딕셔너리를 받아서 개인 시간표 세팅하기
function basicUserInformation(TimeTableClass) {
    $('#timeTableNameList').empty(); // 기존 리스트 지우기
    let timeTableNameList = Object.keys(TimeTableClass)   // 리스트의 키값은 시간표이름
    //키값에 맞게 타임테이블이름 리스트에 추가해준다.
    for (let i = 0; i < timeTableNameList.length; i++) {
        $('#myTimeTableName').html(timeTableNameList[i]);
        let innerList = document.createElement('button');
        $(innerList).addClass("list-group-item list-group-item-action");
        $(innerList).text(timeTableNameList[i]);
        // $(innerList).click(addClassToTimeTable(this.text()))
        $(innerList).attr('onclick', 'timeTableNameClick(this)');
        $(innerList).css('text-align', 'center');
        $('#timeTableNameList').append(innerList);
    }
    // + 버튼 추가
    let innerList = document.createElement('button');
    $(innerList).addClass("list-group-item list-group-item-action");
    $(innerList).text('+');
    $(innerList).attr('onclick', 'location.href="makingNewTimeTable";');
    $(innerList).css('text-align', 'center');
    $('#timeTableNameList').append(innerList);

    addClassToTimeTable(TimeTableClass[timeTableNameList[0]]);

}

function timeTableNameClick(event) {
    let myTimeTable = TimeTableClass[event.innerHTML];
    $('#myTimeTableName').html(event.innerHTML); // 시간표 이름 변경
    addClassToTimeTable(myTimeTable)
}


window.onload = function () {
    // basicUserInformation(TimeTableClass);
    let timeTableNameList = Object.keys(TimeTableClass);
    addClassToTimeTable(TimeTableClass[timeTableNameList[0]]);
}


// 시간표 다중 슬라이드 코드_ 누구꺼지?
$(document).ready(function () {
    $('#myCarousel').carousel({
        interval: 100
    })
});


// 시간표 다중 슬라이드 코드_영상보고 쓴 것
var slides = document.querySelector('.slides'),
    slide = document.querySelector('.slides li'),
    currentIdx = 0, //현재
    slideCount = slide.length,
    prevBtn = document.querySelector('.prev'),
    slideWidth = 110,
    slideMargin = 10,
    nextBtn = document.querySelector('.next');

slides.style.width = (slideWidth + slideMargin)*slideCount - slideMargin + 'px';

function moveSlide(num){
    slides.style.left = -num * 120 + 'px';
    currentIdx = num;
}
nextBtn.addEventListener('click', function(){
    if(currentIdx < slideCount - 5){
       moveSlide(currentIdx + 1);
    }
    else
    {
        moveSlide(0);
    }
});
prevBtn.addEventListener('click', function(){
    if(currentIdx > 0){
       moveSlide(currentIdx - 1);
    }
    else
    {
        moveSlide(slideCount - 5);
    }
});




/* 코드 예시
var textList = [['0', '교양과(서울)', '예술학과', '교선', '예술과디자인', '002056-1', '미술의이해\n(COMPREHENSION OF ART)', 'C506', '3', '10/20/30/40/50', '55', '20', '비공학', '전영백', '화789', '미술대 수강불가/강의요원 여서영 ', '공통교양\n(서울)', '예술과디자인'],
    ['0', '교양과(서울)', '예술학과', '교선', '예술과디자인', '002056-2', '미술의이해\n(COMPREHENSION OF ART)', 'C807', '3', '10/20/30/40/50', '47', '20', '공학', '손수연', '화789', '미술대 수강불가 ', '공통교양\n(서울)', '예술과디자인']]

function pushClassData(textData) {
    var a = document.createElement("div");
    a.innerHTML = '<div class="result">' +
        '<div class="subject"><strong>' + textData[6] + '</strong></div>' +
        '<div class="nameTime">' + textData[13] + ' ' + textData[14] + '</div> ' +
        '<div class="detail">' + textData[0] + '학년 ' + textData[3] + ' ' + textData[8] + '학점 ' + textData[5] + '</div>' +
        '</div>';
    document.getElementById("resultBox").appendChild(a);
}

function displayTextList() {
    for (var i = 0; i < textList.length; i++) {
        pushClassData(textList[i]);
    }
}
*/


/*
function displaying_Data_to_TimeTable
var b = document.createElement("div");
b.innerHTML = '<div class="anotherTimeTable">' + '<div class="subject'
*/