import requests 
from bs4 import BeautifulSoup
import newebay as eb
import amazon as am
import paytymmall as py
import ecommerce as fp
import pandas as pd
#import goooglesearch as gy
import tkinter as tk 
from tkinter import ttk

from PIL import ImageTk,Image
from io import BytesIO
import webbrowser




class Test:     
    def __init__(self):
        self.name_of_the_product=[]
        self.price=[]
        self.site=[]
        
    def testEbay(self,name):
        
        ob =eb.Ebay()
        x = ob.callApi(name)
        pr=x['price_of_the_product']
        listpr=pr.values.tolist()
        for i in listpr:
            self.price.append(i)
        nm= x['name_of_the_product'] 
        listnm=nm.values.tolist()
        for j in listnm:
            self.name_of_the_product.append(j)
        for i in range(0,len(listnm)):
            self.site.append("Ebay")
        
        

    def testAmazon(self,name):
        ob = am.Amazon()
        x = ob.callApi(name)
        print('Tested successfully')
        print(x)
        pr=x['price_of_the_product']
        listpr=pr.values.tolist()
        for i in listpr:
            self.price.append(i)
        nm= x['name_of_the_product'] 
        listnm=nm.values.tolist()
        for j in listnm:
            self.name_of_the_product.append(j)
        for i in range(0,len(listnm)):
            self.site.append("AMAZON")
        #print(x['price_of_the_product'])
        print('Done')
        print(self.name_of_the_product)
        print(self.price)
        print(self.site)




    def testPaytym(self,name):
        ob = py.Paytym()
        x = ob.callApi(name)
        print('Tested successfully')
        print(x)
        #print(x['price_of_the_product'])
        pr=x['price_of_the_product']
        listpr=pr.values.tolist()
        for i in listpr:
            self.price.append(i)
        nm= x['name_of_the_product'] 
        listnm=nm.values.tolist()
        for j in listnm:
            self.name_of_the_product.append(j)
        for i in range(0,len(listnm)):
            self.site.append("Paytym")
        print('Done')
        print(self.name_of_the_product)
        print(self.price)
        print(self.site)



    def testFlipkart(self,name):
        ob = fp.Flipkart()
        x = ob.callApi(name)
        print('Tested successfully')
        print(x)
        pr=x['price_of_the_product']
        listpr=pr.values.tolist()
        for i in listpr:
            self.price.append(i)
        nm= x['name_of_the_product'] 
        listnm=nm.values.tolist()
        for j in listnm:
            self.name_of_the_product.append(j)
        for i in range(0,len(listnm)):
            self.site.append("Flipkart")
        #print(x['price_of_the_product'])
        print('Done')
        print(self.name_of_the_product)
        print(self.price)
        print(self.site)




if __name__ == "__main__":
    
    ob = Test()
    text=input("enter the product::")
    ob.testEbay(text)
    ob.testAmazon(text)
    ob.testPaytym(text)
    ob.testFlipkart(text)
    