# ------------------------------------------------------------------

# For GUI
from tkinter import *
# from tkinter import ttk 	# For both ttk and tk support
from tkinter.ttk import *	# Overrides the tk with ttk
from ttkthemes import themed_tk
import webbrowser
from PIL import ImageTk,Image
from urllib.request import urlopen

#  For SCRAPING
import requests
from bs4 import BeautifulSoup
import time

# -----------------------ROOT----------------------------------

# Setting theme of root
# root = Tk()
root = themed_tk.ThemedTk()
root.get_themes()
root.set_theme("plastik")
# root.configure(background='black')

# Basic settings of window
root.geometry("1000x800")
root.title("Stone Scraper")
root.iconbitmap("favicon.ico")

style = Style() 
style.map("TEntry",foreground = [('focus','!disabled','black'),('!focus','!disabled','grey')])

# -----------------------TOP MENU-------------------------------

def openReadMe ():
    webbrowser.open_new("http://psaurav1290.github.io")

# Top menu
topMenu = Menu(root)
root.config(menu=topMenu)

topMenuFile = Menu(topMenu, tearoff=0)	#tearoff disables option to show menu in new window
# topMenuFile.add_command(label='Maximize')
topMenuFile.add_command(label='Exit                  (Alt+F4)',command=root.destroy)
topMenuFile.add_separator()
topMenuFile.add_command(label='Contact                       ',command=openReadMe)
topMenu.add_cascade(label='File', menu=topMenuFile)

# topMenu.add_command(label='About')

# ----------------------TAB CONTROL-----------------------------------

# Tab Control
tabControl = Notebook(root,padding=4)
tab1 = Frame(tabControl,relief="flat",padding=10)
tab2 = Frame(tabControl,relief="flat",padding=10)
# tab3 = Frame(tabControl)
tab4 = Frame(tabControl,relief="flat",padding=10)
tabControl.add(tab1, text='Google Search')
tabControl.add(tab2, text='Flipkart Search')
tabControl.add(tab4, text='Flipkart v/s ShopClues v/s Amazon')
tabControl.pack(expand=1, fill='both')

def openurl (event):
    webbrowser.open_new(event.widget.cget("text"))
def initGoogleSearch (event):
	GoogleSearch()
def initFlipkartSearch (event):
	FlipkartSearch()
def initCompare (event):
	Compare()

# ----------------------GOOGLE---------------------------------

# Google Scraping

# Tab 1

input1 = Entry(tab1,width="122")
input1.insert(0,"Enter your search term")
searchBtn1 = Button(tab1,text="Search")
pbar1 = Progressbar(tab1, length=700, value = 0)
results1 = Label(tab1,text="Search Results")
gridRow1 = 4

# Input
def GoogleSearch ():
	global gridRow1

	input1['state']='disabled'
	searchBtn1['state']='disabled'
	input1.update_idletasks()
	searchBtn1.update_idletasks()

	pbar1["value"]=0
	pbar1.update_idletasks()
	
	urlf = "Encountered some network restrictions!"
	titlef = "Encountered some network restriction!"

	try:
		begin1 = time.time()
		searchKey = input1.get()
		searchKey = searchKey.strip().replace(' ','+')
		pbar1["value"]= 5
		pbar1.update_idletasks()

		searchUrl = "https://www.google.com/search?q="+searchKey+"&num=5&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:en-US:official&client=firefox-a&channel=fflb"
	
		result = requests.get(searchUrl)
		pbar1["value"]= 30
		pbar1.update_idletasks()
		src = result.content
		pbar1["value"]= 40
		pbar1.update_idletasks()
		soup = BeautifulSoup(src,'lxml')
		links = soup('a')
		pbar1["value"]= 50
		pbar1.update_idletasks()

		for link in links:
			rurl = link.attrs['href']
			if ('data-uch' in link.attrs and '/url?q=' in rurl):
				try:
					st = rurl.find("http")
					end = rurl.find("&sa")
					url = rurl[st:end]
					url = url.replace("%3D","=")
					url = url.replace("%26","&")
					url = url.replace("%3"+"F","?")
					urlf = url
					pbar1["value"]= 60
					pbar1.update_idletasks()
					result = requests.get(url)
					pbar1["value"]= 80
					pbar1.update_idletasks()
					src = result.content
					pbar1["value"]= 90
					pbar1.update_idletasks()
					soup = BeautifulSoup(src,'lxml')
					pbar1.config(value = 95)
					title = soup.title
					if title == None:
						continue
					titlef = title.text
					break
				except:
					break
	except:
		exception = "Encounterd some network restrictions!"
		print(exception)

	timeEl1 = str(time.time() - begin1)

	dataFrame = Frame(tab1,width=80,relief="sunken")
	u = Label(dataFrame,text=urlf,font=("Arial",11),foreground="#111180",wrap=700)
	n = Label(dataFrame,text=titlef,font=("Arial",12),wrap=700)
	t = Label(dataFrame,text="Time elasped - "+timeEl1+"s")
	u.grid(row=0,column=0,sticky="NW",pady=2,padx=10)
	u.bind("<Button-1>", openurl)
	n.grid(row=1,column=0,sticky="NW",pady=2,padx=10)
	t.grid(row=2,column=0,sticky="NW",pady=2,padx=10)
	dataFrame.grid(row=gridRow1,column=0,pady=10,padx=40,sticky="NW")
	gridRow1+=1

	pbar1["value"]= 100
	pbar1.update_idletasks()

	input1['state']='normal'
	searchBtn1['state']='normal'
	input1.update_idletasks()
	searchBtn1.update_idletasks()

