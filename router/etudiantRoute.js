const express = require("express");
const {
    ajouterEtudiant,
    getEtudiants,
    getEtudiant,
    updateEtudiant,
    deleteEtudiant,
} = require("../controller/etudiantController");
const router = express.Router();

router.route("/etudiants").post(ajouterEtudiant);
router.route("/etudiants").get(getEtudiants);
router.route("/etudiants/:id").get(getEtudiant);
router.route("/etudiants/:id").put(updateEtudiant);
router.route("/etudiants/:id").delete(deleteEtudiant);

module.exports = router;
