"use client"
import style from "./page.module.css";
import NavBar from "../components/NavBar";
import { useRouter } from "next/navigation";
import EditCourse from "../components/EditCourse";


export interface NavTitle {
    title: string;
}
  
  const title: NavTitle = {
    title: "Edit Course",
  };

export default function EditCoursePage() {

    return (
      <div>
      <NavBar title={title} />
      <br></br>
      <EditCourse/>
      </div>
    )
}