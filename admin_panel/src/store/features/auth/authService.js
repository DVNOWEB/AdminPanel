import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth, db, googleProvider } from '../../../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

// const signup = async (email, password ) => {
//   const userCredential = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password,
//   )

//   const user = {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//     firstName
//   }
//   // Store user data in a collection
//   await addDoc(collection(db, 'users'), user)

//   return user
// }



const signup = async (formData) => {
  const {
    email,
    password,
    firstName,
    lastName,
    address,
    city,
    postal_code,
    phoneNumber,
  } = formData

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  const user = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    firstName,
    lastName,
    address,
    city,
    postal_code,
    phoneNumber,
  }

  // Store user data in a collection
  await addDoc(collection(db, 'users'), user)

  return user
}


const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  const user = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
  }
  return user
}

const logout = async () => {
  return await signOut(auth)
}

// login as admin
const loginAdmin = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  const admin = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    isAdmin: true, // Add a flag to indicate admin status
  }
  return admin
}

// signup as admin
const registerAdmin = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  const admin = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    isAdmin: true, // Add a flag to indicate admin status
  }
  // Store admin data in a collection
   await addDoc(collection(db, 'admins'), admin)

  return admin
}

// TODO: Implement this function to subscribe to the newsletter and save data in Firebase
const subscribeToNewsletter = async (email) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email)

  const user = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
  }
   await addDoc(collection(db, 'subscribers'), user)

  return user
}

const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider)
  if (!userCredential.user) throw new Error('Google login failed')

  const user = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
  }
  return user
}

const authService = {
  signup,
  login,
  logout,
  registerAdmin,
  loginAdmin,
  subscribeToNewsletter,
  signInWithGoogle,
}

export default authService

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword, signInWithPopup, signOut
// } from 'firebase/auth'
// import { auth, googleProvider } from '../../../firebase/config'

// const signup = async (email, password) => {
//   const userCredential = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   )

//   const user = {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//   }
//   return user
// }

// const login = async (email, password) => {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password)

//   const user = {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//   }
//   return user
// }

// const logout = async () => {
//   return await signOut(auth)
// }

// // login as admin
// const loginAdmin = async (email, password) => {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password)

//   const admin = {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//     isAdmin: true, // Add a flag to indicate admin status
//   }
//   return admin
// }

// // const loginAsAdmin = async (email, password) => {
// //   const userCredential = await signInWithEmailAndPassword(auth, email, password)

// //   const admin = {
// //     uid: userCredential.user.uid,
// //     email: userCredential.user.email,
// //   }
// //   return admin
// // }

// // signup as admin
// const registerAdmin = async (email, password) => {
//   const userCredential = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   )

//   const admin = {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//     isAdmin: true, // Add a flag to indicate admin status
//   }
//   return admin
// }

// // const signupAsAdmin = async (email, password) => {
// //   const userCredential = await createUserWithEmailAndPassword(
// //     auth,
// //     email,
// //     password
// //   )

// //   const admin = {
// //     uid: userCredential.user.uid,
// //     email: userCredential.user.email,
// //   }
// //   return admin
// // }

// // TODO: Implement this function to subscribe to newsletter and save data in firebase
// const subscribeToNewsletter = async (email) => {
//   const userCredential = await createUserWithEmailAndPassword(auth, email)

//   const user = {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//   }
//   return user
// }

// const signInWithGoogle = async () => {
//   const userCredential = await signInWithPopup(auth, googleProvider)
//   if(!userCredential.user) throw new Error('Google login failed')

//   console.log(userCredential)

//   const user = {
//     uid: userCredential.user.uid,
//     email: userCredential.user.email,
//   }
//   return user
// }

// const authService = {
//   signup,
//   login,
//   logout,
//   registerAdmin,
//   loginAdmin,
//   subscribeToNewsletter,
//   signInWithGoogle,
// }

// export default authService
