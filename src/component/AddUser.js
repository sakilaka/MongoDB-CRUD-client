import React, { useState } from 'react';

const AddUser = () => {

    const [user, setUser] = useState({});

    const handleAddUser = (event) => {
        event.preventDefault();
        console.log(user);

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    alert('added successfully.')
                    event.target.reset();
                }
            })
    }
    const handleBlur = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
    }


    return (
        <div>
            <h3>Please add a new user</h3>
            <form onSubmit={handleAddUser} action="">
                <input onBlur={handleBlur} type="text" name="name" placeholder='name' id="" required />  <br />
                <input onBlur={handleBlur} type="email" name="email" placeholder='email' id="" required />  <br />
                <input onBlur={handleBlur} type="text" name="address" placeholder='address' id="" required />  <br />
                <button type='submit'>Add user</button>
            </form>
        </div>
    );
};

export default AddUser;