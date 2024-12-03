import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import style from "./EditCourse.module.css";
import { useRouter } from "next/navigation";
import ExitNewCourseButton from "../components/ExitNewCourseButton";
import Category from './Category'
import { AssignmentType } from './Category'
import { useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

type CategoryType = {
    categoryId: string;
    categoryName: string;
    weight: number | null;
    assignments: {
        assignmentId: string;
        assignmentName: string;
        grade: number | null;
    }[];
};


export default function EditCourse() {
    const searchParams = useSearchParams();
    const courseNumberToEdit = searchParams.get('courseNumber');
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    
    const userId = '674e7e5b38cf8c6df6dfb75a';


    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();

              
                const courseToEdit = userData.courses.find(
                    (course: any) => course.courseNumber === courseNumberToEdit
                );

                if (!courseToEdit) {
                    throw new Error('Course not found');
                }

              
                setCategories(courseToEdit.categories || []);

            } catch (error) {
                console.error('Error fetching course data:', error);
                setErrorMessage('Failed to load course data.');
            }
        };

        fetchCourseData();
    }, [courseNumberToEdit]);

    

    const addCategory = () => {
        const newCategory: CategoryType = { 
            categoryId: uuidv4(),
            categoryName: '',
            weight: null,
            assignments: [],
        };
        setCategories([...categories, newCategory]);
    };

    const updateCategory = (categoryId: string, field: 'categoryName' | 'weight' | 'assignments', value: string | number | AssignmentType[]) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.categoryId === categoryId ? { ...category, [field]: Array.isArray(value) ? [...value] : value } : category
            )
        );
    };
    
    const deleteCategory = (id: string) => {
        setCategories(categories.filter((category) => category.categoryId !== id));
    };

    const updateAssignment = (categoryId: string, assignmentId: string, field: 'assignmentName' | 'grade', value: string | number) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) => category.categoryId === categoryId ? {
                ...category,
                assignments: category.assignments.map((assignment) =>
                    assignment.assignmentId === assignmentId ? { 
                        ...assignment, [field]: value 
                    } : assignment),
            } : category)
        );
    };

    const deleteAssignment = (categoryId: string, assignmentId: string) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.categoryId === categoryId
                    ? { ...category, assignments: category.assignments.filter((assignment) => assignment.assignmentId !== assignmentId) }
                    : category
            )
        );
    };
    
    function displayError(errorNumber: number): string {
        if (errorNumber === -1) {
            return "All fields must be filled out."
        } else if (errorNumber === -2) {
            return "Weights must total to 100."
        } else if (errorNumber === -3) {
            return "All categories must have at least one assignment."
        } else if (errorNumber === -4) {
            return "Must have at least one category to submit."
        } else {
            return "Unknown error."
        }
    }

    const calculateGrade = (): number => {
        if (categories.length === 0) {
            return -4;
        }

        let totalWeight = 0;
        let totalGrade = 0;

        for (const category of categories) {
            const {weight, categoryName, assignments } = category;
            if (weight === null || 
                weight === undefined ||
                weight === '' || /* this is needed!!! */
                !categoryName || 
                categoryName.trim() === '') {
                return -1;
            }

            if (assignments.length === 0) {
                return -3;
            }

            for (const assignment of category.assignments) {
                const { assignmentName, grade } = assignment;
                if (!assignmentName || 
                    assignmentName.trim() === '' ||
                    grade === null ||
                    grade === undefined ||
                    grade === '') { /* this is needed!!! */
                    return -1;
                }
            }

            totalWeight += Number(weight);
            

            const validAssignments = assignments.filter(a => a.grade !== null);
            const categoryGrade =
                validAssignments.reduce((sum, a) => sum + Number(a.grade ?? 0), 0) / 
                (validAssignments.length || 1);
                totalGrade += (Number(categoryGrade) * Number(weight)) / 100;
        }

        if (totalWeight !== 100) {
            return -2;
        }
    
        return totalGrade;
    };

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const grade = calculateGrade();
    
        if (grade < 0) {
            setErrorMessage(displayError(grade));
            console.log("Error message set:", displayError(grade)); 
        } else {
            setErrorMessage(null);
    
            try {

                const userResponse = await fetch(`/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!userResponse.ok) {
                    const errorData = await userResponse.json();
                    throw new Error(errorData.error || 'Failed to get user info (edit grade)');
                }
    
                const userInfo = await userResponse.json();
    
                const updatedCourses = userInfo.courses.map((course: any) => {
                    if (course.courseNumber === courseNumberToEdit) {
                        return {
                            ...course,
                            categories: categories,  
                            finalGrade: grade,       
                        };
                    }
                    return course;
                });

                console.log("Payload being sent to backend:", {
                    courses: updatedCourses,
                });
               
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
    
            } catch (error) {
                setErrorMessage("An error occurred while updating the course.");
                console.log(error);
            }
    
          
            router.push('../CourseView');
        }
    };
    

    const handleCourseViewClick = () => {
        router.push('../CourseView');
    };




    return (
        <div>
            <section className={style.editCourseForm}>

                <div className={style.topSection}>
                    <div className={style.courseName}>
                        Calculate Grade:
                    </div>
                    <div className={style.Xbutton}>
                        <ExitNewCourseButton type="button" onClick={handleCourseViewClick}>ⓧ</ExitNewCourseButton>
                    </div>
                </div>

                <form onSubmit={submitHandler} className={style.formSection}>

                    <div className={style.categoryContainer}>
                        
                        <div className={style.cats}>

                            {categories.map((category) => (
                            <div key={category.categoryId}>
                                <Category
                                    category={category}
                                    onUpdateCategory={(field, value) => updateCategory(category.categoryId, field, value)}
                                    onDeleteCategory={() => deleteCategory(category.categoryId)}
                                    onUpdateAssignment={updateAssignment}
                                    onDeleteAssignment={deleteAssignment}
                                />
                            </div>
                            ))}
                        



                        
                        </div>

                    </div>

                    {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}

                    <div className={style.buttons}>
                        <button onClick={addCategory} className={style.button}>Add Category</button>
                        <button onClick={submitHandler} className={style.button}>Submit</button>
                    </div>

                </form>

            </section>
        </div>
    )
}