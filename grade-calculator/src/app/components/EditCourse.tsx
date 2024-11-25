import { useState, ChangeEvent, FormEvent } from 'react';
import style from "./EditCourse.module.css";
import { useRouter } from "next/navigation";
import ExitNewCourseButton from "../components/ExitNewCourseButton";
import Category from './Category'
import { AssignmentType } from './Category'
import { useSearchParams } from 'next/navigation';

type CategoryType = {
    id: number;
    name: string;
    weight: number | null;
    assignments: {
        id: number;
        name: string;
        grade: number | null;
    }[];
};

export default function EditCourse() {
    const searchParams = useSearchParams();
    const courseNumberToEdit = searchParams.get('courseNumber');

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    
    const addCategory = () => {
        const newCategory: CategoryType = { 
            id: Date.now(),
            name: '',
            weight: null,
            assignments: [],
        };
        setCategories([...categories, newCategory]);
    };

    const updateCategory = (categoryId: number, field: 'name' | 'weight' | 'assignments', value: string | AssignmentType[]) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === categoryId ? { ...category, [field]: value } : category
            )
        );
    };
    
    const deleteCategory = (id: number) => {
        setCategories(categories.filter((category) => category.id !== id));
    };

    const updateAssignment = (categoryId: number, assignmentId: number, field: 'name' | 'grade', value: string) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) => category.id === categoryId ? {
                ...category,
                assignments: category.assignments.map((assignment) =>
                    assignment.id === assignmentId ? { 
                        ...assignment, [field]: value 
                    } : assignment),
            } : category)
        );
    };

    const deleteAssignment = (categoryId: number, assignmentId: number) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === categoryId
                    ? { ...category, assignments: category.assignments.filter((assignment) => assignment.id !== assignmentId) }
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
            const {weight, name, assignments } = category;
            console.log("weight:", weight," name:",name," assignments:");
            if (weight === null || 
                weight === undefined ||
                weight === '' || /* this is needed!!! */
                !name || 
                name.trim() === '') {
                return -1;
            }

            if (assignments.length === 0) {
                return -3;
            }

            for (const assignment of category.assignments) {
                const { name, grade } = assignment;
                console.log("name:",name," grade:",grade);
                if (!name || 
                    name.trim() === '' ||
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

    
    
    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        const grade = calculateGrade();
        if (grade < 0) {
            setErrorMessage(displayError(grade));
            console.log("Error message set:", displayError(grade)); 
        } else {
            setErrorMessage(null);
            console.log("Course Data:", categories);
            console.log("Final Grade from EditCourse:", grade);
           


            const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
            const updatedCourses = storedCourses.map((course: any) => {
                if (course.courseNumber === courseNumberToEdit) {
                    return { ...course, finalGrade: grade }; // Add/update finalGrade
                }
                return course;
            });
    
            // Save updated courses back to localStorage
            localStorage.setItem('courses', JSON.stringify(updatedCourses));


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
                            <div key={category.id}>
                                <Category
                                    category={category}
                                    onUpdateCategory={(field, value) => updateCategory(category.id, field, value)}
                                    onDeleteCategory={() => deleteCategory(category.id)}
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
