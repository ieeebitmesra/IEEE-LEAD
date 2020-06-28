import requests 
from bs4 import BeautifulSoup
import pandas as pd
import tkinter as tk 
from tkinter import ttk
from PIL import ImageTk,Image
from io import BytesIO
import re

class Flipkart:

    def callApi(self,search_text):
            text=search_text
            res=requests.get("https://www.flipkart.com/search?q="+text)
            soup=BeautifulSoup(res.text,"html.parser")

            #print(soup.prettify())
            #name_product0=[]
            price_product=[]
            discount_prodcut=[]
            ratings_product=[]
            information_product=[]
            picture_product=[]
            #name_product1=[]
            name_product=[]
            #bad_chars=[',','.',':']
            #<a class="_2cLu-l" title="Vector X Attacker Football - Size: 5" target="_blank" rel="noopener noreferrer" href="/vector-x-attacker-football-size-5/p/itmffmgpusgrhydv?pid=BALFBYADDKSJE83M&amp;lid=LSTBALFBYADDKSJE83MBDBRBJ&amp;marketplace=FLIPKART&amp;srno=s_1_1&amp;otracker=search&amp;otracker1=search&amp;fm=SEARCH&amp;iid=en_B4cIvy9q09wgZBF4kBva%2FMB8jeeJfDV5LVqkoVmL5e1yw7i0fXd8%2FMjlQENFcaANLdgvRMu7Z%2BLBHA5YQ%2B21JQ%3D%3D&amp;ppt=sp&amp;ppn=sp&amp;ssid=7v2hmf2uts0000001592288536917&amp;qH=7a10ea1b9b2872da">Vector X Attacker Football - Size: 5</a>
            names=soup.findAll(name="a",class_="_2cLu-l")
            if names is not None:
                for name in names [0:2]:
                    new_name=(name.text).replace('/n','')
                    name_product.append(new_name)
            else:
                name_product.append("unkown-product")
            #<div class="_3liAhj" data-tkid="da66d42b-48f2-4a1b-8cb4-58ad98f47863.MOBFKWSYWB5S37YV.SEARCH"><a class="Zhf2z-" target="_blank" rel="noopener noreferrer" href="/oneplus-7t-glacier-blue-128-gb/p/itma74f3aece46b1?pid=MOBFKWSYWB5S37YV&amp;lid=LSTMOBFKWSYWB5S37YVJVCCQX&amp;marketplace=FLIPKART&amp;srno=s_1_1&amp;otracker=search&amp;otracker1=search&amp;fm=SEARCH&amp;iid=da66d42b-48f2-4a1b-8cb4-58ad98f47863.MOBFKWSYWB5S37YV.SEARCH&amp;ppt=sp&amp;ppn=sp&amp;ssid=ueuxo749mo0000001592289657351&amp;qH=525aa42ea3c377eb"><div><div><div class="_3BTv9X" style="height: 280px; width: 200px;"><img class="_1Nyybr  _30XEf0" alt="OnePlus 7T (Glacier Blue, 128 GB)" src="https://rukminim1.flixcart.com/image/612/612/k1b1bbk0/mobile/7/y/v/oneplus-7t-hd1901-original-imafkwsykmpfmf3g.jpeg?q=70"></div></div></div><div class="_3gDSOa _3iGnbq"><div class="DsQ2eg"><svg xmlns="http://www.w3.org/2000/svg" class="_2oLiqr" width="16" height="16" viewBox="0 0 20 16"><path d="M8.695 16.682C4.06 12.382 1 9.536 1 6.065 1 3.219 3.178 1 5.95 1c1.566 0 3.069.746 4.05 1.915C10.981 1.745 12.484 1 14.05 1 16.822 1 19 3.22 19 6.065c0 3.471-3.06 6.316-7.695 10.617L10 17.897l-1.305-1.215z" fill="#2874F0" class="_35Y7Yo" stroke="#FFF" fill-rule="evenodd" opacity=".9"></path></svg></div></div></a><a class="_2cLu-l" title="OnePlus 7T (Glacier Blue, 128 GB)" target="_blank" rel="noopener noreferrer" href="/oneplus-7t-glacier-blue-128-gb/p/itma74f3aece46b1?pid=MOBFKWSYWB5S37YV&amp;lid=LSTMOBFKWSYWB5S37YVJVCCQX&amp;marketplace=FLIPKART&amp;srno=s_1_1&amp;otracker=search&amp;otracker1=search&amp;fm=SEARCH&amp;iid=da66d42b-48f2-4a1b-8cb4-58ad98f47863.MOBFKWSYWB5S37YV.SEARCH&amp;ppt=sp&amp;ppn=sp&amp;ssid=ueuxo749mo0000001592289657351&amp;qH=525aa42ea3c377eb">OnePlus 7T (Glacier Blue, 128 GB)</a><div class="_1rcHFq">8 GB RAM</div><div class="niH0FQ _36Fcw_"><span id="productRating_LSTMOBFKWSYWB5S37YVJVCCQX_MOBFKWSYWB5S37YV_" class="_2_KrJI"><div class="hGSR34">4.6<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" class="_2lQ_WZ"></div></span><span class="_38sUEc">(6,042)</span></div><div class="_3LWrw9"><img height="21" src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/fa_8b4b59.png"></div><a class="_1Vfi6u" target="_blank" rel="noopener noreferrer" href="/oneplus-7t-glacier-blue-128-gb/p/itma74f3aece46b1?pid=MOBFKWSYWB5S37YV&amp;lid=LSTMOBFKWSYWB5S37YVJVCCQX&amp;marketplace=FLIPKART&amp;srno=s_1_1&amp;otracker=search&amp;otracker1=search&amp;fm=SEARCH&amp;iid=da66d42b-48f2-4a1b-8cb4-58ad98f47863.MOBFKWSYWB5S37YV.SEARCH&amp;ppt=sp&amp;ppn=sp&amp;ssid=ueuxo749mo0000001592289657351&amp;qH=525aa42ea3c377eb"><div class="_1uv9Cb"><div class="_1vC4OE">₹35,975</div><div class="_3auQ3N">₹36,818</div><div class="VGWI6T"><span>2% off</span></div></div></a><div class="_3ighFh"><div class="_34CFgI"><div class="_1O_CiZ"><span class="_1iHA1p"><div class="_2kFyHg"><label><input type="checkbox" class="_3uUUD5" readonly="" value="on"><div class="_1p7h2j"></div></label></div></span><label class="_10TB-Q"><span>Add to Compare</span></label></div></div><div class="_3hobaQ"></div></div></div>
            #if(names!="None"):
            #for name in names :
                #name_product.append(name.text)
            #else:
            #names=soup.findAll(name="a",class_="_2B_pmu")
            #for name1 in names [0:5]:
            #name_product.append(name1.text)
            #discount_price.append((discount).find("span").text)
            Prices=soup.findAll(name="div",class_="_1vC4OE")
            if Prices is not None:
                for price in Prices [0:2]:
                    trim=re.compile(r'[^\d.,]+')    
                    new_price=(price.text)
                    pricee=trim.sub('',new_price)
                    price_product.append(pricee) 
            #tm=float(sub(r'[^0-9.]','',new_price))
            else:
                 price_product.append("0")
            #for price in Prices :
               #nn1=price.split("")
                #nn2=''.join(i for i in price if not i in bad_chars)
                #nn3=int(nn2)
                #print(type(nn3))
                #price_product.append(nn3)
                #price_product.append(price.text)

            discounts=soup.find_all(name="div", class_="VGWI6T")
            for discount in discounts[0:2]:
                discount_prodcut.append((discount).find("span").text)
            ratings=soup.find_all(name="div",class_="hGSR34")
            for rating in ratings[0:2]:
                ratings_product.append(rating.text)
            #information=soup.find_all(name="div",class_="zU90f8")
            #if(information!="None"):
            #for info in information[0:5]:
            # information_product.append(info.text)
            #<div class="zU9Of8">Black</div>
            #<div class="zU9Of8">Black</div>
            #<div class="_1rcHFq">White, True Wireless</div>
            #else:
            yelp=soup.findAll(name="img",class_="_3togXc")
            for y in yelp [0:2]:
                picture_product.append(y['src'])
            information=soup.find_all(name="div",class_="_1rcHFq")
            for info in information [0:2]:
                information_product.append(info.text)
            d={"name_of_the_product":name_product,"price_of_the_product":price_product,"Discount on the product":discount_prodcut,"rating of the product":ratings_product,"information on product":information_product,"picture of the product":picture_product}

            df=pd.DataFrame.from_dict(d,orient='index')
            df=df.transpose()
            df=df.sort_values(by="price_of_the_product")
        #print(df)
            return df
            #df["name_product"]=df[["name_product1","name_product0"]].apply(lamba x : ''.join(x), axis=1)
            #df1=df.transpose()
            #df=df.sort_values(by="price of the product")
            #print(df1.head())


            #<a class="_2cLu-l" title="Apple AirPods with Charging Case Bluetooth Headset with Mic" target="_blank" rel="noopener noreferrer" href="/apple-airpods-charging-case-bluetooth-headset-mic/p/itm0ff1a0e3d5eb4?pid=ACCFF2R85H8YG4WH&amp;lid=LSTACCFF2R85H8YG4WHHPSN8W&amp;marketplace=FLIPKART&amp;srno=s_1_1&amp;otracker=search&amp;otracker1=search&amp;fm=SEARCH&amp;iid=0c6999aa-7f50-489a-ba59-2acaa01fa228.ACCFF2R85H8YG4WH.SEARCH&amp;ppt=sp&amp;ppn=sp&amp;ssid=7d8x4gimk00000001592208646239&amp;qH=26fcbf6cec48c3dc">Apple AirPods with Charging Case Bluetooth Headset with...</a>
            #<img class="_1Nyybr  _30XEf0" alt="Apple AirPods with Charging Case Bluetooth Headset with Mic" src="https://rukminim1.flixcart.com/image/612/612/k1pbpu80pkrrdj/headphone/h/u/t/apple-mv7n2hn-a-original-imaff78z59efb54q.jpeg?q=70">
            #<div class="_1rcHFq">3 GB RAM</div>