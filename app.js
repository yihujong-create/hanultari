// =================================================================
// 한울타리 볼링클럽 PWA v2.0
// 신규: D조, 5게임, 핸디점수, 벌금 현금/통장 선택, 개인이력, 관리자PW
// =================================================================

const DEFAULT_SETTINGS = {
  gameCount: 3,
  gameFee: 7000,
  drink: 31000,
  laneFee: 0,
  awardMinScore: 800,
  award1st: 10000,
  award2nd: 5000,
  awardAver: 5000,
  awardAllCover: 5000,
  awardMonthlyMost: 5000,
  fineUnderBasis: 45,
  fineUnderAmount: 5000,
  finePerGame: 1000,
  fineAllUnder: 5000,
  fineMaxLimit: 8000,
  gradeA: 190,
  gradeC: 159,
  gradeD: 130,
  adminPw: '5925',
  features: { allCover:true, monthlyMost:true, showGrade:true, autoEva:true }
};

const DEFAULT_MEMBERS = [
  {nm:'강석경', team:'C', role:'',        fee:40000, aver:201, group:'A', handicap:0},
  {nm:'김남천', team:'A', role:'',        fee:40000, aver:199, group:'A', handicap:0},
  {nm:'김동옥', team:'A', role:'',        fee:40000, aver:210, group:'A', handicap:0},
  {nm:'김부선', team:'A', role:'총무',    fee:35000, aver:170, group:'B', handicap:0},
  {nm:'김생수', team:'C', role:'',        fee:40000, aver:170, group:'B', handicap:10},
  {nm:'김진우', team:'', role:'경기이사', fee:35000, aver:198, group:'A', handicap:0},
  {nm:'박기수', team:'', role:'',         fee:40000, aver:170, group:'B', handicap:0},
  {nm:'성광수', team:'C', role:'경기이사',fee:35000, aver:199, group:'A', handicap:0},
  {nm:'이상규', team:'A', role:'경기이사',fee:35000, aver:185, group:'B', handicap:0},
  {nm:'이용규', team:'', role:'',         fee:40000, aver:187, group:'B', handicap:0},
  {nm:'이진현', team:'B', role:'',        fee:40000, aver:186, group:'B', handicap:0},
  {nm:'이후종', team:'B', role:'총무',    fee:35000, aver:180, group:'B', handicap:0},
  {nm:'조유진', team:'B', role:'',        fee:40000, aver:184, group:'B', handicap:5},
  {nm:'최상완', team:'B', role:'',        fee:40000, aver:201, group:'A', handicap:0},
  {nm:'최지현', team:'C', role:'경기이사',fee:35000, aver:186, group:'B', handicap:0}
];

const DEFAULT_SCORES = {
  '강석경':[201,194,182], '김남천':[199,159,231], '김동옥':[210,209,234],
  '김부선':[170,130,179], '김생수':[170,163,106], '김진우':[198,172,184],
  '박기수':[null,null,null], '성광수':[199,156,147], '이상규':[185,162,222],
  '이용규':[null,null,null], '이진현':[186,204,150], '이후종':[180,183,219],
  '조유진':[184,178,194], '최상완':[201,162,193], '최지현':[186,135,171]
};

const DEFAULT_DUES = {
  '강석경':{1:{c:true,k:false},2:{c:true,k:false},3:{c:true,k:false},4:{c:true,k:false}},
  '김남천':{1:{c:false,k:true},2:{c:false,k:true},3:{c:false,k:true},4:{c:false,k:true}},
  '김동옥':{1:{c:true,k:false},2:{c:true,k:false},3:{c:true,k:false},4:{c:true,k:false}},
  '김부선':{1:{c:false,k:true},2:{c:false,k:true},3:{c:false,k:true},4:{c:false,k:true}},
  '김생수':{1:{c:true,k:false},2:{c:true,k:false},3:{c:true,k:false},4:{c:true,k:false}},
  '김진우':{1:{c:false,k:true},2:{c:false,k:true},3:{c:false,k:true},4:{c:false,k:true}},
  '박기수':{1:{c:true,k:false},2:{c:true,k:false},3:{c:false,k:false},4:{c:false,k:false}},
  '성광수':{1:{c:false,k:true},2:{c:false,k:true},3:{c:false,k:true},4:{c:false,k:true}},
  '이상규':{1:{c:true,k:false},2:{c:true,k:false},3:{c:true,k:false},4:{c:true,k:false}},
  '이용규':{1:{c:true,k:false},2:{c:true,k:false},3:{c:true,k:false},4:{c:false,k:false}},
  '이진현':{1:{c:false,k:true},2:{c:false,k:true},3:{c:false,k:true},4:{c:false,k:true}},
  '이후종':{1:{c:false,k:true},2:{c:false,k:true},3:{c:false,k:true},4:{c:false,k:true}},
  '조유진':{1:{c:true,k:false},2:{c:true,k:false},3:{c:true,k:false},4:{c:true,k:false}},
  '최상완':{1:{c:true,k:false},2:{c:true,k:false},3:{c:true,k:false},4:{c:true,k:false}},
  '최지현':{1:{c:false,k:true},2:{c:false,k:true},3:{c:false,k:true},4:{c:false,k:true}}
};

const DEFAULT_FINANCE = {
  prevCash:382500, prevBank:2272066,
  income:[
    {desc:'회비 (13명)', amt:158000, type:'bank'},
    {desc:'벌금 합계 (6명)', amt:51000, type:'cash'},
    {desc:'은행 이자', amt:149, type:'bank'}
  ],
  expense:[
    {desc:'게임비 (₩7,000×13명)', amt:91000, type:'cash'},
    {desc:'음료수', amt:31000, type:'cash'},
    {desc:'지난 정모 시상금 이월', amt:35000, type:'cash'},
    {desc:'교류전 교통비', amt:50000, type:'bank'},
    {desc:'이후종·김남천 교류전/회식', amt:158000, type:'cash'}
  ]
};

// =================================================================
// 🔐 로그인 시스템
// =================================================================
// 현재 로그인 사용자 (세션 동안 유지)
let currentUser = null; // {nm, role, isAdmin}
const SESSION_KEY = 'hanultari_session';

// ⭐ 저장 키 (index.html의 LOCAL_KEY와 반드시 동일해야 함) — 누락 시 모든 저장 실패
const KEY = 'hanultari_v2';

// 역할 판별
function isAdminRole(role){
  return ['회장','총무','경기이사'].includes(role);
}

// '동수' 역할 = 게스트(시상·벌금·순위·성적표 제외, 대시보드·점수입력에만 표시)
function isGuest(m){ return !!m && m.role === '동수'; }

// ── 모임별 개인 평균(Aver) 컨텍스트 ──────────────────────────────
// DB.meetAver = { 이름: Aver } 이면 "과거(불러온) 모임"을 보는 중 → 그 모임의 고정 Aver 사용.
// null/미설정이면 "활성(현재) 모임" → 회원 기본 Aver(m.aver) 사용.
// 이렇게 해서 새 모임용으로 Aver를 바꿔도 과거 모임의 벌금·시상·차이 결과가 바뀌지 않는다.
// 핸디(DB.meetHcp)도 같은 방식으로 모임별 고정 → 과거 모임을 부르면 그 당시 핸디로 표시.
function averOf(m){
  if(!m) return 0;
  if(DB.meetAver && DB.meetAver[m.nm]!==undefined && DB.meetAver[m.nm]!==null) return DB.meetAver[m.nm];
  return m.aver||0;
}
// 과거 모임을 보는 중인지 (Aver가 그 모임 값으로 고정된 상태)
function isFrozenMeet(){ return !!(DB.meetAver && Object.keys(DB.meetAver).length); }
// 이력 스냅샷(memberSnap)에서 모임 Aver·핸디 컨텍스트를 구성
function _setMeetAverFromSnap(h){
  if(h && Array.isArray(h.memberSnap) && h.memberSnap.length){
    const am={}, hm={};
    h.memberSnap.forEach(s=>{
      if(!s || s.nm==null) return;
      if(s.aver!=null) am[s.nm]=s.aver;
      hm[s.nm]=s.handicap||0;
    });
    DB.meetAver = Object.keys(am).length ? am : null;   // 구버전 이력(스냅샷 없음)은 컨텍스트 비활성
    DB.meetHcp  = Object.keys(am).length ? hm : null;
  }else{
    DB.meetAver = null;
    DB.meetHcp  = null;
  }
}
// 활성(새) 모임으로 전환 — 고정 컨텍스트 해제(현재 회원 Aver·핸디 사용)
function _clearMeetAver(){ DB.meetAver = null; DB.meetHcp = null; }

// 로그인 상태 복원 (새로고침 시)
function restoreSession(){
  try{
    const s=sessionStorage.getItem(SESSION_KEY);
    if(s){
      const u=JSON.parse(s);
      // DB 로드 후 회원 정보와 대조
      const m=DB.members.find(x=>x.nm===u.nm);
      if(m){ currentUser={nm:m.nm,role:m.role||'',isAdmin:isAdminRole(m.role||'')}; return true; }
    }
  }catch(e){}
  return false;
}

// 로그인 화면 초기화
function initLoginScreen(){
  const sel=document.getElementById('login-id');
  if(!sel) return;
  sel.innerHTML='<option value="">-- 이름 선택 --</option>';
  [...DB.members].sort((a,b)=>a.nm.localeCompare(b.nm,'ko')).forEach(m=>{
    const opt=document.createElement('option');
    opt.value=m.nm; opt.textContent=m.nm+(m.role?` (${m.role})`:'');
    sel.appendChild(opt);
  });
}

// 로그인 처리
window.doLogin=function(){
  const nm=document.getElementById('login-id').value;
  const pw=document.getElementById('login-pw').value;
  const err=document.getElementById('login-err');
  err.textContent='';

  if(!nm){ err.textContent='이름을 선택하세요.'; return; }
  if(!pw){ err.textContent='비밀번호를 입력하세요.'; return; }

  const m=DB.members.find(x=>x.nm===nm);
  if(!m){ err.textContent='회원 정보를 찾을 수 없습니다.'; return; }

  // 비밀번호 확인 (없으면 기본값 '0000')
  const stored=DB.memberPw&&DB.memberPw[nm]?DB.memberPw[nm]:'0000';
  if(pw!==stored){ err.textContent='비밀번호가 틀렸습니다.'; return; }

  // 로그인 성공
  currentUser={nm:m.nm, role:m.role||'', isAdmin:isAdminRole(m.role||'')};
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));

  document.getElementById('login-screen').classList.add('hidden');
  updateHdrUser();
  updateHeader();
  renderDashboard();
  window._curPage='dash';
  window._appReady=true;
  T(`👋 환영합니다, ${m.nm}님!`);

  // (로그인 시 비밀번호 변경 안내 팝업 제거됨)
};

// 헤더 사용자 표시 업데이트
function updateHdrUser(){
  const el=document.getElementById('hdr-user');
  if(!el||!currentUser) return;
  const roleIcon=currentUser.isAdmin?'🔑':'👤';
  el.innerHTML=`<span style="background:${currentUser.isAdmin?'rgba(167,139,250,.2)':'rgba(77,166,255,.15)'};border:1px solid ${currentUser.isAdmin?'var(--pur)':'var(--bdr)'};border-radius:12px;padding:2px 8px;font-size:10px;color:${currentUser.isAdmin?'var(--pur)':'var(--txt2)'}">${roleIcon} ${currentUser.nm}</span>`;
}

// 사용자 메뉴 (비밀번호 변경 / 로그아웃)
window.showUserMenu=function(){
  if(!currentUser) return;
  const choice=confirm(`${currentUser.nm}님\n\n[확인] 비밀번호 변경\n[취소] 로그아웃`);
  if(choice) showChangePw();
  else doLogout();
};

// 비밀번호 변경
window.showChangePw=function(){
  const cur=prompt('현재 비밀번호');
  if(cur===null) return;
  const stored=(DB.memberPw&&DB.memberPw[currentUser.nm])||'0000';
  if(cur!==stored){ T('⚠️ 현재 비밀번호가 틀렸습니다'); return; }
  const nw=prompt('새 비밀번호 (4~20자)');
  if(!nw||nw.length<4){ T('⚠️ 비밀번호는 4자 이상이어야 합니다'); return; }
  const nw2=prompt('새 비밀번호 확인');
  if(nw!==nw2){ T('⚠️ 비밀번호가 일치하지 않습니다'); return; }
  if(!DB.memberPw) DB.memberPw={};
  DB.memberPw[currentUser.nm]=nw;
  saveDB(); T('✅ 비밀번호 변경 완료');
};

// 로그아웃
window.doLogout=function(){
  if(!confirm('로그아웃 하시겠습니까?')) return;
  currentUser=null;
  sessionStorage.removeItem(SESSION_KEY);
  window._appReady=false;
  // 로그인 화면 복귀
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('login-pw').value='';
  document.getElementById('login-err').textContent='';
  const el=document.getElementById('hdr-user');
  if(el) el.innerHTML='';
};

// 권한 체크 — 일반 회원은 입력 불가 안내
function requireAdmin(cb){
  if(!currentUser){ T('⚠️ 로그인이 필요합니다'); return; }
  if(!currentUser.isAdmin){ T('⚠️ 관리자(회장·총무·경기이사)만 가능합니다'); return; }
  cb();
}

// =================================================================
// DB
// =================================================================
let DB = loadDB();
let adminUnlocked = false;

function loadDB(){
  try {
    const raw = localStorage.getItem(KEY);
    if(raw){
      const p = JSON.parse(raw);
      if(p.members) p.members.forEach(m=>{ if(m.handicap===undefined) m.handicap=0; });
      if(!p.scoreHistory) p.scoreHistory=[];
      if(!p.finePaidType) p.finePaidType={};
      if(!p.settings.gradeD) p.settings.gradeD=130;
      if(!p.settings.adminPw) p.settings.adminPw='5925';
      if(!p.memberPw) p.memberPw={};  // 회원별 비밀번호
      return p;
    }
  }catch(e){}
  return {
    settings:{...DEFAULT_SETTINGS},
    members:DEFAULT_MEMBERS.map(m=>({...m})),
    scores:JSON.parse(JSON.stringify(DEFAULT_SCORES)),
    dues:JSON.parse(JSON.stringify(DEFAULT_DUES)),
    finance:JSON.parse(JSON.stringify(DEFAULT_FINANCE)),
    meetDate:'2026-04-25', meetType:'regular',
    finePaid:{}, finePaidType:{},
    allCovers:['성광수'], scoreHistory:[],
    memberPw:{}  // {이름: '비밀번호'}
  };
}

// =================================================================
// 💾 저장 (Firebase = 주 저장소 / localStorage = 보조 캐시)
//   - 진짜 데이터는 클라우드(Firebase)에 저장되므로
//     localStorage가 꽉 차도 "저장공간 초과"로 막히지 않음.
//   - localStorage 캐시 쓰기가 실패하면 조용히 줄여서 다시 시도하고,
//     그래도 안 되면 그냥 건너뜀(에러 표시 안 함).
// =================================================================
function saveDB(){
  try{
    DB._ts = Date.now();

    // 1) JSON 직렬화
    let jsonStr;
    try{
      jsonStr = JSON.stringify(DB);
    }catch(jsonErr){
      console.error('JSON 직렬화 실패:', jsonErr);
      _setBanner('⚠️ 저장 실패 (데이터 오류)', true);
      return;
    }

    // 2) ☁️ 주 저장소: Firebase (비동기). 성공/실패 배너는 fbSave 내부에서 처리.
    const cloudOn = !!(window._fbConfigured && window.fbSave);
    if(cloudOn) window.fbSave(DB);

    // 3) 💾 보조 캐시: localStorage (실패해도 앱 동작에 지장 없음)
    const cached = _cacheToLocal(jsonStr);

    // 4) 배너 — 클라우드가 켜져 있으면 항상 정상 표시
    const t=new Date();
    const ts=`${String(t.getHours()).padStart(2,'0')}:${String(t.getMinutes()).padStart(2,'0')}`;
    if(cloudOn){
      _setBanner(`✅ 저장 — ${ts} (☁️ 클라우드 동기화)`, false);
    }else if(cached){
      _setBanner(`✅ 저장 — ${ts} (로컬)`, false);
    }else{
      // 클라우드도 꺼져 있고 로컬 캐시도 실패한 경우에만 경고
      _setBanner('⚠️ 저장 실패 — 클라우드 연결을 확인하세요', true);
    }

  }catch(e){
    console.error('saveDB 오류:', e);
    // 클라우드가 켜져 있으면 데이터는 안전하므로 경고하지 않음
    if(window._fbConfigured && window.fbSave){
      window.fbSave(DB);
    }else{
      _setBanner(`⚠️ 저장 실패 (${e.name||'오류'})`, true);
    }
  }
}

// localStorage 캐시 쓰기 — 용량 초과 시 캐시본만 가볍게 줄여서 재시도(원본 DB는 안 건드림)
function _cacheToLocal(jsonStr){
  try{
    localStorage.setItem(KEY, jsonStr);
    return true;
  }catch(e1){
    try{
      // 캐시 전용 축소본: 이력을 최근 5개만 담아 저장(Firebase엔 전체 이력 그대로 보존됨)
      const lite = {...DB, scoreHistory:(DB.scoreHistory||[]).slice(0,5)};
      localStorage.setItem(KEY, JSON.stringify(lite));
      return true;
    }catch(e2){
      try{
        const liteNoHist = {...DB, scoreHistory:[]};
        localStorage.setItem(KEY, JSON.stringify(liteNoHist));
        return true;
      }catch(e3){
        console.warn('localStorage 캐시 생략(용량). 클라우드 저장은 정상.');
        return false;
      }
    }
  }
}

function _setBanner(msg, warn){
  const b=document.getElementById('syncBanner');
  if(b){ b.textContent=msg; b.classList.toggle('warn', !!warn); }
}

// ── 관리자 ──────────────────────────────────────
function checkAdmin(cb){
  if(adminUnlocked){cb();return;}
  const pw=prompt('🔒 관리자 비밀번호');
  if(pw===null) return;
  if(pw===String(DB.settings.adminPw)||pw==='5925'){
    adminUnlocked=true;
    setTimeout(()=>{adminUnlocked=false;},10*60*1000);
    T('🔓 관리자 인증 완료 (10분간 유지)');
    cb();
  }else{ T('🔒 비밀번호 오류'); }
}
window.checkAdmin=checkAdmin;

// ── 등급 (A/B/C/D) ──────────────────────────────
function calcGrade(aver){
  const s=DB.settings;
  if(aver>=s.gradeA) return 'A';
  if(aver<=(s.gradeD||130)) return 'D';
  if(aver<=s.gradeC) return 'C';
  return 'B';
}

// ── 핸디 ────────────────────────────────────────
function getHcp(nm){
  if(DB.meetHcp && DB.meetHcp[nm]!==undefined && DB.meetHcp[nm]!==null) return DB.meetHcp[nm];
  const m=DB.members.find(x=>x.nm===nm); return m?(m.handicap||0):0;
}
function applyHcp(nm,scores){ const h=getHcp(nm); if(!h) return scores; return scores.map(s=>s===null||s===undefined?s:s+h); }

// ── 벌금 계산 ────────────────────────────────────
function calcFine(member,valid){
  if(isGuest(member)) return {amt:0,reasons:[]};   // 동수=벌금 제외
  if(!valid.length) return {amt:0,reasons:[]};
  const s=DB.settings, av=averOf(member);
  let total=0,reasons=[],underCnt=0;
  valid.forEach((sc,i)=>{
    if(sc<av){
      underCnt++;
      const diff=av-sc;
      if(diff>=s.fineUnderBasis){ total+=s.fineUnderAmount; reasons.push(`${i+1}G ${sc}(${diff}↓)→₩${fmt(s.fineUnderAmount)}`); }
      else{ total+=s.finePerGame; reasons.push(`${i+1}G ${sc}(${diff}↓)→₩${fmt(s.finePerGame)}`); }
    }
  });
  if(underCnt===valid.length&&valid.length>=2){ total+=s.fineAllUnder; reasons.push(`전게임Aver미만→₩${fmt(s.fineAllUnder)}`); }
  if(total>s.fineMaxLimit){ reasons.push(`→최대₩${fmt(s.fineMaxLimit)}`); total=s.fineMaxLimit; }
  return {amt:total,reasons};
}

