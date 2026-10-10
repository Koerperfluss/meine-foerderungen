/* HolDirMehr Replika — Logik (KOSTENLOS-Variante: alles frei zugänglich, keine Zahlung) */

/* ---------- Icons ---------- */
const I = {
  lock:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  check:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="10" stroke-opacity=".35"/><path d="m8 12 3 3 5-6"/></svg>',
  warn:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 7v6"/><circle cx="12" cy="16.6" r=".4" fill="currentColor"/></svg>',
  shield:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3 5 6v6c0 4.4 3 7.5 7 9 4-1.5 7-4.6 7-9V6z"/><path d="m9 12 2 2 4-4.5"/></svg>',
  bolt:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
  doc:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/></svg>',
  steps:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6h10M4 12h16M4 18h13"/></svg>',
  swap:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
  chev:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg>',
  bulb:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 1 3.6 10.8c-.6.5-1 1.3-1 2.2h-5.2c0-.9-.4-1.7-1-2.2A6 6 0 0 1 12 3z"/></svg>',
  arrow:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};
function logo(color='currentColor',size=30){
  return `<svg class="mark" width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
    <path d="M7 27V7M7 16h13" stroke="${color}" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M17 7h8v8" stroke="${color}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M25 7 15.5 16.5" stroke="${color}" stroke-width="3.6" stroke-linecap="round"/>
  </svg>`;
}
document.querySelectorAll('[data-logo]').forEach(el=>{
  el.innerHTML = logo(el.dataset.color||'var(--mint)', el.dataset.size||30);
});

/* ---------- Quiz (check.html) ---------- */
const QUIZ = [
  {key:'bundesland', q:'Wo wohnst du?', multi:false, opts:['Wien','Niederösterreich','Oberösterreich','Salzburg','Steiermark','Tirol','Kärnten','Vorarlberg','Burgenland']},
  {key:'haushalt', q:'Wer lebt in deinem Haushalt?', multi:false, opts:['Single','Paar, keine Kinder','Familie mit 1 Kind','Familie mit 2+ Kindern']},
  {key:'wohnen', q:'Wie wohnst du?', multi:false, opts:['Miete','Eigentum','Ich baue gerade / bald']},
  {key:'vorhaben', q:'Was planst du?', multi:true, opts:['Heizung tauschen','Solar & Photovoltaik','Sanierung','E-Mobilität','Familie & Kinder','Bildung & Weiterbildung','Beruf & Arbeitssuche','Gesundheit','Wohnen & Bausparen']},
  {key:'start', q:'Wann willst du starten?', multi:false, opts:['Sofort — in den nächsten 3 Monaten','In 6–12 Monaten','Längerfristig']},
  {key:'antraege', q:'Hast du schon Anträge laufen?', multi:false, opts:['Nein, noch keine','Ja, 1–2','Ja, mehrere']},
];
function quizInit(){
  const el=document.getElementById('quiz'); if(!el) return;
  let idx=0; const answers={};
  const prog=el.querySelector('.q-progress i'), count=el.querySelector('.q-count'),
        qEl=el.querySelector('.q-question'), opts=el.querySelector('.q-opts'),
        hint=el.querySelector('.q-multi-hint'), nextBtn=el.querySelector('.next'),
        prevBtn=el.querySelector('.prev');
  function render(){
    const it=QUIZ[idx];
    prog.style.width=((idx)/QUIZ.length*100)+'%';
    count.textContent=`Frage ${idx+1} von ${QUIZ.length}`;
    qEl.textContent=it.q;
    hint.style.display=it.multi?'block':'none';
    opts.innerHTML='';
    it.opts.forEach(o=>{
      const b=document.createElement('button');
      b.className='q-opt'+((answers[it.key]||[]).includes(o)?' sel':'');
      b.textContent=o;
      b.onclick=()=>{
        if(it.multi){
          const a=answers[it.key]||(answers[it.key]=[]);
          const i=a.indexOf(o); i>=0?a.splice(i,1):a.push(o);
          b.classList.toggle('sel');
        }else{
          answers[it.key]=[o];
          [...opts.children].forEach(c=>c.classList.remove('sel'));
          b.classList.add('sel');
          setTimeout(()=>{ idx++; idx<QUIZ.length?render():finish(); },180);
        }
      };
      opts.appendChild(b);
    });
  }
  function finish(){
    prog.style.width='100%';
    count.textContent='Dein Bericht wird erstellt …';
    try{ localStorage.setItem('hdm-profil', JSON.stringify(answers)); }catch(e){}
    const p=new URLSearchParams();
    Object.entries(answers).forEach(([k,v])=>p.set(k,JSON.stringify(v)));
    location.href='bericht.html?'+p.toString();
  }
  nextBtn.onclick=()=>{
    if((answers[QUIZ[idx].key]||[]).length===0) return;
    idx++; idx<QUIZ.length?render():finish();
  };
  prevBtn.onclick=()=>{ idx=Math.max(0,idx-1); render(); };
  render();
}
quizInit();

