from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, HttpRequest
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required

from .models import *


def index(request):
    return render(request, "auctions/index.html", {
        "listings": Listing.objects.all(),
        "header": "Active Listings"
    })

def view_category_listings(request, category):
    listings = Listing.objects.filter(category__exact=category)
    return render(request, "auctions/index.html", {
        "listings": listings,
        "header": f"Listings in the category: {category}"
    })


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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


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
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")


def categories(request: HttpRequest):
    pass

@login_required
def new_listing(request: HttpRequest):
    if request.method == "POST":
        item = Listing(
            name = request.POST["listing_name"],
            description = request.POST["description"],
            owner = request.user,
            highest_bid = request.POST["start_price"],
            image_url = request.POST["image_url"],
            category = request.POST["category"],
        )
        item.time_of_creation
        item.save()
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/new_listing.html")
    

def view_listing(request: HttpRequest, listing_name):
    listing = Listing.objects.filter(name__exact=listing_name).first()
    watchlist = "Add to watchlist"
    message = ""
    if "bid" in request.POST:
        bid = float(request.POST["bid"])
        if bid > listing.highest_bid:
            listing.highest_bid = bid
            listing.leader = request.user
            listing.number_of_bids += 1
            listing.save()
        else:
            message = f"Your bid: {bid} is lower than the current price: {listing.highest_bid}"
    
    elif "watchlist_button" in request.POST:
        if listing in request.user.watchlist.all():
            request.user.watchlist.remove(listing)
            watchlist = "Add to watchlist"
        else:
            request.user.watchlist.add(listing)
            message = f"{listing.name} added to watchlist!"
            watchlist = "Remove from watchlist"
    elif "close_listing" in request.POST:
        listing.is_closed = True
        listing.save()
    
    elif "comment" in request.POST:
        comment = Comment(
            text=request.POST["comment"],
            poster=request.user,
            listing=listing
            )
        comment.save()

    elif request.user.is_authenticated and listing in request.user.watchlist.all():
        watchlist = "Remove from watchlist"
    
    return render(request, "auctions/view_listing.html", {
        "listing": listing,
        "watchlist": watchlist,
        "message": message,
        "comments": listing.comments.all()
    })


def watchlist(request: HttpRequest):
    return render(request, "auctions/watchlist.html", {
        "watchlist": request.user.watchlist.all()
    })

def categories(request: HttpRequest):
    categories = Listing.objects.values_list("category", flat=True)
    return render(request, "auctions/categories.html", {
        "categories": set(categories)
    })
    