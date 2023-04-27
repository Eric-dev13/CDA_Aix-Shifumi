// Cible la balise pour le rendu des différents écrans (simulant les pages / single page)
const root = document.querySelector("#root")

// Defini les variables 
let compteurPartie, nombreDePartie
let pseudoJoueur1, pointsJoueur1, choixJoueur1
let pseudoJoueur2, pointsJoueur2, choixJoueur2

// Affectation des valeurs aux variables
function initalisation() {
    compteurPartie = 1 // Represente la partie en cours
    nombreDePartie = 5 // Nombre maximum de parties dans une manche
    adversaire = "" // Jouer contre ia:"ia" ou un autre joueur:"autreJoueur"
    // Joueur 1
    pseudoJoueur1 = null
    pointsJoueur1 = 0 // Points joueur 1
    choixJoueur1 = null
    // Joueur 2
    pseudoJoueur2 = null
    pointsJoueur2 = 0 // Points joueur 2
    choixJoueur2 = null
}

// Rendu du premier écran
function startApp() {
    root.innerHTML = `<button onclick="demanderEtMemoriserPseudoJoueur1()">Jouer à Shifumi</button>`
}

function demanderEtMemoriserPseudoJoueur1() {
    // Affectation des valeurs aux variables
    initalisation()
    // Affiche le rendu dans la balise id="root" 
    root.innerHTML = `
        <section>
            <label for="pseudoJoueur1">Veuillez saisir votre pseudo</label>
            <input type="text" id="pseudoJoueur1">
            <button type="button" class="validationPseudo1">Enregistrer votre pseudo</button>
        <section>
    `
    // Ajoute du CSS à la balise div
    root.querySelector("section").style.cssText = `
        display:flex;
        flex-direction: column;
    `
    root.querySelector("section>input").style.cssText = `
        font-size: 1em;
        margin: 10px 0;
    `
    /* Cible l'élément button "Enregistrer votre pseudo" via l'attribut class="validationPseudo"
    et ajoute un écouteur d'évenement (surveille si le joueur appui sur le bouton ) */
    document.querySelector(".validationPseudo1").addEventListener("click", () => {
        // Recupère le texte saisi dans l'élément input
        const value = document.querySelector("#pseudoJoueur1").value
        // verifie que l'élément input contient du texte
        if (value != "" && value != null) {
            // Mémorise le pseudo du joueur 1
            pseudoJoueur1 = document.querySelector("#pseudoJoueur1").value
            // Appel la méthode qui permet de faire le choisir d'un adversaire (ia ou autre joueur)
            choixAdversaire()
        }
    })
}

function choixAdversaire() {
    // Affiche le rendu dans la balise id="root" 
    root.innerHTML = `
        <section>
            <button class="contreIa">Jouer contre l'IA</button>
            <button class="contreJoueur2">Joueur contre joueur</button>
        <section>
    `
    // Ajoute un écouteur d'évenement pour surveiller si joueur 1 contre l'IA
    document.querySelector(".contreIa").addEventListener("click", () => {
        // affectation de valeur
        adversaire = "ia"
        // appel la méthode
        memorisePseudoJoueur2()
    })
    // Ajoute un écouteur d'évenement pour surveiller si joueur 1 contre un autre joueur
    document.querySelector(".contreJoueur2").addEventListener("click", () => {
        // affectation de valeur
        adversaire = "autreJoueur"
        // appel la méthode
        memorisePseudoJoueur2()
    })
}

