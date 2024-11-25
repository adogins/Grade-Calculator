import React from 'react';
import Card from './Card';
import { useEffect, useState } from 'react';


type Course = {
   courseName: string;
   courseNumber: string;
   professor: string;
   syllabus: string;
   image: string;
   finalGrade?: number;
 };
 
 type CoursesProps = {
   courses: Course[];
   onDelete: (courseNumber: string) => void;
 };



 const Courses = ({ courses, onDelete }: CoursesProps) => {




   return (
     <div>
    {courses.map((course, index) => (
        <Card
       key={index}
       courseName={course.courseName}
       courseNumber={course.courseNumber}
       professor={course.professor}
       syllabus={course.syllabus}
       image={course.image}
       onDelete={onDelete}
       finalGrade={course.finalGrade}
         />
       ))}
     </div>
   );
 };

 export default Courses;
