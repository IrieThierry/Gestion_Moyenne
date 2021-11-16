
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
    modal.style.top ='0'
    modal.style.transition ='1s'
})

// Fonction pour vider les champs et fermé le modal
Annulation.addEventListener('click',()=>{
    insertion.forEach(function(item) {
        item.value = ""
    })
    modal.style.top = '-350'
    modal.style.transition = '1s'
})

// Enregistrement eleve
validation.addEventListener('click', function(){
    let nom_eleve = document.querySelector('#nom').value
    let prenom_eleve = document.querySelector('#prenom').value

    let eleve = {nom :nom_eleve, prenom:prenom_eleve}

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
    html += ('<div class="table-item">'+
    '<div class="indice-eleve">'+ (i+1)+'</div>'+
    '<div class="info">'+
        '<div class="nom-eleve">'+ item.nom +' '+ item.prenom +'</div>'+
      '<div class="notes-eleve">'+
            '<span class="note">15</span>'+
            '<span class="note">25</span>'+
            '<span class="note"> 15 </span>'+
        '</div>'+
    '</div>'+

    '</div>')
    i++
  
});
element.innerHTML = html

