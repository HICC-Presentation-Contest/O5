from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt # ajax POST 응답하기 위해 필요한 보안 토큰
from django.http import JsonResponse
from . import testdb

# return render(request, '이동할_html_화면.html, 추가적으로_보내줄_정보가_있다면_여기에_딕트_추가) 이게 기본형식, 세번째인자는 딕셔너리로 전달
# jsonresponse는 ajax에 대한 응답
def my_time_table_page(request):
    return render(request, 'my_time_table_page/myTimeTable.html', {})


def making_new_time_table_page(request):
    return render(request, 'my_time_table_page/makingNewTimeTable.html', {})


def displaying_new_time_table_page(request):
    return render(request, 'my_time_table_page/displayingNewTimeTable.html', {})


# 검색창에 글자 적었을떄
@csrf_exempt
def suggested_search_word(request):
    search_word = request.POST['search_word']
    suggested_search_word_list = []
    answer = {
        'suggested_search_word_list': suggested_search_word_list
    }
    return JsonResponse(answer)


# 검색 버튼을 눌렀을 떄
@csrf_exempt
def search_word_submit(request):
    search_word = request.POST['search_word']
    result_box_list = testdb.search(search_word,"-1","-1","-1","-1")
    answer = {
        'result_box_list': result_box_list
    }
    return JsonResponse(answer)
