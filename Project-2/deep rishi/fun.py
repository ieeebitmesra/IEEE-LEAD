import requests as req
import sys
import webbrowser
from bs4 import BeautifulSoup
from googlesearch import search

query = input("Enter name of website : ")
url = search(query, tld="co.in", num=10, stop=10, pause=2)
print("Scrapped results from google are :")
print(*url, sep='\n')

print('\n')
print('\n')

url_f = "https://www.flipkart.com/realme-narzo-10a-so-white-32-gb/p/itmbeb412dade152?pid=MOBFQ36ASQHV3UGW&lid=LSTMOBFQ36ASQHV3UGWL3NPOI&fm=neo%2Fmerchandising&iid=M_964504bb-87b4-48ef-b04f-aa649114b33e_8.4O0MZVDSXAQX&ssid=r4of7hxnfk0000001592422251434&otracker=hp_omu_Best%2BBattery%2BPhones_1_8.dealCard.OMU_Best%2BBattery%2BPhones_4O0MZVDSXAQX_4&otracker1=hp_omu_WHITELISTED_neo%2Fmerchandising_Best%2BBattery%2BPhones_NA_dealCard_cc_1_NA_view-all_4&cid=4O0MZVDSXAQX"
page_f = req.get(url_f)
soup_f = BeautifulSoup(page_f.content, "html.parser")
product_f = soup_f.find("span",{"class": "_35KyD6"}).text
price_f = soup_f.find("div",{"class": "_1vC4OE _3qQ9m1"}).text 
specs_f = soup_f.find("div",{"class": "g2dDAR"}).text 
image_f = soup_f.select("img",{"class": "_1Nyybr Yun65Y OGBF1g   _30XEf0"})
print("Product name : "+product_f)
print('\n')
print("Price : "+price_f)
print('\n')
print("Specifications : "+specs_f)
print('\n')
print(image_f)

print('\n')
print('\n')

url = "https://www.flipkart.com/apple-iphone-7-black-32-gb/p/itmen6daftcqwzeg?pid=MOBEMK62PN2HU7EE&lid=LSTMOBEMK62PN2HU7EEF7TO4A&marketplace=FLIPKART&srno=s_1_1&otracker=search&otracker1=search&fm=SEARCH&iid=579308bf-2207-47bc-968e-6fbc96287fe9.MOBEMK62PN2HU7EE.SEARCH&ppt=sp&ppn=sp&ssid=gt88bt7lfk0000001592249245826&qH=319971f613ef172d"
url_a = "https://www.snapdeal.com/product/apple-iphone-7-128gb-and/6052838564677729373#bcrumbLabelId:175"
page = req.get(url)
soup = BeautifulSoup(page.content, "html.parser")
product = soup.find("span",{"class": "_35KyD6"}).text
image = soup.select("._2_AcLJ")
price_c = soup.find("div",{"class": "_1vC4OE _3qQ9m1"}).text
price = price_c[1:]
price = price.replace(",","")
price = int(price)
page_a = req.get(url_a)
soup_a = BeautifulSoup(page_a.content, "html.parser")
price_ac = soup_a.find("span",{"class": "payBlkBig"}).text
price_a = price_ac.replace(",","")
price_a = int(price_a)
print("Product name : "+product)
print('\n')
print(image)
print('\n')

if(price < price_a):
 print("Buy from FLIPKART in amount : "+price_c)
 print('\n')
 
else:
 print("Buy from SNAPDEAL in amount : "+price_ac)
 print('\n')
