from django.urls import path

from .views import CreateRoomView, GetRoom, RoomView


urlpatterns = [
    path("home",RoomView.as_view()),
    path("createroom",CreateRoomView.as_view()),
    path("getroom",GetRoom.as_view()),
]