console.clear();

document.addEventListener("DOMContentLoaded", () => {

  const containers = document.querySelectorAll(".linked-list");

  containers.forEach((container, index) => {

    const leftList = container.querySelector(".list.left");
    const rightList = container.querySelector(".list.right");
    const svg = container.querySelector("svg");

    if (!leftList || !rightList || !svg) return;

    // =============================
    // ADD ARROW MARKERS (UNICI PER OGNI BLOCCO)
    // =============================
    function addArrowMarker() {

      if (svg.querySelector("marker")) return;

      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

      const redId = `arrow-promessi-${index}`;
      const blueId = `arrow-novios-${index}`;

      // 🔴 PROMESSI
      const markerRed = document.createElementNS("http://www.w3.org/2000/svg", "marker");
      markerRed.setAttribute("id", redId);
      markerRed.setAttribute("viewBox", "0 0 10 10");
      markerRed.setAttribute("refX", "10");
      markerRed.setAttribute("refY", "5");
      markerRed.setAttribute("markerWidth", "6");
      markerRed.setAttribute("markerHeight", "6");
      markerRed.setAttribute("orient", "auto");

      const pathRed = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathRed.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
      pathRed.setAttribute("fill", "#3498db");

      markerRed.appendChild(pathRed);
      defs.appendChild(markerRed);

      // 🔵 NOVIOS
      const markerBlue = document.createElementNS("http://www.w3.org/2000/svg", "marker");
      markerBlue.setAttribute("id", blueId);
      markerBlue.setAttribute("viewBox", "0 0 10 10");
      markerBlue.setAttribute("refX", "10");
      markerBlue.setAttribute("refY", "5");
      markerBlue.setAttribute("markerWidth", "6");
      markerBlue.setAttribute("markerHeight", "6");
      markerBlue.setAttribute("orient", "auto");

      const pathBlue = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathBlue.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
      pathBlue.setAttribute("fill", "#e74c3c");

      markerBlue.appendChild(pathBlue);
      defs.appendChild(markerBlue);

      svg.appendChild(defs);
    }

    function makePath(d, color, markerId) {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d);
      p.setAttribute("stroke", color);
      p.setAttribute("fill", "transparent");
      p.setAttribute("stroke-width", 2);
      p.setAttribute("marker-end", `url(#${markerId})`);
      return p;
    }

    // =============================
    // DRAW LINKS
    // =============================
    function drawLinks() {

      svg.querySelectorAll("path").forEach(p => p.remove());

      const checkboxes = leftList.querySelectorAll("input[type=checkbox]");
      const svgRect = svg.getBoundingClientRect();

      checkboxes.forEach(cb => {

        // assegna target alla prima selezione
        if (cb.checked && !cb.dataset.target) {
          const selectedRadio = rightList.querySelector("input[type=radio]:checked");
          if (selectedRadio) {
            cb.dataset.target = selectedRadio.value;
          }
        }

        // se deselezionata
        if (!cb.checked) {
          delete cb.dataset.target;
          return;
        }

        if (!cb.dataset.target) return;

        const targetRadio = rightList.querySelector(
          `input[type=radio][value="${cb.dataset.target}"]`
        );

        if (!targetRadio) return;

        const cbRect = cb.closest("li").getBoundingClientRect();
        const radioRect = targetRadio.closest("li").getBoundingClientRect();

        const startX = cbRect.right - svgRect.left;
        const startY = cbRect.top + cbRect.height / 2 - svgRect.top;

        const endX = radioRect.left - svgRect.left;
        const endY = radioRect.top + radioRect.height / 2 - svgRect.top;

        const midX = (startX + endX) / 2;
        const deltaY = endY - startY;

        const maxRadius = 25;
        const radius = Math.min(maxRadius, Math.abs(midX - startX));

        // 🎨 COLORE + MARKER
        let color, markerId;

        if (cb.dataset.target === "promessi") {
  // 🔵 PROMESSI
  color = "#3498db";
  markerId = `arrow-promessi-${index}`;
} else {
  // 🔴 NOVIOS
  color = "#e74c3c";
  markerId = `arrow-novios-${index}`;
}

        // linea dritta
        if (Math.abs(deltaY) < 2) {
          svg.appendChild(
            makePath(`M ${startX},${startY} L ${endX},${endY}`, color, markerId)
          );
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
        ].join(" ");

        svg.appendChild(makePath(d, color, markerId));
      });
    }

    // =============================
    // EVENTS
    // =============================
    leftList.addEventListener("change", drawLinks);
    rightList.addEventListener("change", drawLinks);
    window.addEventListener("resize", drawLinks);

    // =============================
    // INIT
    // =============================
    addArrowMarker();
    drawLinks();

  });

});

