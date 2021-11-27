
/*let nom_eleve = document.querySelector('#nom')
let prenom_nom_eleve = document.querySelector('#nom')
let eleve = [{nom :nom_eleve, prenom:prenom_eleve, note:[]}]*/
let modal = document.querySelector('.modal')
let btn_ajout = document.querySelector('.btn-ajout')
let Annulation = document.querySelector('.Annulation')
let insertion = document.querySelectorAll('.insertion')
let validation = document.querySelector('.validation')

//Afficher Pop Up ( Modal )
btn_ajout.addEventListener('click',function() {
  modal.classList.add('modalVisible')
})

let uniqueId = ()=> Number(localStorage.getItem('uId')) || null

function $(params) {
    return document.querySelector(params)
}

function $$(params) {
    return document.querySelectorAll(params)
}

// Fonction pour vider les champs et fermé le modal
Annulation.addEventListener('click',function(){
    insertion.forEach(function(item) {
        item.value = ""
    })
    modal.classList.remove('modalVisible')
    $('.message').innerHTML = ""

})

// Enregistrement eleve
validation.addEventListener('click', function(){
    let ideleve = document.querySelector('#nom')
    let nom_eleve = ideleve.value
    let prenom_eleve = document.querySelector('#prenom').value

   
    if (!nom_eleve || !prenom_eleve) {
        $('.message').innerHTML = "veuillez renseigner tous les champs"
        
    }
    else{
    
    localStorage.setItem('uId',uniqueId()+1)
    let eleve = {id: uniqueId(), nom :nom_eleve, prenom:prenom_eleve, notes:[]}

        function Save() {
            let tab = localStorage.getItem('eleve')
            if(tab){
                return JSON.parse(tab)
            }
            else{
                return []
            }
        }

        let resultat = Save()
            resultat.push(eleve)
            resultat = JSON.stringify(resultat)
            localStorage.setItem('eleve', resultat)

            insertion.forEach(function(item) {
                item.value = ""
            })
        window.location.reload()
    }
    
})

function Donnees() {
        let tab = localStorage.getItem('eleve')
        if(tab){
            return JSON.parse(tab)
        }
        else{
            return []
        }
}


let liste_eleve = Donnees()

let element = document.querySelector('.table')
let i = 0
let html = ""

liste_eleve.forEach(item => {
    html += (
    `<div class="table-item liste-eleves " id=${item.id}>
        <div class="indice-eleve">${(i+1)}</div>
        <div class="info">
        <div class="nom-eleve"> ${item.nom }  ${item.prenom}   </div>
        <div class="notes-eleve">
        ${item.notes.map(note=>`<span class="note">${note} </span>`).join('')}
        </div>
        <span class = "ajout-note tooltip btn-plus" >+
          <span class = "tooltiptext">
                <input type="text" class ="champs saisir-note" placeholder = "Note" value="" />
                <button class ="btn-note" id=${item.id} >Ajouter</button>
                <button class ="btn-note" >Annuler</button>
          </span>
        </span>
        <span class = "ajout-note tooltip btn-moins" >-
            <span class = "tooltiptext">
                <input type="number" class ="saisir-index" min="1" max="5" placeholder = "Index" value="" />
                <input type="text" id=${item.id} class ="champs sup-note" placeholder = "Note" value="" />
                <button class ="btn-ModifierNote" id=${item.id} >Modifier</button>
            </span>
        </span>
        
        </div>

         </div>`)
    i++
  
});
element.innerHTML = html
/*
let tooltip = $$('.tooltip')

tooltip.forEach(element => {
    element.addEventListener('click',function () {
let tol = element.lastElementChild
       tol.classList.toggle('tooltiptextvisible')
    })
});*/

