import requests
from bs4 import BeautifulSoup
import webbrowser
import pandas as pd
import glob
import tkinter as tk 
from tkinter import ttk
from PIL import ImageTk,Image
from io import BytesIO
import re

text=input("enter something::")
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' } 
res = requests.get("https://www.google.com/search?q="+' '.join(text))
soup=BeautifulSoup(res.text,"html.parser")
link_elements=soup.select('.kCrYT a')
link_length=min(1,len(link_elements))
for i in range(link_length):
   link=link_elements[i].get('href')
   x=input("you want to open the website enter 1 or you get the link::")
   if(x=='1'):
     webbrowser.open('https://google.com/'+link)
   else:
     print("The link is:::"+link)

print("THE DETAILS OF AMAZON::")

res=requests.get("https://www.amazon.in/s?k="+text,headers=headers)
soup=BeautifulSoup(res.text,"html.parser")
name_product_ama=[]
price_product_ama=[]
discount_prodcut_ama=[]
ratings_product_ama=[]
information_product_ama=[]
bad_chars=[',',':']
names=soup.findAll(name="a",class_="a-link-normal a-text-normal")
if names is not None:
    for name in names [0:5]:
        new_name=(name.text).replace('/n','')
        name_product_ama.append(new_name)
else:
    name_product_ama.append("unkown-product")
    #name_product_ama.append(name.text)
Prices=soup.findAll(name="span",class_="a-offscreen")
#for price in Prices [0:5]:
    #price_product_ama.append(price.text)
#if Prices is not None:
if Prices is not None:
    for price in Prices [0:5]:
        trim=re.compile(r'[^\d.,]+')    
        new_price=(price.text)
        pricee=trim.sub('',new_price)
        nn2=''.join(i for i in pricee if not i in bad_chars)
        in_new_price=float(nn2)
        price_product_ama.append(in_new_price) 
            #tm=float(sub(r'[^0-9.]','',new_price))
else:
        price_product_ama.append("0")    
ratings=soup.find_all(name="span",class_="a-icon-alt")
for rating in ratings[0:5]:
    ratings_product_ama.append(rating.text)
d={"name of the product":name_product_ama,"price of the product":price_product_ama,"rating of the product":ratings_product_ama}
df=pd.DataFrame.from_dict(d,orient='index')
#df=df.sort_values(by='price of the product',ascending=True)
print(df.transpose())
print(df.to_csv("amazonfinal.csv", index=False,encoding="utf-8"))



print("THE DETAILS FOR EBAY::")
res=requests.get("https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw="+text,headers=headers)
soup=BeautifulSoup(res.text,"html.parser")
name_product_ebay=[]
price_product_ebay=[]
bad_chars=[',','.',':']
names=soup.findAll(name="h3",class_="s-item__title s-item__title--has-tags")
#for name in names [0:5]:
    #name_product_ebay.append(name.text)
if names is not None:
    for name in names [0:5]:
        name_product_ebay.append(name.text)
    else:
        name_product_ebay.append("unkown-product")

Prices=soup.findAll(name="span",class_="s-item__price")
#for price in Prices [0:5]:
if Prices is not None:
        #flag="False"
    for price in Prices [0:5]:
        new_price=price.text
        nn1=new_price.split("INR")
        nn=''.join(i for i in nn1 if not i in bad_chars)
        nn2=''.join(i for i in nn if not i in bad_chars)
        nn3=float(nn2)
        #print(type(nn3))
        price_product_ebay.append(nn3)  
else:
    price_product_ebay.append("0") 
    #price_product_ebay.append(price.text)
d={"name_of_the_product":name_product_ebay,"price_of_the_product":price_product_ebay}
df=pd.DataFrame.from_dict(d,orient='index')
print(df.transpose())
print(df.to_csv("ebayfinal.csv", index=False,encoding="utf-8"))


print("THE DETAILS FOR FLIPKART::")

