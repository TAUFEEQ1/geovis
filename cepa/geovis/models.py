from django.db import models


class Actors(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'actors'


class ActorsGroup(models.Model):
    actor1 = models.ForeignKey(Actors, models.DO_NOTHING, db_column='actor1',related_name="aggressor")
    actor2 = models.ForeignKey(Actors, models.DO_NOTHING, db_column='actor2',related_name="aggressed")

    class Meta:
        managed = False
        db_table = 'actors_group'


class Confict(models.Model):
    description = models.TextField()

    class Meta:
        managed = False
        db_table = 'confict'

class Media(models.Model):
    description = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'media'
        
class Event(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    location = models.ForeignKey('Location', models.DO_NOTHING)
    sub_event = models.ForeignKey('SubEventType', models.DO_NOTHING)
    event_date = models.DateField()
    actors_group = models.ForeignKey(ActorsGroup, models.DO_NOTHING, db_column='actors_group')
    conflict = models.ForeignKey(Confict, models.DO_NOTHING)
    media = models.ForeignKey(Media,models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'event'


class EventType(models.Model):
    description = models.CharField(max_length=30)
    class Meta:
        managed = False
        db_table = 'event_type'


class Location(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'location'


class SubEventType(models.Model):
    e_type = models.ForeignKey(EventType, models.DO_NOTHING, db_column='e_type',related_name='subevents')
    description = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'sub_event_type'
