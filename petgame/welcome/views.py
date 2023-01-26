from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from welcome.models import Name
import json
# Create your views here.
def index_view(request):
    return HttpResponse("Welcome Stranger")


def redirect_to_default(request, *args, **kwargs):
    return redirect("/")

def register_name(request):
    breakpoint()
    return JsonResponse({"message":"Name submitted"})


def get_names(request):

    names = [x['name'] for x in Name.objects.all().values("name")]
    return HttpResponse(json.dumps({"names":names}))
    # return JsonResponse("abc", safe=False)


def join_lobby(request):
    name = request.POST.get("name")
    created=False
    
    if name:
        name_obj, created = Name.objects.get_or_create(name=name)
    return HttpResponse(json.dumps({"created":created, "valid_name":bool(name), "name":name}))



 