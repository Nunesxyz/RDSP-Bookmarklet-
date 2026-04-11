# Bookmarklet de Redação

---

## Bookmarklet (cole no favorito do navegador)

```javascript
javascript:(function(){var bT=document.body.innerText||"";var n="Usuário";var m=bT.match(/(?:Olá|Bem-vindo|Aluno|Nome|👤):\s*([A-Z][a-z]+)/i);if(m&&m[1])n=m[1];var t=bT.slice(0,1200);var cT=t.length;var p="Aja como aluno de 9º ano. Escreva uma redação com alguns erros de ortografia e vírgulas. Responda em JSON: {\"titulo\":\"...\",\"redacao\":\"...\"}. Base: "+t;var d=document.createElement('div');Object.assign(d.style,{position:'fixed',top:'2%',left:'5%',width:'90%',zIndex:'100000',background:'#000',border:'1px solid #333',borderRadius:'12px',padding:'12px',color:'#fff',fontFamily:'Arial',maxHeight:'90vh',overflowY:'auto'});d.innerHTML='<b>Redação Bookmarklet</b><br><br><textarea id="i" style="width:100%;height:60px"></textarea><br><button id="b1">Liberar página</button> <button id="b2">Copiar tema</button> <button id="b3">Abrir Chat</button>';document.body.appendChild(d);document.getElementById('b2').onclick=function(){navigator.clipboard.writeText(p)};document.getElementById('b3').onclick=function(){window.open('https://chatgpt.com/?q='+encodeURIComponent(p))};document.getElementById('b1').onclick=function(){document.body.style.userSelect='auto'};})();
