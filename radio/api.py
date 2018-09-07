from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
import time
import datetime
from .models import Show, Episode, EpisodeNews, Images
from .serializers import ShowSerializer, EpisodeSerializer, \
    EpisodeNewsSerializer, ImageSerializer

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.pagination import PageNumberPagination


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'shows': reverse('show_list', request=request, format=format),
        # 'episodes': reverse('episode_list', request=request, format=format)
    })


@api_view(['GET', 'POST'])
def show_list(request, format=None):
    """
    List all shows, paginated 10 per page.


    TO-DO: or create a new show.
    """

    if request.method == 'GET':
        paginator = PageNumberPagination()
        paginator.page_size = 10
        shows = Show.objects.all()
        page = paginator.paginate_queryset(shows, request)
        serializer = ShowSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

    # elif request.method == 'POST':
    #     serializer = ShowSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def show_detail(request, show_id, format=None):
    """
    Retrieve a show information using its id


    TODO: , update or delete a show.
    """
    try:
        show = Show.objects.get(pk=show_id)
    except Show.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ShowSerializer(show)
        return Response(serializer.data)

    # elif request.method == 'PUT':
    #     serializer = ShowSerializer(show, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #
    # elif request.method == 'DELETE':
    #     show.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    #


@api_view(['GET', 'POST'])
def episode_list(request, format=None):
    """
    List all episodes

     TODO: or create a new episode.
    """
    if request.method == 'GET':
        episodes = Episode.objects.all()
        serializer = EpisodeSerializer(episodes, many=True)
        return Response(serializer.data)

    # elif request.method == 'POST':
    #     serializer = EpisodeSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def episode_list_by_show_id(request, requested_episode_show_id, format=None):
    """
    List all episodes for a show using its show_id.


     TODO: or create a new episode.
    """
    if request.method == 'GET':
        episodes = Episode.objects.filter(
            episode_show_id=requested_episode_show_id).filter(
            episode_starttime__lte=time.time())
        serializer = EpisodeSerializer(episodes, many=True)
        return Response(serializer.data)

    # elif request.method == 'POST':
    #     serializer = EpisodeSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def episode_list_by_show_name(request, requested_show_name, format=None):
    """
    List all episodes for a show using its show name.


     TODO: or create a new episode.
    """
    if request.method == 'GET':
        try:
            requested_show = Show.objects.get(show_name=requested_show_name)
        except Show.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        episodes = Episode.objects.filter(
            episode_show_id=requested_show.show_id).filter(
            episode_starttime__lte=time.time())
        serializer = EpisodeSerializer(episodes, many=True)
        return Response(serializer.data)

    # elif request.method == 'POST':
    #     serializer = EpisodeSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def episode_list_by_show_logname(request, requested_show_logname, format=None):
    """
    List all episodes for a show using its show_logname.


     TODO: or create a new episode.
    """
    if request.method == 'GET':
        try:
            requested_show = Show.objects.get(
                show_logname=requested_show_logname)
        except Show.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        paginator = PageNumberPagination()
        paginator.page_size = 5

        episodes = Episode.objects.filter(
            episode_show_id=requested_show.show_id).filter(
            episode_starttime__lte=time.time())

        page = paginator.paginate_queryset(episodes, request)
        serializer = EpisodeSerializer(page, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def schedule_today(request, format=None):
    """
    List all episodes for today
    """
    if request.method == 'GET':
        # print(datetime.date.today() + datetime.timedelta(days=1))

        episodes = Episode.objects.filter(
            episode_start__gte=datetime.date.today()).filter(
            episode_start__lte=datetime.date.today() + datetime.timedelta(
                days=1)
        )
        serializer = EpisodeSerializer(episodes, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def schedule_day(request, year, month, day, format=None):
    """
    List all episodes for specified date
    """
    if request.method == 'GET':
        requested_date = datetime.datetime(year=year, month=month, day=day)

        episodes = Episode.objects.filter(
            episode_start__gte=requested_date).filter(
            episode_start__lte=requested_date + datetime.timedelta(
                days=1)
        )
        serializer = EpisodeSerializer(episodes, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def schedule_now(request, format=None):
    """
    List all episodes for specified date
    TODO : This doesn't work
    """
    if request.method == 'GET':
        print(timezone.now().replace(microsecond=0, second=0, minute=0)
              + datetime.timedelta(hours=1))
        try:
            requested_show = Episode.objects.get(
                episode_start=timezone.now().replace(microsecond=0, second=0,
                                                     minute=0)
                              + datetime.timedelta(hours=1))
        except Episode.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EpisodeSerializer(requested_show, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def latest_episode_news_station(request, format=None):
    """
    List episode news from station from now, in descending order of time.

    :param request:
    :param format:
    :return:  Response with serialised show news from api.
    """
    if request.method == 'GET':
        news = EpisodeNews.objects.filter(
            news_date__lte=datetime.date.today()).order_by('news_date')
        paginator = PageNumberPagination()
        paginator.page_size = 10
        page = paginator.paginate_queryset(news, request)

        serializer = EpisodeNewsSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def latest_episode_news_show_by_show_id(request, show_id, format=None):
    """
    List episode news from show, from now, in descending order of time.
     Using its show_id

    :param request:
    :param format:
    :param show_id
    :return:  Response with serialised show news from api.
    """

    if request.method == 'GET':
        news = EpisodeNews.objects.filter(
            news_date__lte=datetime.date.today()).filter(
            news_episode_id=show_id
        )
        paginator = PageNumberPagination()
        paginator.page_size = 10
        page = paginator.paginate_queryset(news, request)

        serializer = EpisodeNewsSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def latest_episode_news_show_by_show_logname(request, requested_show_logname,
                                             format=None):
    """
    List episode news from show, from now, in descending order of time.
     Using its show_id

    :param request:
    :param format:
    :param show_id
    :return:  Response with serialised show news from api.
    """

    if request.method == 'GET':
        show = Show.objects.get(
            show_logname__exact=requested_show_logname
        )
        print(show.show_id)

        news = EpisodeNews.objects.filter(
            news_show_id=show.show_id
        ).order_by('-news_date')
        paginator = PageNumberPagination()
        paginator.page_size = 5
        page = paginator.paginate_queryset(news, request)

        serializer = EpisodeNewsSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def episode_news(request, requested_show_id, requested_episode_id,
                 format=None):
    """

    """

    if request.method == 'GET':
        try:
            requested_news = EpisodeNews.objects.get(
                news_show_id__exact=requested_show_id,
                news_episode_id__exact=requested_episode_id
            )
        except EpisodeNews.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EpisodeNewsSerializer(requested_news)
        return Response(serializer.data)


@api_view(['GET'])
def get_image(request, requested_image_id, format=None):
    if request.method == 'GET':
        try:
            requested_image = Images.objects.get(
                image_id=requested_image_id)
        except Images.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ImageSerializer(requested_image)

        return Response(serializer.data)


@api_view(['GET'])
def episode_detail_by_episode_identifier(request, requested_episode_identifier,
                                         format=None):
    if request.method == 'GET':
        try:
            requested_episode = Episode.objects.get(
                episode_identifier=requested_episode_identifier)
        except Episode.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = EpisodeSerializer(requested_episode)

        return Response(serializer.data)


@api_view(['GET'])
def episode_detail_by_episode_id(request, requested_episode_id,
                                 format=None):
    if request.method == 'GET':
        try:
            requested_episode = Episode.objects.get(
                episode_id=requested_episode_id)
        except Episode.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = EpisodeSerializer(requested_episode)

        return Response(serializer.data)
