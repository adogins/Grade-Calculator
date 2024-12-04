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
  
  const router = useRouter();
  const handleNewCourseClick = () => { router.push('/NewCourse') };
  const handleHomeClick = () => { router.push('/') };
  const handleEditCourseClick = () => { router.push('/CourseView') };
  const handleDeleteCourseClick = () => { router.push('/CourseView') };

  const [courses, setCourses] = useState<Course[]>([]);

  const userId = '674e7e5b38cf8c6df6dfb75a';

  useEffect(() => {
    const fetchCourses = async () => {

      try {
        const existingCoursesResponse = await fetch(`/api/users/${userId}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
         });

        if (!existingCoursesResponse.ok) {
          throw new Error('Failed to fetch courses');
        }

        const storedCourses = await existingCoursesResponse.json();
        
      
        
        setCourses(storedCourses.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }

    };
    fetchCourses();
  }, []);


  const handleDelete = async (courseNumber: string) => {
    try {
      
      const existingCoursesResponse = await fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
      });

      if (!existingCoursesResponse.ok) {
        throw new Error('Failed to get courses');
      }

      const existingCourses = await existingCoursesResponse.json();
      
      const indexToRemove = existingCourses.courses.findIndex((course: Course) => course.courseNumber === courseNumber);  
       
      const updatedCourses = existingCourses.courses.filter(
        (course: Course) => course.courseNumber !== courseNumber
      );

      setCourses(updatedCourses);

      const responseDelete = await fetch(`/api/users/${userId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({courses: updatedCourses}),
      });
  
      if (!responseDelete.ok) {
        throw new Error('Failed to delete course');
      }
  
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  
  return (
    <div>
      <NavBar title={title} />
      <br />
      <Courses courses={courses} onDelete={handleDelete} />
      <LogoutButton type="button" onClick={handleHomeClick}>Logout</LogoutButton>
      <br></br>
      <NewCourseButton type="button" onClick={handleNewCourseClick}>Add a New Course</NewCourseButton>
      <br></br>
    </div>
  );
}