function memorisePseudoJoueur2() {
    if (adversaire == "ia") {
        // Mémorise le nom de l'ia en tant que joueur 2
        pseudoJoueur2 = "Cefeus"
        // Demande au joueur 1 de choisir un des trois coups possibles
        afficheEtMemoriseChoixJoueur(pseudoJoueur1, "joueur1")
    } else {
        // Adversaire == autre joueur, affiche dans la balise id="root" un formulaire pour entrer le pseudo du joueur 2
        root.innerHTML = `
            <section>
                <label for="pseudoJoueur2">Joueur 2, veuillez saisir votre pseudo</label>
                <input type="text" id="pseudoJoueur2">
                <button type="button" class="validationPseudo2">Enregistrer votre pseudo</button>
            </section>
        `
        // Ajoute du CSS à la balise div
        root.querySelector("section").style.cssText = `
            display:flex;
            flex-direction: column;
        `
        // Ajoute un écouteur d'évenement pour surveiller la validation du bouton "Enregistrer votre pseudo"
        document.querySelector(".validationPseudo2").addEventListener("click", () => {
            const value = document.querySelector("#pseudoJoueur2").value
            if (value != "" && value != null) {
                // Mémorise le speudo du joueur 2
                pseudoJoueur2 = document.querySelector("#pseudoJoueur2").value
                // Demande au joueur 1 de choisir un des trois coups possibles
                afficheEtMemoriseChoixJoueur(pseudoJoueur1, "joueur1")
            }
        })
    }
}

// Appel rappeler cette méthode pour itérer sur une manche de plusieurs parties
function afficheEtMemoriseChoixJoueur(pseudo, joueur) {
    // Affiche dans la balise id="root", l'avancement de la manche ainsi que les images: ciseaux, pierre, feuille
    root.innerHTML = `
        <section>
            <p class="score">Partie ${compteurPartie} / ${nombreDePartie}</p>
            <p><span>${pseudo}</span>, sélectionnez une image</p>
            <div>
                <img src="assets/image/ciseaux.jpg" alt="Ciseaux" class="elt ciseaux" height="150px" id="ciseaux">
                <img src="assets/image/pierre.jpg" alt="Pierre" class="elt pierre" height="150px" id="pierre">
                <img src="assets/image/feuille.jpg" alt="Feuille" class="elt feuille" height="150px" id="feuille">
            </div>
        </section>
    `
    root.querySelector("p.score").style.cssText = `font-weight:bold;`
    root.querySelector("span").style.cssText = `font-weight:bold;`
    // Cible tous les éléments avec l'attribut class="elt"
    const images = document.querySelectorAll(".elt")
    // parcours le tableau d'image
    images.forEach(element => {
        // Surveiller si la souris survole l'image
        element.addEventListener("mouseenter", (event) => {
            event.target.style.filter = "invert(10%)"
            event.target.style.cursor = "grab"
        })
        // Surveiller si la souris sort de l'image
        element.addEventListener("mouseout", (event) => {
            event.target.style.filter = "none"
        })
        // Surveiller quelle image est choisi par le joueur
        element.addEventListener("click", () => {
            switch (element.id) {
                case "ciseaux":
                    // condition ternaire: mémorise le choix du joueur
                    joueur == "joueur1" ? choixJoueur1 = 3 : choixJoueur2 = 3
                    break;

                case "pierre":
                    joueur == "joueur1" ? choixJoueur1 = 2 : choixJoueur2 = 2
                    break

                case "feuille":
                    joueur == "joueur1" ? choixJoueur1 = 1 : choixJoueur2 = 1
                    break

                default:
                    break;
            }
            if (adversaire == "ia" || choixJoueur2 != null) {
                generateRandomNumber()
            } else {
                if (choixJoueur2 == null) {
                    afficheEtMemoriseChoixJoueur(pseudoJoueur2, "joueur2")
                } else {
                    algoShifoumi()
                }
            }

        })
    });
}

