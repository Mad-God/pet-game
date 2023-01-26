"""petgame URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from welcome.views import *
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('', index_view, name="index"),
    path('name/', register_name, name="register-name"),
    path('get-names/', get_names, name="get-names"),
    path('join-lobby/', csrf_exempt(join_lobby), name="join-lobby"),
    re_path(r'^(?P<example_param>[\w-]+)/$', redirect_to_default, name="redirect-default"),
]
