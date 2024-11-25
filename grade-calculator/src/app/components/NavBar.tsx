import React from "react";
import style from "./NavBar.module.css";
import Image from "next/image";
import calculator from "../../../public/images/calculator.png"; // image is from: https://icons8.com/icons/set/calculator
import { NavTitle } from "../page";

export default function Nav({ title }: { title: NavTitle }) {
  return (
    <nav className={style.nav}>
      <Image
        className={style.pic}
        src={calculator}
        alt="Image of a calculator"
        width={120}
        height={120}
      />
      <h1 className="title">{title.title}</h1>
    </nav>
  );
}