searchBtn1["command"] = GoogleSearch

# Packing

input1.grid(row=0,column=0,ipadx=10,ipady=10,padx=40,pady=10)
input1.bind("<Return>",initGoogleSearch)
searchBtn1.grid(row=1,column=0,ipadx=10,ipady=10,pady=10)
pbar1.grid(row=2,column=0,pady=10)
results1.grid(row=3,column=0,ipadx=10,pady=10)

# -----------------------FLIPKART------------------------------------

#FlipkartResults

input2 = Entry(tab2,width="122")
input2.insert(0,"Enter your search term")
searchBtn2 = Button(tab2,text="Search")
pbar2 = Progressbar(tab2, length=700, value = 0)
results2 = Label(tab2,text="Search Results")
dataFrame2 = Frame(tab2,width=1000,border=0)
Image21 = None

# Input
def FlipkartSearch ():

	global Image21
	global dataFrame2

	input2['state']='disabled'
	searchBtn2['state']='disabled'
	input2.update_idletasks()
	searchBtn2.update_idletasks()
	
	pbar2["value"]=0
	pbar2.update_idletasks()

	begin2 = time.time()

	searchKey = input2.get()
	searchKey = searchKey.strip().replace(' ','+')
	searchUrl = "https://www.flipkart.com/search?q="+searchKey+"&otracker=search&otracker1=search&sort=relevance"
	pbar2["value"]=5
	pbar2.update_idletasks()
	
	result = requests.get(searchUrl)
	pbar2["value"]=20
	pbar2.update_idletasks()
	src = result.content
	pbar2["value"]=30
	pbar2.update_idletasks()
	soup = BeautifulSoup(src,'lxml')
	notfound = soup.select(".DUFPUZ")
	pbar2["value"]=40
	pbar2.update_idletasks()
	if notfound != []:
		dataFrame2.destroy()
		dataFrame2 = Frame(tab2,width=1000,border=0)
		site = Label(dataFrame2,text="Flipkart Search Result",font=("Arial","15","bold italic"))
		n = Label(dataFrame2,text="Sorry, no results found!",wrap=900)
		
		site.grid(row=0,column=0,sticky="EWNS",pady=2,padx=10,columnspan=2)
		n.grid(row=1,column=1,sticky="NW",pady=2,padx=10)
		dataFrame2.grid(row=5,column=0,pady=10,padx=40,sticky="NW")

		timeEl2 = str(time.time() - begin2)
		t = Label(dataFrame2,text="Time Elasped - "+timeEl2+"s")
		t.grid(row=2,column=1,sticky="NW",pady=2,padx=10)

		pbar2["value"]=100
		pbar2.update_idletasks()

	else:
		links = soup("a")
		for link in links:
			if 'target' in link.attrs:
				if link.attrs['target']=='_blank':
					searchUrl = "https://flipkart.com"+link.attrs['href']
					break

		result = requests.get(searchUrl)
		pbar2["value"]=50
		pbar2.update_idletasks()
		src = result.content
		pbar2["value"]=60
		pbar2.update_idletasks()
		soup = BeautifulSoup(src,'lxml')
		pbar2["value"]=70
		pbar2.update_idletasks()

		# ------------------------
		imgURL = []
		images = soup.select("._3MF26o")
		for image in images:
			rurl = image.div.attrs["style"]
			st = rurl.find("http")
			end = rurl.find("?q=")
			imgURL.append(rurl[st:end+1]+"100")
			break

		# ---------------------------
		name = soup.p.text
		discount = soup.select("._1iCvwn")
		if discount==[]:
			discount = ' - '
		else:
			discount=discount[0].text[:-4]
		iprice = soup.select("._3auQ3N")
		if iprice == []:
			iprice = "-"
		else:
			iprice = iprice[0].text[1:]
		fprice = soup.select("._1vC4OE._3qQ9m1")[0].text[1:]
		pbar2["value"]=80
		pbar2.update_idletasks()

		# --------------------------------------

		# Removing Scope 
		del result
		del src
		del soup

		# ----------------------------

		dataFrame2.destroy()
		dataFrame2 = Frame(tab2,width=1000,border=0)
		
		# i = Frame(dataFrame,width=80,relief="sunken")
		site = Label(dataFrame2,text="Flipkart Search Result",font=("Arial","15","bold italic"))
		n = Label(dataFrame2,text="Product Name - "+name,wrap=700)
		ip = Label(dataFrame2,text="Original Price - ₹ "+iprice)
		fp = Label(dataFrame2,text="Final Price - ₹ "+fprice)
		d = Label(dataFrame2,text="Discount - "+discount)
		i = Label(dataFrame2,text= "Image NOT AVAILABLE")
		
		site.grid(row=0,column=0,sticky="EWNS",pady=2,padx=10,columnspan=2)
		i.grid(row=1,column=0,sticky="NW",pady=5,padx=10,rowspan=5)
		n.grid(row=1,column=1,sticky="NW",pady=2,padx=10)
		ip.grid(row=2,column=1,sticky="NW",pady=2,padx=10)
		fp.grid(row=3,column=1,sticky="NW",pady=2,padx=10)
		d.grid(row=4,column=1,sticky="NW",pady=2,padx=10)
		dataFrame2.grid(row=5,column=0,pady=10,padx=40,sticky="NW")

		if imgURL != []:
			img_url = imgURL[0]
			img_fetched = urlopen(img_url)
			img = Image.open(img_fetched)
			manip_img = img.resize((50,50), Image.ANTIALIAS)
			Image21 = (ImageTk.PhotoImage(img))
			i["image"]=Image21
			pbar2["value"]=95
			pbar2.update_idletasks()

		# ---------------------------------------

		timeEl2 = str(time.time() - begin2)
		t = Label(dataFrame2,text="Time Elasped - "+timeEl2+"s")
		t.grid(row=5,column=1,sticky="NW",pady=2,padx=10)
		pbar2["value"]=100
		pbar2.update_idletasks()

	input2['state']='normal'
	searchBtn2['state']='normal'
	input2.update_idletasks()
	searchBtn2.update_idletasks()

