import os
import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import tkinter as tk
from tkinter import *
from tkinter import ttk
from ttkthemes import ThemedTk
from tkinter import messagebox
from PIL import Image, ImageTk
import urllib
from io import BytesIO


resultarr = []


# Function for Exit submenu in Root Window


def exit_root():
    quit_window = messagebox.askyesno("Quit", "Do you really want to quit?")
    if quit_window == 1:
        root.destroy()
    else:
        return


# Function for About submenu in Root Window


def about_info(event=None):
    messagebox.showinfo(
        "Info",
        "ChotaPacket is an educational project showing applications of Tkinter and Web scrapping",
    )


# Function for opening the link in browser that we get after scrapping google search


def open_google_link(event=None):
    # opens the link the broswer if there are search results in the search Label
    global v
    if v.get() == "":
        messagebox.showerror("Error", "No google link is there in search results!")
    else:
        browser = webdriver.Chrome(os.getcwd() + "/chromedriver")
        browser.maximize_window()
        browser.get(v.get())


# Function for scrappping the image from flipkart using selenium
# as well name,price and link for buying that product


def showimage(event=None):

    # Chaging the text in status-bar
    global statusbar
    statusbar["text"] = "Loading..."
    root.update_idletasks()

    browser = webdriver.Chrome(os.getcwd() + "/chromedriver")
    browser.minimize_window()
    term = entry1.get()
    term = term.replace(" ", "+")
    browser.get(f"https://www.flipkart.com/search?q={term}")

    # This is added intentionally and not a mistake
    # As it is necessary that the broswer window is active for image to be rendered in Flipkart
    time.sleep(5)
    browser.maximize_window()
    time.sleep(5)
    browser.minimize_window()

    # Scrapping the data from html in page_source

    soup = BeautifulSoup(browser.page_source, "lxml")
    browser.quit()

    # For 1 in a row pattern of alignment of products in Flipkart

    image_and_name = soup.find("div", {"class": "_3O0U0u"}).find("img")
    picture = image_and_name["src"]
    price = soup.findAll("div", {"class": "_1vC4OE"})
    buy_now = soup.find("div", {"class": "_3O0U0u"}).find("a")["href"]
    name = image_and_name["alt"]

    # For 4 in a row pattern of alignment of products on flipkart

    if name == "":
        picture = soup.find("div", {"class": "_3O0U0u"}).find("img")["src"]
        pitara = soup.find("div", {"class": "_3O0U0u"}).find("a", title=True)
        name = pitara["title"]
        buy_now = pitara["href"]

    image_file = urllib.request.urlopen(picture)
    buy_link = f"https://www.flipkart.com/search?q={term}{buy_now}"
    buy = f"BUY NOW: https://www.flipkart.com/search?q={term}{buy_now}"

    # For creating photo object from URL so that it can be loaded in Tkinter

    raw_data = image_file.read()
    image_file.close()
    im = Image.open(BytesIO(raw_data))
    photo = ImageTk.PhotoImage(im)

    # Creating another Window to show result

    top = Toplevel()
    height = top.winfo_screenheight()
    width = top.winfo_screenwidth()
    top.title("ChotaPacket")
    top.geometry("%dx%d+0+0" % (width, height))
    top.tk.call(
        "wm", "iconphoto", top._w, tk.PhotoImage(file="download (1).png"),
    )
    # top.iconbitmap("@/home/ashutosh/Desktop/scrapper_app/scraper.xbm")
    top.config(bg="#002b36")

    # Functions for exit submenu in TOP Window
    def exit_top():
        top.destroy()

    # Function for Open Buy Now in Submenu to open the buy now url in the browser in TOP Window

    def open_buy_now(event=None):
        browser = webdriver.Chrome(os.getcwd() + "/chromedriver")
        browser.maximize_window()
        browser.get(buy_link)

    # Function for About submenu in TOP Window

    def about_top():
        messagebox.showinfo(
            "Info",
            "ChotaPacket is an educational project showing applications of Tkinter and Web scrapping",
        )

    # Creating menu bar for TOP Window

    menubar = Menu(top)
    top.config(menu=menubar)
    menubar.config(
        bg="black",
        fg="white",
        activebackground="black",
        activeforeground="white",
        font="Courier",
        borderwidth=2,
    )

    File_menu = Menu(menubar, tearoff=0, borderwidth=5)

    menubar.add_cascade(label="File", menu=File_menu)
    File_menu.add_command(
        label="Open Buy Now",
        activebackground="black",
        activeforeground="#00FF00",
        font=("Courier", "12"),
        command=open_buy_now,
    )

    File_menu.add_separator()
    File_menu.add_command(
        label="Exit",
        activebackground="black",
        activeforeground="#00FF00",
        font=("Courier", "12"),
        command=exit_top,
    )

    File_menu.config(bg="black", fg="white")

    About_menu = Menu(menubar, tearoff=0, borderwidth=5)
    About_menu.config(bg="black", fg="white")
    menubar.add_cascade(label="Help", menu=About_menu)
    About_menu.add_command(
        label="About",
        activebackground="black",
        activeforeground="#00FF00",
        font=("Courier", "12"),
        command=about_top,
    )

    # Bindings
    top.bind("<Control-o>", open_buy_now)

    # Creating a Frame in Top window for better layout

    frame8 = Frame(top)
    frame8.config(bg="#002b36")
    frame8.pack(pady=10)

    # Label for displaying the Image of the product

    label = ttk.Label(frame8, image=photo)
    label.image = photo
    label.pack(pady=10)

    # Label for displaying Name of the product

    text_label = ttk.Label(frame8, text=name, background="#002b36", foreground="white")
    text_label.pack(pady=10)

    # Label for displaying Price of the product

    price_label = ttk.Label(
        frame8, text=price[0].text, background="#002b36", foreground="white"
    )
    price_label.pack(pady=10)

    # Text Widget for displaying the Url of the product

    buy_label = Text(
        frame8, background="#002b36", foreground="white", wrap=WORD, height=9,
    )

    buy_label.insert(tk.END, buy)
    buy_label.pack(pady=10)
    statusbar["text"] = "Welcome to ChotaPacket"


