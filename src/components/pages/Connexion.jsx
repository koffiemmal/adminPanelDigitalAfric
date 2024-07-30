import React, { useState } from "react";
import style from "../styles/Form.module.css";
import logo from "../assets/icones/logo.png";
import { NavLink,useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebaseConfig";
const Connexion = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate()


    const login =async (event)=>{
      event.preventDefault();
      try {

        await signInWithEmailAndPassword(auth,email,password)

        alert('Admin connect')

        navigate('/acceuil')

        
        
      } catch (error) {
        
      }
    }


  return (
    <div className={style.mainSignIn}>
      <div className={style.form_container}>
        <img src={logo} alt="Logo" />
        <h2>Connexion Admin</h2>
        <form  onSubmit={login}  className={style.location_form}>
          <table>
            <tbody>
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
                  <NavLink to='/inscription' className={style.navlink} > Vous n'avez pas de compte ? s'inscrire</NavLink>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Connexion;
