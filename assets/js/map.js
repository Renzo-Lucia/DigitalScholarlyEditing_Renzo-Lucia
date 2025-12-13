import { Pin } from './pin.js';

// Crea la mappa centrata sulla Lombardia
var map = L.map('map').setView([45.5, 9.5], 8); 

// Aggiungi il layer della mappa
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  attribution: 'Map tiles by Stamen Design | Data © OpenStreetMap contributors'
}).addTo(map);

// Crea la classe di icone personalizzate (senza shadow)
var LeafIcon = L.Icon.extend({
  options: {
    iconSize: [60, 85],
    iconAnchor: [19, 55], // centro basso
    popupAnchor: [0, -50]
  }
});

// Crea le icone
var SpotIcon  = new LeafIcon({ iconUrl: '<i class="bi bi-geo-alt-fill"></i>' });



let array_pin = [

  new Pin("Adda River",
    45.74725, 9.45515, 
    SpotIcon, 
    "Adda River", 
    "references", 
    "#"),

  new Pin("Como Lake", 
        46.01604, 9.25716, 
        SpotIcon, 
        "Como Lake", 
        "references", 
        "#"),

   new Pin("Resegone Mountain", 
    45.85833, 9.46888, 
    SpotIcon, 
    "Resegone", 
    "references", 
    "#"), 


   new Pin("Lecco", 
    45.85833, 9.46888, 
    SpotIcon, 
    "Lecco", 
    "references", 
    "#"),

   new Pin("San Martino Mountain", 
    45.94444, 9.38749, 
    SpotIcon, 
    "San Martino Mountain", 
    "references", 
    "#"),
];
 
// Aggiungi i marker
 
array_pin.forEach(element => {
  let html = "<h1>"+element.title+"</h1><p>"+element+"</p><b>"+element.place+"</b><br>"; 
  L.marker([element.lat, element.lon], { icon: element.icon }).addTo(map).bindPopup(html);
  });

  import { Pin } from './pin.js';

// Crea la mappa centrata sulla Lombardia
var map = L.map('map').setView([45.5, 9.5], 8); 

// Aggiungi il layer della mappa
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  attribution: 'Map tiles by Stamen Design | Data © OpenStreetMap contributors'
}).addTo(map);

// Crea la classe di icone personalizzate (senza shadow)
var LeafIcon = L.Icon.extend({
  options: {
     iconSize: [30, 40],
  iconAnchor: [20, 55],
  popupAnchor: [0, -50]
  }
});

// Crea le icone
var RenzoeLuciaIcon  = new LeafIcon({ iconUrl: 'images/renzoeluciamap-marker.png' });
var RenzoIcon   = new LeafIcon({ iconUrl: 'images/renzomap-marker.png' });
var LuciaIcon = new LeafIcon({ iconUrl: 'images/luciamap-marker.png' });

 
// Aggiungi i marker


let characterMarkers = [];

array_pin.forEach(element => {
  let html = `<h1>${element.title}</h1><p>${element.description}</p><b>${element.place}</b><br>`; 

  let marker = L.marker([element.lat, element.lon], { icon: element.icon }).bindPopup(html);

  marker.addTo(map);
  
  // assegna ruolo in automatico
  if (element.icon === RenzoIcon) marker.role = "renzo";
  else if (element.icon === LuciaIcon) marker.role = "lucia";
  else marker.role = "together";

  characterMarkers.push(marker);
});

var PlaceholderIcon = new L.Icon({
  iconUrl: 'images/map-marker.png',
  iconSize: [30, 40],
  iconAnchor: [20, 55],
  popupAnchor: [0, -50]
});

