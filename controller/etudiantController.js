const { ObjectID } = require("bson");
const user = require("../base/con");
const { Etudiant } = require("../model/etudiant");

const ajouterEtudiant = async (req, res) => {
    try {
        let etudiant = new Etudiant(
            req.body.noms,
            req.body.prenom,
            req.body.email,
            req.body.adresse,
            req.body.telephone
        );
        let result = await user
            .db()
            .collection("etudiants")
            .insertOne(etudiant);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};

const getEtudiants = async (req, res) => {
    try {
        let cursor = user
            .db()
            .collection("etudiants")
            .find()
            .sort({ noms: 1 });
        let result = await cursor.toArray();
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(204).json({ msg: "Aucun etudiant trouvé" });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};

const getEtudiant = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let cursor = user.db().collection("etudiants").find({ _id: id });
        let result = await cursor.toArray();
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(204).json({ msg: "Cet etudiant n'existe pas" });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};

const updateEtudiant = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let noms = req.body.nom;
        let prenom = req.body.prenom;
        let email = req.body.email;
        let adresse = req.body.adresse;
        let telephone = req.body.telephone;
        let result = await user
            .db()
            .collection("etudiants")
            .updateOne({ _id: id }, { $set: { noms, prenom, email, adresse, telephone } });

        if (result.modifiedCount === 1) {
            res.status(200).json({ msg: "Modification réussie" });
        } else {
            res.status(404).json({ msg: "Cet etidant n'existe pas" });
        }
    } catch (error) {
        console.log(error);
        res.status(501).json(error);
    }
};

const deleteEtudiant = async (req, res) => {
    try {
        let id = new ObjectID(req.params.id);
        let result = await user
            .db()
            .collection("etudiants")
            .deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            res.status(200).json({ msg: "Suppression réussie" });
        } else {
            res.status(404).json({ msg: "Cet etudiant n'existe pas" });
        }
    } catch (error) {
        console.log(error);

        res.status(501).json(error);
    }
};

module.exports = {
    ajouterEtudiant,
    getEtudiants,
    getEtudiant,
    updateEtudiant,
    deleteEtudiant,
};
