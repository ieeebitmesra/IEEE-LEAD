import requests
import time
import urllib
from tkinter import *
from bs4 import BeautifulSoup
from io import BytesIO
from selenium import webdriver
from PIL import Image, ImageTk

root = Tk()
root.title("App2 - Flipkart Product Search")
root.iconbitmap(r'appicon.ico')
root.geometry("750x600")

#If picture part doesn't work just delete the picture part

def product_search():
    #Scraping Picture Part
    #change the below url where your chrome driver is installed
    browser = webdriver.Chrome("/Users/pc/Desktop/Python and GUI/chromedriver")
    browser.minimize_window()
    term = src.get()
    term = term.replace(" ", "+")
    browser.get(f"https://www.flipkart.com/search?q={term}")
    time.sleep(5)
    browser.maximize_window()
    time.sleep(5)
    browser.minimize_window()
    soup2 = BeautifulSoup(browser.page_source, "lxml")
    picture = soup2.find_all("img", attrs={"class": "_3togXc"})
    pic=[]
    for p in picture:
        pic.append(p['src'])
    # -----------------------------

    query = src.get()
    load = {'q': query}
    header = { 'User-Agent' : 'Mozilla/5.0 (x11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'}
    res = requests.get("https://www.flipkart.com/search", params = load, headers = header)
    soup1 = BeautifulSoup(res.content, 'html.parser')
    res_div = soup1.find_all('div', attrs={'class': re.compile('_1HmYoV _35HD7C')})
    
    product_links=[]
    product_names=[]
    product_prices=[]
    for ele1 in res_div:
        res_div_furt = ele1.find_all('div', attrs = {'class': re.compile('bhgxx2 col-12-12')}, style = False)
    for ele2 in res_div_furt:
        link = ele2.find_all('a', title=True)
        for i in link:
            product_links.append("https://www.flipkart.com"+i['href'])
            product_names.append(i['title'])
        price = ele2.find_all('div', attrs = {'class': '_1vC4OE'})
        for p in price:
            product_prices.append(p.text)
    

    if len(product_names)==0:
        for ele2 in res_div_furt:
            link = ele2.find_all('a', attrs = {'class':'_31qSD5'})
            for i in link:
                product_links.append("https://www.flipkart.com"+i['href'])
            name = ele2.find_all('div', attrs = {'class':'_3wU53n'})
            for n in name:
                product_names.append(n.text)
            price = ele2.find_all('div', attrs = {'class': re.compile('_1vC4OE _2rQ-NK')})
            for p in price:
                product_prices.append(p.text)
        
        #finding picture in second structure
        picture = soup2.find_all("img", attrs={"class": re.compile("_1Nyybr _30XEf0")})
        for p in picture:
            pic.append(p['src'])
        #--------------------------------------

    #Dispaying Scraped Image
    image_file = urllib.request.urlopen(pic[0])
    raw_data = image_file.read()
    image_file.close()
    im = Image.open(BytesIO(raw_data))
    photo = ImageTk.PhotoImage(im)
    Label3 = Label(root, image=photo)
    # -------------------------------

    Label1 = Label(root, text="Product's Name : "+product_names[0])
    Label2 = Label(root, text="Price of the Product : "+product_prices[0])
    Label4 = Label(root, text="Product's Link : ")
    Text1 = Text(root)
    Text1.insert(END, product_links[0])
    Label1.grid(row=3,column=0)
    Label2.grid(row=4,column=0)
    Label3.grid(row=5,column=0)
    Label4.grid(row=6,column=0)
    Text1.grid(row=7,column=0)
    
search = Label(root, text = "Flipkart Search")
search.grid(row=0 , column=0)
src = StringVar()
Entry1 = Entry(root, textvariable = src)
Entry1.grid(row=1 , column=0)
photo = PhotoImage(file="flipkart.png")
button1 = Button(root, image=photo, command=product_search)
button1.grid(row=2 , column=0)

root.mainloop()