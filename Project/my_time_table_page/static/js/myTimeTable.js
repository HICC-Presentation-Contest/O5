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
        "                <td id=\"timeTable_mon_1\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_tue_1\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_wed_1\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_thu_1\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_fri_1\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sat_1\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sun_1\" class='tableTd'></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">10:00 - 11:00</td>\n" +
        "                <td id=\"timeTable_mon_2\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_tue_2\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_wed_2\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_thu_2\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_fri_2\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sat_2\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sun_2\" class='tableTd'></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">11:00 - 12:00</td>\n" +
        "                <td id=\"timeTable_mon_3\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_tue_3\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_wed_3\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_thu_3\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_fri_3\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sat_3\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sun_3\" class='tableTd'></td>\n" +
        "            </tr>\n" +
        "\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">12:00 - 13:00</td>\n" +
        "                <td id=\"timeTable_mon_4\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_tue_4\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_wed_4\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_thu_4\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_fri_4\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sat_4\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sun_4\" class='tableTd'></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">13:00 - 14:00</td>\n" +
        "                <td id=\"timeTable_mon_5\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_tue_5\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_wed_5\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_thu_5\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_fri_5\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sat_5\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sun_5\" class='tableTd'></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">14:00 - 15:00</td>\n" +
        "                <td id=\"timeTable_mon_6\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_tue_6\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_wed_6\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_thu_6\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_fri_6\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sat_6\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sun_6\" class='tableTd'></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">15:00 - 16:00</td>\n" +
        "                <td id=\"timeTable_mon_7\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_tue_7\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_wed_7\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_thu_7\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_fri_7\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sat_7\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sun_7\" class='tableTd'></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">16:00 - 17:00</td>\n" +
        "                <td id=\"timeTable_mon_8\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_tue_8\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_wed_8\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_thu_8\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_fri_8\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sat_8\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sun_8\" class='tableTd'></td>\n" +
        "            </tr>\n" +
        "            <tr>\n" +
        "                <td class=\"myTimeTable_time display-5\">17:00 - 18:00</td>\n" +
        "                <td id=\"timeTable_mon_9\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_tue_9\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_wed_9\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_thu_9\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_fri_9\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sat_9\" class='tableTd'></td>\n" +
        "                <td id=\"timeTable_sun_9\" class='tableTd'></td>\n" +
        "            </tr>"
}



