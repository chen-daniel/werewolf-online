(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{124:function(n,e){},131:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r),o=t(56),c=t.n(o),i=(t(76),t(77),t(17)),l=t(3),u=t(7),m=t(1),s=t(2),f=t(26),d=t.n(f),p=t(18),g=t.n(p),b=t(57),h=t.n(b);function v(){var n=Object(m.a)(["\n  margin-top: 1rem;\n  width: 15rem;\n  height: 3rem;\n  border: 3px solid hotpink;\n  border-radius: 7px;\n  color: hotpink;\n  font-size: 1.3rem;\n  padding: 0 0.4rem;\n  text-align: center;\n"]);return v=function(){return n},n}function k(){var n=Object(m.a)(["\n  display: flex;\n  flex-flow: column;\n  justify-content: center;\n  justify-items: center;\n  align-items: center;\n  align-content: center;\n  height: 100vh;\n  color: hotpink;\n  .logo {\n    margin: 0 0 1rem 0;\n    font-size: 5rem;\n  }\n  button {\n    font-size: 1.3rem;\n    background: none;\n    border: 4px solid hotpink;\n    border-radius: 10px;\n    width: 15rem;\n    height: 4rem;\n    margin-top: 2rem;\n    font-weight: 600;\n    color: hotpink;\n    cursor: pointer;\n  }\n\n  .flx {\n    display: flex;\n    flex-flow: column;\n    justify-items: center;\n    align-items: center;\n  }\n"]);return k=function(){return n},n}var j=s.b.div(k()),E=s.b.input(v());function x(){var n=a.a.useState(""),e=Object(u.a)(n,2),t=e[0],r=e[1];return a.a.createElement(j,{className:"App"},a.a.createElement("h1",{className:"logo"},"Werewolf Online"),a.a.createElement("div",null,a.a.createElement(E,{type:"text",value:t,placeholder:"Join as",onChange:function(n){return r(n.target.value)}})),a.a.createElement(O,{name:t}))}function O(n){var e=n.name,t=a.a.useState(0),r=Object(u.a)(t,2),o=r[0],c=r[1],i=a.a.useState(""),m=Object(u.a)(i,2),s=m[0],f=m[1],p=a.a.useState(!1),b=Object(u.a)(p,2),h=b[0],v=b[1];function k(){e.length>0&&4===s.length&&function(n,e){return d.a.post("".concat(g.a.api,"/join-room"),{name:n,room:e}).then((function(n){return n.data})).catch((function(n){return console.log(n),{}}))}(e,s).then((function(n){v({pathname:"room/".concat(n.room),state:{name:e}})}))}function j(){e.length>0&&function(n){return d.a.post("".concat(g.a.api,"/create-room"),{name:n}).then((function(n){return n.data})).catch((function(n){return console.log(n),{}}))}(e).then((function(n){v({pathname:"room/".concat(n.room),state:{name:e}})}))}return a.a.createElement("div",null,function(n){switch(n){case 0:return a.a.createElement("div",{className:"flx"},a.a.createElement("button",{onClick:j},"CREATE ROOM"),a.a.createElement("button",{onClick:function(){return c(1)}},"JOIN ROOM"));case 1:return a.a.createElement("div",{className:"flx"},a.a.createElement(E,{type:"text",value:s,placeholder:"Room Code",onChange:function(n){return f(n.target.value)}}),a.a.createElement("button",{onClick:k},"Join Room"))}}(o),h&&a.a.createElement(l.a,{to:h}))}var y=t(61),w=t.n(y),N=t(62),C=t.n(N),S=t(63),R=t.n(S),z=t(64),J=t.n(z),I=t(65),B=t.n(I),D=t(66),G=t.n(D),M=t(67),W=t.n(M),A=t(68),F=t.n(A),P=t(69),T=t.n(P),$=t(70),q=t.n($);function H(){var n=Object(m.a)(["\n      background: url(",") no-repeat center center/cover;\n    "]);return H=function(){return n},n}function K(){var n=Object(m.a)(["\n      background: url(",") no-repeat center center/cover;\n    "]);return K=function(){return n},n}function L(){var n=Object(m.a)(["\n      background: url(",") no-repeat center center/cover;\n    "]);return L=function(){return n},n}function Q(){var n=Object(m.a)(["\n      background: url(",") no-repeat center center/cover;\n    "]);return Q=function(){return n},n}function U(){var n=Object(m.a)(["\n      background: url(",") no-repeat center center/cover;\n    "]);return U=function(){return n},n}function V(){var n=Object(m.a)(["\n      background: url(",") no-repeat center center/cover;\n    "]);return V=function(){return n},n}function X(){var n=Object(m.a)(["\n      background: url(",") no-repeat center center/cover;\n    "]);return X=function(){return n},n}function Y(){var n=Object(m.a)(["\n      background: url(",") no-repeat center center/cover;\n    "]);return Y=function(){return n},n}function Z(){var n=Object(m.a)(["\n      background: url(",") no-repeat center center/cover;\n    "]);return Z=function(){return n},n}function _(){var n=Object(m.a)(["\n      background: url(",") no-repeat center center/cover;\n    "]);return _=function(){return n},n}function nn(){var n=Object(m.a)(["\n    border: 5px solid purple;\n    height: 12rem;\n    width: 8rem;\n  "]);return nn=function(){return n},n}function en(){var n=Object(m.a)(["\n    height: 9rem;\n    width: 6rem;\n    border: 5px solid darkcyan;\n  "]);return en=function(){return n},n}function tn(){var n=Object(m.a)(["\n    height: 27rem;\n    width: 17rem;\n   border: 5px solid deeppink;\n  "]);return tn=function(){return n},n}function rn(){var n=Object(m.a)(["\n  height: 12rem;\n  width: 9rem;\n  background: pink;\n  border-radius: 13px;\n  box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.15);\n  display: flex;\n  color: #fff;\n  justify-content: center;\n  align-items: center;\n  h1 {\n    font-size: 1.4rem;\n    margin: 0;\n    padding: 0;\n    line-height: 1;\n  }\n\n\n\n  ","\n  ","\n  ","\n\n    /*  BG-Images  */\n  "," \n  "," \n  "," \n  "," \n  "," \n  /* End BG-Images  */\n"]);return rn=function(){return n},n}var an=s.b.div(rn(),(function(n){return n.me&&Object(s.a)(tn())}),(function(n){return n.deck&&Object(s.a)(en())}),(function(n){return n.player&&Object(s.a)(nn())}),(function(n){var e=n.role;return e?"werecat"===e&&Object(s.a)(Z(),C.a):Object(s.a)(_(),w.a)}),(function(n){var e=n.role;return"insomnicat"===e?Object(s.a)(Y(),R.a):"seer"===e&&Object(s.a)(X(),J.a)}),(function(n){var e=n.role;return"drunk"===e?Object(s.a)(V(),B.a):"minion"===e&&Object(s.a)(U(),G.a)}),(function(n){var e=n.role;return"cat burglar"===e?Object(s.a)(Q(),W.a):"siamese twin"===e&&Object(s.a)(L(),F.a)}),(function(n){var e=n.role;return"troublemaker"===e?Object(s.a)(K(),T.a):"villager"===e&&Object(s.a)(H(),q.a)})),on=function(n){var e=n.me,t=n.deck,r=n.player,o=n.role,c=n.onClick,i=n.selected;return a.a.createElement(an,{me:e,player:r,deck:t,onClick:c,role:o,selected:i},a.a.createElement(a.a.Fragment,null))};function cn(){var n=Object(m.a)(["\ndisplay: flex;\nflex-flow: column;\nmargin-top: 0;\njustify-content: center;\nalign-items: center;\ncolor: #2b262c;\n\nh4 {\n  margin: 0.6rem;\n  font-size: 18px;\n  font-weight: 400;\n  color: #2b262c;\n}\nh4.turn {\n  color: #f31431\n}\n button {\n    font-size: 1rem;\n    background: none;\n    border: 4px solid hotpink;\n    border-radius: 10px;\n    width: 7rem;\n    height: 2.3rem;\n    margin-top: 1rem;\n    font-weight: 600;\n    color: hotpink;\n    cursor: pointer;\n  }\n\n"]);return cn=function(){return n},n}function ln(){var n=Object(m.a)(['\n  margin-top: 2%;\n  margin-right: 20%;\n  margin-left: 20%;\n  display: grid;\n  justify-content: center;\n  align-content: center;\n  align-items: center;\n  justify-items: center;\n  grid-template-columns: 0.3fr 0.7fr;\n  grid-template-rows: 0.7fr 0.3fr;\n  grid-template-areas: \n    "leftSide header"\n    "leftSide  rightSide";\n  div {\n    display: flex;\n    margin-left: 1rem;\n    margin-top: 1rem;\n  }\n  .deck {\n    grid-area: header;\n  }\n  .me {\n    grid-area: leftSide;\n  }\n  .deck {\n    grid-area: header;\n  }\n\n  .flx {\n    color: gray;\n    h4 {\n      margin: 0;\n      text-align: center;\n    }\n    display: flex;\n    flex-flow: column;\n  }\n']);return ln=function(){return n},n}var un=s.b.div(ln()),mn=s.b.div(cn());function sn(n){var e=n.state,t=n.socketRef,r=n.playerName,o=n.room;function c(n){console.log("performing action"),t.current.emit("perform action",{room:o,playerName:r,action:n})}var i=void 0!==e.game.confirms[r]&&!e.game.confirms[r];return a.a.createElement(a.a.Fragment,null,a.a.createElement(mn,null,a.a.createElement("div",null,a.a.createElement("h4",null,a.a.createElement("strong",null,"Deck | "),JSON.stringify(e.game.deck)),a.a.createElement("h4",{className:"".concat(e.turn?"turn":"")},a.a.createElement("strong",null,"Narration | "),e.narration)),i&&a.a.createElement("button",{onClick:function(){t.current.emit("submit confirm",{room:o,playerName:r})}},"Confirm")),a.a.createElement(un,null,a.a.createElement("div",{className:"deck"},e.game.roles.center.map((function(n,t){return a.a.createElement(on,{deck:!0,role:e.game.roles.center[t],onClick:function(){return c(["center",t])},selected:e.game.actions&&e.game.actions.filter((function(n){return"center"===n[0]&&n[1]===t})).length>0,key:t})}))),a.a.createElement("div",{className:"me"},a.a.createElement(on,{me:!0,role:e.game.roles.playerRoles[r]})),a.a.createElement("div",{className:"otherPlayers"},e.players.filter((function(n){return n!==r})).map((function(n,t){return a.a.createElement("div",{className:"flx",key:t},a.a.createElement("h4",null,n),a.a.createElement(on,{player:!0,role:e.game.roles.playerRoles[n],onClick:function(){return c(["playerRoles",n])},selected:e.game.actions&&e.game.actions.filter((function(e){return"playerRoles"===e[0]&&e[1]===n})).length>0}))})))))}function fn(){var n=Object(m.a)(["\ndisplay: flex;\nflex-flow: column;\njustify-content: center;\nalign-items: center;\ncolor: #2b262c;\nmargin-top: 0;\n\nh1 {\n    margin: 0 0 0.8rem 0;\n    font-size: 2.5rem;\n    color: hotpink;\n}\nh2 {\n  text-align: center;\n  font-weight: 600;\n  color: #2b262c;\n  margin: 0.5rem;\n}\nh4 {\n  font-size: 18px;\n  font-weight: 400;\n  color: #2b262c;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n button {\n    font-size: 1.3rem;\n    background: none;\n    border: 4px solid hotpink;\n    border-radius: 10px;\n    width: 9rem;\n    height: 3rem;\n    margin-top: 2rem;\n    font-weight: 600;\n    color: hotpink;\n    cursor: pointer;\n  }\n"]);return fn=function(){return n},n}var dn=s.b.div(fn());function pn(n){var e=n.match,t=n.location,o=e.params.roomID,c=t.state&&t.state.name,i=a.a.useRef(),m=a.a.useState({}),s=Object(u.a)(m,2),f=s[0],d=s[1];function p(n){i.current.emit("toggle deck option",{room:o,option:n.target.value})}return Object(r.useEffect)((function(){c&&(i.current=h.a.connect(g.a.api),i.current.emit("join room",{room:o,playerName:c}),i.current.on("update state",(function(n){console.log(n),d(n)})))}),[]),a.a.createElement("div",null,a.a.createElement(dn,null,a.a.createElement("div",null,!c&&a.a.createElement(l.a,{to:"/"}),a.a.createElement("h1",null,"Room: ",o),a.a.createElement("h2",null,"- ",c," -")),a.a.createElement("div",null,a.a.createElement("h4",null,a.a.createElement("strong",null,"Players |"),JSON.stringify(f.players))),"started"!==f.roomState&&f.deckOpts&&a.a.createElement("div",null,a.a.createElement("ul",null,Object.keys(f.deckOpts).map((function(n,e){return a.a.createElement("li",{key:e},a.a.createElement("input",{type:"radio",value:n,checked:f.deckOpts[n],onClick:p,onChange:function(n){return console.log(n)}})," ",n)})))),"ready"===f.roomState&&a.a.createElement("button",{onClick:function(){i.current.emit("start game",{room:o})}},"Start Game")),"started"===f.roomState&&a.a.createElement(sn,{state:f,playerName:c,room:o,socketRef:i}))}var gn=function(){return a.a.createElement(i.a,null,a.a.createElement("div",null,a.a.createElement(l.d,null,a.a.createElement(l.b,{exact:!0,path:"/",component:x}),a.a.createElement(l.b,{path:"/room/:roomID",component:pn}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(gn,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)}))},18:function(n,e,t){n.exports={api:"https://still-oasis-65835.herokuapp.com"}},61:function(n,e,t){n.exports=t.p+"static/media/Back.7173fe1b.jpg"},62:function(n,e,t){n.exports=t.p+"static/media/werecat.6a7b9af6.jpg"},63:function(n,e,t){n.exports=t.p+"static/media/insomnicat.d0fbb758.jpg"},64:function(n,e,t){n.exports=t.p+"static/media/seer.deaefacf.jpg"},65:function(n,e,t){n.exports=t.p+"static/media/drunk.f2191f54.jpg"},66:function(n,e,t){n.exports=t.p+"static/media/minion.0f7fde36.jpg"},67:function(n,e,t){n.exports=t.p+"static/media/cat-burglar.edac0a66.jpg"},68:function(n,e,t){n.exports=t.p+"static/media/siamese-twin.7cda16de.jpg"},69:function(n,e,t){n.exports=t.p+"static/media/troublemaker.dac79b04.jpg"},70:function(n,e,t){n.exports=t.p+"static/media/villager.8528ccb0.jpg"},71:function(n,e,t){n.exports=t(131)},76:function(n,e,t){},77:function(n,e,t){}},[[71,1,2]]]);
//# sourceMappingURL=main.199c050b.chunk.js.map