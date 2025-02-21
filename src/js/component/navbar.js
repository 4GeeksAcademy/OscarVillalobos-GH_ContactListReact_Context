import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

    const {actions} =useContext(Context);

	return (
		
		<nav className="navbar navbar-light bg-light mb-3 d-flex justify-content-between">
			<h1 className="navbar-brand">Contacts</h1>

		<div className="ms-auto">
			<Link to="/contact/add">
			<button className="btn btn-primary">Add new contact</button>
		  </Link>
		</div>
	  </nav>
	);
};
