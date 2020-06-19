# E-Commerce




**NAME** - Ashutosh Kumar


**GROUP NO.** - 4


**MILESTONES ACHIEVED** - 

    1. Google Search - First URL Display
    2. Flipkart Search - Product Search and its image and URL Display
    3. Product Search and Compare across various e-commerce websites
    4. OPTIONAL MILESTONES -
          a. Implemented working GUI using Tkinter
          b. Used Selenium module of Python
          c. Added bindings in Tkinter
          d. Added Tkinter themes
          e. Added Menubar and bindings for several submenu's
          f. Added Statusbar to show that work is in progress
          g. Added sort by in price compare across various sites
          h. Overrode the default exit behaviour
          i. Added Open links opens added in submenu as well as in binding
          j. Added Notebook for displaying the Price comparision feature
          k. Added application image that works on all OS as the iconbitmap does not allow .ico to be added in UBUNTU.
          
          
**TECH STACK**

    1. Python
    2. Python Modules - Tkinter, Beautiful Soup, Selenium,Time,OS,Pillow


**DESCRIPTION**

The Project consists of three separate sections based gui implemented using Tkinter. First section is the basic implementation of web scraping and searching the google for anything and displaying its First URL. Second section(Flipkart Product Search), takes an input as product's name searches it on flipkart and displays its product's name, product's price, product's link and product's image. Third section (Product Search and Compare) takes any product name as input and searches it on amazon, flipkart and Paytm mall and display's the product's name,price and link. The third section also has sort by feature.
In the first two sections we have an option to open the link in the browser.


**UNIQUE**

Since in section 2(Flipkart Search) and in section3(Product Search and Compare), the e-commerce websites such as amazon and flipkart have different structure for electronic and household products. I corrected it using if case. If you search "Redmi Note 8 Pro" or "Shoes" if you have not implemented both the structures it will throw an error denoting "Index out of range".
I added themes in Tkinter as well as Sort by feature. Added application image that works on all OS as the iconbitmap does not allow .ico to be added in UBUNTU and .xbm format is black and white. Added open link in broswer facility.


**PROBLEMS FACED**

Initially I got stuck in scraping the image in Flipkart. I fixed it after the discussion with mentor and used Selenium for that.


**SCOPE OF IMPROVEMENT**

The GUI can be made more attractive and interactive. I can also add sort by company in the third section


**WHAT YOU LEARNED**

I learned how to scrap data from the websites using python and its various modules(beautiful soup, request, selenium) and to display it in GUI(using Tkinter). I also came to know the structures of the various websites such as Amazon, Flipkart, Snapdeal, Google. 

**REGARDING WEBDRIVER**
Please use Chrome driver of the version of Chrome you use and put the driver in the same folder where the python file is.
