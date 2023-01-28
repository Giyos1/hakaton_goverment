from datetime import timedelta, datetime
from rest_framework.response import Response
from rest_framework.views import APIView
from threading import Thread
from news.models import News, RegionStatus
from news.utils import creat_news
from news.serializers import  RegionSerializers


class OqitishAPIView(APIView):
    def get(self, request):
        tread = Thread(target=creat_news)
        tread.start()
        return Response(data={"message": "done!"})


class StatusAPIView(APIView):
    def get(self, request):
        list2 = []
        q = request.query_params.get('q')
        if not q:
            news = RegionStatus.objects.all()
            serializers = RegionSerializers(news, many=True)
            return Response(data=serializers.data)
        start_time = datetime.now() - timedelta(days=int(q))
        news = News.objects.filter(published__range=(start_time, datetime.now())).order_by('-published')
        for i in ['olmazor', "mirobod", "sergeli", "yakkasaroy", "mirzo ulugʻbek", "yashnobod", "bektemir",
                  "shayxontohur", "chilonzor", "yangihayot", "uchtepa", "yunusobod"]:
            json = creat_json(i, news=news)
            list2.append(json)

        return Response(data=list2, status=200)


def creat_json(text: str, news):
    yomon = news.filter(region=text).filter(label=0).count()
    yaxshi = news.filter(region=text).filter(label=1).count()
    ikkalasiyam = news.filter(region=text).filter(label=3).count()
    return {"region": text,
            "yomon": yomon,
            "yaxshi": yaxshi,
            "ikkalasiyam": ikkalasiyam}
