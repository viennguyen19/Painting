function openapp() {
  console.log("re");
  window.location.href = "https://MouseMove.damco1.repl.co/draw/draw.html"
}

function openContact() {
  console.log("anime");
  var element = document.getElementById("myinfo");
  var mycontact = document.getElementById("contact");
  console.log(element.classList.contains("appear"));
  if(element.classList.contains("appear"))
  {
    element.classList.remove("appear");
    mycontact.textContent = "Contact";
    mycontact.style.background = "lavender";
    mycontact.style.color = "black";
  } else {
    element.classList.add("appear");
    mycontact.textContent = "Hide Contact";
    mycontact.style.background = "black";
    mycontact.style.color = "lavender";
  }  
}

