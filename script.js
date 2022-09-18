function openapp() {
  window.location.href = "https://Painting-Testing.chanhvien.repl.co/draw/draw.html"
}

function openContact() {
  var element = document.getElementById("myinfo");
  var mycontact = document.getElementById("contact");
  if(element.classList.contains("appear"))
  {
    element.classList.remove("appear");
    mycontact.textContent = "Contact";
  } else {
    element.classList.add("appear");
    mycontact.textContent = "Hide Contact";
  }  
}

