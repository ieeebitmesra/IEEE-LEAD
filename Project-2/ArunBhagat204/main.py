from tkinter import *
from tkinter import Grid
from bs4 import BeautifulSoup
from PIL import ImageTk,Image
from io import BytesIO
from urllib.request import urlopen
import requests
import webbrowser

root = Tk()
root.columnconfigure((0,1,2), weight = 1)
root.configure(bg = "white")

section_head_font = ('Verdana', 14, 'bold', 'underline')
subhead_font = ("Arial", 10, 'italic', 'bold')
entry_font = ('Verdana', 15)
head_font = ('Times New Roman', 16, 'bold')
google_title_font = ('Arial', 18)
google_link_font = ('Arial', 11)
google_desc_font = ('Arial', 11)
text_font = ("Helvetica", 10)
title_font = ("Arial", 12, 'bold')


root.title("E-Commerce Price Comparator")
Label(root, text = "E-Commerce Price Comparator", bg = "white", fg = "#FF851B" , font = head_font).grid(row = 0, pady = 10, columnspan = 3)

e = Entry(root, font = entry_font, bg = "#FFDC00")
e.grid(row = 1, columnspan = 3)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

def clear():
    list = root.grid_slaves()[:-5]
    for l in list:
        l.destroy()
        
def combine_funcs(*funcs):
    def combined_func(*args, **kwargs):
        for f in funcs:
            f(*args, **kwargs)
    return combined_func

#GOOGLE
def callback(event):
    webbrowser.open_new(event.widget.cget("text"))

def googleScrape(searchTerm):
    googleLink = f"https://www.google.com/search?q={searchTerm}"
    googleSource = requests.get(googleLink, headers = headers).text
    googleSoup = BeautifulSoup(googleSource, 'lxml')
    prettyGoogle = googleSoup.prettify()
    
    googleResultSet = googleSoup.findAll("div", {"class": "rc"})
    googleNoResult = False
    if(len(googleResultSet)!=0):
        googleResultLink = googleResultSet[0].a['href']
        googleResultTitle = googleResultSet[0].h3.text
        googleResultDesc = googleResultSet[0].find("span", {"class": "st"}).text
    else:
        googleNoResult = True
        googleResultLink = "NO RESULTS FOUND"
        googleResultTitle = "NO RESULTS FOUND"
        googleResultDesc = "NO RESULTS FOUND"
    
    googleResultLinkLabel = Label(root, text = googleResultLink, font = google_link_font, fg = "#609", bg = "white")
    googleResultTitleLabel = Label(root, text = googleResultTitle, font = google_title_font, fg = "#1a0dab", bg = "white")
    googleResultDescLabel = Message(root, text = googleResultDesc, font = google_desc_font, bg = "white", width = 1000)
    googleResultTitleLabel.grid(row = 3, pady = 0, columnspan = 3, sticky = W)
    googleResultLinkLabel.grid(row = 4, pady = 0, columnspan = 3, sticky = W)
    googleResultLinkLabel.bind("<Button-1>", callback)
    googleResultDescLabel.grid(row = 5, pady = 2, columnspan = 3, sticky = W)

