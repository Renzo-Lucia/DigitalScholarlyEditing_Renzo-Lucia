
var currentCategory= ['Generale','Storia', 'Ricezione_spagnola', 'El_Europeo', 'Traduzioni_spagnole','Los_novios', 'Differenze','Autori'];
var Questions= [
	// salva le domande con le risposte per un recupero più facile
{ category: 'Generale', question : '<em>I promessi sposi</em> è un romanzo storico scritto da Alessandro Manzoni.', answer: true },
{ category: 'Generale', question: 'Il romanzo è ambientato nel Ducato di Milano sotto il dominio spagnolo nel XVII secolo.', answer: true },
{ category: 'Generale', question: 'Renzo e Lucia riescono a sposarsi subito senza alcun ostacolo.', answer: false },
{ category: 'Generale', question: 'La peste del 1630 è un elemento centrale del romanzo e viene descritta in modo realistico e drammatico.', answer: true },
{ category: 'Generale', question: 'Don Abbondio rappresenta un modello di coraggio e integrità morale.', answer: false },
{ category: 'Generale', question: 'Manzoni esplora temi come l’ingiustizia dei sistemi legali e l’illusorietà del potere politico.', answer: true },

{ category: 'Storia', question: '<em>I promessi sposi</em> fu pubblicato per la prima volta in un’edizione definitiva unica nel 1827.', answer: false },
{ category: 'Storia', question: 'La versione finale del romanzo fu pubblicata tra il 1840 e il 1842.', answer: true },
{ category: 'Storia', question: 'Fin dalla prima pubblicazione, il romanzo ebbe ampia circolazione internazionale.', answer: true },
{ category: 'Storia', question: 'Le prime edizioni straniere furono sempre fedeli al testo originale di Manzoni.', answer: false },
{ category: 'Storia', question: 'Manzoni dovette affrontare edizioni pirata e traduzioni poco affidabili.', answer: true },

{ category: 'Ricezione_spagnola', question: 'La Catalogna offriva un contesto culturalmente ricettivo per <em>I promessi sposi</em>.', answer: true }, 
{ category: 'Ricezione_spagnola', question: 'Bonaventura Carles Aribau svolse un ruolo importante nella ricezione spagnola del romanzo di Manzoni.', answer: true }, 
{ category: 'Ricezione_spagnola', question: 'Aribau lesse <em>I promessi sposi</em> solo dopo la pubblicazione della prima traduzione in castigliano.', answer: false }, 
{ category: 'Ricezione_spagnola', question: '<em>Oda la Pàtria</em> di Aribau contiene echi espliciti del <em>“Addio, monti”</em> di Manzoni.', answer: true }, 
{ category: 'Ricezione_spagnola', question: 'Gli esuli politici italiani contribuirono alla diffusione delle idee romantiche in Catalogna.', answer: true }, 
{ category: 'Ricezione_spagnola', question: 'Il giornale <em>El Europeo</em> ebbe solo un ruolo marginale nel Romanticismo catalano.', answer: false }, 

{ category: 'El_Europeo', question: '<em>El Europeo</em> fu pubblicato tra il 1823 e il 1824.', answer: true }, 
{ category: 'El_Europeo', question: 'Luigi Monteggia scrisse l’articolo per <em>El Europeo</em>.', answer: true }, 
{ category: 'El_Europeo', question: 'Durante il Romanticismo, Manzoni viene presentato insieme a figure come Byron e Schlegel.', answer: true }, 
{ category: 'El_Europeo', question: '<em>Il Conte di Carmagnola</em> è citato come esempio di dramma romantico moderno.', answer: true }, 
{ category: 'El_Europeo', question: 'L’obiettivo di Monteggia era isolare Manzoni dal contesto letterario europeo più ampio.', answer: false }, 

{ category: 'Traduzioni_spagnole', question: 'La prima traduzione castigliana del romanzo fu <em>Los novios</em> di Juan Nicasio Gallego.', answer: false },
{ category: 'Traduzioni_spagnole', question: '<em>Lorenzo</em> o <em>Los prometidos</em> esposos di Félix Enciso Castrillón fu pubblicato nel 1833.', answer: true },
{ category: 'Traduzioni_spagnole', question: 'Castrillón ammise di aver rimosso passaggi critici verso la Spagna per motivi di censura.', answer: true },
{ category: 'Traduzioni_spagnole', question: 'Le traduzioni spagnole furono influenzate da motivi ideologici e religiosi.', answer: true },
{ category: 'Traduzioni_spagnole', question: 'La censura mirava soprattutto alle rappresentazioni positive del clero.', answer: false },

{ category: 'Los_novios', question : '<em>Los novios</em> fu pubblicato nel 1836.', answer: true },
{ category: 'Los_novios', question : 'Juan Nicasio Gallego era un sacerdote liberale e canonico di Siviglia.', answer: true },
{ category: 'Los_novios', question : '<em>Los novios</em> ebbe poco successo editoriale in Spagna.', answer: false },
{ category: 'Los_novios', question : 'Gallego aggiunse proverbi ed espressioni idiomatiche per adattare il testo ai lettori spagnoli.', answer: true },
{ category: 'Los_novios', question : 'Gallego preservò integralmente le note dell’autore e i passaggi metanarrativi di Manzoni.', answer: false },
{ category: 'Los_novios', question : 'Alcune scelte di traduzione modificarono in modo significativo il significato di passaggi chiave.', answer: true },
        
{ category: 'Differenze', question: 'Manzoni mirava a combinare il linguaggio letterario con l’italiano parlato.', answer: true },
{ category: 'Differenze', question: 'Gallego utilizzò uno stile più elevato e solenne.', answer: true },
{ category: 'Differenze', question: 'L’ironia è più evidente in <em>Los novios</em> che in <em>I promessi sposi</em>.', answer: false },
{ category: 'Differenze', question: 'La traduzione di Gallego può essere considerata una forma di adattamento culturale.', answer: true },
{ category: 'Differenze', question: 'Le differenze tra i due testi mostrano che la traduzione è un atto neutro e puramente linguistico.', answer: false },
	
{ category: 'Autori', question: 'Alessandro Manzoni scrisse <em>I promessi sposi</em> come simbolo del Risorgimento italiano e per il suo ruolo nella formazione dell’italiano moderno.', answer: true },
{ category: 'Autori', question: 'L’edizione definitiva di <em>I promessi sposi</em> adottò il dialetto fiorentino per unificare la lingua italiana.', answer: true },
{ category: 'Autori', question: 'La prima versione del romanzo di Manzoni, <em>Fermo e Lucia</em>, fu pubblicata dopo il 1830.', answer: false },
{ category: 'Autori', question: 'Manzoni non revisionò mai la lingua de <em>I promessi sposi</em> dopo la prima pubblicazione del 1827.', answer: false },

{ category: 'Autori', question: 'Juan Nicasio Gallego era un sacerdote liberale spagnolo che tradusse <em>I promessi sposi</em> in spagnolo.', answer: true },
{ category: 'Autori', question: 'Gallego ammirava <em>I promessi sposi</em> per i suoi temi religiosi e civici, in linea con la sua visione del mondo.', answer: true },
{ category: 'Autori', question: 'Gallego non ricoprì mai alcuna posizione ecclesiastica o letteraria ufficiale in Spagna.', answer: false },
{ category: 'Autori', question: 'Fu imprigionato ed esiliato a causa delle sue idee liberali durante il regno di Ferdinando VII.', answer: true },

    

];

