from rest_framework import serializers
from .models import Episode, Show, EpisodeNews, Images


class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ('show_id', 'show_name', 'show_description', 'show_image_id',
                  'show_cropped_image_id',
                  'show_logname', 'show_sched_original_app_id',
                  'show_on_break')


class EpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = ('episode_id', 'episode_show_id', 'episode_identifier',
                  'episode_start', 'episode_end',
                  'episode_playlist_id',
                  'episode_listen_again_recorded', 'episode_listen_again_src',
                  'episode_active', 'episode_featured',
                  'episode_featured_text', 'episode_title', 'episode_type')


class EpisodeNewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EpisodeNews
        fields = ('news_id', 'news_show_id', 'news_episode_id', 'news_title',
                  'news_body', 'news_date', 'news_active', 'news_image_id',
                  'news_cropped_image_id')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ('image_id', 'image_src', 'image_desc', 'image_width',
                  'image_height', 'image_size', 'is_crop_of_image_id')
