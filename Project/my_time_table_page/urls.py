from django.urls import path
from . import views


urlpatterns = [
    path('', views.my_time_table_page, name='my_time_table_page'),
    path('makingNewTimeTable', views.making_new_time_table_page, name='making_new_time_table_page'),
    path('querySubmit', views.class_list_collect, name='class_list_collect'),
]