from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    followers = models.ForeignKey("self")


class Post(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE)


class Comment(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.TextField()

class Like(models.Model):
    poster = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)