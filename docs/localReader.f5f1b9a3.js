parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"FWam":[function(require,module,exports) {

},{}],"EJbP":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
var e=require("buffer").Buffer;Object.defineProperty(exports,"__esModule",{value:!0}),exports.LocalReader=void 0;var r=require("./reader.js"),t=o(require("fs"));function n(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return n=function(){return e},e}function o(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=n();if(r&&r.has(e))return r.get(e);var t={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var i=o?Object.getOwnPropertyDescriptor(e,s):null;i&&(i.get||i.set)?Object.defineProperty(t,s,i):t[s]=e[s]}return t.default=e,r&&r.set(e,t),t}class s extends r.Reader{constructor(e){super(),this._path=e}async open(){return new Promise((e,r)=>{t.stat(this._path,(n,o)=>{n?r(n):(this.size=o.size,t.open(this._path,"r",(t,o)=>{t?r(n):(this._fd=o,e())}))})})}async close(){return new Promise((e,r)=>{void 0!==this._fd?t.close(this._fd,t=>{t?r(t):e()}):r(new Error("Resource not yet open"))})}async read(r,n){const o=e.alloc(r);return new Promise((e,s)=>{void 0!==this._fd?t.read(this._fd,o,0,r,n,(r,t,n)=>{if(r)return s(r);const o=new ArrayBuffer(n.length),i=new Uint8Array(o);for(let e=0;e<n.length;e++)i[e]=n[e];e(o)}):s(new Error("Resource not yet open"))})}}exports.LocalReader=s;
},{"./reader.js":"ZSOc","fs":"FWam","buffer":"qcot"}]},{},[], null)
//# sourceMappingURL=/localReader.f5f1b9a3.js.map