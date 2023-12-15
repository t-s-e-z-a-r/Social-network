import React from 'react';
import { useSelector } from 'react-redux';

function MyAccount(props) {
    const userData = useSelector((state) => state.user)
    const loginData = useSelector((state) => state.auth)
    const handleSubmit = async () => {
    }

    return (
        <div>
            {userData.firstName && loginData.token ? (
                <React.Fragment>
                    <h4>You have entered in your account</h4>
                    <button onClick={handleSubmit}>Get</button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <h4>You haven't entered in your account</h4>
                    <h4>Please login</h4>
                </React.Fragment>
            )}
        </div>
    );
}

export default MyAccount;