/* ---------- Förder-Katalog mit VOLLSTÄNDIGEN Antrags-Plänen (alles frei) ---------- */
const CATALOG = {
  'Heizung tauschen':[
    {land:'Land',cat:'Heizung & Energie',name:'Ölkessel-raus-Bonus',amt:'bis zu €20.000',steps:5,dok:6,combo:4,
     plan:{steps:['Energieberatung durch einen zugelassenen Energieberater machen (Konzept ist Voraussetzung).','Online-Antrag VOR Baubeginn stellen — nachträglich gestellte Anträge werden abgelehnt.','Umbau durch einen zertifizierten Installateur durchführen lassen.','Rechnungen, Fotos der Alt-/Neuanlage und das Abnahmeprotokoll innerhalb von 6 Monaten einreichen.','Auszahlung nach positiver Prüfung direkt aufs Konto.'],
           docs:['Energieausweis','3 Vergleichsangebote','Fotos Altanlage','Rechnungen','Installateurbestätigung'],
           tipp:'Antrag immer VOR Baubeginn! Das ist die häufigste Ablehnungsursache.'}},
    {land:'Bund',cat:'Heizung & Energie',name:'Umweltförderung Wärmepumpe',amt:'bis zu €7.500',steps:4,dok:5,combo:6,
     plan:{steps:['Auf der Förderplattform des Bundes ein Projekt anlegen (online, kostenlos).','Technische Datenblätter der geplanten Wärmepumpe hochladen.','Nach der Installation das Inbetriebnahmeprotokoll nachreichen.','Auszahlung erfolgt nach Prüfung, meist in 6–10 Wochen.'],
           docs:['Technisches Datenblatt','Inbetriebnahmeprotokoll','Rechnung','Fotos der Anlage'],
           tipp:'Kombination mit PV erhöht die Förderquote — beide Anträge gleichzeitig einreichen.'}},
  ],
  'Solar & Photovoltaik':[
    {land:'Bund',cat:'Photovoltaik',name:'EAG Stromspeicher',amt:'bis zu €7.500',steps:4,dok:4,combo:11,
     plan:{steps:['PV-Anlage und Speicher von einer Elektrofachkraft installieren lassen.','Anlage im Marktstammdatenregister registrieren (kostenlos, vor Inbetriebnahme!).','Förderantrag über die EAG-Instanz bzw. deinen Stromanbieter stellen.','Der Zuschuss wird einmalig ausbezahlt.'],
           docs:['Register-Bestätigung','Installateurbestätigung','Zählerpunkt-Daten','Rechnung'],
           tipp:'Marktstammdatenregister-Registrierung ist Pflicht VOR Inbetriebnahme — sonst keine Förderung.'}},
    {land:'Land',cat:'Photovoltaik',name:'PV-Anlagen-Förderung',amt:'bis zu €2.600',steps:3,dok:3,combo:8,
     plan:{steps:['Formular auf der Landesförderstelle online ausfüllen.','Angebote und das Anlagenschema hochladen.','Nach der Montage den Abschlussbericht einreichen.'],
           docs:['Angebote','Anlagenschema','Rechnung'],
           tipp:'Kontingente sind limitiert — Jänner und Herbst sind die besten Zeitfenster zum Einreichen.'}},
  ],
  'Sanierung':[
    {land:'Land',cat:'Sanierung',name:'Landes-Sanierungsförderung',amt:'bis zu €50.000',steps:6,dok:8,combo:2,
     plan:{steps:['Energieberater erstellt ein Sanierungskonzept (Pflicht).','Antrag mit Konzept und Kostenschätzung VOR Baubeginn einreichen.','Auf die schriftliche Zusage warten — erst dann darf gebaut werden.','Nach Abschluss: Endabrechnung mit allen Rechnungen und dem neuen Energieausweis einreichen.'],
           docs:['Sanierungskonzept','Energieausweis vorher/nachher','Kostenschätzung','Rechnungen'],
           tipp:'Je höher die Energieklasse nach der Sanierung, desto höher die Förderung — Zielklasse mit dem Berater vorher festlegen.'}},
  ],
  'E-Mobilität':[
    {land:'Land',cat:'E-Mobilität',name:'E-Fahrzeug- & Ladebonus',amt:'bis zu €400',steps:2,dok:1,combo:3,
     plan:{steps:['Zuschuss-Portal des Landes öffnen und Zulassungsdaten eingeben.','Kaufvertrag bzw. Wallbox-Rechnung hochladen — Auszahlung in 4–8 Wochen.'],
           docs:['Zulassungsbescheinigung','Kaufvertrag','Wallbox-Rechnung'],
           tipp:'Fahrzeug und Wallbox werden getrennt gefördert — zwei Anträge stellen.'}},
  ],
  'Familie & Kinder':[
    {land:'Bund',cat:'Familie',name:'Familienbeihilfe + Bonus',amt:'€138–200 pro Monat · laufend',steps:3,dok:4,combo:7,
     plan:{steps:['Antrag online bei FinanzOnline bzw. der Familienstelle stellen.','Geburtsurkunde und Schul-/Ausbildungsbestätigung beilegen.','Auszahlung erfolgt monatlich automatisch aufs Konto.'],
           docs:['Geburtsurkunde','Schulbestätigung','IBAN-Nachweis'],
           tipp:'Schulbestätigung einmal pro Jahr nachreichen — dann läuft der Bonus automatisch weiter.'}},
    {land:'Land',cat:'Familie',name:'Kinderzulage',amt:'bis zu €3.000',steps:5,dok:4,combo:5,
     plan:{steps:['Einkommensnachweise des Vorjahres bereithalten.','Antrag über das Familienportal des Landes stellen.','Rückmeldung kommt meist innerhalb von 8 Wochen.'],
           docs:['Lohnzettel','Meldezettel','IBAN'],
           tipp:'Bei geteilter Obsorge hälftig auszahlbar — im Antrag angeben.'}},
  ],
  'Bildung & Weiterbildung':[
    {land:'Land',cat:'Bildung',name:'Bildungsbonus',amt:'bis zu €8.000',steps:4,dok:3,combo:13,
     plan:{steps:['Zulassungs- bzw. Kursbestätigung der Bildungseinrichtung besorgen.','Weiterbildungszuschuss online beantragen (einmal pro Jahr möglich).','Am Ende die Teilnahmebestätigung einreichen.'],
           docs:['Kursbestätigung','Teilnahmebestätigung','Rechnung'],
           tipp:'Auch Online-Kurse anerkannter Institute zählen — den Anbieter-Status vorher prüfen.'}},
    {land:'Land',cat:'Bildung',name:'Schulgeld-Zuschuss',amt:'bis zu €600',steps:2,dok:1,combo:4,
     plan:{steps:['Schulgeld-Belege des Jahres sammeln.','Zuschuss beim Land beantragen (Formular, 1 Seite) — Erstattung aufs Konto.'],
           docs:['Schulgeld-Belege','Schulbestätigung'],
           tipp:'Ein Sammelbeleg zum Jahresende reicht — pro Monat einreichen ist unnötig.'}},
  ],
  'Beruf & Arbeitssuche':[
    {land:'Land',cat:'Beruf & Arbeitssuche',name:'Pendler- & Weiterbildungszuschuss',amt:'bis zu €120 pro Monat',steps:3,dok:2,combo:6,
     plan:{steps:['Arbeitsweg und Kosten beim zuständigen Service berechnen lassen.','Antrag mit Arbeitsweg-Nachweis und Dienstgeberbestätigung stellen.','Alle 6 Monate mit aktueller Bestätigung verlängern.'],
           docs:['Dienstgeberbestätigung','Wegstrecken-Nachweis','Kursbestätigung'],
           tipp:'Eine Öffi-Jahreskarte wird oft höher gefördert als Kilometergeld — beide Varianten vergleichen.'}},
  ],
  'Gesundheit':[
    {land:'Land',cat:'Gesundheit',name:'Zuzahlungs-Erstattung',amt:'bis zu €4.800 · laufend',steps:4,dok:4,combo:9,
     plan:{steps:['Zuzahlungsquittungen des Jahres sammeln (Apotheke, Therapie).','Erstattungsantrag bei der Landesstelle stellen — Belastungsgrenze beachten.','Erstattung erfolgt einmal jährlich rückwirkend.'],
           docs:['Apotheken-Quittungen','Therapie-Bestätigungen','e-card-Nachweis'],
           tipp:'Erstattet wird erst ab Überschreiten der jährlichen Belastungsgrenze — alle Quittungen aufheben!'}},
  ],
  'Wohnen & Bausparen':[
    {land:'Bund',cat:'Wohnen',name:'Bausparprämie',amt:'1,5 % der Einzahlung, maximal € 18 pro Jahr · laufend',steps:3,dok:3,combo:5,
     plan:{steps:['Einen Bausparvertrag bei einer zugelassenen österreichischen Bausparkasse abschließen.','Prämienbegünstigte Einzahlungen von bis zu 1.200 Euro pro Kalenderjahr tätigen.','Die Bausparkasse macht die Prämie jährlich automatisch beim Finanzamt geltend — du musst nichts nachreichen.'],
           docs:['Bausparvertrag','Einzahlnachweise','Steuer-ID bei der Bank hinterlegen'],
           tipp:'Die Prämie gibt es nur auf 1.200 € pro Jahr — mehr Einzahlen bringt nichts. Der Vertrag muss mindestens 6 Jahre laufen.'}},
  ],
};
/* Demo-Reihenfolge wie im Original-Bericht (NÖ Single Miete Heizung+Solar) */
const DEMO_ORDER = ['Heizung tauschen','Solar & Photovoltaik'];

