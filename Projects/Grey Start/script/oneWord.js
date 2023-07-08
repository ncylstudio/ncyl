let xhr1 = new XMLHttpRequest();
let shiciModelList = ["shanshui", "siji", "tianqi", "rensheng"];
let shiciModel = shiciModelList[Math.floor(Math.random() * 4)];
xhr1.open("get", `https://v1.jinrishici.com/${shiciModel}.json`);
xhr1.onreadystatechange = function () {
  if (xhr1.readyState === 4) {
    let data = JSON.parse(xhr1.responseText);
    let oneWord = document.getElementById("oneWord");
    oneWord.firstElementChild.innerText =
      "「" + data.content.substring(0, data.content.length - 1) + "」";
    oneWord.lastElementChild.innerText =
      " —— " + data.author + "《" + data.origin.split("/")[0] + "》";
      console.log(data);
  }
};
xhr1.send();
