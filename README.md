# Bookmarklet de Redação

---

## Bookmarklet (cole no favorito do navegador)

```javascript
javascript:(function(){
var bT=document.body.innerText||"";
var n="Usuário";

var m=bT.match(/(?:Olá|Bem-vindo|Aluno|Nome|👤):\s*([A-Z][a-z]+)/i);
if(m&&m[1])n=m[1];

var t=bT.slice(0,1200);
var cT=t.length;

var p="Aja como aluno de 9º ano. Escreva uma redação com alguns erros de ortografia e vírgulas. RESPONDA APENAS UM BLOCO DE CÓDIGO JSON: {\"titulo\":\"...\",\"redacao\":\"...\"}. Base: "+t;

var d=document.createElement('div');

Object.assign(d.style,{
position:'fixed',
top:'2%',
left:'5%',
width:'90%',
zIndex:'100000',
backgroundColor:'#000',
border:'1px solid #333',
borderRadius:'16px',
padding:'15px',
color:'#fff',
fontFamily:'sans-serif',
boxShadow:'0 10px 30px rgba(0,0,0,0.8)',
maxHeight:'95vh',
overflowY:'auto',
transition:'all 0.3s ease'
});

d.innerHTML=
'<div style="font-weight:700;margin-bottom:5px;text-align:center;font-size:18px;">Redação Maker</div>'+
'<div style="text-align:center;font-size:12px;color:#aaa;margin-bottom:15px;">Olá, <span style="color:#fff;font-weight:600;">'+n+'</span>. Siga os passos:</div>'+

'<div id="rm-pnl">'+

'<button id="btn-u" style="width:100%;background:#000;color:#fff;border:1px solid #fff;padding:12px;border-radius:10px;font-weight:600;margin-bottom:10px;">1. Liberar Site</button>'+

'<button id="btn-c" style="width:100%;background:#000;color:#fff;border:1px solid #fff;padding:12px;border-radius:10px;font-weight:600;margin-bottom:10px;">2. Copiar Tema</button>'+

'<button id="btn-g" style="width:100%;background:#fff;color:#000;border:none;padding:12px;border-radius:10px;font-weight:700;margin-bottom:10px;">3. Abrir ChatGPT</button>'+

'<textarea id="i-j" placeholder="{...}" style="width:100%;height:45px;background:#0a0a0a;color:#00d2ff;border:1px solid #222;border-radius:10px;font-size:12px;font-family:monospace;padding:5px;outline:none;resize:none;"></textarea>'+

'<div id="pre" style="display:none;margin-top:10px;background:#0a0a0a;padding:12px;border-radius:10px;border:1px solid #222;">'+
'<div id="v-t" style="font-weight:700;color:#fff;font-size:14px;margin-bottom:5px;"></div>'+
'<div id="v-r" style="color:#ccc;font-size:12px;white-space:pre-wrap;max-height:100px;overflow:auto;"></div>'+
'</div>'+

'<button id="btn-a" style="width:100%;background:#000;color:#fff;border:1px solid #fff;padding:12px;border-radius:10px;font-weight:600;margin-top:10px;">4. Injetar</button>'+

'</div>'+

'<div style="text-align:center;margin-top:15px;">'+
'<button onclick="this.parentElement.parentElement.remove()" style="background:none;color:#888;border:none;cursor:pointer;">[ Fechar ]</button>'+
'</div>';

document.body.appendChild(d);

const ij=document.getElementById('i-j');

ij.oninput=function(){
try{
var match=ij.value.match(/\{[\s\S]*\}/);
if(!match) return;
var j=JSON.parse(match[0]);
document.getElementById('pre').style.display='block';
document.getElementById('v-t').innerText=j.titulo||"";
document.getElementById('v-r').innerText=j.redacao||"";
}catch(e){
document.getElementById('pre').style.display='none';
}
};

document.getElementById('btn-u').onclick=function(){
var s=document.createElement('style');
s.innerHTML='*{user-select:auto!important;-webkit-user-select:auto!important;}';
document.head.appendChild(s);
this.innerText="Liberado ✔";
};

document.getElementById('btn-c').onclick=async function(){
try{
await navigator.clipboard.writeText(p);
this.innerText="Copiado ✔";
}catch(e){
alert("Clipboard bloqueado");
}
};

document.getElementById('btn-g').onclick=function(){
window.open('https://chatgpt.com/?q='+encodeURIComponent(p),'_blank');
};

document.getElementById('btn-a').onclick=function(){
try{
var match=ij.value.match(/\{[\s\S]*\}/);
if(!match) throw new Error();

var j=JSON.parse(match[0]);

var b=document.querySelectorAll('.ql-editor, textarea, [contenteditable="true"]');

if(b.length){
b[0].innerText=j.redacao||"";
alert("Sucesso!");
d.remove();
}else{
navigator.clipboard.writeText(j.redacao||"");
alert("Copiado para clipboard");
}

}catch(e){
alert("Erro no JSON");
}
};

})();