function berichtInit(){
  const el=document.getElementById('rankList'); if(!el) return;
  const p=new URLSearchParams(location.search);
  let a={};
  try{ ['bundesland','haushalt','wohnen','vorhaben','start','antraege'].forEach(k=>{ if(p.get(k)) a[k]=JSON.parse(p.get(k)); }); }catch(e){}
  // Gespeichertes Profil ergänzen (URL-Angaben haben Vorrang)
  try{
    const prof=JSON.parse(localStorage.getItem('hdm-profil')||'{}');
    Object.keys(prof).forEach(k=>{ if(!(Array.isArray(a[k])&&a[k].length)) a[k]=prof[k]; });
  }catch(e){}
  const g=(k,d)=>Array.isArray(a[k])&&a[k].length?a[k]:d;
  const bl=g('bundesland',['Niederösterreich'])[0];
  const hh=g('haushalt',['Single'])[0];
  const wo=g('wohnen',['Miete'])[0];
  const vh=g('vorhaben',DEMO_ORDER);
  const st=g('start',['Sofort — in den nächsten 3 Monaten'])[0];
  const hasDefaults=Object.keys(a).length===0;
  // Summen: deterministisch aus Antworten
  let seed=0; (bl+hh+wo+vh.join()).split('').forEach(c=>seed=(seed*31+c.charCodeAt(0))>>>0);
  let low=10500+(seed%4500), high=low+2500+(seed%3000);
  if(hasDefaults){ low=14500; high=17000; }
  const nFoerderungen=hasDefaults?46:28+(seed%22);
  const nQuellen=hasDefaults?20:14+(seed%8);
  const fmt=v=>'€'+String(v).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  // Chips
  const chipVals=[bl,hh,wo,...vh];
  const chipWrap=document.getElementById('chips');
  chipWrap.innerHTML=chipVals.map(()=>`<span class="chip"></span>`).join('');
  [...chipWrap.children].forEach((c,i)=>c.textContent=chipVals[i]);
  // Kopf
  document.getElementById('amount').textContent=`${fmt(low)}–${fmt(high)}`;
  document.getElementById('amount-mini').textContent='~'+fmt(Math.round((low+high)/2));
  document.getElementById('nFoer').textContent=nFoerderungen;
  document.getElementById('nQuellen').textContent=nQuellen;
  if(st.startsWith('Sofort')){
    document.getElementById('warnRow').style.display='flex';
  }
  // Zeilen: ALLE offen, jede mit ausklappbarem Antrags-Plan
  let rows=[];
  if(hasDefaults){
    rows=(CATALOG['Heizung tauschen']||[]).concat(CATALOG['Solar & Photovoltaik']||[],CATALOG['Wohnen & Bausparen']||[]);
  }else{
    vh.forEach(t=>{ (CATALOG[t]||[]).forEach(c=>rows.push(c)); });
    if(!vh.includes('Wohnen & Bausparen')) (CATALOG['Wohnen & Bausparen']||[]).forEach(c=>rows.push(c));
    if(rows.length<5){ (CATALOG['Familie & Kinder']||[]).forEach(c=>rows.push(c)); }
  }
  const landName=c=> c.land==='Bund'?'Bund':`Land ${bl}`;
  list_rows(rows,landName,nFoerderungen);
  // Kontext für katalog-ui.js: echte Katalog-Treffer ersetzen die Demo-Liste
  window.__berichtCtx={bl, vh, hasDefaults};
}
function list_rows(rows,landName,nFoerderungen){
  const list=document.getElementById('rankList');
  const detail=c=>`
    <div class="plan-detail">
      <div class="pd-h">Dein Antrags-Plan</div>
      <ol>${c.plan.steps.map(s=>`<li>${s}</li>`).join('')}</ol>
      <div class="pd-h">${I.doc} Unterlagen</div>
      <div class="pd-docs">${c.plan.docs.map(d=>`<span class="pd-doc">${d}</span>`).join('')}</div>
      <div class="pd-tipp">${I.bulb} <span><b>Experten-Tipp:</b> ${c.plan.tipp}</span></div>
    </div>`;
  list.innerHTML=rows.map((c,i)=>`
    <div class="rank-row" data-i="${i}">
      <div class="rhead">
        <div class="rk">#${i+1}</div>
        <div class="mid">
          <div class="who">${landName(c)} <span class="cat">· ${c.cat}</span></div>
          <div class="who" style="font-weight:680">${c.name}</div>
          <div class="meta">
            ${c.plan.steps.length?`<span>${I.steps} ${c.plan.steps.length} Schritte</span>`:''}
            ${c.plan.docs.length?`<span>${I.doc} ${c.plan.docs.length} Dok.</span>`:''}
            ${c.combo?`<span class="cmb">${I.swap} kombinierbar mit ${c.combo} anderen</span>`:''}
          </div>
        </div>
        <div class="amt"><span class="v">${c.amt}</span><span class="chev">${I.chev}</span></div>
      </div>
      ${detail(c)}
    </div>`).join('');
  // Klick öffnet/schließt den Plan
  list.querySelectorAll('.rank-row .rhead').forEach(h=>{
    h.addEventListener('click',()=>h.parentElement.classList.toggle('open'));
  });
  // erster Plan standardmäßig offen (zeigt sofort, was drinsteckt)
  list.querySelector('.rank-row')?.classList.add('open');
}
berichtInit();

