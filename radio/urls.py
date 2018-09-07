from django.urls import path
from radio import api, views
from rest_framework.urlpatterns import format_suffix_patterns

# urlpatterns = [
#     url(r'^shows/$', api.show_list),
#     url(r'^shows/(?P<pk>[0-9]+)/$', api.show_detail),
# ]


urlpatterns = [

    path('', views.index, name='radio-homepage'),
    path('shows/<str:requested_show_logname>/', views.show_page,
         name='show-page'),
    path(
        'shows/<str:requested_show_logname>/'
        '<str:requested_episode_identifier>/',
        views.episode_page),
    # name='episode_detail'),

    # api urls paths for main radio resources
    #
    # api root
    path('api/radio/', api.api_root),
    # ex: api/radio/shows/
    path('api/radio/shows/', api.show_list,
         name='show_list'),
    # ex: api/radio/shows/1000/
    path('api/radio/shows/<int:show_id>/', api.show_detail,
         name='detail'),
    # ex: api/radio/shows/
    path(
        'api/radio/episodes/episodeidentifier/<str:requested_episode_identifier>/',
        api.episode_detail_by_episode_identifier,
        name='episode_detail_by_identifier'),
    path('api/radio/episodes/episodeid/<int:requested_episode_id>/',
         api.episode_detail_by_episode_id,
         name='episode_detail_by_id'),
    # ex: api/radio/episodes/
    # path('api/radio/episodes/', api.episode_list,
    #      name='episode_list'),
    # ex: api/radio/episodes/1000/
    path('api/radio/episodes/<int:requested_episode_show_id>/',
         api.episode_list_by_show_id,
         name='show_episodes_list_by_id'),
    # ex: api/radio/episodes/showname/testshow_name
    path('api/radio/episodes/showname/<str:requested_show_name>/',
         api.episode_list_by_show_name,
         name='show_episodes_list_by_name'),
    # ex: api/radio/episodes/showlogname/testshow_logname/
    path('api/radio/episodes/showlogname/<str:requested_show_logname>/',
         api.episode_list_by_show_logname,
         name='show_episodes_list_by_logname'),
    # ex: api/radio/schedule/today/
    path('api/radio/schedule/today/', api.schedule_today,
         name='schedule_today'),
    # ex: api/radio/schedule/2018/08/10/
    path('api/radio/schedule/<int:year>/<int:month>/<int:day>/',
         api.schedule_day, name='schedule_day'),
    # ex: api/radio/schedule/now/
    path('api/radio/schedule/now/', api.schedule_now, name='schedule_now'),
    # ex: api/radio/news/
    path('api/radio/news/', api.latest_episode_news_station,
         name='schedule_now'),
    # ex: api/radio/news/beatsofallnations/
    path('api/radio/news/showlogname/<str:requested_show_logname>/', api.latest_episode_news_show_by_show_logname,
         name='show_news_logname'),
    # ex: api/radio/news/13/544
    path('api/radio/news/<int:requested_show_id>/<int:requested_episode_id>/',
         api.episode_news,
         name='episode_news'),
    # ex: api/radio/image/3221
    path('api/radio/image/<int:requested_image_id>/', api.get_image,
         name='image')

]

# http://www.django-rest-framework.org/tutorial/2-requests-and-responses/#adding-optional-format-suffixes-to-our-urls
urlpatterns = format_suffix_patterns(urlpatterns)
