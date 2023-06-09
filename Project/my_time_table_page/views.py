from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt  # ajax POST 응답하기 위해 필요한 보안 토큰
from django.http import JsonResponse
from . import testdb
from . import timetable_algorithm
from . import sort_empty_day
from . import sort_lunch_time
from . import fillter_timetable
import json


# return render(request, '이동할_html_화면.html, 추가적으로_보내줄_정보가_있다면_여기에_딕트_추가) 이게 기본형식, 세번째인자는 딕셔너리로 전달
# jsonresponse는 ajax에 대한 응답
def my_time_table_page(request):
    return render(request, 'my_time_table_page/myTimeTable.html', {})


def making_new_time_table_page(request):
    return render(request, 'my_time_table_page/makingNewTimeTable.html', {})


def displaying_new_time_table_page(request):
    return render(request, 'my_time_table_page/displayingNewTimeTable.html', {})


def returning_to_mytimetable_page(request):
    return render(request, 'my_time_table_page/myTimeTable.html', {})


def sending_user_time_table(request):
    data = []
    if request.method == 'POST':
        # data는 2차원 리스트이며 각 안쪽 리스트는 각각의 그룹을 의미하며, 그 리스트 안에는 각 수업의 고유번호(db key값)이 들어있다
        data = json.loads(request.POST['user_time_table'])
    user_id = data[0]  # inserted_data는 DB에 넣기위해 정제된 데이터
    print(data)
    testdb.drop_group_table(user_id)
    for i in data[1]:
        for j in range(len(data[1][i])):
            inserted_data = []
            inserted_data.append(user_id)
            inserted_data.append(i)
            inserted_data.append(data[1][i][j][2])
            if i == data[2]:
                inserted_data.append(True)
            else:
                inserted_data.append(False)
            testdb.insert_into_group_table(inserted_data[0], inserted_data[1], inserted_data[2], inserted_data[3])
            # inserted_data는 [id, 시간표 이름, 과목 index, 기본시간표인지 여부]

    answer = {
        'none': []
    }

    return JsonResponse(answer)


def loading_user_time_table(request):
    userID = request.POST['userID']
    data_list = testdb.search_group_table(userID)  # db에서 유저 id에 따른 data 추출
    print(data_list)
    userList = []

    answer = {
        'userTimeTable': data_list
    }

    return JsonResponse(answer)


# 검색창에 글자 적었을떄
@csrf_exempt
def suggested_search_word(request):
    search_word = request.POST['search_word']
    if search_word != "":
        suggested_search_word_list = testdb.search_subject_predictive(search_word)
    else:
        suggested_search_word_list = []
    answer = {
        'suggested_search_word_list': suggested_search_word_list
    }
    return JsonResponse(answer)


# 검색 버튼을 눌렀을 떄
@csrf_exempt
def search_word_submit(request):
    search_word = request.POST['search_word']
    result_box_list = list(testdb.search_subject(search_word, -1, "-1", "-1", "-1", "-1", "-1", "-1"))
    print(result_box_list)
    tmp = []
    for i in result_box_list:
        tmp_inner_list = list(i)
        # i = (1281, '3', '컴퓨터공학전공', '컴퓨터공학전공', '전선', 'None_field', '101413-2', 'HCI윈도우즈프로그래밍 (HCI WINDOWS PROGRAMMING)', 'T0605,T0602', '3', '10/50/50/50/50', '39', '10', '전체', '이혜영1', '수7,금5,금6', ' ', '공과대학', '컴퓨터·데이터공학부')
        class_list = []
        class_index = 0
        day = ' '
        if i[15] == '':
            tmp.append(tmp_inner_list)
            continue
        for k in i[15].split(','):

            myclass = i[8].split(',')
            if day == ' ':
                day = k[0]
            if k[0] != day:
                class_index += 1
                day = k[0]
            class_list.append(myclass[class_index])
        tmp_inner_list[8] = class_list
        tmp.append(tmp_inner_list)
    result_box_list = tmp

    answer = {
        'result_box_list': result_box_list
    }

    return JsonResponse(answer)


