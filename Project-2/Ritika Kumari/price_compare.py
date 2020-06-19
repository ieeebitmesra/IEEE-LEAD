import tkinter as tk
import requests, webbrowser
from bs4 import BeautifulSoup
import pandas as pd
from PIL import Image, ImageTk

headers={"User-Agent":'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'}
root=tk.Tk()
root.title("Compare prices from different e-commerce websites")
root.geometry("1350x695+0+0")
root.resizable(False,False)
root.configure(bg='black')

def Click():
    global user_input
    user_input=userinput.get()
    google_search=requests.get("https://www.google.com/search?q="+user_input)
    soup=BeautifulSoup(google_search.text,'html.parser')
    search_results=soup.select('.kCrYT a')
    global actual_link
    for link in search_results[0:1]:
        actual_link=link.get('href')
    label2=tk.Label(canvas,text="To view the first google search result for your item ",font=("Goudy old",15,"bold"),bg="black",fg="deeppink")
    label2.place(x=330,y=110)
    button2=tk.Button(canvas,text="Click here",bg="deeppink",command=lambda:price.Click2(actual_link))
    button2.place(x=830,y=110)

class price():
    def Click2(self):
        webbrowser.open('https://google.com/'+self)
        label3=tk.Label(canvas,text="Let's view the first flipkart result for your item,please specify the type for better results",font=("Goudy old",15,"bold"),bg="black",fg="green2")
        label3.place(x=260,y=140)
        flipkart_search=requests.get("https://www.flipkart.com/search?q="+user_input,headers=headers)
        global page_soup
        page_soup=BeautifulSoup(flipkart_search.text,'html.parser')
        button3=tk.Button(canvas,text="Electronics",bg="green2",command=lambda:price.elect())
        button3.place(x=330,y=180)
        button4=tk.Button(canvas,text="Clothing and Footwear",bg="green2",command=lambda:price.cloth())
        button4.place(x=550,y=180)
        button5=tk.Button(canvas,text="Books,toys, and More",bg="green2",command=lambda:price.sports())
        button5.place(x=830,y=180)


    def elect():
        global price
        price=page_soup.find("div",{"class":"_1vC4OE"}).get_text()
        name=page_soup.find("div",{"class":"_3wU53n"}).get_text()
        tk.Label(canvas,text="PRODUCT NAME",font=("Goudy old",15,"bold"),bg="black",fg="green2").place(x=500,y=210)
        tk.Label(canvas,text="PRICE",font=("Goudy old",15,"bold"),bg="black",fg="green2").place(x=1000,y=210)
        label4=tk.Label(canvas,text=price,font=("Goudy old",15,"bold"),bg="black",fg="green2")
        label4.place(x=1000,y=240)
        label5=tk.Label(canvas,text=name,font=("Goudy old",15,"bold"),bg="black",fg="green2")
        label5.place(x=200,y=240)
        label7=tk.Label(canvas,text="To view first 7 search results for your product from amazon",font=("Goudy old",15,"bold"),bg="black",fg="firebrick1")
        label7.place(x=250,y=280)
        button6=tk.Button(canvas,text="Click here",bg="firebrick1",command=lambda:price2.amazon())
        button6.place(x=880,y=280)


    def cloth():
        global price
        price=page_soup.find("div",{"class":"_1vC4OE"}).get_text()
        name=page_soup.find("a",{"class":"_2mylT6"}).get_text()
        tk.Label(canvas,text="PRODUCT NAME",font=("Goudy old",15,"bold"),bg="black",fg="green2").place(x=500,y=210)
        tk.Label(canvas,text="PRICE",font=("Goudy old",15,"bold"),bg="black",fg="green2").place(x=1000,y=210)
        label4=tk.Label(canvas,text=price,font=("Goudy old",15,"bold"),bg="black",fg="green2")
        label4.place(x=1000,y=240)
        label5=tk.Label(canvas,text=name,font=("Goudy old",15,"bold"),bg="black",fg="green2")
        label5.place(x=200,y=240)
        label7=tk.Label(canvas,text="To view first 7 search results for your product from amazon",font=("Goudy old",15,"bold"),bg="black",fg="firebrick1")
        label7.place(x=250,y=280)
        button6=tk.Button(canvas,text="Click here",bg="firebrick1",command=lambda:price3.amazon1())
        button6.place(x=880,y=280)
        

    def sports():
        global price
        price=page_soup.find("div",{"class":"_1vC4OE"}).get_text()
        name=page_soup.find("a",{"class":"_2cLu-l"}).get_text()
        tk.Label(canvas,text="PRODUCT NAME",font=("Goudy old",15,"bold"),bg="black",fg="green2").place(x=500,y=210)
        tk.Label(canvas,text="PRICE",font=("Goudy old",15,"bold"),bg="black",fg="green2").place(x=1000,y=210)
        label4=tk.Label(canvas,text=price,font=("Goudy old",15,"bold"),bg="black",fg="green2")
        label4.place(x=1000,y=240)
        label5=tk.Label(canvas,text=name,font=("Goudy old",15,"bold"),bg="black",fg="green2")
        label5.place(x=200,y=240)
        label7=tk.Label(canvas,text="To view first 7 search results for your product from amazon",font=("Goudy old",15,"bold"),bg="black",fg="firebrick1")
        label7.place(x=250,y=280)
        button6=tk.Button(canvas,text="Click here",bg="firebrick1",command=lambda:price2.amazon())
        button6.place(x=880,y=280)

