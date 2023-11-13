
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.UserLogin.as_view(), name="login"),
    path("logout", views.UserLogout.as_view(), name="logout"),
    path("register", views.UserRegister.as_view(), name="register"),
    path("user", views.UserView.as_view(), name='user')
]
