from django.shortcuts import render

# Create your views here.
def login_view(request):
    if request.method == "POST":
        username = request.POST["id"]
        password = request.POST["password"]
        print(username,password)
    return render(request,"accounts/login.html")