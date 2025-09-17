from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect

def redirect_to_frontend(request):
    return HttpResponseRedirect("http://localhost:5173/")

urlpatterns = [
    path("", redirect_to_frontend),  
    path("admin/", admin.site.urls),
    path("api/", include("shop.urls")),
]
