let lastClicked = 0;
let observerStarted = false;
let overlay;
/* ------------------ AMAR'S AUTOSKIPPER ------------------ */
/* --------------------- MADE WITH <3 -------------------- */

/* ------------------ BUTTON DETECTION ------------------ */

function getJumpAheadButton() {
    const btn = document.querySelector('.ytp-timely-actions-overlay button');
    return btn?.closest('button');
}

/* ------------------ MAIN LOGIC ------------------ */
let textPatcherStarted = false;
function patchJumpAheadText() {
  if (textPatcherStarted) return;
  textPatcherStarted = true;
  const observer = new MutationObserver(() => {
    const el = document.querySelector('.ytp-seek-overlay-message-text');
    if (el && el.textContent === 'Jumping ahead') {
      el.textContent = 'Automatically jumping ahead (AMAR AUTOSKIPPER)';
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}
function simulateClick(btn) {
  ['mousedown', 'mouseup', 'click'].forEach(type => {
    btn.dispatchEvent(new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
    }));
  });
}
                
function tryClickJumpAhead() {
    const now = Date.now();
    if (now - lastClicked < 200) return;
    const btn = getJumpAheadButton();
    if (btn){
      simulateClick(btn);
      lastClicked = now;
    } 
}

/* ------------------ OBSERVER ------------------ */

function startObserver() {
  if (observerStarted) return;
  observerStarted = true;

  const observer = new MutationObserver(() => {
    tryClickJumpAhead();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

/* ------------------ INITIALIZATION ------------------ */

function init() {
  startObserver();
  tryClickJumpAhead();
  patchJumpAheadText();
}

init();

window.addEventListener('yt-navigate-finish', init);