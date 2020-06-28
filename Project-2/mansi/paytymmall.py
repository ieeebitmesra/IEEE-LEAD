import requests
from bs4 import BeautifulSoup
import pandas as pd 
import tkinter as tk 
from tkinter import ttk
from PIL import ImageTk,Image
from io import BytesIO
import re


class Paytym:

    def callApi(self,search_text):

        #text=input("search")
        text = search_text
        headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' } 
        res=requests.get("https://paytmmall.com/shop/search?q="+str(text),headers=headers)
        soup=BeautifulSoup(res.text,"html.parser")
        name_product=[]
        price_product=[]
        original_price=[]
        picture_product=[]
        discount_prodcut=[]
        bad_chars=[',',':']
        names=soup.findAll(name="div",class_="UGUy")
        if names is not None:
            for name in names [0:2]:
                new_name=(name.text).replace('/n','')
                name_product.append(new_name)
        else:
            name_product.append("unkown-product")
        Prices=soup.findAll(name="div",class_="_1kMS")
        if Prices is not None:
            for price in Prices [0:2]:#trim=re.compile(r'[^\d.,]+')    
                new_price=(price.span.text)
                nn2=''.join(i for i in new_price if not i in bad_chars)
                in_new_price=float(nn2)
                print(type(in_new_price))
                            #pricee=trim.sub('',new_price)
                price_product.append(in_new_price) 
                    #tm=float(sub(r'[^0-9.]','',new_price))
        else:
                price_product.append(" ") 
                #for price in Prices [0:5]:
                    #price_product.append(price.span.text)
        Or_Prices=soup.findAll(name="div",class_="dQm2")
        for orprice in Or_Prices [0:2]:
            original_price.append(orprice.text)
        discounts=soup.find_all(name="div",class_="dQm2")
        for discount in discounts[0:2]:
            discount_prodcut.append(discount.span.text)
        yelp=soup.findAll(name="img",class_role="presentation")
        for y in yelp [0:2]:
            picture_product.append(y['src'])
        d={"name_of_the_product":name_product,"price_of_the_product":price_product,"original prices":original_price,"discount of the product":discount_prodcut,"picture of the produt":picture_product}
        df=pd.DataFrame.from_dict(d,orient='index')
        df=df.transpose()
        df=df.sort_values(by="price_of_the_product")
        #print(df)
        return df

                #print(df.transpose())

