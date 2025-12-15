import React from 'react';

const LoginGate = ({handleLogin}) => {
    return (
        <>
            <div>Please Log In!</div>
            <button onClick={handleLogin}>ClickToLogIn</button>
        </>
    )
}

export default LoginGate;