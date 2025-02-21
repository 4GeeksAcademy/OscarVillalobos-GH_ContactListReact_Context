import React, { useState, useEffect , useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import {ContactCard} from "../component/ContactCard.js"

export const Home = () => {

const {store , actions} =useContext(Context)
	
  return (

    <div className="row">
          <h1>Contacts</h1>

            <ul className="list-group">
              {store.contacts && store.contacts.length > 0 && store.contacts.map((contact, index) =>
              (
              <ContactCard key={index} id={contact.id} name={contact.name} address={contact.address}  phone={contact.phone} email={contact.email} />

              ))}
            </ul>

              

    </div>
  );
};