from rest_framework import serializers
from .models import Event,SubEventType,ActorsGroup,Actors,Media
from .models import EventType,Confict,Location

class EventSerializer(serializers.ModelSerializer):
	class Meta:
		model = Event
		fields = ('id', 'latitude','longitude','location','sub_event','event_date','actors_group','conflict','media')

class SubEventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubEventType
        fields = ('id','e_type','description')
        depth = 1

class ActorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actors
        fields = ('id','name')
class ActorsGroupSerializer(serializers.ModelSerializer):
    #actor1 = serializers.PrimaryKeyRelatedField(read_only=True,source="actors.id")

    class Meta:
        model = ActorsGroup
        fields = ('id','actor1','actor2')
        depth = 1
class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ('id','description')
        depth = 1

class ConflictSerializer(serializers.ModelSerializer):
    class Meta:
        model = Confict
        fields = ('id','description')

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('id','name')

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ('id','description')