"use client"
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
    const router = useRouter();

    const handleCourseViewClick = () => {
        router.push('/CourseView');
      };

    return (
      <div>
      <NavBar title={title} />
      <br></br>
      <NewCourseButton type="button" onClick={handleCourseViewClick}>Back to Courses</NewCourseButton>
      <br></br>
      <AddNewCourse/>
      </div>
    )
}