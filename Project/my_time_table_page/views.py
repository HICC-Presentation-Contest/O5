from django.shortcuts import render


def my_time_table_page(request):
    return render(request, 'my_time_table_page/myTimeTable.html', {})
