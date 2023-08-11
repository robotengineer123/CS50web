from django.shortcuts import render

from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def ShowEntry(request: HttpRequest, query: str):
    md_content = util.get_entry(query)
    breakpoint()
    html_content = md2.markdown(md_content)
    if md_content == None:
        pass
    else:
        return render(request, "encyclopedia/wikipage.html", {
            "title": query,
            "content": html_content
        })
