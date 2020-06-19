# Importing requisite packages
import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
from PIL import ImageTk, Image

import webbrowser
import re
from bs4 import BeautifulSoup
import requests
from io import BytesIO

# The types of fonts used in this program
X_Font = ("Calibri", 16, 'bold')
N_Font = ("Calibri", 12)
S_Font = ("Calibri", 10)

# Creates a global popup message function
def popupmsg(msg):
    
    # popup message if-elif tree
    if msg == '1':
        response=messagebox.showwarning("Warning", "Invalid Search !")
    elif msg == '2':
        response=messagebox.showerror("Warning", "Product not found.")

    # popup message content label
    popup_label = tk.Label(text=response)
    popup_label.pack()

# Main Class
class PriceComparator(tk.Tk):
    
    # __init__ method: Constructor to initialise the attributes of the class
    def __init__(self, *args, **kwargs):
        
        tk.Tk.__init__(self, *args, *kwargs) 
        tk.Tk.wm_iconbitmap(self, default = 'Transac2.ico')
        tk.Tk.wm_title(self, "E-Commerce Price Comparator")
        
        container = tk.Frame(self)
        container.pack(side="top", fill="both", expand = True)
        container.grid_rowconfigure(0, weight = 1)
        container.grid_columnconfigure(0, weight = 1)
        
        # dictionary of frames
        self.frames = {}
        
        # to select a particular frame
        for f in (WelcomePage, PageTwo):
            
            frame = f(container, self)
            self.frames[f] = frame
            frame.grid(row=0, column=0, sticky="nsew")
        
        # to show the StartPage at the opening of the application
        self.show_frame(WelcomePage)
    
    # function to show a frame
    def show_frame(self, cont):
        
        frame = self.frames[cont]
        frame.tkraise()
        
# Start Page class
class WelcomePage(tk.Frame):
    
    # __init__ method: Constructor to initialise the attributes of the class
    def __init__(self, parent, controller):
        
        tk.Frame.__init__(self, parent, bg="white")
        
        # welcome page image label
        WelcomePage_image = ImageTk.PhotoImage(Image.open("a2.png"))
        WelcomePage_image_label=tk.Label(self, image = WelcomePage_image)
        WelcomePage_image.image_label = WelcomePage_image
        WelcomePage_image_label.grid(padx=0, pady=0, row=0, column=0, rowspan =10, sticky ="nw")
        
        # welcome page heading        
        WelcomePage_label1 = tk.Label(self, text = "Welcome to E-Commerce Price Comparator", font=X_Font, bg="white")
        WelcomePage_label1.grid(row=0, column=1, columnspan=3, sticky= "we",pady=5)
        
        # description of the application        
        description_text = """
The application shows various product prices from different retailers and helps you to
decide 'where to buy the product affordably'.

This comparative e-commerce engine lets shoppers compare prices from multiple
websites on a single page and choose the merchant that offers the best overall value !!
"""        
        WelcomePage_label2 = tk.Label(self, text = description_text, font=S_Font, justify="left", bg="white")
        WelcomePage_label2.grid(row=1, column=1, rowspan=3, columnspan=3, sticky = "w", padx=10)
        
        WelcomePage_label3 = tk.Label(self, text = "Click Next to continue.", font=S_Font, bg="white")
        WelcomePage_label3.grid(row=4, column=1, columnspan=3, sticky = "w", padx=10)
        
        # buttons to go forward
        NextButton = ttk.Button(self, text = "Next >", command = lambda: controller.show_frame(PageTwo))
        NextButton.grid(row=9, column=1, sticky = "w", padx=90, pady=20)
        
        # buttons to quit
        QuitButton = ttk.Button(self, text = "Quit", command = quit)
        QuitButton.grid(row=9, column=3, sticky = "e", padx=90, pady=20)
        
