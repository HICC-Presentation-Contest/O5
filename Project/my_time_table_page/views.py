from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt  # ajax POST 응답하기 위해 필요한 보안 토큰
from django.http import JsonResponse
from . import testdb
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
    payment_data = []
    if request.method == 'POST':
        payment_data = json.loads(request.body)
    # user_time_table = request.POST['user_time_table']
    print('s')
    answer = {
        'none': []
    }

    return JsonResponse(answer)


def loading_user_time_table(request):

    user_time_table = request.POST['user_time_table']

    answer = {
        'none': []
    }

    return JsonResponse(answer)


# 검색창에 글자 적었을떄
@csrf_exempt
def suggested_search_word(request):
    search_word = request.POST['search_word']
    suggested_search_word_list = testdb.search_predictive(search_word)
    answer = {
        'suggested_search_word_list': suggested_search_word_list
    }
    return JsonResponse(answer)


# 검색 버튼을 눌렀을 떄
@csrf_exempt
def search_word_submit(request):
    search_word = request.POST['search_word']
    result_box_list = list(testdb.search(search_word, "-1", "-1", "-1", "-1"))

    answer = {
        'result_box_list': result_box_list
    }

    return JsonResponse(answer)


def send_group_list(request):
    if request.method == 'POST':
        # data는 2차원 리스트이며 각 안쪽 리스트는 각각의 그룹을 의미하며, 그 리스트 안에는 각 수업의 고유번호(db key값)이 들어있다
        data = json.loads(request.POST['group_list'])
        print(data)
    # 이 부분에 함수 돌려서 answer 값에 넣어준다.
    result_time_table = []
    answer = {
        'result_time_table': result_time_table,
    }

    return JsonResponse(answer)