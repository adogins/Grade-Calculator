import { useState, ChangeEvent, FormEvent } from 'react';
import Button from './NewCourseButton';
import style from "./AddNewCourse.module.css";

type NewClassProps = {
    // onAddCourse: ()
}

export default function AddNewCourse(/**{onAddCourse}*/) {
    
    /**
    const [courseName, setCourseName] = useState('');
    const [courseNumber, setCourseNumber] = useState('');
    const [professor, setProfessor] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [assignment, setAssignment] = useState('');
    const [weight, setWeight] = useState('');
    const [grade, setGrade] = useState('');

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
    const assignmentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAssignment(event.target.value);
    };
    const weightChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setWeight(event.target.value);
    };
    const gradeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setGrade(event.target.value);
    };

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();

        const CourseData = {
            courseName: courseName,
            courseNumber: courseNumber,
            professor: professor,
            syllabus: syllabus,
            assignment: assignment,
            weight: weight,
            grade: grade,
        };

        console.log("From NewCourse, the CourseData:");
        console.log(CourseData);

        onAddCourse(CourseData);
        setCourseName('');
        setCourseNumber('');
        setProfessor('');
        setSyllabus('');
        setAssignment('');
        setWeight('');
        setGrade('');
    };
    */

    return (

        <section className={style.bg}>
            <h1>Add New Course</h1>
            <div>
                <div className={style.AddNewCourse}>
                    <h2>Course Name:</h2> 
                    <input type="text"/>
                </div>
                <div className={style.AddNewCourse}>
                    <h2>Course Number:</h2>
                    <input type="text"/>
                </div>
                <div className={style.AddNewCourse}>
                    <h2>Professor:</h2>
                    <input type="text"/>
                </div>
                <div className={style.AddNewCourse}>
                    <h2>Link to Syllabus:</h2>
                    <input type="text"/>
                </div>
            
            </div>
            <h1>Grades</h1>
            <div className={style.grid}>
                <div className={style.gridItem}>Assignment Title</div>
                <div className={style.gridItem}>Weight</div>
                <div className={style.gridItem}>Grade</div>
                <input className={style.gridItem} type="text"/>
                <input className={style.gridItem} type="text"/>
                <input className={style.gridItem} type="text"/>
                <input className={style.gridItem} type="text"/>
                <input className={style.gridItem} type="text"/>
                <input className={style.gridItem} type="text"/>
                <input className={style.gridItem} type="text"/>
                <input className={style.gridItem} type="text"/>
                <input className={style.gridItem} type="text"/>
            </div>
         </section>

        /*
        <form onSubmit={submitHandler}>
            <label htmlFor="courseName">Course Name</label>
            <input
                id="courseName"
                type="text"
                placeholder="Name of your course"
                value={courseName}
                onChange={courseNameChangeHandler}
            />
            <label htmlFor="courseNumber">Course Number</label>
            <input
                id="courseNumber"
                type="text"
                placeholder="ID Number of your course"
                value={courseNumber}
                onChange={courseNumberChangeHandler}
            />
            <label htmlFor="professor">Professor</label>
            <input
                id="professor"
                type="text"
                placeholder="Name of your professor"
                value={professor}
                onChange={professorChangeHandler}
            />
            <label htmlFor="syllabus">Syllabus</label>
            <input
                id="syllabus"
                type="url"
                placeholder="Link to your syllabus"
                value={syllabus}
                onChange={syllabusChangeHandler}
            />
            <label htmlFor="assignment">Assignment</label>
            <input
                id="assignment"
                type="text"
                placeholder="Title of your assignment"
                value={assignment}
                onChange={assignmentChangeHandler}
            />
            <label htmlFor="weight">Weight</label>
            <input
                id="weight"
                type="text"
                placeholder="Weight of your grade (%)"
                value={weight}
                onChange={weightChangeHandler}
            />
            <label htmlFor="grade">Grade</label>
            <input
                id="grade"
                type="text"
                placeholder="Grade you received (%)"
                value={grade}
                onChange={gradeChangeHandler}
            />
            <Button type="submit">Add Course</Button>
        </form>
        */
        
    );
}