WIDGET = {
  CONFIG: {
    layout: "2",
    width: 230,
    height: 270,
    background: "5",
    dataColor: "444444",
    aqiColor: "444444",
    key: "2389318a666447098f6d6d05123fb891",
  },
};

let changeList = [
  ["body", "background-color: #353535;"],
  [".search", "box-shadow: 0 0 0 #353535, 0 0 0 #353535;"],
  [
    ".search:hover, .searchBox:focus-within .search",
    "box-shadow: 10px 10px 27px #232323, -10px -10px 27px #474747;",
  ],
  [".enginesBox", "background: #00000038;"],
  [".engine", "background: #00000034;"],
  [".engine p", "border-top: 2px solid #ffffff22;"],
  [".view-vertical *", "color: #ccc !important"],
  [".wv-n-h-label", "background-color: #ccc !important"],
  [
    ".weatherBox",
    `  border-top: #cbcbcbaa 2px solid;
  border-left: #cbcbcbaa 2px solid;
  border-bottom: rgb(106, 106, 106) 2px solid;
  border-right: rgb(106, 106, 106) 2px solid;`,
  ],
  [".weatherBox::after", "background-color: #353535;"],
  [".weatherBox::before", "background-color: #aaa"],
  // [".ASCTwordBox","color: "]
];

let ifEngineShow = false;
let ifWeatherShow = false;
let colorMode = "sun";
function switchColor(ele) {
  if (colorMode == "sun") {
    colorMode = "moon";
    ele.firstElementChild.style = "transform: scale(0,1); width: 0;";
    ele.lastElementChild.style = "";
    for (let i in changeList) {
      $("#moon")[0].innerText +=
        changeList[i][0] + "{" + changeList[i][1] + "}";
    }
  } else {
    colorMode = "sun";
    ele.lastElementChild.style = "transform: scale(0,1); width: 0;";
    ele.firstElementChild.style = "";
    $("#moon")[0].innerText = "";
  }
}

function showWeather() {
  if (ifWeatherShow) {
    $(".weatherBox")[0].style.top = "-280px";
  } else {
    $(".weatherBox")[0].style.top = "50px";
  }
  ifWeatherShow = !ifWeatherShow;
}

function showEngine() {
  if (ifEngineShow) {
    $(".enginesBox")[0].style.height = "0";
  } else {
    $(".enginesBox")[0].style = "";
  }
  ifEngineShow = !ifEngineShow;
}

function setEngine(ico, name) {
  // console.log(ico,href)
  $(".searchEngine")[0].setAttribute("type", name);
  $(".searchEngine")[0].setAttribute("class", `searchIcon searchEngine icon ${ico}`);
  $(".searchInput")[0].focus();
}

$(".setEngines")[0].addEventListener("click", showEngine);

// 监听enter按键
document.onkeydown = function (event) {
  if (
    (event.key === "Enter") &
    (document.activeElement === $(".searchInput")[0])
  ) {
    $(".searchBtn")[0].click();
  }
};

window.onclick = (event) => {
  if (
    !(
      event.target == $(".enginesBox")[0] ||
      event.target == $(".searchEngine")[0]
    )
  ) {
    ifEngineShow = false;
    $(".enginesBox")[0].style.height = "0";
  }
};
