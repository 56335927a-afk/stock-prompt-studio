(function(){
'use strict';
const STYLE_ORDER=["파스텔 크레용","브라운 모노라인","귀여운 플랫 2D","클레이 3D","수채화","종이 콜라주","과슈","색연필","연필 스케치","펜&잉크","마커 드로잉","동화책","치비 캐릭터","카와이 스티커","미니멀 플랫","듀오톤 벡터","기하학 아이콘","얇은 모노라인","두꺼운 아웃라인","아이소메트릭","글로시 3D","매트 3D","소프트 토이 3D","풍선 3D","펠트 공예","자수","니트","도자기","목각","아크릴 페인팅","오일 페인팅","파스텔 초크","레트로 70s","레트로 80s","Y2K","빈티지 포스터","코티지코어","북유럽 미니멀","럭셔리 미니멀","에디토리얼","소프트 그래디언트","글래스 3D","픽셀아트","16비트 게임","컬러링북","블랙 잉크라인","스티커팩","픽토그램","리소그래프","라인드로잉+워시","소프트 에어브러시","페이퍼컷 3D"];
const indexByName=new Map(STYLE_ORDER.map((name,index)=>[name,index]));
function decorateCard(btn){
  const strong=btn.querySelector('strong'),thumb=btn.querySelector('.thumb'),small=btn.querySelector('small'),star=btn.querySelector('.star');
  if(!strong||!thumb)return;
  const name=strong.textContent.trim(),index=indexByName.get(name);if(index==null)return;
  const icon=(thumb.dataset.originalIcon||thumb.textContent||'').trim();if(icon)thumb.dataset.originalIcon=icon;
  thumb.dataset.verifiedName=name;thumb.classList.add('exampleThumb');thumb.textContent='';
  let row=btn.querySelector('.styleTitleNew');
  if(!row){row=document.createElement('div');row.className='styleTitleNew';const mi=document.createElement('span');mi.className='miniIcon';mi.textContent=icon;row.append(mi,strong);if(star)row.append(star);btn.insertBefore(row,small||null)}
  else{const mi=row.querySelector('.miniIcon');if(mi&&icon)mi.textContent=icon}
}
function decorateSelected(){const nameEl=document.getElementById('selectedName'),box=document.getElementById('bigEmoji');if(!nameEl||!box)return;const name=nameEl.textContent.trim(),index=indexByName.get(name);if(index==null)return;box.dataset.verifiedName=name;box.className='selectedPreview';box.textContent=''}
function addHint(){const styles=document.getElementById('styles');if(!styles)return;let hint=document.getElementById('carrotHint');if(!hint){hint=document.createElement('span');hint.id='carrotHint';hint.className='carrotHint';styles.parentNode.insertBefore(hint,styles)}hint.textContent='그림체별 실제 고화질 예시는 검증이 끝난 뒤에만 표시할게요. 현재는 잘못된 미리보기를 숨긴 상태예요.'}
let scheduled=false;function decorate(){document.querySelectorAll('.style').forEach(decorateCard);decorateSelected();addHint()}function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;decorate()})}
new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate);else decorate();setTimeout(decorate,250);
})();
