from django.urls import path,include
from . import views
from rest_framework import routers
router = routers.DefaultRouter()
router.register(r'events',views.EventView)
router.register(r'groups',views.ActorsGroupsView)
router.register(r'subevents',views.SubEventTypeView)
router.register(r'eventTypes',views.EventTypeView)
router.register(r'conflicts',views.ConflictView)
router.register(r'locations',views.LocationView)
router.register(r'media',views.MediaView)
urlpatterns = [
	path('',include(router.urls))
]