#FLIPKART
def flipScrape(searchTerm):
    
    flipLink = f"https://www.flipkart.com/search?q={searchTerm}"
    flipSource = requests.get(flipLink).text
    flipSoup = BeautifulSoup(flipSource, 'lxml')
    prettyFlip = flipSoup.prettify()
    
    flipRows = flipSoup.findAll("div", {"class": "_3O0U0u"})
    flipNoProduct = False
    if(len(flipRows)==0):
        flipNoProduct = True
    else:  
        flipItems = flipRows[0].findAll("a")
        flipItemLink = flipItems[0]['href']
        flipItemLink = "https://www.flipkart.com" + flipItemLink 
        
        flipItemSource = requests.get(flipItemLink).text
        flipItemSoup = BeautifulSoup(flipItemSource, 'lxml')
        prettyFlipItem = flipSoup.prettify()
        
        flipImageDiv = flipItemSoup("div", {"class": "_3MF26o SGxMsH"})
        if(len(flipImageDiv)==0):
            flipImageLink = "NO IMAGE"
        else:
            flipImage = flipImageDiv[0].div['style']
            flipImageLink = flipImage.split('(')
            flipImageLink = flipImageLink[1].split(')')
            flipImageLink = flipImageLink[0]
            flipImageLink = flipImageLink.replace("128", "352")
            flipImageLink = flipImageLink.split("?")[0]
        
        flipNameSpan = flipItemSoup("span", {"class": "_35KyD6"})
        flipName = flipNameSpan[0].text
        
        flipPriceDiv = flipItemSoup("div", {"class": "_1vC4OE _3qQ9m1"})
        flipPrice = flipPriceDiv[0].text
        
        flipRatingDiv = flipItemSoup("div", {"class": "hGSR34"})
        flipRating = flipRatingDiv[0].text
        
        flipReviewDiv = flipItemSoup("div", {"class": "col _390CkK"})
        if(len(flipReviewDiv)>=1):
            flipReviewParts = flipReviewDiv[0].findAll("div")
            flipReviewHead = flipReviewParts[0].text
            flipReviewStar = flipReviewHead[0]
            flipReviewTitle = flipReviewHead[1:]
            flipReviewText = flipItemSoup("div", {"class": "qwjRop"})[0].text
            if(len(flipReviewText)>325):
                flipReviewText = flipReviewText[0:315] + "..."
            flipReviewText = flipReviewText.split("READ MORE")[0] + "..."
            if(len(flipReviewDiv)>=2):
                flipReview2Parts = flipReviewDiv[1].findAll("div")
                flipReview2Head = flipReview2Parts[0].text
                flipReview2Star = flipReview2Head[0]
                flipReview2Title = flipReview2Head[1:]
                flipReview2Text = flipItemSoup("div", {"class": "qwjRop"})[1].text
                if(len(flipReview2Text)>325):
                    flipReview2Text = flipReview2Text[0:315] + "..."
                flipReview2Text = flipReview2Text.split("READ MORE")[0] + "..."
            else:
                flipReview2Star = "N/A"
                flipReview2Title = "N/A"
                flipReview2Text = "N/A"
        else:
            flipReviewStar = "N/A"
            flipReviewTitle = "N/A"
            flipReviewText = "N/A"    
            flipReview2Star = "N/A"
            flipReview2Title = "N/A"
            flipReview2Text = "N/A"
        
        flipSpecsDiv = flipItemSoup("div", {"class": "g2dDAR"})
        flipNoSpecs = False
        if(len(flipSpecsDiv)==0):
            flipSpecs = "NO HIGHLIGHTS"
            flipNoSpecs = True
        else:
            flipSpecsParts = flipSpecsDiv[0].findAll("li")
            flipSpecsCount = len(flipSpecsParts)
            flipSpecs = ""
            i = 0
            while(i<flipSpecsCount):
                flipSpecs += (flipSpecsParts[i].text) + "~"
                i+=1
            flipSpecs = flipSpecs[0:-1]
            flipSpecs = flipSpecs.split("~")
            
    def flipReviewDisplay(rowCount):
        reviewWindow = Toplevel(root)
        reviewWindow.title("PRODUCT REVIEWS")
        reviewWindow.configure(bg = "white")
        Label(reviewWindow, text = "REVIEWS", bg = "white", font = title_font).grid(row = rowCount, column = 0, pady = 2, sticky = W)
        rowCount = rowCount + 1
        Label(reviewWindow, text = "REVIEW 1 : ", bg = "white", font = subhead_font, fg = "#609").grid(row = rowCount, column = 0, pady = 2, sticky = W)
        rowCount = rowCount + 1
        Label(reviewWindow, text = flipReviewTitle + f" ({flipReviewStar}*)", bg = "white", font = title_font).grid(row = rowCount, column = 0, columnspan = 3, sticky = W)
        rowCount = rowCount + 1
        Message(reviewWindow, text = flipReviewText, bg = "white", font = text_font, width = 500).grid(row = rowCount, rowspan = 2, column = 0, columnspan = 3, sticky = W)
        rowCount = rowCount + 2
        Label(reviewWindow, text = "REVIEW 2 :", bg = "white", font = subhead_font, fg = "#609").grid(row = rowCount, column = 0, pady = 2, sticky = W)
        rowCount = rowCount + 1
        Label(reviewWindow, text = flipReview2Title + f" ({flipReview2Star}*)", bg = "white", font = title_font).grid(row = rowCount, column = 0, columnspan = 3, sticky = W)
        rowCount = rowCount + 1
        Message(reviewWindow, text = flipReview2Text, bg = "white", font = text_font, width = 500).grid(row = rowCount, rowspan = 2, column = 0, columnspan = 3, sticky = W)
        rowCount = rowCount + 2     
        
    def flipImageDisplay(rowcount, flipImageLink):
        imageWindow = Toplevel(root)
        imageWindow.title("PRODUCT IMAGE")
        imageWindow.configure(bg = "white")
        URL = flipImageLink
        u = urlopen(URL)
        raw_data = u.read()
        u.close()
        im = Image.open(BytesIO(raw_data))
        photo = ImageTk.PhotoImage(im)
        label = Label(imageWindow, image = photo)
        label.image = photo
        label.pack()
    
    Label(root, text = "FLIPKART RESULT", font = section_head_font, fg = "#1a0dab", bg = "white").grid(row = 3, column = 0, pady = 2, padx = (100,0), sticky = W)
    if(flipNoProduct == True):
        Message(root, text = "NO SUCH PRODUCT FOUND", bg = "white", font = title_font, width = 400).grid(row = 4, column = 0, pady = 2, sticky = W)
    else:
        Message(root, text = flipName, bg = "white", font = title_font, width = 450).grid(row = 4, column = 0, pady = 2, sticky = W)
        imageButton = Button(root, text = "View Image", command = lambda: flipImageDisplay(rowCount, flipImageLink), bg = "#7FDBFF")
        imageButton.grid(row = 5, column = 0, pady = 10, padx = (160,0), sticky = W)
        Label(root, text = "Price : " + flipPrice, bg = "white", font = title_font, fg = "#FFDC00").grid(row = 6, column = 0, pady = 2, sticky = W, padx = (140,0))
        Label(root, text = "Rating : " + flipRating + "*", bg = "white", font = title_font, fg = "#2ECC40").grid(row = 7, column = 0, sticky = W, pady = 2, padx = (144,0))
        Label(root, text = "SPECIFICATIONS", bg = "white", font = title_font).grid(row = 8, column = 0, pady = 2, sticky = W)
        rowCount = 9
        specCount = 0
        if(flipNoSpecs == False):
            for spec in flipSpecs:
                Message(root, text = f"{specCount+1}) " + flipSpecs[specCount], bg = "white", font = text_font, width = 500).grid(row = rowCount, column = 0, sticky = W)
                rowCount = rowCount + 1
                specCount = specCount + 1
        else:
            Label(root, text = "NO HIGHLIGHTS", bg = "white", font = text_font).grid(row = rowCount, column = 0, sticky = W) 
            rowCount = rowCount + 1
            
        reviewButton = Button(root, text = "View Reviews", command = lambda: flipReviewDisplay(rowCount), bg = "#7FDBFF")
        reviewButton.grid(row = rowCount, column = 0, pady = 10, padx = (160,0), sticky = W)
        rowCount = rowCount + 1

    

