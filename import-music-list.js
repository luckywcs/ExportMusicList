// ==UserScript==
// @name         导入歌单到 QQ 音乐
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  登录 QQ 音乐,在我的音乐下,我创建的歌单 tab 下可以选择要导入的歌单(从网易音乐导出的 json 格式歌单).
// @author       Yan Teng
// @match        https://y.qq.com/portal/profile.html
// @grant        none
// ==/UserScript==
onload = function(){
  var $ = document.querySelector.bind(document);
  var doc = document;

  function hidePopUp() {
    $('.popup_guide').style.display = 'none';
  }

  function insertFileSelector(){

  };

  hidePopUp();
}