"use strict";(self.webpackChunk_18_chess=self.webpackChunk_18_chess||[]).push([[633],{344:function(e,i,o){o.r(i),o.d(i,{default:function(){return a}});var t=o(885),n=o(434),s=o(791),c=o(745),p=o(184),a=function(){var e=(0,s.useState)(0),i=(0,t.Z)(e,2),o=i[0],a=i[1],r=(0,s.useState)(!1),d=(0,t.Z)(r,2),l=d[0],h=d[1],m=(0,s.useState)(!1),y=(0,t.Z)(m,2),u=y[0],_=y[1],v=(0,n.v9)((function(e){return e.options.options})),f=(0,n.v9)((function(e){return e.options.sandbox})),b=function(e){c.Z.dispatch({type:"sandbox",payload:e}),a(o+1)},x=function(e,i,t){c.Z.dispatch({type:"skillLevel",payload:e}),c.Z.dispatch({type:"depth",payload:i}),c.Z.dispatch({type:"milliseconds",payload:t}),a(o+1)},j=function(e){"random"===e&&(e=Math.floor(100*Math.random())>49?"white":"black"),c.Z.dispatch({type:"color",payload:e}),c.Z.dispatch({type:"boardReset"}),"black"!==e||f||c.Z.dispatch({type:"setBoard",payload:{pr1:[1,"a8"],ph1:[2,"b8"],pb1:[3,"c8"],pqb1:[4,"d8"],pkb:[5,"e8"],pb2:[6,"f8"],ph2:[7,"g8"],pr2:[8,"h8"],pp1:[9,"a7"],pp2:[10,"b7"],pp3:[11,"c7"],pp4:[12,"d7"],pp5:[13,"e7"],pp6:[14,"f7"],pp7:[15,"g7"],pp8:[16,"h7"],empty1:[17,"a6"],empty2:[18,"b6"],empty3:[19,"c6"],empty4:[20,"d6"],empty5:[21,"e6"],empty6:[22,"f6"],empty7:[23,"g6"],empty8:[24,"h6"],empty9:[25,"a5"],empty10:[26,"b5"],empty11:[27,"c5"],empty12:[28,"d5"],empty13:[29,"e5"],empty14:[30,"f5"],empty15:[31,"g5"],empty16:[32,"h5"],empty17:[33,"a4"],empty18:[34,"b4"],empty19:[35,"c4"],empty20:[36,"d4"],empty21:[37,"e4"],empty22:[38,"f4"],empty23:[39,"g4"],empty24:[40,"h4"],empty25:[41,"a3"],empty26:[42,"b3"],empty27:[43,"c3"],empty28:[44,"d3"],empty29:[45,"e3"],empty30:[46,"f3"],empty31:[47,"g3"],empty32:[48,"h3"],op1:[49,"a2"],op2:[50,"b2"],op3:[51,"c2"],op4:[52,"d2"],op5:[53,"e2"],op6:[54,"f2"],op7:[55,"g2"],op8:[56,"h2"],or1:[57,"a1"],oh1:[58,"b1"],ob1:[59,"c1"],oqw1:[60,"d1"],okw:[61,"e1"],ob2:[62,"f1"],oh2:[63,"g1"],or2:[64,"h1"]}}),"black"===e&&f&&c.Z.dispatch({type:"setBoard",payload:{or1:[1,"a8"],oh1:[2,"b8"],ob1:[3,"c8"],okw:[4,"d8"],oqw1:[5,"e8"],ob2:[6,"f8"],oh2:[7,"g8"],or2:[8,"h8"],op1:[9,"a7"],op2:[10,"b7"],op3:[11,"c7"],op4:[12,"d7"],op5:[13,"e7"],op6:[14,"f7"],op7:[15,"g7"],op8:[16,"h7"],empty1:[17,"a6"],empty2:[18,"b6"],empty3:[19,"c6"],empty4:[20,"d6"],empty5:[21,"e6"],empty6:[22,"f6"],empty7:[23,"g6"],empty8:[24,"h6"],empty9:[25,"a5"],empty10:[26,"b5"],empty11:[27,"c5"],empty12:[28,"d5"],empty13:[29,"e5"],empty14:[30,"f5"],empty15:[31,"g5"],empty16:[32,"h5"],empty17:[33,"a4"],empty18:[34,"b4"],empty19:[35,"c4"],empty20:[36,"d4"],empty21:[37,"e4"],empty22:[38,"f4"],empty23:[39,"g4"],empty24:[40,"h4"],empty25:[41,"a3"],empty26:[42,"b3"],empty27:[43,"c3"],empty28:[44,"d3"],empty29:[45,"e3"],empty30:[46,"f3"],empty31:[47,"g3"],empty32:[48,"h3"],pp1:[49,"a2"],pp2:[50,"b2"],pp3:[51,"c2"],pp4:[52,"d2"],pp5:[53,"e2"],pp6:[54,"f2"],pp7:[55,"g2"],pp8:[56,"h2"],pr1:[57,"a1"],ph1:[58,"b1"],pb1:[59,"c1"],pkb:[60,"d1"],pqb1:[61,"e1"],pb2:[62,"f1"],ph2:[63,"g1"],pr2:[64,"h1"]}}),a(o+1)},k=function(e,i){c.Z.dispatch({type:"setTime",payload:e}),c.Z.dispatch({type:"increment",payload:i}),c.Z.dispatch({type:"optionsOff"})};return(0,p.jsxs)("div",{className:"options",style:v?{opacity:"1",visibility:"visible"}:{opacity:"0",visibility:"hidden"},children:[(0,p.jsx)("div",{className:"options__helpMode",style:l?{opacity:"1",visibility:"visible"}:{opacity:"0",visibility:"hidden"},children:"In sandbox mode you control both the white and the black pieces. Perfect for testing out game logic features."}),(0,p.jsx)("div",{className:"options__helpTime",style:u?{opacity:"1",visibility:"visible"}:{opacity:"0",visibility:"hidden"},children:'The options are in "Minutes + increment" format. Increment defines how many seconds are added to the players\' timer after they make a move.'}),(0,p.jsx)("div",{className:"options__outer",children:(0,p.jsxs)("div",{className:"options__inner",style:{transform:"translateY(".concat(-250*o,"px)"),transition:"all .5s"},children:[(0,p.jsxs)("div",{className:"options__body",children:[(0,p.jsxs)("div",{className:"options__heading",children:["Choose game mode ",(0,p.jsx)("span",{onMouseEnter:function(){return h(!0)},onMouseLeave:function(){return h(!1)},className:"options__question",children:"?"})]}),(0,p.jsxs)("div",{className:"options__container",children:[(0,p.jsx)("div",{className:"options__choice hover-computer",onClick:function(){return b(!1)},children:"Vs computer"}),(0,p.jsx)("div",{className:"options__choice hover-sandbox",onClick:function(){return b(!0)},children:"Sandbox"})]})]}),(0,p.jsxs)("div",{className:"options__bodyDifficulty",style:f?{display:"none"}:{display:"block"},children:[(0,p.jsx)("div",{className:"options__backDifficulty",onClick:function(){return a(o-1)},children:"Back"}),(0,p.jsx)("div",{className:"options__heading",children:"Choose difficulty level"}),(0,p.jsxs)("div",{className:"options__container difficulty",children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{className:"options__choice  difficulty__option  hover-beginner",onClick:function(){return x(-9,5,100)},children:"Beginner"}),(0,p.jsx)("div",{className:"options__choice  difficulty__option  hover-intermediate",onClick:function(){return x(3,5,200)},children:"Intermediate"})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{className:"options__choice  difficulty__option  hover-advanced",onClick:function(){return x(11,8,400)},children:"Advanced"}),(0,p.jsx)("div",{className:"options__choice  difficulty__option  hover-master",onClick:function(){return x(20,22,1e3)},children:"Master"})]})]})]}),(0,p.jsxs)("div",{className:"options__body",children:[(0,p.jsx)("div",{className:"options__back",onClick:function(){return a(o-1)},children:"Back"}),(0,p.jsx)("div",{className:"options__heading",children:"Choose the color of your pieces"}),(0,p.jsxs)("div",{className:"options__container",children:[(0,p.jsx)("div",{className:"options__choice hover-white",onClick:function(){return j("white")},children:"White"}),(0,p.jsx)("div",{className:"options__choice hover-random",onClick:function(){return j("random")},children:"Random"}),(0,p.jsx)("div",{className:"options__choice hover-black",onClick:function(){return j("black")},children:"Black"})]})]}),(0,p.jsxs)("div",{className:"options__bodyTime",children:[(0,p.jsx)("div",{className:"options__back",onClick:function(){return a(o-1)},children:"Back"}),(0,p.jsxs)("div",{className:"options__heading",children:["Choose the time control ",(0,p.jsx)("span",{onMouseEnter:function(){return _(!0)},onMouseLeave:function(){return _(!1)},className:"options__question",children:"?"})]}),(0,p.jsxs)("div",{className:"options__container",children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{className:"options__choice hover-ten",onClick:function(){return k(6e5,0)},children:"10 + 0"}),(0,p.jsx)("div",{className:"options__choice hover-five",onClick:function(){return k(3e5,0)},children:"5 + 0"}),(0,p.jsx)("div",{className:"options__choice hover-three",onClick:function(){return k(18e4,0)},children:"3 + 0"})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{className:"options__choice hover-ten",onClick:function(){return k(6e5,3e3)},children:"10 + 3"}),(0,p.jsx)("div",{className:"options__choice hover-five",onClick:function(){return k(3e5,3e3)},children:"5 + 3"}),(0,p.jsx)("div",{className:"options__choice hover-three",onClick:function(){return k(18e4,3e3)},children:"3 + 3"})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{className:"options__choice hover-ten",onClick:function(){return k(6e5,5e3)},children:"10 + 5"}),(0,p.jsx)("div",{className:"options__choice hover-five",onClick:function(){return k(3e5,5e3)},children:"5 + 5"}),(0,p.jsx)("div",{className:"options__choice hover-three",onClick:function(){return k(18e4,5e3)},children:"3 + 5"})]})]})]})]})})]})}}}]);
//# sourceMappingURL=633.72391d05.chunk.js.map