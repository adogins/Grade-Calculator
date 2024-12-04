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
    const searchParams = useSearchParams();
    const courseId = searchParams.get("courseId");  // Use courseId here
  
    return (
      <div>
        <NavBar title={title} />
        <br />
        {courseId && <UpdateCourse  courseId={courseId} />} {/* Pass courseId */}
      </div>
    );
  }
  