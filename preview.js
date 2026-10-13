(function(){
'use strict';
function decorateCard(btn){
  const thumb=btn.querySelector('.thumb');
  if(!thumb)return;
  const icon=(thumb.dataset.originalIcon||thumb.textContent||'').trim();
  if(icon)thumb.dataset.originalIcon=icon;
  thumb.className='thumb actualPreviewPending';
  thumb.textContent='';
  thumb.removeAttribute('style');
  thumb.title='실제 프롬프트 검증 이미지 준비 중';
  thumb.onclick=null;
}
function decorateSelected(){
  const box=document.getElementById('bigEmoji');
  if(!box)return;
  box.className='actualSelectedPending';
  box.textContent='';
  box.removeAttribute('style');
  box.title='실제 프롬프트 검증 이미지 준비 중';
  box.onclick=null;
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
  hint.textContent='실제 PickStock 스타일 프롬프트로 생성·확인된 고화질 당근 이미지만 순차적으로 표시합니다. 현재 검증 완료 0/52.';
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
setTimeout(decorate,250);
})();
