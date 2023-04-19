import React, { useState } from 'react'
import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';
import app from '../../firebase/firebase.init';

const Login = () => {
    const [user,setuser]=useState(null);
    const auth=getAuth(app);
    console.log(app)
    const provider = new GoogleAuthProvider();
    const githubprovider= new GithubAuthProvider();
    const handleGoogleSignIn=()=>{
        signInWithPopup(auth,provider)
        .then(result=>{
            const loggedInuser=result.user;
            console.log(loggedInuser)
            setuser(loggedInuser);
        })
        .catch(error=>{
            console.log('error',error.message)
        })

    }
    const handleSignOut=()=>{
        signOut(auth)
        .then(result=>{
            console.log(result)
            setuser(null)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const handleGithubSignIn=()=>{
        signInWithPopup(auth,githubprovider)
        .then(result=>{
            const loggedinuser=result.user;
            console.log(loggedinuser);
            setuser(loggedinuser);
        })
        .catch(error => {
            console.log(error)
        })
    }
  return (
    <div>
        {/*user? logout: sign in*/}
        {user ? <button onClick={handleSignOut}>Sign Out</button> :
        <div>
    <button onClick={handleGoogleSignIn}>Google Login</button>
    <button onClick={handleGithubSignIn}>Github login</button>
    </div>
    }
    
    {
        user && <div>
        <h3>User:{user.displayName}</h3>
        <p>Email:{user.email}</p>
        <img src={user.photoURL } alt="" />
        </div>
    }
    </div>
  )
}

export default Login