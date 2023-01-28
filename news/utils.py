import random
import pandas as pd
from datetime import datetime
from pytz import timezone
from hakaton.settings import BASE_DIR
from news.models import News


def random_datetime():
    tz = timezone("Asia/Tashkent")
    start = datetime(2022, 1, 1, tzinfo=tz)
    end = datetime(2023, 1, 20, tzinfo=tz)
    timestamp = random.randint(int(start.timestamp()), int(end.timestamp()))
    return datetime.fromtimestamp(timestamp)


def product(title: str, content: str):
    label = 0
    region = ['olmazor', 'mirobod']
    # return 0
    return label, region


def creat_news():
    data = pd.read_csv(f"{BASE_DIR}/Azizbek_akaga.csv")
    news = [News(
        title=row['title'],
        content=row['content'],
        region=row['tuman'],
        label=row['label'],
        published=random_datetime()
    ) for index, row in data.iterrows()]
    News.objects.bulk_create(news)


def removeDb():
    News.objects.all().delete()
