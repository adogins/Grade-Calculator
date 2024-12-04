"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import style from "./AddNewCourse.module.css";
import { useRouter} from 'next/navigation';
import ExitNewCourseButton from "../components/ExitNewCourseButton";
import SubmitNewCourseButton from './SubmitNewCourseButton';
import { useSearchParams } from 'next/navigation';


type Course = {
    courseName: string;
    courseNumber: string;
    professor: string;
    syllabus: string;
    image: string;
};

const UpdateCourse = () => {
    const [courseName, setCourseName] = useState('');
    const [courseNumber, setCourseNumber] = useState('');
    const [professor, setProfessor] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [image, setImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
 
    const [loading, setLoading] = useState(true);
    const userId='674e7e4938cf8c6df6dfb756';
    const searchParams=useSearchParams();
    const courseNumbertoEdit= searchParams.get('courseNumber');
   
    useEffect(() => {
   

        const fetchCourseData = async () => {
          
            try {
                const response = await fetch(`/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch course data');
                }

                const userData = await response.json();
                

                const courseToEdit = userData.courses.find(
                    (course:any)=> course.courseNumber === courseNumbertoEdit
                    
                );
                console.log('Fetched course:', courseToEdit);//DEBUGTESTING

                setCourseName(courseToEdit.courseName);
                setCourseNumber(courseToEdit.courseNumber);
                setProfessor(courseToEdit.professor);
                setSyllabus(courseToEdit.syllabus);
                setImage(courseToEdit.image);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching course data:', error);
                setErrorMessage('Failed to load course data.');
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseNumbertoEdit]);

    const courseNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setCourseName(event.target.value);
    const courseNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setCourseNumber(event.target.value);
    const professorChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setProfessor(event.target.value);
    const syllabusChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setSyllabus(event.target.value);
    const imageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setImage(event.target.value);

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();



        const updatedCourse = {
            courseName,
            courseNumber,
            professor,
            syllabus,
            image
        };

        try {
            const userResponse = await fetch(`/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!userResponse.ok) {
                const errorData = await userResponse.json();
                throw new Error(errorData.error || 'Failed to get user info ');
            }

            const userInfo = await userResponse.json();
            const updatedCourses = userInfo.courses.map((course: any) => {
                if (course.courseNumber === courseNumbertoEdit) {
                    return {
                        ...course,...updatedCourse }
                    }return course;});

               
               
                const response = await fetch(`/api/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ courses: updatedCourses }), 
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to update course data');
                }

                const data = await response.json();
                console.log("Course data updated successfully:", data);
                router.push('../CourseView');
            } catch (error) {
                setErrorMessage("An error occurred while updating the course.");
                console.log(error);
            }
    };

  return (
        <div>
            <section className={style.bg}>
                <div className={style.Xbutton}>
                    <ExitNewCourseButton type="button" onClick={() => router.push('../CourseView')}>ⓧ</ExitNewCourseButton>
                </div>

                <form onSubmit={submitHandler} className={style.form}>
    <h1>Update Course</h1>
    <div className={style.course}>
        <h2 className={style.courseItem}>Course Name:</h2>
        <input
            className={style.courseItem}
            id="courseName"
            type="text"
            placeholder={courseName || "ex. Web Programming"}
            value={courseName}
            onChange={courseNameChangeHandler}
        />
        

        
        <h2 className={style.courseItem}>Professor:</h2>
        <input 
            className={style.courseItem}
            id="professor"
            type="text"
            placeholder={professor || "ex. Diane Stephens"}
            value={professor}
            onChange={professorChangeHandler} 
        />
        <h2 className={style.courseItem}>Course Number:</h2>
       <input
           className={style.courseItem}
           id="courseNumber"
           type="text"
           placeholder={courseNumber || "ex. CSCI 4300"}
            value={courseNumber}
           onChange={courseNumberChangeHandler}    
       />

        <h2 className={style.courseItem}>Link to Syllabus:</h2>
        <input 
            className={style.courseItem}
            id="syllabus"
            type="url"
            placeholder={syllabus || "ex. https://www.cs.uga.edu/courses/content/csci-4300"}
            value={syllabus}
            onChange={syllabusChangeHandler}
        />

        <h2 className={style.courseItem}>Link to Image:</h2>
        <input 
            className={style.courseItem}
            id="image"
            type="url"
            placeholder={image || "ex. https://images.unsplash.com/photo-1509966756634-9c23dd6e6815"} 
            value={image}
            onChange={imageChangeHandler}
        />
    </div>

    {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}

    <div className={style.submitButton}>
        <SubmitNewCourseButton type="submit">Update Course</SubmitNewCourseButton>
    </div>


</form>

            </section>
        </div>
    );
}

export default UpdateCourse;


