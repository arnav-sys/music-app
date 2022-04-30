from urllib import response
from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID,CLIENT_SECRET
import requests

BASE_URL ="https://api.spotify.com/v1/me/"

def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None

def update_or_create_user_tokens(session_id,access_token,token_type,expires_in,refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token =access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=["access_token",'refresh_token','token_type','expires_in'])
    else:
        tokens = SpotifyToken(user=session_id,access_token=access_token,expires_in=expires_in,token_type=token_type,refresh_token=refresh_token)

        tokens.save()

def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = response.post("https://accounts.spotify.com/api/token",data={
        "grant_type":"refresh_token",
        "refresh_token":refresh_token,
        "client_id":CLIENT_ID,
        "client_secret":CLIENT_SECRET
    }).json()

    access_token =  response.get("access_token")
    token_type = response.get("token_type")
    expires_in = response.get("expires_in")
    refresh_token = response.get('refresh_token')

    update_or_create_user_tokens(session_id,access_token,token_type,expires_in,refresh_token)


def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        date = tokens.expires_in
        if date <= timezone.now():
            refresh_spotify_token(tokens)

        return True
    return False

def execute_spotify_api_request(session_id,endpoint,post_=False,put_=False):
    tokens = get_user_tokens(session_id)
    header = {"Content-Type":"application/json","Authorization":"Bearer" + tokens.access_token}

    if post_:
        requests.post(BASE_URL + endpoint, headers=header)
    if put_:
        requests.put(BASE_URL + endpoint,headers=header)
    
    response = requests.get(BASE_URL + endpoint,{},headers=header)
    try:
        return response.json()
    except:
        return {"Error":"Issue with request"}

    