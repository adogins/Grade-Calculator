"use client"
import NavBar from "../../app/components/NavBar";
import { useRouter } from "next/navigation";
import NewCourseButton from "../components/NewCourseButton";
import HomeButton from "../components/HomeButton";
import LogoutButton from "../components/LogoutButton";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import Courses from "../components/Courses";
import React, { useState, useEffect } from 'react';
import AddNewCourse from "../components/AddNewCourse";

type Course = {
  courseName: string;
  courseNumber: string;
  professor: string;
  syllabus: string;
  image: string;
  finalGrade?: number;
}; 

export interface NavTitle {
  title: string;
}
  
const title: NavTitle = {
  title: "Courses",
};

export default function CourseViewPage() {
   
    const [courses, setCourses] = useState<Course[]>([]);

    const router = useRouter();
    const routerNC = useRouter();
    const routerHome = useRouter();
    const routerEditCourse = useRouter();
    const routerDeleteCourse = useRouter();

    useEffect(() => {
      
      const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      if (storedCourses.length > 0) {
        setCourses(storedCourses);
      }
    }, []);


    useEffect(() => {
      localStorage.setItem('courses', JSON.stringify(courses));
    }, [courses]);
  
    const handleDelete = (courseNumber: string) => {
      const updatedCourses = courses.filter(
        (course) => course.courseNumber !== courseNumber
      );
      setCourses(updatedCourses);
    };
  
    useEffect(() => {
      const handleStorageChange = () => {
          const updatedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
          setCourses(updatedCourses);
      };

      window.addEventListener('storage', handleStorageChange);

      

      return () => {
          window.removeEventListener('storage', handleStorageChange);
      };
    }, []);

    const handleAddCourse = (newCourse: Course) => {
      const updatedCourses = [...courses, newCourse];
        setCourses(updatedCourses);
      localStorage.setItem('courses', JSON.stringify(updatedCourses)); 
    };

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
        <br />
        <Courses courses={courses} onDelete={handleDelete}/>
      
        <LogoutButton type="button" onClick={handleHomeClick}>Logout</LogoutButton>

        <br></br>
        <NewCourseButton type="button" onClick={handleNewCourseClick}>Add a New Course</NewCourseButton>
        <br></br>
    </div>
);
}