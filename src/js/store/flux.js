const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
					demo: [],
					contacts: [],
        },

        actions: {
   
				getContacts: () => {
					const requestOptions = {
						method: "GET",
						redirect: "follow"
					};

					fetch('https://playground.4geeks.com/contact/agendas/Oscar/contacts', requestOptions)
						.then(response => response.json())
						.then(data => {
							console.log(data); // solo para validación, eliminar después
							if (data && data.contacts) {
								setStore({ contacts: data.contacts });
							}
						})
						.catch(error => console.error('Error fetching contacts:', error));
				},

				postContacts: (postData) => {

						const requestOptions = {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							"name": postData.name ,
							"phone": postData.phone,
							"email": postData.email,
							"address": postData.address
						})
						};
					
						fetch("https://playground.4geeks.com/contact/agendas/Oscar/contacts", requestOptions)
						.then((response) => response.json())
						.then(() => {
							// Limpia el formulario después de enviar los datos
							setStore({ postData: { name: "", phone: "", email: "", address: "" } });
							// Actualiza la lista de contactos
							getActions().getContacts();
						})
						.catch((error) => console.error(error));
				},
					
           
				deleteContact: (idToDelete) => {
					console.log("Borrando " + idToDelete); // para revision

					const requestOptions = {
						method: "DELETE",
						redirect: "follow"
					};

					fetch("https://playground.4geeks.com/contact/agendas/Oscar/contacts/" + idToDelete, requestOptions)
						.then((response) => response.text())
						.then((result) => {
							console.log(result);
							fetch('https://playground.4geeks.com/contact/agendas/Oscar/contacts')
								.then((response) => response.json())
								.then((data) => setStore({ contacts: data.contacts }));
						})
						.catch((error) => console.error(error));
				},

				putContact: (updatedContact) => {
									
					return fetch(`https://playground.4geeks.com/contact/agendas/Oscar/contacts/${updatedContact.id}`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(updatedContact)
					})
					.then(response => {
						if (!response.ok) {
							throw new Error('Error updating contact');
						}
						return response.json();
					})
					.then(() => {
						console.log("Contact updated successfully");
						getActions().getContacts();  // Actualiza la lista después de completar el PUT
					})
					.catch(error => console.error('Error:', error));
				}

        } 
    }; 
};

export default getState;