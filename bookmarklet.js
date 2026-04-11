javascript:(function(){
    var tD=document.querySelector('.ql-editor');
    var bT=tD?tD.innerText:"";
    
    /* Tenta encontrar o valor mínimo no texto da proposta */
    var minMatch = bT.match(/(?:mínimo|pelo menos)\s*de?\s*(\d+)\s*(?:caracteres|letras)/i);
    var minChars = minMatch ? parseInt(minMatch[1]) : 0;

    var n="Usuário";
    var m=document.body.innerText.match(/(?:Olá|Bem-vindo|Aluno|Nome|👤):\s*([A-Z][a-z]+)/i);
    if(m&&m[1]) n=m[1];

    var t=bT.replace(/\s+/g,' ').trim();
    var p="Aja como aluno de 9º ano. Escreva uma redação com alguns erros de ortografia. RESPONDA APENAS JSON: {\"titulo\":\"...\",\"redacao\":\"...\"}. Base: "+t;

    var d=document.createElement('div');
    Object.assign(d.style,{position:'fixed',top:'2%',left:'5%',width:'90%',zIndex:'100000',backgroundColor:'#000',border:'1px solid #333',borderRadius:'16px',padding:'15px',color:'#fff',fontFamily:'sans-serif',boxShadow:'0 10px 30px rgba(0,0,0,0.8)',maxHeight:'95vh',overflowY:'auto'});
    
    d.innerHTML='<div style="font-weight:700;margin-bottom:5px;text-align:center;font-size:18px;">Redação Maker + Contador</div>'+
        '<div id="rm-pnl">'+
        '<button id="btn-c" style="width:100%;background:#000;color:#fff;border:1px solid #fff;padding:12px;border-radius:10px;margin-bottom:10px;font-weight:600;">1. Copiar Proposta</button>'+
        '<button id="btn-g" style="width:100%;background:#fff;color:#000;border:none;padding:12px;border-radius:10px;font-weight:700;margin-bottom:10px;">2. Abrir ChatGPT</button>'+
        '<textarea id="i-j" placeholder="Cole o JSON aqui..." style="width:100%;height:45px;background:#0a0a0a;color:#00d2ff;border:1px solid #222;border-radius:10px;padding:5px;resize:none;font-size:11px;"></textarea>'+
        
        /* Painel de Visualização com Contador */
        '<div id="pre" style="display:none;margin-top:10px;background:#0a0a0a;padding:12px;border-radius:10px;border:1px solid #222;">'+
            '<div id="v-t" style="font-weight:700;margin-bottom:5px;color:#fff;"></div>'+
            '<div id="v-r" style="color:#ccc;font-size:12px;white-space:pre-wrap;margin-bottom:10px;"></div>'+
            '<div id="char-info" style="font-size:11px;padding-top:8px;border-top:1px solid #333;color:#aaa;">'+
                'Caracteres: <span id="cur-char" style="color:#fff;">0</span> / <span id="min-char">'+(minChars || "???")+'</span> '+
                '<b id="status-char" style="margin-left:10px;"></b>'+
            '</div>'+
        '</div>'+
        
        '<button id="btn-a" style="width:100%;background:#000;color:#fff;border:1px solid #fff;padding:12px;border-radius:10px;margin-top:10px;font-weight:600;">3. Injetar (Título + Redação)</button>'+
        '</div>'+
        '<div style="text-align:center;margin-top:15px;"><button onclick="this.parentElement.parentElement.remove()" style="background:none;color:#888;border:none;cursor:pointer;">[ Fechar ]</button></div>';

    document.body.appendChild(d);

    const ij=document.getElementById('i-j');
    ij.oninput=function(){
        try {
            var match=ij.value.match(/\{[\s\S]*\}/);
            if(!match) return;
            var j=JSON.parse(match[0]);
            var redacao = j.redacao || "";
            var count = redacao.length;
            
            document.getElementById('pre').style.display='block';
            document.getElementById('v-t').innerText=j.titulo||"";
            document.getElementById('v-r').innerText=redacao;
            document.getElementById('cur-char').innerText=count;
            
            var status = document.getElementById('status-char');
            if(minChars > 0) {
                if(count >= minChars) {
                    status.innerText = "✅ META ATINGIDA";
                    status.style.color = "#4caf50";
                } else {
                    status.innerText = "❌ ABAIXO DO MÍNIMO";
                    status.style.color = "#f44336";
                }
            }
        } catch(e){}
    };

    document.getElementById('btn-c').onclick=async function(){
        await navigator.clipboard.writeText(p);
        this.innerText="Copiado ✔";
    };

    document.getElementById('btn-g').onclick=function(){
        window.open('https://chatgpt.com/?q='+encodeURIComponent(p),'_blank');
    };

    document.getElementById('btn-a').onclick=function(){
        try {
            var match=ij.value.match(/\{[\s\S]*\}/);
            var j=JSON.parse(match[0]);
            var campos=document.querySelectorAll('.css-1chowlu');
            if(campos.length>=2){
                campos[0].innerText=j.titulo||"";
                campos[1].innerText=j.redacao||"";
                alert("Injetado!");
                d.remove();
            } else {
                alert("Caixas não encontradas. Verifique se a página carregou.");
            }
        } catch(e){ alert("Erro no JSON"); }
    };
})();
      