function generateRandomNumber() {
    /* On joue contre la machine on genere un nombre aléatoire entre 1 et 3
        1 : feuille
        2 : pierre
        3 : ciseaux 
    */

    root.innerHTML = `
        <p class="score">Partie ${compteurPartie} / ${nombreDePartie}</p>
        <div class="bloc" style="display: flex; justify-content: space-around;">
            <div class="joueur1" style="display: flex; flex-direction: column;">
                <p><span>${pseudoJoueur1}</span></p>
                <img src="${getInfoImage(choixJoueur1).path}" style="width: 100px;" >
            </div>
            <div class="randomize__joueur2" style="display: flex; flex-direction: column;">
                <p><span>${pseudoJoueur2}</span></p>
                <img src="assets/image/feuille.jpg" style="width: 100px;">
            </div>
        </div>
    `

    let compteurRandom = 0
    

    function entierAleatoire(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let randomId = setInterval(() => {
        // Nombre aléatoire compris entre 1 et 3
        choixJoueur2 = entierAleatoire(1, 3)
        var myAudio = document.createElement("audio")
        myAudio.src = "assets/image/audio.wav"
        myAudio.play()
        // Actualise la source de l'image
        root.querySelector(".randomize__joueur2 img").src = getInfoImage(choixJoueur2).path
        compteurRandom += 1
        if(compteurRandom == 20) {
            clearInterval(randomId)
            algoShifoumi()
        }
    }, 100)
}

function algoShifoumi() {
    //affiche dans la balise id="root" 
    root.innerHTML = `
        <p class="score">Partie ${compteurPartie} / ${nombreDePartie}</p>
        <p>
            <span>${pseudoJoueur1}</span> a choisi <img src="${getInfoImage(choixJoueur1).path}" width=100 > /
            <span>${pseudoJoueur2}</span> a choisi <img src="${getInfoImage(choixJoueur2).path}" width=100 >
        </p>
    `
    root.querySelector("p.score").style.cssText = `font-weight:bold;`
    root.querySelector("p span").style.cssText = `font-weight:bold;`
    if (choixJoueur1 == choixJoueur2) {
        // EGALITE - MATCH NULL
        root.innerHTML += `
            <div style="display: flex; align-items:center; justify-content:center; color: blue;"> 
                <img src="assets/image/egalite.jpg" alt="Gagné" width="100px">
                <p style="margin-left:10px;">MATCH NULL</p>
            <div>
        `
    } else if (choixJoueur1 == 1) { // joueur 1 -> feuille
        if (choixJoueur2 == 3) { // joueur 2 -> ciseaux
            joueur2Gagne()
        } else {
            joueur1Gagne()
        }
    } else if (choixJoueur1 == 2) { // joueur 1 -> pierre
        if (choixJoueur2 == 1) { // joueur 2 -> ciseaux
            joueur2Gagne()
        } else {
            joueur1Gagne()
        }
    } else if (choixJoueur1 == 3) { // joueur 1 -> ciseaux
        if (choixJoueur2 == 2) { // joueur 2 -> ciseaux
            joueur2Gagne()
        } else {
            joueur1Gagne()
        }
    }
    // Appel de fonction
    proposeActionFinDePartie()
}

function proposeActionFinDePartie() {
    /*  Partie terminée :ajouter dans ecran btn resultat, afficher ecran resultat (gagne ou perdu)
        La partie n'est pas terminée ajouter dans ecran avec choix: Continuer / Quitter */

    // Partie terminée : ajouter dans ecran btn resultat, afficher ecran resultat (gagne ou perdu)
    if (compteurPartie == nombreDePartie) {
        // Affiche le total des points de chaque joueur et 1 bouton pour afficher l'ecran avec les résultats(gagner ou perdre)
        root.innerHTML += `
            <hr>
            <div">
                <button class="resultat">Resultat</button>
                <button class="quitter">Quitter</button>
            </div>
        `
        // Place un écouteur pour le btn "Resultat"
        document.querySelector(".resultat").addEventListener("click", () => {
            // JOUEUR 1 CONTRE IA Affiche (gagne contre la machine)
            if (adversaire == "ia" && pointsJoueur1 > pointsJoueur2) {
                root.innerHTML = `
                    <p>BRAVO <span class="bold">${pseudoJoueur1}</span> vous avez obtenu un score de ${pointsJoueur1} points 
                    contre <span class="bold">${pointsJoueur2}</span> pour ${pseudoJoueur2}<p>
                    <img src="assets/image/75651.gif" alt="Gagné" width=300>
                `
            } else {
                // Affiche message pour le joueur 1 perd contre la machine
                root.innerHTML = `
                    <p>Perdu <span class="bold">${pseudoJoueur1}</span> vous avez obtenu un score de ${pointsJoueur1} points 
                    contre <span class="bold">${pointsJoueur2}</span> pour ${pseudoJoueur2}<p>
                    <img src="assets/image/enerve.gif" alt="Perdu" width=300>
                `
            }
            root.querySelector("span.bold").style.cssText = `font-weight: bold;`

            // JOUEUR CONTRE JOUEUR
            if (adversaire == "autreJoueur") {
                if (pointsJoueur1 > pointsJoueur2) {
                    root.innerHTML = `
                        <p>BRAVO ${pseudoJoueur1}<p>
                    `
                } else {
                    root.innerHTML = `
                        <p>BRAVO ${pseudoJoueur2}<p>
                    `
                }
                root.innerHTML += `
                    <img src="assets/image/75651.gif" alt="feu d'artifice" width=300>
                `
            }
            // Propose de rejouer ou quitter
            root.innerHTML += `
                <hr>
                <div">
                    <button class="rejouer">Rejouer</button>
                    <button class="quitter">Quitter</button>
                </div>
            `
            document.querySelector(".rejouer").addEventListener("click", () => {
                demanderEtMemoriserPseudoJoueur1()
            })
        })
    } else {
        // La partie n'est pas terminée ajouter dans ecran avec choix: Continuer / Quitter
        root.innerHTML += `
            <hr>
            <div">
                <button class="continuer">Continuer</button>
                <button class="quitter">Quitter</button>
            </div>
        `
        document.querySelector(".continuer").addEventListener("click", () => {
            compteurPartie++
            choixJoueur1 = null
            choixJoueur2 = null
            afficheEtMemoriseChoixJoueur(pseudoJoueur1, "joueur1")
        })
    }

    document.querySelector(".quitter").addEventListener("click", () => {
        startApp()
    })
}

function joueur1Gagne() {
    // JOUEUR 1 GAGNE 
    pointsJoueur1++
    messageJoueur(true)
}

function joueur2Gagne() {
    // JOUEUR 1 PERD 
    pointsJoueur2++
    messageJoueur(false)
}

function messageJoueur(state) {
    if (state) {
        // SI TRUE ALORS JOUEUR 1 A GAGNER
        root.innerHTML += ` 
            <div style="display: flex; align-items:center; justify-content:center;color: green;">
                <img src="assets/image/true.jpg" alt="Gagné" width="100px">
                <p style="margin-left:10px;">Félicitation! ${pseudoJoueur1} vous avez gagné.</p>
            </div>
        `
        if (adversaire != "ia") {
            root.innerHTML += `
                <div style="display: flex; align-items:center; justify-content:center;color: brown;">
                    <img src="assets/image/false.jpg" alt="perdu" width="100px">
                    <p style="margin-left:10px;">Désolé! ${pseudoJoueur2} vous avez perdu.</p>
                </div>
            `
        }
    } else {
        // SI FALSE ALORS JOUEUR 1 PERDU
        if (adversaire == "ia") {
            root.innerHTML += `
                <div style="display: flex; align-items:center; justify-content:center; color: brown;">
                    <img src="assets/image/false.jpg" alt="perdu" width="100px">
                    <p style="margin-left:10px;">Désolé! ${pseudoJoueur1} vous avez perdu.</p>
                </div>
            `
        } else {
            root.innerHTML += ` 
                <div style="display: flex; align-items:center; justify-content:center; color: green;">
                    <img src="assets/image/true.jpg" alt="Gagné" width="100px">
                    <p style="margin-left:10px;">Félicitation! ${pseudoJoueur2} vous avez gagné.</p>
                </div>
            `
        }
    }
}

function getInfoImage(value) {
    switch (value) {
        case 1:
            return { "name": "Feuille", "path": "assets/image/feuille.jpg" }
            break;

        case 2:
            return { "name": "Pierre", "path": "assets/image/pierre.jpg" }
            break;

        case 3:
            return { "name": "Ciseaux", "path": "assets/image/ciseaux.jpg" }
            break;

        default:
            break;
    }
}

// Chargement du premier écran
startApp()