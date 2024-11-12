import React from 'react';
import style from './Card.module.css';


type Assignment = {
   name: string;
   weight: string;
   grade: string;
 };


type CardProps = {
 courseName: string;
 courseNumber: string;
 professor: string;
 syllabus: string;
 assignments: Assignment[];


};


const Card = ({
   courseName,
   courseNumber,
   professor,
   syllabus,
   assignments,
 }: CardProps) => {
   return (
       <div className={style.cardContainer}>


       <div className={style.card}>


         <div className={style.coursetop}>


           <h2 className={style.courseName}>{courseName} - {courseNumber}</h2>
      </div>


      <div className={style.professorandsyllabus}>


         <p className={style.professor}>{professor}</p>


         <a className={style.sLink} href={syllabus} rel="syllabus">View Syllabus</a>
       </div>




<div className={style.assignmentList}>
     
       <div className={style.assignmentHeader}>
       <h4 className={style.header}>Assignment</h4>
       <h4 className={style.header}>Weight</h4>
       <h4 className={style.header}>Grade</h4>
         </div>


      
         {assignments.map((assignment, idx) => (
           <div key={idx} className={style.assignmentRow}>
           <div className={style.assignmentName}>{assignment.name}</div>
           <div className={style.assignmentWeight}>{assignment.weight}%</div>
           <div className={style.assignmentGrade}>{assignment.grade}%</div>
           </div>
         ))}
       </div>


       <div className={style.footer}>
       <div className={style.buttonContainer}>
       <button className={style.editButton} >Edit</button>
       <p className={style.finalGrade}>FINAL GRADE</p>
       <button className={style.deleteButton} >Delete</button>
      
           </div>
       </div>
     </div>
   </div>
 );
};
   export default Card;