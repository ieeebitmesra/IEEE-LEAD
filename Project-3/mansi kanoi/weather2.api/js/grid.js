var columns = document.getElementsByClassName("column");
var count = 0;
for (var i = 0; i < columns.length; i++) {
  var ul = document.createElement("ul");
  columns[i].appendChild(ul);

  //Weather desc
  var desc = document.createElement("li");
  var descText = document.createTextNode("Description:" + i);
  desc.appendChild(descText);

  //Temperature
  var temp = document.createElement("li");
  var tempText = document.createTextNode("Temperature:" + i);
  temp.appendChild(tempText);

  ul.appendChild(desc);
  ul.appendChild(temp);
}
