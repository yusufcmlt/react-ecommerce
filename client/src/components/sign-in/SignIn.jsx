import React, { useState } from "react";

import FormInput from "../form-input/FormInput";
import CustomButton from "../../components/custom-button/CustomButton";

import { auth, signInWithGoogle } from "../../firebase/firebase-utils";

import "./SignIn-style.scss";

const SignIn = () => {
  //User credentials state as hook
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setCredentials({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I Already Have an Account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={userCredentials.email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={userCredentials.password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={signInWithGoogle}
            isGoogleSignIn={true}
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
