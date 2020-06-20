import requests
from tkinter import *
from bs4 import BeautifulSoup

root = Tk()
root.title("App3 - Product Search and Price Compare")
root.iconbitmap(r'appicon.ico')
root.geometry("1200x800")

def product_search():
    query = src.get()
    header = { 'User-Agent' : 'Mozilla/5.0 (x11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'}

    #AMAZON SEARCH
    load1 = {'k': query}
    res = requests.get("https://www.amazon.in/s", params = load1, headers = header)
    soup = BeautifulSoup(res.content, 'html.parser')
    amazon_product_links=[]
    amazon_product_names=[]
    amazon_product_prices=[]
    res_div = soup.find_all('div', attrs={'class': re.compile('sg-col-4-of-24 sg-col-4-of-12 sg-col-4-of-36 s-result-item s-asin sg-col-4-of-28 sg-col-4-of-16 AdHolder sg-col sg-col-4-of-20 sg-col-4-of-32')})
    for ele1 in res_div:
        link = ele1.find_all('a', attrs = {'class': re.compile('a-link-normal a-text-normal')})
        for i in link:
            amazon_product_links.append("https://www.amazon.in"+i['href'])
            amazon_product_names.append(i.text)
        price = ele1.find_all('span', attrs = {'class': 'a-offscreen'})
        for p in price:
            amazon_product_prices.append(p.text)
    if len(amazon_product_names)==0:
        res_div = soup.find_all('div', attrs={'class':re.compile('sg-col-20-of-24 s-result-item s-asin sg-col-0-of-12 sg-col-28-of-32 sg-col-16-of-20 AdHolder sg-col sg-col-32-of-36 sg-col-12-of-16 sg-col-24-of-28')})
        for ele1 in res_div:
            link = ele1.find_all('a', attrs = {'class': re.compile('a-link-normal a-text-normal')})
            for i in link:
                amazon_product_links.append("https://www.amazon.in"+i['href'])
                amazon_product_names.append(i.text)
            price = ele1.find_all('span', attrs = {'class': 'a-offscreen'})
            for p in price:
                amazon_product_prices.append(p.text)


    #FLIPKART SEARCH
    load2 = {'q': query}
    res = requests.get("https://www.flipkart.com/search", params = load2, headers = header)
    soup = BeautifulSoup(res.content, 'html.parser')
    res_div = soup.find_all('div', attrs={'class': re.compile('_1HmYoV _35HD7C')})
    flipkart_product_links=[]
    flipkart_product_names=[]
    flipkart_product_prices=[]
    for ele1 in res_div:
        res_div_furt = ele1.find_all('div', attrs = {'class': re.compile('bhgxx2 col-12-12')}, style = False)
    for ele2 in res_div_furt:
        link = ele2.find_all('a', title=True)
        for i in link:
            flipkart_product_links.append("https://www.flipkart.com"+i['href'])
            flipkart_product_names.append(i['title'])
        price = ele2.find_all('div', attrs = {'class': '_1vC4OE'})
        for p in price:
            flipkart_product_prices.append(p.text)
    if len(flipkart_product_names)==0:
        for ele2 in res_div_furt:
            link = ele2.find_all('a', attrs = {'class':'_31qSD5'})
            for i in link:
                flipkart_product_links.append("https://www.flipkart.com"+i['href'])
            name = ele2.find_all('div', attrs = {'class':'_3wU53n'})
            for n in name:
                flipkart_product_names.append(n.text)
            price = ele2.find_all('div', attrs = {'class': re.compile('_1vC4OE _2rQ-NK')})
            for p in price:
                flipkart_product_prices.append(p.text)

    #SNAPDEAL SEARCH
    load3 = {'keyword': query, 'categoryId': '175'}
    res = requests.get("https://www.snapdeal.com/search", params = load3, headers = header)
    soup = BeautifulSoup(res.content, 'html.parser')
    res_div = soup.find_all('div', attrs = {'class': "product-desc-rating"})
    snapdeal_product_links=[]
    snapdeal_product_names=[]
    snapdeal_product_prices=[]
    for ele2 in res_div:
        link = ele2.find_all('a', attrs = {'class': re.compile("dp-widget-link noUdLine")})
        for i in link:
            snapdeal_product_links.append(i['href'])
        title = ele2.find_all('p', attrs = {'class': 'product-title'}, title=True)
        for t in title:
            snapdeal_product_names.append(t['title'])
        price = ele2.find_all('span', attrs = {'class': re.compile('lfloat product-price')})
        for p in price:
            snapdeal_product_prices.append(p.text)
    
    Label1 = Label(root, text="Amazon - ")
    Label2 = Label(root, text="Product Name : ")
    Label3 = Label(root, text=amazon_product_names[0])
    Label4 = Label(root, text="Product Price :       Rs.  "+amazon_product_prices[0][1:])
    Label5 = Label(root, text="\nFlipkart - ")
    Label6 = Label(root, text="Product Name :     "+flipkart_product_names[0])
    Label7 = Label(root, text="Product Price :       Rs.  "+flipkart_product_prices[0][1:])
    Label8 = Label(root, text="\nSnapdeal - ")
    Label9 = Label(root, text="Product Name :     "+snapdeal_product_names[0])
    Label10 = Label(root, text="Product Price :       "+snapdeal_product_prices[0]+"\n")

    Text1 = Text(root)
    Text1.insert(END, "Amazon Link :\n"+amazon_product_links[0]+"\n\nFlipkart Link :\n"+flipkart_product_links[0]+"\n\nSnapdeal Link :\n"+snapdeal_product_links[0])

    Label1.grid(row=3 , column=0)
    Label2.grid(row=4 , column=0 ,columnspan=2)
    Label3.grid(row=4 , column=2 , columnspan=6)
    Label4.grid(row=5 , column=0 , columnspan=8)
    Label5.grid(row=6 , column=0)
    Label6.grid(row=7 , column=0 , columnspan=8)
    Label7.grid(row=8 , column=0 , columnspan=8)
    Label8.grid(row=9 , column=0)
    Label9.grid(row=10 , column=0 , columnspan=8)
    Label10.grid(row=11 , column=0 , columnspan=8)
    Text1.grid(row=12 , columnspan=8)
    
    
search = Label(root, text = "Product Search and Compare")
search.grid(row=0 , column=0, columnspan=8)
src = StringVar()
Entry1 = Entry(root, textvariable = src)
Entry1.grid(row=1 , column=0, columnspan=8)
photo = PhotoImage(file="products.png")
button1 = Button(root, image=photo, command=product_search)
button1.grid(row=2 , column=0, columnspan=8)

root.mainloop()