// ── 시상 ─────────────────────────────────────────
function calcAwards(){
  const s=DB.settings;
  const present=DB.members.filter(m=>!isGuest(m)&&(DB.scores[m.nm]||[]).some(x=>x!==null&&x!==undefined));
  const stats=present.map(m=>{
    const sc=DB.scores[m.nm].filter(x=>x!==null&&x!==undefined);
    const total=sc.reduce((a,b)=>a+b,0);
    const av=averOf(m);
    return {...m,aver:av,total,games:sc.length,overAver:total-av*sc.length,scores:sc};
  });
  const byTotal=[...stats].sort((a,b)=>b.total-a.total);
  const byOver=[...stats].filter(x=>x.overAver>0).sort((a,b)=>b.overAver-a.overAver);
  const awards=[],awarded=new Set();
  if(byTotal[0]&&byTotal[0].total>=s.awardMinScore){awards.push({member:byTotal[0],type:'총점1등',amount:s.award1st,sub:`${byTotal[0].total}점`});awarded.add(byTotal[0].nm);}
  if(byTotal[1]&&byTotal[1].total>=s.awardMinScore&&!awarded.has(byTotal[1].nm)){awards.push({member:byTotal[1],type:'총점2등',amount:s.award2nd,sub:`${byTotal[1].total}점`});awarded.add(byTotal[1].nm);}
  for(const a of byOver){ if(awards.length>=3)break; if(awarded.has(a.nm))continue; awards.push({member:a,type:'Aver초과',amount:s.awardAver,sub:`Aver${a.aver}×${a.games}=${a.aver*a.games}→${a.total}(+${a.overAver})`});awarded.add(a.nm); }
  const allCoverAwards=(DB.allCovers||[]).map(nm=>{const m=DB.members.find(x=>x.nm===nm);return m?{member:m,type:'AllCover',amount:s.awardAllCover,sub:'10F Cover'}:null;}).filter(Boolean);
  return {regular:awards,allCover:allCoverAwards,byTotal,byOver};
}

// ── 토스트 ───────────────────────────────────────
let _tt;
function T(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('on'); clearTimeout(_tt); _tt=setTimeout(()=>t.classList.remove('on'),2300); }

// ── 네비게이션 ────────────────────────────────────
function go(id){
  window._curPage = id; // 실시간 갱신 시 현재 페이지 재렌더용
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.bn').forEach(b=>b.classList.remove('on'));
  const pg=document.getElementById('pg-'+id);
  if(pg){pg.classList.add('on');renderPage(id);}
  const bn=document.getElementById('bn-'+id);
  if(bn) bn.classList.add('on');
  if(['member','const','setting'].includes(id)) document.getElementById('bn-more')?.classList.add('on');
  document.getElementById('pages').scrollTop=0;
}
function renderPage(id){
  ({dash:renderDashboard,score:renderScore,award:renderAward,rank:renderRank,
    hist:renderHist,fin:renderFinance,more:renderMore,member:renderMember,
    const:renderConst,setting:renderSetting})[id]?.();
}
window.T=T; window.go=go;

// ── 유틸 ─────────────────────────────────────────
function teamCls(t){return {A:'a',B:'b',C:'c',D:'d'}[t]||'n';}
function gradeCls(g){return {A:'ga',B:'gb2',C:'gc',D:'gd'}[g]||'gb2';}
function teamColor(t){return {A:'var(--blu)',B:'var(--grn)',C:'var(--red)',D:'var(--pur)'}[t]||'var(--txt2)';}
function teamBg(t){return {A:'#0d1e33',B:'#0d2b1a',C:'#2b0d0d',D:'#1a0d2b'}[t]||'var(--s2)';}
function fmt(n){return Number(n||0).toLocaleString();}
function fmtMan(n){const v=Math.abs(n);return v>=10000?Math.round(n/10000*10)/10+'만':n.toLocaleString();}
// 가나다순 정렬
function sortMembers(){DB.members.sort((a,b)=>a.nm.localeCompare(b.nm,'ko'));}

// =================================================================
// ① 대시보드
// =================================================================
// ── 팀 대항 총점/평균 (동수 포함) — 대시보드와 순위가 공용으로 사용 ──
// 핸디 포함 점수를 팀 배정된 모든 회원(동수 포함)에 대해 합산한다.
function computeTeamStats(){
  const tStat={A:{t:0,n:0},B:{t:0,n:0},C:{t:0,n:0},D:{t:0,n:0}};
  DB.members.forEach(m=>{
    if(!tStat[m.team]) return;   // 팀 배정된 회원만 (A/B/C/D) — 동수도 팀이 있으면 포함
    const sc=(DB.scores[m.nm]||[]).filter(x=>x!==null&&x!==undefined);
    if(!sc.length) return;
    applyHcp(m.nm,sc).forEach(s=>{tStat[m.team].t+=s;tStat[m.team].n++;});
  });
  return tStat;
}

function renderDashboard(){
  // 하이스코어·전체평균 등 개인 통계는 동수 제외 (단, 아래 회원 목록에는 동수도 표시)
  const present=DB.members.filter(m=>!isGuest(m)&&(DB.scores[m.nm]||[]).some(x=>x!==null&&x!==undefined));

  // 팀 총점·평균은 동수 회원의 점수도 반영 (요청사항 ①)
  const tStat=computeTeamStats();

  let allSc=[];
  present.forEach(m=>allSc=allSc.concat(DB.scores[m.nm].filter(x=>x!==null&&x!==undefined)));
  const high=allSc.length?Math.max(...allSc):0;
  const allAvg=allSc.length?Math.round(allSc.reduce((a,b)=>a+b,0)/allSc.length):0;
  const bal=DB.finance.prevCash+DB.finance.prevBank+DB.finance.income.reduce((a,b)=>a+b.amt,0)-DB.finance.expense.reduce((a,b)=>a+b.amt,0);

  const activeTeams=['A','B','C','D'].filter(t=>tStat[t].n>0);
  let teamHtml='';
  if(activeTeams.length){
    teamHtml=`<div style="display:grid;grid-template-columns:repeat(${activeTeams.length},1fr);gap:6px;margin-bottom:10px">`;
    activeTeams.forEach(t=>{
      const s=tStat[t],avg=s.n?Math.round(s.t/s.n):0;
      teamHtml+=`<div style="background:${teamBg(t)};border:1px solid ${teamColor(t)};border-radius:10px;padding:10px 4px;text-align:center">
        <div style="font-size:9px;font-weight:700;color:var(--txt2)">${t}팀</div>
        <div style="font-size:20px;font-weight:900;color:${teamColor(t)};line-height:1.2">${s.t}</div>
        <div style="font-size:9px;color:#b0bdd0">avg ${avg}</div>
      </div>`;
    });
    teamHtml+='</div>';
  }

  const hasHistory=DB.scoreHistory&&DB.scoreHistory.length>0;

  // ── 상단 고정 영역 ──
  const fixedTop=teamHtml+`
  <div class="g3">
    <div class="sbox"><div class="sv y">${high}</div><div class="slb">🔥 하이스코어</div></div>
    <div class="sbox"><div class="sv b">${allAvg}</div><div class="slb">📊 전체 평균</div></div>
    <div class="sbox"><div class="sv g">${fmtMan(bal)}</div><div class="slb">💵 잔고</div></div>
  </div>
  <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
    <input type="date" id="dash-date-pick" value="${DB.meetDate}"
      style="background:var(--s2);border:1px solid var(--bdr);border-radius:7px;padding:5px 8px;color:var(--txt);font-size:13px;font-family:inherit;outline:none;flex:1"
      onchange="dashDateChange(this.value)">
    ${hasHistory?`<select id="dash-hist-sel" onchange="dashLoadHistory(this.value)"
      style="background:var(--s2);border:1px solid var(--bdr);border-radius:7px;padding:5px 6px;color:var(--txt2);font-size:11px;font-family:inherit;outline:none;flex:1;max-width:130px">
      <option value="">📂 이력 불러오기</option>
      ${DB.scoreHistory.map(h=>`<option value="${h.date}" ${h.date===DB.meetDate?'selected':''}>${h.date}</option>`).join('')}
    </select>`:''}
  </div>`;

  // ── 스크롤 영역 ──
  let scrollHtml=`<div class="sl">이번 모임 점수 — <b style="color:var(--ora)">${DB.meetDate}</b></div><div class="ml">`;

  const sorted=[...DB.members].sort((a,b)=>{
    const aP=(DB.scores[a.nm]||[]).some(x=>x!==null),bP=(DB.scores[b.nm]||[]).some(x=>x!==null);
    if(bP!==aP) return bP-aP;
    return a.nm.localeCompare(b.nm,'ko');
  });
  let idx=0;
  sorted.forEach(m=>{
    const sc=DB.scores[m.nm]||[];
    const valid=sc.filter(x=>x!==null&&x!==undefined);
    const isAbs=!valid.length;
    if(!isAbs) idx++;
    const total=valid.reduce((a,b)=>a+b,0);
    const avg=valid.length?Math.round(total/valid.length):0;
    const hcp=getHcp(m.nm);
    const fine=isAbs?{amt:0}:calcFine(m,valid);
    const fineSpan=(!isAbs&&fine.amt>0)?`<span style="font-size:13px;font-weight:700;color:var(--red);margin-left:5px">₩${fmt(fine.amt)}</span>`:'';
    const roleH=m.role?`<span class="rb">${m.role}</span>`:'';
    const tCls=teamCls(m.team);
    scrollHtml+=`<div class="mr t${tCls}" ${isAbs?'style="opacity:.55"':''}>
      <span class="mr-idx">${isAbs?'—':idx}</span>
      <span class="mr-nm">${m.nm}</span>
      <div class="mr-info">
        <div style="display:flex;gap:3px;flex-wrap:wrap;align-items:center">
          <span class="gb ${gradeCls(calcGrade(averOf(m)))}">${calcGrade(averOf(m))}조</span>${roleH}
          <span style="font-size:9px;color:var(--txt2)">${m.team?m.team+'팀':'팀없음'}</span>
          ${hcp>0?`<span style="font-size:8px;background:#1a0d2b;color:var(--pur);border-radius:3px;padding:1px 4px;font-weight:700">H+${hcp}</span>`:''}
        </div>
        ${isAbs?'<div style="font-size:9px;color:var(--txt2);margin-top:2px">결석</div>':`<div class="mr-chips">${valid.map(s=>{
          const isHi=s>=200;
          return hcp>0?`<span class="gchip ${isHi?'hi':''}">${s}<span style="color:var(--pur);font-size:7px">+${hcp}</span></span>`:`<span class="gchip ${isHi?'hi':''}">${s}</span>`;
        }).join('')}${fineSpan}</div>`}
      </div>
      <div class="mr-score">
        ${isAbs?'<div class="mr-avg" style="font-size:12px;color:var(--txt2)">결석</div>':`<div class="mr-avg">${avg}</div><div class="mr-total">${total}점</div>`}
      </div>
    </div>`;
  });
  scrollHtml+='</div>';

  // 벌금 요약
  let fines=[],totalFine=0;
  DB.members.forEach(m=>{
    const sc=(DB.scores[m.nm]||[]).filter(x=>x!==null&&x!==undefined);
    if(!sc.length) return;
    const f=calcFine(m,sc);
    if(f.amt>0){fines.push({nm:m.nm,amt:f.amt});totalFine+=f.amt;}
  });
  if(fines.length){
    scrollHtml+=`<div class="sl">벌금 현황</div><div class="fc">`;
    fines.forEach(f=>{
      const isPaid=!!DB.finePaid[f.nm];
      const pt=(DB.finePaidType&&DB.finePaidType[f.nm])||'cash';
      const payLabel=pt==='cash'?'💵 현금납부':'🏦 통장납부';
      const tag=isPaid?`<span style="font-size:9px;background:${pt==='cash'?'#1a0d00':'#0d1e33'};color:${pt==='cash'?'var(--ora)':'var(--blu)'};border-radius:3px;padding:1px 5px;margin-left:4px">${payLabel}</span>`:'';
      scrollHtml+=`<div class="fn-row"><div class="fn-nm">${f.nm}${tag}</div><div class="fn-bad">${isPaid?`<span style="color:var(--grn)">완료</span>`:`₩${fmt(f.amt)}`}</div></div>`;
    });
    scrollHtml+=`<div class="fn-total"><span style="color:var(--txt2)">총 벌금</span><span style="color:var(--red);font-weight:700">₩${fmt(totalFine)}</span></div></div>`;
  }

  // 회비 현황
  const curMon=new Date().getMonth()+1;
  const paid=[],unpaid=[];
  DB.members.forEach(m=>{ const d=(DB.dues[m.nm]||{})[curMon]||{c:false,k:false}; (d.c||d.k?paid:unpaid).push(m.nm); });
  scrollHtml+=`<div class="sl">${curMon}월 회비</div><div class="card">
    <div class="card-t">2026년 ${curMon}월 <span style="color:var(--grn)">${paid.length}/${DB.members.length}명</span></div>
    <div style="display:flex;flex-wrap:wrap;gap:5px">`;
  paid.forEach(nm=>scrollHtml+=`<span class="chip paid" onclick="qDue('${nm}',${curMon})">✓ ${nm}</span>`);
  unpaid.forEach(nm=>scrollHtml+=`<span class="chip off" onclick="qDue('${nm}',${curMon})">${nm}</span>`);
  scrollHtml+='</div></div>';

  // ── 지난 모임 이력 불러오기 (요청 ①) ──
  if(hasHistory){
    scrollHtml+=`<div class="sl">📂 지난 모임 이력 <span style="font-size:9px;font-weight:400;color:var(--txt2);letter-spacing:0">탭하면 그 모임으로 불러오기</span></div>
      <div style="display:flex;flex-direction:column;gap:6px">`;
    DB.scoreHistory.forEach((h,hi)=>{
      const pts=Object.entries(h.scores||{}).filter(([,sc])=>(sc||[]).some(x=>x!==null&&x!==undefined));
      const all=pts.flatMap(([,sc])=>sc.filter(x=>x!==null&&x!==undefined));
      const avg=all.length?Math.round(all.reduce((a,b)=>a+b,0)/all.length):0;
      const high=all.length?Math.max(...all):0;
      const isCurrent=h.date===DB.meetDate;
      const mtL=h.meetType==='flash'?'번개':h.meetType==='special'?'특별':'정기';
      scrollHtml+=`<div class="card" style="margin-bottom:0;padding:10px 12px;${isCurrent?'border-color:var(--blu)':''}">
        <div style="display:flex;align-items:center;gap:8px">
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
              <span style="font-size:13px;font-weight:700;color:#fff">📅 ${h.date}</span>
              <span style="font-size:9px;color:var(--txt2)">${mtL}모임</span>
              ${isCurrent?`<span style="font-size:9px;background:#0d1e33;color:var(--blu);border-radius:4px;padding:1px 6px">현재</span>`:''}
            </div>
            <div style="font-size:10px;color:var(--txt2);margin-top:3px;display:flex;gap:10px">
              <span>참석 ${pts.length}명</span><span>평균 <b style="color:var(--blu)">${avg}</b></span><span>최고 <b style="color:var(--ora)">${high}</b></span>
            </div>
          </div>
          <button onclick="loadFromHistory(${hi})" ${isCurrent?'disabled':''}
            style="background:${isCurrent?'var(--s2)':'#0d1e33'};border:1px solid ${isCurrent?'var(--bdr)':'var(--blu)'};border-radius:7px;color:${isCurrent?'var(--txt2)':'var(--blu)'};font-size:11px;font-weight:700;padding:7px 12px;cursor:${isCurrent?'default':'pointer'};font-family:inherit;flex-shrink:0;white-space:nowrap">${isCurrent?'표시중':'📂 불러오기'}</button>
        </div>
      </div>`;
    });
    scrollHtml+='</div>';
  }

  document.getElementById('pg-dash').innerHTML=`
    <div id="dash-top" style="position:sticky;top:0;z-index:10;background:var(--bg);padding-bottom:2px;border-bottom:1px solid var(--bdr);margin-bottom:6px">${fixedTop}</div>
    <div id="dash-scroll">${scrollHtml}</div>`;
}

// 대시보드 날짜 직접 입력
window.dashDateChange=function(newDate){
  if(!newDate||newDate===DB.meetDate) return;
  changeMeetDate(newDate);
};

// 대시보드 이력 드롭다운 선택
window.dashLoadHistory=function(date){
  if(!date) return;
  const sel=document.getElementById('dash-hist-sel');
  if(sel) sel.value='';
  const hi=DB.scoreHistory.findIndex(h=>h.date===date);
  if(hi<0) return;
  loadFromHistory(hi);
};

window.qDue=function(nm,m){
  if(!DB.dues[nm])DB.dues[nm]={};
  if(!DB.dues[nm][m])DB.dues[nm][m]={c:false,k:false};
  const d=DB.dues[nm][m];
  if(d.c||d.k){d.c=false;d.k=false;T(`❌ ${nm} ${m}월 미납`);}
  else{d.k=true;T(`✅ ${nm} ${m}월 통장납부`);}
  saveDB();renderDashboard();
};

// =================================================================
// ② 점수 입력
// =================================================================
let scoreTab='team';

function renderScore(){
  const gc=DB.settings.gameCount;
  let html=`<div class="card">
    <div class="card-t">모임 설정</div>
    <div class="g2" style="margin-bottom:9px">
      <div><label style="font-size:11px;font-weight:600;color:var(--txt2);display:block;margin-bottom:4px">날짜</label>
        <input class="fi" type="date" value="${DB.meetDate}" onchange="changeMeetDate(this.value)"></div>
      <div><label style="font-size:11px;font-weight:600;color:var(--txt2);display:block;margin-bottom:4px">게임수 (최대 5)</label>
        <select class="fs" onchange="setGames(+this.value)">
          ${[1,2,3,4,5].map(n=>`<option value="${n}" ${n===gc?'selected':''}>${n}게임</option>`).join('')}
        </select></div>
    </div>
    <div style="display:flex;gap:5px;flex-wrap:wrap">
      ${['regular','flash','special'].map(t=>{
        const L=t==='regular'?'정기모임':t==='flash'?'번개모임':'특별모임';
        return `<div class="chip ${DB.meetType===t?'on':'off'}" onclick="DB.meetType='${t}';saveDB();renderScore();updateHeader()">${L}</div>`;
      }).join('')}
    </div>
  </div>
  <div class="tab2">
    <div class="tab-btn ${scoreTab==='team'?'on':'off'}" onclick="scoreTab='team';renderScore()">🏆 팀별 입력</div>
    <div class="tab-btn ${scoreTab==='ind'?'on':'off'}" onclick="scoreTab='ind';renderScore()">👤 개인별 입력</div>
  </div>`;

  if(scoreTab==='ind'){
    [...DB.members].sort((a,b)=>a.nm.localeCompare(b.nm,'ko')).forEach(m=>{ html+=scoreCard(m,gc); });
  }else{
    const teams={A:[],B:[],C:[],D:[],'':[]}; 
    DB.members.forEach(m=>{ const t=['A','B','C','D'].includes(m.team)?m.team:''; teams[t].push(m); });
    ['A','B','C','D',''].forEach(t=>{
      const list=teams[t]; if(!list.length) return;
      let tt=0,tn=0;
      list.forEach(m=>{
        const sc=(DB.scores[m.nm]||[]).filter(x=>x!==null&&x!==undefined);
        applyHcp(m.nm,sc).forEach(s=>{tt+=s;tn++;});
      });
      const tCls=teamCls(t);
      html+=`<div class="team-hdr ${tCls}">
        <span class="thdr-nm">${t||'팀없음'}${t?' 팀':''}</span>
        <span style="font-size:10px;color:${teamColor(t)};margin-left:5px">${list.length}명</span>
        <span class="thdr-stat">합계 ${tt} | avg ${tn?Math.round(tt/tn):0}</span>
        ${tt>0?`<span style="font-size:8px;color:var(--pur);margin-left:3px">(핸디포함)</span>`:''}
      </div>`;
      list.forEach(m=>{ html+=scoreCard(m,gc); });
    });
  }

  html+=`<button class="btn r" onclick="saveDB();T('💾 전체 저장 완료!')">💾 전체 저장</button>
  <div style="height:6px"></div>
  <button class="btn s" style="color:var(--pur);border-color:var(--pur)" onclick="archiveMeet()">📁 이번 모임 전체 저장 (이력)</button>
  <div style="height:6px"></div>
  <button class="btn s" style="color:var(--ora);border-color:var(--ora)" onclick="startNewMeet()">🆕 새 모임 시작</button>`;
  document.getElementById('pg-score').innerHTML=html;
}

