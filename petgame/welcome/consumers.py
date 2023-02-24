import json
from asgiref.sync import async_to_sync
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


import json
from channels.generic.websocket import WebsocketConsumer
from .models import Lobby, Name


class ChatConsumer(WebsocketConsumer):
    """
    MESSAGE TYPES:
        on client connect:
            add the client name to Lobby
            assign a position in the maze to client
            client recieve "connected" and maze status
            peers recieve "xyz" joined and client's position
            update the maze
            return the maze to client
            
        
        on message recieve from client:
            get the position, sender, plant type
            update the maze
            send message to all peers about new plant

        # on message send from client:
        #     update the maze
        #     send position, client name, plant type

        on client disconnect:
            remove all plants from client
            client recieve "disconnected"
            if anymore clients are left, 
                peers recieve "xyz left"
                update maze
                send maze to all the clients
            else
                delete lobby
                delete maze
    
    """
    joined_players = []
    def connect(self):
        """
        on client connect:
            add the client name to Lobby
            assign a position in the maze to client
            client recieve "connected" and maze status
            peers recieve "xyz" joined and client's position
            update the maze
            return the maze to client
        """
        self.accept()
        
        # set lobby and create a lobby instance
        self.room_group_name = self.scope["path"].split("/")[-2]
        lobby = Lobby.objects.get(number=self.scope["path"].split("/")[-2])

        # add player to lobby, and webSocket layer
        user, created = Name.objects.get_or_create(name=self.scope["path"].split("/")[-1], lobby=lobby)
        
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name,
        )

        # get all the players joined in this lobby
        names = [i.name for i in Name.objects.filter(lobby=lobby)]
        print("joined players: ", names)
        names = ", ".join(names)
        
        # send a message back to client with connection status and joined players' names
        self.send(
            text_data=json.dumps(
                {
                    "type": "connection_established",
                    "message": "You are now connected. Currently joined: " + names,
                }
            )
        )
    
    def remove_user_from_group(self, user):
        print("removed player ", user, " from lobby.")
        Name.objects.filter(name=user).delete()
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type":"chat_message",
                "message": f"{user} left the lobby",
                "sender":user
            },
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        message = text_data_json["message"]
        sender = text_data_json["sender"]
        
        if text_data_json.get('disconnect', False):
            self.remove_user_from_group(sender)
        else:
            async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type":"chat_message",
                "message": message,
                "sender": text_data_json["sender"],
            },
        )
    
    def disconnect(self, code):
        print("\n\nCode: ",code, "\n\n")
        players = Name.objects.filter(lobby=self.scope["path"].split("/")[-2])
        if players.count() == 1:
           players.filter(name=self.scope["path"].split("/")[-1]).delete()
           return
        import datetime

        current_time = datetime.datetime.now()
        print("The current date and time is:", current_time)
        print("calling super.disconnet() for lobby: ", self.scope["path"].split("/")[-2])
        print("lobby count: ", Lobby.objects.count())
        Lobby.objects.filter(number=self.scope["path"].split("/")[-2]).delete()
        import datetime

        current_time = datetime.datetime.now()
        print("The current date and time is:", current_time)
        print("lobby count: ", Lobby.objects.count())
        return super().disconnect(code)

    def chat_message(self, event):
        message = event["message"]
        print("chat_message event: ", event)
        self.send(
            text_data=json.dumps(
                {"type":"chat_message", "message": message, "sender": event["sender"]}
            )
        )





class ChatConsumer3(WebsocketConsumer):
    joined_players = []
    def connect(self):
        # for initial request that comes in from client
        self.accept()
        self.room_group_name = self.scope["path"].split("/")[-2]
        lobby, created = Lobby.objects.get_or_create(number=self.scope["path"].split("/")[-2])

        # add player to lobby, and webSocket layer
        # user, created = Name.objects.get_or_create(name=self.scope["path"].split("/")[-1])
        user = self.scope["path"].split("/")[-1]
        self.joined_players.append(user)
        # user.lobby = lobby
        # user.save()
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name,
        )

        # get all the players joined in this lobby
        # names = [i.name for i in Name.objects.filter(lobby=lobby)]
        print("joined players: ", self.joined_players)
        names = ", ".join(names)
        
        # send a message back to client with connection status and joined players' names
        self.send(
            text_data=json.dumps(
                {
                    "type": "connection_established",
                    "message": "You are now connected. Currently joined: " + names,
                }
            )
        )
    
    def remove_user_from_group(self, user):
        print("removed player ", user, " from lobby.")
        Name.objects.filter(name=user).update(lobby=None)
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": f"{user} left the lobby",
            },
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        sender = text_data_json["sender"]
        
        if "disconnect" in text_data_json:
            self.remove_user_from_group(sender)
        else:
            async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender": text_data_json["sender"],
            },
        )
    
    def disconnect(self, code):
        print("\n\nCode: ",code, "\n\n")
        return super().disconnect(code)

    def chat_message(self, event):
        message = event["message"]
        print("event: ", event)
        self.send(
            text_data=json.dumps(
                {"type": "chat", "message": message, "sender": event["sender"]}
            )
        )

