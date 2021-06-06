import React, { useContext, useState } from 'react';
import './login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { userContext } from '../../App';
library.add(fab)


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    // const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photoURL: '',
        newUser: false

    });
    
    setLoggedInUser(user)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } }

    const handleFacebookSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(facebookProvider)
            .then((result) => {
                const user = result.user;
                const { displayName, email, photoURL } = user;
                
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photoURL: photoURL
                }
                setUser(signedInUser);
                history.replace(from);
                
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const handleGoogleSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                var user = result.user;
                
                const { displayName, email, photoURL } = user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photoURL: photoURL
                }
                setUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    
    return (
        <div className="login-container">
            
            <div className="sign-up-form">
                <h1>Create an account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue={loggedInUser.name} placeholder='Your Name' {...register("name", { required: true })} /> <br />
                    {errors.name && <span className='required'>! Name is required</span>} <br />
                    <input defaultValue={loggedInUser.email} placeholder='Your E-mail' {...register("email", { required: true })} /> <br />
                    {errors.email && <span className='required'>! Email is required</span>} <br />
                    <input placeholder='Your Password' {...register("password", { required: true })} /> <br />
                    {errors.password && <span className='required'>! Password is required</span>} <br />

                    
                    <button className="sign-in" type='submit'>Create an account</button><br />
                    Already have an account? <Link className='login'>Login</Link>
                </form>

            </div>
            <hr />Or <hr />
            <div className="another-sign-in">
                <button className="sign-in" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={['fab', 'google']} /> <span>Sign In with Google</span></button> <br />
                <button className="sign-in" onClick={handleFacebookSignIn}><FontAwesomeIcon icon={['fab', 'facebook']} /> Sign In with Facebook</button>
            </div>
        </div>
    );
};

export default Login;