"use client";
import React, { useReducer } from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import style from "./SignupForm.module.css";
import { useRouter } from "next/navigation";
import Button from "./SubmitButton";

type User = {
  userId: string;
  name: string;
  username: string;
  email: string;
  password: string;
};

export default function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

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

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    // ensure all fields are filled
    if (!name || !username || !email || !password) {
      setError("Pleaes fill in all fields.");
      return;
    }

    const userId = Math.floor(Math.random() * 1000).toString();

    const newUser: User = { userId, name, username, email, password };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setError("");

        router.push("/");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className={style.bg}>
      <div className={style.signup}>
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
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
