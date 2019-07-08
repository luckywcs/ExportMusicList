// ==UserScript==
// @name         导出网易歌单
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  将想导出的网易歌单播放, 在播放控制栏的最后边会有导出按钮,点击后,将歌单导出为 json 格式
// @author       Yan Teng
// @match        https://music.163.com/
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
  var $ = document.querySelector.bind(document);
  var musciListSelector = "#g_playlist .listbdc.j-flag>ul";
  var css =
    "#g_player{width: 1026px !important} .export-button{color: white; width: 40px; position: relative; float: left; top: 50%; transform: translateY(-50%); cursor: pointer;}";

  function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName("head")[0];
    if (!head) {
      return;
    }
    style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.appendChild(style);
  }
  function getMusicListName() {
    var nameEl = document.contentFrame.document.querySelector(".f-ff2.f-brk");
    return nameEl ? nameEl.innerText : "music_list";
  }
  function download(fileName, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.style.display = "none";
    element.setAttribute("download", fileName);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function exports() {
    var musicListEl = $(musciListSelector).children;
    var musicList = [];
    for (var i = 0; i < musicListEl.length; i++) {
      var music = {};
      var musicEl = musicListEl.item(i).children;
      music.name = musicEl.item(1).innerText;
      music.singer = musicEl.item(3).innerText;
      music.time = musicEl.item(4).innerText;
      musicList.push(music);
    }
    download(getMusicListName(), JSON.stringify(musicList));
  }
  function insertExportBtn() {
    if (!$("#g_player")) {
      console.log("no player found");
      return;
    }
    var exportBtn = document.createElement("div");
    exportBtn.appendChild(document.createTextNode("导出"));
    $("#g_player").appendChild(exportBtn);
    exportBtn.classList.add("export-button");
    exportBtn.addEventListener("click", function() {
      if (!$(musciListSelector)) {
        $("a[title='播放列表']").click();
      }
      exports();
    });
  }
  console.log("fucking wangyi!!!");
  insertExportBtn();
  addGlobalStyle(css);
})();
