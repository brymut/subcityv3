from __future__ import unicode_literals

from django.db import models


# Create your models here.
class Show(models.Model):
    show_id = models.IntegerField(primary_key=True)
    show_name = models.CharField(max_length=50)
    show_text = models.TextField()
    show_image_id = models.IntegerField()
    show_cropped_image_id = models.IntegerField()
    show_logname = models.CharField(unique=True, max_length=25)
    show_sched_original_app_id = models.IntegerField(unique=True)
    show_on_break = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'shows'


class Episode(models.Model):
    episode_id = models.IntegerField(primary_key=True)
    episode_show_id = models.IntegerField()

    episode_identifier = models.CharField(unique=True, max_length=5)
    episode_starttime = models.IntegerField()
    episode_endtime = models.IntegerField()

    episode_playlist_id = models.IntegerField()
    episode_listen_again_recorded = models.IntegerField()
    episode_listen_again_active = models.IntegerField()
    episode_listen_again_src = models.CharField(max_length=50)
    episode_active = models.IntegerField()
    episode_featured = models.IntegerField()
    episode_featured_text = models.TextField(blank=True)
    episode_title = models.CharField(max_length=50, blank=True)
    event_type = models.IntegerField()
    event_live_src = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'schedule_event'
