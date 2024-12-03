import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import style from "./AddNewCourse.module.css";
import { useRouter} from 'next/router';
import ExitNewCourseButton from "../components/ExitNewCourseButton";
import SubmitNewCourseButton from './SubmitNewCourseButton';



const UpdateCourse=()=>{
    const [courseName, setCourseName] = useState('');
    const [courseNumber, setCourseNumber] = useState('');
    const [professor, setProfessor] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [image, setImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { userId, courseId } = router.query;
   
    //const userId = '674e7e4938cf8c6df6dfb756';
    useEffect(() => {
      if (userId && courseId) {
          fetchCourseDetails(userId as string, courseId as string);
      }
  }, [userId, courseId]);


  const fetchCourseDetails = async (userId: string, courseId: string) => {
    try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch user data');

        const CourseData = await res.json();

        const courseToEdit = CourseData.courses.find(
            (course: any) => course.id === courseId
        );

        if (!courseToEdit) {
            setErrorMessage('Course not found.');
            return;
        }

        setCourseName(courseToEdit.courseName);
        setCourseNumber(courseToEdit.courseNumber);
        setProfessor(courseToEdit.professor);
        setSyllabus(courseToEdit.syllabus);
        setImage(courseToEdit.image);
    } catch (error) {
        setErrorMessage('An error occurred while fetching course details.');
        console.error(error);
    }
};


    const courseNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setCourseName(event.target.value);
    const courseNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setCourseNumber(event.target.value);
    const professorChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setProfessor(event.target.value);
    const syllabusChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setSyllabus(event.target.value);
    const imageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setImage(event.target.value);

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


        try {
          const updatedCourse = { courseName, courseNumber, professor, syllabus, image };
          const res = await fetch(`/api/users/${userId}/courses/${courseId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCourse),
          });
    
          if (!res.ok) throw new Error(await res.text());
    
          alert('Course updated successfully');
          router.push('../CourseView');
        } catch (error) {
          setErrorMessage("An error occurred while updating the course.");
          console.error(error);
        }
      };
    
    if (loading) return <div>Loading...</div>;

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

        <h2 className={style.courseItem}>Course Number:</h2>
        <input 
            className={style.courseItem}
            id="courseNumber"
            type="text"
            placeholder={courseNumber || "ex. CSCI 4300"}
            value={courseNumber}
            onChange={courseNumberChangeHandler}     
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