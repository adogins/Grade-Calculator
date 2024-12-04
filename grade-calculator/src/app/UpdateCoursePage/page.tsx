"use client";
import { useSearchParams } from "next/navigation";
import NavBar from "../components/NavBar";
import UpdateCourse from "../components/UpdateCourse";

export interface NavTitle {
  title: string;
}

const title: NavTitle = {
  title: "Update Course",
};
export default function UpdateCoursePage() {
  
    return (
      <div>
        <NavBar title={title} />
        <br />
        { <UpdateCourse  />} 
      </div>
    );
  }
  