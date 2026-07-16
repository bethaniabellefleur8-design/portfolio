// ==================== 1. GÉNÉRATEUR DE CITATIONS (API) ====================
// Fonction pour récupérer une citation aléatoire depuis l'API gratuite DummyJSON
function chargerCitation() {
    fetch('https://dummyjson.com/quotes/random') // Appelle l'API en ligne
    .then(reponse => reponse.json()) // Transforme la réponse brute en format JSON exploitable
    .then(data => {
        // Insère le texte et l'auteur de la citation reçue dans le code HTML
        document.getElementById('texte-citation').innerText = `"${data.quote}"`;
        document.getElementById('auteur-citation').innerText = `- ${data.author}`;
    })
    .catch(erreur => console.log("Erreur de chargement de l'API :", erreur));
}

// Charger une première citation automatiquement dès l'ouverture du site
chargerCitation();


// ==================== 2. APPLICATION TODO LIST (AVEC LOCALSTORAGE) ====================
// Au démarrage, charger les tâches déjà enregistrées dans le navigateur, ou créer un tableau vide
let tableauTaches = JSON.parse(localStorage.getItem('taches')) || [];

// Fonction pour afficher visuellement les tâches à l'écran
function afficherTaches() {
    const listeUL = document.getElementById('todo-liste');
    listeUL.innerHTML = ''; // Vide la liste actuelle avant de la reconstruire
    
    // Parcourt le tableau et crée un élément HTML <li> pour chaque tâche
    tableauTaches.forEach((tache, index) => {
        listeUL.innerHTML += `<li>${tache} <button onclick="supprimerTache(${index})">X</button></li>`;
    });
}

// Fonction pour ajouter une nouvelle tâche écrite par l'utilisateur
function ajouterTache() {
    const input = document.getElementById('todo-input');
    if (input.value.trim() !== '') { // Vérifie que la case n'est pas vide
        tableauTaches.push(input.value); // Ajoute la tâche au tableau
        localStorage.setItem('taches', JSON.stringify(tableauTaches)); // Sauvegarde dans la mémoire du navigateur
        input.value = ''; // Vide la zone de texte
        afficherTaches(); // Met à jour l'affichage
    }
}

// Fonction pour supprimer une tâche grâce à son index (sa position dans la liste)
function supprimerTache(index) {
    tableauTaches.splice(index, 1); // Retire 1 élément à la position 'index'
    localStorage.setItem('taches', JSON.stringify(tableauTaches)); // Sauvegarde le tableau mis à jour
    afficherTaches(); // Met à jour l'affichage
}

// Afficher les tâches sauvegardées dès le chargement de la page
afficherTaches();