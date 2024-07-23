import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

// User Registration function
export const createUser = async (user: any) => {
    const { $auth } = useNuxtApp();
    return createUserWithEmailAndPassword($auth, user.email, user.password)
        .then((cred) => addUserToDb(cred.user.uid, user));
}
const addUserToDb = (uid: string, user: any) => {
    const { $db } = useNuxtApp();
    setDoc(doc($db, "users", uid), {
        id: uid,
        name: user.name,
        surname: user.surname,
        email: user.email
    });
}
// User Log in function
export const logInUser = async (email: string, password: string) => {
    const { $auth } = useNuxtApp();
    return await signInWithEmailAndPassword($auth, email, password)
        .then((cred) => localStorage.setItem('user', cred.user.uid));
}
// User Log out function
export const logOutUser = async () => {
    const { $auth } = useNuxtApp();
    return await $auth.signOut()
        .then(() => localStorage.removeItem('user'));
}