searchBtn2["command"] = FlipkartSearch

# Packing

input2.grid(row=0,column=0,ipadx=10,ipady=10,padx=40,pady=10)
input2.bind("<Return>",initFlipkartSearch)
searchBtn2.grid(row=1,column=0,ipadx=10,ipady=10,pady=10)
pbar2.grid(row=2,column=0,pady=10)
results2.grid(row=3,column=0,ipadx=10,pady=10)

# -----------------------SHOPCLUES VS FLIPKART VS AMAZON------------------------------------

input4 = Entry(tab4,width="122")
input4.insert(0,"Enter your search term")
searchBtn4 = Button(tab4,text="Search")
pbar4 = Progressbar(tab4, length=700, value = 0)
results4 = Label(tab4,text="Search Results")
Image41 = None
Image42 = None
Image43 = None
dataFrame4 = Frame(tab4,width=200,border=0)

def Compare ():

	global Image41
	global Image42
	global Image43
	global dataFrame4

	input4['state']='disabled'
	searchBtn4['state']='disabled'
	input4.update_idletasks()
	searchBtn4.update_idletasks()

	begin4 = time.time()
	pbar4["value"]=0
	pbar4.update_idletasks()
	name,iprice,fprice,discount = '-','-','-','-'

	# -----------------------FLIPKART----------------------

	searchKey = input4.get()
	searchKeyUniv = None
	searchKey = searchKey.strip().replace(' ','+')
	searchUrl = "https://www.flipkart.com/search?q="+searchKey+"&otracker=search&otracker1=search&sort=relevance"
	result = requests.get(searchUrl)

	src = result.content
	soup = BeautifulSoup(src,'lxml')
	pbar4["value"]=10
	pbar4.update_idletasks()

	notfound = soup.select(".DUFPUZ")
	if notfound != []:
		dataFrame4.destroy()
		dataFrame4 = Frame(tab4,width=1000,border=0)
		site = Label(dataFrame4,text="Flipkart",font=("Arial","15","bold italic"),wrap=200,justify="center")
		n = Label(dataFrame4,text="Sorry, no results found!",wrap=280,justify="center",width=40)
		
		site.grid(row=0,column=0,sticky="EWNS",pady=2,padx=10)
		n.grid(row=1,column=0,sticky="NW",pady=2,padx=10)
		dataFrame4.grid(row=5,column=0,pady=10,padx=40,sticky="NW")
		pbar4["value"]=30
		pbar4.update_idletasks()
	
	else:
		links = soup("a")
		for link in links:
			if 'target' in link.attrs:
				if link.attrs['target']=='_blank':
					searchUrl = "https://flipkart.com"+link.attrs['href']
					break

		result = requests.get(searchUrl)
		src = result.content
		soup = BeautifulSoup(src,'lxml')
		pbar4["value"]=20
		pbar4.update_idletasks()

		# ------------------------
		imgURL = []
		images = soup.select("._3MF26o")
		for image in images:
			rurl = image.div.attrs["style"]
			st = rurl.find("http")
			end = rurl.find("?q=")
			imgURL.append(rurl[st:end+1]+"100")
			break

		# ---------------------------
		names = soup.p
		if names!=None:
			name = names.text
		searchKeyUniv = name
		discount = soup.select("._1iCvwn")
		if discount==[]:
			discount = ' - '
		else:
			discount=discount[0].text[:-4]
		iprice = soup.select("._3auQ3N")
		if iprice == []:
			iprice = "-"
		else:
			iprice = iprice[0].text[1:]
		fprice = soup.select("._1vC4OE._3qQ9m1")[0].text[1:]

		# --------------------------------------

		# Removing Scope 
		del result
		del src
		del soup

		# ----------------------------

		dataFrame4.destroy()
		dataFrame4 = Frame(tab4,width=1000,border=0)
		
		site = Label(dataFrame4,text="Flipkart",font=("Arial","15","bold italic"),justify="center")
		n = Label(dataFrame4,text="Product Name - "+name,wrap=280)
		ip = Label(dataFrame4,text="Original Price - ₹ "+iprice)
		fp = Label(dataFrame4,text="Final Price - ₹ "+fprice,font=("Arial","10","bold"))
		d = Label(dataFrame4,text="Discount - "+discount)
		i = Label(dataFrame4,text= "Image NOT AVAILABLE",width=40,justify="center")

		site.grid(row=0,column=0,pady=2,padx=10)
		i.grid(row=1,column=0,pady=5,padx=10)
		n.grid(row=2,column=0,sticky="NW",pady=2,padx=10)
		ip.grid(row=3,column=0,sticky="NW",pady=2,padx=10)
		fp.grid(row=4,column=0,sticky="NW",pady=2,padx=10)
		d.grid(row=5,column=0,sticky="NW",pady=2,padx=10)
		dataFrame4.grid(row=4,column=0,pady=10,padx=40,sticky="NW")
		
		if imgURL != []:
			img_url = imgURL[0]
			img_fetched = urlopen(img_url)
			img = Image.open(img_fetched)
			manip_img = img.resize((50,50), Image.ANTIALIAS)
			Image41 = (ImageTk.PhotoImage(img))
			i["image"]=Image41
		pbar4["value"]=30
		pbar4.update_idletasks()

	results4.update_idletasks()

	# -------------------------SHOPCLUES--------------------------

	searchKey= searchKeyUniv
	searchKey = searchKey.strip().replace(' ','+')
	searchUrl = "https://www.shopclues.com/search?q="+searchKey+"&sc_z=2222&z=0&sort_by=score&sort_order=desc"
	result = requests.get(searchUrl)

	src = result.content
	soup = BeautifulSoup(src,'lxml')
	pbar4["value"]=40
	pbar4.update_idletasks()

	name,iprice,fprice,discount = '-','-','-','-'

	notfound = soup.select(".no_fnd")
	if notfound != []:
		site2 = Label(dataFrame4,text="ShopClues",font=("Arial","15","bold italic"),justify="center")
		n2 = Label(dataFrame4,text="Sorry, no results found!",justify="center")
		spacer2 = Label(dataFrame4,text="   ",width=40,justify="center")
		
		site2.grid(row=0,column=1,pady=2,padx=10)
		n2.grid(row=1,column=1,pady=2,padx=10)
		spacer2.grid(row=2,column=1,sticky="NW",pady=2,padx=10)
		dataFrame4.grid(row=5,column=0,pady=10,padx=40,sticky="NW")
		pbar4["value"]=60
		pbar4.update_idletasks()

	else:
		links = soup("a")
		for link in links:
			if 'target' in link.attrs:
				if link.attrs['target']=='_blank' and "https" not in link.attrs['href']:
					searchUrl = "https:"+link.attrs['href']
					break

		result = requests.get(searchUrl)
		src = result.content
		soup = BeautifulSoup(src,'lxml')
		pbar4["value"]=50
		pbar4.update_idletasks()

		# --------------------------------------
		# IMG url
		image = soup.select("#zoom_picture_gall")
		imgURL = []
		if image != []:
			imgURL.append(image[0].attrs["src"])

		# --------------------------------------
		# Info
		names = soup.h1
		if names!=None:
			name = names.text.strip()

		discounts = soup.select(".discount")
		if discounts!=[]:
			discount=discounts[0].text[:-4]
		iprices = soup.select("#sec_list_price_")
		if iprices != []:
			iprice = iprices[0].text[3:]

		fprices = soup.select(".f_price")
		if fprices != []:
			fprice = fprices[0].text[3:].strip()
		
		# -----------------------------------------

		# Removing Scope 
		del result
		del src
		del soup

		# ----------------------------

		site2 = Label(dataFrame4,text="ShopClues",font=("Arial","15","bold italic"),justify="center",wrap=280)
		n2 = Label(dataFrame4,text="Product Name - "+name,wrap=280)
		ip2 = Label(dataFrame4,text="Original Price - ₹ "+iprice)
		fp2 = Label(dataFrame4,text="Final Price - ₹ "+fprice,font=("Arial","10","bold"))
		d2 = Label(dataFrame4,text="Discount - "+discount)
		i2 = Label(dataFrame4,text= "Image NOT AVAILABLE",width=40,justify="center")

		site2.grid(row=0,column=1,pady=2,padx=10)
		i2.grid(row=1,column=1,pady=2,padx=10)
		n2.grid(row=2,column=1,sticky="NW",pady=2,padx=10)
		ip2.grid(row=3,column=1,sticky="NW",pady=2,padx=10)
		fp2.grid(row=4,column=1,sticky="NW",pady=2,padx=10)
		d2.grid(row=5,column=1,sticky="NW",pady=2,padx=10)
		dataFrame4.grid(row=4,column=0,pady=10,padx=40,sticky="NW")

		if imgURL != []:
			img_url = imgURL[0]
			img_fetched = urlopen(img_url)
			img = Image.open(img_fetched)
			[imgW, imgH] = img.size
			if (imgW >= imgH and imgW > 150):
					imgWt = imgW
					imgW = 150
					imgH = (150 * imgH) // imgWt
			elif (imgH > imgW and imgH > 150):
					imgHt = imgH
					imgH = 150
					imgW = (150 * imgW) // imgHt
			manip_img = img.resize((imgW,imgH), Image.ANTIALIAS)
			Image42 = (ImageTk.PhotoImage(manip_img))
			i2["image"]=Image42
		pbar4["value"]=60
		pbar4.update_idletasks()

	results4.update_idletasks()

	# -------------------AMAZON--------------------------------------

	searchKey = searchKeyUniv.lower()
	searchKey = searchKey.strip().replace(' ','+')
	searchUrl = "http://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords="+searchKey

	headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0", "Accept-Encoding":"gzip, deflate", "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", "DNT":"1","Connection":"close", "Upgrade-Insecure-Requests":"1"}
	result = requests.get(searchUrl,headers=headers)

	src = result.content
	soup = BeautifulSoup(src,'lxml')
	soup1 = soup
	pbar4["value"]=70
	pbar4.update_idletasks()

	name,iprice,fprice,discount = '-','-','-','-'

	notfound = soup.select(".a-link-normal.a-text-normal")
	if notfound == []:
		site3 = Label(dataFrame4,text="Amazon",font=("Arial","15","bold italic"),wrap=200,justify="center")
		n3 = Label(dataFrame4,text="Sorry, no results found!",wrap=280,width=40,justify="center")
		
		site3.grid(row=0,column=2,sticky="NW",pady=2,padx=10)
		n3.grid(row=1,column=2,sticky="NW",pady=2,padx=10)
		dataFrame4.grid(row=5,column=0,pady=10,padx=40,sticky="NW")
		pbar4["value"]=90
		pbar4.update_idletasks()

	else:
		imgURL = []

		for url in notfound:
			url = "http://www.amazon.in/" + url.attrs["href"]
			url = url.replace("%3D","=")
			url = url.replace("%26","&")
			url = url.replace("%3"+"F","?")
			searchUrl = url
			result = requests.get(searchUrl,headers=headers)
			src = result.content
			soup = BeautifulSoup(src,'lxml')
			pbar4["value"]=80
			pbar4.update_idletasks()

			images = soup1.select("img.s-image")
			if images != []:
				for image in images:
					if "https://m.media-amazon.com/images/G/31/img20/AmazonBrands/logos/ABasics._QL95_SY80_.jpg" in image.attrs["src"]:
						continue
					else:
						imgURL.append(image.attrs["src"])
						break
			break

		names = soup.select("#title")
		if names != []:
			name = names[0].text.strip()

		iprices = soup.select(".priceBlockStrikePriceString")
		if iprices != []:
			iprice = iprices[0].text.strip()[2:]

		fprices = soup.select("#priceblock_ourprice")
		if fprices != []:
			fprice = fprices[0].text.strip()[2:]

		discounts = soup.select(".priceBlockSavingsString")
		if iprices != []:
			discount = discounts[0].text.strip()[2:]

		site3 = Label(dataFrame4,text="Amazon",font=("Arial","15","bold italic"),justify="center")
		n3 = Label(dataFrame4,text="Product Name - "+name,wrap=280)
		ip3 = Label(dataFrame4,text="Original Price - ₹ "+iprice)
		fp3 = Label(dataFrame4,text="Final Price - ₹ "+fprice,font=("Arial","10","bold"))
		d3 = Label(dataFrame4,text="Discount - "+discount)
		i3 = Label(dataFrame4,text= "Image NOT AVAILABLE",width=40,justify="center")

		site3.grid(row=0,column=2,pady=2,padx=10)
		i3.grid(row=1,column=2,pady=5,padx=10)
		n3.grid(row=2,column=2,sticky="NW",pady=2,padx=10)
		ip3.grid(row=3,column=2,sticky="NW",pady=2,padx=10)
		fp3.grid(row=4,column=2,sticky="NW",pady=2,padx=10)
		d3.grid(row=5,column=2,sticky="NW",pady=2,padx=10)
		dataFrame4.grid(row=4,column=0,pady=10,padx=40,sticky="NW")
		
		if imgURL != []:
			img_url = imgURL[0]
			img_fetched = urlopen(img_url)
			img = Image.open(img_fetched)
			[imgW, imgH] = img.size
			if (imgW >= imgH and imgW > 150):
				imgWt = imgW
				imgW = 150
				imgH = (150 * imgH) // imgWt
			elif (imgH > imgW and imgH > 150):
				imgHt = imgH
				imgH = 150
				imgW = (150 * imgW) // imgHt
			manip_img = img.resize((imgW,imgH), Image.ANTIALIAS)
			Image43 = (ImageTk.PhotoImage(manip_img))
			i3["image"]=Image43

		pbar4["value"]=90
		pbar4.update_idletasks()

	# -----------------------------------------

	timeEl4 = str(time.time() - begin4)
	t = Label(dataFrame4,text="Time Elasped - "+timeEl4+"s",font=("Arial",10,'italic'))
	t.grid(row=12,column=0,pady=15,padx=10,columnspan=3)
	pbar4["value"]=100
	pbar4.update_idletasks()

	input4['state']='normal'
	searchBtn4['state']='normal'
	input4.update_idletasks()
	searchBtn4.update_idletasks()

searchBtn4["command"] = Compare

input4.grid(row=0,column=0,ipadx=10,ipady=10,padx=40,pady=10)
input4.bind("<Return>",initCompare)
searchBtn4.grid(row=1,column=0,ipadx=10,ipady=10,pady=10)
pbar4.grid(row=2,column=0,pady=10)
results4.grid(row=3,column=0,ipadx=10,pady=10)

root.mainloop()