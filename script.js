// On attend que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", function() {
    
    // On récupère le formulaire d'inscription grâce à son identifiant (ID)
    const formulaire = document.getElementById("formInscription");

    // On écoute le moment où l'utilisateur va soumettre (envoyer) le formulaire
    formulaire.addEventListener("submit", function(evenement) {
        // Empêche le rechargement automatique de la page
        evenement.preventDefault();

        // Récupération des valeurs entrées par l'utilisateur
        const nom = document.getElementById("nom").value;
        const coursSelectionne = document.getElementById("cours").options[document.getElementById("cours").selectedIndex].text;

        // Création d'un message de remerciement personnalisé
        const messageSucces = `Merci ${nom} ! Votre demande de pré-inscription pour le cours "${coursSelectionne}" a bien été reçue. L'équipe de Mosaïque Citoyenne vous recontactera très vite.`;

        // On affiche une alerte à l'écran (tu pourras plus tard remplacer ça par un joli encadré)
        alert(messageSucces);

        // On vide le formulaire pour qu'il soit prêt pour une autre inscription
        formulaire.reset();
    });
    
});