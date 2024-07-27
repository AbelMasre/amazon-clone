import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      // firebase auth
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        });
    } else {
      setLoading({ ...loading, signUp: true });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        });
    }
  };

  // console.log(password, email);

  return (
    <section className={classes.login}>
      <Link to={"/"}>
        <img
          src="https://banner2.cleanpng.com/20180721/tbz/kisspng-amazon-com-brand-logo-e-commerce-customer-international-volunteering-5b534dc6015e31.6273062615321860540056.jpg"
          alt="amazon-log"
        />
      </Link>
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login__signInButton}
          >
            {loading.signIn ? <ClipLoader size={18} /> : "Sign In"}
          </button>
        </form>
        {/* agrrement */}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
          magni repellendus eaque sit culpa dolor, ipsum inventore soluta
          recusandae magnam nulla. Ex laborum ab fugit eum quibusdam nisi atque
          vitae?
        </p>
        {/* create account */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.login__registerButton}
        >
          {loading.signUp ? (
            <ClipLoader size={18} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small
            style={{ paddingTop: "5px", color: "red", textAlign: "center" }}
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