function scoreCard(m,gc){
  const sc=DB.scores[m.nm]||Array(gc).fill(null);
  const valid=sc.filter(x=>x!==null&&x!==undefined);
  const isAbs=!valid.length;
  const total=valid.reduce((a,b)=>a+b,0);
  const avg=valid.length?Math.round(total/valid.length):0;
  const hcp=getHcp(m.nm);
  const scH=applyHcp(m.nm,valid);
  const totalH=scH.reduce((a,b)=>a+b,0);
  const avgH=scH.length?Math.round(totalH/scH.length):0;
  const fine=isAbs?{amt:0,reasons:[]}:calcFine(m,valid);
  const isPaid=!!DB.finePaid[m.nm];
  const pt=(DB.finePaidType||{})[m.nm]||'cash';
  const tCls=teamCls(m.team);
  const roleH=m.role?`<span class="rb">${m.role}</span>`:'';
  const mav=averOf(m);                       // 이 모임에 적용되는 Aver (과거 모임이면 고정값)
  const mgrp=calcGrade(mav);                 // 그 Aver에 따른 조
  const diff=total-mav*valid.length;         // 이 모임 기준 Aver 대비 차이

  let html=`<div class="sc-card" style="border-left:5px solid ${teamColor(m.team)};${isAbs?'opacity:.55;':''}">
    <div class="sc-hdr">
      <span class="sc-nm">${m.nm}</span>
      <select onchange="setTeamByName('${m.nm}',this.value)" title="팀 지정"
        style="background:${teamBg(m.team)};border:1px solid ${teamColor(m.team)};border-radius:5px;color:${teamColor(m.team)};font-size:11px;font-weight:700;padding:2px 4px;font-family:inherit;outline:none">
        <option value="" ${!m.team?'selected':''}>팀없음</option>
        ${['A','B','C','D'].map(t=>`<option value="${t}" ${m.team===t?'selected':''}>${t}팀</option>`).join('')}
      </select>
      <span class="gb ${gradeCls(mgrp)}">${mgrp}조</span>${roleH}
      <span style="display:inline-flex;align-items:center;gap:3px;font-size:9px;color:var(--pur)">핸디
        <input type="number" inputmode="numeric" value="${hcp}" min="0" max="100"
          onfocus="this.select()" onchange="setHcpByName('${m.nm}',this.value)" title="핸디 점수(게임당)"
          style="width:42px;background:var(--s3);border:1px solid rgba(167,139,250,.5);border-radius:5px;color:var(--pur);font-weight:700;font-size:12px;text-align:center;padding:2px;font-family:inherit;outline:none">
      </span>
      <div class="abs-tog ${isAbs?'absent':''}" onclick="toggleAbs('${m.nm}')">${isAbs?'결석 ●':'결석 ○'}</div>
    </div>`;

  if(isAbs){
    html+=`<div style="font-size:11px;color:var(--txt2);text-align:center;padding:10px">결석 처리됨</div>`;
  }else{
    html+=`<div class="sgi" style="grid-template-columns:repeat(${gc},1fr)">`;
    for(let i=0;i<gc;i++){
      const raw=sc[i];
      // 미입력(null/undefined)이면 value 없이 placeholder만
      const hasVal = raw!==null && raw!==undefined;
      const v = hasVal ? raw : '';
      const isHi = hasVal && raw>=200;
      html+=`<div class="sgf">
        <label>${i+1}G${hcp>0?`<span style="color:var(--pur);font-size:7px"> +H</span>`:''}</label>
        <input type="number" inputmode="numeric"
          ${hasVal?`value="${v}"`:''}
          placeholder="${i+1}G"
          min="0" max="300"
          ${isHi?'class="hi"':''}
          onfocus="this.select()"
          oninput="scoreInput('${m.nm}',${i},this)"
          onchange="scoreInput('${m.nm}',${i},this)">
        ${hcp>0&&hasVal?`<div style="font-size:9px;color:var(--pur);font-weight:700;text-align:center">${raw+hcp}</div>`:''}
      </div>`;
    }
    html+=`</div><div class="sc-sum">
      <span>총점 <b style="color:var(--ora)">${total}</b></span>
      <span>avg <b style="color:#fff">${avg}</b></span>
      ${hcp>0?`<span>핸디총점 <b style="color:var(--pur)">${totalH}</b></span><span>핸디avg <b style="color:var(--pur)">${avgH}</b></span>`:''}
      <span style="display:inline-flex;align-items:center;gap:4px">Aver
        <input type="number" inputmode="numeric" value="${mav}" min="0" max="300"
          onfocus="this.select()" onchange="setAverByName('${m.nm}',this.value)"
          style="width:50px;background:var(--s3);border:1px solid var(--blu);border-radius:5px;color:var(--blu);font-weight:700;font-size:13px;text-align:center;padding:3px 2px;font-family:inherit;outline:none">
      </span>
      <span style="color:${diff>=0?'var(--grn)':'var(--red)'};font-weight:700">${diff>=0?'+':''}${diff}</span>
    </div>`;

    if(fine.amt>0){
      html+=`<div class="fil bad">
        <div class="fi-l bad">${fine.reasons.join(' / ')}</div>
        <div class="fi-r">
          <span class="fi-amt bad">₩${fmt(fine.amt)}</span>
          <select style="background:var(--s3);border:1px solid var(--bdr);border-radius:4px;color:var(--txt);font-size:9px;padding:2px 4px;font-family:inherit" onchange="setPT('${m.nm}',this.value)">
            <option value="cash" ${pt==='cash'?'selected':''}>현금</option>
            <option value="bank" ${pt==='bank'?'selected':''}>통장</option>
          </select>
          <div class="fi-chk ${isPaid?'paid':'unpaid'}" onclick="toggleFP('${m.nm}')">${isPaid?'✓':'✗'}</div>
        </div>
      </div>`;
    }else{
      html+=`<div class="fil ok"><div class="fi-l ok">벌금 없음</div><div class="fi-r"><span class="fi-amt ok">₩0</span></div></div>`;
    }
  }
  return html+`</div>`;
}

// 날짜 변경 → 현재 모임 자동 보존 후 초기화 (또는 이력 복원)
window.changeMeetDate=function(newDate){
  if(newDate===DB.meetDate) return;
  if(!DB.scoreHistory) DB.scoreHistory=[];

  // 현재 모임 데이터 자동 이력 저장
  const hasData=DB.members.some(m=>(DB.scores[m.nm]||[]).some(x=>x!==null&&x!==undefined));
  if(hasData) _autoSaveCurrentMeet();

  // 새 날짜에 저장된 이력이 있으면 복원 여부 확인
  const existHist=DB.scoreHistory.find(h=>h.date===newDate);
  if(existHist){
    const restore=confirm(
      `📅 ${newDate}\n\n저장된 모임 기록이 있습니다.\n\n` +
      `[확인] 저장된 전체 정보 불러오기 (점수·벌금·장부 모두)\n[취소] 빈 점수로 새로 시작`
    );
    DB.meetDate=newDate;
    if(restore){
      if(existHist.gameCount) DB.settings.gameCount=existHist.gameCount;
      Object.keys(DB.scores).forEach(nm=>{DB.scores[nm]=Array(DB.settings.gameCount).fill(null);});
      Object.assign(DB.scores, JSON.parse(JSON.stringify(existHist.scores)));
      DB.finePaid    = JSON.parse(JSON.stringify(existHist.finePaid||{}));
      DB.finePaidType= JSON.parse(JSON.stringify(existHist.finePaidType||{}));
      DB.allCovers   = [...(existHist.allCovers||[])];
      DB.meetType    = existHist.meetType||'regular';
      if(existHist.finance) DB.finance=JSON.parse(JSON.stringify(existHist.finance));
      if(existHist.dues)    DB.dues=JSON.parse(JSON.stringify(existHist.dues));
      _setMeetAverFromSnap(existHist);   // 불러온 과거 모임의 Aver 고정
      saveDB(); updateHeader(); renderScore();
      T(`📅 ${newDate} — 전체 정보 복원 완료`);
      return;
    }
  } else {
    if(!confirm(
      `📅 ${newDate}로 변경합니다.\n\n` +
      `${hasData?`현재 모임(${DB.meetDate}) 정보는 이력에 자동 저장됩니다.\n`:''}` +
      `새 점수판으로 초기화됩니다.\n\n계속하시겠습니까?`
    )){ renderScore(); return; }
    DB.meetDate=newDate;
  }

  // 초기화
  DB.members.forEach(m=>{DB.scores[m.nm]=Array(DB.settings.gameCount).fill(null);});
  DB.finePaid={}; DB.finePaidType={}; DB.allCovers=[];
  _clearMeetAver();   // 새(활성) 모임 → 현재 회원 Aver 사용
  saveDB(); updateHeader(); renderScore();
  T(`📅 ${newDate} — 새 점수판 시작`);
};

window.setGames=function(n){
  DB.settings.gameCount=n;
  Object.keys(DB.scores).forEach(nm=>{
    const c=DB.scores[nm]||[];
    while(c.length<n) c.push(null); c.length=n; DB.scores[nm]=c;
  });
  saveDB();renderScore();updateHeader();T(`🎮 ${n}게임`);
};
// 점수 실시간 입력 처리 (oninput/onchange 공용)
window.scoreInput=function(nm,idx,el){
  const v=el.value;
  if(!DB.scores[nm]) DB.scores[nm]=Array(DB.settings.gameCount).fill(null);
  const parsed=v===''?null:Math.max(0,Math.min(300,parseInt(v)||0));
  DB.scores[nm][idx]=parsed;
  // 하이스코어 스타일 즉시 반영
  if(parsed!==null && parsed>=200) el.classList.add('hi');
  else el.classList.remove('hi');
  // 핸디 표시 갱신 (input 아래 핸디 div)
  const hcp=((DB.members.find(x=>x.nm===nm)||{}).handicap)||0;
  const hcpDiv=el.parentElement.querySelector('div[data-hcp]');
  if(hcpDiv){
    if(parsed!==null&&hcp>0){ hcpDiv.textContent=parsed+hcp; hcpDiv.style.display='block'; }
    else hcpDiv.style.display='none';
  }
  // 디바운스 저장 (0.6초 후)
  clearTimeout(el._saveT);
  el._saveT=setTimeout(()=>{ saveDB(); _refreshScoreSum(nm); },600);
};

// 해당 회원 카드 합산 영역만 갱신 (전체 재렌더 없이)
function _refreshScoreSum(nm){
  const sc=DB.scores[nm]||[];
  const valid=sc.filter(x=>x!==null&&x!==undefined);
  if(!valid.length) return;
  const m=DB.members.find(x=>x.nm===nm); if(!m) return;
  const total=valid.reduce((a,b)=>a+b,0);
  const avg=Math.round(total/valid.length);
  const hcp=getHcp(m.nm);
  const scH=applyHcp(nm,valid);
  const totalH=scH.reduce((a,b)=>a+b,0);
  const avgH=scH.length?Math.round(totalH/scH.length):0;
  const mav=averOf(m);
  const diff=total-mav*valid.length;
  // sc-sum 요소 찾아서 업데이트
  const cards=document.querySelectorAll('.sc-card');
  cards.forEach(card=>{
    if(card.querySelector('.sc-nm')?.textContent===nm){
      const sum=card.querySelector('.sc-sum');
      if(sum) sum.innerHTML=`
        <span>총점 <b style="color:var(--ora)">${total}</b></span>
        <span>avg <b style="color:#fff">${avg}</b></span>
        ${hcp>0?`<span>핸디총점 <b style="color:var(--pur)">${totalH}</b></span><span>핸디avg <b style="color:var(--pur)">${avgH}</b></span>`:''}
        <span style="display:inline-flex;align-items:center;gap:4px">Aver
          <input type="number" inputmode="numeric" value="${mav}" min="0" max="300"
            onfocus="this.select()" onchange="setAverByName('${nm}',this.value)"
            style="width:50px;background:var(--s3);border:1px solid var(--blu);border-radius:5px;color:var(--blu);font-weight:700;font-size:13px;text-align:center;padding:3px 2px;font-family:inherit;outline:none">
        </span>
        <span style="color:${diff>=0?'var(--grn)':'var(--red)'};font-weight:700">${diff>=0?'+':''}${diff}</span>`;
      // 벌금 재계산
      const fine=calcFine(m,valid);
      const filEl=card.querySelector('.fil');
      if(filEl){
        if(fine.amt>0){
          filEl.className='fil bad';
          filEl.innerHTML=`<div class="fi-l bad">${fine.reasons.join(' / ')}</div><div class="fi-r"><span class="fi-amt bad">₩${fmt(fine.amt)}</span></div>`;
        }else{
          filEl.className='fil ok';
          filEl.innerHTML=`<div class="fi-l ok">벌금 없음</div><div class="fi-r"><span class="fi-amt ok">₩0</span></div>`;
        }
      }
    }
  });
}

window.setScore=function(nm,i,v){
  if(!DB.scores[nm]) DB.scores[nm]=Array(DB.settings.gameCount).fill(null);
  DB.scores[nm][i]=v===''?null:Math.max(0,Math.min(300,parseInt(v)||0));
  saveDB();
};
window.toggleAbs=function(nm){
  const sc=DB.scores[nm]||[];
  const isAbs=!sc.some(x=>x!==null&&x!==undefined);
  DB.scores[nm]=Array(DB.settings.gameCount).fill(isAbs?0:null);
  saveDB();renderScore();T(isAbs?`✅ ${nm} 출석`:`❌ ${nm} 결석`);
};
window.toggleFP=function(nm){
  DB.finePaid[nm]=!DB.finePaid[nm];saveDB();
  T(DB.finePaid[nm]?`✅ ${nm} 벌금납부`:`❌ ${nm} 미납`);renderScore();
};
window.setPT=function(nm,v){
  if(!DB.finePaidType)DB.finePaidType={};DB.finePaidType[nm]=v;saveDB();
};
// 요청사항 ③ — 점수입력 창에서 개인 평균(Aver) 직접 수정
// 과거(불러온) 모임을 보는 중이면 그 모임의 Aver만 바꾸고(다른 모임·기본값에 영향 없음),
// 활성(현재/새) 모임이면 회원 기본 Aver를 바꿔 이 모임부터 적용한다.
window.setAverByName=function(nm,v){
  const m=DB.members.find(x=>x.nm===nm); if(!m) return;
  const n=parseInt(v,10);
  const val=(isNaN(n)||n<0)?0:Math.min(300,n);
  if(isFrozenMeet()){
    // 과거 모임만 수정 — 전역/다른 모임에는 영향 없음
    if(!DB.meetAver) DB.meetAver={};
    DB.meetAver[nm]=val;
    // 현재 보고 있는 이력의 스냅샷도 갱신해 영구 반영
    const ei=DB.scoreHistory?DB.scoreHistory.findIndex(x=>x.date===DB.meetDate):-1;
    if(ei>=0){
      if(!Array.isArray(DB.scoreHistory[ei].memberSnap)) DB.scoreHistory[ei].memberSnap=[];
      const snap=DB.scoreHistory[ei].memberSnap.find(s=>s.nm===nm);
      if(snap){ snap.aver=val; snap.group=calcGrade(val); }
      else DB.scoreHistory[ei].memberSnap.push({nm,aver:val,handicap:getHcp(nm),team:m.team,group:calcGrade(val),role:m.role});
    }
    saveDB(); renderScore(); T(`📊 ${nm} Aver ${val} (이 모임만)`);
  }else{
    // 활성(현재/새) 모임 — 회원 기본 Aver 수정 (이 모임부터 적용, 과거 모임은 고정되어 영향 없음)
    m.aver=val; m.group=calcGrade(val);
    saveDB(); renderScore(); T(`📊 ${nm} Aver ${val}`);
  }
};
// 요청 — 점수입력 창에서 팀 지정 (회원 기본 정보 변경)
window.setTeamByName=function(nm,t){
  const m=DB.members.find(x=>x.nm===nm); if(!m) return;
  m.team=['A','B','C','D'].includes(t)?t:'';
  saveDB(); renderScore(); T(`👥 ${nm} → ${m.team?m.team+'팀':'팀없음'}`);
};
// 요청 — 점수입력 창에서 핸디 점수(게임당) 지정
window.setHcpByName=function(nm,v){
  const m=DB.members.find(x=>x.nm===nm); if(!m) return;
  const n=parseInt(v,10);
  const val=(isNaN(n)||n<0)?0:Math.min(100,n);
  if(isFrozenMeet()){
    // 과거 모임만 수정 — 전역/다른 모임에 영향 없음
    if(!DB.meetHcp) DB.meetHcp={};
    DB.meetHcp[nm]=val;
    const ei=DB.scoreHistory?DB.scoreHistory.findIndex(x=>x.date===DB.meetDate):-1;
    if(ei>=0){
      if(!Array.isArray(DB.scoreHistory[ei].memberSnap)) DB.scoreHistory[ei].memberSnap=[];
      const snap=DB.scoreHistory[ei].memberSnap.find(s=>s.nm===nm);
      if(snap){ snap.handicap=val; }
      else DB.scoreHistory[ei].memberSnap.push({nm,aver:m.aver,handicap:val,team:m.team,group:calcGrade(m.aver),role:m.role});
      if(DB.scoreHistory[ei].handicaps) DB.scoreHistory[ei].handicaps[nm]=val;
    }
    saveDB(); renderScore(); T(`🎯 ${nm} 핸디 ${val} (이 모임만)`);
  }else{
    m.handicap=val;
    saveDB(); renderScore(); T(`🎯 ${nm} 핸디 ${val}`);
  }
};
window.archiveMeet=function(){
  if(!confirm(`📁 ${DB.meetDate} 모임 전체 정보를 저장합니다.\n\n점수·벌금·시상·장부·회비 모든 정보가 저장됩니다.\n\n계속하시겠습니까?`)) return;
  if(!DB.scoreHistory) DB.scoreHistory=[];
  const ei=DB.scoreHistory.findIndex(h=>h.date===DB.meetDate);
  const entry={
    date: DB.meetDate,
    meetType: DB.meetType,
    gameCount: DB.settings.gameCount,
    // 점수·벌금
    scores: JSON.parse(JSON.stringify(DB.scores)),
    handicaps: {},
    finePaid: JSON.parse(JSON.stringify(DB.finePaid)),
    finePaidType: JSON.parse(JSON.stringify(DB.finePaidType||{})),
    allCovers: [...(DB.allCovers||[])],
    // 장부 스냅샷
    finance: JSON.parse(JSON.stringify(DB.finance)),
    // 회비 납부 스냅샷
    dues: JSON.parse(JSON.stringify(DB.dues)),
    // 회원 Aver·핸디 스냅샷
    memberSnap: DB.members.map(m=>({nm:m.nm,aver:averOf(m),handicap:getHcp(m.nm),team:m.team,group:calcGrade(averOf(m)),role:m.role}))
  };
  DB.members.forEach(m=>{entry.handicaps[m.nm]=getHcp(m.nm);});
  if(ei>=0){DB.scoreHistory[ei]=entry;T('✅ 이력 업데이트 완료');}
  else{DB.scoreHistory.push(entry);T('✅ 이력 저장 완료');}
  DB.scoreHistory.sort((a,b)=>b.date.localeCompare(a.date));
  saveDB();
};

