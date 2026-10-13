(function(){
'use strict';
const STYLE_NAMES=['파스텔 크레용','브라운 모노라인','귀여운 플랫 2D','클레이 3D','수채화','종이 콜라주','과슈','색연필','연필 스케치','펜&잉크','마커 드로잉','동화책','치비 캐릭터','카와이 스티커','미니멀 플랫','듀오톤 벡터','기하학 아이콘','얇은 모노라인','두꺼운 아웃라인','아이소메트릭','글로시 3D','매트 3D','소프트 토이 3D','풍선 3D','펠트 공예','자수','니트','도자기','목각','아크릴 페인팅','오일 페인팅','파스텔 초크','레트로 70s','레트로 80s','Y2K','빈티지 포스터','코티지코어','북유럽 미니멀','럭셔리 미니멀','에디토리얼','소프트 그래디언트','글래스 3D','픽셀아트','16비트 게임','컬러링북','블랙 잉크라인','스티커팩','픽토그램','리소그래프','라인드로잉+워시','소프트 에어브러시','페이퍼컷 3D'];
const COLS=8, ROWS=7;
const ATLAS='verified-prompt-atlas.webp?v=1';
function indexOfName(name){return STYLE_NAMES.indexOf(String(name||'').trim());}
function spritePos(index){
  const col=index%COLS,row=Math.floor(index/COLS);
  const x=COLS>1?(col*100/(COLS-1)):0;
  const y=ROWS>1?(row*100/(ROWS-1)):0;
  return `${x}% ${y}%`;
}
function applyPreview(el,index,selected){
  if(!el||index<0)return;
  el.className=selected?'actualSelectedPreview':'thumb actualPreview';
  el.textContent='';
  el.style.backgroundImage=`url("${ATLAS}")`;
  el.style.backgroundSize=`${COLS*100}% ${ROWS*100}%`;
  el.style.backgroundPosition=spritePos(index);
  el.style.backgroundRepeat='no-repeat';
  el.title=`${STYLE_NAMES[index]} · PickStock 프롬프트 기준 당근 예시`;
  el.setAttribute('aria-label',`${STYLE_NAMES[index]} 스타일 예시 이미지`);
}
function decorateCard(btn){
  const name=btn.querySelector('strong')?.textContent;
  const thumb=btn.querySelector('.thumb,.actualPreview');
  applyPreview(thumb,indexOfName(name),false);
}
function decorateSelected(){
  const name=document.getElementById('selectedName')?.textContent;
  const box=document.getElementById('bigEmoji');
  applyPreview(box,indexOfName(name),true);
}
function addHint(){
  const styles=document.getElementById('styles');
  if(!styles)return;
  let hint=document.getElementById('carrotHint');
  if(!hint){
    hint=document.createElement('span');
    hint.id='carrotHint';
    hint.className='carrotHint';
    styles.parentNode.insertBefore(hint,styles);
  }
  hint.textContent='같은 당근 오브젝트를 기준으로, PickStock에 등록된 각 스타일 프롬프트 순서대로 만든 예시 이미지입니다.';
}
let scheduled=false;
function decorate(){
  document.querySelectorAll('.style').forEach(decorateCard);
  decorateSelected();
  addHint();
}
function schedule(){
  if(scheduled)return;
  scheduled=true;
  requestAnimationFrame(()=>{scheduled=false;decorate();});
}
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate);else decorate();
setTimeout(decorate,120);
setTimeout(decorate,500);
})();
