"use client";
import NavBar from "../components/NavBar";
import UpdateCourse from "../components/UpdateCourse";



export interface NavTitle {
   title: string;
}
 const title: NavTitle = {
 title: "Update Course",
};

export interface UpdateCoursePageProps {
    userId: string;
    courseId: string;
 }

export default function UpdateCoursePage() {
   return (
       <div>
           <NavBar title={title} />
           <br></br>
           <UpdateCourse/>
       </div>
   );
}