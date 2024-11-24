import React from 'react';
import Card from './Card';


type Course = {
   courseName: string;
   courseNumber: string;
   professor: string;
   syllabus: string;
   finalGrade: string;
  
 };
 type CoursesProps = {
   courses: Course[];
 };
 
 
 const Courses = ({ courses }: CoursesProps) => {
   return (
     <div>
    {courses.map((course, index) => (
        <Card
       key={index}
       courseName={course.courseName}
       courseNumber={course.courseNumber}
       professor={course.professor}
       syllabus={course.syllabus}
       finalGrade={course.finalGrade}
         />
       ))}
     </div>
   );
 };
  export default Courses;