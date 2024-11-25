"use client";
import React, { useReducer } from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import style from "./SignupForm.module.css";
import { useRouter } from "next/navigation";
import Button from "./SubmitButton";

type SignupProps = {
  onSignup: (newUser: User) => void;
};

type User = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export default function SignupForm({ onSignup }: SignupProps) {
  const router = useRouter();

  const handleSubmitClick = () => {
    router.push("/");
  };

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");

  const nameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const usernameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // new user
    const newUser: User = {
      name: name,
      username: username,
      email: email,
      password: password,
    };

    // ensure a username and password are given
    if (!username || !password) {
      setError("Pleaes enter a username and a password.");
    } else {
      onSignup(newUser);
      // reset form data
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setError("");
    }
  };

  return (
    <div className={style.bg}>
      <h1 className={style.title}>Signup</h1>
      <form className={style.form} onSubmit={submitHandler}>
        {error && <p>{error}</p>}
        <div className={style.name}>
          <label htmlFor="name">Name</label>
          <input
            className={style.input}
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={nameHandler}
          />
        </div>
        <div className={style.username}>
          <label htmlFor="username">Username</label>
          <input
            className={style.input}
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={usernameHandler}
          />
        </div>
        <div className={style.email}>
          <label htmlFor="email">Email</label>
          <input
            className={style.input}
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={emailHandler}
          />
        </div>
        <div className={style.password}>
          <label htmlFor="password">Password</label>
          <input
            className={style.input}
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={passwordHandler}
          />
        </div>
      </form>
      <Button type="submit" onClick={handleSubmitClick}>
        Submit
      </Button>
    </div>
  );
}
