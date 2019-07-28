from django.shortcuts import render
from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
from .models import Event,ActorsGroup,SubEventType,EventType,Confict,Location,Media
from .serializers import EventSerializer,ActorsGroupSerializer,SubEventTypeSerializer,MediaSerializer
from .serializers import EventTypeSerializer,ConflictSerializer,LocationSerializer
# Create your views here.
class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def by_date(self,startdate,enddate):
        
        return events
    @list_route(url_path='by_date')
    def by_date(self,request):
        startdate = self.request.query_params.get('start')
        enddate = self.request.query_params.get('end')
        events = self.queryset.filter(event_date__gte=startdate,event_date__lte=enddate)  
        result = [self.serializer_class(event).data for event in events]
        return Response(result)
    
    @list_route(url_path='by_date_and_event_type')
    def by_date_and_event_type(self,request):
        startdate = self.request.query_params.get('start')
        enddate = self.request.query_params.get('end')
        events = self.queryset.filter(event_date__gte=startdate,event_date__lte=enddate) 
        event_type_id = self.request.query_params.get('event_type_id')
        subevents = SubEventType.objects.filter(e_type = event_type_id)
        sub_event_ids = map(lambda subevent : subevent.id, subevents)
        sub_event_ids = list(sub_event_ids)
        def isincat(event):
            checked_id = event.sub_event.id
            if checked_id in sub_event_ids:
                return event
        filtered_events = map(isincat,events)
        filtered_events = [i for i in filtered_events if i]
        print(filtered_events)
        serializer = EventSerializer(filtered_events, many=True)
        return Response(serializer.data)



    
class ActorsGroupsView(viewsets.ModelViewSet):
    queryset = ActorsGroup.objects.all()
    serializer_class = ActorsGroupSerializer
    @list_route(url_path='by_group')
    def by_group(self,request):
        group_id = self.request.query_params.get('group_id')
        group = self.queryset.get(id=group_id)
        result = self.serializer_class(group).data
        return Response(result)

class SubEventTypeView(viewsets.ModelViewSet):
    queryset = SubEventType.objects.all()
    serializer_class = SubEventTypeSerializer
    
    @list_route(url_path='by_sub_event')
    def by_sub_event(self,request):
        sub_event_id = self.request.query_params.get('sub_event_id')
        sub_event = self.queryset.get(id=sub_event_id)
        result = self.serializer_class(sub_event).data
        return Response(result)

class EventTypeView(viewsets.ModelViewSet):
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer

    @list_route(url_path='all_event_types')
    def all_event_types(self,request):
        event_types = self.queryset.all()
        results = [self.serializer_class(event_type).data for event_type in event_types]
        return Response(results)
    
    @list_route(url_path='sub_events')
    def get_sub_events(self,request):
        event_type_id = self.request.query_params.get('event_type_id')
        subevents = SubEventType.objects.filter(e_type = event_type_id)
        results = [SubEventTypeSerializer(event_type).data for event_type in subevents]
        return Response(results)

class ConflictView(viewsets.ModelViewSet):
    queryset = Confict.objects.all()
    serializer_class = ConflictSerializer

    @list_route(url_path='conflict_details')
    def conflict_details(self,request):
        conflict_id = self.request.query_params.get('conflict_id')
        conflict = self.queryset.get(id=conflict_id)
        result = self.serializer_class(conflict).data
        return Response(result)
class LocationView(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    @list_route(url_path='location_details')
    def location_details(self,request):
        location_id = self.request.query_params.get('location_id')
        location = self.queryset.get(id=location_id)
        result = self.serializer_class(location).data
        return Response(result)

class MediaView(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer

    @list_route(url_path='media_details')
    def media_details(self,request):
        media_id = self.request.query_params.get('media_id')
        media = self.queryset.get(id=media_id)
        result = self.serializer_class(media).data
        return Response(result)