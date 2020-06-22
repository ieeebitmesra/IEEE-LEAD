import requests
from bs4 import BeautifulSoup
from tkinter import *
import webbrowser
from PIL import ImageTk, Image

root = Tk()

root.title("Google Search")

L1 = Label(root, text="What do you want to search:")
L1.config(font=("Serif", 20))

SearchBar = Entry(root, width=60)

L1.grid(column=1, row=1)
SearchBar.grid(column=1, row=2)

def Google_Search():

    searchItem = SearchBar.get()
    url_google = "https://www.google.co.in/search?q="+searchItem
    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
    headers = {"user-agent" : USER_AGENT}

    responseGoogle = requests.get(url_google, headers=headers)
    if responseGoogle.status_code == 200:
        soup = BeautifulSoup(responseGoogle.content, "html.parser")

    Google_Search = soup.find('div', class_='r')

    if Google_Search:
        SearchLink = Google_Search.find('a')['href']

    def OpenLink():
        webbrowser.open(SearchLink)

    def Openurl():
        webbrowser.open(url_google)

    Link_Heading = Label(root, text=Google_Search.find('h3').get_text(), fg='black')
    Link_Heading.config(font=("sans-serif", 15))

    Link_Description = Label(root, text=soup.find('div', class_='s').get_text(), wraplength=800, justify='center')
    Link_Description.config(font=(18))
    Link_Heading.grid(column=1, row=4)
    Link_Description.grid(column=1, row=5)

    Link_Button = Button(root, text="View page", command=OpenLink, bg='blue', fg='white')
    Link_Button.config(font=(15))
    Link_Button.grid(column=1, row=6)

    search_google = Button(root, text="Not this? Click here to visit Google", command=Openurl, bg='grey', fg='white')
    search_google.config(font=(15))
    search_google.grid(column=1, row=7)

    MyButton.grid_forget()
    ExitButton = Button(root, text="Exit", command=root.quit, bg='black', fg='white')
    ExitButton.config(font=(15))
    ExitButton.grid(column=1, row=9)

#Searching
MyButton = Button(root, text="Search", command=Google_Search, bg='black', fg='white')
MyButton.config(font=(15))
MyButton.grid(column=1, row=3)

root.mainloop()
