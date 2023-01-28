from django.db import models
from django.utils import timezone


# Create your models here.

class News(models.Model):
    title = models.TextField()
    content = models.TextField()
    region = models.CharField(max_length=200, blank=True, null=True)
    label = models.IntegerField(blank=True, null=True)
    published = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class RegionStatus(models.Model):
    region = models.CharField(max_length=100)
    yomon = models.IntegerField()
    yaxshi = models.IntegerField()
    ikkalasiyam = models.IntegerField()
