    
    if(CompteurPartie == nombreDePartie){ 
        /* 
        Affiche le total des points de chaque joueur et 
        1 bouton pour afficher l'ecran du resultat(ganger ou perdu)
        */
        root.innerHTML += `
            <p> 
                ${pseudoJoueur1} : ${pointsJoueur1} points /
                ${pseudoJoueur2} : ${pointsJoueur2} points
            </p>
            <hr>
            <div">
                <button class="resultat">Resultat</button>
                <button class="quitter">Quitter</button>
            </div>
        `
        // Place un écouteur pour le btn "Resultat"
        document.querySelector(".resultat").addEventListener("click",()=>{
            // JOUEUR 1 CONTRE IA Affiche (gagne contre la machine)
            if(adversaire == "ia" && pointsJoueur1 > pointsJoueur2){
                root.innerHTML += `
                    <p>BRAVO ${pseudoJoueur1}<p>
                    <img src="image/75651.gif" alt="Gagné" width=300>
                `
            } else {
                // Affiche message pour le joueur 1 perd contre la machine
                root.innerHTML += `
                    <p>Perdu ${pseudoJoueur1}<p>
                    <img src="image/enerve.gif" alt="Perdu" width=300>
                ` 
            }
            // JOUEUR CONTRE JOUEUR
            if( adversaire == "autreJoueur"){
                if(pointsJoueur1 > pointsJoueur2){
                    root.innerHTML += `
                        <p>BRAVO ${pseudoJoueur1}<p>
                    `
                } else {
                    root.innerHTML += `
                        <p>BRAVO ${pseudoJoueur2}<p>
                    `
                }
                root.innerHTML += `
                    <img src="image/75651.gif" alt="feu d'artifice" width=300>
                `
            }
            // IA OU AUTRE JOUEUR on propose de rejouer ou quitter
            root.innerHTML += `
                <hr>
                <div">
                    <button class="rejouer">Rejouer</button>
                    <button class="quitter">Quitter</button>
                </div>
            `
            document.querySelector(".rejouer").addEventListener("click",()=>{
                demanderEtMemoriserPseudoJoueur1()
            })
        })
    }


    /* ---------------------------------CODE ORIGINAL------------------------------------------------- */

    if(CompteurPartie == nombreDePartie){ 
        // Affiche le total des points de chaque joueur
        root.innerHTML += `
            <p> ${pseudoJoueur1} : ${pointsJoueur1} points /
            ${pseudoJoueur2} : ${pointsJoueur2} points</p>
        `
        
        // JOUEUR 1 CONTRE IA Affiche (gagne contre la machine)
        if(adversaire == "ia" && pointsJoueur1 > pointsJoueur2){
            root.innerHTML += `
                <p>BRAVO ${pseudoJoueur1}<p>
                <img src="image/75651.gif" alt="Gagné" width=300>
            `
        } else {
            // Affiche message pour le joueur 1 perd contre la machine
            root.innerHTML += `
                <p>Perdu ${pseudoJoueur1}<p>
                <img src="image/enerve.gif" alt="Perdu" width=300>
            ` 
        }
        // JOUEUR CONTRE JOUEUR
        if( adversaire == "autreJoueur"){
            if(pointsJoueur1 > pointsJoueur2){
                root.innerHTML += `
                    <p>BRAVO ${pseudoJoueur1}<p>
                `
            } else {
                root.innerHTML += `
                    <p>BRAVO ${pseudoJoueur2}<p>
                `
            }
            root.innerHTML += `
                <img src="image/75651.gif" alt="feu d'artifice" width=300>
            `
        }
        // IA OU AUTRE JOUEUR on propose de rejouer ou quitter
        root.innerHTML += `
            <hr>
            <div">
                <button class="rejouer">Rejouer</button>
                <button class="quitter">Quitter</button>
            </div>
        `
        document.querySelector(".rejouer").addEventListener("click",()=>{
            demanderEtMemoriserPseudoJoueur1()
        })
    }