def send_group_list(request):
    if request.method == 'POST':
        # data는 2차원 리스트이며 각 안쪽 리스트는 각각의 그룹을 의미하며, 그 리스트 안에는 각 수업의 고유번호(db key값)이 들어있다
        data = json.loads(request.POST['group_list'])
        print(data)
    all_groups = []
    sort_all_groups = []
    for i in range(len(data)):
        tmp_list = []
        for j in range(len(data[i])):
            tmp = [(testdb.search_subject("-1", data[i][j], "-1", "-1", "-1", "-1", "-1", "-1"))]
            tmp_list.append(tmp)
        all_groups.append(tmp_list)
    sort_all_groups += (timetable_algorithm.sort_groups(all_groups))
    result_time_table, result_time_table_list = timetable_algorithm.generate_possible_combinations(sort_all_groups)
    answer = {
        'resultTimeTable': result_time_table,
        'resultTimeTableList': result_time_table_list,
    }
    return JsonResponse(answer)


def send_sort_value(request):
    # 정렬값, 리스트 형식으로 ['lunchTime', 'emptyDay', 'morningLectureMain', 'afternoonLectureMain'] 중 체크된것만 들어있다.
    sort_value_list = []
    result_time_table_list = []
    week_day_list = []
    result_time_table = []

    if request.method == 'POST':
        sort_value_list = json.loads(request.POST['sortValueList'])
        week_day_list = json.loads(request.POST['weekDayList'])  # 공강일 ['월', '화'] 이렇게 들어온다. ,만약 공강일 설정 안되어있으면 빈리스트가 간다.
        result_time_table_list = json.loads(request.POST['resultTimeTableWithTF'])
    for i in sort_value_list:
        if i == 'lunchTime':
            tmp = sort_lunch_time.sort_free_list(result_time_table_list)
        if i == 'emptyDay':
            tmp = sort_empty_day.empty_Day(result_time_table_list, week_day_list)
        if i == 'morningLectureMain':
            tmp, _ = fillter_timetable.filter_time_table(result_time_table_list)
        if i == 'afternoonLectureMain':
            _, tmp = fillter_timetable.filter_time_table(result_time_table_list)
    if sort_value_list == []:
        tmp = result_time_table_list

    for empty_slots, combination in tmp:
        result_time_table.append(combination)
    print(result_time_table)
    answer = {
        'resultTimeTable': result_time_table,
        'resultTimeTableList': result_time_table_list,
    }
    return JsonResponse(answer)

def subject_categorization(request):
    # 학부, 전공, 학년으로 분류 ex) 공통교양, 역사와 미술, 3학년
    if request.method == 'POST':
        select_field1 = json.loads(request.POST['field1'])
        select_field2 = json.loads(request.POST['field2'])
        grade = json.loads(request.POST['grade'])
    data = testdb.search_subject("-1", grade, "-1", "-1", "-1", "-1", select_field1, select_field2)

    answer = {
        'categorization_subject_list': data
    }
    return JsonResponse(answer)

def sending_field_value(request):
    field_value_list = [];
    if request.method == 'POST':
        field_value_list = json.loads(request.POST['fieldValueList'])
    print(field_value_list)
    my_list = ['-1', '-1', '-1'] # 리스트 세팅
    for i in range(len(field_value_list)):
        my_list[i] = field_value_list[i]

    select_field1 = my_list[0]
    select_field2 = my_list[1]
    grade = my_list[2]
    print(select_field1)
    print(select_field2)
    print(grade)
    data = list(testdb.search_subject("-1", -1, "-1", grade, "-1", "-1", select_field1, select_field2))
    tmp = []
    for i in data:
        tmp_inner_list=list(i)
        # i = (1281, '3', '컴퓨터공학전공', '컴퓨터공학전공', '전선', 'None_field', '101413-2', 'HCI윈도우즈프로그래밍 (HCI WINDOWS PROGRAMMING)', 'T0605,T0602', '3', '10/50/50/50/50', '39', '10', '전체', '이혜영1', '수7,금5,금6', ' ', '공과대학', '컴퓨터·데이터공학부')
        class_list = []
        class_index = 0
        day = ' '
        if i[15] == '':
            tmp.append(tmp_inner_list)
            continue
        for k in i[15].split(','):

            myclass = i[8].split(',')
            if day == ' ':
                day = k[0]
            if k[0] != day:
                class_index += 1
                day = k[0]
            class_list.append(myclass[class_index])
        tmp_inner_list[8] = class_list
        tmp.append(tmp_inner_list)
    data = tmp
    answer = {
        'result_box_list': data
    }
    return JsonResponse(answer)



