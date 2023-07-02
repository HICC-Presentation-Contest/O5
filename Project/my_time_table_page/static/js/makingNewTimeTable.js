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


// 그룹의 번호를 재할당하는 함수
function sync_group_numbers() {
    var groups = document.getElementsByClassName('original');
    var remainingGroups = groups.length;

    // 각 그룹에 순차적인 번호 할당
    for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        var groupNumber = i + 1;
        group.setAttribute('id', 'original' + groupNumber);
        group.setAttribute('data-group', groupNumber);
        group.querySelector('p').innerText = "그룹" + groupNumber;
    }

    return remainingGroups;
}

// 그룹을 추가하는 함수
function add_group() {
    var field = document.getElementById('field');
    var groupNumber = sync_group_numbers() + 1;        //그룹의 수 1증가

    if (groupNumber > 10) { // 최대 10개까지 추가 가능
        alert("그룹은 최대 10개까지 추가할 수 있습니다.");
        return;
    }

    // 새로운 그룹내의 과목 추가
    var div = document.createElement('div');
    div.className = 'original';
    div.setAttribute('data-group', groupNumber);
    div.setAttribute('id', 'original' + groupNumber);
    div.innerHTML = `
<!--        <div class="preset" style="display:none">-->
<!--             <input type="text" name="test1" value="" style="width:100px">-->
<!--             <button type="button" id="btn" class="btn btn-dark btn-sm" onclick="remove_item(this)">X</button>-->
<!--             </div>-->
        <div class="groupRow">
             <p>그룹${groupNumber}</p>
             <button type="button" id="btn" class="btn btn-dark" onclick="add_item(this)">과목추가</button>
             <button type="button" id="btn" class="btn btn-dark" onclick="remove_group(this.parentNode.parentNode)">그룹삭제</button>
        </div>
    `;
    field.appendChild(div);
}


// //과목 추가 함수
// function add_item(parentNode) {
//     var div = document.createElement('div');
//     var preset = parentNode.querySelector('.preset');
//     div.innerHTML = preset.innerHTML;
//     parentNode.appendChild(div);
// }

//과목 추가 함수
let clickedGroup = 0;
function add_item(event){
    $('.original').css('background-color', 'white');
    let groupDiv = event.parentNode.parentNode;
    clickedGroup = $(groupDiv).attr('data-group');
    $(groupDiv).css('background-color', 'lightgray');
}




//그룹 삭제 함수
function remove_group(group) {
    var remainingGroups = sync_group_numbers();

    // 그룹의 수가 2개 이하인 경우 삭제 불가능함
    if (remainingGroups <= 2) {
        alert("시간표를 만들기 위해 2개 이상의 그룹이 필요합니다.");
    } else {
        var groupNumber = parseInt(group.getAttribute('data-group'));
        group.parentNode.removeChild(group);

        // 그룹 삭제 후 남은 그룹의 번호 재할당
        sync_group_numbers();
    }
}

// //과목 삭제 함수
// function remove_item(obj) {
//     obj.parentNode.parentNode.removeChild(obj.parentNode);
// }

// 시간표 데이터
var timetable = [
    {major: "대예이", time: "월23", year: 3, credit: 3},
    {major: "컴프", time: "화13", year: 2, credit: 2},
    {major: "대학물리", time: "월10", year: 4, credit: 4},
    {major: "영어", time: "화09", year: 3, credit: 1},
];

function sortTimetable(sortKey) {
    timetable.sort(function (a, b) {
        if (sortKey === "time") {
            // 시간에 대한 정렬
            var dayA = a.time.substr(0, 2);
            var dayB = b.time.substr(0, 2);
            var hourA = parseInt(a.time.substr(2));
            var hourB = parseInt(b.time.substr(2));

            if (dayA !== dayB) {
                // 요일이 다른 경우
                var days = ["월", "화", "수", "목", "금"];
                return days.indexOf(dayA) - days.indexOf(dayB);
            } else {
                // 요일이 같은 경우
                return hourA - hourB;
            }
        } else {
            // 다른 키에 대한 정렬
            return a[sortKey] > b[sortKey] ? 1 : -1;
        }
    });

    displayTimetable();
}

function displayTimetable() {
    var table = document.getElementById("timetable");

    // 기존 테이블 내용 삭제
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    // 정렬된 시간표 출력
    timetable.forEach(function (course) {
        var row = document.createElement("tr");

        // 과목
        var majorCell = document.createElement("td");
        majorCell.textContent = course.major;
        row.appendChild(majorCell);

        // 시간
        var timeCell = document.createElement("td");
        timeCell.textContent = course.time;
        row.appendChild(timeCell);

        // 학년
        var yearCell = document.createElement("td");
        yearCell.textContent = course.year;
        row.appendChild(yearCell);

        // 학점
        var creditCell = document.createElement("td");
        creditCell.textContent = course.credit;
        row.appendChild(creditCell);

        table.appendChild(row);
    });
}

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


