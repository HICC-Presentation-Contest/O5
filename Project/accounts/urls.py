from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path
# django.contrib.auth에 인증 체계가 모여있다.
urlpatterns = [
    path("login/", LoginView.as_view(template_name="accounts/login.html")), # 키가 template_name 값이 .html, 이걸로 로그인화면 출력하는데 사용
]

# 'login.html'이라는 문자열을 지정했으니 우리가 settings.py에서 TEMPLATE_DIRS에 지정한 템플릿 디렉터리 중 최상위 순위에 있는 login.html 파일을 찾아서 로그인 화면을 출력하는 데 사용합니다.