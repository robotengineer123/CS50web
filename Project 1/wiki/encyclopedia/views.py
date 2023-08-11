from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import HttpRequest, HttpResponseRedirect
from django import forms
from django import forms
import markdown2 as md2
from . import util
from random import randint

class NewEntryForm(forms.Form):
    title = forms.CharField()
    text = forms.CharField(widget=forms.Textarea(attrs={"placeholder": 'Write your markdown article here!'}))

class EditEntryForm(forms.Form):
    text = forms.CharField(widget=forms.Textarea())


def index(request: HttpRequest):
    if not "q" in request.GET.keys():
        return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
        })
    
    query = request.GET["q"]
    md_content = util.get_entry(query)
    if md_content == None:
        results = []
        for entry in util.list_entries():
            if query.casefold() in entry.casefold():
                results.append(entry)
        return render(request, "encyclopedia/searchresults.html", {
            "entries": results
        })
    else:
        html_content = md2.markdown(md_content)
        return render(request, "encyclopedia/wikipage.html", {
            "title": query,
            "content": html_content
        })


def ShowEntry(request: HttpRequest, query: str):
    md_content = util.get_entry(query)
    if md_content == None:
        return render(request, "encyclopedia/404.html")
    else:
        html_content = md2.markdown(md_content)
        return render(request, "encyclopedia/wikipage.html", {
            "title": query,
            "content": html_content
        })

def NewPage(request: HttpRequest):
    if request.method != "POST":
        return render(request, "encyclopedia/new_page.html", {
        "exist_error": False,
        "form": NewEntryForm()
        })
    
    if util.get_entry(request.POST["title"]) != None:
        return render(request, "encyclopedia/new_page.html", {
            "exist_error": True,
            "form": NewEntryForm(request.POST)
        })
    
    util.save_entry(request.POST["title"], request.POST["text"])
    html_content = md2.markdown(request.POST["text"])
    return render(request, "encyclopedia/wikipage.html", {
        "title": request.POST["title"],
        "content": html_content
    })


def EditEntry(request: HttpRequest, query: str):
    if request.method == "POST":
        util.save_entry(query, request.POST["text"])
        return HttpResponseRedirect("/wiki/"+query)
    else:
        return render(request, "encyclopedia/edit_page.html", {
            "title": "Edit page",
            "content": util.get_entry(query),
        })
    

def RandomPage(request: HttpRequest):
    entries = util.list_entries()
    return redirect("wiki/" + entries[randint(0, len(entries)-1)])