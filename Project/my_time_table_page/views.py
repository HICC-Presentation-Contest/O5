from django.shortcuts import render
from django.http import JsonResponse


def my_time_table_page(request):
    return render(request, 'my_time_table_page/myTimeTable.html', {})


def making_new_time_table_page(request):
    return render(request, 'my_time_table_page/makingNewTimeTable.html', {})


def class_list_collect(request):
    time_table_query = request.POST.get('time_table_query')
    a = [[0, 1], [2, 3]]
    context = {
        'class_list': a
    }
    return JsonResponse(context)
