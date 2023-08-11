from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("wiki/<query>", views.ShowEntry, name="ShowEntry"),
    path("wiki/edit/<query>", views.EditEntry, name="EditEntry"),
    path("newpage", views.NewPage, name="newpage"),
    path("random", views.RandomPage, name="random")
]
