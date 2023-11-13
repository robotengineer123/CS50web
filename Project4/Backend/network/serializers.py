from rest_framework import serializers
from .models import * 
from django.contrib.auth import authenticate, get_user_model
from django.core.exceptions import ValidationError

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    def create(self, validated_data):
        return super().create(validated_data)

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def check_user(self, validated_data):
        user = authenticate(username=validated_data['username'], password=validated_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class LikeSerializer(serializers.ModelSerializer):
    poster = UserSerializer
    class Meta:
        model = Like 
        fields = ['poster']

class CommentSerializer(serializers.ModelSerializer):
    poster = UserSerializer()
    class Meta:
        model = Comment 
        fields = ['id', 'poster', 'text']

class PostSerializer(serializers.ModelSerializer):
    poster = UserSerializer()
    comments = CommentSerializer(many=True)
    class Meta:
        model = Post
        fields = ('id', 'poster', 'content', 'stamp', 'comments', 'likes')