// resultBox에 요소 넣기
var textList = [['0', '교양과(서울)', '예술학과', '교선', '예술과디자인', '002056-1', '미술의이해\n(COMPREHENSION OF ART)', 'C506', '3', '10/20/30/40/50', '55', '20', '비공학', '전영백', '화789', '미술대 수강불가/강의요원 여서영 ', '공통교양\n(서울)', '예술과디자인'],
    ['0', '교양과(서울)', '예술학과', '교선', '예술과디자인', '002056-2', '미술의이해\n(COMPREHENSION OF ART)', 'C807', '3', '10/20/30/40/50', '47', '20', '공학', '손수연', '화789', '미술대 수강불가 ', '공통교양\n(서울)', '예술과디자인']]

function pushClassData(textData) {
    var a = document.createElement("div");
    a.innerHTML = '<div class="result" onclick="passOverData(this)">' +
        '<div class="subject"><strong>' + textData[7] + '</strong></div>' +
        '<div class="nameTime">' + textData[14] + ' ' + textData[15] + '</div> ' +
        '<div class="detail">' + textData[1] + '학년 ' + textData[4] + ' ' + textData[9] + '학점 ' + textData[6] +'</div>' +
        '<div class = "classIdentityNumber" style="display: none">' + textData[0] + '</div>' + '</div>';
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

// 왼쪽 그룹으로 데이터 넘기기
function passOverData(event){ // event는 클릭한 객체
    let detailHtml = $(event).children('.detail'); // 이 객체의 detail파트는 고유하므로 이걸로 중복체크

    if (duplicateClassCheck(detailHtml[0].innerText)){
        let my_div = document.createElement('div');
        $(my_div).attr('class', 'classInOriginal');
        my_div.innerHTML = event.innerHTML;
        // console.log('#original' + clickedGroup.toString());
        $('#original' + clickedGroup.toString()).append(my_div);
    }
}


// 그룹 안 수업 중복 체크 함수 중복되면 false, 중복아니면 true 리턴 x로는 고유번호가 포함된 html을 받는다.
function duplicateClassCheck(x){
    let clickedGroupDiv = document.getElementById('original' + clickedGroup);
    let childrenElement = $(clickedGroupDiv).find('.classInOriginal');
    for(let i = 0; i < childrenElement.length; i++){
        if ($(childrenElement[i]).children('.detail').html() == x){
            return false;

        }
    }
    return true;
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

let sendingGroupList = [];
function appendingGroupList(){
    let groupList = $('#field').children('.original'); // group리스트는 그룹1, 그룹2등등
    for (let i = 0; i < groupList.length; i++){ // 그룹별로 for문 돌린다.
        let groupClassList = $(groupList[i]).children('.classInOriginal');
        // 그룹안에 시간이 없을경우 continue
        if (groupClassList.length == 0){
            continue
        }
        // 시간이 있으면 고유번호를 리스트에 추가해준다.
        let innerGroupList = []; //고유번호가 들어가는 임시리스트
        for (let j = 0; j < groupClassList.length; j++){
            let classIdentityNumber = $(groupClassList[j]).children('.classIdentityNumber');
            innerGroupList.push(classIdentityNumber[0].innerHTML); //수업 고유번호를 리스트에 추가
        }
        sendingGroupList.push(innerGroupList);

    }
    console.log(sendingGroupList);
    sendGroupListToBack(sendingGroupList);
}

function sendGroupListToBack(sendingGroupList){
    // sendingGroupList = [[1,2],[3,4]];
    // sendingGroupList = {'아기': '돼지', '삼': '형제'};
    if (sendingGroupList.length == 0){
        alert('그룹이 비었습니다.');
        return;
    }

    console.log(sendingGroupList);
    $.ajax({
        url: 'sendGroupList',
        type: 'POST',
        // data부분은 딕셔너리로 넘겨준다
        // traditional: true, // 배열전달하기위한 조건
        data: {
            'group_list': JSON.stringify(sendingGroupList),
            'csrfmiddlewaretoken': csrftoken,
        },
        datatype: 'json',
        beforeSend: function (request) {
            // Performed before calling Ajax
            $("#mySpinner").show();

        },
        success: function (data) {
            let resultTimeTable = data.result_time_table;
            $("#mySpinner").hide();
            localStorage.setItem('resultTimeTable', resultTimeTable);
            location.replace('displayingNewTimeTable');
        },

    });
}


function groupCheck() {
    document.getElementById("searchButton").disabled = true;
}

