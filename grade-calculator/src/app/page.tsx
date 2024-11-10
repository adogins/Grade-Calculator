import Image from "next/image";
//import styles from "./page.module.css";
import NavBar from "../app/components/NavBar";
import Login from "./components/Login";

export interface NavTitle {
  title: string;
}

const title: NavTitle = {
  title: "Grade Calculator",
};

export default function Home() {
  return (
    <div>
      <NavBar title={title} />
      <br></br>
      <Login />
    </div>
  );
}
