from django.shortcuts import render, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from django.http import JsonResponse
from .models import User
from . import testdb
from django.views.decorators.csrf import csrf_exempt  # ajax POST 응답하기 위해 필요한 보안 토큰
# Create your views here.
def login_view(request):
    if request.method == "POST":
        username = request.POST["id"]
        password = request.POST["password"]
        user = authenticate(username=username, password=password)  # 인증확인 후 틀리면 None배출
        if user is not None:
            print("인증성공")
            login(request, user)
            return HttpResponseRedirect('/myTimeTable/') # urls 변경
            # return render(request, 'my_time_table_page/myTimeTable.html')
        else:
            print("인증실패")
    return render(request, "accounts/login.html")


def logout_view(request):
    logout(request)
    return redirect("accounts:login")

def signup_view(request):
    # print('communication: OK')
    if request.method == "POST":
        username = request.POST['id']
        # print(username)
        # userList = [username, {'기본시간표1' : []}, '기본시간표1'] # 이거 추가하고싶어
        password = request.POST['password1']
        email = request.POST['email']
        user = User.objects.create_user(username, email, password)
        user.save()
        return redirect("accounts:login")
    return render(request, "accounts/signup.html")


@csrf_exempt
def id_check(request):
    check_id = request.POST['id']
    print(check_id)
    check_value = testdb.certify_id(check_id)
    answer = {
        'checkValue': check_value
    }
    return JsonResponse(answer)