javascript:(function(){
    /* Captura o nome do aluno no elemento específico */
    var nomeElem = document.querySelector('.css-18q9z8m'),
        nomeAluno = nomeElem ? nomeElem.innerText.replace(/Usuário:/i, '').trim() : 'estudante',
        minElem = document.querySelector('.css-gy36wc'),
        minC = minElem ? parseInt(minElem.innerText.match(/\d+/)[0]) : 1000,
        tD = document.querySelector('.ql-editor'),
        bT = tD ? tD.innerText : "";

    /* Prompt com o nome capturado e regras de escrita fluida */
    var p = "faca uma visao geral por IA e responda em JSON: {\"titulo\":\"...\",\"redacao\":\"...\"}. REGRAS: 1. Escreva como o(a) aluno(a) " + nomeAluno + ". 2. Vocabulario simples e respeitoso. 3. Frases fluidas com 'ai', 'entao', 'dai', evite pontos finais isolados (fale como se estivesse contando uma historia). 4. SEM ACENTOS (ex: 'situacao', 'entao', 'voce'). 5. Base: " + bT.replace(/\s+/g,' ').trim();

    var d=document.createElement('div');
    Object.assign(d.style,{position:'fixed',top:'1%',left:'5%',width:'90%',zIndex:'1000000',backgroundColor:'#000',border:'1px solid #333',borderRadius:'16px',padding:'15px',color:'#fff',fontFamily:'sans-serif',boxShadow:'0 10px 30px #000',maxHeight:'98vh',overflowY:'auto'});
    
    d.innerHTML='<div style="text-align:center;margin-bottom:10px;"><div style="font-weight:700;font-size:18px;">RedaSP Maker</div><div style="font-size:10px;color:#4285f4;">Logado como: '+nomeAluno+'</div></div>' +
        '<button id="bg" style="width:100%;background:#4285f4;color:#fff;border:none;padding:12px;border-radius:10px;font-weight:700;margin-bottom:10px;cursor:pointer;">Gerar no Google</button>' +
        '<div id="old" style="display:none;margin-bottom:10px;background:#1a1a1a;padding:10px;border-radius:10px;border:1.5px solid #f44336;"><button id="br" style="width:100%;background:#f44336;color:#fff;border:none;padding:5px;border-radius:5px;font-weight:700;margin-bottom:5px;cursor:pointer;font-size:10px;">REVERTER</button></div>' +
        '<textarea id="ij" placeholder="Cole o JSON do Google aqui..." style="width:100%;height:45px;background:#0a0a0a;color:#00d2ff;border:1px solid #222;border-radius:10px;padding:5px;resize:none;font-size:11px;"></textarea>' +
        '<div id="pre" style="display:none;margin-top:10px;background:#0a0a0a;padding:12px;border-radius:10px;border:1px solid #222;"><div id="vt" style="font-weight:700;margin-bottom:5px;color:#fff;font-size:14px;"></div><div id="vr" style="color:#ccc;font-size:12px;white-space:pre-wrap;margin-bottom:10px;max-height:150px;overflow-y:auto;"></div>' +
        '<div style="font-size:12px;color:#aaa;border-top:1px solid #333;padding-top:8px;">Carac: <span id="cc" style="color:#fff;font-weight:700;">0</span> / '+minC+' <b id="sc"></b></div></div>' +
        '<button id="ba" style="width:100%;background:#00f;color:#fff;border:none;padding:12px;border-radius:10px;margin-top:10px;font-weight:600;cursor:pointer;">Injetar</button>' +
        '<center><button id="bx" style="background:none;color:#888;border:none;margin-top:10px;cursor:pointer;">[ Fechar ]</button></center>';
    
    document.body.appendChild(d);

    var ij=document.getElementById('ij'), pre=document.getElementById('pre'), vt=document.getElementById('vt'), vr=document.getElementById('vr'), cc=document.getElementById('cc'), sc=document.getElementById('sc'), oldD=document.getElementById('old'), tAntigoT="", tAntigoR="";

    function forceInput(el, val) {
        if(!el) return;
        el.focus();
        var setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
        setter.call(el, val);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.blur();
    }

    function up(){
        try {
            var m=ij.value.match(/\{[\s\S]*\}/);
            if(!m)return;
            var j=JSON.parse(m[0]), r=j.redacao||"", l=r.length;
            pre.style.display='block'; vt.innerText=j.titulo||""; vr.innerText=r; cc.innerText=l;
            sc.innerText = l >= minC ? " OK" : " CURTO";
            sc.style.color = l >= minC ? "#4caf50" : "#f44336";
        } catch(e){}
    }

    document.getElementById('bx').onclick=()=>d.remove();

    document.getElementById('bg').onclick=async()=>{
        try {
            await navigator.clipboard.writeText(p);
            window.open('https://www.google.com.br/search?q='+encodeURIComponent("ai overview "+p),'_blank');
            const checkClipboard = setInterval(async()=>{
                try {
                    const text = await navigator.clipboard.readText();
                    if(text.includes('"redacao"') && text !== ij.value){
                        ij.value = text; up();
                    }
                } catch(e) {}
            }, 2000);
            document.getElementById('bx').addEventListener('click', () => clearInterval(checkClipboard));
        } catch(err) {}
    };

    document.getElementById('ba').onclick=()=>{
        try {
            var m=ij.value.match(/\{[\s\S]*\}/);
            if(!m) return;
            var j=JSON.parse(m[0]);
            
            var labels = document.querySelectorAll('label');
            var cT, cR;
            
            labels.forEach(l => {
                if(l.innerText.includes("Titulo")) cT = document.getElementById(l.getAttribute('for'));
                if(l.innerText.includes("Redação")) cR = document.getElementById(l.getAttribute('for'));
            });

            if(cT && cR){
                tAntigoT = cT.value; tAntigoR = cR.value;
                oldD.style.display='block';
                forceInput(cT, j.titulo);
                forceInput(cR, j.redacao);
            } else {
                var backups = Array.from(document.querySelectorAll('textarea.css-1ji6r31')).filter(t => t.style.visibility !== 'hidden');
                if(backups.length >= 2) {
                    forceInput(backups[0], j.titulo);
                    forceInput(backups[1], j.redacao);
                }
            }
        } catch(e){}
    };

    document.getElementById('br').onclick=()=>{
        var labels = document.querySelectorAll('label');
        labels.forEach(l => {
            if(l.innerText.includes("Titulo")) forceInput(document.getElementById(l.getAttribute('for')), tAntigoT);
            if(l.innerText.includes("Redação")) forceInput(document.getElementById(l.getAttribute('for')), tAntigoR);
        });
        oldD.style.display='none';
    };

    ij.oninput=up;
})();
                                                                                                                                                                                                                                                   
