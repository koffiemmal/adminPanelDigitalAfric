import React, { useEffect, useState } from "react";
import style from "../styles/UserList.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebaseConfig";

const Userlist = () => {

  const [user,Setuser]= useState([]); 

  useEffect(()=>{
    const fetchDate = async () => {
      try {
        const querySnapchot = await getDocs(collection(db, "users"));

        const userData = querySnapchot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        Setuser(userData);

    
      } catch {}
    };
    fetchDate()
  },[])

  console.log(user);

  return (
    <div className={style.mainUser}>
      <div>
        <section className={style.place}>
          <h4>Utilisateurs</h4>
        </section>
      </div>

      <div className={style.container}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Prénom</th>
             
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {user.map((users) => (
              <tr key={users.id} >
                <td>{users.id}</td>
                <td>{users.nom}</td>
                <td>{users.prenom}</td>
           
                <td>{users.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Userlist;
/**
 *   LocationPLace(
        placeName: 'Bé',
        location: LatLng(6.137126200000001, 1.2490082),
        positionTime: '6min'),
    LocationPLace(
        placeName: 'Dékon',
        location: LatLng(6.1256983, 1.2253621),
        positionTime: '12min'),
    LocationPLace(
        placeName: 'Kodjoviakope',
        location: LatLng(6.122198699999999, 1.2049233),
        positionTime: '20min'),
    LocationPLace(
        placeName: 'Adidogome',
        location: LatLng(6.1256983, 1.2253621),
        positionTime: '30min'),
    LocationPLace(
        placeName: 'Zanguéra',
        location: LatLng(6.228453, 1.1185143),
        positionTime: '40min'),
    LocationPLace(
        placeName: 'Aeroport de Lomé',
        location: LatLng(6.1704244, 1.2529823),
        positionTime: '10min'),
    LocationPLace(
        placeName: 'Tokoin',
        location: LatLng(6.142058599999999, 1.2109306),
        positionTime: '15min'),
    LocationPLace(
        placeName: 'Baguida',
        location: LatLng(6.1642856, 1.3262744),
        positionTime: '22min'),
  ];
 */