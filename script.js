const overlay = document.getElementById("overlay");
const cols = 15;
const rows = 22;
const cellCount = cols * rows;

// Mosaicセル生成
for (let i = 0; i < cellCount; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  overlay.appendChild(cell);
}

let isDragging = false;

function reveal(e) {
  const p = e.touches ? e.touches[0] : e;
  const t = document.elementFromPoint(p.clientX, p.clientY);
  if (t?.classList.contains("cell")) {
    t.style.opacity = 0;
  }
}

// PC操作
overlay.addEventListener("mousedown", () => isDragging = true);
document.addEventListener("mouseup", () => isDragging = false);
overlay.addEventListener("mousemove", e => isDragging && reveal(e));

// スマホ操作
overlay.addEventListener("touchstart", e => { isDragging = true; reveal(e); });
overlay.addEventListener("touchend", () => isDragging = false);
overlay.addEventListener("touchmove", reveal);
