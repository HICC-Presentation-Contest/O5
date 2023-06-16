from django.urls import path
from . import views


urlpatterns = [
    path('', views.my_time_table_page, name='my_time_table_page'),
]123