// === PLACEHOLDERS ===
let stores = [
  { 
    name: "Adda River",
    description: "The Adda River, where Lake Como narrows into a flowing waterway, sets the stage for Renzo and Lucia’s escape...",
    icon: PlaceholderIcon,
    location: { lat: 45.74725, lng: 9.45515 },
    url: "places.html",
    marker: null
  },
  { 
    name: "Como Lake",
    description: "Lake Como opens the novel with its striking southern branch, framed by two mountain chains and scattered with coves and headlands...",
    icon: PlaceholderIcon,
    location: { lat: 46.01604, lng: 9.25716 },
    url: "places.html",
    marker: null
  },
  { 
    name: "Lecco",
    description: "Lecco stands on the shore of Lake Como at the foot of the mountains, sometimes even touching the water when its level rises...",
    icon: PlaceholderIcon,
    location: { lat: 45.85833, lng: 9.46888 },
    url: "places.html",
    marker: null
  },
  { 
    name: "Milan",
    description: "Milan, the heart of Spanish-ruled Lombardy, embodies the novel’s world of authority, privilege, and corruption...",
    icon: PlaceholderIcon,
    location: { lat: 45.46896, lng: 9.18562 },
    url: "places.html",
    marker: null
  },
  { 
    name: "Monza",
    description: "In Monza, Lucia and Agnese find refuge after fleeing from Don Rodrigo’s threats...",
    icon: PlaceholderIcon,
    location: { lat: 45.58457, lng: 9.27529 },
    url: "places.html",
    marker: null
  },
  { 
    name: "Pescarenico",
    description: "Lucia first reaches Father Cristoforo’s convent in Pescarenico, a small village on the left bank of the Adda River, near the bridge and the road from Lecco to Bergamo...",
    icon: PlaceholderIcon,
    location: { lat: 45.84383, lng: 9.39918 },
    url: "places.html",
    marker: null
  },
  {
    name: "Village",
    description: "The village, located on the southeastern branch of Lake Como and near Lecco in the Lecco territory, provides a quiet rural setting....",
    icon: PlaceholderIcon,
    location: { lat: 45.86154, lng: 9.40307 },
    url: "places.html",
    marker: null
  },
];


stores.forEach(s => {
  s.marker = L.marker([s.location.lat, s.location.lng], { icon: s.icon }).addTo(map);
  s.marker.bindPopup(`
    <b>${s.name}</b><br>
    <p>${s.description}</p>
    <a href="${s.url}" target="_blank">Discover more →</a>
  `);
});

// --- FILTRO LUOGHI ---
let selectPlace = document.querySelector('#select-place');
if (selectPlace) {
  selectPlace.addEventListener('change', function() {
    let selected = this.value;

    stores.forEach(store => {
      if (selected === "all" || store.name === selected) {
        if (!map.hasLayer(store.marker)) map.addLayer(store.marker);
      } else {
        if (map.hasLayer(store.marker)) map.removeLayer(store.marker);
      }
    });
  });
}

// --- FILTRO PERSONAGGI ---
let selectCharacters = document.getElementById("filterCharacters");

if (selectCharacters) {
  selectCharacters.addEventListener("change", function() {
    hideAllGroups(); // nasconde tutto

    let selected = this.value;

    characterMarkers.forEach(marker => {
      if (selected === "all" || marker.role === selected) {
        map.addLayer(marker);
      }
    });
  });
}
// --- ICONA CAPITOLI ---
var ChapterIconClass = L.Icon.extend({
  options: {
   iconSize: [30, 30],
  iconAnchor: [20, 55],
  popupAnchor: [0, -50]
  }
});

var ChapterIcon = new ChapterIconClass({ iconUrl: 'images/bookmark.png' });

// === CAPITOLI ===

let chapters = [
  { 
    name: "Chapter 1", 
    description: "Milano...",
    icon: ChapterIcon, 
    location: { lat: 45.46800152234619, lng: 9.172579318283827 }, 
    marker: null 
  },
  { 
    name: "Chapter 2", 
    description: "Don Abbondio faces new threats from Don Rodrigo...",
    icon: ChapterIcon, 
    location: { lat: 46.01604, lng: 9.25716 }, 
    marker: null 
  },
  { 
    name: "Chapter 3", 
    description: "Renzo seeks help from the lawyer Azzecca-garbugli in Lecco...",
    icon: ChapterIcon, 
    location: { lat: 45.85239355089179, lng: 9.395323986418157 }, 
    marker: null 
  },
  { 
    name: "Chapter 4", 
    description: "Pescarenico...",
    icon: ChapterIcon, 
    location: { lat: 45.8617748999375, lng: 9.40383838344044 }, 
    marker: null 
  },
  { 
    name: "Chapter 5", 
    description: "Renzo seeks help from the lawyer Azzecca-garbugli in Lecco...",
    icon: ChapterIcon, 
    location: { lat: 45.85833, lng: 9.46888 }, 
    marker: null 
  },
  { 
    name: "Chapter 6", 
    description: "Como Lake...",
    icon: ChapterIcon, 
    location: { lat: 45.861534, lng: 9.403804 },
    marker: null 
  },
  { 
    name: "Chapter 7", 
    description: "Renzo seeks help from the lawyer Azzecca-garbugli in Lecco...",
    icon: ChapterIcon, 
    location: { lat: 45.85833, lng: 9.46888 }, 
    marker: null 
  },
  { 
    name: "Chapter 8", 
    description: "Pescarenico...",
    icon: ChapterIcon, 
    location: { lat: 45.8617748999375, lng: 9.40383838344044 }, 
    marker: null 
  },
  { 
    name: "Chapter 9", 
    description: "Monza...",
    icon: ChapterIcon, 
    location: { lat: 45.58458072637012, lng: 9.27529928120986 }, 
    marker: null 
  },
  { 
    name: "Chapter 10", 
    description: "Monza...",
    icon: ChapterIcon, 
    location: { lat: 45.58458072637012, lng: 9.275299281209868 }, 
    marker: null 
  },
  { 
    name: "Chapter 11", 
    description: "Milano...",
    icon: ChapterIcon, 
    location: { lat: 45.46896, lng: 9.18562 }, 
    marker: null 
  },

  // ... continua per tutti
];
chapters.forEach(ch => {
  ch.marker = L.marker([ch.location.lat, ch.location.lng], { icon: ch.icon }).addTo(map);
  ch.marker.bindPopup(`<b>${ch.name}</b><p>${ch.description}</p>`);
});


