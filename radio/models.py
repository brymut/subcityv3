from __future__ import unicode_literals
from django.utils import timezone
import datetime

from django.db import models


# Create your models here.
class Show(models.Model):
    show_id = models.IntegerField(primary_key=True)
    show_name = models.CharField(max_length=50)
    show_description = models.TextField()
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

    episode_start = models.DateTimeField(default=timezone.now())

    episode_end = models.DateTimeField(default=timezone.now())

    episode_playlist_id = models.IntegerField()
    episode_listen_again_recorded = models.IntegerField()
    episode_listen_again_active = models.IntegerField()
    episode_listen_again_src = models.CharField(max_length=50)
    episode_active = models.IntegerField()
    episode_featured = models.IntegerField()
    episode_featured_text = models.TextField(blank=True)
    episode_title = models.CharField(max_length=50, blank=True)
    episode_type = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'episodes'
        ordering = ['-episode_starttime']


class EpisodeNews(models.Model):
    news_id = models.IntegerField(primary_key=True)
    news_show_id = models.IntegerField(blank=True, null=True)
    news_episode_id = models.IntegerField(blank=True, null=True)

    news_title = models.CharField(max_length=50, blank=True)
    news_body = models.TextField()
    news_date = models.DateTimeField(default=timezone.now())

    news_active = models.IntegerField(blank=True, null=True)
    news_image_id = models.IntegerField(blank=True, null=True)
    news_cropped_image_id = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'episode_news'
        ordering = ['-news_date']

    def __unicode__(self):
        return self


class Images(models.Model):
    image_id = models.IntegerField(primary_key=True)
    image_src = models.CharField(max_length=50, null=False)
    image_desc = models.TextField()
    image_width = models.IntegerField()
    image_height = models.IntegerField()
    image_size = models.IntegerField()
    is_crop_of_image_id = models.IntegerField(null=True)

    class Meta:
        managed = False
        db_table = 'subcity_images'
