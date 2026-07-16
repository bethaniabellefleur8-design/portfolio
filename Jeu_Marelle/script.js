// --- VARIABLES GLOBALES ---
let niveauActuel = 1; // Représente l'étape en cours (de 1 à 10) et la case où se trouve le caillou
let etapeSaut = 1;    // Le numéro de la case sur laquelle le joueur doit sauter
let jeuEnCours = false; 
let tempsRestant = 2; // Difficulté : 2 secondes maximum par saut
let chrono;           // Variable qui va stocker le compte à rebours

// Fonction pour démarrer un niveau et positionner le caillou
function lancerTour() {
    if (niveauActuel > 10) niveauActuel = 1; // Recommence à 1 si les 10 niveaux sont finis
    nettoyerTableau(); // Efface les couleurs du tour précédent
    etapeSaut = 1;     // Réinitialise le premier saut à la case 1
    
    // RÈGLE : Si le caillou est sur la case 1, le premier saut obligatoire se fait sur la case 2
    if (etapeSaut === niveauActuel) {
        etapeSaut = 2;
    }

    jeuEnCours = true;
    
    // Place le caillou visuellement sur la case du niveau en cours
    document.getElementById(`case-${niveauActuel}`).innerText = "🪨";
    document.getElementById('statut').innerText = `Niveau ${niveauActuel}/10. Sautez de 1 à 10 en évitant la case ${niveauActuel} !`;
    
    demarrerChrono(); // Active la difficulté de temps
}

// Fonction du chronomètre (Gestion de la difficulté)
function demarrerChrono() {
    clearInterval(chrono); // Arrête le chronomètre précédent s'il y en avait un
    tempsRestant = 2;      // Donne 2 secondes au joueur
    document.getElementById('timer').innerText = `Temps restant : ${tempsRestant}s`;
    
    // Déclenche un décompte toutes les 1 seconde (1000 millisecondes)
    chrono = setInterval(() => {
        tempsRestant--;
        document.getElementById('timer').innerText = `Temps restant : ${tempsRestant}s`;
        
        // Si le temps arrive à zéro, le joueur perd la partie
        if (tempsRestant <= 0) {
            clearInterval(chrono);
            document.getElementById('statut').innerText = "Perdu ! Temps écoulé, vous avez perdu l'équilibre ! ⏱️❌";
            jeuEnCours = false;
        }
    }, 1000);
}

// Fonction déclenchée à chaque clic sur une case
function clicCase(numeroCase) {
    if (!jeuEnCours) return; // Bloque le clic si le jeu n'est pas lancé

    // RÈGLE STRICTE 1 : Si on clique sur la case contenant le caillou, on perd
    if (numeroCase === niveauActuel) {
        clearInterval(chrono);
        document.getElementById('statut').innerText = "Perdu ! Vous avez marché sur le caillou ! ❌";
        jeuEnCours = false;
        return;
    }

    // RÈGLE STRICTE 2 : Le joueur doit suivre l'ordre numérique exact (étape par étape)
    if (numeroCase === etapeSaut) {
        // Colore la case validée en vert
        document.getElementById(`case-${numeroCase}`).style.backgroundColor = "#2ecc71";
        etapeSaut++; // Prépare l'étape suivante

        // RÈGLE STRICTE 3 : Si l'étape suivante est la case du caillou, on la saute automatiquement
        if (etapeSaut === niveauActuel) {
            etapeSaut++;
        }

        // Victoire du niveau : Si on a dépassé la case 10, on atteint le Ciel
        if (etapeSaut > 10) {
            clearInterval(chrono); // Arrête le temps
            document.getElementById('case-ciel').style.backgroundColor = "#2ecc71";
            jeuEnCours = false;
            
            if (niveauActuel === 10) {
                document.getElementById('statut').innerText = "Incroyable ! Vous avez terminé les 10 niveaux avec succès ! 🏆🎉";
            } else {
                document.getElementById('statut').innerText = `Niveau ${niveauActuel} réussi ! Cliquez sur le bouton pour le Niveau ${niveauActuel + 1}.`;
                niveauActuel++; // Passe au niveau supérieur
            }
        } else {
            // Si le niveau continue, on relance le chrono de 2 secondes pour le saut d'après
            demarrerChrono();
        }
    } else {
        // Si le joueur se trompe de case dans l'ordre numérique, il perd
        clearInterval(chrono);
        document.getElementById('statut').innerText = `Erreur ! Vous deviez sauter sur la case ${etapeSaut}.`;
        jeuEnCours = false;
    }
}

// Fonction pour remettre à zéro l'affichage de la marelle
function nettoyerTableau() {
    document.getElementById('case-ciel').style.backgroundColor = "#3498db";
    document.getElementById('timer').innerText = "Temps : -";
    for (let i = 1; i <= 10; i++) {
        let c = document.getElementById(`case-${i}`);
        c.innerText = i; // Remet le numéro d'origine
        c.style.backgroundColor = "white"; // Remet le fond blanc
    }
}