# Function for Scrapping Google Results


def scrap(event=None):

    if entry.get() == "":
        return

    # Chaging the text in status-bar

    global statusbar
    statusbar["text"] = "Loading..."
    root.update_idletasks()
    global resultarr
    global v
    resultarr = []

    USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36"
    headers = {"user-agent": USER_AGENT}
    term = entry.get()
    query = {"q": term}

    url = f"https://www.google.com/search"

    response = requests.get(url, params=query, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    match = soup.findAll("div", {"class": "r"})

    for i in range(0, len(match)):
        resultarr.append(match[i].find("a")["href"])

    v.set(resultarr[0])

    button_next = ttk.Button(
        frame_pos_google, text=">>", command=lambda: forward(1)
    ).grid(row=0, column=5, padx=10)

    statusbar["text"] = "Welcome to ChotaPacket"


# Function for Scrapping products from Amazon and Flipkart
# Not comparing price because it will mislead if one site has any product and other doesn't
# Just displaying the most revelant result of the search with the url if interested in buying


def pricing(event=None):

    # For getting the choice high to low or low to high
    global price_choice
    # Chaging the text in status-bar
    global statusbar
    statusbar["text"] = "Loading..."
    root.update_idletasks()

    USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36"
    headers = {"user-agent": USER_AGENT}

    term = entry5.get()

    # Scrapping Flipkart
    url = "https://www.flipkart.com/search"
    query = {"q": term}
    response = requests.get(url, params=query, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    image_and_name_link = soup.findAll("div", {"class": "_3O0U0u"})

    name_array_flipkart = []
    link_array_flipkart = []
    price_array_flipkart = []

    for i in range(0, 4):
        temp = image_and_name_link[i].find("div", {"class": "_1vC4OE"}).text
        temp = temp[1:]
        temp = temp.replace(",", "")
        price_array_flipkart.append(temp)

    # For 4 in a row pattern of alignment of products in Flipkart
    if image_and_name_link[0].find("img")["alt"] == "":
        name_array_flipkart = []
        link_array_flipkart = []
        for i in range(0, 4):
            name_and_link = image_and_name_link[i].find("a", title=True)
            name_array_flipkart.append(name_and_link["title"])
            temp = name_and_link["href"]
            temp = "https://www.flipkart.com" + temp
            link_array_flipkart.append(temp)

    # For 1 in a row pattern of alignment of products in Flipkart

    else:
        for i in range(0, 4):
            name_array_flipkart.append(image_and_name_link[i].find("img")["alt"])

        for i in range(0, 4):
            temp = image_and_name_link[i].find("a")["href"]
            temp = "https://www.flipkart.com" + temp
            link_array_flipkart.append(temp)
    zipped_flipkart = zip(
        name_array_flipkart, price_array_flipkart, link_array_flipkart
    )
    flipkart_tupple_array = list(zipped_flipkart)

    # Scrapping Amazon

    url = f"https://www.amazon.in/s"
    query_amazon = {"k": term}
    response_amazon = requests.get(url, params=query_amazon, headers=headers)

    soup_amazon = BeautifulSoup(response_amazon.text, "html.parser")

    name_array_amazon = []
    price_array_amazon = []
    link_array_amazon = []

    name_amazon = soup_amazon.findAll(
        "span", {"class": "a-size-medium a-color-base a-text-normal"}
    )

    if len(name_amazon) == 0:
        allnames = soup_amazon.findAll(
            "span", {"class": "a-size-base-plus a-color-base a-text-normal"}
        )
        for i in range(0, 4):
            name_array_amazon.append(allnames[i].text)
    else:
        for i in range(0, 4):
            name_array_amazon.append(name_amazon[i].text)

    price_amazon = soup_amazon.findAll("span", {"class": "a-price-whole"})
    for i in range(0, 4):
        temp = price_amazon[i].text
        temp = temp.replace(",", "")
        price_array_amazon.append(temp)

    buy_now_amazon = soup_amazon.findAll("a", {"class": "a-link-normal a-text-normal"})
    for i in range(0, 4):
        temp = buy_now_amazon[i]["href"]
        temp = "https://www.amazon.in" + temp
        link_array_amazon.append(temp)

    zipped_amazon = zip(name_array_amazon, price_array_amazon, link_array_amazon)
    amazon_tuple_array = list(zipped_amazon)

    # Scrapping Paytm Mall

    query = {"q": term}

    url = f"https://paytmmall.com/shop/search"

    response = requests.get(url, params=query, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    name_array_paytm = []
    price_array_paytm = []
    link_array_paytm = []

    baap = soup.findAll("div", {"class": "_3WhJ"})

    for i in range(0, 4):
        name_array_paytm.append(baap[i].find("div", {"class": "UGUy"}).text)
        price = baap[i].find("span").text
        price = price.replace(",", "")
        price_array_paytm.append(price)
        temp = baap[i].find("a")["href"]
        temp = "https://paytmmall.com" + temp
        link_array_paytm.append(temp)

    zipped_paytm = zip(name_array_paytm, price_array_paytm, link_array_paytm)
    paytm_tuple_array = list(zipped_paytm)

    total_list = flipkart_tupple_array + amazon_tuple_array
    total_list = total_list + paytm_tuple_array

    # Creating a Top Window for displaying results

    top1 = Toplevel()
    height = root.winfo_screenheight()
    width = root.winfo_screenwidth()
    top1.title("ChotaPacket")
    top1.geometry("%dx%d+0+0" % (width, height))
    top1.tk.call(
        "wm", "iconphoto", top1._w, tk.PhotoImage(file="download (1).png"),
    )
    # top1.iconbitmap("@/home/ashutosh/Desktop/scrapper_app/scraper.xbm")
    top1.config(bg="#002b36")

    # Showing results
    mynotebook = ttk.Notebook(top1, width=width)
    mynotebook.pack()
    page1 = Frame(
        mynotebook,
        width=root.winfo_width(),
        height=root.winfo_height(),
        background="#002b36",
    )
    page2 = Frame(
        mynotebook,
        width=root.winfo_width(),
        height=root.winfo_height(),
        background="#002b36",
    )
    page3 = Frame(
        mynotebook,
        width=root.winfo_width(),
        height=root.winfo_height(),
        background="#002b36",
    )
    page4 = Frame(
        mynotebook,
        width=root.winfo_width(),
        height=root.winfo_height(),
        background="#002b36",
    )

    page1.pack()
    page2.pack()
    page3.pack()
    page4.pack()

    mynotebook.add(page1, text="Page 1")
    mynotebook.add(page2, text="Page 2")
    mynotebook.add(page3, text="Page 3")
    mynotebook.add(page4, text="Page 4")

    # For price low to high

    if price_choice.get() == 1:
        total_list.sort(key=lambda x: int(x[1]), reverse=False)
        for i in range(0, 3):
            product_label = ttk.Label(
                page1,
                text=total_list[i][0],
                font=("Courier", 12, "bold"),
                foreground="red",
            ).pack(pady=15)
            price_label = ttk.Label(page1, text=total_list[i][1]).pack(pady=8)
            buy_label_flipkart = Text(
                page1, background="#002b36", foreground="white", wrap=WORD, height=9,
            )
            buy = f"BUY NOW: \n{total_list[i][2]}"
            buy_label_flipkart.insert(tk.END, buy)
            buy_label_flipkart.pack(pady=10)

        for i in range(3, 6):
            product_label = ttk.Label(
                page2,
                text=total_list[i][0],
                font=("Courier", 12, "bold"),
                foreground="red",
            ).pack(pady=15)
            price_label = ttk.Label(page2, text=total_list[i][1]).pack(pady=8)
            buy_label_flipkart = Text(
                page2, background="#002b36", foreground="white", wrap=WORD, height=9,
            )
            buy = f"BUY NOW: \n{total_list[i][2]}"
            buy_label_flipkart.insert(tk.END, buy)
            buy_label_flipkart.pack(pady=10)

        for i in range(6, 9):
            product_label = ttk.Label(
                page3,
                text=total_list[i][0],
                font=("Courier", 12, "bold"),
                foreground="red",
            ).pack(pady=15)
            price_label = ttk.Label(page3, text=total_list[i][1]).pack(pady=8)
            buy_label_flipkart = Text(
                page3, background="#002b36", foreground="white", wrap=WORD, height=9,
            )
            buy = f"BUY NOW: \n{total_list[i][2]}"
            buy_label_flipkart.insert(tk.END, buy)
            buy_label_flipkart.pack(pady=10)

        for i in range(9, 12):
            product_label = ttk.Label(
                page4,
                text=total_list[i][0],
                font=("Courier", 12, "bold"),
                foreground="red",
            ).pack(pady=15)
            price_label = ttk.Label(page4, text=total_list[i][1]).pack(pady=8)
            buy_label_flipkart = Text(
                page4, background="#002b36", foreground="white", wrap=WORD, height=9,
            )
            buy = f"BUY NOW: \n{total_list[i][2]}"
            buy_label_flipkart.insert(tk.END, buy)
            buy_label_flipkart.pack(pady=10)

    # For price high to low

    if price_choice.get() == 2:
        total_list.sort(key=lambda x: int(x[1]), reverse=True)
        for i in range(0, 3):
            product_label = ttk.Label(
                page1,
                text=total_list[i][0],
                font=("Courier", 12, "bold"),
                foreground="red",
            ).pack(pady=15)
            price_label = ttk.Label(page1, text=total_list[i][1]).pack(pady=8)
            buy_label_flipkart = Text(
                page1, background="#002b36", foreground="white", wrap=WORD, height=9,
            )
            buy = f"BUY NOW: \n{total_list[i][2]}"
            buy_label_flipkart.insert(tk.END, buy)
            buy_label_flipkart.pack(pady=10)

        for i in range(3, 6):
            product_label = ttk.Label(
                page2,
                text=total_list[i][0],
                font=("Courier", 12, "bold"),
                foreground="red",
            ).pack(pady=15)
            price_label = ttk.Label(page2, text=total_list[i][1]).pack(pady=8)
            buy_label_flipkart = Text(
                page2, background="#002b36", foreground="white", wrap=WORD, height=9,
            )
            buy = f"BUY NOW: \n{total_list[i][2]}"
            buy_label_flipkart.insert(tk.END, buy)
            buy_label_flipkart.pack(pady=10)

        for i in range(6, 9):
            product_label = ttk.Label(
                page3,
                text=total_list[i][0],
                font=("Courier", 12, "bold"),
                foreground="red",
            ).pack(pady=15)
            price_label = ttk.Label(page3, text=total_list[i][1]).pack(pady=8)
            buy_label_flipkart = Text(
                page3, background="#002b36", foreground="white", wrap=WORD, height=9,
            )
            buy = f"BUY NOW: \n{total_list[i][2]}"
            buy_label_flipkart.insert(tk.END, buy)
            buy_label_flipkart.pack(pady=10)

        for i in range(9, 12):
            product_label = ttk.Label(
                page4,
                text=total_list[i][0],
                font=("Courier", 12, "bold"),
                foreground="red",
            ).pack(pady=15)
            price_label = ttk.Label(page4, text=total_list[i][1]).pack(pady=8)
            buy_label_flipkart = Text(
                page4, background="#002b36", foreground="white", wrap=WORD, height=9,
            )
            buy = f"BUY NOW: \n{total_list[i][2]}"
            buy_label_flipkart.insert(tk.END, buy)
            buy_label_flipkart.pack(pady=10)

    statusbar["text"] = "Welcome to ChotaPacket"


# Function for Implementing Carousel in Google Search Results
# Variables are declared global for access in the function


def forward(href_number):
    global v
    global button_next
    global button_prev

    if href_number == len(resultarr):
        button_next = ttk.Button(frame_pos_google, text=">>", state=DISABLED).grid(
            row=0, column=5, padx=10
        )
    else:
        v.set(resultarr[href_number])
        if href_number == 0:
            button_prev = ttk.Button(frame_pos_google, text="<<", state=DISABLED).grid(
                row=0, column=0, padx=10
            )
        else:
            button_prev = ttk.Button(
                frame_pos_google, text="<<", command=lambda: back(href_number - 1)
            ).grid(row=0, column=0, padx=10)
        button_next = ttk.Button(
            frame_pos_google, text=">>", command=lambda: forward(href_number + 1)
        ).grid(row=0, column=5, padx=10)


# Function for Implementing Carousel in Google Search Results
# Variables are declared global for access in the function


def back(href_number):
    global v
    global button_next
    global button_prev
    if href_number == 0:
        v.set(resultarr[href_number])
        button_prev = ttk.Button(frame_pos_google, text="<<", state=DISABLED).grid(
            row=0, column=0, padx=10
        )
        button_next = ttk.Button(
            frame_pos_google, text=">>", command=lambda: forward(href_number + 1)
        ).grid(row=0, column=5, padx=10)
    else:
        v.set(resultarr[href_number])
        button_prev = ttk.Button(
            frame_pos_google, text="<<", command=lambda: back(href_number - 1)
        ).grid(row=0, column=0, padx=10)
        button_next = ttk.Button(
            frame_pos_google, text=">>", command=lambda: forward(href_number + 1)
        ).grid(row=0, column=5, padx=10)


# Creating the Root window with "BLACK" theme

root = ThemedTk(theme="black")

# For Styling Buttons in ttk
s = ttk.Style()
s.configure("TButton", anchor=tk.CENTER)


height = root.winfo_screenheight()
width = root.winfo_screenwidth()
root.title("ChotaPacket")
root.geometry("%dx%d+0+0" % (width, height))

# Adding an image icon to root that works both on all os
# if iconbitmap is used then in UBUNUTU only black and white images of xbm format can be used

root.tk.call(
    "wm", "iconphoto", root._w, tk.PhotoImage(file="download (1).png"),
)

root.config(bg="#002b36")

# Function to Override the default exit before in root
# Now a pop appears first


def on_closing():
    quit_root = messagebox.askyesno("Quit", "Do you really want to quit?")
    if quit_root == 1:
        root.destroy()
    else:
        return


# Protocol for Overriding the default exit behaviour

root.protocol("WM_DELETE_WINDOW", on_closing)

# A frame containing everything

frame_universal = Frame(root, height=root.winfo_height(), width=root.winfo_width())
frame_universal.config(bg="#002b36")
frame_universal.pack()

# Creating Menu bar for Root

menubar = Menu(root)
root.config(menu=menubar)
menubar.config(
    bg="black",
    fg="white",
    activebackground="black",
    activeforeground="white",
    font="Courier",
    borderwidth=2,
)

File_menu = Menu(menubar, tearoff=0, borderwidth=5)

menubar.add_cascade(label="File", menu=File_menu)
File_menu.add_command(
    label="Open Google Link",
    activebackground="black",
    activeforeground="#00FF00",
    font=("Courier", "12"),
    command=open_google_link,
)
File_menu.add_separator()
File_menu.add_command(
    label="Exit",
    activebackground="black",
    activeforeground="#00FF00",
    font=("Courier", "12"),
    command=exit_root,
)

File_menu.config(bg="black", fg="white")

About_menu = Menu(menubar, tearoff=0, borderwidth=5)
About_menu.config(bg="black", fg="white")
menubar.add_cascade(label="Help", menu=About_menu)
About_menu.add_command(
    label="About",
    activebackground="black",
    activeforeground="#00FF00",
    font=("Courier", "12"),
    command=about_info,
)

# One of the Three child frame of the main frame
# It contains the GOOGLE SEARCH GUI

frame_un_1 = Frame(frame_universal)
frame_un_1.config(bg="#002b36")
frame_un_1.grid(row=0, column=0, padx=80)
frame_1 = Frame(frame_un_1)
frame_1.config(bg="#002b36")
frame_1.pack(pady=10)
heading1 = ttk.Label(
    frame_1,
    text="Google Search",
    foreground="red",
    background="#002b36",
    font=("Courier", "30", "bold"),
)
heading1.pack(pady=(40, 10))

google_search = PhotoImage(file="google-logo.png", height=200, width=200)
google_search_label = ttk.Label(frame_1, image=google_search)

# Added because Tkinter sometimes puts the image in garbage

google_search_label.image = google_search
google_search_label.pack(pady=10)

entry = ttk.Entry(frame_1, width=30, font="Arial")
entry.pack(pady=20)


search = ttk.Button(frame_un_1, width=20, text="Search", command=scrap)
search.pack()

frame_pos_google = Frame(frame_un_1)
frame_pos_google.config(bg="#002b36")
frame_pos_google.pack(pady=10)

button_prev = ttk.Button(frame_pos_google, text="<<", state=DISABLED).grid(
    row=0, column=0, padx=10
)

v = StringVar()
results = Label(
    frame_pos_google,
    textvariable=v,
    height=10,
    width=20,
    wraplength=210,
    justify="left",
    anchor="w",
).grid(row=0, column=1,)
v.set("")

button_next = ttk.Button(frame_pos_google, text=">>", state=DISABLED).grid(
    row=0, column=5, padx=10
)

# One of the Three child frame of the main frame
# It contains the FLIPKART SEARCH GUI

frame_un_2 = Frame(frame_universal)
frame_un_2.config(bg="#002b36")
frame_un_2.grid(row=0, column=1, padx=80)
frame_2 = Frame(frame_un_2)
frame_2.config(bg="#002b36")
frame_2.pack(pady=10)

heading2 = ttk.Label(
    frame_2,
    text="Flipkart Search",
    foreground="red",
    background="#002b36",
    font=("Courier", 30, "bold"),
)
heading2.pack(pady=10)
flipkart_search = PhotoImage(file="logo_lite-cbb3574d.png", height=200, width=200)

flipkart_search_label = ttk.Label(frame_2, image=flipkart_search)

# Added because Tkinter sometimes puts the image in garbage

flipkart_search_label.image = flipkart_search
flipkart_search_label.pack(pady=10)

entry1 = ttk.Entry(frame_2, width=30, font="Arial")
entry1.pack(pady=20)

button_for_photo = ttk.Button(
    frame_2, text="Show Result", width=20, command=showimage
).pack()

# One of the Three child frame of the main frame
# It contains the PRICE COMPARE GUI

frame_un_3 = Frame(frame_universal)
frame_un_3.config(bg="#002b36")
frame_un_3.grid(row=0, column=2, padx=80)
frame_3 = Frame(frame_un_3)
frame_3.config(bg="#002b36")
frame_3.pack(pady=10)

heading3 = ttk.Label(
    frame_3,
    text="Price Compare",
    foreground="red",
    background="#002b36",
    font=("Courier", 30, "bold"),
)

heading3.pack(pady=10)

price_compare = PhotoImage(file="download_1.png", height=200, width=200)
price_compare_label = ttk.Label(frame_3, image=price_compare)

# Added because Tkinter sometimes puts the image in garbage

price_compare_label.image = price_compare
price_compare_label.pack(pady=10)

entry5 = ttk.Entry(frame_3, width=30, font="Arial")
entry5.pack(pady=20)

sortby = ttk.Label(frame_3, text="Sort By Price")
sortby.pack(pady=15)


price_choice = IntVar()
price_choice.set("1")


price_1 = Radiobutton(
    frame_3,
    text="Low to High",
    variable=price_choice,
    value=1,
    background="#002b36",
    foreground="green",
    borderwidth=0,
    highlightthickness=0,
)
price_1.pack(pady=(0, 10))
price_2 = Radiobutton(
    frame_3,
    text="High to Low",
    variable=price_choice,
    value=2,
    background="#002b36",
    foreground="green",
    borderwidth=0,
    highlightthickness=0,
)
price_2.pack(pady=(0, 10))


button_for_price = ttk.Button(frame_3, text="Show Result", command=pricing, width=20)
button_for_price.pack()

statusbar = Label(root, text="Welcome to ChotaPacket", relief=SUNKEN, anchor=W)
statusbar.pack(side=BOTTOM, fill=X)

root.bind("<Control-o>", open_google_link)
entry.bind("<Return>", scrap)
entry1.bind("<Return>", showimage)
entry5.bind("<Return>", pricing)
root.mainloop()