/*function supprimer(i) {
    let traitement = liste_eleve.splice(i, 1)
   console.log(traitement);
   let traitementChaine = JSON.stringify(liste_eleve)
   localStorage.setItem('eleve', traitementChaine)
   window.location.reload()
}
*/
let Ajouts = document.querySelectorAll('.ajout-note')
let btns_plus = document.querySelectorAll('.btn-plus')
let saisir_note = document.querySelectorAll('.saisir-note')
let btn_note = document.querySelectorAll('.btn-note')
let eleve_note = $('.eleve-note')
let ListedeClasse = Donnees()
let saisir_index = $$('.saisir-index')
let supNotes = $$(".sup-note")
// Ajout de note
btn_note.forEach((item) => {

    item.addEventListener('click', ()=>{
    let resultat = ListedeClasse.find(function(element){
        return element.id == item.id
    })

  let itemValue = item.previousElementSibling.value
  resultat.notes.push(Number(itemValue))
    localStorage.setItem('eleve',JSON.stringify(ListedeClasse))
    window.location.reload()
    })
});



let listes_eleves = document.querySelectorAll('.liste-eleves')
listes_eleves.forEach(item => {
    item.addEventListener('click',function(){
           let eleve_trouve = liste_eleve.find(function(eleve) {
                return(eleve.id == item.id )

            })
            $(".eleve-nom").innerHTML = `Total des notes : ${eleve_trouve.nom} ${eleve_trouve.prenom}`
            let longueurNotes = eleve_trouve.notes.length
            let sommedeNote = eleve_trouve.notes.reduce((a,b)=> a+b)
            eleve_note.innerHTML = `${sommedeNote}`
            let moyenne = `${(sommedeNote / longueurNotes).toFixed(2)}`
                if (moyenne < 10) {
                    $('.moyenne').innerHTML =`Moyenne obtenu ${moyenne}` 
                    $('.moyenne').style.color = "red"
                }
                else{
    
                    $('.moyenne').innerHTML =`Moyenne obtenu ${moyenne}` 
                    $('.moyenne').style.color = "green"
                }

    })

// Suppression de Note
let btnModifierNote = $$(".btn-ModifierNote")

btnModifierNote.forEach((valeur)=>{
    valeur.addEventListener('click',function() {
                 supNotes.forEach(supNote => {
                let valeurSu = ListedeClasse.find(function(elmt){
                    return elmt.id == supNote.id
                })
                let index = supNote.previousElementSibling.value
                if (!index || index > valeurSu.notes.length ) {
                    console.log('non')
                }else{

                    valeurSu.notes[index - 1] =  Number(supNote.value)
                }
            });
            localStorage.setItem('eleve',JSON.stringify(ListedeClasse))
            window.location.reload()
        })
})
    
})
let som = 0
let min = liste_eleve[1].notes.reduce((a,b) => a+b)
let max = liste_eleve[1].notes.reduce((a,b) => a+b)

liste_eleve.map((item,i) =>{
    let cumulDesNotes =  item.notes.reduce((a,b)=> a+b)
    som += cumulDesNotes
    $('.box-insertion').innerHTML = som

    let monElement = liste_eleve[i].notes.reduce((a,b) => a+b)


    if (monElement >= max) {
        max = monElement
    }else if(monElement <= min){
        min = monElement
    }
    
    elevePremier = liste_eleve.find(function(eleve){
        return (eleve.notes.reduce((a,b)=> a+b)) == max
    })

    eleveDernier = liste_eleve.find(function(eleve){
        return (eleve.notes.reduce((a,b)=> a+b)) == min
    })

    let moyenneG = (elevePremier.notes.reduce((a,b)=> a+b)) / elevePremier.notes.length
    let moyenneGd = (eleveDernier.notes.reduce((a,b)=> a+b)) / elevePremier.notes.length 
 
    $('.premier').innerHTML = `${elevePremier.nom} ${elevePremier.prenom}`
    $('.cumulNote').innerHTML = `Cumul des Notes : ${max}`
    $('.moyenneG').innerHTML = `Moyenne Obtenue : ${moyenneG.toFixed(2)}`

    $('.dernier').innerHTML = `${eleveDernier.nom} ${eleveDernier.prenom}`
    $('.cumulNoteD').innerHTML = `Cumul des Notes : ${min}`
    $('.moyenneGd').innerHTML = `Moyenne Obtenue : ${moyenneGd.toFixed(2)}`

})
    
