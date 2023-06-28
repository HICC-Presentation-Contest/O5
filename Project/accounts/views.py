from django.shortcuts import render, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from .models import User

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
    print('communication: OK')
    if request.method == "POST":
        username = request.POST['username']
        print(username)
        password = request.POST['password']
        email = request.POST['email']
        user = User.objects.create_user(username, email, password)
        user.save()
        return redirect("accounts:login")
    return render(request, "accounts/signup.html")