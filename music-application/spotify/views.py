from django.shortcuts import render
from .credentials import REDIRECT_URI,CLIENT_ID,CLIENT_SECRET
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.Response import Response
import requests

class AuthURL(APIView):
    def get(self, request,format=None):
        scopes = "user-read-playback-state user-modify-playback-state user-read-currently-playing"

        url = requests.Request("GET",'https://accounts.spotify.com/authorize',params={
            "scope":scopes,
            'response_type':"code",
            'redirect_uri':REDIRECT_URI
        }).prepare().url

        return Response({"url":url},status=status.HTTP_200_OK)

def spotify_callback(request,format=None):
    code = request.GET.get("code")
    error = request.GET.get("error")

    response = request.post("https://account.spotify.com/api/token",data={
        "grant_type":"authorization_code",
        "code":code,
        'redirect_uri':REDIRECT_URI,
        'client_id':CLIENT_ID,
        "client_secret":CLIENT_SECRET,
    }).json()

    access_token = response.get("access_token")
    token_type = response.get("refresh_token")
    expires_in = response.get("expires_in")
    error = request.get("error")
    