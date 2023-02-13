import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

from channels.generic.websocket import AsyncWebsocketConsumer

def chat_message(func):
    def wrapped(self, event):
        message = event.get('message')
        func(self, message)
    return wrapped



class ChatConsumer2(WebsocketConsumer):
    def connect2(self):
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

    def connect(self):
        print("connected")
        self.room_name = 'test_consumer'
        self.room_group_name = 'test_consumer_group'
        async_to_sync(self.channel_layer.group_add)(self.room_name,self .room_group_name)
        self.accept()
        self.send(text_data=json.dumps({'status':'connected praveen'}))


    def receive(self, text_data):  # for when the client sends messages
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        sender = None
        print("message: ", message)
        print("room: ", self.room_name)
        print("group: ", self.room_group_name)
        # self.send(text_data=json.dumps({'status':'connected praveen'}))

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender": sender.username if sender else "Anonymous",
            },
        )
        print("message2: ", message)

    # Receive message from room group
    # @chat_message
    # def chat_message(self, event):
    #     message = event["message"]
    #     print("recived: ", message)

    #     # Send message to WebSocket
    #     self.send(text_data=json.dumps({"message": message}))
    @chat_message
    async def chat_message(self, message):
        # code to handle incoming WebSocket messages
        async_to_sync(self.send)(message)