// 새 모임 시작 — 현재 모임 전체 저장 후 초기화
window.startNewMeet=function(){
  const today=new Date().toISOString().slice(0,10);
  const newDate=prompt('새 모임 날짜를 입력하세요 (YYYY-MM-DD)', today);
  if(!newDate) return;
  if(!/^\d{4}-\d{2}-\d{2}$/.test(newDate)){ T('⚠️ 날짜 형식 오류 (예: 2026-05-24)'); return; }

  // 현재 모임 전체 자동 저장
  _autoSaveCurrentMeet();

  // 새 날짜에 기존 이력 있는지 확인
  const existHist=DB.scoreHistory.find(h=>h.date===newDate);
  if(existHist){
    const restore=confirm(
      `📅 ${newDate}\n\n이미 저장된 기록이 있습니다.\n\n` +
      `[확인] 저장된 전체 정보 불러오기\n[취소] 빈 점수로 새로 시작`
    );
    DB.meetDate=newDate;
    if(restore){
      if(existHist.gameCount) DB.settings.gameCount=existHist.gameCount;
      Object.keys(DB.scores).forEach(nm=>{DB.scores[nm]=Array(DB.settings.gameCount).fill(null);});
      Object.assign(DB.scores, JSON.parse(JSON.stringify(existHist.scores)));
      DB.finePaid    = JSON.parse(JSON.stringify(existHist.finePaid||{}));
      DB.finePaidType= JSON.parse(JSON.stringify(existHist.finePaidType||{}));
      DB.allCovers   = [...(existHist.allCovers||[])];
      DB.meetType    = existHist.meetType||'regular';
      if(existHist.finance) DB.finance=JSON.parse(JSON.stringify(existHist.finance));
      if(existHist.dues)    DB.dues=JSON.parse(JSON.stringify(existHist.dues));
      _setMeetAverFromSnap(existHist);   // 불러온 과거 모임의 Aver 고정
      saveDB(); updateHeader(); renderScore();
      T(`✅ ${newDate} — 기존 정보 복원 완료`);
      return;
    }
  } else {
    if(!confirm(
      `🆕 새 모임을 시작합니다.\n\n` +
      `날짜: ${newDate}\n` +
      `현재 모임(${DB.meetDate}) 정보는 이력에 저장됩니다.\n\n` +
      `점수·벌금·AllCover가 초기화됩니다.\n(장부·회비는 유지됩니다)\n\n계속하시겠습니까?`
    )) return;
    DB.meetDate=newDate;
  }

  // 점수·벌금·AllCover 초기화 (장부·회비는 유지)
  DB.members.forEach(m=>{DB.scores[m.nm]=Array(DB.settings.gameCount).fill(null);});
  DB.finePaid={}; DB.finePaidType={}; DB.allCovers=[];
  _clearMeetAver();   // 새(활성) 모임 → 현재 회원 Aver 사용 (이때부터 Aver 수정 가능)
  saveDB(); updateHeader(); renderScore();
  T(`🆕 ${newDate} 새 모임 시작!`);
};
let awardTab='award';
function renderAward(){
  const aw=calcAwards(),s=DB.settings;
  // 동수(게스트) 참가자 — 시상·벌금 대상 아님, 회색으로 흐리게 안내
  const guests=DB.members.filter(m=>isGuest(m)&&(DB.scores[m.nm]||[]).some(x=>x!==null&&x!==undefined));
  const guestNote=guests.length?`<div class="note" style="opacity:.4;font-size:10px;border-style:dashed">동수 (시상·벌금 제외): ${guests.map(g=>g.nm).join(', ')}</div>`:'';
  let html=`<div class="tab3">
    <div class="tab-btn ${awardTab==='award'?'on':'off'}" onclick="awardTab='award';renderAward()">🏆 시상</div>
    <div class="tab-btn ${awardTab==='fine'?'on':'off'}" onclick="awardTab='fine';renderAward()">💸 벌금</div>
    <div class="tab-btn ${awardTab==='miss'?'on':'off'}" onclick="awardTab='miss';renderAward()">📋 미시상</div>
  </div>`;

  if(awardTab==='award'){
    html+=`<div class="note y">총점1·2등은 Aver 시상 자동 제외 | 최대 3명</div>`;
    ['🥇','🥈','🥉'].forEach((md,i)=>{
      const a=aw.regular[i]; if(!a) return;
      html+=`<div class="aw-card"><div class="aw-row"><div><div class="aw-nm">${md} ${a.member.nm} <span class="eb">${a.type}</span></div><div class="aw-sub">${a.sub}</div></div><div class="aw-val g">₩${fmt(a.amount)}</div></div></div>`;
    });
    if(!aw.regular.length) html+=`<div class="note r">시상 기준 미달</div>`;

    if(s.features.allCover){
      html+=`<div class="aw-card" style="border-color:rgba(167,139,250,.35)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div class="aw-hdr" style="color:var(--pur);margin-bottom:0">🎯 All Cover</div>
          <span class="adm-b">🔒 관리자</span>
        </div>
        <div style="display:flex;gap:5px;flex-wrap:wrap">`;
      DB.members.filter(m=>!isGuest(m)&&(DB.scores[m.nm]||[]).some(x=>x!==null)).forEach(m=>{
        const on=(DB.allCovers||[]).includes(m.nm);
        html+=`<div class="chip ${on?'pur':'off'}" onclick="checkAdmin(()=>toggleAC('${m.nm}'))">${m.nm}${on?' ✓':''}</div>`;
      });
      html+=`</div>`;
      if(aw.allCover.length) html+=`<div style="font-size:10px;color:var(--txt2);margin-top:8px">${aw.allCover.map(a=>a.member.nm).join(', ')} → 각 ₩${fmt(s.awardAllCover)}</div>`;
      html+=`</div>`;
    }
    const tot=aw.regular.reduce((a,b)=>a+b.amount,0)+aw.allCover.reduce((a,b)=>a+b.amount,0);
    html+=`<div class="card"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;color:var(--txt2)">총 시상</span><span style="font-size:18px;font-weight:900;color:var(--ora)">₩${fmt(tot)}</span></div></div>`;

  }else if(awardTab==='fine'){
    html+=`<div class="note r">Aver 기준 자동 계산 | 최대 ₩${fmt(s.fineMaxLimit)}</div>`;
    let tot=0;
    DB.members.forEach(m=>{
      const sc=(DB.scores[m.nm]||[]).filter(x=>x!==null&&x!==undefined);
      if(!sc.length) return;
      const f=calcFine(m,sc);
      if(!f.amt) return;
      tot+=f.amt;
      const isPaid=DB.finePaid[m.nm];
      const pt=(DB.finePaidType||{})[m.nm]||'cash';
      html+=`<div class="fc">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap">
          <span style="font-size:13px;font-weight:700;color:#fff">${m.nm}</span>
          <span class="gb ${gradeCls(calcGrade(averOf(m)))}">${calcGrade(averOf(m))}조</span>
          <span style="font-size:10px;color:var(--txt2)">Aver ${averOf(m)}</span>
          <div style="margin-left:auto;display:flex;gap:5px;align-items:center">
            <select style="background:var(--s3);border:1px solid var(--bdr);border-radius:5px;color:var(--txt);font-size:10px;padding:3px 5px;font-family:inherit" onchange="setPT('${m.nm}',this.value)">
              <option value="cash" ${pt==='cash'?'selected':''}>💵 현금</option>
              <option value="bank" ${pt==='bank'?'selected':''}>🏦 통장</option>
            </select>
            ${isPaid?`<div class="fi-chk paid" onclick="toggleFP('${m.nm}')">✓</div>`:`<div class="fi-chk unpaid" onclick="toggleFP('${m.nm}')" style="opacity:.4"></div>`}
          </div>
        </div>`;
      f.reasons.forEach(r=>html+=`<div class="fn-row" style="border:none"><div class="fn-why">${r}</div></div>`);
      html+=`<div class="fn-total"><span>합산</span><span class="fn-bad">₩${fmt(f.amt)}</span></div></div>`;
    });
    if(!tot) html+=`<div class="note g">벌금 없음</div>`;
    else html+=`<div class="card"><div style="display:flex;justify-content:space-between"><span style="font-size:12px;color:var(--txt2)">총 벌금</span><span style="font-size:18px;font-weight:900;color:var(--red)">₩${fmt(tot)}</span></div></div>`;

  }else{
    html+=`<div class="note b">한도 초과 또는 기준 미달 → 미시상</div>`;
    const named=new Set(aw.regular.map(a=>a.member.nm));
    const missed=aw.byOver.filter(m=>!named.has(m.nm));
    html+=`<div class="aw-card" style="border-color:rgba(136,150,179,.3)">`;
    if(missed.length) missed.forEach(m=>html+=`<div class="aw-row"><div><div class="aw-nm" style="color:var(--txt2)">${m.nm} <span class="eb no">Aver초과</span></div><div class="aw-sub">+${m.overAver}점 → 이월</div></div><div class="aw-val gray">이월</div></div>`);
    else html+=`<div style="text-align:center;color:var(--txt2);font-size:11px;padding:8px">미시상 없음</div>`;
    html+=`</div>`;
  }
  html+=guestNote;
  document.getElementById('pg-award').innerHTML=html;
}
window.toggleAC=function(nm){
  if(!DB.allCovers)DB.allCovers=[];
  const i=DB.allCovers.indexOf(nm);
  if(i>=0){DB.allCovers.splice(i,1);T(`❌ ${nm} All Cover 취소`);}
  else{DB.allCovers.push(nm);T(`✅ ${nm} All Cover`);}
  saveDB();renderAward();
};

// =================================================================
// ④ 순위
// =================================================================
let rankMode='total';
function renderRank(){
  const present=DB.members.filter(m=>!isGuest(m)&&(DB.scores[m.nm]||[]).some(x=>x!==null));
  const stats=present.map(m=>{
    const sc=DB.scores[m.nm].filter(x=>x!==null&&x!==undefined);
    const total=sc.reduce((a,b)=>a+b,0);
    const avg=sc.length?Math.round(total/sc.length):0;
    const scH=applyHcp(m.nm,sc);
    const totalH=scH.reduce((a,b)=>a+b,0);
    const hcp=getHcp(m.nm);
    return {...m,total,avg,scores:sc,totalH,hcp};
  }).sort((a,b)=>rankMode==='total'?b.total-a.total:b.avg-a.avg);

  // 팀 대항 총점·avg는 대시보드와 동일한 값 사용 (동수 포함) — 요청사항 ⑥
  const tStat=computeTeamStats();
  const activeTeams=['A','B','C','D'].filter(t=>tStat[t].n>0);

  let html=`<div class="tab2">
    <div class="tab-btn ${rankMode==='total'?'on':'off'}" onclick="rankMode='total';renderRank()">총점 기준</div>
    <div class="tab-btn ${rankMode==='avg'?'on':'off'}" onclick="rankMode='avg';renderRank()">평균 기준</div>
  </div>
  <div class="sl">${DB.meetDate} 순위 (${stats.length}명)</div>
  <div style="display:flex;flex-direction:column;gap:5px">`;

  stats.forEach((m,i)=>{
    const r=i+1;
    const md=r===1?'🥇':r===2?'🥈':r===3?'🥉':String(r);
    const cls=r<=3?`g${r}`:'gray';
    const roleH=m.role?`<span class="rb">${m.role}</span>`:'';
    html+=`<div class="rk">
      <div class="rk-n ${cls}">${md}</div>
      <span class="rk-nm">${m.nm}</span>
      <div class="rk-info">
        <div style="display:flex;gap:3px;flex-wrap:wrap"><span class="gb ${gradeCls(calcGrade(averOf(m)))}">${calcGrade(averOf(m))}조</span>${roleH}<span style="font-size:9px;color:var(--txt2)">${m.team?m.team+'팀':'팀없음'}</span>${m.hcp>0?`<span style="font-size:8px;color:var(--pur)"> H+${m.hcp}</span>`:''}</div>
        <div class="rk-sub">${m.scores.join('/')}${m.hcp>0?` → ${m.scores.map(s=>s+m.hcp).join('/')}`:''}</div>
      </div>
      <div class="rk-r">
        <div class="rk-total">${m.total}점${m.hcp>0?`<span style="color:var(--pur);font-size:9px"> (${m.totalH})</span>`:''}</div>
        <div class="rk-avg">avg ${m.avg}</div>
      </div>
    </div>`;
  });
  html+=`</div><div class="sl">팀 대항 (핸디 포함)</div>
  <div style="display:grid;grid-template-columns:repeat(${Math.max(1,activeTeams.length)},1fr);gap:6px">`;
  activeTeams.forEach(t=>{
    const s=tStat[t],avg=s.n?Math.round(s.t/s.n):0;
    html+=`<div style="background:${teamBg(t)};border:1px solid ${teamColor(t)};border-radius:10px;padding:10px 4px;text-align:center">
      <div style="font-size:9px;font-weight:700;color:var(--txt2)">${t}팀</div>
      <div style="font-size:22px;font-weight:900;color:${teamColor(t)}">${s.t}</div>
      <div style="font-size:9px;color:#b0bdd0">avg ${avg}</div>
    </div>`;
  });
  html+=`</div>`;
  document.getElementById('pg-rank').innerHTML=html;
}

// =================================================================
// ⑤ 성적표 (개인 이력 포함)
// =================================================================
let histTab='current';
let histNm='';

function renderHist(){
  let html=`<div class="tab3">
    <div class="tab-btn ${histTab==='current'?'on':'off'}" onclick="histTab='current';renderHist()">📊 이번 모임</div>
    <div class="tab-btn ${histTab==='personal'?'on':'off'}" onclick="histTab='personal';renderHist()">👤 개인 이력</div>
    <div class="tab-btn ${histTab==='all'?'on':'off'}" onclick="histTab='all';renderHist()">📅 전체 이력</div>
  </div>`;
  if(histTab==='current') html+=histCurrent();
  else if(histTab==='personal') html+=histPersonal();
  else html+=histAll();
  document.getElementById('pg-hist').innerHTML=html;
}

function histCurrent(){
  const present=DB.members.filter(m=>!isGuest(m)&&(DB.scores[m.nm]||[]).some(x=>x!==null));
  let all=[];
  present.forEach(m=>all=all.concat(DB.scores[m.nm].filter(x=>x!==null&&x!==undefined)));
  const total=all.length,avg=total?Math.round(all.reduce((a,b)=>a+b,0)/total):0,high=total?Math.max(...all):0;
  const sorted=[...DB.members].filter(m=>!isGuest(m)).sort((a,b)=>averOf(b)-averOf(a));

  let html=`<div class="note b">📊 ${DB.meetDate} 성적표</div>
  <div class="g3">
    <div class="sbox"><div class="sv y">${total}</div><div class="slb">총 게임</div></div>
    <div class="sbox"><div class="sv b">${avg}</div><div class="slb">전체평균</div></div>
    <div class="sbox"><div class="sv r">${high}</div><div class="slb">최고점</div></div>
  </div>
  <div class="sl">개인 성적 (Aver순)</div><div class="ml">`;

  sorted.forEach((m,i)=>{
    const sc=(DB.scores[m.nm]||[]).filter(x=>x!==null&&x!==undefined);
    const t=sc.reduce((a,b)=>a+b,0),av=sc.length?Math.round(t/sc.length):0;
    const hcp=m.handicap||0,scH=applyHcp(m.nm,sc),tH=scH.reduce((a,b)=>a+b,0);
    const roleH=m.role?`<span class="rb">${m.role}</span>`:'';
    html+=`<div class="mr t${teamCls(m.team)}">
      <span class="mr-idx">${i+1}</span><span class="mr-nm">${m.nm}</span>
      <div class="mr-info">
        <div style="display:flex;gap:3px;flex-wrap:wrap"><span class="gb ${gradeCls(calcGrade(averOf(m)))}">${calcGrade(averOf(m))}조</span>${roleH}<span style="font-size:9px;color:var(--txt2)">${m.team?m.team+'팀':'팀없음'} | Aver ${averOf(m)}</span>${hcp>0?`<span style="font-size:8px;color:var(--pur)">H+${hcp}</span>`:''}</div>
        ${sc.length?`<div class="mr-chips">${sc.map((s,i)=>`<span class="gchip ${s>=200?'hi':''}">${s}${hcp>0?`<span style="color:var(--pur);font-size:7px">→${s+hcp}</span>`:''}</span>`).join('')}</div>`:'<div style="font-size:9px;color:var(--txt2)">결석</div>'}
      </div>
      <div class="mr-score">${sc.length?`<div class="mr-avg">${av}</div><div class="mr-total">${t}점${hcp>0?`<div style="color:var(--pur);font-size:9px">핸디:${tH}</div>`:''}</div>`:'<div style="color:var(--txt2);font-size:11px">결석</div>'}</div>
    </div>`;
  });
  html+=`</div>`;

  // 테이블
  html+=`<div class="sl">상세 테이블</div><div class="hist-wrap"><table class="htbl">
    <thead><tr><th class="hnm">이름</th><th>팀</th><th>Aver</th>`;
  for(let i=0;i<DB.settings.gameCount;i++) html+=`<th>${i+1}G</th>`;
  html+=`<th style="color:var(--ora)">합</th><th style="color:var(--blu)">평균</th><th style="color:var(--grn)">차</th></tr></thead><tbody>`;
  DB.members.forEach(m=>{
    if(isGuest(m)) return;   // 동수=상세 테이블 제외
    const sc=DB.scores[m.nm]||[];
    const v=sc.filter(x=>x!==null&&x!==undefined);
    if(!v.length) return;
    const t=v.reduce((a,b)=>a+b,0),av=Math.round(t/v.length),mav=averOf(m),diff=av-mav;
    const tc=teamColor(m.team);
    html+=`<tr><td class="hnm">${m.nm}</td><td><span style="color:${tc};font-size:9px">${m.team||'-'}</span></td><td>${mav}</td>`;
    for(let i=0;i<DB.settings.gameCount;i++){
      const s=sc[i]; if(s===null||s===undefined) html+=`<td style="color:var(--txt2)">-</td>`;
      else html+=`<td class="${s>=200?'hhi':''}">${s}</td>`;
    }
    html+=`<td class="hora">${t}</td><td>${av}</td><td style="color:${diff>=0?'var(--grn)':'var(--red)'}">${diff>=0?'+':''}${diff}</td></tr>`;
  });
  html+=`</tbody></table></div>`;
  return html;
}

function histPersonal(){
  if(!DB.scoreHistory||!DB.scoreHistory.length)
    return `<div class="note y">저장된 이력 없음<br>점수입력 → "이번 모임 이력에 저장"을 눌러 기록하세요.</div>`;

  let html=`<div style="margin-bottom:8px">
    <label style="font-size:10px;color:var(--txt2);display:block;margin-bottom:4px">회원 선택</label>
    <select class="fs" onchange="histNm=this.value;renderHist()">
      <option value="">-- 회원 선택 --</option>
      ${DB.members.map(m=>`<option value="${m.nm}" ${histNm===m.nm?'selected':''}>${m.nm}</option>`).join('')}
    </select>
  </div>`;
  if(!histNm) return html+`<div class="note b">회원을 선택하면 개인 이력이 표시됩니다.</div>`;

  const m=DB.members.find(x=>x.nm===histNm);
  if(!m) return html;

  const recs=[];
  DB.scoreHistory.forEach(h=>{
    const sc=(h.scores[histNm]||[]).filter(x=>x!==null&&x!==undefined);
    if(!sc.length) return;
    const hcp=(h.handicaps&&h.handicaps[histNm])||0;
    const total=sc.reduce((a,b)=>a+b,0),avg=Math.round(total/sc.length);
    recs.push({date:h.date,meetType:h.meetType,sc,hcp,total,avg});
  });
  if(!recs.length) return html+`<div class="note r">${histNm}님의 저장된 이력이 없습니다.</div>`;

  const allSc=recs.flatMap(r=>r.sc);
  const tG=allSc.length,oAvg=Math.round(allSc.reduce((a,b)=>a+b,0)/tG);
  const best=Math.max(...allSc),worst=Math.min(...allSc);

  html+=`<div class="card" style="margin-bottom:10px">
    <div class="card-t">${histNm} — 누적 통계</div>
    <div class="g4">
      <div class="sbox"><div class="sv b">${tG}</div><div class="slb">총 게임</div></div>
      <div class="sbox"><div class="sv y">${oAvg}</div><div class="slb">전체 평균</div></div>
      <div class="sbox"><div class="sv g">${best}</div><div class="slb">최고점</div></div>
      <div class="sbox"><div class="sv r">${worst}</div><div class="slb">최저점</div></div>
    </div>
    <div style="font-size:10px;color:var(--txt2);margin-top:5px">공식 Aver <b style="color:var(--blu)">${m.aver}</b> | ${m.group}조 | ${recs.length}회 참석</div>
  </div>
  <div class="sl">날짜별 기록</div>`;

  recs.forEach(r=>{
    const diff=r.avg-m.aver;
    const mtColor=r.meetType==='regular'?'var(--grn)':r.meetType==='flash'?'var(--ora)':'var(--pur)';
    const mtLabel=r.meetType==='regular'?'정기':'번개';
    html+=`<div class="card" style="margin-bottom:7px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span style="font-size:12px;font-weight:700;color:#fff">📅 ${r.date}</span>
        <span style="font-size:10px;color:${mtColor}">${mtLabel}모임</span>
      </div>
      <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:5px">
        ${r.sc.map(s=>r.hcp>0?`<span class="gchip ${s>=200?'hi':''}">${s}<span style="color:var(--pur);font-size:7px">+${r.hcp}→${s+r.hcp}</span></span>`:`<span class="gchip ${s>=200?'hi':''}">${s}</span>`).join('')}
      </div>
      <div style="font-size:10px;color:var(--txt2);display:flex;gap:10px;flex-wrap:wrap">
        <span>합계 <b style="color:var(--ora)">${r.total}</b></span>
        <span>평균 <b style="color:#fff">${r.avg}</b></span>
        <span style="color:${diff>=0?'var(--grn)':'var(--red)'}">Aver차 ${diff>=0?'+':''}${diff}</span>
        ${r.hcp>0?`<span style="color:var(--pur)">핸디합 ${r.sc.map(s=>s+r.hcp).reduce((a,b)=>a+b,0)}</span>`:''}
      </div>
    </div>`;
  });
  return html;
}

