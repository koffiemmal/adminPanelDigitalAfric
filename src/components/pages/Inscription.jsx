import React, { useState } from 'react'
import style from '../styles/Form.module.css'
import logo from "../assets/icones/logo.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { auth, db } from '../../api/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
const Inscription = () => {
  const [nom, setNom] = useState("");
  const [prenom, setprenom] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const createAccount = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "admin", user.uid), {
        id: user.uid,
        nom: nom,
        prenom: prenom,
        email: user.email,
        createdAt: new Date(),
        // Ajoutez d'autres informations que vous souhaitez stocker
      });
      alert("utilisateurs cree avec succes");

      navigate("/");
    } catch (error) {}
  };
  return (
    <div className={style.mainSignIn}>
      <div className={style.form_container}>
        <img src={logo} alt="Logo" />
        <h2>Inscription Admin</h2>
        <form onSubmit={createAccount} className={style.location_form}>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                   onChange={(e)=>setNom(e.target.value)}
                    placeholder="Entrer le nom "
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                
                    onChange={(e) => setprenom(e.target.value)}
                    placeholder="Entrer le prenom"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                  
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Entrer l'email"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                  
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Entrer le mot de passe"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <NavLink to="/connexion" className={style.navlink}>
                    {" "}
                    Vous avez un compte ?
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">s'inscire</button>
        </form>
      </div>
    </div>
  );
}

export default Inscription
