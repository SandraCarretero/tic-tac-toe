(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const p=document.querySelectorAll(".cell"),P=document.getElementById("ties"),E=document.getElementById("you"),O=document.getElementById("pc");let l="X";const n=["","","","","","","","",""];let a=0,d=0,f=0;const C=r=>{n[r]===""&&!h()&&(y(r),setTimeout(L,500))},y=r=>{n[r]=l,u(),h(),v()},v=()=>{l=l==="X"?"O":"X"},L=()=>{const r=n.reduce((t,o,c)=>(o===""&&t.push(c),t),[]);if(r.length>0){const t=Math.floor(Math.random()*r.length);y(r[t])}},u=()=>{p.forEach((r,t)=>{const o=n[t]==="X"?"assets/images/cross.svg":n[t]==="O"?"assets/images/circle.svg":"";r.innerHTML=o?`<img src="${o}" alt="${n[t]}">`:""})},m=()=>{a++,P.textContent=a},h=()=>{const r=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(const t of r){const[o,c,e]=t;if(n[o]&&n[o]===n[c]&&n[o]===n[e])return n[o]==="X"?(alert("You win!"),d++,E.textContent=d):n[o]==="O"&&(alert("PC wins!"),f++,O.textContent=f),g(),m(),!0}return n.includes("")?!1:(alert("It's a tie!"),g(),m(),!0)},g=()=>{l="X",n.fill(""),u()};p.forEach((r,t)=>{r.addEventListener("click",()=>C(t))});u();
