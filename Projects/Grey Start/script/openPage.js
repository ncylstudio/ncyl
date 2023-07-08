let searchEngineList = {
  百度: ["icon-baidu", "https://www.baidu.com/s?ie=utf-8&word="],
  bing: ["icon-bing", "https://cn.bing.com/search?q="],
  google: ["icon-google", "https://www.google.com/search?q="],
  github: ["icon-github", "https://github.com/search?q="],
  开发者搜索: [
    "icon-kaifa",
    "https://kaifa.baidu.com/searchPage?module=SEARCH&wd=",
  ],
  //   火山翻译: [
  //     "./images/volctrans.svg",
  //     "https://translate.volcengine.com/translate?&text=",
  //   ],
};

// 添加搜索引擎
for (let key in searchEngineList) {
  let style = "";
  let ico = searchEngineList[key][0];
  let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  if (reg.test(key)) {
    style = "style = 'font-size:13px; font-weight:600;";
    if (key.length > 3) {
      style += "padding:2px 0 0;";
    }
    style += "'";
  }
  let engineEle = `<div class="engine" onclick="setEngine('${ico}','${key}')"><span class="icon ${ico}"></span><p class="font_size_14 color-primary" ${style}>${key}</p></div>`;
  $(".enginesBox")[0].innerHTML += engineEle;
}

let inputToComplete = true;
let ASCTwordH;

function search(m) {
  let searchHref =
    searchEngineList[
      $(".setEngines")[0].firstElementChild.getAttribute("type")
    ][1] + m;
  open(searchHref);
}

// 检查输入是否可以用联想词
function checkWord(str) {
  let reg = /^\s+$/g;
  if (!reg.test(str)) {
    return str.replace(/\s+/gi, " ");
  }
  return false;
}

//联想词
function ASCTword(content) {
  //组装查询地址
  let sugurl =
    "http://suggestion.baidu.com/su?wd=#content#&cb=window.baidu.sug";
  sugurl = sugurl.replace("#content#", content);

  //定义回调函数
  window.baidu = {
    sug: function (json) {
      // console.log(json);
      $(".ASCTwordBox")[0].innerHTML = `<div class='ASCTword' id="transl" 
      onclick='$(".searchInput")[0].value = "";window.open("https://translate.volcengine.com/translate?&text=${content}");'>翻译: ${content}</div>`;
      for (let i = 0; i < json.s.length; i++) {
        $(
          ".ASCTwordBox"
        )[0].innerHTML += `<div class='ASCTword'>${json.s[i]}</div>`;
      }
      for (let i = 1; i < $(".ASCTwordBox")[0].children.length; i++) {
        $(".ASCTwordBox")[0].children[i].onclick = function () {
          search($(".ASCTwordBox")[0].children[i].innerText);
        };
      }
      $("#transl").onclick = function () {
        $(".searchInput")[0].value = "";
        window.open(
          "https://translate.volcengine.com/translate?&text=" + content
        );
      };
      ASCTwordH = 28.8 * $(".ASCTwordBox")[0].children.length + "px";
      $(".ASCTwordBox")[0].style.height = ASCTwordH;
      // console.log($(".ASCTwordBox").style.height);
    },
  };

  // 动态添加JS脚本
  let script = document.createElement("script");
  script.src = sugurl;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function search(m) {
  let searchHref =
    searchEngineList[$(".searchEngine")[0].getAttribute("type")][1] + m;
  open(searchHref);
  $(".searchInput")[0].value = "";
}

// 设置点击事件
$(".searchBtn")[0].addEventListener("click", function () {
  search($(".searchInput")[0].value);
});

// 设置中文联想词触发
$(".searchInput")[0].addEventListener("compositionstart", (event) => {
  inputToComplete = false;
});
$(".searchInput")[0].addEventListener("compositionend", (event) => {
  inputToComplete = true;
  ASCTword($(".searchInput")[0].value);
});

$(".searchInput")[0].oninput = function () {
  // console.log(inputToComplete);
  if (inputToComplete && checkWord($(".searchInput")[0].value)) {
    // console.log(checkWord($(".searchInput").value), "  aaa");
    ASCTword(checkWord($(".searchInput")[0].value));
  }
};

// 检查焦点和输入框内容

function backgroundFunc() {
  if (
    $(".searchInput")[0].value == "" ||
    document.activeElement !== $(".searchInput")[0]
  ) {
    setTimeout(() => {
      $(".ASCTwordBox")[0].style.height = "0";
    }, 100);
  }
  if (
    $(".searchInput")[0].value !== "" &&
    document.activeElement == $(".searchInput")[0] &&
    inputToComplete &&
    checkWord($(".searchInput")[0].value)
  ) {
    $(".ASCTwordBox")[0].style.height = ASCTwordH;
  }
}
setInterval(backgroundFunc, 10);