// when declared over here other functions will see it; it's not best practice to register them in global/window scope, but better than nothing ;)
var count = 0;
var points = 0; 
var category;
var question;

//show answer buttons only after clicking start button
function showButtons(){
	document.getElementById('answerT').style.display="";
	document.getElementById('answerF').style.display="";
}

// choose a category and a question
function catAndQuest() {
	start.style.display = 'none';
	showButtons();

	document.getElementById('points').innerHTML= 'Points: ' + (points);
	document.getElementById('count').innerHTML= 'Question ' + (++count) + ' / 20';
    
	currentCategory = Questions.map(function(question) {
    	return question.category;
    });
	category = currentCategory[Math.floor(Math.random() * currentCategory.length)];
	document.getElementById('category').innerHTML = ''; // nasconde la categoria

	var questionList= Questions.filter( function (question){
		return question.category === category;
	});

	question = questionList[Math.floor(Math.random() * questionList.length)];
	document.getElementById('quest').innerHTML= question.question;
}

// create a copy of Questions array
var copy = [].concat(Questions);

// delete used question out of the copy array
function deleteUsed (){
	if(Questions.length > 0) {
		Questions.splice(Questions.indexOf(question),1);
	} else {
		document.getElementById('answerT').style.display="none";
		document.getElementById('answerF').style.display="none";
		document.getElementById('questions').style.display="none";
		document.getElementById('looser').style.display="";
		document.getElementById('reset').style.display="";
	}
}

//user answered question
function answer(value){
	deleteUsed();
	if(value === question.answer) {
		points++;
		if(points==10){
			document.getElementById('answerT').style.display="none";
			document.getElementById('answerF').style.display="none";
			document.getElementById('questions').style.display="none";
			document.getElementById('winner').style.display="";
			document.getElementById('reset').style.display="";
		}
	}	
	catAndQuest();
}

//restart the game
function restart(){
	document.location.href="";
}


function catAndQuest() {
    // se abbiamo già fatto 20 domande, termina il quiz
    if (count >= 20) {
        endQuiz();
        return;
    }

    start.style.display = 'none';
    showButtons();

    document.getElementById('points').innerHTML= 'Punti: ' + points;
    document.getElementById('count').innerHTML= 'Domanda ' + (count + 1) + ' / 20';

    // scegli una domanda casuale dall'array rimanente
    var index = Math.floor(Math.random() * Questions.length);
    question = Questions[index];
    document.getElementById('quest').innerHTML= question.question;

    // rimuove la domanda scelta dall'array per non riproporla
    Questions.splice(index, 1);

    count++;
}

function answer(value) {
    if(value === question.answer) {
        points++;
    }

    // se punti raggiunti per vincere
    if(points >= 10){
        endQuiz(true);
        return;
    }

    // se domande finite
    if(count >= 20){
        endQuiz(false);
        return;
    }

    // altrimenti continua con la prossima domanda
    catAndQuest();
}

function endQuiz(win){
    document.getElementById('answerT').style.display="none";
    document.getElementById('answerF').style.display="none";
    document.getElementById('questions').style.display="none";
    document.getElementById('reset').style.display="";

    if(win || points >= 10){
        document.getElementById('winner').style.display="";
    } else {
        document.getElementById('looser').style.display="";
    }
}
