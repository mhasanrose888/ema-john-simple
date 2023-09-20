import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { googleSignIn } from './LoginManager';
import { initializeLoginFramework } from './LoginManager';
import { fbSignIn } from './LoginManager';
import { gitSignIn } from './LoginManager';
import { handleSignOut } from './LoginManager';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';


// initializeApp(firebaseConfig);



function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // const googleProvider = new GoogleAuthProvider();
  // const fbProvider = new FacebookAuthProvider();
  // const gitProvider = new GithubAuthProvider();


  const handleGoogleSignIn = () => {
    // const auth = getAuth();
    // signInWithPopup(auth, googleProvider)
    //   .then(res => {
    //     const { displayName, email, photoURL } = res.user;
    //     const signedInUser = {
    //       isSignedIn: true,
    //       name: displayName,
    //       email: email,
    //       photo: photoURL,
    //     }
    //     setUser(signedInUser);
    //     // console.log(displayName, email, photoURL);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     console.log(error.message);
    //   })
    googleSignIn()
    .then(res => {
      setUser(res)
      setLoggedInUser(res)
    })
  }

  const handleFbSignIn = () => {

    // const auth = getAuth();
    // signInWithPopup(auth, fbProvider)
    //   .then(function(result) {
    //     var token = result.credential.accessToken;
    //     var user = result.user;
    //     console.log('sign in after fb user', user);
    //   })
    //   .catch(function (error) {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(errorCode, errorMessage);
    //   });
    fbSignIn()
    .then(res => {
      setUser(res)
      setLoggedInUser(res)
    })
  }

  const handleSignInGit = () => {
    // const auth = getAuth();
    // signInWithPopup(auth, gitProvider)
    //   .then((result) => {
    //     const credential = GithubAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     const user = result.user;
    //     setUser(user);
    //     //    console.log('git user',user, token);
    //   }).catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     const email = error.customData.email;
    //     const credential = GithubAuthProvider.credentialFromError(error);
    //     console.log(error, errorCode, errorMessage, email, credential);
    //   });
    gitSignIn()
    .then(res => {
      setUser(res)
      setLoggedInUser(res)
    })
  }


  const handleSubmit = (event) => {
    // console.log(user.email, user.password);
    console.log(user.email, 'User Logged in Successfully');
    const auth = getAuth();
    if (newUser && user.name && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        })
      // createUserWithEmailAndPassword(user.name, user.email, user.password)
      // .then(res => {
      //   setUser(res)
      //   setLoggedInUser(res)
      // })
    }
    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          
        })
        .catch(function(error) {
          const newUserInfo = {...user};
          newUserInfo.error= error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        }
          
        )
      // signInWithEmailAndPassword(user.email, user.password)
      // .then(res => {
      //   setUser(res)
      //   setLoggedInUser(res)
      // })
    }
    event.preventDefault();
  }



  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      //regular Expression regex
      isFieldValid = /^\S+@\S+\.\S+$/.test(event.target.value);

    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 7;
      const isPasswordNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && isPasswordNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      setUser(res)
      setLoggedInUser(res)
    })
  }

  // const handleSignOut = () => {
    // const auth = getAuth();
    // signOut(auth)
    //   .then(res => {
    //     const signedOutUser = {
    //       isSignedIn: false,
    //       name: '',
    //       email: '',
    //       photo: '',
    //       error: '',
    //       success: false
    //     }
    //      setUser(signedOutUser);
    //     // console.log(res);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     console.log(error.message);
    //   })
  // }
  const updateUserName = name => {
    const auth = getAuth();
  updateProfile(auth.currentUser, {
      displayName: name
    }).then(res => {
      console.log('user name updated successfully')
    }).catch(error => {
      console.log(error);
    })
  }




  return (
    <>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button>
          :
          <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      }
      <br />
      <button onClick={handleFbSignIn}>Sing in with Facebook</button>
      <button onClick={handleSignInGit}>Sign In with Git</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>My email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {
          newUser && <input type="text" name='name' onBlur={handleBlur} placeholder='Your Name' />
        }
        <br />
        <input type="text" name='email' onBlur={handleBlur} placeholder='Enter your email' required />
        <br />
        <input type="password" name='password' onBlur={handleBlur} placeholder='Password' required />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
      }
    </>
  )
}

export default Login;
