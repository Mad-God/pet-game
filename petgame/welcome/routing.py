from django.urls import path, re_path
from . import consumers


# breakpoint()
websocket_urlpatterns = [
    # path("ws/socket-server", consumers.ChatConsumer.as_asgi()),
    re_path(r"ws/lobby/", consumers.ChatConsumer.as_asgi()),
]
  