var TimeTableClass =
    {
        '기본시간표1': [
            ['스페인어', '월2,월3,월4'],
            ['컴퓨터구조', '화2,수2,목2'],
            ['컴퓨터네트워크', '수3,금23'],
            ['알고리즘분석', '화5,수5,목5'],
            ['프로그래밍언어론', '화9,금56']
        ],
        '기본시간표2': [
            ['스페인어', '토234'],
            ['컴퓨터구조', '화2,수2,목2'],
            ['컴퓨터네트워크', '수3,금23'],
            ['알고리즘분석', '화5,수5,목5'],
            ['프로그래밍언어론', '화9,금56']
        ],
        '기본시간표3': [
            ['스페인어', '일234'],
            ['컴퓨터구조', '화2,수2,목2'],
            ['컴퓨터네트워크', '수3,금23'],
            ['알고리즘분석', '화5,수5,목5'],
            ['프로그래밍언어론', '화9,금56']
        ],

    };
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
    // console.log(userTimeTable);
    for (let i = 0; i < userTimeTable.length; i++) {
        className = userTimeTable[i][0];
        timeList = userTimeTable[i][1].split(","); // 월2 화2 수2 이렇게 쪼개진다.
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



// 딕셔너리를 받아서 개인 시간표 세팅하기, 리스트, 왼쪽시간표
function basicUserInformation(TimeTableClass) { // 매개변수는 usertimetable의 두번째 원소
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
    // 시간표 내용있을떄만 실행
    if(TimeTableClass[timeTableNameList[0]] != []){
        addClassToTimeTable(TimeTableClass[timeTableNameList[0]]);
    }

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


    for (let key in userTimeTable){
        if (/기본시간표[0-99]/g.test(key)) {
            basicTimeTableNameCheck[key] = true;
        }
    }

    // console.log(basicTimeTableNameCheck);
    for(let key in basicTimeTableNameCheck){
        if(basicTimeTableNameCheck[key] == false){
            userTimeTable[key] = [];
            // console.log(userTimeTable);
            return
        }

    }

}

function timeTableNameClick(event){
    let myTimeTable = userTimeTable[1][event.innerHTML];
    $('#myTimeTableName').html(event.innerHTML); // 시간표 이름 변경
    $('#selectedTimeTableName').html(event.innerHTML);
    // console.log(myTimeTable);
    if(myTimeTable != []){
        addClassToTimeTable(myTimeTable);
    }
}




let userTimeTable =
    ['abc',
        {
            '기본시간표1': [
                ['스페인어', '월234'],
                ['컴퓨터구조', '화2,수2,목2'],
                ['컴퓨터네트워크', '수3,금23'],
                ['알고리즘분석', '화5,수5,목5'],
                ['프로그래밍언어론', '화9,금56']
            ],
            '기본시간표2': [
                ['스페인어', '토234'],
                ['컴퓨터구조', '화2,수2,목2'],
                ['컴퓨터네트워크', '수3,금23'],
                ['알고리즘분석', '화5,수5,목5'],
                ['프로그래밍언어론', '화9,금56']
            ],
            '기본시간표3': [
                ['스페인어', '일234'],
                ['컴퓨터구조', '화2,수2,목2'],
                ['컴퓨터네트워크', '수3,금23'],
                ['알고리즘분석', '화5,수5,목5'],
                ['프로그래밍언어론', '화9,금56']
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
    clickRevise();
    console.log(userTimeTable[1]);

    basicUserInformation(userTimeTable[1]); // 리스트 칸, 정보칸, 왼쪽 시간표칸 기본 세팅
}

function clickRevise() {
    //이름 수정할 시간표의 숫자 입력
    // if (num <= 0)
    //     alert("올바른 숫자를 입력해주세요.")

    // else {       //입력된 숫자의 시간표 이름의 수정사항 입력받음
    // let buttonElements = $(".list-group")   // 여기서 오류 -> class명을 못 잡음
    // var existingtext = $("buttonElements[num]");
    let textPrompt = prompt('어떻게 수정하시겠습니까?');
    let name = document.getElementById('selectedTimeTableName').innerHTML;
    userTimeTable[1][textPrompt] = userTimeTable[1][name];
    delete userTimeTable[1][name];
    // document.getElementById('selectedTimeTableName').innerHTML = textPrompt;
    // // $("buttonElements[num]").text(textPrompt);
    // // }
}

function deleteTimeTableList(){
    if(!confirm('삭제하시면 복구할수 없습니다. \n 정말로 삭제하시겠습니까??')){
        return false;
    }
    let name = $('#selectedTimeTableName').html();
    delete (userTimeTable[1])[name];
    basicUserInformation(userTimeTable[1]);
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


function appendClassToNowTimeTable(){
    $('#rightBox').css('display', 'none');
    $('#rightBox1').css('display', 'block');
    $('#leftBox').css('width','50%');

}

window.onload = function () {
    // loadingUserTimeTable()
    basicUserInformation(userTimeTable[1]); // 리스트 칸, 정보칸, 왼쪽 시간표칸 기본 세팅

}



//자동완성
// 검색창 입력 문자 확인
let nowKeyboardCode = 0;
$('#autoInput').bind('keydown', function (e) {
    nowKeyboardCode = e.keyCode;

})

//##자동완성
// autocomplete 부분을 생성
let autocomplete = (function () {

    let _inp = null;

    let _arr = [];

    let _currentFocus;

    let _setAutocomplete = function (inp, arr) {
        // autocomplete할 배열
        _arr = arr;


        // 기존의 input 값과 같지 않다면, 리스너 해제
        if (_inp === inp) {
            return;
        }

        // 기존 리스너해제
        _removeListener();

        // 새로운 input 의 리스너 추가.
        _inp = inp;
    }

    let inputEvent = function (keyCord) {
        //화살표 및 엔터면 출력된 자동완성 초기화 안한다
        if (keyCord == 40 || keyCord == 38 || keyCord == 13) {
            return false;
        }
        var a, b, i, val = _inp.value;//a,b,i는 지정되지않고 val만 입력값으로 저장
        // 이전 생성된 div 제거
        closeAllLists();

        // 요소 확인
        if (!val) {
            return false;
        }

        // 현재의 포커스의 위치는 없음.
        _currentFocus = -1;

        // autocomplet에서 항목을 보여줄 div 생성하고 이를 a에 준다.
        a = document.createElement("DIV");
        //
        a.setAttribute("id", _inp.id + "autocomplete-list");//속성주기
        // css 적용
        a.setAttribute("class", "autocomplete-items");

        // input 아래의 div 붙이기.
        _inp.parentNode.appendChild(a);

        // autocomplet할 요소 찾기
        for (i = 0; i < _arr.length; i++) {
            // 배열의 요소를 현재 input의 value의 값만큼 자른 후, 같으면 추가한다.

            b = document.createElement("DIV");
            // value의 값 만큼 굵게 표시
            b.innerHTML = "<strong>" + _arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += _arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + _arr[i] + "'>";

            // 생성된 div에서 이벤트 발생시 hidden으로 생성된 input안의 value의 값을 autocomplete할 요소에 넣기
            b.addEventListener("click", function (e) {
                if (_inp == document.getElementById('autoInput')) {
                    boolDepartureCheck = true;
                } else {
                    boolDestinationCheck = true;
                }
                _inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });

            // autocomplete 리스트를 붙이기.
            a.appendChild(b);

        }
    }
    let lastkeyCord = 40;

    let keydownEvent = function (keyCord) {
        var x = document.getElementById(_inp.id + "autocomplete-list");
        // 선택할 요소 없으면 null ,
        if (x) {
            // 태그 네임을 가지는 엘리먼트의 유요한 html 컬렉션을 반환.
            // div의 값을 htmlCollection의 값으로 받아옴.
            x = x.getElementsByTagName("div");
        }

        if (keyCord == 40) {
            // down
            // 현재위치 증가
            _currentFocus++;
            // 현재위치의 포커스 나타내기
            addActive(x, keyCord, lastkeyCord);
        } else if (keyCord == 38) {
            // up
            // 현재위치 감소
            _currentFocus--;
            // 현재위치의 포커스 나타내기
            addActive(x, keyCord, lastkeyCord);
        } else if (keyCord == 13) {
            // enter
            if (_inp == document.getElementById('autoInput')) {
                for (let list in $('#autoInput1autocomplete-list div')) {
                    if (list.html == _inp.innerHTML) {
                        boolDepartureCheck = true;
                    }
                }

            } else {
                for (let list in $('#autoInputautocomplete-list div')) {
                    if (list.html == _inp.innerHTML) {
                        boolDestinationCheck = true;
                    }
                }

            }
            // keyCord.preventDefault();
            // 현재위치가 아이템 선택창내에 있는 경우
            if (_currentFocus > -1) {
                // 현재 위치의 값 클릭
                if (x) x[_currentFocus].click();
            }
        }
        lastkeyCord = keyCord;
    }
    //바깥 클릭하면 자동완성 사라짐
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });


    let addActive = function (x, keyCode, lastkeyCord) {
        let now_keyCode = keyCode;
        let last_keyCode = lastkeyCord
        if (!x) return false;
        removeActive(x);
        if (_currentFocus >= x.length) _currentFocus = 0;
        if (_currentFocus < 0) _currentFocus = (x.length - 1);
        x[_currentFocus].classList.add("autocomplete-active");
        // 키다운이벤트 따라가기

        if (last_keyCode != now_keyCode && _currentFocus % 6 == 5) {
            $('.autocomplete-items').scrollTop((_currentFocus - 5) * 28);
        }

        if (_currentFocus % 6 == 0 && now_keyCode == 40) {
            $('.autocomplete-items').scrollTop(_currentFocus * 28);
        } else if (_currentFocus % 6 == 0 && now_keyCode == 38) {
            $('.autocomplete-items').scrollTop((_currentFocus - 5) * 28);
        }

    }


    let removeActive = function (x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }


    let closeAllLists = function (elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != _inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }


    let _removeListener = function () {
        if (_inp !== null) {
            // console.log(_inp)
            _inp.removeEventListener("keyup", inputEvent, false);
            _inp.removeEventListener("keydown", keydownEvent, false);
        }
    }
    return {

        setAutocomplete: function (inp, arr) {
            _setAutocomplete(inp, arr);
        },
        inputEvent: function (keyCode) {
            inputEvent(keyCode);
        },
        keydownEvent: function (keyCode) {
            keydownEvent(keyCode);
        }
    }

})();

let receivedList = [];

function suggestedSearchWord(inp) { //inp는 input객체
    $.ajax({
        url: 'suggestedSearchWord',
        type: 'POST',
        data: {
            'search_word': inp.value.toUpperCase(), //대문자 변환해서 소문자도 검색가능
            'csrfmiddlewaretoken': csrftoken,
        },
        datatype: 'json',
        success: function (data) {
            receivedList = data['suggested_search_word_list'];
            // console.log(receivedList);
            if(receivedList != null){
                autocomplete.setAutocomplete(inp, receivedList); //autocomplete함수를 input객체를 받아 실행
                autocomplete.inputEvent(nowKeyboardCode);
                autocomplete.keydownEvent(nowKeyboardCode);

            }

        }
    });
}


// 사용자가 검색버튼을 눌렀을떄
function searchWordSubmit() {
    //submit될 때 페이지 리로드 방지
    //event.preventDefault();
    var searchWord = document.getElementById("autoInput").value;

    //출발지 도착지형식이 참이면 백으로 출발지 도착지 보내기

    //결과경로창 보이게끔

    $.ajax({
        url: 'searchWordSubmit',
        type: 'POST',
        // data부분은 딕셔너리로 넘겨준다
        data: {
            'search_word': searchWord,
            'csrfmiddlewaretoken': csrftoken,
        },
        datatype: 'json',
        beforeSend: function (request) {
            // Performed before calling Ajax
            $("#mySpinner").show();

        },
        success: function (data) {

            $("#mySpinner").hide();
            textList = data.result_box_list;
            displayTextList()
        },

    });

}



// resultBox에 요소 넣기
var textList = [['0', '교양과(서울)', '예술학과', '교선', '예술과디자인', '002056-1', '미술의이해\n(COMPREHENSION OF ART)', 'C506', '3', '10/20/30/40/50', '55', '20', '비공학', '전영백', '화789', '미술대 수강불가/강의요원 여서영 ', '공통교양\n(서울)', '예술과디자인'],
    ['0', '교양과(서울)', '예술학과', '교선', '예술과디자인', '002056-2', '미술의이해\n(COMPREHENSION OF ART)', 'C807', '3', '10/20/30/40/50', '47', '20', '공학', '손수연', '화789', '미술대 수강불가 ', '공통교양\n(서울)', '예술과디자인']]

function pushClassData(textData) {
    var a = document.createElement("div");
    a.innerHTML = '<div class="result" onclick="classNameClick(this)">' +
        '<div class="subject"><strong>' + textData[7] + '</strong></div>' +
        '<div class="nameTime">' + textData[14] + ' ' + textData[15] + '</div> ' +
        '<div class="detail">' + textData[1] + '학년 ' + textData[4] + ' ' + textData[9] + '학점 ' + textData[6] +'</div>' +
        '<div class = "classIdentityNumber" style="display: none">' + textData[0] + '</div>' +
        '<div class = "classTime" style="display: none">' + textData[15] + '</div>' + '</div>';
    document.getElementById("resultBox").appendChild(a);
}

function displayTextList() {
    if(document.getElementById("resultBox").length != 0) {
        document.getElementById('resultBox').replaceChildren();
    }
    for (var i = 0; i < textList.length; i++) {
        pushClassData(textList[i]);
    }
}

// result div hover 일떄 시간표 표시

// 음영처리하는 함수
function classNameClick(event){
    $('.tableTd').css('background-color', 'white');
    $('.result').css('background-color', 'white'); // 전체 색 하얀색으로
    $(event).css('background-color', 'lightgray'); // 클릭한것만 음영효과
    let classTime = $(event).children('.classTime');
    shadingTimeTable(classTime[0].innerHTML);
}
function shadingTimeTable(classTime) {
    // 수업의 요일
    let day = '';
    // 수업의 요일의 시간
    let timeOfDay = '';
    // html에 넣을 id
    let id = '';
    // timeTableClass 각 수업마다, 이름, 시간으로 쪼갠다.
    // console.log(userTimeTable);

    timeList = classTime.split(","); // 월2 화2 수2 이렇게 쪼개진다.
    for (let j = 0; j < timeList.length; j++)
    {
        day = KorToEngOfDay(timeList[j].substr(0, 1)); // 월234에서 월 가져온다.
        timeOfDay = timeList[j].substring(1); // 2,3,4 가져온다.
        for (let k = 0; k < timeOfDay.length; k++) {
            id = "#timeTable_" + day + "_" + timeOfDay.substr(k, 1);
            $(id).css('background-color', 'lightgray');
        }

    }


}