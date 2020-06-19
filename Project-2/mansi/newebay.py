import requests 
from bs4 import BeautifulSoup
import pandas as pd
import tkinter as tk 
from tkinter import ttk
from PIL import ImageTk,Image
from io import BytesIO



class Ebay:
   
    def callApi(self, search_text):
        
        # text=input("enter something")
        text = search_text
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' } 
        res=requests.get("https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw="+text,headers=headers)
        soup=BeautifulSoup(res.text,"html.parser")
        #response = requests.get("https://i.ebayimg.com/images/g/MacAAOSwWI1eIQc2/s-l500.jpg")
        #img2=Image.open(BytesIO(response.content))
        #img=ImageTk.PhotoImage(img2)
        
            
        name_product=[]
        price_product=[]
        picture_product=[]
        bad_chars=[',',':']
        names=soup.findAll(name="h3",class_="s-item__title s-item__title--has-tags")
        if names is not None:
            for name in names [0:2]:
                new_name=(name.text).replace('/n','')
                name_product.append(new_name)
                #name_product.append(name.text)
            else:
                name_product.append("unkown-product")

        yelp=soup.findAll(name="img",class_="s-item__image-img")
        for y in yelp [0:2]:
            picture_product.append(y['src'])
        Prices=soup.findAll(name="span",class_="s-item__price")
        if Prices is not None:
            #flag="False"
            for price in Prices [0:2]:
                new_price=price.text
                nn1=new_price.split("INR")
                nn=''.join(i for i in nn1 if not i in bad_chars)
                nn2=''.join(i for i in nn if not i in bad_chars)
                nn3=float(nn2)
                print(type(nn3))
                price_product.append(nn3)  
        else:
            price_product.append("0") 
        

        #hiddenPic = picture_product[0]
        
        d={"name_of_the_product":name_product,"price_of_the_product":price_product,"picture of the produt":picture_product}
        df=pd.DataFrame.from_dict(d,orient='index')
        df=df.transpose()
        df=df.sort_values(by="price_of_the_product")
        #print(df)
        return df

