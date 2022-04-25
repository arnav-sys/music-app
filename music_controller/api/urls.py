from django.urls import path

from .views import CreateRoomView, GetRoom, JoinRoom, RoomView


urlpatterns = [
    path("home",RoomView.as_view()),
    path("createroom",CreateRoomView.as_view()),
    path("getroom",GetRoom.as_view()),
    path("joinroom",JoinRoom.as_view())
]