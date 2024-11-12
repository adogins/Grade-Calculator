import React from 'react';
import Card from './Card';


type Course = {
   courseName: string;
   courseNumber: string;
   professor: string;
   syllabus: string;
   assignments: Assignment[];
 };
 type CoursesProps = {
   courses: Course[];
 };
type Assignment = {
   name: string;
   weight: string;
   grade: string;
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
       assignments={course.assignments}
         />
       ))}
     </div>
   );
 };
  export default Courses;