function histAll(){
  if(!DB.scoreHistory||!DB.scoreHistory.length) return `<div class="note y">저장된 이력 없음</div>`;
  let html=`<div class="note b">${DB.scoreHistory.length}회 모임 기록 &nbsp;|&nbsp; 📂 불러오기로 현재 모임에 적용</div>`;
  DB.scoreHistory.forEach((h,hi)=>{
    const pts=Object.entries(h.scores).filter(([,sc])=>(sc||[]).some(x=>x!==null));
    const all=pts.flatMap(([,sc])=>sc.filter(x=>x!==null&&x!==undefined));
    const avg=all.length?Math.round(all.reduce((a,b)=>a+b,0)/all.length):0;
    const high=all.length?Math.max(...all):0;
    const mtColor=h.meetType==='regular'?'var(--grn)':h.meetType==='flash'?'var(--ora)':'var(--pur)';
    const isCurrent=h.date===DB.meetDate;
    html+=`<div class="card" style="margin-bottom:7px;${isCurrent?'border-color:var(--blu)':''}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:13px;font-weight:700;color:#fff">📅 ${h.date}</span>
          ${isCurrent?`<span style="font-size:9px;background:#0d1e33;color:var(--blu);border-radius:4px;padding:1px 6px">현재</span>`:''}
        </div>
        <div style="display:flex;align-items:center;gap:5px">
          <span style="font-size:10px;color:${mtColor}">${h.meetType==='regular'?'정기':'번개'}모임</span>
          <button onclick="loadFromHistory(${hi})" style="background:var(--s3);border:1px solid var(--bdr);border-radius:5px;color:var(--txt);font-size:9px;padding:3px 8px;cursor:pointer;font-family:inherit">📂 불러오기</button>
          <button onclick="deleteHistory(${hi})" style="background:none;border:none;color:var(--red);font-size:12px;cursor:pointer;padding:2px 4px" title="이력 삭제">✕</button>
        </div>
      </div>
      <div style="font-size:10px;color:var(--txt2);display:flex;gap:10px">
        <span>참석 ${pts.length}명</span><span>전체평균 <b style="color:var(--blu)">${avg}</b></span><span>최고 <b style="color:var(--ora)">${high}</b></span>
      </div>
      <div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px">
        ${pts.map(([nm,sc])=>{
          const v=sc.filter(x=>x!==null&&x!==undefined);
          const av=v.length?Math.round(v.reduce((a,b)=>a+b,0)/v.length):0;
          return `<span style="font-size:9px;background:var(--s3);border-radius:4px;padding:2px 6px;color:#d0daf0">${nm} ${av}</span>`;
        }).join('')}
      </div>
    </div>`;
  });
  return html;
}

// 이력에서 현재 점수판으로 완전 복원
window.loadFromHistory=function(hi){
  const h=DB.scoreHistory[hi];
  if(!h) return;
  if(!confirm(
    `📂 ${h.date} 모임 전체 정보를 불러옵니다.\n\n` +
    `점수·벌금·시상·장부·회비 모든 정보가 복원됩니다.\n\n` +
    `현재 모임(${DB.meetDate}) 정보는 이력에 자동 저장됩니다.\n\n계속하시겠습니까?`
  )) return;

  // 현재 모임 전체 자동 저장
  _autoSaveCurrentMeet();

  // 완전 복원
  DB.meetDate   = h.date;
  DB.meetType   = h.meetType||'regular';
  if(h.gameCount) DB.settings.gameCount=h.gameCount;

  // 점수·벌금·AllCover
  Object.keys(DB.scores).forEach(nm=>{ DB.scores[nm]=Array(DB.settings.gameCount).fill(null); });
  Object.assign(DB.scores, JSON.parse(JSON.stringify(h.scores)));
  DB.finePaid    = JSON.parse(JSON.stringify(h.finePaid||{}));
  DB.finePaidType= JSON.parse(JSON.stringify(h.finePaidType||{}));
  DB.allCovers   = [...(h.allCovers||[])];

  // 장부 (저장돼 있을 때만 복원)
  if(h.finance) DB.finance=JSON.parse(JSON.stringify(h.finance));

  // 회비 납부 (저장돼 있을 때만 복원)
  if(h.dues) DB.dues=JSON.parse(JSON.stringify(h.dues));

  // 이 과거 모임의 Aver를 고정 — 이후 회원 Aver를 바꿔도 이 모임 결과는 변하지 않음
  _setMeetAverFromSnap(h);

  DB.scoreHistory.sort((a,b)=>b.date.localeCompare(a.date));
  saveDB(); updateHeader();
  go('dash');
  T(`✅ ${h.date} 전체 정보 복원 완료`);
};

// 현재 모임 전체 자동 저장 (내부용)
function _autoSaveCurrentMeet(){
  if(!DB.scoreHistory) DB.scoreHistory=[];
  const hasData = DB.members.some(m=>(DB.scores[m.nm]||[]).some(x=>x!==null&&x!==undefined));
  if(!hasData) return;
  const ei=DB.scoreHistory.findIndex(x=>x.date===DB.meetDate);
  const entry={
    date:DB.meetDate, meetType:DB.meetType,
    gameCount:DB.settings.gameCount,
    scores:JSON.parse(JSON.stringify(DB.scores)),
    handicaps:{},
    finePaid:JSON.parse(JSON.stringify(DB.finePaid)),
    finePaidType:JSON.parse(JSON.stringify(DB.finePaidType||{})),
    allCovers:[...(DB.allCovers||[])],
    finance:JSON.parse(JSON.stringify(DB.finance)),
    dues:JSON.parse(JSON.stringify(DB.dues)),
    memberSnap:DB.members.map(m=>({nm:m.nm,aver:averOf(m),handicap:getHcp(m.nm),team:m.team,group:calcGrade(averOf(m)),role:m.role}))
  };
  DB.members.forEach(m=>{entry.handicaps[m.nm]=getHcp(m.nm);});
  if(ei>=0) DB.scoreHistory[ei]=entry; else DB.scoreHistory.push(entry);
  DB.scoreHistory.sort((a,b)=>b.date.localeCompare(a.date));
}

// 이력 삭제
window.deleteHistory=function(hi){
  const h=DB.scoreHistory[hi];
  if(!h) return;
  if(!confirm(`${h.date} 이력을 삭제하시겠습니까?\n삭제 후 복원할 수 없습니다.`)) return;
  DB.scoreHistory.splice(hi,1);
  saveDB(); renderHist(); T(`✅ ${h.date} 이력 삭제`);
};

// =================================================================
// ⑥ 장부
// =================================================================
let cashTab='cash';
let finTab='current';

function ensureQuarters(){
  if(!DB.finance.quarters) DB.finance.quarters={};
  [1,2,3,4].forEach(q=>{
    if(!DB.finance.quarters[q]) DB.finance.quarters[q]={
      months:{
        1:{income:[],expense:[],prevCash:0,prevBank:0},
        2:{income:[],expense:[],prevCash:0,prevBank:0},
        3:{income:[],expense:[],prevCash:0,prevBank:0}
      }
    };
  });
}

const Q_MONTHS={1:[1,2,3],2:[4,5,6],3:[7,8,9],4:[10,11,12]};
const Q_LABEL={1:'1분기 (1~3월)',2:'2분기 (4~6월)',3:'3분기 (7~9월)',4:'4분기 (10~12월)'};

function renderFinance(){
  ensureQuarters();
  const f=DB.finance;
  f.income  = f.income.filter(x=>!x._auto);
  f.expense = f.expense.filter(x=>!x._auto);

  const iC=f.income.filter(x=>x.type==='cash').reduce((a,b)=>a+b.amt,0);
  const iB=f.income.filter(x=>x.type==='bank').reduce((a,b)=>a+b.amt,0);
  const eC=f.expense.filter(x=>x.type==='cash').reduce((a,b)=>a+b.amt,0);
  const eB=f.expense.filter(x=>x.type==='bank').reduce((a,b)=>a+b.amt,0);
  const cC=f.prevCash+iC-eC, cB=f.prevBank+iB-eB;
  const total=cC+cB;
  const filter=x=>cashTab==='all'||(cashTab==='cash'?x.type==='cash':x.type==='bank');

  function itemRow(it,i,kind){
    const icon=it.type==='cash'?'💵':'🏦';
    return `<div class="fr">
      <span class="fr-l">${icon} ${it.desc}</span>
      <span class="fr-v ${kind==='income'?'inc':'exp'}">₩${fmt(it.amt)}</span>
      <span class="fr-del" onclick="rmFin('${kind}',${i})">✕</span>
    </div>`;
  }

  let html=`<div style="display:flex;gap:4px;margin-bottom:10px;overflow-x:auto;scrollbar-width:none;padding-bottom:2px">
    ${['current','q1','q2','q3','q4'].map(t=>{
      const lbl=t==='current'?'📋 이번 모임':t==='q1'?'1분기':t==='q2'?'2분기':t==='q3'?'3분기':'4분기';
      return `<button class="cb-btn ${finTab===t?'on':''}" style="white-space:nowrap;flex-shrink:0" onclick="finTab='${t}';renderFinance()">${lbl}</button>`;
    }).join('')}
  </div>`;

  if(finTab==='current'){
    html+=`
    <!-- 현금/통장 요약 카드 (이전잔고 + 수입 - 지출 = 현재잔고) -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:10px">
      <div class="card" style="margin-bottom:0;padding:10px">
        <div style="font-size:10px;font-weight:700;color:var(--grn);margin-bottom:7px">💵 현금</div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px">
          <span style="color:var(--txt2)">이전 잔고</span>
          <span style="font-weight:700;color:var(--txt)">₩${fmt(f.prevCash)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:2px">
          <span style="color:var(--txt2)">+ 수입</span>
          <span style="color:var(--grn);font-weight:700">+₩${fmt(iC)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:5px">
          <span style="color:var(--txt2)">- 지출</span>
          <span style="color:var(--red);font-weight:700">-₩${fmt(eC)}</span>
        </div>
        <div style="height:1px;background:var(--bdr);margin-bottom:5px"></div>
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:900">
          <span style="color:var(--txt2)">현재 잔고</span>
          <span style="color:var(--blu)">₩${fmt(cC)}</span>
        </div>
        <div style="font-size:9px;text-align:right;margin-top:2px;color:${iC-eC>=0?'var(--grn)':'var(--red)'}">
          ${iC-eC>=0?'▲ +':'▼ '}₩${fmt(Math.abs(iC-eC))} 증감
        </div>
      </div>
      <div class="card" style="margin-bottom:0;padding:10px">
        <div style="font-size:10px;font-weight:700;color:var(--blu);margin-bottom:7px">🏦 통장</div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px">
          <span style="color:var(--txt2)">이전 잔고</span>
          <span style="font-weight:700;color:var(--txt)">₩${fmt(f.prevBank)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:2px">
          <span style="color:var(--txt2)">+ 수입</span>
          <span style="color:var(--grn);font-weight:700">+₩${fmt(iB)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:5px">
          <span style="color:var(--txt2)">- 지출</span>
          <span style="color:var(--red);font-weight:700">-₩${fmt(eB)}</span>
        </div>
        <div style="height:1px;background:var(--bdr);margin-bottom:5px"></div>
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:900">
          <span style="color:var(--txt2)">현재 잔고</span>
          <span style="color:var(--blu)">₩${fmt(cB)}</span>
        </div>
        <div style="font-size:9px;text-align:right;margin-top:2px;color:${iB-eB>=0?'var(--grn)':'var(--red)'}">
          ${iB-eB>=0?'▲ +':'▼ '}₩${fmt(Math.abs(iB-eB))} 증감
        </div>
      </div>
    </div>
    <div class="card" style="margin-bottom:10px;padding:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <span style="font-size:12px;font-weight:700;color:var(--txt2)">💰 총 잔고</span>
        <span style="font-size:20px;font-weight:900;color:var(--blu)">₩${fmt(total)}</span>
      </div>
      <div style="font-size:9px;color:var(--txt2);text-align:right">이전 ₩${fmt(f.prevCash+f.prevBank)} → 증감 <span style="color:${iC+iB-eC-eB>=0?'var(--grn)':'var(--red)'};font-weight:700">${iC+iB-eC-eB>=0?'+':''}₩${fmt(iC+iB-eC-eB)}</span></div>
    </div>
    <div class="cb-sel" style="margin-bottom:10px;gap:5px">
      <button class="cb-btn ${cashTab==='cash'?'on':'off'}" onclick="cashTab='cash';renderFinance()">💵 현금</button>
      <button class="cb-btn ${cashTab==='bank'?'on':'off'}" onclick="cashTab='bank';renderFinance()">🏦 통장</button>
      <button class="cb-btn ${cashTab==='all'?'on':'off'}" onclick="cashTab='all';renderFinance()">📊 전체</button>
    </div>
    <div class="sl">수입</div><div class="card">`;

    const vi=f.income.filter(filter);
    if(!vi.length) html+=`<div style="text-align:center;color:var(--txt2);font-size:11px;padding:8px">수입 내역 없음</div>`;
    else vi.forEach(it=>{ const i=f.income.indexOf(it); html+=itemRow(it,i,'income'); });
    // 총 수입 — 현금/통장 구분
    const totIncC=f.income.filter(x=>x.type==='cash').reduce((a,b)=>a+b.amt,0);
    const totIncB=f.income.filter(x=>x.type==='bank').reduce((a,b)=>a+b.amt,0);
    if(vi.length) html+=`
      <div style="border-top:1px solid var(--bdr);margin-top:6px;padding-top:6px">
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px">
          <span style="color:var(--txt2)">💵 현금 수입</span><span style="color:var(--grn);font-weight:700">₩${fmt(totIncC)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px">
          <span style="color:var(--txt2)">🏦 통장 수입</span><span style="color:var(--grn);font-weight:700">₩${fmt(totIncB)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:900;padding-top:4px;border-top:1px solid var(--bdr)">
          <span style="color:var(--txt2)">총 수입</span><span style="color:var(--grn)">₩${fmt(totIncC+totIncB)}</span>
        </div>
      </div>`;

    html+=`</div><div class="add-row">
      <input class="add-inp nm" id="incD" placeholder="수입 내용...">
      <input class="add-inp amt" id="incA" placeholder="금액" type="number" inputmode="numeric">
      <div class="cb-sel">
        <button class="cb-btn on" id="iTC" onclick="siT('cash')">현금</button>
        <button class="cb-btn off" id="iTB" onclick="siT('bank')">통장</button>
      </div>
      <button class="add-btn inc" onclick="addFin('income')">＋</button>
    </div>
    <div class="sl">지출</div><div class="card">`;

    const ve=f.expense.filter(filter);
    if(!ve.length) html+=`<div style="text-align:center;color:var(--txt2);font-size:11px;padding:8px">지출 내역 없음</div>`;
    else ve.forEach(it=>{ const i=f.expense.indexOf(it); html+=itemRow(it,i,'expense'); });
    // 총 지출 — 현금/통장 구분
    const totExpC=f.expense.filter(x=>x.type==='cash').reduce((a,b)=>a+b.amt,0);
    const totExpB=f.expense.filter(x=>x.type==='bank').reduce((a,b)=>a+b.amt,0);
    if(ve.length) html+=`
      <div style="border-top:1px solid var(--bdr);margin-top:6px;padding-top:6px">
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px">
          <span style="color:var(--txt2)">💵 현금 지출</span><span style="color:var(--red);font-weight:700">₩${fmt(totExpC)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px">
          <span style="color:var(--txt2)">🏦 통장 지출</span><span style="color:var(--red);font-weight:700">₩${fmt(totExpB)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:900;padding-top:4px;border-top:1px solid var(--bdr)">
          <span style="color:var(--txt2)">총 지출</span><span style="color:var(--red)">₩${fmt(totExpC+totExpB)}</span>
        </div>
      </div>`;

    html+=`</div><div class="add-row">
      <input class="add-inp nm" id="expD" placeholder="지출 내용...">
      <input class="add-inp amt" id="expA" placeholder="금액" type="number" inputmode="numeric">
      <div class="cb-sel">
        <button class="cb-btn on" id="eTC" onclick="seT('cash')">현금</button>
        <button class="cb-btn off" id="eTB" onclick="seT('bank')">통장</button>
      </div>
      <button class="add-btn exp" onclick="addFin('expense')">＋</button>
    </div>
    <div class="sl">이전 잔고 <span style="font-size:9px;font-weight:400;letter-spacing:0;color:var(--pur)">🔒 관리자 수정</span></div>
    <div class="card">
      <div class="fr"><span class="fr-l" style="color:#fff;font-weight:700">💵 현금</span><span class="fr-v" style="color:var(--blu)">₩${fmt(f.prevCash)}</span><span style="font-size:10px;color:var(--pur);cursor:pointer;padding:2px 6px;background:var(--s3);border-radius:4px" onclick="checkAdmin(()=>editPrev('cash'))">✏️ 수정</span></div>
      <div class="fr"><span class="fr-l" style="color:#fff;font-weight:700">🏦 통장</span><span class="fr-v" style="color:var(--blu)">₩${fmt(f.prevBank)}</span><span style="font-size:10px;color:var(--pur);cursor:pointer;padding:2px 6px;background:var(--s3);border-radius:4px" onclick="checkAdmin(()=>editPrev('bank'))">✏️ 수정</span></div>
    </div>
    <div class="sl">현재 잔고 <span style="font-size:9px;font-weight:400;letter-spacing:0;color:var(--txt2)">자동 계산</span></div>
    <div class="card">
      <div class="fr"><span class="fr-l" style="color:#fff;font-weight:700">💵 현금</span><span class="fr-v bal">₩${fmt(cC)}</span></div>
      <div class="fr"><span class="fr-l" style="color:#fff;font-weight:700">🏦 통장</span><span class="fr-v bal">₩${fmt(cB)}</span></div>
      <div style="height:1px;background:var(--bdr);margin:8px 0"></div>
      <div style="display:flex;justify-content:space-between;padding-top:2px"><span style="font-size:14px;font-weight:700;color:#fff">합계</span><span style="font-size:20px;font-weight:900;color:var(--blu)">₩${fmt(total)}</span></div>
    </div>`;
  } else {
    const q=parseInt(finTab.replace('q',''));
    html+=renderQuarterTab(q);
  }
  document.getElementById('pg-fin').innerHTML=html;
}

// ── 이번 모임 장부 CRUD ──────────────────────────
let _iT='cash', _eT='cash';
window.siT=function(t){
  _iT=t;
  const c=document.getElementById('iTC'), b=document.getElementById('iTB');
  if(c) c.className=`cb-btn ${t==='cash'?'on':'off'}`;
  if(b) b.className=`cb-btn ${t==='bank'?'on':'off'}`;
};
window.seT=function(t){
  _eT=t;
  const c=document.getElementById('eTC'), b=document.getElementById('eTB');
  if(c) c.className=`cb-btn ${t==='cash'?'on':'off'}`;
  if(b) b.className=`cb-btn ${t==='bank'?'on':'off'}`;
};
window.addFin=function(k){
  const dEl=document.getElementById(k==='income'?'incD':'expD');
  const aEl=document.getElementById(k==='income'?'incA':'expA');
  if(!dEl||!aEl){T('⚠️ 입력 오류');return;}
  const d=dEl.value.trim();
  const a=parseInt(aEl.value)||0;
  if(!d||!a){T('⚠️ 내용과 금액을 입력하세요');return;}
  DB.finance[k].push({desc:d, amt:a, type:k==='income'?_iT:_eT});
  saveDB(); renderFinance(); T(`✅ ${k==='income'?'수입':'지출'} 추가`);
};
window.rmFin=function(k,i){
  if(!confirm(`삭제: ${DB.finance[k][i].desc}`)) return;
  DB.finance[k].splice(i,1); saveDB(); renderFinance(); T('✅ 삭제');
};
window.editPrev=function(t){
  const cur=t==='cash'?DB.finance.prevCash:DB.finance.prevBank;
  const v=prompt(`${t==='cash'?'💵 현금':'🏦 통장'} 이전 잔고 수정`,cur);
  if(v===null) return;
  const n=parseInt(String(v).replace(/[^\d]/g,''));
  if(isNaN(n)) return T('⚠️ 숫자만 입력하세요');
  if(t==='cash') DB.finance.prevCash=n; else DB.finance.prevBank=n;
  saveDB(); renderFinance(); T('✅ 이전 잔고 수정 완료');
};