#AMAZON
def amazScrape(searchTerm): 
    amazLink = f"https://www.amazon.in/s?k={searchTerm}"
    amazSource = requests.get(amazLink, headers = headers).text
    amazSoup = BeautifulSoup(amazSource, 'lxml')
    prettyAmaz = amazSoup.prettify()
    amazNoProduct = False
    
    amazRows = amazSoup.findAll("h2", {"class": "a-size-mini a-spacing-none a-color-base s-line-clamp-2"})
    if(len(amazRows)>=4):
        n = 3;
    else:
        n = (len(amazRows)-1);
    if(n!=-1):
        amazItems = amazRows[n].findAll("a")
        amazItemLink = amazItems[0]['href']
        amazItemLink = "https://www.amazon.in" + amazItemLink 
        
        amazItemSource = requests.get(amazItemLink, headers = headers).text
        amazItemSoup = BeautifulSoup(amazItemSource, 'lxml')
        prettyAmazItem = amazSoup.prettify()
        
        amazImageDiv = amazSoup("div", {"class": "a-section aok-relative s-image-square-aspect"})
        if(len(amazImageDiv)==0):
            amazImageDiv = amazSoup("div", {"class": "a-section aok-relative s-image-fixed-height"})
        amazImageLink = amazImageDiv[n].img['src']
        
        amazNameSpan = amazSoup("span", {"class": "a-size-medium a-color-base a-text-normal"})
        amazName = amazNameSpan[n].text
        
        amazPriceSpan = amazSoup("span", {"class": "a-price-whole"})
        amazPrice = amazPriceSpan[n].text
        
        amazRatingSpan = amazSoup("span", {"class": "a-icon-alt"})
        amazRating = amazRatingSpan[n].text
        amazRating = amazRating.split(" ")[0]
        
        amazSpecsList = amazItemSoup("ul", {"class": "a-unordered-list a-vertical a-spacing-mini"})
        amazNoSpecs = False
        if(len(amazSpecsList)==0):
            amazSpecs = "NO HIGHLIGHTS"
            amazNoSpecs = True
        else:
            amazSpecsParts = amazSpecsList[0].findAll("li")
            amazSpecsCount = len(amazSpecsParts)
            amazSpecs = ""
            i = 0
            while(i<amazSpecsCount):
                amazSpecs += (amazSpecsParts[i].text) + "~"
                i+=1
            amazSpecs = amazSpecs[0:-1]
            amazSpecs = amazSpecs.split("~")
            i = 0
            while(i<amazSpecsCount):
                amazSpecs[i] = amazSpecs[i].strip()
                i+=1
            if(len(amazSpecs)>=5):
                amazSpecs = amazSpecs[0:5]
        
        amazReviewDiv = amazItemSoup("div", {"class": "a-section review aok-relative"})
        if(len(amazReviewDiv)>=1):
            amazReviewStar = amazReviewDiv[0].i.text
            amazReviewStar = amazReviewStar.split(" ")[0]
            amazReviewTitle = amazReviewDiv[0].find("a", {"class": "a-size-base a-link-normal review-title a-color-base review-title-content a-text-bold"}).text
            amazReviewDesc = amazReviewDiv[0].find("div", {"class": "a-expander-content reviewText review-text-content a-expander-partial-collapse-content"}).text
            amazReviewDesc = amazReviewDesc.strip()
            amazReviewDesc = amazReviewDesc[0:450] + "..."
            if(len(amazReviewDiv)>=2):
                amazReview2Star = amazReviewDiv[1].i.text
                amazReview2Star = amazReview2Star.split(" ")[0]
                amazReview2Title = amazReviewDiv[1].find("a", {"class": "a-size-base a-link-normal review-title a-color-base review-title-content a-text-bold"}).text
                amazReview2Desc = amazReviewDiv[1].find("div", {"class": "a-expander-content reviewText review-text-content a-expander-partial-collapse-content"}).text
                amazReview2Desc = amazReview2Desc.strip()
                amazReview2Desc = amazReview2Desc[0:450] + "..."
            else:
                amazReview2Star = "N/A"
                amazReview2Title = "N/A"
                amazReview2Desc = "N/A"
        else:
            amazReviewStar = "N/A"
            amazReviewTitle = "N/A"
            amazReviewDesc = "N/A"
            amazReview2Star = "N/A"
            amazReview2Title = "N/A"
            amazReview2Desc = "N/A"
    else:
        amazNoProduct = True
        
    def amazImageDisplay(rowCount, amazImageLink):
        imageWindow2 = Toplevel(root)
        imageWindow2.title("PRODUCT IMAGE")
        imageWindow2.configure(bg = "white")
        URL = amazImageLink
        u = urlopen(URL)
        raw_data = u.read()
        u.close()
        im = Image.open(BytesIO(raw_data))
        photo = ImageTk.PhotoImage(im)
        label = Label(imageWindow2, image = photo)
        label.image = photo
        label.pack()
        
    def amazReviewDisplay(rowCount):
        reviewWindow2 = Toplevel(root)
        reviewWindow2.title("PRODUCT REVIEWS")
        reviewWindow2.configure(bg = "white")
        Label(reviewWindow2, text = "REVIEWS", bg = "white", font = title_font).grid(row = rowCount, column = 0, pady = 2, sticky = W)
        rowCount = rowCount + 1
        Label(reviewWindow2, text = "REVIEW 1 : ", bg = "white", font = subhead_font, fg = "#609").grid(row = rowCount, column = 0, pady = 2, sticky = W)
        rowCount = rowCount + 1
        Label(reviewWindow2, text = amazReviewTitle + f" ({amazReviewStar}*)", bg = "white", font = title_font).grid(row = rowCount, column = 0, columnspan = 3, sticky = W)
        rowCount = rowCount + 1
        Message(reviewWindow2, text = amazReviewDesc, bg = "white", font = text_font, width = 500).grid(row = rowCount, rowspan = 2, column = 0, columnspan = 3, sticky = W)
        rowCount = rowCount + 2
        Label(reviewWindow2, text = "REVIEW 2 :", bg = "white", font = subhead_font, fg = "#609").grid(row = rowCount, column = 0, pady = 2, sticky = W)
        rowCount = rowCount + 1
        Label(reviewWindow2, text = amazReview2Title + f" ({amazReview2Star}*)", bg = "white", font = title_font).grid(row = rowCount, column = 0, columnspan = 3, sticky = W)
        rowCount = rowCount + 1
        Message(reviewWindow2, text = amazReview2Desc, bg = "white", font = text_font, width = 500).grid(row = rowCount, rowspan = 2, column = 0, columnspan = 3, sticky = W)
        rowCount = rowCount + 2 
        
    Label(root, text = "AMAZON RESULT", font = section_head_font, fg = "#1a0dab", bg = "white").grid(row = 3, column = 1, pady = 2, sticky = W, padx = (100,0))
    if(amazNoProduct == True):
        Message(root, text = "NO SUCH PRODUCT FOUND", bg = "white", font = title_font, width = 400).grid(row = 4, column = 1, pady = 2, sticky = W, padx = (0,294))
    else:  
        Message(root, text = amazName, bg = "white", font = title_font, width = 450).grid(row = 4, column = 1, pady = 2, sticky = W, padx = (0,294))
        imageButton = Button(root, text = "View Image", command = lambda: amazImageDisplay(rowCount, amazImageLink), bg = "#7FDBFF")
        imageButton.grid(row = 5, column = 1, pady = 10, padx = (0,390))
        Label(root, text = "Price : " + amazPrice, bg = "white", font = title_font, fg = "#FFDC00").grid(row = 6, column = 1, pady = 2, sticky = W, padx = (140,0))
        Label(root, text = "Rating : " + amazRating + "*", bg = "white", font = title_font, fg = "#2ECC40").grid(row = 7, column = 1, sticky = W, pady = 2, padx = (144,0))
        Label(root, text = "SPECIFICATIONS", bg = "white", font = title_font).grid(row = 8, column = 1, pady = 2, sticky = W, padx = (0,100))
        rowCount = 9
        specCount = 0
        if(amazNoSpecs == False):
            for spec in amazSpecs:
                Message(root, text = f"{specCount+1}) " + amazSpecs[specCount], bg = "white", font = text_font, width = 450).grid(row = rowCount, column = 1, sticky = W, padx = (0,100))
                rowCount = rowCount + 1
                specCount = specCount + 1
        else:
            Label(root, text = "NO HIGHLIGHTS", bg = "white", font = text_font).grid(row = rowCount, column = 1, sticky = W, padx = (0,100)) 
            rowCount = rowCount + 1
        reviewButton = Button(root, text = "View Reviews", command = lambda: amazReviewDisplay(rowCount), bg = "#7FDBFF")
        reviewButton.grid(row = rowCount, column = 1, pady = 10, padx = (160,0), sticky = W)
        rowCount = rowCount + 1
    

