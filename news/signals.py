from django.dispatch import receiver
from django.db.models.signals import post_save
from news.models import News, RegionStatus
from .utils import product


@receiver(post_save, sender=News)
def creat_news(sender, instance, created, **kwargs):
    if created:
        if not instance.region and not instance.label:
            ans = product(instance.title, instance.content)
            if ans == 0:
                instance.delete()
            else:
                for i in ans[1]:
                    News.objects.create(title=instance.title,
                                        content=instance.content,
                                        region=i,
                                        label=ans[0])
                instance.delete()
