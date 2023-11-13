from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, HttpRequest
from django.shortcuts import render
from django.urls import reverse
from django.core.validators import validate_email
from rest_framework import viewsets, permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostSerializer, UserLoginSerializer, UserRegisterSerializer, UserSerializer, LikeSerializer, CommentSerializer
from .models import *

class PostView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class UserView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer 
    queryset = User.objects.all()

class LikeView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

class CommentView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request):
        validated_data = request.data
        serializer = UserRegisterSerializer(data=validated_data)
        if serializer.is_valid(raise_exception=True):
            user = User.objects.create_user(validated_data['username'], password=validated_data['password']) 
            if user:
                user.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (SessionAuthentication, )

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid():
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)

class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