#SNAPDEAL
def snapScrape(searchTerm):
    snapLink = f"https://www.snapdeal.com/search?keyword={searchTerm}"
    snapSource = requests.get(snapLink, headers = headers).text
    snapSoup = BeautifulSoup(snapSource, 'lxml')
    prettySnap = snapSoup.prettify()
    
    snapItems = snapSoup.findAll("div", {"class": "product-tuple-image "})
    snapNoProduct = False
    if(len(snapItems)!=0):
        snapItemLink = snapItems[0].a['href']
        
        snapImageLink = snapItems[0].img['src']
        
        snapItemSource = requests.get(snapItemLink, headers = headers).text
        snapItemSoup = BeautifulSoup(snapItemSource, 'lxml')
        prettySnapItem = snapItemSoup.prettify()
        
        snapNameHead = snapItemSoup("h1", {"class": "pdp-e-i-head"})
        snapName = snapNameHead[0].text
        snapName = snapName.strip()
        
        snapPriceSpan = snapItemSoup("span", {"class": "payBlkBig"})
        snapPrice = snapPriceSpan[0].text
        
        snapRatingSpan = snapItemSoup("span", {"class": "avrg-rating"})
        if(len(snapRatingSpan)>0):
            snapRating = snapRatingSpan[0].text
            snapRating = snapRating[1:-1]
        else:
            snapRating = "N/A"
        
        snapSpecsList = snapItemSoup("ul", {"class": "dtls-list clear"})[0].findAll("li")
        snapNoSpecs = False
        if(len(snapSpecsList)!=0):
            snapSpecsCount = len(snapSpecsList)
            snapSpecs = ""
            i = 0
            while(i<snapSpecsCount):
                snapSpecs += (snapSpecsList[i].text).strip() + "~"
                i+=1
            snapSpecs = snapSpecs[0:-1]
            snapSpecs = snapSpecs.split("~")
            i = 0
            while(i<snapSpecsCount):
                snapSpecs[i] = snapSpecs[i].strip()
                if(len(snapSpecs[i])>=150):
                    snapSpecs[i] = snapSpecs[i][0:50] + "..."
                i+=1
            if(len(snapSpecs)>=6):
                snapSpecs = snapSpecs[0:6]
        else:
            snapNoSpecs = True
            snapSpecs = "NO HIGHLIGHTS"
        
        snapReviewDiv = snapItemSoup.findAll("div", {"class": "user-review"})
        if(len(snapReviewDiv)==0):
            snapReviewDesc = "NO REVIEWS OF THE PRODUCT AVAILABLE"
            snapReview2Desc = "NO REVIEWS OF THE PRODUCT AVAILABLE"
        else:
            snapReviewDesc = snapReviewDiv[0].text
    else:
        snapNoProduct = True
        
    def snapImageDisplay(rowCount, snapImageLink):
        imageWindow3 = Toplevel(root)
        imageWindow3.title("PRODUCT IMAGE")
        imageWindow3.configure(bg = "white")
        URL = snapImageLink
        u = urlopen(URL)
        raw_data = u.read()
        u.close()
        im = Image.open(BytesIO(raw_data))
        photo = ImageTk.PhotoImage(im)
        label = Label(imageWindow3, image = photo)
        label.image = photo
        label.pack()
        
    def snapReviewDisplay(rowCount):
        reviewWindow3 = Toplevel(root)
        reviewWindow3.title("PRODUCT REVIEWS")
        reviewWindow3.configure(bg = "white")
        Label(reviewWindow3, text = "REVIEWS", bg = "white", font = title_font).grid(row = rowCount, column = 0, pady = 2, sticky = W)
        rowCount = rowCount + 1
        Label(reviewWindow3, text = "REVIEW 1 : ", bg = "white", font = subhead_font, fg = "#609").grid(row = rowCount, column = 0, pady = 2, sticky = W)
        rowCount = rowCount + 1
        Message(reviewWindow3, text = snapReviewDesc, bg = "white", font = text_font, width = 500).grid(row = rowCount, rowspan = 2, column = 0, columnspan = 3, sticky = W)
        rowCount = rowCount + 2
        Label(reviewWindow3, text = "REVIEW 2 :", bg = "white", font = subhead_font, fg = "#609").grid(row = rowCount, column = 0, pady = 2, sticky = W)
        rowCount = rowCount + 1
        Message(reviewWindow3, text = snapReview2Desc, bg = "white", font = text_font, width = 500).grid(row = rowCount, rowspan = 2, column = 0, columnspan = 3, sticky = W)
        rowCount = rowCount + 1
        
    Label(root, text = "SNAPDEAL RESULT", font = section_head_font, fg = "#1a0dab", bg = "white").grid(row = 3, column = 0, columnspan =3, pady = 2, sticky = E, padx = 100)
    if(snapNoProduct == True):
        Message(root, text = "NO SUCH PRODUCT FOUND", bg = "white", font = title_font, width = 400).grid(row = 4, column = 0, columnspan = 3, pady = 2, sticky = E, padx = (0,150))
    else:
        Message(root, text = snapName, bg = "white", font = title_font, width = 400).grid(row = 4, column = 0, columnspan = 3, pady = 2, sticky = E)
        imageButton = Button(root, text = "View Image", command = lambda: snapImageDisplay(rowCount, snapImageLink), bg = "#7FDBFF")
        imageButton.grid(row = 5, column = 0, columnspan = 3, pady = 10, padx = (0,160), sticky = E)
        Label(root, text = "Price : " + snapPrice, bg = "white", font = title_font, fg = "#FFDC00").grid(row = 6, column = 0, columnspan = 3, pady = 2, sticky = E, padx = (0,150))
        Label(root, text = "Rating : " + snapRating + "*", bg = "white", font = title_font, fg = "#2ECC40").grid(row = 7, column = 0, columnspan = 3, sticky = E, pady = 2, padx = (0,150))
        Label(root, text = "SPECIFICATIONS", bg = "white", font = title_font).grid(row = 8, column = 0, columnspan = 3, pady = 2, sticky = E, padx = (0,242))
        rowCount = 9
        specCount = 0
        if(snapNoSpecs == False):
            for spec in snapSpecs:
                Message(root, text = f"{specCount+1}) " + snapSpecs[specCount], bg = "white", font = text_font, width = 450).grid(row = rowCount, column = 0, columnspan = 3, sticky = W, padx = (982,0))
                rowCount = rowCount + 1
                specCount = specCount + 1
        else:
            Label(root, text = "NO HIGHLIGHTS", bg = "white", font = text_font).grid(row = rowCount, column = 0, columnspan = 3, sticky = E, padx = (0,300)) 
            rowCount = rowCount + 1
        reviewButton = Button(root, text = "View Reviews", command = lambda: snapReviewDisplay(rowCount), bg = "#7FDBFF")
        reviewButton.grid(row = rowCount, column = 0, columnspan = 3, pady = 10, padx = (0,160), sticky = E)
        rowCount = rowCount + 1
    