# Page Two 
class PageTwo(tk.Frame): 
   
    def __init__(self, parent, controller):
        
        tk.Frame.__init__(self, parent, bg="white")
        
        # google image label
        Google_Icon = ImageTk.PhotoImage(Image.open("Google.png"))
        Image_label = tk.Label(self, image = Google_Icon, bg="white")
        Image_label.image = Google_Icon 
               
        # entry widget for input
        Search_input = ttk.Entry(self, width = 35, font=N_Font)
        Search_input.insert(0, "Search here.")
                
        # fuction to clear guidance text from entry widget upon button press       
        def Clear_Search(event):
            Search_input.delete(0,'end')
        
        # event binding for entry widget
        Search_input.bind("<Button>", Clear_Search)
        
        # function to fetch the first link from google search page of the searched product
        def Google_FirstLink():
            
            SearchedProduct = Search_input.get()
            url = re.sub("\s+",'+', ('https://www.google.com/search?q=' + SearchedProduct))
            
            # User agent to access the website, used to mimic a browser
            headers= {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64;     x64; rv:66.0) Gecko/20100101 Firefox/66.0", "Accept-Encoding":"gzip, deflate",     "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "DNT":"1","Connection":"close", "Upgrade-Insecure-Requests":"1"}
            
            source = requests.get(url, headers = headers).text
            soup = BeautifulSoup(source, 'lxml')
            try:
                url = soup.find('div', class_ = 'r').a['href']
            except Exception:
                url = 'https://www.google.com/search?q='
                popupmsg('1')
            else:
                # opening the extracted link in a web browser
                webbrowser.open(url, new=1, autoraise=True)
            
        # function to fetch the first link from flipkart page for the searched product
        def Flipkart():
            
            SearchedProduct = Search_input.get()
            url = re.sub("\s+",'+', ('https://www.flipkart.com/search?q=' + SearchedProduct))
#             webbrowser.open(url, new=1, autoraise=True)
            
            # User agent to access the website
            headers= {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4166.0 Safari/537.36 Edg/85.0.544.0", "Accept-Encoding":"gzip, deflate",     "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "DNT":"1","Connection":"close", "Upgrade-Insecure-Requests":"1"}
               
            source = requests.get(url, headers = headers).text
            soup = BeautifulSoup(source, 'lxml')
            
            try:
                url = 'https://www.flipkart.com' + soup.find('div', class_="_3O0U0u").div.div.a['href']
            except Exception:
                url = 'https://www.flipkart.com/search?q='
                popupmsg('2')
                
            source = requests.get(url, headers = headers).text         
            soup = BeautifulSoup(source, 'lxml')
            prettyHTML = soup.prettify()
#             print(prettyHTML)

            global ProductName
            global ProductPrice
            global ProductID
            global ProductUrl
            global ProductRating
            global ProductHighlights
            global Feature_list

            # flipkart Product details extraction
            
            # product name
            ProductName = soup.find('span', class_="_35KyD6").text
