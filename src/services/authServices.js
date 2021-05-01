export const signIn = (email, password) =>{
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential.uid);
        console.log("succesful login");
        props.history.push("/");
      })
      .catch((err) => setError(err.message));
}
export const logout = () => {
    auth.signOut().then(() => {
      history.push("/login");
      window.location.reload(true);
    });
  };

export const signUp = (email, password)=>{
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        db.collection("SignedUpUserList")
          .doc(userCredential.user.uid)
          .set({
            Name: name,
            Email: email,
            Type: "client",
          })
          .then(() => {
            setName("");
            setEmail("");
            setPassword("");
            setError("");
            props.history.push("/login");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
}