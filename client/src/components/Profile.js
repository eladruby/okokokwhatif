import React from 'react';
import { ErrorContainer} from './styles/SingUp.style';
import { useParams } from 'react-router-dom';

function Profile() {
    let {username} = useParams();

  return (
    <ErrorContainer>
        <div>
            <h1>Hello {username}, Welcome back!</h1>
        </div>
    </ErrorContainer>
  )
}

export default Profile