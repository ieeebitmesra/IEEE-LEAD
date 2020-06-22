import requests
from bs4 import BeautifulSoup
from tkinter import *
import webbrowser
from PIL import ImageTk, Image

root = Tk()

root.title("Compare prices of products")

L1 = Label(root, text="Enter name of product:")

SearchBar = Entry(root, width=60)

L1.grid(column=1, row=1, columnspan=2)
L1.config(font=("piedra", 20))
SearchBar.grid(column=1, row=2, columnspan=2)

def Run():
    SearchItem = SearchBar.get()
    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
    headers = {"user-agent" : USER_AGENT}

    #Amazon

    url_amazon = "https://www.amazon.in/s?k="+SearchItem
    respAmazon = requests.get(url_amazon, headers=headers)
    if respAmazon.status_code == 200:
        soupAmazon = BeautifulSoup(respAmazon.content, "html.parser")

    ProductAmazon = soupAmazon.find('a', class_='a-link-normal a-text-normal')
    if ProductAmazon :
        link_amazon = "https://www.amazon.in"+ProductAmazon.get('href')

    amazonName = ProductAmazon.find('span').get_text()
    amazonPrice = soupAmazon.find('span', class_='a-offscreen')

    # Flipkart
    searchItem = SearchBar.get()
    url_flipkart = "https://www.flipkart.com/search?q="+SearchItem
    respFlipkart = requests.get(url_flipkart, headers=headers)
    if respFlipkart.status_code == 200:
        soupFlipkart = BeautifulSoup(respFlipkart.content, "html.parser")

    link_flipkart = "https://www.flipkart.com"+soupFlipkart.find('a', target='_blank').get('href')
    response = requests.get(link_flipkart, headers=headers)
    if response.status_code == 200:
       linkSoup = BeautifulSoup(response.content, "html.parser")

    FlipkartName = linkSoup.find('h1').get_text()
    FlipkartPrice = linkSoup.find('div', class_='_1vC4OE _3qQ9m1').get_text()

    # Amazonproduct
    def Website_Amazon():
        webbrowser.open(url_amazon)

    def AmazonLink():
        webbrowser.open(link_amazon)

    AmazonLabel = Label(root, text="Product on Amazon", justify='center')
    AmazonName = Label(root, text=amazonName, wraplength=400, justify='center')
    AmazonPrize = Label(root, text="Price : "+amazonPrice.get_text(), justify='center')
    AmazonLabel.grid(column=1,row=4)
    AmazonName.grid(column=1, row=5)
    AmazonPrize.grid(column=1, row=6)

    Amazon_Link = Button(root, text="View product", command=AmazonLink, bg='blue', fg='white')
    Amazon_Link.grid(column=1, row=7)

    Amazon_website = Button(root, text="Not this? Click here to visit website", command=Website_Amazon, bg='blue', fg='white')
    Amazon_website.grid(column=1, row=8)

    # Flipkartproduct
    def FlipkartLink():
        webbrowser.open(link_flipkart)

    def Website_Flipkart():
        webbrowser.open(url_flipkart)

    FlipkartLabel = Label(root, text="Product on Flipkart", justify='center')
    FlipkartName = Label(root, text=FlipkartName, wraplength=400, justify='center')
    FlipcartPrice = Label(root, text="Price : "+FlipkartPrice, justify='center')

    FlipkartLabel.grid(column=2, row=4)
    FlipkartName.grid(column=2, row=5)
    FlipcartPrice.grid(column=2, row=6)

    Flipkart_Link = Button(root, text="View product", command=FlipkartLink, bg='blue', fg='white')
    Flipkart_Link.grid(column=2, row=7)

    FlipkartMoreSuggestionsButton = Button(root, text="Not this? Click here to visit website ", command=Website_Flipkart, bg='blue', fg='white')
    FlipkartMoreSuggestionsButton.grid(column=2, row=8)

    CompareButton.grid_forget()
    ExitButton = Button(root, text="Exit", command=root.quit, padx=20, bg='black', fg='white', justify='center')
    ExitButton.grid(column=1, row=10, columnspan=2)


# Search
CompareButton = Button(root, text="Compare",  command=Run, bg='black', fg='white')
CompareButton.config(font=(15))
CompareButton.grid(column=1, row=3, columnspan=2)

root.mainloop()
