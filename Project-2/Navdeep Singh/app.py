import requests as rq
from bs4 import BeautifulSoup
from tkinter import *




window = Tk()
window.geometry("600x300")

def findGoogleLink():
    query = e_val.get()
    payload = {"q": query, 'num' : '20'}
    header = {'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'}
    
    
    r = rq.get("https://www.google.co.in/search", params=payload, headers=header)
    soup = BeautifulSoup(r.content, 'html.parser')
    result_div = soup.find_all('div', attrs = {'class': 'r'})
    links = []


    for r in result_div:
        try:
            link = r.find('a')
            if link != '': 
                links.append(link['href'])
        except:
            continue
    googleSearch = links[0]
    Flipkart(googleSearch)


def Flipkart(googleSearch):
    query = e_val.get()
    payload = {'q' : query}
    header = {'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'}
    
    
    r = rq.get("https://www.flipkart.com/search", params=payload, headers=header)
    soup = BeautifulSoup(r.content, 'html.parser')
    results_div = soup.find('div', attrs={'class' : re.compile('_3O0U0u')})


    for rd in results_div:
        price = rd.find('div', attrs = {'class' : re.compile('_1vC4OE')})
        break;

    if price!=None :
        priceText=price.getText()
    

    newPrice=""
    for character in priceText:
        if character =='0' or character =='1' or character =='2' or character =='3' or character =='4' or character =='5' or character =='6' or character =='7' or character =='8' or character =='9':
            newPrice+=character

    priceFlipkart = int(newPrice)


    for name in results_div:
        prodName=name.find('div', attrs = {'class' : re.compile('_3wU53n')})
        break;
    if prodName == None:
        for name in results_div:
            prodName=name.find('a', attrs = {'class' : re.compile('_2cLu-l')})
            break;


    if prodName !=None :
        prodNameFlipkart = prodName.getText()
    
    Amazon(googleSearch,prodNameFlipkart,priceFlipkart)


def Amazon(googleSearch,prodNameFlipkart,priceFlipkart):
    query = prodNameFlipkart
    header = {'User-Agent' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'}
    
    
    r = rq.get("https://www.amazon.in/s?k="+query, headers=header)
    soup = BeautifulSoup(r.content, 'html.parser')
    results_div = soup.find_all('div', attrs={'class' :re.compile('sg-col-4-of-12 sg-col-8-of-16 sg-col-16-of-24 sg-col-12-of-20 sg-col-24-of-32 sg-col sg-col-28-of-36 sg-col-20-of-28')})
    results_div_deep=[];
    

    for rd in results_div:
        results_div_deep.append(rd.find('span', attrs = {'class' : re.compile('a-price-whole')}))
    
    if len(results_div_deep)>0:
        results=""
        for result in results_div_deep:
            if result != None:
                results=result.getText()
                break


        newPrice=""
        for character in results:
            if character =='0' or character =='1' or character =='2' or character =='3' or character =='4' or character =='5' or character =='6' or character =='7' or character =='8' or character =='9':
                newPrice+=character

        priceAmazon = int(newPrice)


        if(priceAmazon<priceFlipkart):
            print("Amazon has a better deal")
        else:
            print("Flipkart has a better deal")
    
    else:
        print("Sorry product not available on amazon")
        priceAmazon=0

    
    display(googleSearch,prodNameFlipkart,priceFlipkart,priceAmazon)


def display(googleSearch,prodNameFlipkart,priceFlipkart,priceAmazon):
    googleLabel=Label(window,text="Know more at:")
    googleLabel.grid(row=1,column=0)

    googleLink=Label(window,text=googleSearch)
    googleLink.grid(row=2,column=0)

    shopLabel=Label(window,text="Shop at:")
    shopLabel.grid(row=3,column=0)

    flipkartLabel=Label(window,text="Flipkart")
    flipkartLabel.grid(row=4,column=0)

    flipkartDescription=Label(window,text=prodNameFlipkart)
    flipkartDescription.grid(row=5,column=0)

    flipkartPrice=Label(window,text=priceFlipkart)
    flipkartPrice.grid(row=6,column=0)

    AmazonLabel=Label(window,text="Amazon")
    AmazonLabel.grid(row=7,column=0)

    AmazonDescription=Label(window,text=prodNameFlipkart)
    AmazonDescription.grid(row=8,column=0)

    AmazonPrice=Label(window,text=priceAmazon)
    AmazonPrice.grid(row=9,column=0)

    if priceAmazon==0:
        prefer=Label(window,text="Sorry product not available at Amazon")
        link=Label(window,text="View more at:https://www.flipkart.com/search?q="+prodNameFlipkart)
        prefer.grid(row=10,column=0)
        link.grid(row=11,column=0)
    elif(priceAmazon<priceFlipkart):
        prefer=Label(window,text="Amazon has a better deal")
        link=Label(window,text="View more at:https://www.amazon.in/s?k="+prodNameFlipkart)
        prefer.grid(row=10,column=0)
        link.grid(row=11,column=0)
    else:
        prefer=Label(window,text="Flipkart has a better deal")
        link=Label(window,text="View more at:https://www.flipkart.com/search?q="+prodNameFlipkart)
        prefer.grid(row=10,column=0)
        link.grid(row=11,column=0)

e_val = StringVar()
e1 = Entry(window, textvariable = e_val)
b1 = Button(window, text="Search Item", command=findGoogleLink)
e1.grid(row=0, column=0)
b1.grid(row=0, column=3)
window.mainloop()