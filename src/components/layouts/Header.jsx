import React, { useEffect, useState } from 'react'
import style from './../styles/Header.module.css'
import logo from '../assets/icones/logo.png'
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,

} from "@chakra-ui/react";
import { NavLink, Outlet } from 'react-router-dom';
import { auth } from '../../api/firebaseConfig';

const Header = () => {

  const [user,setUser] = useState(null)

  useEffect(()=>{

    const checkUser = async()=>{

    try {

      const authC = auth.onAuthStateChanged((user)=>{
        if (user) {
          setUser(user)

          
        }
      })
      
    } catch (error) {
      
    }

    }

    checkUser();
    console.log(user)

  },[])

  return (
    <div className={style.header}>
      <div className={style.Sidebar}>
        <section className={style.side}>
          {" "}
          <NavLink to="/acceuil">
            <h4>Utilisateur</h4>
          </NavLink>
          <NavLink to="/acceuil/magazin">
            <h4>Magasin</h4>
          </NavLink>
          <NavLink to="/acceuil/addArticle">
            <h4>Approvisionnement</h4>
          </NavLink>
        </section>
        <section>
          <h4></h4>
        </section>
      </div>
      <div className={style.heaerplace}>
        <div className={style.LogoAndProfil}>
          <img src={logo} alt="" />
          <Wrap>
            <WrapItem>
              <Avatar
                bg="#006494"
                name="Admin Panel"
                src="https://bit.ly/tioluwani-kolawole"
                borderRadius="50%" // Makes the avatar circular
                p="15px"
                color="white"
              />
            </WrapItem>
          </Wrap>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Header
