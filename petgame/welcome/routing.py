from django.urls import path
from . import consumers


# breakpoint()
websocket_urlpatterns = [
    path("ws/socket-server", consumers.ChatConsumer.as_asgi()),
]
  