from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Listing(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="listings")
    watching = models.ManyToManyField(User, related_name="watchlist")
    leader = models.ForeignKey(User, on_delete=models.CASCADE, related_name="lead_listings", null=True)
    highest_bid = models.FloatField(default=0)
    number_of_bids = models.IntegerField(default=0)
    image_url = models.TextField(default="")
    category = models.CharField(max_length=64, default="No category listed")
    time_of_creation = models.DateField(auto_now_add=True)
    is_closed = models.BooleanField(default=False)

class Comment(models.Model):
    text = models.TextField(default="")
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name="comments", null=True)

class Bid(models.Model):
    bidder = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bids")
    pass
