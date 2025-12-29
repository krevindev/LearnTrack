import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// --- Types ---
type SignUpData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

// SIGN UP
export async function signUpWithEmail(data: SignUpData) {
  // Create user in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  const user = userCredential.user;

  // Save extra info to Firestore
  await setDoc(doc(db, "users", user.uid), {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
    createdAt: new Date(),
  });

  return user;
}

// SIGN IN
export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);

  return cred.user;
}

// SIGN OUT
export async function logoutUser() {
  await signOut;
}
