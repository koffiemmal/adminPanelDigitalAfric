// Import necessary Firebase functions
import React, { useState, useEffect } from "react";
import style from "../styles/Form.module.css";
import logo from "../assets/icones/logo.png";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebaseConfig";

const EditionArticles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState("");
  const [caracteristiques, setCaracteristiques] = useState("");
  const [prix, setPrix] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [etat, setEtat] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleDoc = await getDoc(doc(db, "articles", id));
        if (articleDoc.exists()) {
          const articleData = articleDoc.data();
          setNom(articleData.nom);
          setImageUrl(articleData.imageUrl);
          setCategorie(articleData.categorie);
          setCaracteristiques(articleData.caracteristiques);
          setPrix(articleData.prix);
          setEtat(articleData.etat);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchArticle();
  }, [id]);

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

    try {
      const articleRef = doc(db, "articles", id);

      // Prepare the data to update, ensuring no undefined values are included
      const updateData = {
        nom: nom || "", // Fallback to an empty string if undefined
        imageUrl: imageUrl || "", // Fallback to an empty string if undefined
        categorie: categorie || "", // Fallback to an empty string if undefined
        caracteristiques: caracteristiques || "", // Fallback to an empty string if undefined
        prix: prix !== "" ? prix : 0, // Fallback to 0 if undefined or empty
        etat: etat || "", // Fallback to an empty string if undefined
      };

      // Update the document with the prepared data
      await updateDoc(articleRef, updateData);

      navigate("/station");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className={style.mainAdd}>
      <div className={style.form_container}>
        <img src={logo} alt="Logo" />
        <h2>Mise a jour article</h2>
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
                  <input type="file" onChange={handleImageChange} />
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
                    {/* Add more options as needed */}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <select
                    value={etat}
                    onChange={(e) => setEtat(e.target.value)}
                  >
                    <option value="">Sélectionner l'état de l'article</option>
                    <option value="Neuf en carton">Neuf en carton</option>
                    <option value="occasion">Occasion</option>
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
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
};

export default EditionArticles;
