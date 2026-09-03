// ==========================================
// 1. GESTION DU FORMULAIRE DYNAMIQUE
// ==========================================

const selectCours = document.getElementById('cours');
const champsDynamiques = document.getElementById('champs-dynamiques');
const sectionEnfant = document.getElementById('section-enfant');
const sectionAdulte = document.getElementById('section-adulte');

// Champs Enfant & Responsable
const inputNomEleve = document.getElementById('nom_eleve');
const inputNomResp = document.getElementById('nom_responsable');
const inputTelResp = document.getElementById('telephone_resp');

// Champs Adulte
const inputNomAdulte = document.getElementById('nom_adulte');
const inputTelAdulte = document.getElementById('telephone_adulte');

selectCours.addEventListener('change', function() {
    const val = this.value;

    if (!val) {
        // Si rien n'est sélectionné
        champsDynamiques.style.display = 'none';
        sectionEnfant.style.display = 'none';
        sectionAdulte.style.display = 'none';
        return;
    }

    champsDynamiques.style.display = 'block';

    // Cours qui nécessitent Nom Élève + Responsable Légal
    if (val.includes('Soutien') || val.includes('Maths') || val.includes('Saz')) {
        sectionEnfant.style.display = 'block';
        sectionAdulte.style.display = 'none';

        // Rendre obligatoire les champs Enfant & Parent
        inputNomEleve.required = true;
        inputNomResp.required = true;
        inputTelResp.required = true;

        // Ne pas exiger les champs Adulte seul
        inputNomAdulte.required = false;
        inputTelAdulte.required = false;

    } else {
        // Cours Adultes (Français, Yoga)
        sectionEnfant.style.display = 'none';
        sectionAdulte.style.display = 'block';

        // Rendre obligatoire les champs Adulte
        inputNomAdulte.required = true;
        inputTelAdulte.required = true;

        // Ne pas exiger les champs Enfant & Parent
        inputNomEleve.required = false;
        inputNomResp.required = false;
        inputTelResp.required = false;
    }
});


// ==========================================
// 2. ENVOI PAR EMAIL (EMAILJS -> HaticeD@hotmail.fr)
// ==========================================

(function() {
    // Coller ici ta clef publique EmailJS
    emailjs.init("VOTRE_PUBLIC_KEY");
})();

document.getElementById('formInscription').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = event.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';
    btn.disabled = true;

    // Coller ici tes IDs issus de ton compte EmailJS
    const serviceID = 'service_xxxxxxx';
    const templateID = 'template_xxxxxxx';

    emailjs.sendForm(serviceID, templateID, this)
        .then(function() {
            alert('Votre demande d\'inscription a bien été transmise par e-mail à Hatice (HaticeD@hotmail.fr) !');
            document.getElementById('formInscription').reset();
            champsDynamiques.style.display = 'none';
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, function(error) {
            alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer ou contacter l\'association directement par téléphone.');
            console.error('EmailJS Error:', error);
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
});
