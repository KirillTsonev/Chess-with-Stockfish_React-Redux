"use strict";(self.webpackChunk_18_chess=self.webpackChunk_18_chess||[]).push([[823],{823:function(o,n,i){i.r(n),i.d(n,{default:function(){return l}});var e=i(885),a=i(791),t=i(434),c=i(745),s=i(184),l=function(){var o=(0,a.useState)(!1),n=(0,e.Z)(o,2),i=n[0],l=n[1],r=(0,t.v9)((function(o){return o.behavior.darkTheme})),d=(0,t.v9)((function(o){return o.behavior.numbers})),h=(0,t.v9)((function(o){return o.behavior.animations})),p=(0,t.v9)((function(o){return o.behavior.coordinates})),v=(0,t.v9)((function(o){return o.behavior.sounds})),u=(0,t.v9)((function(o){return o.behavior.milliseconds}));(0,a.useEffect)((function(){localStorage.getItem("darkTheme")&&(l(JSON.parse(localStorage.getItem("darkTheme"))),c.Z.dispatch({type:"darkTheme",payload:JSON.parse(localStorage.getItem("darkTheme"))})),localStorage.getItem("speed")&&c.Z.dispatch({type:"animationSpeed",payload:localStorage.getItem("speed")}),localStorage.getItem("coordinates")&&c.Z.dispatch({type:"coordinates",payload:JSON.parse(localStorage.getItem("coordinates"))}),localStorage.getItem("sounds")&&c.Z.dispatch({type:"sounds",payload:JSON.parse(localStorage.getItem("sounds"))}),localStorage.getItem("milliseconds")&&c.Z.dispatch({type:"milliseconds",payload:JSON.parse(localStorage.getItem("milliseconds"))})}),[]);var m=function(o){c.Z.dispatch({type:"numbers",payload:o})},_=function(o){c.Z.dispatch({type:"animationSpeed",payload:o}),localStorage.setItem("speed",o)},b=function(o){c.Z.dispatch({type:"coordinates",payload:o}),localStorage.setItem("coordinates",o)},f=function(o){c.Z.dispatch({type:"sounds",payload:o}),localStorage.setItem("sounds",o)},g=function(o){c.Z.dispatch({type:"milliseconds",payload:o}),localStorage.setItem("milliseconds",o)};return(0,s.jsxs)("div",{className:"".concat(r?"bg-darker":null," behavior"),children:[(0,s.jsxs)("div",{className:"behavior__switch",onClick:function(){return l(!i),c.Z.dispatch({type:"darkTheme",payload:!i}),void localStorage.setItem("darkTheme",!i)},children:[(0,s.jsx)("div",{children:"\ud83c\udf1e"}),(0,s.jsx)("div",{className:"behavior__switch-ball \n                                ".concat(i?"behavior__switch-ball-right":"behavior__switch-ball-left")}),(0,s.jsx)("div",{children:"\ud83c\udf1c"})]}),(0,s.jsxs)("div",{className:"behavior__container",children:[(0,s.jsx)("div",{className:"behavior__body",children:"Visible numbers:"}),(0,s.jsxs)("div",{className:"behavior__option",children:[(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat(d?"activeOption":null," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return m(!0)},children:"On"}),(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat(d?null:"activeOption"," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return m(!1)},children:"Off"})]})]}),(0,s.jsxs)("div",{className:"behavior__container",children:[(0,s.jsx)("div",{className:"behavior__body",children:"Animation speed:"}),(0,s.jsxs)("div",{className:"behavior__optionAnim",children:[(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat("none"===h?"activeOption":null," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return _("none")},children:"None"}),(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat("slow"===h?"activeOption":null," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return _("slow")},children:"Slow"}),(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat("average"===h?"activeOption":null," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return _("average")},children:"Normal"}),(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat("fast"===h?"activeOption":null," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return _("fast")},children:"Fast"})]})]}),(0,s.jsxs)("div",{className:"behavior__container",children:[(0,s.jsx)("div",{className:"behavior__body",children:"Coordinates:"}),(0,s.jsxs)("div",{className:"behavior__option",children:[(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat(p?"activeOption":null," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return b(!0)},children:"On"}),(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat(p?null:"activeOption"," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return b(!1)},children:"Off"})]})]}),(0,s.jsxs)("div",{className:"behavior__container",children:[(0,s.jsx)("div",{className:"behavior__body",children:"Sounds:"}),(0,s.jsxs)("div",{className:"behavior__option",children:[(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat(v?"activeOption":null," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return f(!0)},children:"On"}),(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat(v?null:"activeOption"," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return f(!1)},children:"Off"})]})]}),(0,s.jsxs)("div",{className:"behavior__container",children:[(0,s.jsx)("div",{className:"behavior__body",children:"Timer milliseconds:"}),(0,s.jsxs)("div",{className:"behavior__option",children:[(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat(u?"activeOption":null," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return g(!0)},children:"On"}),(0,s.jsx)("div",{className:"behavior__option-body \n                                    ".concat(u?null:"activeOption"," \n                                    ").concat(r?"option-dark":"option-light"),onClick:function(){return g(!1)},children:"Off"})]})]})]})}}}]);
//# sourceMappingURL=823.0a50a22c.chunk.js.map