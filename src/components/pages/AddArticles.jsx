import React, { useState } from "react";
import style from "../styles/Form.module.css";
import logo from "../assets/icones/logo.png";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../api/firebaseConfig";

const AddArticlesList = () => {
  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState("");
  const [caracteristiques, setCaracteristiques] = useState("");
  const [capacite,setcapacite]=useState("")
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [etat,setetat]=useState('')

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Veuillez sélectionner une image.");
      return;
    }

    // Référence pour stocker l'image
    const storageRef = ref(storage, `articles/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Suivi de la progression du téléchargement, si nécessaire
      },
      (error) => {
        console.error("Erreur de téléchargement:", error);
        alert("Erreur lors du téléchargement de l'image.");
      },
      async () => {
        // Téléchargement terminé
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          await addDoc(collection(db, "articles"), {
            nom,
            categorie,
            caracteristiques,
            capacite,
            prix,
            imageUrl: downloadURL,
          });
          alert("Article ajouté avec succès !");
          // Réinitialiser le formulaire
          setNom("");
          setCategorie("");
          setCaracteristiques("");
          setPrix("");
          setcapacite("")
          setImage(null);
          setImageUrl(null);
        } catch (error) {
          console.error("Erreur d'ajout:", error);
          alert("Erreur lors de l'ajout de l'article.");
        }
      }
    );
  };

  return (
    <div className={style.mainAdd}>
      <div className={style.form_container}>
        <img src={logo} alt="Logo" />
        <h2>Approvisionnement Articles</h2>
        <form onSubmit={handleSubmit} className={style.location_form}>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Entrer le nom de l'article"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="file" onChange={handleImageChange} required />
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Selected"
                      style={{ maxWidth: "50%", height: "auto" }}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <select
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <option value="ordinateurs">Ordinateurs</option>
                    <option value="imprimantes">Imprimantes</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <select
                    value={etat}
                    onChange={(e) => setetat(e.target.value)}
                  >
                    <option value="">Sélectionner l'etat de l'article</option>
                    <option value="Neuf en carton">Neuf en carton</option>
                    <option value="occasion">occasion</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    value={caracteristiques}
                    onChange={(e) => setCaracteristiques(e.target.value)}
                    placeholder="Entrer les caractéristiques"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    value={capacite}
                    onChange={(e) => setcapacite(e.target.value)}
                    placeholder="Entrer les capacité"
                    
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="number"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    placeholder="Entrer le prix"
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
};

export default AddArticlesList;
