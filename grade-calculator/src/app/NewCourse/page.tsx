"use client"
import style from "./page.module.css";
import NavBar from "../../app/components/NavBar";
import { useRouter } from "next/navigation";
import NewCourseButton from "../components/NewCourseButton";
import AddNewCourse from "../components/AddNewCourse";

export interface NavTitle {
    title: string;
  }
  
  const title: NavTitle = {
    title: "New Course",
  };

export default function NewCoursePage() {
    

    return (
      <div>
      <NavBar title={title} />
      <br></br>
      <AddNewCourse/>
      </div>
    )
}