let establishedTime = document.querySelector("#established-time");
function eTime() {
  let now = new Date();
  let target = new Date("2022-07-03");

  let daysDiff = Math.floor(
    (now.getTime() - target.getTime()) / 1000 / 60 / 60 / 24
  );
  establishedTime.innerText = daysDiff;
}
eTime()

function smoothScroll() {
  const targetElement = document.getElementById(this.getAttribute("to"));
  targetElement.scrollIntoView({
    behavior: "smooth",
  });
}
let jumps = document.querySelectorAll(".jmp")
for (let i = 0; i < jumps.length; i++){
  jumps[i].onclick = smoothScroll;
}

let items = document.querySelectorAll(".item")
for (let i = 0; i < items.length; i++){
  items[i].onclick = () => {window.open(
    "https://github.com/boringGhast/ncyl/tree/main/Projects/" +
      items[i].getAttribute("name")
  );}
}

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}