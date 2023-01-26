import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        # for initial request that comes in from client
        self.accept()
        self.room_group_name = "abc"
        print("\n\n\n", self.room_group_name, "\n\n\n")
        self.send(
            text_data=json.dumps(
                {
                    "type": "connection_established",
                    "message": "You are now connected",
                }
            )
        )
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name,
        )

    def receive(self, text_data):  # for when the client sends messages
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        sender = None

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender": sender.username if sender else "Anonymous",
            },
        )