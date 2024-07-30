import React, { useEffect, useState } from "react";
import style from "../styles/UserList.module.css";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../api/firebaseConfig";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  /* const navigate = useNavigate(); */

/*   const redirectEdit = (id) => {
    navigate(`/edit/${id}`);
  }; */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const stationData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(stationData);
        console.log(stationData);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };
    fetchData();
  }, []);

  const deleteItems = async (id) => {
    try {
      await deleteDoc(doc(db, "station", id));
      alert("Station has been deleted");
      setArticles(articles.filter((item) => item.id !== id)); // Remove deleted item from state
    } catch (e) {
      alert("The station could not be deleted");
    }
  };

  return (
    <div className={style.mainUser}>
      <div>
        <section className={style.place}>
          <h4>Magazin</h4>
        </section>
      </div>

      <div className={style.container}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Images</th>
              <th>Categories</th>
              <th>Caractéristiques</th>
              <th>capacité</th>
              <th>prix</th>
              <th>edition</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.id}</td>
                <td>{article.nom}</td>

                <td>
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.nom}
                      style={{ maxWidth: "200px", height: "auto" }}
                    />
                  )}
                </td>
                <td>{article.categorie}</td>
                <td>{article.caracteristiques}</td>
                <td>{article.capacite}</td>
                <td>{article.prix}</td>
                <td className={style.td_station}>
                  <button
                    onClick={() => deleteItems(article.id)}
                    className={style.btn_station_del}
                  >
                    <CloseIcon />
                  </button>
                  <button className={style.btn_station_edit}>
                    <NavLink to={`/acceuil/articles/${article.id}`}>
                      <EditIcon color="white" />
                    </NavLink>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticlesList;
