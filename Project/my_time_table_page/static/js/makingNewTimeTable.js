
        // 그룹의 번호를 재할당하는 함수
        function sync_group_numbers() {
            var groups = document.getElementsByClassName('original');
            var remainingGroups = groups.length;

            // 각 그룹에 순차적인 번호 할당
            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                var groupNumber = i + 1;
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
            div.innerHTML = `
                <div class="preset" style="display:none">
                    <input type="text" name="test1" value="" style="width:100px">
                    <input type="button" value="삭제" onclick="remove_item(this)">
                </div>
                <div class="groupRow">
                    <p>그룹${groupNumber}</p>
                    <input type="button" value="과목추가" onclick="add_item(this.parentNode.parentNode)">
                    <input type="button" value="그룹 삭제" onclick="remove_group(this.parentNode.parentNode)">
                </div>
            `;
            field.appendChild(div);
        }


        //과목 추가 함수
        function add_item(parentNode) {
            var div = document.createElement('div');
            var preset = parentNode.querySelector('.preset');
            div.innerHTML = preset.innerHTML;
            parentNode.appendChild(div);
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

        //과목 삭제 함수
        function remove_item(obj) {
            obj.parentNode.parentNode.removeChild(obj.parentNode);
        }
    // 시간표 데이터
    var timetable = [
      { major: "대예이", time: "월23", year: 3, credit: 3 },
      { major: "컴프", time: "화13", year: 2, credit: 2 },
      { major: "대학물리", time: "월10", year: 4, credit: 4 },
      { major: "영어", time: "화09", year: 3, credit: 1 },
    ];

    function sortTimetable(sortKey) {
      timetable.sort(function(a, b) {
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
      timetable.forEach(function(course) {
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