/* ---------- Testimonial-Carousel ---------- */
(function(){
  const track=document.querySelector('.car-track'); if(!track) return;
  const dots=[...document.querySelectorAll('.car-dots button')];
  let i=0;
  function go(n){ i=(n+dots.length)%dots.length; track.style.transform=`translateX(-${i*100}%)`;
    dots.forEach((d,k)=>d.classList.toggle('on',k===i)); }
  dots.forEach((d,k)=>d.onclick=()=>go(k));
  let t=setInterval(()=>go(i+1),6000);
  track.parentElement.addEventListener('pointerdown',()=>clearInterval(t));
})();

/* ---------- Lightbox für Beispiel-Shots ---------- */
(function(){
  const lb=document.getElementById('lightbox'); if(!lb) return;
  const body=lb.querySelector('.lb-body');
  document.querySelectorAll('[data-shot]').forEach(btn=>{
    btn.onclick=()=>{ body.innerHTML=document.getElementById(btn.dataset.shot).innerHTML; lb.classList.add('open'); };
  });
  lb.onclick=e=>{ if(e.target===lb||e.target.closest('.lb-close')) lb.classList.remove('open'); };
})();

/* ---------- Cookie ---------- */
(function(){
  const bar=document.getElementById('cookieBar'), modal=document.getElementById('cookieModal');
  if(!bar) return;
  if(!localStorage.getItem('hdm-cookie')) setTimeout(()=>bar.classList.add('show'),1200);
  bar.querySelector('.ok').onclick=()=>{ localStorage.setItem('hdm-cookie','all'); bar.classList.remove('show'); };
  bar.querySelector('.set').onclick=()=>{ bar.classList.remove('show'); modal.classList.add('open'); };
  modal.querySelector('.btn').onclick=()=>{ localStorage.setItem('hdm-cookie','essential'); modal.classList.remove('open'); };
})();