function renderQuarterTab(q){
  ensureQuarters();
  const qd=DB.finance.quarters[q];
  const mNums=Q_MONTHS[q];
  let html=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
    <span style="font-size:13px;font-weight:700;color:var(--ora)">📊 ${Q_LABEL[q]}</span>
  </div>`;

  let qTotInCash=0,qTotInBank=0,qTotExCash=0,qTotExBank=0;
  // 월별 자동 계산 결과 (이전 월 → 다음 월 이전잔고 자동 연결)
  const monthResults=[];

  [0,1,2].forEach(mi=>{
    const mkey=mi+1;
    if(!qd.months[mkey]) qd.months[mkey]={income:[],expense:[],prevCash:0,prevBank:0};
    const md=qd.months[mkey];

    // 이전 월 결과를 이번 월 이전잔고로 자동 적용
    let prevCash=md.prevCash, prevBank=md.prevBank;
    if(mi>0 && monthResults[mi-1]){
      prevCash=monthResults[mi-1].curCash;
      prevBank=monthResults[mi-1].curBank;
    }

    const iC=md.income.filter(x=>x.type==='cash').reduce((a,b)=>a+b.amt,0);
    const iB=md.income.filter(x=>x.type==='bank').reduce((a,b)=>a+b.amt,0);
    const eC=md.expense.filter(x=>x.type==='cash').reduce((a,b)=>a+b.amt,0);
    const eB=md.expense.filter(x=>x.type==='bank').reduce((a,b)=>a+b.amt,0);
    const curCash=prevCash+iC-eC;
    const curBank=prevBank+iB-eB;
    monthResults.push({prevCash,prevBank,iC,iB,eC,eB,curCash,curBank});
    qTotInCash+=iC; qTotInBank+=iB; qTotExCash+=eC; qTotExBank+=eB;

    const mn=mNums[mi];
    const autoNote=mi>0?`<span style="font-size:8px;background:rgba(77,166,255,.15);color:var(--blu);border-radius:3px;padding:1px 4px;margin-left:4px">이전월 자동</span>`:'';

    html+=`<div class="card" style="margin-bottom:8px;border-color:rgba(167,139,250,.25)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <span style="font-size:13px;font-weight:700;color:var(--pur)">${mn}월</span>
        <div style="display:flex;gap:8px;font-size:10px">
          <span style="color:var(--grn)">수입 ₩${fmt(iC+iB)}</span>
          <span style="color:var(--red)">지출 ₩${fmt(eC+eB)}</span>
        </div>
      </div>

      <!-- 수입 -->
      <div style="font-size:10px;font-weight:700;color:var(--grn);margin-bottom:3px">▸ 수입</div>
      ${md.income.length
        ? md.income.map((it,i)=>`<div class="fr" style="padding:3px 0">
            <span class="fr-l" style="font-size:10px">${it.type==='cash'?'💵':'🏦'} ${it.desc}</span>
            <span style="font-size:10px;font-weight:700;color:var(--grn)">₩${fmt(it.amt)}</span>
            <span class="fr-del" onclick="rmQFin(${q},${mkey},'income',${i})">✕</span>
          </div>`).join('')
        : '<div style="font-size:10px;color:var(--txt2);padding:2px 0">내역 없음</div>'}
      ${iC+iB>0?`
      <div style="border-top:1px solid var(--bdr);margin-top:5px;padding-top:5px">
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:2px">
          <span style="color:var(--txt2)">💵 현금</span><span style="color:var(--grn);font-weight:700">₩${fmt(iC)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px">
          <span style="color:var(--txt2)">🏦 통장</span><span style="color:var(--grn);font-weight:700">₩${fmt(iB)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:900">
          <span style="color:var(--txt2)">총 수입</span><span style="color:var(--grn)">₩${fmt(iC+iB)}</span>
        </div>
      </div>`:''}
      <div class="add-row" style="margin:5px 0 8px">
        <input class="add-inp nm" id="qi_d_${q}_${mkey}" placeholder="${mn}월 수입..." style="font-size:11px;padding:5px 8px">
        <input class="add-inp amt" id="qi_a_${q}_${mkey}" placeholder="금액" type="number" inputmode="numeric" style="width:70px;font-size:11px;padding:5px 6px">
        <div class="cb-sel">
          <button class="cb-btn on" id="qi_tc_${q}_${mkey}" onclick="setQIT(${q},${mkey},'cash')" style="padding:4px 7px;font-size:9px">현금</button>
          <button class="cb-btn off" id="qi_tb_${q}_${mkey}" onclick="setQIT(${q},${mkey},'bank')" style="padding:4px 7px;font-size:9px">통장</button>
        </div>
        <button class="add-btn inc" onclick="addQFin(${q},${mkey},'income')" style="padding:5px 9px">＋</button>
      </div>

      <!-- 지출 -->
      <div style="font-size:10px;font-weight:700;color:var(--red);margin-bottom:3px">▸ 지출</div>
      ${md.expense.length
        ? md.expense.map((it,i)=>`<div class="fr" style="padding:3px 0">
            <span class="fr-l" style="font-size:10px">${it.type==='cash'?'💵':'🏦'} ${it.desc}</span>
            <span style="font-size:10px;font-weight:700;color:var(--red)">₩${fmt(it.amt)}</span>
            <span class="fr-del" onclick="rmQFin(${q},${mkey},'expense',${i})">✕</span>
          </div>`).join('')
        : '<div style="font-size:10px;color:var(--txt2);padding:2px 0">내역 없음</div>'}
      ${eC+eB>0?`
      <div style="border-top:1px solid var(--bdr);margin-top:5px;padding-top:5px">
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:2px">
          <span style="color:var(--txt2)">💵 현금</span><span style="color:var(--red);font-weight:700">₩${fmt(eC)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px">
          <span style="color:var(--txt2)">🏦 통장</span><span style="color:var(--red);font-weight:700">₩${fmt(eB)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:900">
          <span style="color:var(--txt2)">총 지출</span><span style="color:var(--red)">₩${fmt(eC+eB)}</span>
        </div>
      </div>`:''}
      <div class="add-row" style="margin:5px 0 8px">
        <input class="add-inp nm" id="qe_d_${q}_${mkey}" placeholder="${mn}월 지출..." style="font-size:11px;padding:5px 8px">
        <input class="add-inp amt" id="qe_a_${q}_${mkey}" placeholder="금액" type="number" inputmode="numeric" style="width:70px;font-size:11px;padding:5px 6px">
        <div class="cb-sel">
          <button class="cb-btn on" id="qe_tc_${q}_${mkey}" onclick="setQET(${q},${mkey},'cash')" style="padding:4px 7px;font-size:9px">현금</button>
          <button class="cb-btn off" id="qe_tb_${q}_${mkey}" onclick="setQET(${q},${mkey},'bank')" style="padding:4px 7px;font-size:9px">통장</button>
        </div>
        <button class="add-btn exp" onclick="addQFin(${q},${mkey},'expense')" style="padding:5px 9px">＋</button>
      </div>

      <!-- 이전잔고 / 현재잔고 -->
      <div style="height:1px;background:var(--bdr);margin:4px 0 7px"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        <div style="background:var(--s3);border-radius:7px;padding:7px">
          <div style="font-size:9px;color:var(--txt2);margin-bottom:4px">
            이전 잔고${autoNote}
            ${mi===0?`<span style="cursor:pointer;color:var(--pur);margin-left:4px" onclick="editQPrev(${q},${mkey})">✏️</span>`:''}
          </div>
          <div style="font-size:10px">💵 ₩${fmt(prevCash)}</div>
          <div style="font-size:10px">🏦 ₩${fmt(prevBank)}</div>
          <div style="font-size:11px;font-weight:700;color:var(--txt2);margin-top:3px">합 ₩${fmt(prevCash+prevBank)}</div>
        </div>
        <div style="background:var(--s3);border-radius:7px;padding:7px">
          <div style="font-size:9px;color:var(--txt2);margin-bottom:4px">현재 잔고 (자동계산)</div>
          <div style="font-size:10px">💵 ₩${fmt(curCash)}</div>
          <div style="font-size:10px">🏦 ₩${fmt(curBank)}</div>
          <div style="font-size:11px;font-weight:700;color:var(--blu);margin-top:3px">합 ₩${fmt(curCash+curBank)}</div>
        </div>
      </div>
    </div>`;
  });

  // 분기 결과 요약
  const qTotIn=qTotInCash+qTotInBank;
  const qTotEx=qTotExCash+qTotExBank;
  const lastResult=monthResults[2]||{curCash:0,curBank:0};
  html+=`<div style="background:linear-gradient(135deg,#1a0d2b,#0d1e33);border:1px solid var(--pur);border-radius:12px;padding:14px;margin-top:4px">
    <div style="font-size:12px;font-weight:700;color:var(--pur);margin-bottom:10px">📈 ${Q_LABEL[q]} 결과</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
      <div style="background:rgba(46,204,113,.1);border:1px solid rgba(46,204,113,.3);border-radius:8px;padding:10px">
        <div style="font-size:9px;color:var(--txt2);margin-bottom:5px;font-weight:700">총 수입</div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:2px"><span style="color:var(--txt2)">💵 현금</span><span style="color:var(--grn);font-weight:700">₩${fmt(qTotInCash)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px"><span style="color:var(--txt2)">🏦 통장</span><span style="color:var(--grn);font-weight:700">₩${fmt(qTotInBank)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:900;border-top:1px solid rgba(46,204,113,.3);padding-top:5px"><span style="color:var(--txt2)">합계</span><span style="color:var(--grn)">₩${fmt(qTotIn)}</span></div>
      </div>
      <div style="background:rgba(232,73,73,.1);border:1px solid rgba(232,73,73,.3);border-radius:8px;padding:10px">
        <div style="font-size:9px;color:var(--txt2);margin-bottom:5px;font-weight:700">총 지출</div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:2px"><span style="color:var(--txt2)">💵 현금</span><span style="color:var(--red);font-weight:700">₩${fmt(qTotExCash)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px"><span style="color:var(--txt2)">🏦 통장</span><span style="color:var(--red);font-weight:700">₩${fmt(qTotExBank)}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:900;border-top:1px solid rgba(232,73,73,.3);padding-top:5px"><span style="color:var(--txt2)">합계</span><span style="color:var(--red)">₩${fmt(qTotEx)}</span></div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      <div style="background:rgba(77,166,255,.1);border:1px solid rgba(77,166,255,.3);border-radius:8px;padding:10px;text-align:center">
        <div style="font-size:9px;color:var(--txt2);margin-bottom:4px">분기 수지</div>
        <div style="font-size:16px;font-weight:900;color:${qTotIn-qTotEx>=0?'var(--grn)':'var(--red)'}">${qTotIn-qTotEx>=0?'+':''}₩${fmt(qTotIn-qTotEx)}</div>
      </div>
      <div style="background:rgba(77,166,255,.1);border:1px solid rgba(77,166,255,.3);border-radius:8px;padding:10px">
        <div style="font-size:9px;color:var(--txt2);margin-bottom:5px">분기말 잔고</div>
        <div style="font-size:10px">💵 ₩${fmt(lastResult.curCash)}</div>
        <div style="font-size:10px">🏦 ₩${fmt(lastResult.curBank)}</div>
        <div style="font-size:12px;font-weight:900;color:var(--blu);margin-top:3px">합 ₩${fmt(lastResult.curCash+lastResult.curBank)}</div>
      </div>
    </div>
  </div>`;
  return html;
}

const _qIT={},_qET={};
window.setQIT=function(q,m,t){_qIT[`${q}_${m}`]=t;document.getElementById(`qi_tc_${q}_${m}`).className=`cb-btn ${t==='cash'?'on':'off'}`;document.getElementById(`qi_tb_${q}_${m}`).className=`cb-btn ${t==='bank'?'on':'off'}`;};
window.setQET=function(q,m,t){_qET[`${q}_${m}`]=t;document.getElementById(`qe_tc_${q}_${m}`).className=`cb-btn ${t==='cash'?'on':'off'}`;document.getElementById(`qe_tb_${q}_${m}`).className=`cb-btn ${t==='bank'?'on':'off'}`;};
window.addQFin=function(q,mkey,kind){
  ensureQuarters();
  const isInc=kind==='income';
  const d=document.getElementById(`${isInc?'qi':'qe'}_d_${q}_${mkey}`).value.trim();
  const a=parseInt(document.getElementById(`${isInc?'qi':'qe'}_a_${q}_${mkey}`).value)||0;
  if(!d||!a){T('⚠️ 내용과 금액 입력');return;}
  const t=isInc?(_qIT[`${q}_${mkey}`]||'cash'):(_qET[`${q}_${mkey}`]||'cash');
  DB.finance.quarters[q].months[mkey][kind].push({desc:d,amt:a,type:t});
  saveDB();renderFinance();T(`✅ ${isInc?'수입':'지출'} 추가`);
};
window.rmQFin=function(q,mkey,kind,i){
  if(!confirm('삭제하시겠습니까?')) return;
  DB.finance.quarters[q].months[mkey][kind].splice(i,1);
  saveDB();renderFinance();T('✅ 삭제');
};
window.editQPrev=function(q,mkey){
  const md=DB.finance.quarters[q].months[mkey];
  const cash=prompt(`${Q_MONTHS[q][mkey-1]}월 이전잔고 — 현금`,md.prevCash||0);
  if(cash===null) return;
  const bank=prompt(`${Q_MONTHS[q][mkey-1]}월 이전잔고 — 통장`,md.prevBank||0);
  if(bank===null) return;
  md.prevCash=parseInt(String(cash).replace(/[^\d]/g,''))||0;
  md.prevBank=parseInt(String(bank).replace(/[^\d]/g,''))||0;
  saveDB();renderFinance();T('✅ 이전 잔고 수정');
};

window.printQuarter=function(q){
  ensureQuarters();
  const qd=DB.finance.quarters[q];
  const mNums=Q_MONTHS[q];
  let qTotInCash=0,qTotInBank=0,qTotExCash=0,qTotExBank=0;
  let body=`<div style="font-family:sans-serif;padding:16px;max-width:700px;margin:0 auto">
  <h2 style="text-align:center;border-bottom:2px solid #000;padding-bottom:8px;margin-bottom:14px">🎳 한울타리 볼링클럽 장부 — ${Q_LABEL[q]}</h2>`;
  [0,1,2].forEach(mi=>{
    const mn=mNums[mi], mkey=mi+1;
    const md=qd.months[mkey]||{income:[],expense:[],prevCash:0,prevBank:0};
    const iC=md.income.filter(x=>x.type==='cash').reduce((a,b)=>a+b.amt,0);
    const iB=md.income.filter(x=>x.type==='bank').reduce((a,b)=>a+b.amt,0);
    const eC=md.expense.filter(x=>x.type==='cash').reduce((a,b)=>a+b.amt,0);
    const eB=md.expense.filter(x=>x.type==='bank').reduce((a,b)=>a+b.amt,0);
    const curCash=md.prevCash+iC-eC, curBank=md.prevBank+iB-eB;
    qTotInCash+=iC; qTotInBank+=iB; qTotExCash+=eC; qTotExBank+=eB;
    body+=`<div style="border:1px solid #ccc;border-radius:8px;padding:12px;margin-bottom:10px">
      <h3 style="margin:0 0 8px;font-size:14px;border-bottom:1px solid #eee;padding-bottom:5px">${mn}월</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:8px">
        <div><b style="color:#060;font-size:11px">▸ 수입</b><br>
          ${md.income.map(it=>`<div style="display:flex;justify-content:space-between;font-size:11px;padding:2px 0">${it.type==='cash'?'💵':'🏦'} ${it.desc} <b style="color:#060">₩${fmt(it.amt)}</b></div>`).join('')||'<span style="color:#999;font-size:11px">없음</span>'}
          <div style="border-top:1px solid #ddd;margin-top:4px;padding-top:3px;font-size:11px"><b>소계: ₩${fmt(iC+iB)}</b></div>
        </div>
        <div><b style="color:#c00;font-size:11px">▸ 지출</b><br>
          ${md.expense.map(it=>`<div style="display:flex;justify-content:space-between;font-size:11px;padding:2px 0">${it.type==='cash'?'💵':'🏦'} ${it.desc} <b style="color:#c00">₩${fmt(it.amt)}</b></div>`).join('')||'<span style="color:#999;font-size:11px">없음</span>'}
          <div style="border-top:1px solid #ddd;margin-top:4px;padding-top:3px;font-size:11px"><b>소계: ₩${fmt(eC+eB)}</b></div>
        </div>
      </div>
      <div style="background:#f5f5f5;border-radius:6px;padding:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11px">
        <div><b>이전 잔고</b><br>💵 ₩${fmt(md.prevCash)}<br>🏦 ₩${fmt(md.prevBank)}<br><b>합 ₩${fmt(md.prevCash+md.prevBank)}</b></div>
        <div><b>현재 잔고</b><br>💵 ₩${fmt(curCash)}<br>🏦 ₩${fmt(curBank)}<br><b style="color:#00c">합 ₩${fmt(curCash+curBank)}</b></div>
      </div>
    </div>`;
  });
  const qTotIn=qTotInCash+qTotInBank, qTotEx=qTotExCash+qTotExBank;
  body+=`<div style="border:2px solid #609;border-radius:10px;padding:14px;background:#f8f5ff">
    <h3 style="color:#609;margin:0 0 10px">📈 ${Q_LABEL[q]} 결과</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center">
      <div style="background:#fff;border-radius:6px;padding:10px;border:1px solid #ddd"><div style="font-size:10px;color:#666">총 수입</div><div style="font-size:16px;font-weight:700;color:#060">₩${fmt(qTotIn)}</div><div style="font-size:9px;color:#999">💵${fmt(qTotInCash)} / 🏦${fmt(qTotInBank)}</div></div>
      <div style="background:#fff;border-radius:6px;padding:10px;border:1px solid #ddd"><div style="font-size:10px;color:#666">총 지출</div><div style="font-size:16px;font-weight:700;color:#c00">₩${fmt(qTotEx)}</div><div style="font-size:9px;color:#999">💵${fmt(qTotExCash)} / 🏦${fmt(qTotExBank)}</div></div>
      <div style="background:#fff;border-radius:6px;padding:10px;border:1px solid #ddd"><div style="font-size:10px;color:#666">수지</div><div style="font-size:16px;font-weight:700;color:${qTotIn-qTotEx>=0?'#060':'#c00'}">${qTotIn-qTotEx>=0?'+':''}₩${fmt(qTotIn-qTotEx)}</div></div>
    </div>
  </div></div>`;
  const w=window.open('','_blank','width=800,height=900');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>장부 ${Q_LABEL[q]}</title>
  <style>@media print{body{margin:0}}</style></head><body>${body}
  <div style="text-align:center;margin:20px"><button onclick="window.print()" style="padding:10px 30px;font-size:14px;cursor:pointer">🖨️ 인쇄</button></div>
  </body></html>`);
  w.document.close();
};


