from django.urls import path
from . import views


urlpatterns = [
    path('', views.my_time_table_page, name='my_time_table_page'),
    path('makingNewTimeTable', views.making_new_time_table_page, name='making_new_time_table_page'),
    path('searchWordSubmit', views.search_word_submit, name='search_word_submit'),
    path('suggestedSearchWord', views.suggested_search_word, name='suggested_search_word'),
]