class price2:
    def amazon():
        amazon_search=requests.get("https://www.amazon.in/s?k="+user_input,headers=headers)
        page_soup_1=BeautifulSoup(amazon_search.text,'html.parser')
        price_1=page_soup_1.findAll("span",{"class":"a-offscreen"})
        name_1=page_soup_1.findAll("span",{"class":"a-size-medium a-color-base a-text-normal"})
        global prod_price
        prod_name=[]
        prod_price=[]
        for a in name_1[0:7]:
            prod_name.append(a.text)
        
        for b in price_1[0:7]:
            prod_price.append(b.text)
        
        k=25
        x1=330
        x2=1
        for n in prod_name[0:7]:
            tk.Label(canvas,text=x2,font=("Goudy old",12,"bold"),bg="black",fg="firebrick1").place(x=230,y=x1)
            tk.Label(canvas,text=n,font=("Goudy old",12,"bold"),bg="black",fg="firebrick1").place(x=250,y=x1)
            x1=x1+k
            x2=x2+1
        y1=330
    
        for p in prod_price[0:7]:
            tk.Label(canvas,text= p,font=("Goudy old",12,"bold"),bg="black",fg="firebrick1").place(x=1000,y=y1)
            y1=y1+k

        tk.Label(canvas,text="Enter the index number from the above list with which you want to compare",font=("Goudy old",15,"bold"),bg="black",fg="yellow").place(x=300,y=520)
        button10=tk.Button(canvas,text="1",bg="yellow",command=lambda:abc.input0())
        button10.place(x=580,y=550)
        button11=tk.Button(canvas,text="2",bg="yellow",command=lambda:abc.input1())
        button11.place(x=610,y=550)
        button12=tk.Button(canvas,text="3",bg="yellow",command=lambda:abc.input2())
        button12.place(x=640,y=550)
        button13=tk.Button(canvas,text="4",bg="yellow",command=lambda:abc.input3())
        button13.place(x=670,y=550)
        button14=tk.Button(canvas,text="5",bg="yellow",command=lambda:abc.input4())
        button14.place(x=700,y=550)
        button15=tk.Button(canvas,text="6",bg="yellow",command=lambda:abc.input5())
        button15.place(x=730,y=550)
        button16=tk.Button(canvas,text="7",bg="yellow",command=lambda:abc.input6())
        button16.place(x=760,y=550)

