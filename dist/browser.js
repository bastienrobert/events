!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).Events=e()}(this,function(){"use strict";function t(){this.events={}}return t.prototype.on=function(t,e){this.events[t]||(this.events[t]=[]),this.events[t].push(e)},t.prototype.off=function(t,e){if(this.events[t]){for(var n=this.events[t].length,s=[],i=0;i<n;i++){var o=this.events[t][i];o!==e&&s.push(o)}this.events[t]=s}},t.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(this.events[t])for(var s=this.events[t].length,i=0;i<s;i++)this.events[t][i].apply(null,e)},t});
