from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from welcome.models import Name, Lobby
import json
# Create your views here.
def index_view(request):
    return HttpResponse("Welcome Stranger")


def redirect_to_default(request, *args, **kwargs):
    return redirect("/")


def get_names(request):
    names = [x['name'] for x in Name.objects.filter(lobby__number=int(request.GET.get("lobby", 0))).values("name")]
    print(request.GET.get("lobby"), names)
    return HttpResponse(json.dumps({"names":names}))


def get_lobbies(request):

    lobbies = [x['number'] for x in Lobby.objects.all().values("number")]
    import datetime
    current_time = datetime.datetime.now()
    print("The current date and time is:", current_time)
    print("fetched lobbies.")
    return HttpResponse(json.dumps({"lobbies":lobbies}))

def join_lobby(request):
    name = request.POST.get("name")
    created=False
    
    if name:
        name_obj, created = Name.objects.get_or_create(name=name)
    return HttpResponse(json.dumps({"created":created, "valid_name":bool(name), "name":name}))


def get_new_lobby(request):
    lobby = Lobby.objects.create()
    return HttpResponse(json.dumps({"lobby":lobby.number}))


 