from django.urls import path

from .views import CreateRoomView, RoomView


urlpatterns = [
    path("home",RoomView.as_view()),
    path("createroom",CreateRoomView.as_view())
]