#             if len(str(ProductName)) > 50:
#                 ProductName =str(ProductName).split(' - ')[0]
            
            # product price
            try:
                ProductPrice = soup.find('div', class_="_1vC4OE _3qQ9m1").text
            except:
                ProductPrice = "N/A"
            
            # product url
            ProductUrl = url
            
            # product rating
            try:
                ProductRating = soup.find('div', class_="_3ors59").div.span.div.text
            except:
                try:
                    ProductRating = soup.find('div', class_="_1UZzwh").span.text
                except:
                    ProductRating ="Rating not available/ accessible"
            
            # product highlights
            try:
                ProductHighlights_list =soup.find('div', class_="_3WHvuP").ul.find_all('li', class_="_2-riNZ")
            except:
                try:
                    ProductHighlights_list =soup.find('table', class_="_3ENrHu").find_all('td', class_='_2k4JXJ col col-9-12')
                except:
                    ProductHighlights_list =['', '' , '', '']
            
            ProductHighlights= {}    
            try:
                ProductHighlights = {
                "f1" : ProductHighlights_list[0].text.split('(')[0],
                "f2" : ProductHighlights_list[1].text.split('(')[0],
                "f3" : ProductHighlights_list[2].text.split('(')[0],
                "f4" : ProductHighlights_list[3].text.split('(')[0]
                }
            except Exception:
                try:
                    ProductHighlights = {
                    "f1" : ProductHighlights_list[0].text.split('(')[0],
                    "f2" : ProductHighlights_list[1].text.split('(')[0],
                    "f3" : ProductHighlights_list[2].text.split('(')[0],
                    "f4" : ""
                    }
                except:
                    try:
                        ProductHighlights = {
                        "f1" : ProductHighlights_list[0].text.split('(')[0],
                        "f2" : ProductHighlights_list[1].text.split('(')[0],
                        "f3" : "",
                        "f4" : ""
                        }
                    except:
                        try:
                            ProductHighlights = {
                            "f1" : ProductHighlights_list[0].text.split('(')[0],
                            "f2" : "",
                            "f3" : "",
                            "f4" : ""
                            }
                        except:
                             ProductHighlights = {
                            "f1" : ProductHighlights_list[0],
                            "f2" : ProductHighlights_list[1],
                            "f3" : ProductHighlights_list[2],
                            "f4" : ProductHighlights_list[3]
                            }
            
            # product model number, part number, model name, if they exists
            ModelID=""
            ModelPartNumber =""
            try:
                ModelID_src = soup.find('table', class_="_3ENrHu").find_all('tr', class_='_3_6Uyw row')
            except:
                ModelID=""
            else:
                flag1=0
                flag2=0
                try:
                    for texts in ModelID_src:
                        flag1+=1
                        if texts.find('td', class_="_3-wDH3 col col-3-12").text == 'Model Number':
                            ModelID = texts.find('li', class_="_3YhLQA").text
                            break
                        elif texts.find('td', class_="_3-wDH3 col col-3-12").text == 'Model':
                            ModelID = texts.find('li', class_="_3YhLQA").text
                            break
                        elif texts.find('td', class_="_3-wDH3 col col-3-12").text == 'Model Name':
                            ModelID = texts.find('li', class_="_3YhLQA").text
                            break
                        else:
                            flag2+=1
                    if flag1!=flag2:
                        for texts in ModelID_src:
                            if texts.find('td', class_="_3-wDH3 col col-3-12").text == 'Part Number':
                                ModelPartNumber = texts.find('li', class_="_3YhLQA").text
                                break
                    else:
                        ModelID=""
                        ModelPartNumber =""
                except:
                    ModelID=""
                    ModelPartNumber =""
                    
                            
            # specific class of products(Refrigerator and Watch) ModelID
            RefrigModelID =""
            WatchModelID = ""
            try:
                if soup.find('span', class_="_35KyD6").text.find("Refrigerator") !=-1:
                    print('1')
                    RefrigModelID = (soup.find('span', class_="_35KyD6").text[:1:-1])[1:].split('(')[0][::-1]
            except:
                RefrigModelID =""
            try:
                if soup.find('span', class_="_35KyD6").text.find("Watch") !=-1:
                    WatchModelID = soup.find('span', class_="_35KyD6").text.split(' ')[0]
            except:
                WatchModelID = ""
                
            
            # brand of the product, if mentioned in the general section
            try:
                Brand_src = soup.find('table', class_="_3ENrHu").find_all('tr', class_='_3_6Uyw row')
            except:
                Brand=""
            else:
                try:
                    flag1=0
                    flag2=0
                    for texts in Brand_src:
                        flag1+=1
                        if texts.find('td', class_="_3-wDH3 col col-3-12").text == 'Brand':
                            Brand = texts.find('td', class_="_2k4JXJ col col-9-12").ul.li.text
                            break
                        else:
                            flag2+=1

                    if flag1==flag2:
                        Brand=""
                except:
                    Brand=""
                    
            
            # specific class of products(Books) ISBN 
            try:
                ISBN_src = soup.find('div', class_="_3WHvuP").ul.find_all('li', class_="_2-riNZ")
            except:
                ISBN=""
            else:
                try:
                    flag1=0
                    flag2=0
                    for texts in ISBN_src:
                        flag1+=1
                        if texts.text.split(':')[0] == 'ISBN':
                            ISBN = texts.text.split(' ')[1].split(',')[0]
                            break
                        else:
                            flag2+=1
                    if flag1==flag2:
                        ISBN=""
                    else:
                        ProductName = soup.find('span', class_="_35KyD6").text
                except:
                    ISBN=""
                
            # a list variable storing ProductName, ModelID, ModelPartNumber, Brand, ISBN, RefrigModelID, WatchModelID
            Feature_list = [
                ProductName,
                ModelID,
                ModelPartNumber,
                Brand,
                ISBN,
                RefrigModelID,
                WatchModelID
            ]
            print(Feature_list)

            # image url
            try:
                ProductImage_Url_src = str(soup.find('script', id="jsonLD")).split("http://rukmini1")[1].split('?')[0]
            except:
                try:
                    ProductImage_Url_src = soup.find('div', class_ = "_3MF26o SGxMsH").find('div', class_ = "_2_AcLJ")['style']
                except:
                    FileMissing_image = Image.open("FileMissing.png")
                    Product_image = FileMissing_image.save(r"C:\Users\Public\Pictures\img.png")
                else:
                    ProductImage_Url = ProductImage_Url_src.split('(')[1].split('?')[0]
                    ProductImage_Url = ProductImage_Url.replace("128", "416",2)
                    ProductImage_response = requests.get(ProductImage_Url)
                    ProductImage = Image.open(BytesIO(ProductImage_response.content))
                    ProductImage.save(r"C:\Users\Public\Pictures\img.png")
            else:
                ProductImage_Url = 'http://rukmini1' + ProductImage_Url_src
                ProductImage_Url = ProductImage_Url.replace("128", "416",2)
                ProductImage_response = requests.get(ProductImage_Url)
                ProductImage = Image.open(BytesIO(ProductImage_response.content))
                ProductImage.save(r"C:\Users\Public\Pictures\img.png")     

        # Price extraction from Amazon India website
        def Amazon():
            
            # a list variable storing ProductName, ModelID, ModelPartNumber, Brand, ISBN, RefrigModelID, WatchModelID
            Comparison_list = Feature_list
            if Feature_list[6]:
                SearchProduct = Feature_list[6]
            elif Feature_list[5]:
                SearchProduct = (Feature_list[0])[0:10] + ' ' + Feature_list[5]
            elif Feature_list[4]:
                SearchProduct = Feature_list[4]
