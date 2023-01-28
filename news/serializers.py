from rest_framework import serializers
from news.models import News, RegionStatus


class NewsSerializers(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'


class RegionSerializers(serializers.ModelSerializer):
    class Meta:
        model = RegionStatus
        fields = '__all__'
