import { useState, ChangeEvent, FormEvent } from 'react';
import style from "./AddNewCourse.module.css";
import { useRouter } from "next/navigation";
import ExitNewCourseButton from "../components/ExitNewCourseButton";
import SubmitNewCourseButton from './SubmitNewCourseButton';

type NewClassProps = {
    // onAddCourse: ()
}

export default function AddNewCourse() {
    
    const [courseName, setCourseName] = useState('');
    const [courseNumber, setCourseNumber] = useState('');
    const [professor, setProfessor] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [assignment1, setAssignment1] = useState('');
    const [assignment2, setAssignment2] = useState('');
    const [assignment3, setAssignment3] = useState('');
    const [weight1, setWeight1] = useState('');
    const [weight2, setWeight2] = useState('');
    const [weight3, setWeight3] = useState('');
    const [grade1, setGrade1] = useState('');
    const [grade2, setGrade2] = useState('');
    const [grade3, setGrade3] = useState('');

    const courseNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCourseName(event.target.value);
    };
    const courseNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCourseNumber(event.target.value);
    };
    const professorChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setProfessor(event.target.value);
    };
    const syllabusChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSyllabus(event.target.value);
    };
    const assignment1ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAssignment1(event.target.value);
    };
    const assignment2ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAssignment2(event.target.value);
    };
    const assignment3ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAssignment3(event.target.value);
    };
    const weight1ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setWeight1(event.target.value);
    };
    const weight2ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setWeight2(event.target.value);
    };
    const weight3ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setWeight3(event.target.value);
    };
    const grade1ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setGrade1(event.target.value);
    };
    const grade2ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setGrade2(event.target.value);
    };
    const grade3ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setGrade3(event.target.value);
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        const CourseData = {
            courseName: courseName,
            courseNumber: courseNumber,
            professor: professor,
            syllabus: syllabus,
            assignment1: assignment1,
            assignment2: assignment2,
            assignment3: assignment3,
            weight1: weight1,
            weight2: weight2,
            weight3: weight3,
            grade1: grade1,
            grade2: grade2,
            grade3: grade3,
        };

        console.log("From NewCourse, the CourseData:");
        console.log(CourseData);

        setCourseName('');
        setCourseNumber('');
        setProfessor('');
        setSyllabus('');
        setAssignment1('');
        setAssignment2('');
        setAssignment3('');
        setWeight1('');
        setWeight2('');
        setWeight3('');
        setGrade1('');
        setGrade2('');
        setGrade3('');
    };

    const router = useRouter();

    const handleCourseViewClick = () => {
        router.push('../CourseView');
      };

    return (
        <div>
            <section className={style.bg}>

                <div className={style.Xbutton}>
                    <ExitNewCourseButton type="button" onClick={handleCourseViewClick}>ⓧ</ExitNewCourseButton>
                </div>

                <form onSubmit={submitHandler}>

                    <h1>Add New Course</h1>
                    <div className={style.course}>
                        
                            <h2 className={style.courseItem}>Course Name:</h2> 
                            <input
                                className={style.courseItem}
                                id="courseName"
                                type="text"
                                placeholder="Name of your course"
                                value={courseName}
                                onChange={courseNameChangeHandler}
                            />
                        
                            <h2 className={style.courseItem}>Course Number:</h2>
                            <input 
                                className={style.courseItem}
                                id="courseNumber"
                                type="text"
                                placeholder="ID Number of your course"
                                value={courseNumber}
                                onChange={courseNumberChangeHandler}     
                            />
                        
                            <h2 className={style.courseItem}>Professor:</h2>
                            <input 
                                className={style.courseItem}
                                id="professor"
                                type="text"
                                placeholder="Name of your professor"
                                value={professor}
                                onChange={professorChangeHandler} 
                            />
                        
                            <h2 className={style.courseItem}>Link to Syllabus:</h2>
                            <input 
                                className={style.courseItem}
                                id="syllabus"
                                type="url"
                                placeholder="Link to your syllabus"
                                value={syllabus}
                                onChange={syllabusChangeHandler}
                            />
                        
                    </div>

                    <h1>Grades</h1>

                    <div className={style.grade}>

                        <div className={style.gradeItem}>Assignment Title</div>
                        <div className={style.gradeItem}>Weight</div>
                        <div className={style.gradeItem}>Grade</div>

                        <input 
                            className={style.gradeItem} 
                            id="assignment1"
                            type="text"
                            placeholder="Title of your assignment"
                            value={assignment1}
                            onChange={assignment1ChangeHandler}    
                        />

                        <input 
                            className={style.gradeItem} 
                            id="weight1"
                            type="text"
                            placeholder="Weight of your grade (out of 100)"
                            value={weight1}
                            onChange={weight1ChangeHandler}
                        />

                        <input 
                            className={style.gradeItem} 
                            id="grade1"
                            type="text"
                            placeholder="Grade you received (out of 100)"
                            value={grade1}
                            onChange={grade1ChangeHandler}
                        />

                        <input 
                            className={style.gradeItem} 
                            id="assignment2"
                            type="text"
                            placeholder="Title of your assignment"
                            value={assignment2}
                            onChange={assignment2ChangeHandler}    
                        />

                        <input 
                            className={style.gradeItem} 
                            id="weight2"
                            type="text"
                            placeholder="Weight of your grade (out of 100)"
                            value={weight2}
                            onChange={weight2ChangeHandler}
                        />

                        <input 
                            className={style.gradeItem} 
                            id="grade2"
                            type="text"
                            placeholder="Grade you received (out of 100)"
                            value={grade2}
                            onChange={grade2ChangeHandler}
                        />

                        <input 
                            className={style.gradeItem} 
                            id="assignment3"
                            type="text"
                            placeholder="Title of your assignment"
                            value={assignment3}
                            onChange={assignment3ChangeHandler}    
                        />

                        <input 
                            className={style.gradeItem} 
                            id="weight3"
                            type="text"
                            placeholder="Weight of your grade (out of 100)"
                            value={weight3}
                            onChange={weight3ChangeHandler}
                        />

                        <input 
                            className={style.gradeItem} 
                            id="grade3"
                            type="text"
                            placeholder="Grade you received (out of 100)"
                            value={grade3}
                            onChange={grade3ChangeHandler}
                        />
                    </div>

                    <div className={style.submitButton}>
                        <SubmitNewCourseButton type="button" onClick={submitHandler}>Submit</SubmitNewCourseButton>
                    </div>
                </form>
            </section>
            
        </div>
    );
}
