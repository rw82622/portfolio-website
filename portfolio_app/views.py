from django.shortcuts import render
import requests
from requests_oauthlib import OAuth1
from dotenv import load_dotenv
import os
import json


def index(request):
    return render(request, 'portfolio_app/index.html')

def projects(request):
    return render(request, 'portfolio_app/projects.html')

def skills(request):
    return render(request, 'portfolio_app/skills.html')

def number_guessing_game(request):
    return render(request, 'portfolio_app/numberGuess.html')


#ECommerce views
my_path = os.path.abspath(os.path.dirname(__file__))
file_path = os.path.join(my_path, "./data/inventory.json")
# get store items information from the inventory.json file
with open(file_path) as f:
    data = json.load(f)
    content = {"inventory": data}
    
# send store item info to be displayed on the Home Page
def e_commerce(request):
    return render(request, 'portfolio_app/eCommerce.html', content)

# send store item info to be displayed on the Footwear (Category) Page
def footwear(request):
    return render(request, 'portfolio_app/footwear.html', content)

# send store item info to be displayed on the Fitness (Category) Page
def fitness(request):
    return render(request, 'portfolio_app/fitness.html', content)

# send store item info to be displayed on the Electronics (Category) Page
def electronics(request):
    return render(request, 'portfolio_app/electronics.html', content)

# send store item info to be displayed on the Books (Category) Page
def books(request):
    return render(request, 'portfolio_app/books.html', content)

# allow user to search for an item by name.
def search(request):
    # show user the search page
    if request.method == 'GET':
        return render(request, 'portfolio_app/search.html')
    # check if the product the user searched for is available in the store
    elif request.method == 'POST':
        result = []
        search_item = request.POST.get('name').lower()
        with open(file_path) as f:
            data = json.load(f)
            for key in data:
                for item in data[key]:
                    item_name = item['name'].lower()
                    if item_name.find(search_item) >= 0:
                        result.append(item)
            # send the product to the searchResult page to be displayed if it's available
            if len(result) > 0:
                content = {'data': result}
                return render(request, 'portfolio_app/searchResult.html', content)
            # if the product is not available, get an image of it from the noun project api and send it to the frontend
            else:
                load_dotenv()
                auth = OAuth1(os.environ['apiKey'], os.environ['apiSecret'])
                endpoint = f"http://api.thenounproject.com/icon/{search_item}"

                response = requests.get(endpoint, auth=auth)
                data = {'response': json.loads(response.content)}
                return render(request, 'portfolio_app/outOfStock.html', data)