// =================================================================
// ⑦ 더보기 + 회비
// =================================================================
function renderMore(){
  let html=`<div class="menu-grid">
    <div class="menu-box" onclick="go('member')"><div class="menu-ic">👥</div><div class="menu-nm">회원 관리</div><div class="menu-sub">조회 자유 | 수정 🔒</div></div>
    <div class="menu-box" onclick="go('const')"><div class="menu-ic">📋</div><div class="menu-nm">회 칙</div><div class="menu-sub">제1조~제10조</div></div>
    <div class="menu-box" onclick="showDataMenu()"><div class="menu-ic">📥</div><div class="menu-nm">가져오기</div><div class="menu-sub">백업 파일 불러오기</div></div>
    <div class="menu-box" onclick="exportData()"><div class="menu-ic">📤</div><div class="menu-nm">내보내기</div><div class="menu-sub">전체 데이터 저장</div></div>
    <div class="menu-box" onclick="showFirebaseGuide()"><div class="menu-ic">☁️</div><div class="menu-nm">실시간 동기화</div><div class="menu-sub">${window._fbConfigured?'🟢 연결됨':'🔴 설정 필요'}</div></div>
    <div class="menu-box" onclick="checkAdmin(()=>go('setting'))"><div class="menu-ic">⚙️</div><div class="menu-nm">설 정</div><div class="menu-sub">🔒 관리자 전용</div></div>
  </div>
  <div class="sl">2026년 회비 납부</div>
  <div class="note b">터치로 현금/통장 납부 전환 | 현(현금) 통(통장) —(미납)</div>
  <div class="due-legend">
    <span class="dc c on">현</span> 현금 &nbsp;&nbsp;
    <span class="dc k on">통</span> 통장 &nbsp;&nbsp;
    <span class="dc off">—</span> 미납
  </div>
  <div class="due-wrap"><table class="dtbl">
    <thead><tr><th class="dnm" rowspan="2">이름</th><th rowspan="2">조</th><th rowspan="2" style="font-size:8px">회비</th>`;
  for(let m=1;m<=12;m++) html+=`<th colspan="2">${m}월</th>`;
  html+=`</tr><tr>`;
  for(let m=1;m<=12;m++) html+=`<th style="color:var(--grn);font-size:8px">현</th><th style="color:var(--blu);font-size:8px">통</th>`;
  html+=`</tr></thead><tbody>`;

  DB.members.forEach(mbr=>{
    html+=`<tr><td class="dnm">${mbr.nm}</td>
      <td><span class="gb ${gradeCls(mbr.group)}" style="font-size:8px">${mbr.group}조</span></td>
      <td style="color:var(--txt2);font-size:9px">${mbr.fee/10000}만</td>`;
    for(let m=1;m<=12;m++){
      const d=(DB.dues[mbr.nm]||{})[m]||{c:false,k:false};
      html+=`<td><span class="dc c ${d.c?'on':'off'}" onclick="tDue('${mbr.nm}',${m},'c')">${d.c?'현':'—'}</span></td>`;
      html+=`<td><span class="dc k ${d.k?'on':'off'}" onclick="tDue('${mbr.nm}',${m},'k')">${d.k?'통':'—'}</span></td>`;
    }
    html+=`</tr>`;
  });
  html+=`</tbody></table></div>`;
  document.getElementById('pg-more').innerHTML=html;
}
window.tDue=function(nm,m,t){
  if(!DB.dues[nm])DB.dues[nm]={};
  if(!DB.dues[nm][m])DB.dues[nm][m]={c:false,k:false};
  DB.dues[nm][m][t]=!DB.dues[nm][m][t];
  saveDB();
  const el=event.target,on=DB.dues[nm][m][t];
  el.classList.toggle('on',on);el.classList.toggle('off',!on);
  el.textContent=on?(t==='c'?'현':'통'):'—';
  T(on?`✅ ${nm} ${m}월 ${t==='c'?'현금':'통장'}`:`❌ ${nm} ${m}월 미납`);
};
window.exportData=function(){
  try{
    // 내보내기 대상: 점수입력·장부·회원관리·설정·회비납부 + 이력 전체
    const exportObj={
      _version: '2.0',
      _exportedAt: new Date().toISOString(),
      _description: '한울타리 볼링클럽 전체 백업',
      // 1. 점수 입력
      meetDate: DB.meetDate,
      meetType: DB.meetType,
      scores: DB.scores,
      finePaid: DB.finePaid,
      finePaidType: DB.finePaidType,
      allCovers: DB.allCovers,
      scoreHistory: DB.scoreHistory,
      // 2. 장부
      finance: DB.finance,
      // 3. 회원관리
      members: DB.members,
      memberPw: DB.memberPw,
      // 4. 설정
      settings: DB.settings,
      constitution: DB.constitution,
      // 5. 회비 납부
      dues: DB.dues,
    };
    const blob=new Blob([JSON.stringify(exportObj,null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=`한울타리_전체백업_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    T('💾 전체 데이터 내보내기 완료');
  }catch(e){T('⚠️ 내보내기 실패: '+e.message);}
};

window.showFirebaseGuide=function(){
  const status=window._fbConfigured
    ?'<div class="note g">🟢 Firebase 연결됨 — 실시간 동기화 활성화 상태입니다.</div>'
    :'<div class="note r">🔴 Firebase 미설정 — 현재 로컬 저장 모드입니다. 아래 안내대로 설정하세요.</div>';

  document.getElementById('pg-more').innerHTML=`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <button class="btn s" onclick="renderMore()" style="width:auto;padding:7px 14px;font-size:12px">← 돌아가기</button>
      <span style="font-size:14px;font-weight:700">☁️ 실시간 동기화 설정</span>
    </div>
    ${status}
    <div class="note b">모든 회원 폰·PC에서 실시간으로 데이터를 공유하려면<br>Google Firebase 무료 계정이 필요합니다 (무료 한도 충분).</div>

    <div class="sl">설정 방법 (5단계)</div>
    <div class="card">
      <div style="font-size:12px;line-height:2;color:var(--txt)">
        <div>① <b style="color:var(--ora)">firebase.google.com</b> 접속 → Google 계정 로그인</div>
        <div>② <b>콘솔로 이동</b> → <b>프로젝트 만들기</b> → 이름: hanultari</div>
        <div>③ 왼쪽 메뉴 <b>빌드 → Realtime Database</b> → 데이터베이스 만들기<br>
             &nbsp;&nbsp;&nbsp;&nbsp;→ 위치: <b>asia-southeast1 (싱가포르)</b> → <b>테스트 모드</b> 선택</div>
        <div>④ 프로젝트 설정(⚙️) → <b>내 앱</b> → 웹 앱 추가(&lt;/&gt;) → 앱 등록<br>
             &nbsp;&nbsp;&nbsp;&nbsp;→ <b>firebaseConfig</b> 값 복사</div>
        <div>⑤ <b>index.html</b> 파일 열어서 상단 FIREBASE_CONFIG 4줄에 붙여넣기</div>
      </div>
    </div>

    <div class="sl">index.html 수정 위치</div>
    <div class="card" style="background:#0d1a0d">
      <div style="font-size:10px;color:var(--grn);font-family:monospace;line-height:1.8">
        const FIREBASE_CONFIG = {<br>
        &nbsp;&nbsp;apiKey: <span style="color:var(--ora)">"AIzaSy...여기에 붙여넣기"</span>,<br>
        &nbsp;&nbsp;authDomain: <span style="color:var(--ora)">"hanultari.firebaseapp.com"</span>,<br>
        &nbsp;&nbsp;databaseURL: <span style="color:var(--ora)">"https://hanultari-default-rtdb.asia..."</span>,<br>
        &nbsp;&nbsp;projectId: <span style="color:var(--ora)">"hanultari"</span>,<br>
        };
      </div>
    </div>

    <div class="note y">설정 완료 후 앱을 새로고침하면 배너에<br>☁️ Firebase 연결 — 실시간 동기화 중 이 표시됩니다.</div>
    <div class="note b">보안 규칙: Realtime Database → 규칙 탭 → 30일 테스트 모드 만료 전<br>읽기/쓰기를 <b>true</b>로 유지하거나, 비밀번호 인증 규칙 추가를 권장합니다.</div>
  `;
};
// =================================================================
// ⑧ 회원 관리 — 수정 탭 포함
// =================================================================
let memberEditIdx = -1; // 현재 수정 중인 회원 인덱스 (-1 = 없음)

function renderMember(){
  const gradeD = DB.settings.gradeD || 130;

  let html = `<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
    <button class="btn s" onclick="go('more')" style="width:auto;padding:7px 14px;font-size:12px">← 돌아가기</button>
    <span style="font-size:14px;font-weight:700">👥 회원 관리</span>
    <span class="adm-b" style="margin-left:auto">🔒 관리자</span>
  </div>
  <div class="gl-legend">
    <div class="gl-box a"><div class="gl-title">A조</div><div style="font-size:9px;color:var(--txt2)">${DB.settings.gradeA}↑</div></div>
    <div class="gl-box b"><div class="gl-title">B조</div><div style="font-size:9px;color:var(--txt2)">${DB.settings.gradeC+1}~${DB.settings.gradeA-1}</div></div>
    <div class="gl-box c"><div class="gl-title">C조</div><div style="font-size:9px;color:var(--txt2)">${gradeD+1}~${DB.settings.gradeC}</div></div>
    <div class="gl-box d"><div class="gl-title">D조</div><div style="font-size:9px;color:var(--txt2)">${gradeD}↓</div></div>
  </div>
  <div class="sl">회원 목록 <span style="font-size:9px;font-weight:400;color:var(--txt2);letter-spacing:0">✏️ 수정 버튼으로 개별 편집</span></div>
  <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px">`;

  DB.members.forEach((m, i) => {
    const g = calcGrade(m.aver);
    const isEditing = (memberEditIdx === i);
    const roleH = m.role ? `<span class="rb">${m.role}</span>` : '';
    const tCls = teamCls(m.team);

    if(isEditing){
      // ── 수정 폼 (펼쳐진 상태) ──
      html += `<div style="background:var(--s1);border:2px solid var(--blu);border-radius:12px;padding:12px;margin-bottom:2px">
        <div style="font-size:12px;font-weight:700;color:var(--blu);margin-bottom:10px">✏️ ${m.nm} 정보 수정</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
          <div>
            <label style="font-size:10px;color:var(--txt2);display:block;margin-bottom:3px">이름</label>
            <input id="ed_nm" class="fi" style="padding:7px 9px;font-size:13px" value="${m.nm}">
          </div>
          <div>
            <label style="font-size:10px;color:var(--txt2);display:block;margin-bottom:3px">역할</label>
            <select id="ed_role" class="fs" style="padding:7px 9px;font-size:13px">
              <option value="" ${!m.role?'selected':''}>없음</option>
              <option value="회장" ${m.role==='회장'?'selected':''}>회장</option>
              <option value="경기이사" ${m.role==='경기이사'?'selected':''}>경기이사</option>
              <option value="총무" ${m.role==='총무'?'selected':''}>총무</option>
              <option value="동수" ${m.role==='동수'?'selected':''}>동수 (게스트)</option>
            </select>
          </div>
          <div>
            <label style="font-size:10px;color:var(--txt2);display:block;margin-bottom:3px">월회비 (원)</label>
            <input id="ed_fee" class="fi" type="number" inputmode="numeric" style="padding:7px 9px;font-size:13px" value="${m.fee}">
          </div>
        </div>
        <div style="font-size:9px;color:var(--txt2);background:var(--s2);border-radius:6px;padding:6px 8px;margin-bottom:8px;line-height:1.5">
          ℹ️ 팀 · 개인 Aver · 핸디 점수는 <b style="color:var(--blu)">점수입력</b> 화면에서 변경합니다.<br>
          현재값 — 팀 <b>${m.team?m.team+'팀':'없음'}</b> / Aver <b>${m.aver}</b> / 핸디 <b>${m.handicap||0}</b>
        </div>
        <div style="display:flex;gap:6px">
          <button onclick="saveMemberEdit(${i})" style="flex:2;background:var(--blu);color:#051020;border:none;border-radius:8px;padding:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">💾 저장</button>
          <button onclick="memberEditIdx=-1;renderMember()" style="flex:1;background:var(--s2);color:var(--txt2);border:1px solid var(--bdr);border-radius:8px;padding:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">취소</button>
          <button onclick="rmMember(${i})" style="flex:1;background:#2b0d0d;color:var(--red);border:1px solid var(--red);border-radius:8px;padding:10px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">🗑 삭제</button>
        </div>
      </div>`;
    } else {
      // ── 일반 목록 행 ──
      html += `<div class="av-row t${tCls}" style="border-left:3px solid ${teamColor(m.team)||'var(--bdr)'};cursor:default">
        <span class="av-nm">${m.nm}</span>
        <div style="flex:1;display:flex;flex-wrap:wrap;gap:4px;align-items:center;min-width:0">
          <span class="gb ${gradeCls(g)}">${g}조</span>
          ${m.team?`<span style="font-size:9px;font-weight:700;color:${teamColor(m.team)}">${m.team}팀</span>`:''}
          ${roleH}
          <span style="font-size:9px;color:var(--txt2)">Aver <b style="color:#fff">${m.aver}</b></span>
          ${m.handicap>0?`<span style="font-size:9px;color:var(--pur)">H+${m.handicap}</span>`:''}
          <span style="font-size:9px;color:var(--txt2)">${(m.fee/10000)}만원</span>
        </div>
        <button onclick="checkAdmin(()=>{memberEditIdx=${i};renderMember();})"
          style="background:var(--s3);border:1px solid var(--bdr);border-radius:6px;color:var(--txt);font-size:11px;font-weight:700;padding:5px 10px;cursor:pointer;white-space:nowrap;font-family:inherit;flex-shrink:0">✏️ 수정</button>
      </div>`;
    }
  });

  html += `</div>
    <button class="btn b" onclick="checkAdmin(()=>addMember())">＋ 신규 회원 추가</button>
    <div style="height:8px"></div>
    <div class="note b">🔐 비밀번호 초기화 — 회원이 비밀번호를 잊었을 때 0000으로 초기화</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      ${DB.members.map(m=>`<button onclick="checkAdmin(()=>resetMemberPw('${m.nm}'))"
        style="background:var(--s2);border:1px solid var(--bdr);border-radius:7px;color:var(--txt2);font-size:10px;padding:5px 10px;cursor:pointer;font-family:inherit">🔑 ${m.nm}</button>`).join('')}
    </div>`;

  document.getElementById('pg-member').innerHTML = html;
}

// 수정 내용 저장
window.saveMemberEdit = function(i){
  const nm   = document.getElementById('ed_nm').value.trim();
  const role = document.getElementById('ed_role').value;
  const fee  = parseInt(document.getElementById('ed_fee').value) || 0;
  // 팀·Aver·핸디는 점수입력 화면에서 변경 — 여기서는 기존값 유지
  const prev = DB.members[i];
  const team = prev.team;
  const aver = prev.aver;
  const hcp  = prev.handicap||0;

  if(!nm){ T('⚠️ 이름을 입력하세요'); return; }

  // 이름 변경 시 scores/dues 키도 함께 이전
  const oldNm = DB.members[i].nm;
  if(nm !== oldNm){
    if(DB.members.find((m,j)=>m.nm===nm && j!==i)){ T('⚠️ 동일한 이름이 이미 존재합니다'); return; }
    DB.scores[nm] = DB.scores[oldNm] || Array(DB.settings.gameCount).fill(null);
    delete DB.scores[oldNm];
    DB.dues[nm] = DB.dues[oldNm] || {};
    delete DB.dues[oldNm];
    // scoreHistory 이름도 업데이트
    (DB.scoreHistory||[]).forEach(h=>{
      if(h.scores[oldNm]!==undefined){ h.scores[nm]=h.scores[oldNm]; delete h.scores[oldNm]; }
      if(h.handicaps&&h.handicaps[oldNm]!==undefined){ h.handicaps[nm]=h.handicaps[oldNm]; delete h.handicaps[oldNm]; }
    });
  }

  DB.members[i] = { ...DB.members[i], nm, role, team, fee, aver, handicap:hcp, group:calcGrade(aver) };
  memberEditIdx = -1;
  sortMembers();
  saveDB();
  T(`✅ ${nm} 정보 저장 완료`);
  renderMember();
};

window.addMember = function(){
  const nm = prompt('새 회원 이름'); if(!nm) return;
  if(DB.members.find(m=>m.nm===nm)) return T('⚠️ 동일 이름 존재');
  const role = prompt('역할 (회장/총무/경기이사, 없으면 빈칸)', '');
  const fee  = parseInt(prompt('월회비', '40000')) || 40000;
  // 팀·Aver·핸디는 점수입력 화면에서 지정 — 기본값으로 생성
  const aver = 180;
  DB.members.push({nm, team:'', role, fee, aver, group:calcGrade(aver), handicap:0});
  DB.scores[nm] = Array(DB.settings.gameCount).fill(null);
  DB.dues[nm] = {};
  sortMembers();
  saveDB(); memberEditIdx=-1; renderMember(); T(`✅ ${nm} 추가 — 팀·Aver·핸디는 점수입력에서 지정`);
};

window.rmMember = function(i){
  const nm = DB.members[i].nm;
  if(!confirm(`${nm} 회원을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) return;
  DB.members.splice(i,1);
  delete DB.scores[nm]; delete DB.dues[nm];
  memberEditIdx = -1;
  saveDB(); renderMember(); T(`✅ ${nm} 삭제`);
};

// 이전 호환 함수 (다른 곳에서 호출 가능성 대비)
window.setAver = function(i,v){ DB.members[i].aver=parseInt(v)||0; DB.members[i].group=calcGrade(DB.members[i].aver); saveDB(); };
window.setHcp  = function(i,v){ DB.members[i].handicap=Math.max(0,parseInt(v)||0); saveDB(); };
window.setTeam = function(i,t){ DB.members[i].team=t; saveDB(); };

// =================================================================
// ⑨ 회칙
// =================================================================

// DB에 회칙 데이터가 없으면 기본값으로 초기화
function ensureConst(){
  if(!DB.constitution) DB.constitution=[
    {title:'제 1조 (클럽 명칭)',    body:'본 볼링 클럽의 명칭은 "한울타리"라 한다.\n창단일시: 2000년 9월 23일 19:00'},
    {title:'제 2조 (클럽 결성 목적)',body:'볼링을 좋아하고 즐기는 회원들의 모임으로 회원 간 경기력 향상과 친선도모를 목적으로 한다.'},
    {title:'제 3조 (모임)',          body:'매월 2째·4째주 토요일 19:00 정기 모임.\n1항. 유니폼 미착용자 ₩5,000 벌금.\n2항. 일정 변경 시 회의를 통해 조정.'},
    {title:'제 4조 (장소)',          body:'부산시 부산진구 범일동 위치한 "뷰" 볼링장.'},
    {title:'제 5조 (월회비)',        body:'1항. 개인 ₩40,000\n2항. 부부 ₩70,000\n3항. 경기이사·총무 ₩35,000\n4항. 준회원 정모 참석 시 ₩15,000'},
    {title:'제 6조 (벌금)',          body:'• Aver 대비 미달 기준(45점↓): ₩5,000\n• Aver 미만 게임당: ₩1,000\n• 전 게임 Aver 미만 추가: ₩5,000\n• 개인 최대 한도: ₩8,000\n• 유니폼 미착용: ₩5,000'},
    {title:'제 7조 (시상)',          body:'1항. 총점 800점↑ 1등 ₩10,000 / 2등 ₩5,000\n2항. Aver 초과 시상 ₩5,000 (총점 수상자 제외)\n3항. 최대 3명 시상\n4항. All Cover ₩5,000\n5항. 미지급 시상은 다음 정모 지급'},
    {title:'제 8조 (회원가입)',      body:'1항. 입회비 ₩100,000 (유니폼 포함)\n2항. 타 상주클럽 중복 가입 불가\n3항. 재가입 시 전원 과반수 동의'},
    {title:'제 9조 (임원진)',        body:'매년 11월 넷째 주 정기 총회 투표 선출. 임기 1년, 연임 가능.'},
    {title:'제 10조 (임원 소임)',    body:'회장: 대표 및 대외활동 총괄\n경기이사: 경기 진행·기록·Aver 관리\n총무: 문서·재정 관리'}
  ];
}

let constEditIdx=-1; // 수정 중인 조항 인덱스

function renderConst(){
  ensureConst();
  const isAdmin=currentUser&&currentUser.isAdmin;
  let html=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
    <button class="btn s" onclick="go('more')" style="width:auto;padding:7px 14px;font-size:12px">← 돌아가기</button>
    <span style="font-size:14px;font-weight:700">📋 한울타리 회칙</span>
    ${isAdmin?`<button onclick="addConstArticle()" style="margin-left:auto;background:var(--blu);border:none;border-radius:6px;color:#051020;font-size:10px;padding:5px 10px;cursor:pointer;font-family:inherit;font-weight:700">＋ 조항 추가</button>`:''}
  </div>
  <div class="note y">📌 창단: 2000년 9월 23일 | 부산진구 범일동 "뷰" 볼링장</div>`;

  DB.constitution.forEach((art,i)=>{
    if(constEditIdx===i && isAdmin){
      // 수정 폼
      html+=`<div style="background:var(--s1);border:2px solid var(--blu);border-radius:12px;padding:12px;margin-bottom:8px">
        <div style="font-size:11px;font-weight:700;color:var(--blu);margin-bottom:7px">✏️ 수정 중</div>
        <input id="cEdit_title_${i}" class="fi" value="${art.title.replace(/"/g,'&quot;')}" style="margin-bottom:7px;font-size:13px">
        <textarea id="cEdit_body_${i}" class="fi" rows="4" style="resize:vertical;font-size:12px;line-height:1.7">${art.body}</textarea>
        <div style="display:flex;gap:6px;margin-top:8px">
          <button onclick="saveConstEdit(${i})" style="flex:2;background:var(--blu);color:#051020;border:none;border-radius:7px;padding:9px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">💾 저장</button>
          <button onclick="constEditIdx=-1;renderConst()" style="flex:1;background:var(--s2);color:var(--txt2);border:1px solid var(--bdr);border-radius:7px;padding:9px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">취소</button>
          <button onclick="deleteConstArticle(${i})" style="flex:1;background:#2b0d0d;color:var(--red);border:1px solid var(--red);border-radius:7px;padding:9px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit">삭제</button>
        </div>
      </div>`;
    } else {
      // 읽기 모드
      const bodyHtml=art.body.replace(/\n/g,'<br>');
      html+=`<div style="margin-bottom:6px">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="ca" style="margin:10px 0 4px">${art.title}</div>
          ${isAdmin?`<button onclick="constEditIdx=${i};renderConst()" style="background:none;border:1px solid var(--bdr);border-radius:5px;color:var(--txt2);font-size:9px;padding:2px 7px;cursor:pointer;font-family:inherit;margin-top:6px">✏️ 수정</button>`:''}
        </div>
        <div class="cc2">${bodyHtml}</div>
      </div>`;
    }
  });

  document.getElementById('pg-const').innerHTML=html;
}

window.saveConstEdit=function(i){
  const title=document.getElementById(`cEdit_title_${i}`).value.trim();
  const body=document.getElementById(`cEdit_body_${i}`).value.trim();
  if(!title||!body){T('⚠️ 제목과 내용을 입력하세요');return;}
  DB.constitution[i]={title,body};
  constEditIdx=-1;
  saveDB();renderConst();T('✅ 회칙 수정 완료');
};

window.deleteConstArticle=function(i){
  if(!confirm(`${DB.constitution[i].title}\n\n이 조항을 삭제하시겠습니까?`)) return;
  DB.constitution.splice(i,1);
  constEditIdx=-1;
  saveDB();renderConst();T('✅ 조항 삭제');
};

window.addConstArticle=function(){
  ensureConst();
  const num=DB.constitution.length+1;
  DB.constitution.push({title:`제 ${num}조 (새 조항)`,body:'내용을 입력하세요.'});
  constEditIdx=DB.constitution.length-1;
  saveDB();renderConst();
  // 스크롤 하단으로
  setTimeout(()=>{ document.getElementById('pages').scrollTop=99999; },100);
};

// =================================================================
// ⑩ 설정 (관리자)
// =================================================================
function renderSetting(){
  const s=DB.settings;
  const present=DB.members.filter(m=>(DB.scores[m.nm]||[]).some(x=>x!==null)).length;
  const gradeD=s.gradeD||130;

  let html=`<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
    <button class="btn s" onclick="go('more')" style="width:auto;padding:7px 14px;font-size:12px">← 돌아가기</button>
    <span style="font-size:14px;font-weight:700">⚙️ 설정</span>
    <span class="adm-b" style="margin-left:auto">🔒 관리자</span>
  </div>
  <div class="gs-hero">
    <div class="gs-bg">🎳</div><div class="gs-ht">현재 설정 요약</div>
    <div class="gs-grid" style="grid-template-columns:repeat(2,1fr)">
      <div class="gs-box b"><div class="gs-ic">🎮</div><div class="gs-lbl">기본 게임수</div><div class="gs-vl b">${s.gameCount}</div><div class="gs-ut b">게임</div></div>
      <div class="gs-box p"><div class="gs-ic">👥</div><div class="gs-lbl">현재 참석</div><div class="gs-vl p">${present}</div><div class="gs-ut p">명</div></div>
    </div>
  </div>

  <div class="sl">기본 게임 수 (최대 5게임)</div>
  <div class="gs-gsel">
    ${[1,2,3,4,5].map(n=>`<div class="gs-gbtn ${s.gameCount===n?'on':''}" onclick="setGames(${n})"><div class="gs-gnum">${n}</div><div class="gs-glb">게임</div></div>`).join('')}
  </div>

  <div class="sl">시상 기준</div>
  ${sCard('ora','🏆','총점 최소점수','미달시 Aver 대체','',[ {l:'기준',v:s.awardMinScore,c:'ora',x:'점',k:'awardMinScore',m:6}])}
  ${sCard('ora','🥇','총점 시상금','1·2등 지급','',[{l:'1등',v:s.award1st,c:'ora',x:'원',k:'award1st'},{l:'2등',v:s.award2nd,c:'ora',x:'원',k:'award2nd'}])}
  ${sCard('blue','📈','Aver 초과 시상','총점 제외 후 적용','',[{l:'1인',v:s.awardAver,c:'blue',x:'원',k:'awardAver'}])}
  ${sCard('pur','🎯','All Cover 시상','별도 / 관리자 입력','',[{l:'1인',v:s.awardAllCover,c:'pur',x:'원',k:'awardAllCover'}])}

  <div class="sl">벌금 기준</div>
  ${sCard('red','📉','Aver 미달 기준','이 점수 이상 미달 시','',[{l:'기준',v:s.fineUnderBasis,c:'red',x:'점↓',k:'fineUnderBasis',m:3},{l:'벌금',v:s.fineUnderAmount,c:'red',x:'원',k:'fineUnderAmount'}])}
  ${sCard('red','📊','게임당 벌금','Aver미만 1게임당','',[{l:'게임당',v:s.finePerGame,c:'red',x:'원',k:'finePerGame'}])}
  ${sCard('red','🚨','전 게임 Aver 미만','전 게임 미만 추가','',[{l:'추가',v:s.fineAllUnder,c:'red',x:'원',k:'fineAllUnder'}])}
  ${sCard('red','⚠️','최대 벌금 한도','합산 초과시 제한','',[{l:'최대',v:s.fineMaxLimit,c:'red',x:'원',k:'fineMaxLimit'}])}

  <div class="sl">조 편성 기준 (A/B/C/D 4개 조)</div>
  ${sCard('blue','🏅','A조 기준',`Aver ${s.gradeA}↑`,'',[{l:'A조기준',v:s.gradeA,c:'blue',x:'점↑',k:'gradeA',m:3}])}
  ${sCard('red','🏅','C조 기준',`B조: ${s.gradeC+1}~${s.gradeA-1}`,'',[{l:'C조기준',v:s.gradeC,c:'red',x:'점↓',k:'gradeC',m:3}])}
  ${sCard('gray','🏅','D조 기준',`C조: ${gradeD+1}~${s.gradeC}`,'',[{l:'D조기준',v:gradeD,c:'dim',x:'점↓',k:'gradeD',m:3}])}

  <div class="sl">관리자 비밀번호</div>
  <div class="cc gray">
    <div class="cc-hdr"><span class="cc-icon">🔒</span><span class="cc-title">관리자 비밀번호 변경</span></div>
    <div class="cc-desc">회원관리·설정 접근 비밀번호 | 기본: 5925</div>
    <div class="cc-row">
      <span class="cc-lbl">비밀번호</span>
      <div class="cc-grp">
        <input class="cc-inp dim" type="password" value="${s.adminPw||'5925'}" maxlength="8"
          onchange="DB.settings.adminPw=this.value;saveDB();T('✅ 비밀번호 변경')">
        <span class="cc-sfx">●●●●</span>
      </div>
    </div>
  </div>

  <div class="sl">기능 ON/OFF</div>
  ${togRow('🎯','All Cover 시상','3명 외 별도 관리자 입력','allCover')}
  ${togRow('📅','전월 게임 수 최다 시상','전월 참석 최다자','monthlyMost')}
  ${togRow('🔢','조 편성 배지 표시','A/B/C/D조 배지','showGrade')}
  ${togRow('🔔','에바하이 자동 감지','점수 입력 시 알림','autoEva')}

  <div class="save-btn" onclick="saveDB();T('💾 설정 저장 완료')">💾 설정 저장</div>

  <div class="sl">데이터 관리</div>
  <button class="btn s" onclick="checkStorage()" style="margin-bottom:8px">📊 저장공간 확인</button>
  <button class="btn s" onclick="trimHistory()" style="margin-bottom:8px;color:var(--ora);border-color:var(--ora)">🗑 이력 정리 (최근 20개 유지)</button>
  <button class="btn s" onclick="importData()" style="margin-bottom:8px">📂 백업 파일 불러오기</button>
  <button class="btn s" onclick="resetData()" style="color:var(--red)">⚠️ 초기 데이터로 리셋</button>`;

  document.getElementById('pg-setting').innerHTML=html;
}

function sCard(cls,icon,title,desc,ex,rows){
  let inp='';
  rows.forEach((r,i)=>{
    inp+=`<div class="cc-row"><span class="cc-lbl">${r.l}</span><div class="cc-grp">
      <input class="cc-inp ${r.c}" type="text" inputmode="numeric" value="${fmt(r.v)}" maxlength="${r.m||9}" onchange="updS('${r.k}',this.value)">
      <span class="cc-sfx">${r.x}</span></div></div>`;
    if(i<rows.length-1) inp+=`<div class="idiv"></div>`;
  });
  return `<div class="cc ${cls}"><div class="cc-hdr"><span class="cc-icon">${icon}</span><span class="cc-title">${title}</span></div><div class="cc-desc">${desc}</div>${ex?`<div class="cc-ex">${ex}</div>`:''}${inp}</div>`;
}
function togRow(icon,name,desc,key){
  const on=DB.settings.features[key];
  return `<div class="tog-row"><span class="tog-icon">${icon}</span><div class="tog-info"><div class="tog-name">${name}</div><div class="tog-desc">${desc}</div></div><div class="tog ${on?'on':'off'}" onclick="togF('${key}')"><div class="tog-dot"></div></div></div>`;
}
window.updS=function(k,v){
  const n=parseInt(String(v).replace(/[^\d]/g,''))||0;
  DB.settings[k]=n;
  if(['gradeA','gradeC','gradeD'].includes(k)) DB.members.forEach(m=>{m.group=calcGrade(m.aver);});
  saveDB();renderSetting();T(`✅ ${k}=${fmt(n)}`);
};

window.togF=function(k){DB.settings.features[k]=!DB.settings.features[k];saveDB();renderSetting();};
// 저장공간 확인
window.checkStorage=function(){
  try{
    const data=localStorage.getItem(KEY)||'';
    const kb=Math.round(data.length/1024);
    const histCount=(DB.scoreHistory||[]).length;
    const cloud = window._fbConfigured ? '🟢 클라우드 동기화 켜짐 — 용량 걱정 없음' : '🔴 클라우드 꺼짐 (로컬 전용)';
    alert(`📊 저장 현황\n\n${cloud}\n\n로컬 캐시: ${kb} KB\n모임 이력: ${histCount}개\n\n${window._fbConfigured ? '✅ 데이터는 클라우드에 안전하게 저장됩니다.\n로컬 캐시가 가득 차도 저장은 정상 동작합니다.' : '⚠️ 클라우드가 꺼져 있습니다. 인터넷 연결과 Firebase 설정을 확인하세요.'}`);
  }catch(e){ T('⚠️ 확인 실패'); }
};

// 이력 정리 (최근 20개만 유지)
window.trimHistory=function(){
  const before=(DB.scoreHistory||[]).length;
  if(before===0){ T('정리할 이력이 없습니다'); return; }
  if(!confirm(`현재 이력 ${before}개 중 최근 20개만 남기고 삭제합니다.\n\n⚠️ 오래된 이력은 복구할 수 없습니다.\n계속하시겠습니까?`)) return;
  DB.scoreHistory=(DB.scoreHistory||[]).slice(0,20);
  saveDB();
  T(`✅ 이력 정리 완료 (${before}개 → ${DB.scoreHistory.length}개)`);
  renderSetting();
};

window.resetData=function(){
  if(!confirm('모든 데이터를 초기화합니다.')) return;
  if(!confirm('정말 초기화? 되돌릴 수 없습니다!')) return;
  localStorage.removeItem(KEY);location.reload();
};
// ── 데이터 관리 화면 ──────────────────────────────
window.showDataMenu=function(){
  document.getElementById('pg-more').innerHTML=`
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
    <button class="btn s" onclick="renderMore()" style="width:auto;padding:7px 14px;font-size:12px">← 돌아가기</button>
    <span style="font-size:14px;font-weight:700">📥 데이터 가져오기</span>
  </div>
  <div class="note b">내보내기로 저장한 JSON 백업 파일을 불러옵니다.<br>가져오기 방식을 선택하세요.</div>

  <!-- 전체 교체 -->
  <div class="card" style="cursor:pointer;border-color:var(--red);margin-bottom:8px" onclick="importData('replace')">
    <div style="display:flex;align-items:center;gap:12px">
      <span style="font-size:28px">🔄</span>
      <div>
        <div style="font-weight:700;font-size:13px;color:#fff;margin-bottom:3px">전체 교체</div>
        <div style="font-size:11px;color:var(--txt2)">현재 모든 데이터를 백업 파일로 완전히 교체합니다.<br><span style="color:var(--red)">⚠️ 현재 데이터가 사라집니다.</span></div>
      </div>
      <span style="margin-left:auto;color:var(--red);font-weight:700;font-size:12px">선택 →</span>
    </div>
  </div>

  <!-- 이력만 병합 -->
  <div class="card" style="cursor:pointer;border-color:var(--grn);margin-bottom:8px" onclick="importData('merge-history')">
    <div style="display:flex;align-items:center;gap:12px">
      <span style="font-size:28px">📅</span>
      <div>
        <div style="font-weight:700;font-size:13px;color:#fff;margin-bottom:3px">모임 이력 병합</div>
        <div style="font-size:11px;color:var(--txt2)">백업 파일의 모임 이력만 현재 데이터에 추가합니다.<br>현재 점수·회원·장부는 그대로 유지됩니다.</div>
      </div>
      <span style="margin-left:auto;color:var(--grn);font-weight:700;font-size:12px">선택 →</span>
    </div>
  </div>

  <!-- 장부만 가져오기 -->
  <div class="card" style="cursor:pointer;border-color:var(--blu);margin-bottom:8px" onclick="importData('merge-finance')">
    <div style="display:flex;align-items:center;gap:12px">
      <span style="font-size:28px">💰</span>
      <div>
        <div style="font-weight:700;font-size:13px;color:#fff;margin-bottom:3px">장부만 가져오기</div>
        <div style="font-size:11px;color:var(--txt2)">백업 파일의 장부 데이터만 현재에 적용합니다.<br>점수·회원·이력은 그대로 유지됩니다.</div>
      </div>
      <span style="margin-left:auto;color:var(--blu);font-weight:700;font-size:12px">선택 →</span>
    </div>
  </div>

  <!-- 회원 정보만 -->
  <div class="card" style="cursor:pointer;border-color:var(--pur);margin-bottom:8px" onclick="importData('merge-members')">
    <div style="display:flex;align-items:center;gap:12px">
      <span style="font-size:28px">👥</span>
      <div>
        <div style="font-weight:700;font-size:13px;color:#fff;margin-bottom:3px">회원 정보만 가져오기</div>
        <div style="font-size:11px;color:var(--txt2)">백업 파일의 회원 목록·Aver·핸디만 업데이트합니다.<br>점수·장부·이력은 그대로 유지됩니다.</div>
      </div>
      <span style="margin-left:auto;color:var(--pur);font-weight:700;font-size:12px">선택 →</span>
    </div>
  </div>

  <div class="note y">💡 백업 파일은 더보기 → 📤 내보내기로 만들 수 있습니다.</div>`;
};

window.importData=function(mode){
  mode=mode||'replace';
  const modeLabel={
    'replace':'전체 교체',
    'merge-history':'모임 이력 병합',
    'merge-finance':'장부만 가져오기',
    'merge-members':'회원 정보만 가져오기'
  }[mode];

  const inp=document.createElement('input');
  inp.type='file'; inp.accept='.json';
  inp.onchange=function(e){
    const file=e.target.files[0]; if(!file) return;
    const r=new FileReader();
    r.onload=function(ev){
      try{
        const d=JSON.parse(ev.target.result);
        if(!d.members) return T('⚠️ 올바른 백업 파일이 아닙니다');

        const fileName=file.name;
        if(!confirm(`📥 [${modeLabel}]\n\n파일: ${fileName}\n\n계속하시겠습니까?`)) return;

        if(mode==='replace'){
          // 전체 교체 — 클라우드에도 반영 후 재로드
          d._ts = Date.now();
          try{ localStorage.setItem(KEY,JSON.stringify(d)); }catch(_){}
          if(window._fbConfigured && window.fbSave) window.fbSave(d);
          T('✅ 데이터 교체 완료 — 재시작합니다');
          setTimeout(()=>location.reload(),1200);

        }else if(mode==='merge-history'){
          // 이력 병합 — 날짜 기준으로 중복 제거
          if(!DB.scoreHistory) DB.scoreHistory=[];
          const incoming=d.scoreHistory||[];
          let added=0;
          incoming.forEach(h=>{
            if(!DB.scoreHistory.find(x=>x.date===h.date)){
              DB.scoreHistory.push(h); added++;
            }
          });
          DB.scoreHistory.sort((a,b)=>b.date.localeCompare(a.date));
          saveDB(); renderMore();
          T(`✅ 이력 ${added}개 추가 (총 ${DB.scoreHistory.length}개)`);

        }else if(mode==='merge-finance'){
          // 장부 교체
          DB.finance=JSON.parse(JSON.stringify(d.finance));
          saveDB(); renderMore();
          T('✅ 장부 데이터 적용 완료');

        }else if(mode==='merge-members'){
          // 회원 정보 업데이트 (이름 기준 매칭)
          let updated=0, added=0;
          (d.members||[]).forEach(dm=>{
            const idx=DB.members.findIndex(m=>m.nm===dm.nm);
            if(idx>=0){
              DB.members[idx]={...DB.members[idx], aver:dm.aver, handicap:dm.handicap||0, team:dm.team, group:dm.group, role:dm.role, fee:dm.fee};
              updated++;
            }else{
              DB.members.push({...dm}); added++;
            }
          });
          sortMembers(); saveDB(); renderMore();
          T(`✅ 회원 ${updated}명 업데이트, ${added}명 추가`);
        }
      }catch(err){ T('⚠️ 파일 읽기 실패: '+err.message); }
    };
    r.readAsText(file);
  };
  inp.click();
};

window.resetMemberPw=function(nm){
  if(!confirm(`${nm}님의 비밀번호를 0000으로 초기화하시겠습니까?`)) return;
  if(!DB.memberPw) DB.memberPw={};
  delete DB.memberPw[nm]; // 삭제하면 기본값 0000 사용
  saveDB(); T(`✅ ${nm} 비밀번호 초기화 완료 (0000)`);
};

// ── 헤더 ─────────────────────────────────────────
function updateHeader(){
  document.getElementById('hdrDate').textContent=DB.meetDate;
  document.getElementById('hdrCount').textContent=DB.members.filter(m=>(DB.scores[m.nm]||[]).some(x=>x!==null)).length;
  document.getElementById('hdrGames').textContent=DB.settings.gameCount+'게임';
  const badge=document.getElementById('meetBadge');
  if(badge) badge.textContent=({regular:'정기모임',flash:'번개모임',special:'특별모임'}[DB.meetType]||'정기모임')+' ▾';
  updateHdrUser();
}
window.syncNow=function(){T('🔄 저장...');setTimeout(()=>{saveDB();T('✅ 저장 완료');},400);};

// ── PWA ──────────────────────────────────────────
let deferredPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.getElementById('installBar')?.classList.add('on');});
window.installApp=function(){
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then(()=>{deferredPrompt=null;document.getElementById('installBar')?.classList.remove('on');});
};

// ── 서비스워커 ────────────────────────────────────
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(e=>console.warn('SW:',e)));
}

// ── 초기 렌더 ────────────────────────────────────
window.addEventListener('DOMContentLoaded',()=>{
  // 로그인 화면 회원 목록 초기화
  initLoginScreen();

  // 세션 복원 시도 (새로고침 시 자동 로그인 유지)
  if(restoreSession()){
    document.getElementById('login-screen').classList.add('hidden');
    updateHdrUser();
    updateHeader();
    renderDashboard();
    window._curPage='dash';
    window._appReady=true;
  }
  // 세션 없으면 로그인 화면 유지 (아무것도 안 해도 됨)
});
