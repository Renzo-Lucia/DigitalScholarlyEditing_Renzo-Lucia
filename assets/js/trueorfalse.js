
var currentCategory= ['General','History', 'Spanish_reception', 'El_Europeo', 'Spanish_translations','Los_novios', 'Differences','writers'];
var Questions= [
	// store answer with questions for easier retrieval
	{ category: 'General', question : 'I promessi sposi is a historical novel written by Alessandro Manzoni.', answer: true },
	{ category: 'General', question: 'The novel is set in the Duchy of Milan during Spanish rule in the 17th century.', answer: true },
	{ category: 'General', question: 'Renzo and Lucia are able to get married immediately without any obstacles.', answer: false },
	{ category: 'General', question: 'The plague of 1630 is a central element of the novel and is described in a realistic and dramatic way.', answer: true },
	{ category: 'General', question: 'Don Abbondio represents a model of courage and strong moral integrity.', answer: false },
	{ category: 'General', question: 'Manzoni explores themes such as the injustice of legal systems and the illusory nature of political power.', answer: true },
	
    { category: 'History', question: 'I promessi sposi was first published in a single definitive edition in 1827.', answer: false },
    { category: 'History', question: 'The final version of the novel was published between 1840 and 1842.', answer: true },
    { category: 'History', question: 'From its first publication, the novel enjoyed wide international circulation.', answer: true },
    { category: 'History', question: 'The earliest foreign editions were always faithful to Manzoni’s original text.', answer: false },
    { category: 'History', question: 'Manzoni suffered from pirated editions and unreliable translations.', answer: true },

	{category: 'Spanish_reception', question: 'Catalonia provided a culturally receptive environment for I promessi sposi.', answer: true }, 
    {category: 'Spanish_reception', question: 'Bonaventura Carles Aribau played an important role in the Spanish reception of Manzoni’s novel.', answer: true }, 
    {category: 'Spanish_reception', question: 'Aribau read I promessi sposi only after the first Castilian translation was published.', answer: false }, 
    {category: 'Spanish_reception', question: 'Oda a la patria by Aribau contains explicit echoes of Manzoni’s “Addio, monti”.', answer: true }, 
    {category: 'Spanish_reception', question: 'Italian political exiles contributed to the spread of Romantic ideas in Catalonia.', answer: true }, 
    {category: 'Spanish_reception', question: 'The journal El Europeo played only a marginal role in Catalan Romanticism.', answer: false }, 

	{category: 'El_Europeo', question: 'El Europeo was published between 1823 and 1824.', answer: true }, 
    {category: 'El_Europeo', question: 'Luigi Monteggia wrote the article Romanticismo for El Europeo.', answer: true }, 
    {category: 'El_Europeo', question: 'In Romanticismo, Manzoni is presented alongside figures such as Byron and Schlegel.', answer: true }, 
    {category: 'El_Europeo', question: 'Il Conte di Carmagnola is mentioned as an example of modern Romantic drama.', answer: true }, 
    {category: 'El_Europeo', question: 'Monteggia’s aim was to isolate Manzoni from the broader European literary context.', answer: false }, 


	{category: 'spanish_translations', question: 'The first Castilian translation of the novel was Los novios by Juan Nicasio Gallego.', answer: false },
    {category: 'spanish_translations', question: 'Lorenzo o Los prometidos esposos by Félix Enciso Castrillón was published in 1833.', answer: true },
    {category: 'spanish_translations', question: 'Castrillón admitted to removing passages critical of Spain because of censorship.', answer: true },
    {category: 'spanish_translations', question: 'Spanish translations were influenced by ideological and religious concerns.', answer: true },
    {category: 'spanish_translations', question: 'Censorship mainly targeted positive representations of the clergy.', answer: false },

    { category: 'Los_novios', question : 'Los novios was published in 1836.', answer: true },
    { category: 'Los_novios', question : 'Juan Nicasio Gallego was a liberal priest and canon of Seville.', answer: true },
    { category: 'Los_novios', question : 'Los novios had little editorial success in Spain.', answer: false },
    { category: 'Los_novios', question : 'Gallego added proverbs and idiomatic expressions to adapt the text to Spanish readers.', answer: true },
    { category: 'Los_novios', question : 'Gallego fully preserved Manzoni’s authorial notes and metafictional passages.', answer: false },
    { category: 'Los_novios', question : 'Some translation choices significantly altered the meaning of key passages.', answer: true },
        
    { category: 'Differences', question: 'Manzoni aimed to combine literary language with spoken Italian.', answer: true },
    { category: 'Differences', question: 'Gallego used a more elevated and solemn style.', answer: true },
    { category: 'Differences', question: 'Irony is more prominent in Los novios than in I promessi sposi.', answer: false },
    { category: 'Differences', question: 'Gallego’s translation can be considered a form of cultural adaptation.', answer: true },
    { category: 'Differences', question: 'The differences between the two texts show that translation is a neutral and purely linguistic act.', answer: false },
	
    { category: 'Writers', question: 'Alessandro Manzoni wrote I promessi sposi as a symbol of the Italian Risorgimento and for its role in shaping modern Italian.', answer: true },
    { category: 'Writers', question: 'The definitive edition of I promessi sposi adopted the Florentine dialect to unify the Italian language.', answer: true },
    { category: 'Writers', question: 'Manzoni’s first version of the novel, Fermo e Lucia, was published after 1830.', answer: false },
    { category: 'Writers', question: 'Manzoni never revised the language of I promessi sposi after the first publication in 1827.', answer: false },

    { category: 'Writers', question: 'MaJuan Nicasio Gallego was a Spanish liberal priest who translated I promessi sposi into Spanish.', answer: true },
    { category: 'Writers', question: 'Gallego admired I promessi sposi for its religious and civic themes, aligning with his worldview.', answer: true },
    { category: 'Writers', question: 'Gallego never held any official ecclesiastical or literary position in Spain.', answer: true },
    { category: 'Writers', question: 'He was imprisoned and exiled due to his liberal ideas during the reign of Ferdinand VII.', answer: true },
    
    

    

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

    document.getElementById('points').innerHTML= 'Points: ' + points;
    document.getElementById('count').innerHTML= 'Question ' + (count + 1) + ' / 20';

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
