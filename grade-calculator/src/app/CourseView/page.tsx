"use client"
import NavBar from "../../app/components/NavBar";
import { useRouter } from "next/navigation";
import NewCourseButton from "../components/NewCourseButton";
import HomeButton from "../components/HomeButton";
import LogoutButton from "../components/LogoutButton";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import Courses from "../components/Courses";
import React, { useState } from 'react';




type Assignment = {
    name: string;
    weight: string;
    grade: string;
  };
  type Course = {
    courseName: string;
    courseNumber: string;
    professor: string;
    syllabus: string;
    finalGrade: string;
  };
   const initial: Course[] = [
    {
      courseName: "Intro to Prog",
      courseNumber: "CS1301",
      professor: "Dr.Liang",
      syllabus: "https://computing.uga.edu/courses/content/csci-1301-1301l",
      finalGrade: "89",
      
    },
    {
        courseName: "Comp Networks",
        courseNumber: "CS300",
        professor: "Dr. Smith",
        syllabus: "https://computing.uga.edu/courses/content/csci-1302",
        finalGrade: "74",
      },
      {
        courseName: "Systems Prog",
        courseNumber: "CS1730",
        professor: "Sal Lamarca",
        syllabus: "https://computing.uga.edu/courses/content/csci-1730",
        finalGrade: "84",
      }
    ];
   

export interface NavTitle {
    title: string;
  }
  
  const title: NavTitle = {
    title: "Courses",
  };

export default function CourseViewPage() {
    const [courses, setCourses] = useState<Course[]>(initial);


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
        <br />
        <Courses courses={courses} />
      
        <LogoutButton type="button" onClick={handleHomeClick}>Logout</LogoutButton>

        <br></br>
            <NewCourseButton type="button" onClick={handleNewCourseClick}>Add a New Course</NewCourseButton>
            <br></br>
    </div>
);
}


