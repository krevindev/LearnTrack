import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

type SignUpData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

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
