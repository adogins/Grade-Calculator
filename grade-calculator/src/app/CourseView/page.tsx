"use client"
import NavBar from "../../app/components/NavBar";
import { useRouter } from "next/navigation";
import NewCourseButton from "../components/NewCourseButton";
import HomeButton from "../components/HomeButton";
import LogoutButton from "../components/LogoutButton";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";


export interface NavTitle {
    title: string;
  }
  
  const title: NavTitle = {
    title: "Courses",
  };

export default function CourseViewPage() {
    const routerNC = useRouter();
    const routerHome = useRouter();
    const routerEditCourse = useRouter();
    const routerDeleteCourse = useRouter();

    const handleNewCourseClick = () => {
        routerNC.push('/NewCourse');
    };

    const handleHomeClick = () => {
        routerHome.push('/');
    };

    const handleEditCourseClick = () => {
        routerEditCourse.push('/CourseView');
    };

    const handleDeleteCourseClick = () => {
        routerDeleteCourse.push('/CourseView');
    };


    return (
        <div>
            <NavBar title={title} />
            <br></br>
            <NewCourseButton type="button" onClick={handleNewCourseClick}>Add a New Course</NewCourseButton>
            <br></br>
            <HomeButton type="button" onClick={handleHomeClick}>Back to Login</HomeButton>
            <br></br>
            <LogoutButton type="button" onClick={handleHomeClick}>Logout</LogoutButton>
            <br></br>
            <EditButton type="button" onClick={handleEditCourseClick}>Edit</EditButton>
            <br></br>
            <DeleteButton type="button" onClick={handleDeleteCourseClick}>Delete</DeleteButton>

        </div>
    )
}


