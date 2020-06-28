import requests
from bs4 import BeautifulSoup
from tkinter import *
import webbrowser
from PIL import ImageTk, Image

root = Tk()

root.title("Google Search Result")

Label1 = Label(root, text="Google Search here:")
Label1.config(font=("Serif", 20))

SearchBar = Entry(root, width=60)

Label1.grid(column=1, row=1)
SearchBar.grid(column=1, row=2)

def GoogleSearch():

    searchItem = SearchBar.get()
    url_google = "https://www.google.co.in/search?q="+searchItem
    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
    headers = {"user-agent" : USER_AGENT}
    respGoogle = requests.get(url_google, headers=headers)
    if respGoogle.status_code == 200:
        soup = BeautifulSoup(respGoogle.content, "html.parser")
    GoogleSearch = soup.find('div', class_='r')
    if GoogleSearch:
        SearchLink = GoogleSearch.find('a')['href']

    LinkHeadingLabel = Label(root, text=GoogleSearch.find('h3').get_text(), fg='black')
    LinkHeadingLabel.config(font=("sans-serif", 15))
    LinkDescriptionLabel = Label(root, text=soup.find('div', class_='s').get_text(), wraplength=800, justify='center')
    LinkDescriptionLabel.config(font=(18))
    LinkHeadingLabel.grid(column=1, row=4)
    LinkDescriptionLabel.grid(column=1, row=5)
    def OpenLink():
        webbrowser.open(SearchLink)
    LinkButton = Button(root, text="Visit page", command=OpenLink, bg='blue', fg='white')
    LinkButton.config(font=(15))
    LinkButton.grid(column=1, row=6)

    def OpenMoreSuggestions():
        webbrowser.open(url_google)
    MoreSuggestionsButton = Button(root, text="Not this? Click here to visit Google", command=OpenMoreSuggestions, bg='grey', fg='white')
    MoreSuggestionsButton.config(font=(15))
    MoreSuggestionsButton.grid(column=1, row=7)

    MyButton.grid_forget()
    ExitButton = Button(root, text="Exit", command=root.quit, bg='black', fg='white')
    ExitButton.config(font=(15))
    ExitButton.grid(column=1, row=9)

#Search
MyButton = Button(root, text="Search", command=GoogleSearch, bg='black', fg='white')
MyButton.config(font=(15))
MyButton.grid(column=1, row=3)

root.mainloop()
