export default function (error: any) {
    if(error === 'auth/email-already-in-use') {
        return 'This email is already in use.';
    } else if(error === 'auth/weak-password') {
        return 'Password should be at least 6 characters.';
    } else if(error === 'auth/invalid-credential') {
        return 'Wrong email or password.'
    }
    return 'Something went wrong! Try again.';
}