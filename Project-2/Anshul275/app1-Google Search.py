import requests
from tkinter import *
from bs4 import BeautifulSoup

root = Tk()
root.title("App1 - URL Generator")
root.iconbitmap(r'appicon.ico')
root.geometry("650x400")

def url_gen():
    query = src.get()
    load = {'q': query}
    header = { 'User-Agent' : 'Mozilla/5.0 (x11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'}
    res = requests.get("https://www.google.co.in/search", params = load, headers = header)
    soup = BeautifulSoup(res.text, 'html.parser')
    res_div = soup.find_all('div', attrs = {'class': 'r'})
    result_links=[]

    for ele in res_div:
        link = ele.find('a')
        result_links.append(link['href'])

    result = result_links[0]
    label1 = Label(root, text="Google Search Results:")
    ans_link.delete('0.0', 'end')
    ans_link.insert(END, result)
    label1.grid(row=3 , column=0)
    ans_link.grid(row=4 , column=0)

search = Label(root, text = "Google Search")
search.grid(row=0 , column=0)
src = StringVar()
Entry1 = Entry(root, textvariable = src)
Entry1.grid(row=1 , column=0)
photo = PhotoImage(file="google.png")
button1 = Button(root, image=photo, command=url_gen)
button1.grid(row=2 , column=0)
ans_link = Text(root)

root.mainloop()