from django.contrib import admin

# Register your models here.
from . import models

admin.site.register(models.Show)
admin.site.register(models.Episode)