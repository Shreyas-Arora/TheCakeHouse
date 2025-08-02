from rest_framework import serializers
from .models import Cake, Order

class CakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cake
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    cake = serializers.PrimaryKeyRelatedField(queryset = Cake.objects.all())
    class Meta:
        model = Order
        fields = '__all__'
        