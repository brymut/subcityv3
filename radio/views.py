from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
import time, json
import datetime
from .models import Show, Episode
from .serializers import ShowSerializer, EpisodeSerializer


#
# Helper functions
#

def is_fetch(request, page, context_dict):
    d = context_dict

    if request.method == 'GET':
        d['base'] = 'base.html'
        d['page_refresh'] = 'true'
    elif request.method == 'POST':
        try:
            request_body = json.loads(request.body)
        except json.JSONDecodeError:
            request_body = {}

        if request_body['isFetch'] == 'true':
            d['base'] = 'empty.html'
        else:
            d['base'] = 'base.html'
    return render(request, page, d)


#
# Pages
#

def index(request):
    js_files = ["js/radio/index.js", ]
    context_dict = {'jsFiles': js_files}
    return is_fetch(request, 'radio/index.html', context_dict)


def show_page(request, requested_show_logname):
    js_files = ["js/radio/showpage.js", ]
    context_dict = {'show_logname': requested_show_logname,
                    'jsFiles': js_files}

    return is_fetch(request, 'radio/show_page.html', context_dict)


def episode_page(request, requested_show_logname,
                 requested_episode_identifier):
    js_files = ["js/radio/episodepage.js", ]
    context_dict = {'show_logname': requested_show_logname,
                    'episode_identifier': requested_episode_identifier,
                    'jsFiles': js_files}

    return is_fetch(request, 'radio/episode_page.html', context_dict)


def apply_page(request):
    js_files = ["js/radio/apply.js", ]
    context_dict = {'team': 'false',
                    'show': 'true',
                    'jsFiles': js_files}
    return is_fetch(request, 'apply.html', context_dict)


def contact_page(request):
    js_files = ["js/radio/contact.js", ]
    context_dict = {'jsFiles': js_files}
    return is_fetch(request, 'apply.html', context_dict)
