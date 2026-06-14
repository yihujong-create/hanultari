const fs=require('fs');
const {JSDOM}=require('jsdom');
const html=fs.readFileSync('index.html','utf8');
const style=html.match(/<style>([\s\S]*?)<\/style>/)[1];
const app=fs.readFileSync('app.js','utf8');

const pages=['dash','score','award','rank','hist','fin','more','member','const','setting']
  .map(id=>`<div id="pg-${id}"></div>`).join('');
const doc=`<!DOCTYPE html><html><head><style>${style}</style></head><body>
<div id="hdr-user"></div><b id="hdrDate"></b><b id="hdrCount"></b><b id="hdrGames"></b>
<div id="meetBadge"></div><div id="syncBanner"></div><div id="toast"></div>
<div id="installBar"></div><div id="modalBg"></div><div id="modalContent"></div>
<select id="login-id"></select>
${pages}</body></html>`;

const dom=new JSDOM(doc,{pretendToBeVisual:true, runScripts:'outside-only', url:'http://localhost/'});
const w=dom.window;
w.firebase={apps:[],initializeApp(){},database(){return{ref(){return{on(){},set(){return Promise.resolve();}}}}}};
w.fbSave=()=>{};
w.confirm=()=>true; w.alert=()=>{}; w.prompt=()=>null;

try{ w.eval(app); }catch(e){ console.log('eval err:',e.message); }

// 현재 사용자=관리자
try{ w.eval("currentUser={nm:'김부선',role:'총무',isAdmin:true};"); }catch(e){}

function size(sel,root){const el=(root||w.document).querySelector(sel);return el?w.getComputedStyle(el).fontSize:'(없음)';}
function run(fn){try{w.eval(fn+'();');return true;}catch(e){console.log(fn,'err:',e.message);return false;}}

run('renderDashboard'); run('renderRank'); run('renderHist'); run('renderScore'); run('renderFinance');

const D=w.document;
const dash=D.getElementById('pg-dash');
const rank=D.getElementById('pg-rank');
const hist=D.getElementById('pg-hist');
const score=D.getElementById('pg-score');
const fin=D.getElementById('pg-fin');

console.log('\n=== 검증 결과 (계산된 글자 크기) ===');
// 대시보드: 첫 회원의 팀 텍스트(span with 팀/팀없음)
function teamSpan(root){
  return [...root.querySelectorAll('span')].find(s=>/팀$|팀없음/.test(s.textContent.trim()));
}
const dt=teamSpan(dash); console.log('대시보드 팀글자 :', dt?w.getComputedStyle(dt).fontSize+' ('+dt.textContent.trim()+')':'없음');
const rt=teamSpan(rank); console.log('순위 팀글자     :', rt?w.getComputedStyle(rt).fontSize+' ('+rt.textContent.trim()+')':'없음');
const ht=[...hist.querySelectorAll('span')].find(s=>/Aver/.test(s.textContent)&&/팀/.test(s.textContent));
console.log('성적표 팀|Aver  :', ht?w.getComputedStyle(ht).fontSize+' ('+ht.textContent.trim()+')':'없음');
// 점수입력: 팀 select, Aver input, 핸디 label
const sel=score.querySelector('select[title="팀 지정"]');
console.log('점수입력 팀선택 :', sel?w.getComputedStyle(sel).fontSize:'없음');
const handiLbl=[...score.querySelectorAll('span')].find(s=>s.textContent.trim().startsWith('핸디'));
console.log('점수입력 핸디   :', handiLbl?w.getComputedStyle(handiLbl).fontSize:'없음');
const averIn=[...score.querySelectorAll('input[type=number]')].find(i=>i.getAttribute('onchange')&&i.getAttribute('onchange').includes('setAverByName'));
console.log('점수입력 Aver칸 :', averIn?w.getComputedStyle(averIn).fontSize:'없음');
// 장부: '현재 잔고' 라벨, '이전 잔고' 라벨, 증감
const finSpans=[...fin.querySelectorAll('span')];
const cur=finSpans.find(s=>s.textContent.trim()==='현재 잔고');
const prev=finSpans.find(s=>s.textContent.trim()==='이전 잔고');
const chg=finSpans.find(s=>/증감/.test(s.textContent));
const tot=finSpans.find(s=>s.textContent.trim()==='💰 총 잔고');
console.log('장부 현재잔고   :', cur?w.getComputedStyle(cur).fontSize:'없음');
console.log('장부 이전잔고   :', prev?w.getComputedStyle(prev).fontSize:'없음');
console.log('장부 증감       :', chg?w.getComputedStyle(chg).fontSize:'없음');
console.log('장부 총잔고라벨 :', tot?w.getComputedStyle(tot).fontSize:'없음');
console.log('\n(참고) 이름 글자크기 .mr-nm :', size('.mr-nm',dash));

// 추가: 장부 현금/통장/전체 기본 선택 확인
const btns=[...fin.querySelectorAll('.cb-btn')].filter(b=>/현금|통장|전체/.test(b.textContent));
btns.forEach(b=>console.log('장부탭:', b.textContent.trim(), '→', b.className.includes('on')?'✅선택됨':'미선택'));
