"use client";
import React, { use } from "react";
import style from "./Login.module.css";
import Image from "next/image";
import user from "../../../public/images/User.png";
import lock from "../../../public/images/Lock.png";
import Button from "./LoginButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/CourseView");
  };

  return (
    <section className={style.bg}>
      <h1>Welcome Back !</h1>
      <div className={style.bg2}>
        <form>
          <div className={style.signin}>
            <div className={style.rows}>
              <label htmlFor="username">Username</label>
              <input
                className={style.input}
                id="username"
                type="text"
                placeholder="Enter your username"
              />
              <Image
                className={style.pic}
                src={user}
                alt="User icon"
                width={50}
                height={50}
              />
            </div>
            <div className={style.rows}>
              <label htmlFor="password">Password</label>
              <input
                className={style.input}
                id="password"
                type="text"
                placeholder="Enter your password"
              />
              <Image
                className={style.pic}
                src={lock}
                alt="User icon"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className={style.link}>
            <Link id={style.forgot} href={"/"}>
              Forgot Password?
            </Link>
            <Link id={style.account} href={"/Signup"}>
              Create Account
            </Link>
          </div>
          <div className={style.btn}>
            <Button type="button" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Login;
