import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const AddContact = () => {

    const { store, actions } = useContext(Context);
    const {id} = useParams()

      const [postData, setPostData] = useState({
        name: "",
        email: "",
        phone: "",
        address:""
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", postData);
        if (!id){
             actions.postContacts(postData)

        }else {
            actions.putContact(postData)
        }
        setPostData({ name: "", email: "", phone: "", address: "" });
    };

    useEffect(()=>{
        if (store.contacts){
            if(id && store.contacts.length > 0) {
                const currentContact = store.contacts.find(item => item.id == id)
                if(currentContact){
                    setPostData(currentContact)
                } 
            }
        }
    }, [id, store.contacts])    

    return (

        <div className="container">

       <h2>{!id ? "Add" : "Edit"} Contact Form</h2>

        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">

                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={postData.name}
                    onChange={handleChange}
                    required
                />
            
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={postData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            </div>
            <div className="mb-3">
                <label htmlFor="message" className="form-label">Phone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={postData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    value={postData.address}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

                  <br />
                <Link to="/">
                    <button className="btn btn-primary">Back home</button>
                </Link>
                                           
            </div>

        );
    };
    