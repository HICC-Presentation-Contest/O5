from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path
from . import views
# django.contrib.auth에 인증 체계가 모여있다.

app_name = "accounts"

urlpatterns = [
    path("", views.login_view, name="login"),  # 로그인페이지
    path("login/", views.login_view, name="login"),  # 로그인페이지
    path("logout/", views.logout_view, name='logout'),  # 로그아웃페이지
    path("signup/", views.signup_view, name='signup'),  # 로그아웃페이지
    path('idCheck/', views.id_check, name='id_check'),
]

# 'login.html'이라는 문자열을 지정했으니 우리가 settings.py에서 TEMPLATE_DIRS에 지정한 템플릿 디렉터리 중 최상위 순위에 있는 login.html 파일을 찾아서 로그인 화면을 출력하는 데 사용합니다.