res=requests.get("https://www.flipkart.com/search?q="+text,headers=headers)
soup=BeautifulSoup(res.text,"html.parser")
name_product_flip=[]
price_product_flip=[]
discount_prodcut_flip=[]
ratings_product_flip=[]
#information_product_flip=[]
bad_chars=[',',':']
#response = requests.get("https://rukminim1.flixcart.com/image/880/1056/jrtj2q80/wallet-card-wallet/y/b/g/beige-slider-casuel-wallet-samtroh-original-imafdg9ymwdzfwea.jpeg?q=50")
#img2=Image.open(BytesIO(response.content))
#print(img2)
#img=ImageTk.PhotoImage(img2)
#dprint(img)
names=soup.findAll(name="a",class_="_2cLu-l")
if names is not None:
    for name in names [0:5]:
        new_name=(name.text).replace('/n','')
        name_product_flip.append(new_name)
else:
    name_product_flip.append("unkown-product")
#for name in names [0:5]:
    #name_product_flip.append(name.text)
Prices=soup.findAll(name="div",class_="_1vC4OE")
#for price in Prices [0:5]:
    #price_product_flip.append(price.text)
if Prices is not None:
    for price in Prices [0:5]:
        trim=re.compile(r'[^\d.,]+')    
        new_price=(price.text)
        pricee=trim.sub('',new_price)
        price_product_flip.append(pricee) 
            #tm=float(sub(r'[^0-9.]','',new_price))
else:
    price_product_flip.append("0")

discounts=soup.find_all(name="div", class_="VGWI6T")
for discount in discounts[0:5]:
    discount_prodcut_flip.append((discount).find("span").text)
ratings=soup.find_all(name="div",class_="hGSR34")
for rating in ratings[0:5]:
    ratings_product_flip.append(rating.text)
#information=soup.find_all(name="div",class_="_1rcHFq")
#for info in information[0:5]:
    #information_product_flip.append(info.text)

d={"name_of_the_product":name_product_flip,"price_of_the_product":price_product_flip,"Discount on the product":discount_prodcut_flip,"rating of the product":ratings_product_flip}
df=pd.DataFrame.from_dict(d,orient='index')
print(df.transpose())
print(df.to_csv("flipkartfinal.csv", index=False,encoding="utf-8"))


print("DETAILS FOR PAYTYM MALL::")


res=requests.get("https://paytmmall.com/shop/search?q="+str(text),headers=headers)
soup=BeautifulSoup(res.text,"html.parser")
name_product_pay=[]
price_product_pay=[]
original_price_pay=[]
discount_prodcut_pay=[]
bad_chars=[',',':']
names=soup.findAll(name="div",class_="UGUy")
#names=soup.findAll(name="div",class_="UGUy")
if names is not None:
    for name in names [0:5]:
        new_name=(name.text).replace('/n','')
        name_product_pay.append(new_name)
else:
    name_product_pay.append("unkown-product")
#for name in names [0:5]:
    #name_product_pay.append(name.text)
Prices=soup.findAll(name="div",class_="_1kMS")
if Prices is not None:
    for price in Prices [0:5]:#trim=re.compile(r'[^\d.,]+')    
        new_price=(price.span.text)
        nn2=''.join(i for i in new_price if not i in bad_chars)
        in_new_price=float(nn2)
        #print(type(in_new_price))
                            #pricee=trim.sub('',new_price)
        price_product_pay.append(in_new_price) 
                    #tm=float(sub(r'[^0-9.]','',new_price))
else:
    price_product_pay.append(" ") 
                #for price in Prices [0:5]:
#for price in Prices [0:5]:
    #price_product_pay.append(price.span.text)
Or_Prices=soup.findAll(name="div",class_="dQm2")
for orprice in Or_Prices [0:5]:
    original_price_pay.append(orprice.text)
discounts=soup.find_all(name="div",class_="dQm2")
for discount in discounts[0:5]:
    discount_prodcut_pay.append(discount.span.text)

d={"name of the product":name_product_pay,"original prices":original_price_pay,"price of the product":price_product_pay,"discount of the product":discount_prodcut_pay}
df=pd.DataFrame.from_dict(d,orient='index')
print(df.transpose())
df.to_csv("paytymfinal.csv",encoding="utf8")

print("if you want to close press a number")
input("enter the number")
'''extension='csv'
all_filenames=[i for i in glob.glob('*.{}'.format(extension))]
combined_csv=pd.concat([pd.read_csv(f) for f in  all_filenames ])
print(combined_csv.to_csv("combined_csv.csv",encoding="utf-8"))'''
