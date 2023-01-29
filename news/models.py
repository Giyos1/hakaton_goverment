from django.db import models
from django.utils import timezone


# Create your models here.

class News(models.Model):
    title = models.TextField(blank=True, null=True)
    content = models.TextField()
    region = models.CharField(max_length=200, blank=True, null=True)
    label = models.IntegerField(blank=True, null=True)
    published = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.content


class RegionStatus(models.Model):
    name = models.CharField(max_length=100)
    y = models.IntegerField(default=0)
    x = models.IntegerField(default=0)
    yomon = models.IntegerField()
    yaxshi = models.IntegerField()
    ikkalasiyam = models.IntegerField()
