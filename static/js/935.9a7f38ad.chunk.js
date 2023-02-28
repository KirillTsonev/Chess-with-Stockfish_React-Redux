"use strict";(self.webpackChunk_18_chess=self.webpackChunk_18_chess||[]).push([[935],{935:function(e,l,s){s.r(l),s.d(l,{default:function(){return u}});var n=s(885),c=s(434),i=s(791),a=s(184),u=function(){var e=(0,c.v9)((function(e){return e.board.board})),l=(0,c.v9)((function(e){return e.board.highlightMove})),s=(0,c.v9)((function(e){return e.board.moveSquares})),u=(0,c.v9)((function(e){return e.board.pieceSquare})),r=(0,c.v9)((function(e){return e.options.sandbox})),d=(0,c.v9)((function(e){return e.options.color})),t=(0,c.v9)((function(e){return e.behavior.coordinates})),v=(0,c.v9)((function(e){return e.progression.currentMove})),m=Object.entries(e),h=m.filter((function(e){var l=(0,n.Z)(e,2),s=l[0];l[1];return!/empty/.test(s)})),j=Object.fromEntries(h),o=Object.values(j).map((function(e){return e[0]})),x=function(){h=m.filter((function(e){var l=(0,n.Z)(e,2),s=l[0];l[1];return!/empty/.test(s)})),j=Object.fromEntries(h),o=Object.values(j).map((function(e){return e[0]}))};(0,i.useEffect)((function(){x()}),[]),(0,i.useEffect)((function(){x()}),[e]);return(0,a.jsx)("div",{children:function(){var e=["a","b","c","d","e","f","g","h"];return(0,a.jsxs)("div",{className:"board",children:[e.map((function(n,c){return(0,a.jsxs)("div",{className:"".concat(c%2===0?"white":"black"," \n                                                                                ").concat(c+1===u?"highlight":null),children:[s.includes(c+1)&&!o.includes(c+1)?(0,a.jsx)("div",{className:"activeSquare"}):null,s.includes(c+1)&&o.includes(c+1)?(0,a.jsx)("div",{className:"enemySquare",children:(0,a.jsx)("div",{})}):null,l.slice(-1)[0]===c+1&&!v||v&&l[v-1]===c+1?(0,a.jsx)("div",{className:"lastMadeMove"}):null,t&&"black"===d&&!r?(0,a.jsx)("div",{className:"reverseLetters",children:e[c]}):null,t&&c+1===8&&"white"===d?(0,a.jsx)("div",{className:"numbers",children:"8"}):null,t&&c+1===8&&"black"===d&&r?(0,a.jsx)("div",{className:"numbers",children:"1"}):null,t&&0===c&&"black"===d&&!r?(0,a.jsx)("div",{className:"reverseNumbers",children:"8"}):null]},c+100+"c")})),e.map((function(e,n){return(0,a.jsxs)("div",{className:"".concat(n%2!==0?"white":"black"," \n                                                                                ").concat(n+9===u?"highlight":null),children:[s.includes(n+9)&&!o.includes(n+9)?(0,a.jsx)("div",{className:"activeSquare"}):null,s.includes(n+9)&&o.includes(n+9)?(0,a.jsx)("div",{className:"enemySquare",children:(0,a.jsx)("div",{})}):null,l.slice(-1)[0]===n+9&&!v||v&&l[v-1]===n+9?(0,a.jsx)("div",{className:"lastMadeMove"}):null,t&&n+9===16&&"white"===d?(0,a.jsx)("div",{className:"numbers",children:"7"}):null,t&&n+9===16&&"black"===d&&r?(0,a.jsx)("div",{className:"numbers",children:"2"}):null,t&&0===n&&"black"===d&&!r?(0,a.jsx)("div",{className:"reverseNumbers",children:"7"}):null]},n+900+"c")})),e.map((function(e,n){return(0,a.jsxs)("div",{className:"".concat(n%2===0?"white":"black"," \n                                                                                 ").concat(n+17===u?"highlight":null),children:[s.includes(n+17)&&!o.includes(n+17)?(0,a.jsx)("div",{className:"activeSquare"}):null,s.includes(n+17)&&o.includes(n+17)?(0,a.jsx)("div",{className:"enemySquare",children:(0,a.jsx)("div",{})}):null,l.slice(-1)[0]===n+17&&!v||v&&l[v-1]===n+17?(0,a.jsx)("div",{className:"lastMadeMove"}):null,t&&n+17===24&&"white"===d?(0,a.jsx)("div",{className:"numbers",children:"6"}):null,t&&n+17===24&&"black"===d&&r?(0,a.jsx)("div",{className:"numbers",children:"3"}):null,t&&0===n&&"black"===d&&!r?(0,a.jsx)("div",{className:"reverseNumbers",children:"6"}):null]},n+1700+"c")})),e.map((function(e,n){return(0,a.jsxs)("div",{className:"".concat(n%2!==0?"white":"black"," \n                                                                                 ").concat(n+25===u?"highlight":null),children:[s.includes(n+25)&&!o.includes(n+25)?(0,a.jsx)("div",{className:"activeSquare"}):null,s.includes(n+25)&&o.includes(n+25)?(0,a.jsx)("div",{className:"enemySquare",children:(0,a.jsx)("div",{})}):null,l.slice(-1)[0]===n+25&&!v||v&&l[v-1]===n+25?(0,a.jsx)("div",{className:"lastMadeMove"}):null,t&&n+25===32&&"white"===d?(0,a.jsx)("div",{className:"numbers",children:"5"}):null,t&&n+25===32&&"black"===d&&r?(0,a.jsx)("div",{className:"numbers",children:"4"}):null,t&&0===n&&"black"===d&&!r?(0,a.jsx)("div",{className:"reverseNumbers",children:"5"}):null]},n+2500+"c")})),e.map((function(e,n){return(0,a.jsxs)("div",{className:"".concat(n%2===0?"white":"black"," \n                                                                                 ").concat(n+33===u?"highlight":null),children:[s.includes(n+33)&&!o.includes(n+33)?(0,a.jsx)("div",{className:"activeSquare"}):null,s.includes(n+33)&&o.includes(n+33)?(0,a.jsx)("div",{className:"enemySquare",children:(0,a.jsx)("div",{})}):null,l.slice(-1)[0]===n+33&&!v||v&&l[v-1]===n+33?(0,a.jsx)("div",{className:"lastMadeMove"}):null,t&&n+33===40&&"white"===d?(0,a.jsx)("div",{className:"numbers",children:"4"}):null,t&&n+33===40&&"black"===d&&r?(0,a.jsx)("div",{className:"numbers",children:"5"}):null,t&&0===n&&"black"===d&&!r?(0,a.jsx)("div",{className:"reverseNumbers",children:"4"}):null]},n+3300+"c")})),e.map((function(e,n){return(0,a.jsxs)("div",{className:"".concat(n%2!==0?"white":"black"," \n                                                                                 ").concat(n+41===u?"highlight":null),children:[s.includes(n+41)&&!o.includes(n+41)?(0,a.jsx)("div",{className:"activeSquare"}):null,s.includes(n+41)&&o.includes(n+41)?(0,a.jsx)("div",{className:"enemySquare",children:(0,a.jsx)("div",{})}):null,l.slice(-1)[0]===n+41&&!v||v&&l[v-1]===n+41?(0,a.jsx)("div",{className:"lastMadeMove"}):null,t&&n+41===48&&"white"===d?(0,a.jsx)("div",{className:"numbers",children:"3"}):null,t&&n+41===48&&"black"===d&&r?(0,a.jsx)("div",{className:"numbers",children:"6"}):null,t&&0===n&&"black"===d&&!r?(0,a.jsx)("div",{className:"reverseNumbers",children:"3"}):null]},n+4100+"c")})),e.map((function(e,n){return(0,a.jsxs)("div",{className:"".concat(n%2===0?"white":"black"," \n                                                                                 ").concat(n+49===u?"highlight":null),children:[s.includes(n+49)&&!o.includes(n+49)?(0,a.jsx)("div",{className:"activeSquare"}):null,s.includes(n+49)&&o.includes(n+49)?(0,a.jsx)("div",{className:"enemySquare",children:(0,a.jsx)("div",{})}):null,l.slice(-1)[0]===n+49&&!v||v&&l[v-1]===n+49?(0,a.jsx)("div",{className:"lastMadeMove"}):null,t&&n+49===56&&"white"===d?(0,a.jsx)("div",{className:"numbers",children:"2"}):null,t&&n+49===56&&"black"===d&&r?(0,a.jsx)("div",{className:"numbers",children:"7"}):null,t&&0===n&&"black"===d&&!r?(0,a.jsx)("div",{className:"reverseNumbers",children:"2"}):null]},n+4900+"c")})),e.map((function(n,c){return(0,a.jsxs)("div",{className:"".concat(c%2!==0?"white":"black"," \n                                                                                 ").concat(c+57===u?"highlight":null),children:[s.includes(c+57)&&!o.includes(c+57)?(0,a.jsx)("div",{className:"activeSquare"}):null,s.includes(c+57)&&o.includes(c+57)?(0,a.jsx)("div",{className:"enemySquare",children:(0,a.jsx)("div",{})}):null,l.slice(-1)[0]===c+57&&!v||v&&l[v-1]===c+57?(0,a.jsx)("div",{className:"lastMadeMove"}):null,t&&"white"===d?(0,a.jsx)("div",{className:"letters",children:e[c]}):null,t&&"black"===d&&r?(0,a.jsx)("div",{className:"letters",children:e[7-c]}):null,t&&c+57===64&&"white"===d?(0,a.jsx)("div",{className:"numbers",children:"1"}):null,t&&c+57===64&&"black"===d&&r?(0,a.jsx)("div",{className:"numbers",children:"8"}):null,t&&0===c&&"black"===d&&!r?(0,a.jsx)("div",{className:"reverseNumbers",children:"1"}):null]},c+5700+"c")}))]})}()})}}}]);
//# sourceMappingURL=935.9a7f38ad.chunk.js.map