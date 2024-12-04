import { useState, ChangeEvent, FormEvent } from 'react';
import style from "./AddNewCourse.module.css";
import { useRouter } from "next/navigation";
import ExitNewCourseButton from "../components/ExitNewCourseButton";
import SubmitNewCourseButton from './SubmitNewCourseButton';


export default function AddNewCourse() {
    
    const [courseName, setCourseName] = useState('');
    const [courseNumber, setCourseNumber] = useState('');
    const [professor, setProfessor] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [image, setImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
    const imageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value);
    }

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        if (courseName.trim() === '' || 
            courseNumber.trim() === '' || 
            professor.trim() === '' || 
            syllabus.trim() === '' || 
            image.trim() === '') {
            setErrorMessage('All fields must be filled out.');
            return;
        }

        if (!image.startsWith('https://images.unsplash.com/')) {
            setErrorMessage('The image URL must start with https://images.unsplash.com/.');
            return;
        }

        setErrorMessage('');

        const CourseData = {
            courseName: courseName,
            courseNumber: courseNumber,
            professor: professor,
            syllabus: syllabus,
            image: image,
        };


        const userId = '674e7e5b38cf8c6df6dfb75a';
        

        try {
            const existingCoursesResponse = await fetch(`/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!existingCoursesResponse.ok) {
                const errorData = await existingCoursesResponse.json();
                throw new Error(errorData.error || 'Failed to add course');
            }

            const existingCourses = await existingCoursesResponse.json();
            const updatedCourses = [...existingCourses.courses, CourseData];

            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({courses: updatedCourses}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add course');
            }
            
            const data = await response.json();

        } catch (error) {
            setErrorMessage("An Error Occured.");
            console.log(error);
        }

        console.log("From AddNewCourse, the CourseData:");
        console.log(CourseData);
       
        setCourseName('');
        setCourseNumber('');
        setProfessor('');
        setSyllabus('');
        setImage('');

        handleCourseViewClick();
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

                <form onSubmit={submitHandler} className={style.form}>

                    <h1>Create a New Course</h1>
                    <div className={style.course}>
                        
                            <h2 className={style.courseItem}>Course Name:</h2> 
                            <input
                                className={style.courseItem}
                                id="courseName"
                                type="text"
                                placeholder="ex. Web Programming"
                                value={courseName}
                                onChange={courseNameChangeHandler}
                            />
                        
                            <h2 className={style.courseItem}>Course Number:</h2>
                            <input 
                                className={style.courseItem}
                                id="courseNumber"
                                type="text"
                                placeholder="ex. CSCI 4300"
                                value={courseNumber}
                                onChange={courseNumberChangeHandler}     
                            />
                        
                            <h2 className={style.courseItem}>Professor:</h2>
                            <input 
                                className={style.courseItem}
                                id="professor"
                                type="text"
                                placeholder="ex. Diane Stephens"
                                value={professor}
                                onChange={professorChangeHandler} 
                            />
                        
                            <h2 className={style.courseItem}>Link to Syllabus:</h2>
                            <input 
                                className={style.courseItem}
                                id="syllabus"
                                type="url"
                                placeholder="ex. https://www.cs.uga.edu/courses/content/csci-4300"
                                value={syllabus}
                                onChange={syllabusChangeHandler}
                            />

                            <h2 className={style.courseItem}>Link to Image:</h2>
                            <input 
                                className={style.courseItem}
                                id="image"
                                type="url"
                                placeholder="ex. https://images.unsplash.com/photo-1509966756634-9c23dd6e6815" 
                                value={image}
                                onChange={imageChangeHandler}
                            />

                    </div>

                    {errorMessage && (<p className={style.errorMessage}>{errorMessage}</p>)}

                    <div className={style.submitButton}>
                        <SubmitNewCourseButton type="button" onClick={submitHandler}>Submit</SubmitNewCourseButton>
                    </div>

                </form>
            </section>
            
        </div>
    );
}