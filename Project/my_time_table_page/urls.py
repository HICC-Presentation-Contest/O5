from django.urls import path, include
from . import views

app_name = "timetable"

urlpatterns = [
    path('', views.my_time_table_page, name='my_time_table_page'),
    path('makingNewTimeTable', views.making_new_time_table_page, name='making_new_time_table_page'),
    path('searchWordSubmit', views.search_word_submit, name='search_word_submit'),
    path('suggestedSearchWord', views.suggested_search_word, name='suggested_search_word'),
    path('displayingNewTimeTable', views.displaying_new_time_table_page, name='displaying_new_time_table_page'),
    path('scrollspyHeading2', views.returning_to_mytimetable_page, name='returning_to_mytimetable_page'),
    path('sendingUserTimeTable', views.sending_user_time_table, name='sending_user_time_table'),
    path('loadingUserTimeTable', views.loading_user_time_table, name='loading_user_time_table'),
    path('accounts/', include("accounts.urls")),
    path('sendGroupList', views.send_group_list, name='send_group_list'),
    path('sendSortValue', views.send_sort_value, name='send_sort_value'),
]