import requests
from bs4 import BeautifulSoup
from tkinter import *
import webbrowser
from PIL import ImageTk, Image
from urllib.request import urlopen
from io import BytesIO

#---------------------------------GUI---------------------------------------------------------------------------------------------
root = Tk()
#-----------------Title bar----------------
root.title("Flipkart Search Result")
root.iconbitmap('./icons/flipkart.ico')
#------------------------------------------

#----------------Logo and text display---------------------------------------
SearchLogo = ImageTk.PhotoImage(Image.open("./images/Flipkart_logo.png"))
LabelSearchLogo = Label(image=SearchLogo)
myLabel0 = Label(root, text="Search on flipkart here:")
myLabel0.config(font=("Courier", 40))
#----------------------------------------------------------------------------

#--------Input Field-------------
SearchBar = Entry(root, width=50, borderwidth=1, font=('Helvetica',15))
#--------------------------------

#---------Position in the grid--------
LabelSearchLogo.grid(column=1, row=0, columnspan=8)
myLabel0.grid(column=1, row=1, columnspan=8)
SearchBar.grid(column=1, row=2, columnspan=8)
#-------------------------------------

#-------------------------------------------------------Button function-------------------------------------------------------------
def onClick():
    #---------------------------------------------------Scraped-search--------------------------------------------------------------
    searchItem = SearchBar.get()
    url = "https://www.flipkart.com/search?q="+searchItem
    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
    headers = {"user-agent" : USER_AGENT}
    resp = requests.get(url, headers=headers)
    if resp.status_code == 200:
        soup = BeautifulSoup(resp.content, "html.parser")
    flag = True
    if soup.find('a', target='_blank'):
        link = "https://www.flipkart.com"+soup.find('a', target='_blank').get('href')
        response = requests.get(link, headers=headers)
        if resp.status_code == 200:
            linkSoup = BeautifulSoup(response.content, "html.parser")
        if linkSoup.find('h1'):
            Name = linkSoup.find('h1').get_text()
        else:
            Name = " No such product available "
        if linkSoup.find('div', class_='_1vC4OE _3qQ9m1'):
            Price = linkSoup.find('div', class_='_1vC4OE _3qQ9m1').get_text()
        else:
            Price = " - "
        if linkSoup.find('div', class_='hGSR34'):
            Rating = linkSoup.find('div', class_='hGSR34').get_text()
        else:
            Rating = " - "
        if linkSoup.find('div', class_='VGWI6T'):
            Offer = linkSoup.find('div', class_='VGWI6T').get_text()
        else:
            Offer = " - "
    else:
        Name = " No such product available "
        Price = " - "
        Rating = " - "
        Offer = " - "
        flag = False
    #---------------------------------------------------------------------------------------------------------------------------------
    #------------------------------------display-results------------------------------------------------------------------------------
    nameLabel = Label(root, text=Name, wraplength=400, justify='left')
    priceLabel = Label(root, text="Price : "+Price)
    ratingLabel = Label(root, text="Rating : "+Rating)
    offerLabel = Label(root, text="Offer : "+Offer)
    nameLabel.config(font=('helvetica',15,'bold'))
    offerLabel.config(font=(12))
    priceLabel.config(font=(12))
    ratingLabel.config(font=(12))
    nameLabel.grid(column=4, row=5, columnspan=2)
    offerLabel.grid(column=4, row=7, columnspan=2, pady=10)
    priceLabel.grid(column=4, row=8, columnspan=2)
    ratingLabel.grid(column=4, row=9, columnspan=2, pady=10)
    #----------------------------------------------------------------------------------------------------------------------------------
    def openLink():
        webbrowser.open(link)

    exitButton = Button(root, text="Exit", command=root.quit, padx=20, bg='#333', fg='white')
    exitButton.config(font=(14))
    if flag:
        linkButton = Button(root, text="Visit page", command=openLink, bg='green', fg='white')
        linkButton.config(font=(14))
        linkButton.grid(column=4, row=10)
        exitButton.grid(column=5, row=10, pady=20)
    else:
        exitButton.grid(column=4, row=10, columnspan=2, pady=20)
    #------------------------------------------------------image----------------------------------------------------------------------
    if flag:
        Img_url = linkSoup.find('div', class_='_2_AcLJ')
        if Img_url:
            print(Img_url.get('style')[21:].strip(')'))
            u = urlopen(Img_url.get('style')[21:].strip(')'))
            raw_data = u.read()
            u.close()
            im = Image.open(BytesIO(raw_data))
            photo = ImageTk.PhotoImage(im)
            imglabel = Label(image=photo)
            imglabel.image = photo
            imglabel.grid(column=4, row=4, columnspan=2)
        else:
            imglabel = Label(root, text="No Image Available")
            imglabel.grid(column=4, row=4, columnspan=2)
    else:
        imglabel = Label(root, text="No Image Available")
        imglabel.grid(column=4, row=4, columnspan=2)
    #---------------------------------------------------------------------------------------------------------------------------------
    def Labeldel():
        nameLabel.grid_forget()
        offerLabel.grid_forget()
        priceLabel.grid_forget()
        ratingLabel.grid_forget()
        imglabel.grid_forget()
        if flag:
            linkButton.grid_forget()
        exitButton.grid_forget()
        onClick()

    #MyButton.grid_forget()
    MyButton = Button(root, text="Search", command=Labeldel, bg='#333', fg='white')
    MyButton.config(font=(15))
    MyButton.grid(column=1, row=3, columnspan=8, pady=10)
#-------------------------------------------------------------------------------------------------------------------------------------

#-----------------------Search button------------------------------
MyButton = Button(root, text="Search", command=onClick, bg='#333', fg='white')
MyButton.config(font=(15))
MyButton.grid(column=1, row=3, columnspan=8, pady=10)
#------------------------------------------------------------------

root.mainloop()
#--------------------------------------------------------------------------------------------------------------------------------------"""