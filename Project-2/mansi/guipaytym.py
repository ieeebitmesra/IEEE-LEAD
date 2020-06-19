import requests
from bs4 import BeautifulSoup
import pandas as pd 
import tkinter as tk 
from tkinter import ttk
from PIL import ImageTk,Image
from io import BytesIO
import re


def callApi(search_text):

    #def callApi(self,search_text):

        #text=input("search")
        text = search_text
        headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36' } 
        res=requests.get("https://paytmmall.com/shop/search?q="+str(text),headers=headers)
        soup=BeautifulSoup(res.text,"html.parser")
        name_product=[]
        price_product=[]
        original_price=[]
        #picture_product=[]
        discount_prodcut=[]
        bad_chars=[',',':']
        names=soup.findAll(name="div",class_="UGUy")
        if names is not None:
            for name in names [0:5]:
                new_name=(name.text).replace('/n','')
                name_product.append(new_name)
        else:
            name_product.append("unkown-product")
        Prices=soup.findAll(name="div",class_="_1kMS")
        if Prices is not None:
            for price in Prices [0:5]:#trim=re.compile(r'[^\d.,]+')    
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
        if Or_Prices is not None:
            for orprice in Or_Prices [0:2]:
                original_price.append(orprice.text)
        else:
            original_price.append(" ")
        discounts=soup.find_all(name="div",class_="dQm2")
        if discounts is not None:
            for discount in discounts[0:2]:
                discount_prodcut.append(discount.span.text)
        else:
            discount_prodcut.append(" ")
        
        #yelp=soup.findAll(name="img",class_="presentation")
        #for y in yelp [0:2]:
            #picture_product.append(y['src'])
        d={"name_of_the_product":name_product,"price_of_the_product":price_product,"original prices":original_price,"discount of the product":discount_prodcut}
        df=pd.DataFrame.from_dict(d,orient='index')
        df=df.transpose()
        df=df.sort_values(by="price_of_the_product")
        #print(df)
        return df

                #print(df.transpose())

root = tk.Tk()
root.configure(background="light blue")
root.geometry("820x636")
root.resizable(False,False)
label_head=tk.Label(root,text="PAYTYM MALL::COMPARATOR",bg="black",fg="white",font=("Times",18),width=35,relief="sunken")
label_head.grid(row=0,column=2,columnspan=1,pady=3)
root.title("Paytym")
#root.iconbitmap("C:\Users\Dell\Desktop\coding\web scraping example\pytymmall.png") 
#p1 = tk.PhotoImage(file = 'paytymmall.png') 
  
# Setting icon of master window 
#master.iconphoto(False, 'paytymmall.png') 

img=ImageTk.PhotoImage(Image.open("compare1.jpg"))
my_img= tk.Label(image=img)
my_img.grid(row=1,column=2,padx=250,pady=0,rowspan=1,sticky="nw")
label_pro=tk.Label(root,text="Enter Product name",width=20,bg="black",fg="white",padx=10,font=("Times",18),relief="sunken")
label_pro.grid(row=6,column=2,columnspan=1)

def myclass():
    df = callApi(ttext.get())
    show(df)
    
#button_find=tk.Button(root,text="click to find the data",bg="black",fg="white",width=30,pady=15,font=("Times",18),command=myclass)
#button_find.grid(row=7,columnspan=3)    

ttext= tk.Entry(root,width=40,bg="black",fg="white",font=("Times",10),relief="sunken")
ttext.grid(row=7,column=2,columnspan=1,padx=10,pady=3)

def show(df):
    # templist= [["mansi","19"],["mehek","19"]]
    # templist.sort(key=lambda e: e[1], reverse=True)
    templist = df.values.tolist()
    
    for  i,(name,price,original_price,Ratings) in enumerate(templist, start=1):
         listBox.insert("","end",values=(name,price,original_price,Ratings))    

cols=('Name','price','original_price','Ratings')
listBox = ttk.Treeview(root, columns=cols, show='headings')
for col in cols:
    listBox.heading(col, text=col)    
listBox.grid(row=8, column=0, columnspan=4,padx=7)


button_find=tk.Button(root,text="click to find the data",bg="black",fg="white",width=25,pady=5,font=("Times",18),command=myclass,relief="sunken",padx=50)
button_find.grid(row=9,column=2,columnspan=1,padx=3)
#button_nextitem=tk.Button(root,text="search for next item",bg="black",fg="white",width=30,pady=15,command=next,font=("Times",18))
#button_nextitem.grid(row=8,columnspan=3)
button_end=tk.Button(root,text="close the GUI",bg="black",fg="white",width=25,pady=5,command=root.quit,font=("Times",18),relief="sunken",padx=50)
button_end.grid(row=10,column=2,columnspan=1,padx=3)
root.mainloop()