def googleSearch():
    keyword = e.get()
    searchTerm = keyword.replace(" ", "+")
    googleScrape(searchTerm)

def flipSearch():
    keyword = e.get()
    searchTerm = keyword.replace(" ", "+")
    flipScrape(searchTerm) 
    
def amazSearch():
    keyword = e.get()
    searchTerm = keyword.replace(" ", "+")
    amazScrape(searchTerm)
    
def snapSearch():
    keyword = e.get()
    searchTerm = keyword.replace(" ", "+")
    snapScrape(searchTerm)
       
googleButton = Button(root, text = "Google Search", bg = "#7FDBFF", command = combine_funcs(clear, googleSearch))
googleButton.grid(row = 2, columnspan = 3, pady = 10, padx = (0,200))
flipButton = Button(root, text = "Flipkart Search", command = combine_funcs(clear, flipSearch), bg = "#7FDBFF")
flipButton.grid(row = 2, columnspan = 3, pady = 10)
flip_amaz = combine_funcs(flipSearch, amazSearch)
flip_amaz_snap = combine_funcs(flip_amaz, snapSearch)
compareButton = Button(root, text = "Compare Prices", command = combine_funcs(clear, flip_amaz_snap), bg = "#7FDBFF")
compareButton.grid(row = 2, columnspan = 3, pady = 10, padx = (200,0))
root.mainloop()




