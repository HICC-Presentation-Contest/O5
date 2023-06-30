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

    };

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

function timeTableRemover(){
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

function addClassToTimeTable(userTimeTable) {
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
    console.log(userTimeTable);
    for (let i = 0; i < userTimeTable.length; i++) {
        className = userTimeTable[i][0];
        timeList = userTimeTable[i][1].split("_"); // 월2 화2 수2 이렇게 쪼개진다.
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
        $(innerList).attr('id',timeTableNameList[i]);
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
    $(innerList).attr('onclick', 'remakeTimeTableNameList()'); //리스트 추가하는 함수 설정
    $(innerList).css('text-align', 'center');
    $('#timeTableNameList').append(innerList);
    $('#selectedTimeTableName').html(timeTableNameList[0]);
    addClassToTimeTable(TimeTableClass[timeTableNameList[0]]);

}
//새 리스트를 html에 추가
function remakeTimeTableNameList(){
    appendUserTimeTable(userTimeTable[1]);
    basicUserInformation(userTimeTable[1]);
}



// 시간표 이름 체크리스트
basicTimeTableNameCheck = {};
for (let i = 0;i < 100; i++){
    basicTimeTableNameCheck['기본시간표' + i.toString()] = false;
}

// 시간표이름 리스트에 새 항목 추가
function appendUserTimeTable(userTimeTable) {

    // for (let i = 0; i < userTimeTable[1].length; i++) {
    //     // console.log(userTimeTable[1][i][0]);
    //     // console.log(/기본시간표[0-99]/g.test(userTimeTable[1][i][0]));
    //     if (/기본시간표[0-99]/g.test(userTimeTable[1][i][0])) {
    //         basicTimeTableNameCheck[userTimeTable[1][i][0]] = true;
    //     }
    // }
    for (let key in userTimeTable){
        if (/기본시간표[0-99]/g.test(key)) {
            basicTimeTableNameCheck[key] = true;
        }
    }

    console.log(basicTimeTableNameCheck);
    for(let key in basicTimeTableNameCheck){
        if(basicTimeTableNameCheck[key] == false){
            userTimeTable[key] = [];
            console.log(userTimeTable);
            return
        }

    }

}

function timeTableNameClick(event){
    let myTimeTable = TimeTableClass[event.innerHTML];
    $('#myTimeTableName').html(event.innerHTML); // 시간표 이름 변경
    $('#selectedTimeTableName').html(event.innerHTML);
    if(myTimeTable != []){
        addClassToTimeTable(myTimeTable);
    }
}




let userTimeTable =
    ['abc',
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
            ]

        }]




function sendingUserTimeTable() {
    $.ajax({
        url: 'sendingUserTimeTable',
        type: 'POST',
        traditional: true, // 배열 넘기기 옵션
        data: {
            'user_time_table': userTimeTable,
            'csrfmiddlewaretoken': csrftoken,
        },
        datatype: 'json',
        beforeSend: function (request) {
            // Performed before calling Ajax
            $("#mySpinner").show();

        },
        success: function (data) {
            $("#mySpinner").hide();
            // textList = data;

        },

    });
}

function loadingUserTimeTable(){
        $.ajax({
        url: 'loadingUserTimeTable',
        type: 'POST',
        traditional: true, // 배열 넘기기 옵션
        datatype: 'json',
        beforeSend: function (request) {
            // Performed before calling Ajax
            $("#mySpinner").show();

        },
        success: function (data) {
            $("#mySpinner").hide();
            TimeTableClass = data;
            // basicUserInformation(TimeTableClass);
            // textList = data;

        },

    });
}

//시간표 이름 수정하는 함수
function clickReviseButton() {
    //이름 수정할 시간표의 숫자 입력
    // if (num <= 0)
    //     alert("올바른 숫자를 입력해주세요.")

    // else {       //입력된 숫자의 시간표 이름의 수정사항 입력받음
    // let buttonElements = $(".list-group")   // 여기서 오류 -> class명을 못 잡음
    // var existingtext = $("buttonElements[num]");
    console.log('g');
    let textPrompt = prompt('어떻게 수정하시겠습니까?');
    document.getElementById('selectedTimeTable').innerHTML = textPrompt;
    // // $("buttonElements[num]").text(textPrompt);
    // // }
}



/* 기본시간표로 지정하기 버튼을 누르면 왼쪽 div에 있는 시간표를 기본시간표로 지정하고
기본시간표1~ list-group class의 가장 상단으로 시간표 목록 올리는 함수
 */
// function assigningToBasicTimeTable(){
//
// $().html($('#myTimeTableName'));
//
// }
//
// $('#myTimeTableName').html(timeTableNameList[i]);
// $("#AssigningButton").click(assigningToBasicTimeTable);


window.onload = function () {
    // loadingUserTimeTable()
    basicUserInformation(TimeTableClass); // 리스트 칸, 정보칸, 왼쪽 시간표칸 기본 세팅

}