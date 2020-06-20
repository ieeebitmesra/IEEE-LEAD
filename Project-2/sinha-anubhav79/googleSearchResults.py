import requests
from bs4 import BeautifulSoup
from tkinter import *
import webbrowser
from PIL import ImageTk, Image

#---------------------------------GUI---------------------------------------------------------------------------------------------
root = Tk()
#-----------------Title bar----------------
root.title("Google Search Result")
root.iconbitmap('./icons/google-logo.ico')
#------------------------------------------

#----------------Logo and text display---------------------------------------
SearchLogo = ImageTk.PhotoImage(Image.open("./images/googleSearchImage.png"))
LabelSearchLogo = Label(image=SearchLogo)
myLabel0 = Label(root, text="Google Search here:")
myLabel0.config(font=("Courier", 40))
#----------------------------------------------------------------------------

#--------Input Field-------------
SearchBar = Entry(root, width=50, borderwidth=1, font=('Helvetica',15))
#--------------------------------

#---------Position in the grid--------
LabelSearchLogo.grid(column=1, row=0)
myLabel0.grid(column=1, row=1)
SearchBar.grid(column=1, row=2)
#-------------------------------------

#-------------------------------------------------------Button function-------------------------------------------------------------
def onClick():
    #---------------------------------------------------Scraped-search--------------------------------------------------------------
    searchItem = SearchBar.get()
    url = "https://www.google.co.in/search?q="+searchItem
    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
    headers = {"user-agent" : USER_AGENT}
    resp = requests.get(url, headers=headers)
    if resp.status_code == 200:
        soup = BeautifulSoup(resp.content, "html.parser")
    flag = True
    anchor = soup.find('div', class_='r')
    if anchor:
        link = anchor.find('a')['href']
    else:
        flag = False
    #---------------------------------------------------------------------------------------------------------------------------------
    if flag:
        TitleLabel = Label(root, text=anchor.find('h3').get_text(), fg='blue')
        LinkLabel = Label(root, text=anchor.find('cite').get_text(), fg='purple')
        DescriptionLabel = Label(root, text=soup.find('div', class_='s').get_text(), wraplength=1200, justify='left')
    else:
        TitleLabel = Label(root, text="No Results", fg='blue')
        LinkLabel = Label(root, text="Ooops!!", fg='purple')
        DescriptionLabel = Label(root, text="Please check the keyword you entered, and try again.", wraplength=1200, justify='left')
    
    TitleLabel.config(font=("sans-serif", 30))
    LinkLabel.config(font=(27))
    DescriptionLabel.config(font=(18))

    def openLink():
        webbrowser.open_new(link)
    
    TitleLabel.grid(column=1, row=4, sticky="W", pady=0)
    LinkLabel.grid(column=1, row=5, sticky="W", pady=0)
    DescriptionLabel.grid(column=1, row=6, sticky="W", pady=0)

    linkButton = Button(root, text="Visit page", command=openLink, bg='green', fg='white', borderwidth=2)
    linkButton.config(font=(14))
    linkButton.grid(column=1, row=7, pady=10)

    def Labeldel():
        TitleLabel.grid_forget()
        LinkLabel.grid_forget()
        DescriptionLabel.grid_forget()
        onClick()

    MyButton = Button(root, text="I'm Feeling Lucky", command=Labeldel, bg='#333', fg='white', borderwidth=5)
    MyButton.config(font=(15))
    MyButton.grid(column=1, row=3, pady=10)

    exitButton = Button(root, text="Exit", command=root.quit, padx=20, bg='#333', fg='white', borderwidth=2)
    exitButton.config(font=(14))
    exitButton.grid(column=1, row=9, pady=10)
#-------------------------------------------------------------------------------------------------------------------------------------

#-----------------------Search button------------------------------
MyButton = Button(root, text="I'm Feeling Lucky", command=onClick, bg='#333', fg='white', borderwidth=5)
MyButton.config(font=(15))
MyButton.grid(column=1, row=3, pady=10)
#------------------------------------------------------------------

root.mainloop()
#--------------------------------------------------------------------------------------------------------------------------------------"""