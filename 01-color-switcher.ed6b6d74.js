!function(){var t={bodyEl:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")},n=null;t.startBtn.addEventListener("click",(function(){t.startBtn.disabled=!0,n=setInterval((function(){t.bodyEl.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),t.stopBtn.addEventListener("click",(function(){t.startBtn.disabled=!1,clearInterval(n)}))}();
//# sourceMappingURL=01-color-switcher.ed6b6d74.js.map