document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".linked-list");

  containers.forEach((container, index) => {
    const leftList = container.querySelector(".list.left");
    const rightList = container.querySelector(".list.right");
    const svg = container.querySelector("svg");
    
    // Trova i pulsanti relativi a questa sezione (sono i successivi nel DOM)
    const checkBtn = container.nextElementSibling; // Se il bottone è subito dopo il div
    // Se i bottoni sono più avanti o raggruppati, meglio cercarli così:
    const parentSection = container.closest('section');
    const btnCheck = parentSection.querySelector(".check-btn");
    const btnTry = parentSection.querySelector(".try-btn");

    if (!leftList || !rightList || !svg) return;

    // --- TUA FUNZIONE addArrowMarker ---
    addArrowMarker(svg, index);

    // --- TUA FUNZIONE drawLinks ---
    function drawLinks() {
      svg.querySelectorAll("path").forEach(p => p.remove());
      const checkboxes = leftList.querySelectorAll("input[type=checkbox]");
      const svgRect = svg.getBoundingClientRect();

      checkboxes.forEach(cb => {
        if (cb.checked && !cb.dataset.target) {
          const selectedRadio = rightList.querySelector("input[type=radio]:checked");
          if (selectedRadio) cb.dataset.target = selectedRadio.value;
        }
        if (!cb.checked) { delete cb.dataset.target; return; }
        if (!cb.dataset.target) return;

        const targetRadio = rightList.querySelector(`input[type=radio][value="${cb.dataset.target}"]`);
        if (!targetRadio) return;

        const cbRect = cb.closest("li").getBoundingClientRect();
        const radioRect = targetRadio.closest("li").getBoundingClientRect();

        const startX = cbRect.right - svgRect.left;
        const startY = cbRect.top + cbRect.height / 2 - svgRect.top;
        const endX = radioRect.left - svgRect.left;
        const endY = radioRect.top + radioRect.height / 2 - svgRect.top;

        let color = cb.dataset.target === "promessi" ? "#3498db" : "#e74c3c";
        let markerId = `arrow-${cb.dataset.target}-${index}`;
        
        const d = `M ${startX},${startY} L ${endX},${endY}`; // Esempio linea semplice
        svg.appendChild(makePath(d, color, markerId));
      });
    }

    // =============================
    // NUOVA LOGICA: CONTROLLO RISPOSTE
    // =============================
    if (btnCheck) {
      btnCheck.addEventListener("click", () => {
        const checkboxes = leftList.querySelectorAll("input[type=checkbox]");
        let allCorrect = true;
        let answered = 0;

        checkboxes.forEach(cb => {
          const li = cb.closest("li");
          if (cb.checked) {
            answered++;
            // Verifica se il valore del checkbox (risposta corretta) 
            // coincide con il target scelto (radio selezionato)
            if (cb.value === cb.dataset.target) {
              li.style.backgroundColor = "rgba(46, 204, 113, 0.2)"; // Verde
              li.style.border = "1px solid #2ecc71";
            } else {
              li.style.backgroundColor = "rgba(231, 76, 60, 0.2)"; // Rosso
              li.style.border = "1px solid #e74c3c";
              allCorrect = false;
            }
          } else {
            allCorrect = false;
          }
        });

        if (answered > 0) {
          btnCheck.style.display = "none";
          btnTry.style.display = "inline-block";
        } else {
          alert("Seleziona almeno un'opzione e un'opera prima di controllare!");
        }
      });
    }

    if (btnTry) {
      btnTry.addEventListener("click", () => {
        // Reset grafici
        leftList.querySelectorAll("input[type=checkbox]").forEach(cb => {
          cb.checked = false;
          delete cb.dataset.target;
          const li = cb.closest("li");
          li.style.backgroundColor = "transparent";
          li.style.border = "none";
        });
        rightList.querySelectorAll("input[type=radio]").forEach(rb => rb.checked = false);
        
        drawLinks();
        btnTry.style.display = "none";
        btnCheck.style.display = "inline-block";
      });
    }

    // Events esistenti
    leftList.addEventListener("change", drawLinks);
    rightList.addEventListener("change", drawLinks);
    window.addEventListener("resize", drawLinks);
    drawLinks();
  });
});

// Funzioni helper fuori dal loop o integrate
function makePath(d, color, markerId) {
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", d);
  p.setAttribute("stroke", color);
  p.setAttribute("fill", "transparent");
  p.setAttribute("stroke-width", 2);
  p.setAttribute("marker-end", `url(#${markerId})`);
  return p;
}

function addArrowMarker(svg, index) {
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const colors = { promessi: "#3498db", novios: "#e74c3c" };
  for (let key in colors) {
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", `arrow-${key}-${index}`);
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "10");
    marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "6");
    marker.setAttribute("markerHeight", "6");
    marker.setAttribute("orient", "auto");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
    path.setAttribute("fill", colors[key]);
    marker.appendChild(path);
    defs.appendChild(marker);
  }
  svg.appendChild(defs);
}