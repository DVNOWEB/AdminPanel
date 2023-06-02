import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth, db, googleProvider } from '../../../firebase/config'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

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

const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    // Get a specific user from admins collection and filter by uid
    const adminQuery = query(
      collection(db, 'admins'),
      where('uid', '==', userCredential.user.uid)
    )
    const querySnapshot = await getDocs(adminQuery)
    
    if (querySnapshot.docs.length === 0) {
      return {
        isAdmin: false,
      }
    }

   
    if (querySnapshot.length > 0)


    console.log("we shouldn't be here")
    const admin = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      isAdmin: true,
    }
    return admin
  } catch (error) {
    console.log(error)
    return {
      isAdmin: false,
    }
  }
}



const logout = async () => {
  return await signOut(auth)
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
  logout,
  registerAdmin,
  loginAdmin,
  signInWithGoogle,
}

export default authService