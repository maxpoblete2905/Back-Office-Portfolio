import{a as C}from"./chunk-QBBCNDFF.js";import{Q as n,R as a,S as g,W as i,fa as v,g as f,ga as x,ha as y,ia as E,k as d,ka as u,ra as M,t as h,u as s,w as l,y as p,z as m}from"./chunk-NHTJR5PU.js";import"./chunk-7FQVP44B.js";var S=(()=>{let t=class t{};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=p({type:t,selectors:[["shared-error404page"]],decls:17,vars:0,consts:[[1,"error-404-container"],["href","/"]],template:function(r,N){r&1&&(n(0,"div",0)(1,"h1"),i(2,"Error 404"),a(),n(3,"p"),i(4,"Oops! La p\xE1gina que est\xE1s buscando no pudo ser encontrada."),a(),n(5,"p"),i(6,"Pero no te preocupes, aqu\xED hay algunas cosas que puedes hacer:"),a(),n(7,"ul")(8,"li"),i(9,"Revisa la URL e int\xE9ntalo de nuevo."),a(),n(10,"li"),i(11,"Regresa a la p\xE1gina anterior."),a(),n(12,"li"),i(13,"Visita nuestra "),n(14,"a",1),i(15,"p\xE1gina de inicio"),a(),i(16," para explorar m\xE1s."),a()()())},styles:["[_nghost-%COMP%]{display:block}"]});let e=t;return e})();var b=(()=>{let t=class t{constructor(o,r){this.authService=o,this.router=r}canActivate(){return this.authService.isLoggedIn.pipe(d(1),f(o=>o?!0:this.router.createUrlTree(["/auth"])))}};t.\u0275fac=function(r){return new(r||t)(l(C),l(E))},t.\u0275prov=h({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var T=[{path:"auth",loadChildren:()=>import("./chunk-4YV3FNSS.js").then(e=>e.AuthModule)},{path:"mantainer",canActivate:[b],loadChildren:()=>import("./chunk-BUG46A6V.js").then(e=>e.MantainerModule)},{path:"404",component:S},{path:"",redirectTo:"auth",pathMatch:"full"},{path:"**",redirectTo:"404"}],I=(()=>{let t=class t{};t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=m({type:t}),t.\u0275inj=s({imports:[u.forRoot(T,{useHash:!0}),u]});let e=t;return e})();var j=(()=>{let t=class t{cerrarSesion(){}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=p({type:t,selectors:[["app-root"]],decls:1,vars:0,template:function(r,N){r&1&&g(0,"router-outlet")},dependencies:[y]});let e=t;return e})();var w={production:!1,firebaseConfig:{apiKey:"AIzaSyCTKHi7WZLVkGoqxw9qDq7qyn6rTSWV7G4",authDomain:"portfolio-549f8.firebaseapp.com",projectId:"portfolio-549f8",storageBucket:"portfolio-549f8.appspot.com",messagingSenderId:"346210724876",appId:"1:346210724876:web:9107d4534a1f905da69229",measurementId:"G-QJ6ENBNDV2"}};var D=(()=>{let t=class t{};t.\u0275fac=function(r){return new(r||t)},t.\u0275mod=m({type:t,bootstrap:[j]}),t.\u0275inj=s({imports:[x,I,M.initializeApp(w.firebaseConfig)]});let e=t;return e})();v().bootstrapModule(D).catch(e=>console.error(e));
