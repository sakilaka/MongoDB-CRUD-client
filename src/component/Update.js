import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storeUser = useLoaderData();
    console.log(storeUser);
    const [user, setUser] = useState({});

    const handleUpdateUser = (event) => {
        event.preventDefault();
        console.log(user);

        fetch(`http://localhost:5000/users/${storeUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert('Updated successfully.')
                    event.target.reset();
                }
            })
    }
    const handleChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...storeUser };
        newUser[field] = value;
        setUser(newUser);
        console.log(newUser);
    }
    return (
        <div>
            <h2>please Update : {storeUser.name} </h2>
            <form onSubmit={handleUpdateUser} action="">
                <input onChange={handleChange} type="text" defaultValue={storeUser.name} name="name" placeholder='name' id="" required />  <br />
                <input onChange={handleChange} type="email" defaultValue={storeUser.email} name="email" placeholder='email' id="" required />  <br />
                <input onChange={handleChange} type="text" defaultValue={storeUser.address} name="address" placeholder='address' id="" required />  <br />
                <button type='submit'>Update user</button>
            </form>

        </div>
    );
};

export default Update;