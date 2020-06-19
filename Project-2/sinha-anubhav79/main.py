from tkinter import *
from PIL import ImageTk, Image
import os

#---------------------------------GUI---------------------------------------------------------------------------------------------
root = Tk()
#-----------------Title bar----------------
root.title("Web Scraping project IEEE LEAD")
root.iconbitmap('./icons/IEEE.ico')
#------------------------------------------

#----------------Logo display---------------------------------------
Logo = ImageTk.PhotoImage(Image.open("./images/webScraping.jpeg"))
LabelLogo = Label(image=Logo)
LabelLogo.grid(column=1, row=0, columnspan=3, pady=10)
#----------------------------------------------------------------------------

#-------------------------------------------------------Button function------------------------------------------------------------
def openGSR():
    os.system('python googleSearchResults.py')

def openFSR():
    os.system('python FlipkartSearchResult.py')

def openPC():
    os.system('python PriceCompare.py')
#----------------------------------------------------------------------------------------------------------------------------------

#------------------------------------------------Program-logo----------------------------------------------------------------------
GSRLogo = ImageTk.PhotoImage(Image.open("./images/googleSearchImage_.png"))
FSRLogo = ImageTk.PhotoImage(Image.open("./images/Flipkart_logo_.png"))
PCLogo = ImageTk.PhotoImage(Image.open("./images/e-commerce.png"))

LabelGSRLogo = Label(image=GSRLogo)
LabelFSRLogo = Label(image=FSRLogo)
LabelPCLogo = Label(image=PCLogo)

LabelGSRLogo.grid(column=1, row=3)
LabelFSRLogo.grid(column=2, row=3)
LabelPCLogo.grid(column=3, row=3)
#----------------------------------------------------------------------------------------------------------------------------------

#------------------------------------------------------Buttons---------------------------------------------------------------------
GSRButton = Button(root, text="Google Search Results", command=openGSR, bg='#333', fg='white', borderwidth=5)
GSRButton.config(font=(15))
GSRButton.grid(column=1, row=4, pady=10)

FSRButton = Button(root, text="Flipkart Search Results", command=openFSR, bg='#333', fg='white', borderwidth=5)
FSRButton.config(font=(15))
FSRButton.grid(column=2, row=4, pady=10)

PCButton = Button(root, text="Price Comapre", command=openPC, bg='#333', fg='white', borderwidth=5)
PCButton.config(font=(15))
PCButton.grid(column=3, row=4, pady=10)

exitButton = Button(root, text="Exit", command=root.quit, padx=20, bg='#333', fg='white', borderwidth=2)
exitButton.config(font=(14))
exitButton.grid(column=1, row=6, pady=10, columnspan=3)
#----------------------------------------------------------------------------------------------------------------------------------

root.mainloop()
#--------------------------------------------------------------------------------------------------------------------------------------