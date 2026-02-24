const correctMatches = {
  1: "manzoni",
  3: "manzoni",
  5: "manzoni",
  7: "manzoni",
  9: "manzoni",
  11: "manzoni",
  13: "manzoni",
  14: "manzoni",

  2: "gallego",
  4: "gallego",
  6: "gallego",
  8: "gallego",
  10: "gallego",
  12: "gallego",
  15: "gallego"
};

console.clear();

// select elements
const container = document.getElementById('linked-list');
const leftList = container.querySelector('.list.left');
const rightList = container.querySelector('.list.right');
const svg = container.querySelector('#links');

// small helper for path creation
function makePath(d, color = '#333') {
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute('d', d);
  p.setAttribute('stroke', color); // colore dinamico
  p.setAttribute('fill', 'transparent');
  p.setAttribute('stroke-width', 2);
  p.style.stroke = color; // aggiungi anche lo style inline per forzare il colore
  return p;
}


const userMatches = {};

// redraw on UI changes
leftList.addEventListener('change', (e) => {
  if (e.target.type === "checkbox") {
    const cb = e.target;
    const selectedRadio = rightList.querySelector('input[type=radio]:checked');

    if (!selectedRadio) {
      alert("Select a work first before linking this item.");
      cb.checked = false;
      return;
    }

    // salva l'associazione nella mappa
    userMatches[cb.value] = selectedRadio.value === "1" ? "manzoni" : "gallego";

    drawLinks();
  }
});
rightList.addEventListener('change', drawLinks);
window.addEventListener('resize', drawLinks);

// initial render
function drawLinks() {
  svg.innerHTML = '';

  const checkboxes = leftList.querySelectorAll('input[type=checkbox]');

  checkboxes.forEach(cb => {
    if (!cb.checked || !userMatches[cb.value]) return;

    const li = cb.closest('li');
    const cbRect = li.getBoundingClientRect();


    const selectedWork = userMatches[cb.value];
    const color = selectedWork === "manzoni" ? "#007bff" : "#dc3545"; // blu o rosso
    const radio = selectedWork === "manzoni"
      ? rightList.querySelector('#radio-1')
      : rightList.querySelector('#radio-2');

    const radioRect = radio.closest("li").getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    

    const startX = cbRect.right - svgRect.left;
    const startY = cbRect.top + cbRect.height / 2 - svgRect.top;

    const endX = radioRect.left - svgRect.left;
    const endY = radioRect.top + radioRect.height / 2 - svgRect.top;

    const midX = (startX + endX) / 2;
    const deltaY = endY - startY;

    const maxRadius = 25;
    const radius = Math.min(maxRadius, Math.abs(midX - startX));

    if (Math.abs(deltaY) < 2) {
      svg.appendChild(makePath(`M ${startX},${startY} L ${endX},${endY}`));
      return;
    }

    const dir1 = startY < endY ? 1 : 0;
    const midStartY = startY + (dir1 ? radius : -radius);
    const midEndY = endY - (dir1 ? radius : -radius);
    const sweepFlag2 = endY > midEndY ? 0 : 1;

    const d = [
      `M ${startX},${startY}`,
      `A ${radius},${radius} 0 0,${dir1} ${midX},${midStartY}`,
      `L ${midX},${midEndY}`,
      `A ${radius},${radius} 0 0,${sweepFlag2} ${endX},${endY}`
    ].join(' ');

    if (Math.abs(deltaY) < 2) {
    svg.appendChild(makePath(`M ${startX},${startY} L ${endX},${endY}`, color));
    return;

}

// Linea curva
svg.appendChild(makePath(d, color));
  });
}

document.getElementById("checkAnswers").addEventListener("click", () => {
  const checkboxes = leftList.querySelectorAll('input[type=checkbox]');
  let totalChecked = 0;
  let wrongCount = 0;

  checkboxes.forEach(cb => {
    const li = cb.closest("li");
    li.classList.remove("correct", "wrong");

    if (!cb.checked || !userMatches[cb.value]) return;

    totalChecked++;
    const expected = correctMatches[cb.value];
    const selected = userMatches[cb.value];

    if (expected === selected) {
      li.classList.add("correct");
    } else {
      li.classList.add("wrong");
      wrongCount++;
    }
  });

  // Mostra punteggio
  alert(`Score: ${totalChecked - wrongCount} / ${totalChecked}`);

  // Mostra sempre il bottone Try Again
  const tryAgainBtn = document.getElementById("tryAgain");
  tryAgainBtn.style.display = "inline-block";

  // Se vuoi, puoi anche aggiungere alert se più della metà è sbagliato
  if (wrongCount > totalChecked / 2) {
    alert("More than half wrong! You can try again using the button below.");
  }
});

document.getElementById("tryAgain").addEventListener("click", () => {
  // Deseleziona tutti i checkbox
  leftList.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.checked = false;
  });

  // Resetta la mappa delle scelte
  for (let key in userMatches) delete userMatches[key];

  // Rimuovi classi corretto/sbagliato
  leftList.querySelectorAll('li').forEach(li => {
    li.classList.remove("correct", "wrong");
  });

  // Cancella linee SVG
  svg.innerHTML = '';
});





let activeCheckbox = null;