// --- FILTRO CAPITOLI ---
let selectChapter = document.getElementById("filterChapter");
if (selectChapter) {
  selectChapter.addEventListener('change', function() {
    hideAllGroups(); // nasconde tutto

    let selectedNumber = this.value;

    chapters.forEach(ch => {
      let chapterNum = ch.name.split(" ")[1]; // ricava numero

      if (selectedNumber === "all" || selectedNumber === chapterNum) {
        map.addLayer(ch.marker);

        if (selectedNumber !== "all") {
          map.setView([ch.location.lat, ch.location.lng], 13);
          ch.marker.openPopup();
        }
      }
    });
  });
}


 // --- NASCONDI DI DEFAULT CHARACTERS & CHAPTERS ---
characterMarkers.forEach(marker => {
  if (map.hasLayer(marker)) map.removeLayer(marker);
});

chapters.forEach(ch => {
  if (map.hasLayer(ch.marker)) map.removeLayer(ch.marker);
});

// Imposta select default corretti
document.getElementById("select-place").value = "all";
document.getElementById("filterCharacters").value = "0";
document.getElementById("filterChapter").value = "0";



function hideAllGroups() {
  // nascondi tutti i places
  stores.forEach(store => {
    if (map.hasLayer(store.marker)) map.removeLayer(store.marker);
  });

  // nascondi tutti i characters
  characterMarkers.forEach(marker => {
    if (map.hasLayer(marker)) map.removeLayer(marker);
  });

  // nascondi tutti i chapters
  chapters.forEach(ch => {
    if (map.hasLayer(ch.marker)) map.removeLayer(ch.marker);
  });
}




// ---COLLEGAMENTO TESTO-MAPPA --
// Collega testo e mappa
document.querySelectorAll('.place').forEach(span => {
  span.addEventListener('click', function() {
    const placeName = this.dataset.place;
    const store = stores.find(s => s.name === placeName);
    if (store) {
      map.setView([store.location.lat, store.location.lng], 14);
      store.marker.openPopup();
    }
  });
});

// === Leggi query string ===
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const initialPlace = getQueryParam('place'); // es. "Milan"

// --- Mostra solo il luogo selezionato ---
stores.forEach(store => {
  if (!initialPlace || initialPlace === 'all' || store.name === initialPlace) {
    if (!map.hasLayer(store.marker)) map.addLayer(store.marker);
    if (store.name === initialPlace) {
      map.setView([store.location.lat, store.location.lng], 13); // zoom sul marker
      store.marker.openPopup();
    }
  } else {
    if (map.hasLayer(store.marker)) map.removeLayer(store.marker);
  }
});

// --- Aggiorna select ---
selectPlace = document.querySelector('#select-place');
if (selectPlace) {
  selectPlace.addEventListener('change', function() {
    hideAllGroups(); // nasconde tutto

    let selected = this.value;

    stores.forEach(store => {
      if (selected === "all" || store.name === selected) {
        map.addLayer(store.marker);
        if (store.name === selected && selected !== "all") {
          map.setView([store.location.lat, store.location.lng], 13);
          store.marker.openPopup();
        }
      }
    });
  });
}



var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
 
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
 
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
 
$(document).ready(function() {
 
  var place = getUrlParameter('place');
  var filterChapter = getUrlParameter('filterChapter');
  var filterCharacters = getUrlParameter('filterCharacters');
 
  if(place.length>0){
    $("#select-place").val(place);
  }
  if(filterChapter.length>0){
    $("#filterChapter").val(filterChapter);
  }
  if(filterCharacters.length>0){
    $("#filterCharacters").val(filterCharacters);
  }
 
});
 


  //timeline legend

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggle-legend');
  const legend = document.getElementById('map-legend');

  if (btn && legend) {
    btn.addEventListener('click', () => {
      legend.classList.toggle('hidden');
    });
  }
});
