"use client";
import React from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import SignupForm from "../components/SignupForm";
/*import Users from "../components/Users";*/

export interface NavTitle {
  title: string;
}

const title: NavTitle = {
  title: "Signup",
};

type User = {
  name: string;
  username: string;
  email: string;
  password: string;
};

const DEMO_USER: User[] = [
  {
    name: "Jane Doe",
    username: "j-doe",
    email: "jane.doe@gmail.com",
    password: "password",
  },
];

export default function Signup() {
  const [users, setUsers] = useState<User[]>(DEMO_USER);
  // Handler to pass data from SignupForm to new user
  const signupHandler = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // adds new users to array of users
  };

  return (
    <div>
      <NavBar title={title} />
      <br></br>
      <SignupForm onSignup={signupHandler} />
      {/*<Users users={users} /> */}
    </div>
  );
}
