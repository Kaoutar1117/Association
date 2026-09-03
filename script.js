// ==========================================
// INITIALISATION DU SCRIPT AU CHARGEMENT DE LA PAGE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {

  // 1. GESTION DU FORMULAIRE DYNAMIQUE
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

  if (selectCours) {
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
  }

  // 2. ENVOI PAR EMAIL (EMAILJS)
  
  // Remplacer VOTRE_PUBLIC_KEY par la clé publique EmailJS
  const PUBLIC_KEY = "VOTRE_PUBLIC_KEY"; 
  const SERVICE_ID = "service_xxxxxxx";   // Remplacer par l'ID du service EmailJS
  const TEMPLATE_ID = "template_xxxxxxx"; // Remplacer par l'ID du template EmailJS

  if (typeof emailjs !== 'undefined' && PUBLIC_KEY !== "VOTRE_PUBLIC_KEY") {
    emailjs.init(PUBLIC_KEY);
  }

  const formInscription = document.getElementById('formInscription');

  if (formInscription) {
    formInscription.addEventListener('submit', function(event) {
      event.preventDefault();

      const btn = event.target.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';
      btn.disabled = true;

      if (typeof emailjs === 'undefined' || PUBLIC_KEY === "VOTRE_PUBLIC_KEY") {
        alert('Attention : Le service EmailJS doit être configuré avec vos véritables clés API pour envoyer le mail.');
        btn.innerHTML = originalText;
        btn.disabled = false;
        return;
      }

      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
        .then(function() {
          alert('Votre demande d\'inscription a bien été transmise par e-mail à l\'association !');
          formInscription.reset();
          if (champsDynamiques) champsDynamiques.style.display = 'none';
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, function(error) {
          alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer ou contacter l\'association directement par téléphone.');
          console.error('EmailJS Error:', error);
          btn.innerHTML = originalText;
          btn.disabled = false;
        });
    });
  }
});
