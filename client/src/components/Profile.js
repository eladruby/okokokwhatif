import React from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
    let {username} = useParams();

  return (
    <div>
        <div>
            <h1>Hello {username}, Welcome back!</h1>
        </div>
    </div>
  )
}

export default Profile