from django.contrib import admin
from .models import *

# register your models here.
admin.site.register(Listing)
admin.site.register(Comment)
admin.site.register(Bid)
