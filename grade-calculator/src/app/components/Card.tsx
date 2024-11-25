import React from 'react';
import style from './Card.module.css';
import { useRouter } from "next/navigation";

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
  image: string;
  onDelete: (courseNumber: string) => void;
  finalGrade?: number;
};

const Card = ({
  courseName,
  courseNumber,
  professor,
  syllabus,
  image,
  onDelete,
  finalGrade,
}: CardProps) => {

  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/EditCoursePage?courseNumber=${courseNumber}`);
  };

  const handleDeleteClick = () => {
    onDelete(courseNumber);
  };

  console.log("Final Grade from Card.tsx:", finalGrade);

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

        <div className={style.footer}>
          <div className={style.buttonContainer}>
            <button className={style.editButton} onClick={handleEditClick}>Edit</button>
            <p className={style.finalGrade}>
            {finalGrade !== undefined ? finalGrade.toFixed(2) +"%" : "Not Yet Calculated"}
            </p>
            <button className={style.deleteButton} onClick={handleDeleteClick}>Delete</button>
          </div>
        </div>

      </div>
    </div>
  );

};
   
export default Card;