#             elif Feature_list[3] and Feature_list[1]:
#                 SearchProduct = Feature_list[3] + Feature_list[1]
#             elif Feature_list[2] and Feature_list[1]:
#                 SearchProduct = Feature_list[2] + Feature_list[1]
#             elif Feature_list[1]:
#                 SearchProduct = Feature_list[1]
            else:
                SearchProduct = Feature_list[0] + ' ' + Feature_list[1]

            url = re.sub("\s+",'+', ('https://www.amazon.in/s?k=' + SearchProduct))
            #webbrowser.open(url, new=1, autoraise=True)

            headers_c = {'User-Agent': 'Mozilla/5.0 (Linux; Android 5.1.1; SM-G928X Build/LMY47X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36', "Accept-Encoding":"gzip, deflate",     "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "DNT":"1","Connection":"close", "Upgrade-Insecure-Requests":"1"}

            source = requests.get(url, headers = headers_c,).content
            soup = BeautifulSoup(source, 'lxml')
            prettyHTML = soup.prettify()   #prettify the html
            ##print(prettyHTML)

            url = 'https://www.amazon.in' + soup.find('div', class_="s-result-item s-asin sg-col sg-col-12-of-12").a['href']
            print(url)
#             webbrowser.open(url, new=1, autoraise=False)
            source = requests.get(url, headers = headers_c).text         
            soup = BeautifulSoup(source, 'lxml')

            global AmazonProductPrice
            global AmazonProductUrl
            
            try:
                AmazonProductPrice = str((soup.find('span', id="priceblock_ourprice").text).strip()).replace("\n", " ").split(" ")[0]
            except:
                try:
                    AmazonProductPrice = str((soup.find('td', class_="a-span12").text).strip()).replace("\n", " ").split("  ")[0]
                except:
                    AmazonProductPrice =""
                    
            AmazonProductUrl = url

            
        # Flipkart Product details page
        def FlipkartProductPage():
            
            top = tk.Toplevel(bg="white")
            top.title("Flipkart Product Details")
            
            # product Name label        
            ProductName_label = tk.Label(top, text = str(ProductName), font=X_Font, bg="white", wraplength= 500)

            # product image label display
            Product_image = ImageTk.PhotoImage(Image.open(r"C:\Users\Public\Pictures\img.png"))
            image_label=tk.Label(top, image = Product_image, bg="white")
            image_label.image = Product_image
            
            # product specific information
            if Feature_list[6]:
                ProductSpecific_label =tk.Label(top, text=Feature_list[6], font =S_Font, bg="white")
            elif Feature_list[5]:
                ProductSpecific_label =tk.Label(top, text=Feature_list[5], font =S_Font, bg="white")
            elif Feature_list[4]:
                ProductSpecific_label =tk.Label(top, text=('ISBN: ' + Feature_list[4]), font =S_Font)
            elif Feature_list[3] or Feature_list[2] or Feature_list[1]:
                ProductSpecific_label =tk.Label(top, text=(Feature_list[3] + '  ' + Feature_list[1] + '  ' + Feature_list[2]), font =S_Font, bg="white")
            else:
                ProductSpecific_label =tk.Label(top, text='', font =S_Font, bg="white")
           
            # product Price label        
            ProductPrice_label = tk.Label(top, text = str(ProductPrice), font=X_Font, bg="white")
            
            # go to Flipkart product page
            def GoToProduct():
                webbrowser.open(ProductUrl, new=1, autoraise=True)
                       
            # product Page Button
            Flipkart_Icon = ImageTk.PhotoImage(Image.open("Flipkart_Icon.png"))
            ProductPage_button = ttk.Button(top, text = "Flipkart product page", image= Flipkart_Icon, compound='left', command=GoToProduct)
            ProductPage_button.image = Flipkart_Icon
            
            # product Rating label
            ProductRating_label = tk.Label(top, text = str(ProductRating), font=S_Font, bg="white")
            
            # Product Rating Image Label
            ProductRating_image = ImageTk.PhotoImage(Image.open("Star1.png"))
            Ratingimage_label=tk.Label(top, image = ProductRating_image, bg="white")
            Ratingimage_label.image = ProductRating_image

            # product Highlights label
            ProductHighlights_label1 = tk.Label(top, text = ProductHighlights['f1'], font=N_Font, bg="white")
            ProductHighlights_label2 = tk.Label(top, text = ProductHighlights['f2'], font=N_Font, bg="white")
            ProductHighlights_label3 = tk.Label(top, text = ProductHighlights['f3'], font=N_Font, bg="white")
            ProductHighlights_label4 = tk.Label(top, text = ProductHighlights['f4'], font=N_Font, bg="white")
            
            def ProductCompare():
                
                top2 = tk.Toplevel(bg="white")
                top2.title("Price Comparison")

                # Product Name label
                ProductName_label = tk.Label(top2, text = ProductName, font=X_Font, bg="white")

                # Product image label display
                Product_image = ImageTk.PhotoImage(Image.open(r"C:\Users\Public\Pictures\img.png"))
                Product_image_label=tk.Label(top2, image = Product_image, bg="white")
                Product_image_label.image = Product_image

                # Flipkart Image label
                Flipkart_image = ImageTk.PhotoImage(Image.open("Flipkart_logo.png"))
                Flipkart_image_label=tk.Label(top2, image = Flipkart_image, bg="white")
                Flipkart_image_label.image = Flipkart_image

                # Amazon Image label
                Amazon_image = ImageTk.PhotoImage(Image.open("Amazon_logo.png"))
                Amazon_image_label=tk.Label(top2, image = Amazon_image, bg="white")
                Amazon_image_label.image = Amazon_image

                # Flipkart Product Price label
                ProductPrice_Flipkart_label = tk.Label(top2, text = ProductPrice, font=X_Font, bg="white")

                # Amazon Product Price label
                ProductPrice_Amazon_label = tk.Label(top2, text = AmazonProductPrice, font=X_Font, bg="white")
                
                 # go to Flipkart product page
                def GoToFlipkart():
                    webbrowser.open(ProductUrl, new=1, autoraise=True)
                # go to Flipkart product page
                def GoToAmazon():
                    webbrowser.open(AmazonProductUrl, new=1, autoraise=True)    
                   
                # Grid packing of widgets
                ProductName_label.grid(row=1, column=1, columnspan = 3, sticky= "nwes", padx=20)
                Product_image_label.grid(padx=20, pady=40, row=0, column=0, rowspan =12, sticky ="nw")
                Flipkart_image_label.grid(row=3, column=1, sticky = "w", padx=20)
                ProductPrice_Flipkart_label.grid(row=3, column=3, sticky = "w", padx=50)
                Amazon_image_label.grid(row=5, column=1, sticky = "w", padx=20)
                ProductPrice_Amazon_label.grid(row=5, column=3, sticky = "w", padx=50)

            # Grid packing of widgets
            Image_label.grid(row=0, column=1, sticky="wens", padx=258, pady=50)
            Search_input.grid(row=1, column= 1)
            Search_button.grid(row=2, column=1, pady=40)
            ToPageOne_Button.grid(row=3, column=1, sticky="w", pady=40, padx=258)
           
            def CompareProducts():
                Amazon()
                ProductCompare()
                       
            # button to compare prices across websites
            Compare_Icon = ImageTk.PhotoImage(Image.open("Compare.png"))
            Compare_Button = ttk.Button(top, text = "Compare", image = Compare_Icon, compound = 'left', command = CompareProducts)
            Compare_Button.image = Compare_Icon
            
            # grid packing of widgets
            ProductName_label.grid(row=1, column=1, sticky= "w", padx=20)
            ProductSpecific_label.grid(row=2, column=1, sticky= "w", padx=20)
            Ratingimage_label.grid(row=3, column=1, sticky= "w", padx=20)
            ProductRating_label.grid(row=3, column=1, sticky= "w", padx=35)
            image_label.grid(padx=20, pady=40, row=0, column=0, rowspan =11, sticky ="nw")
            ProductPrice_label.grid(row=4, column=1, sticky = "w", padx=20)
            ProductHighlights_label1.grid(row=6, column=1, sticky = "w", padx=20)
            ProductHighlights_label2.grid(row=7, column=1, sticky = "w", padx=20)
            ProductHighlights_label3.grid(row=8, column=1, sticky = "w", padx=20)
            ProductHighlights_label4.grid(row=9, column=1, sticky = "w", padx=20)
            ProductPage_button.grid(row = 10, column = 1, sticky = 'e', padx=20, pady=10)
            Compare_Button.grid(row=10, column=1, sticky="w", padx=20, pady=10)
            
        # search button backend command
        def Search_Button():
            Google_FirstLink()
            Flipkart()
            FlipkartProductPage()

        # search Button
        Search_Icon = ImageTk.PhotoImage(Image.open("Search.png"))
        Search_button = ttk.Button(self, text = "Search", image= Search_Icon, compound='left', command=Search_Button)
        Search_button.image = Search_Icon
        
        # button to navigate to Start Page
        ToPageOne_Button = tk.Button(self, text = "", command = lambda: controller.show_frame(StartPage), state = 'disabled', relief = 'flat', bg="white")
       
        # grid packing of widgets
        Image_label.grid(row=1, column=1, sticky="wens", padx=258, pady=20)
        Search_input.grid(row=2, column= 1, pady=20)
        Search_button.grid(row=3, column=1, pady=40)
        ToPageOne_Button.grid(row=0, column=1, sticky="w", pady=20, padx=30)

        
app = PriceComparator()
app.resizable(False, False)

# specifying the size of the main frame along with its position on screen when called
window_height = 450
window_width = 800

screen_width = app.winfo_screenwidth()
screen_height = app.winfo_screenheight()

x_cordinate = int((screen_width/2) - (window_width/2))
y_cordinate = int((screen_height/2) - (window_height/2))

app.geometry("{}x{}+{}+{}".format(window_width, window_height, x_cordinate, y_cordinate))
app.mainloop()