class price3:
    def amazon1():
        amazon_search=requests.get("https://www.amazon.in/s?k="+user_input,headers=headers)
        page_soup_1=BeautifulSoup(amazon_search.text,'html.parser')
        price_1=page_soup_1.findAll("span",{"class":"a-offscreen"})
        name_1=page_soup_1.findAll("span",{"class":"a-size-base-plus a-color-base a-text-normal"})
        global prod_price
        prod_name=[]
        prod_price=[]
        for a in name_1[0:7]:
            prod_name.append(a.text)
        
        for b in price_1[0:7]:
            prod_price.append(b.text)
        
        k=25
        x1=330
        x2=1
        for n in prod_name[0:7]:
            tk.Label(canvas,text=x2,font=("Goudy old",12,"bold"),bg="black",fg="firebrick1").place(x=230,y=x1)
            tk.Label(canvas,text=n,font=("Goudy old",12,"bold"),bg="black",fg="firebrick1").place(x=250,y=x1)
            x1=x1+k
            x2=x2+1
        
        y1=330
    
        for p in prod_price[0:7]:
            tk.Label(canvas,text= p,font=("Goudy old",12,"bold"),bg="black",fg="firebrick1").place(x=1020,y=y1)
            y1=y1+k
        
        
        tk.Label(canvas,text="Select the index number from the above list with which you want to compare",font=("Goudy old",15,"bold"),bg="black",fg="yellow").place(x=300,y=520)
        button10=tk.Button(canvas,text="1",bg="yellow",command=lambda:abc.input0())
        button10.place(x=580,y=550)
        button11=tk.Button(canvas,text="2",bg="yellow",command=lambda:abc.input1())
        button11.place(x=610,y=550)
        button12=tk.Button(canvas,text="3",bg="yellow",command=lambda:abc.input2())
        button12.place(x=640,y=550)
        button13=tk.Button(canvas,text="4",bg="yellow",command=lambda:abc.input3())
        button13.place(x=670,y=550)
        button14=tk.Button(canvas,text="5",bg="yellow",command=lambda:abc.input4())
        button14.place(x=700,y=550)
        button15=tk.Button(canvas,text="6",bg="yellow",command=lambda:abc.input5())
        button15.place(x=730,y=550)
        button16=tk.Button(canvas,text="7",bg="yellow",command=lambda:abc.input6())
        button16.place(x=760,y=550)

class abc:
    def input0():
        a1=str(prod_price[0])
        b1=str(price)
        if a1<b1:
            tk.Label(canvas,text="Amazon is offering a better price than Flipkart",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
        else:
            tk.Label(canvas,text="Flipkart is offering a better price better than Amazon",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
    def input1():
        a1=str(prod_price[1])
        b1=str(price)
        if a1<b1:
            tk.Label(canvas,text="Amazon is offering a better price than Flipkart",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
        else:
            tk.Label(canvas,text="Flipkart is offering a better price better than Amazon",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
    def input2():
        a1=str(prod_price[2])
        b1=str(price)
        if a1<b1:
            tk.Label(canvas,text="Amazon is offering a better price than Flipkart",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
        else:
            tk.Label(canvas,text="Flipkart is offering a better price better than Amazon",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
    def input3():
        a1=str(prod_price[3])
        b1=str(price)
        if a1<b1:
            tk.Label(canvas,text="Amazon is offering a better price than Flipkart",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
        else:
            tk.Label(canvas,text="Flipkart is offering a better price better than Amazon",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
    def input4():
        a1=str(prod_price[4])
        b1=str(price)
        if a1<b1:
            tk.Label(canvas,text="Amazon is offering a better price than Flipkart",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
        else:
            tk.Label(canvas,text="Flipkart is offering a better price better than Amazon",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
    def input5():
        a1=str(prod_price[5])
        b1=str(price)
        if a1<b1:
            tk.Label(canvas,text="Amazon is offering a better price than Flipkart",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
        else:
            tk.Label(canvas,text="Flipkart is offering a better price better than Amazon",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
    def input6():
        a1=str(prod_price[6])
        b1=str(price)
        if a1<b1:
            tk.Label(canvas,text="Amazon is offering a better price than Flipkart",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)
        else:
            tk.Label(canvas,text="Flipkart is offering a better price better than Amazon",font=("Goudy old",18,"bold"),bg="black",fg="SpringGreen2").place(x=350,y=610)

canvas=tk.Canvas(root,bg="black")
canvas.place(x=0,y=0,height=695,width=1350)

title1=tk.Label(canvas,text="Compare ",font=("Impact",35,"bold"),bg="black",fg="white")
title1.place(x=500,y=7)
label=tk.Label(canvas,text="Prices",font=("Impact",35,"bold"),bg="black",fg="yellow")
label.place(x=700,y=7)
label1=tk.Label(canvas,text="Enter something to search(an e-commerce product):",font=("Goudy old",15,"bold"),bg="black",fg="cyan2")
label1.place(x=200,y=77)
userinput=tk.Entry(canvas,font=("times new roman",15),bg="snow2",fg="black")
userinput.place(x=730,y=77)
button1=tk.Button(canvas,text="Click to enter",command=Click,bg="cyan2")
button1.place(x=950,y=79)
root.mainloop()
