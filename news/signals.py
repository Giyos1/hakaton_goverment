from django.dispatch import receiver
from django.db.models.signals import post_save
from news.models import News, RegionStatus
from prodiction import predict_news
from nemo.collections import nlp as nemo_nlp

checkpoint_path = '2023-01-26_17-30-52/checkpoints/TextClassification--val_loss=1.2423-epoch=4.ckpt'
infer_model = nemo_nlp.models.TextClassificationModel.load_from_checkpoint(checkpoint_path=checkpoint_path)
infer_model.to("cpu")


@receiver(post_save, sender=News)
def creat_news(sender, instance, created, **kwargs):
    if created:
        if not instance.region and not instance.label:
            print(instance.content)
            # ans = (0,[' '])
            ans = predict_news(instance.content, infer_model)
            if ans == 0:
                instance.delete()
            else:
                for i in ans[1]:
                    News.objects.create(
                        content=instance.content,
                        region=i,
                        label=ans[0])
                    r = RegionStatus.objects.filter(name=i).first()
                    if ans[0] == 0:
                        r.yomon += 1
                    elif ans[0] == 1:
                        r.yaxshi += 1
                    else:
                        r.ikkalasiyam += 1
                    r.save()

                instance.delete()
