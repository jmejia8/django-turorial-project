from django.urls import path
from . import views

app_name = "maps"
urlpatterns = [
    path("", views.index, name="index"),
    path("save_route/", views.save_route, name="save_route"),

]
