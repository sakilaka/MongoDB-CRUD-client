import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
  const users = useLoaderData();
  const [disUser, setDisUser] = useState(users)

  const handleDelete = user => {
    const agree = window.confirm(`Are you sure delete ${user.name}`)
    if(agree){
      fetch(`http://localhost:5000/users/${user._id}`,{
        method:'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.deletedCount > 0){
          alert('user deleted')
          const remainingUsers = disUser.filter(usr => usr._id !== user._id);
          setDisUser(remainingUsers);
        }
      })

      console.log(user._id);
    }

  }

  return (
    <div>
      <h1> User : {disUser.length}</h1>
      {
        disUser.map(user => <p key={user._id}>{user.name} {user.email} 
        <Link to={`/update/${user._id}`}><button>Update</button></Link>
        <button onClick={()=>handleDelete(user)}
        >x</button></p>)
      }
    </div>
  );
};

export default Home;