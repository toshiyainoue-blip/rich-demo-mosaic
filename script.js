const overlay = document.getElementById("overlay");
const cols = 25;
const rows = 30;
const cellCount = cols * rows;

// Mosaicセル生成
for (let i = 0; i < cellCount; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  overlay.appendChild(cell);
}

let isDragging = false;

// 🔥 ブラシ範囲（1 → 3x3、2 → 5x5、3 → 7x7…）
const brushRange = 1;

// 🔥 ブラシ範囲で複数セルを消す関数
function revealArea(target, range = 1) {
  if (!target.classList.contains("cell")) return;

  const cells = [...document.querySelectorAll(".cell")];
  const index = cells.indexOf(target);

  const x = index % cols;
  const y = Math.floor(index / cols);

  for (let dy = -range; dy <= range; dy++) {
    for (let dx = -range; dx <= range; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < cols && ny < rows) {
        const nIndex = ny * cols + nx;
        cells[nIndex].style.opacity = 0;
      }
    }
  }
}

function reveal(e) {
  const p = e.touches ? e.touches[0] : e;
  const t = document.elementFromPoint(p.clientX, p.clientY);
  if (t?.classList.contains("cell")) {
    revealArea(t, brushRange); // ← 今までの1セル消しを範囲消しに変更
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
