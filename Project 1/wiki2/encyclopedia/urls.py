from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("wiki/<query>", views.ShowEntry, name="ShowEntry")
]
