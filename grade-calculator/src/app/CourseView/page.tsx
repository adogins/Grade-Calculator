"use client"
import NavBar from "../../app/components/NavBar";
import { useRouter } from "next/navigation";
import NewCourseButton from "../components/NewCourseButton";
import HomeButton from "../components/HomeButton";
import LogoutButton from "../components/LogoutButton";


export interface NavTitle {
    title: string;
  }
  
  const title: NavTitle = {
    title: "Courses",
  };

export default function CourseViewPage() {
    const routerNC = useRouter();
    const routerHome = useRouter();

    const handleNewCourseClick = () => {
        routerNC.push('/NewCourse');
    };

    const handleHomeClick = () => {
        routerHome.push('/');
    };


    return (
        <div>
            <NavBar title={title} />
            <br></br>
            <NewCourseButton type="button" onClick={handleNewCourseClick}>Add a Course</NewCourseButton>
            <br></br>
            <HomeButton type="button" onClick={handleHomeClick}>Back to Login</HomeButton>
            <br></br>
            <LogoutButton type="button" onClick={handleHomeClick}>Logout</LogoutButton>

        </div>
    )
}


