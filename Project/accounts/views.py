from django.shortcuts import render
from django.contrib.auth import authenticate, login
# Create your views here.
def login_view(request):
    if request.method == "POST":
        username = request.POST["id"]
        password = request.POST["password"]
        user = authenticate(username=username, password=password) # 인증확인 후 틀리면 None배출
        if user is not None:
            print("인증성공")
            login(request, user)
        else:
            print("인증실패")
    return render(request,"accounts/login.html")