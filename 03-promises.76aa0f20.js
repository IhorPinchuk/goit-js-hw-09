!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){o[e]=n},e.parcelRequired7c6=t);var i=t("h6c0i"),a=document.querySelector(".form");console.log(a);var r=Number(a.delay.value),c=0;function l(e,n){return new Promise((function(o,t){var i=Math.random()>.3,r=Number(a.delay.value);setTimeout((function(){i?o({position:e,delay:n}):t({position:e,delay:n})}),r)}))}a.addEventListener("submit",(function(e){e.preventDefault();var n=Number(a.step.value);r=Number(a.delay.value),1===(c+=1)&&l(c,r).then((function(e){var n=e.position,o=e.delay;i.Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms"))})).catch((function(e){var n=e.position,o=e.delay;i.Notify.failure("❌ Rejected promise ".concat(n," in ").concat(o,"ms"))}));var o=setInterval((function(){var e=Number(a.amount.value);r+=n,(c+=1)<=e?l(c,r).then((function(e){var n=e.position,o=e.delay;i.Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms"))})).catch((function(e){var n=e.position,o=e.delay;i.Notify.failure("❌ Rejected promise ".concat(n," in ").concat(o,"ms"))})):clearInterval(o)}),n)}))}();
//# sourceMappingURL=03-promises.76aa0f20.js.map