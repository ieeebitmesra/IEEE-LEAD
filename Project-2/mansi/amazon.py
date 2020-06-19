import requests
from bs4 import BeautifulSoup
import pandas as pd 
import tkinter as tk 
from tkinter import ttk
from PIL import ImageTk,Image
from io import BytesIO
import re



class Amazon:

    def callApi(self, search_text):
        #text=input("enter a product")
        text=search_text
        headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' } 
        res=requests.get("https://www.amazon.in/s?k="+text,headers=headers)
        soup=BeautifulSoup(res.text,"html.parser")
        name_product=[]
        price_product=[]
        #discount_prodcut=[]
        ratings_product=[]
        #bad_chars=[',',':']
        #information_product=[]
        bad_chars=[',','.',':']
        picture_product=[]
        names=soup.findAll(name="a",class_="a-link-normal a-text-normal")
        if names is not None:
            for name in names [0:2]:
                new_name=(name.text).replace('/n','')
                name_product.append(new_name)
                #name_product.append(name.text)
            else:
                name_product.append("unkown-product")
        #for name in names [0:5]:
            #name_product.append(name.text)

        Prices=soup.findAll(name="span",class_="a-offscreen")
        if Prices is not None:
            for price in Prices [0:2]:
                trim=re.compile(r'[^\d.,]+')    
                new_price=(price.text)
                pricee=trim.sub('',new_price)
                nn2=''.join(i for i in pricee if not i in bad_chars)
                in_new_price=float(nn2)
                price_product.append(in_new_price) 
            #tm=float(sub(r'[^0-9.]','',new_price))
        else:
            price_product.append("0") 
        ''' nn1=(price.text).split("\u0024")
                nn=''.join(i for i in nn1 if not i in bad_chars)
                nn2=''.join(i for i in nn if not i in bad_chars)
                nn3=float(nn2)
                print(type(nn3))
                price_product.append(nn3)  '''

            #print(type(new_price))
            #price_product.append(new_price)
        ratings=soup.find_all(name="span",class_="a-icon-alt")
        if ratings is not None:
            for rating in ratings[0:2]:
                ratings_product.append(rating.text)
        else:
            ratings_product.append("cant print")
        yelp=soup.findAll(name="img",class_="s-image")
        for y in yelp [0:4]:
            picture_product.append(y['src'])

        d={"name_of_the_product":name_product,"price_of_the_product":price_product,"rating of the product":ratings_product,"picture of the product":picture_product}
        df=pd.DataFrame.from_dict(d,orient='index')
        df=df.transpose()
        df=df.sort_values(by="price_of_the_product")
        #print(df)
        return df

        #df['ratings_product']=df['rating_product'].apply(lamba x: list(x.slpit()(0)))
        #df['rating_product']=pd.to_numeric(df['rating_product'])
        #print(df.transpose())

