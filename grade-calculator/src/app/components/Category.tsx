import { useState, ChangeEvent, FormEvent } from 'react';
import style from "./Category.module.css";
import Assignment from './Assignment'
import { v4 as uuidv4 } from 'uuid';


export type AssignmentType = {
    id: string;
    assignmentName: string;
    grade: number | null;
};

type CategoryProps = {
    category: {
        id: string;
        categoryName: string;
        weight: number | null;
        assignments: AssignmentType[];
    };
    onUpdateCategory: (field: 'categoryName' | 'weight' | 'assignments', value: string | AssignmentType[]) => void;
    onDeleteCategory: () => void;
    onUpdateAssignment: (categoryId: string, assignmentId: string, field: 'assignmentName' | 'grade', value: string) => void;
    onDeleteAssignment: (categoryId: string, assignmentId: string) => void;
};

export default function Category({ category, onUpdateCategory, onDeleteCategory, onUpdateAssignment, onDeleteAssignment }: CategoryProps) {

    const categoryNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onUpdateCategory('categoryName', event.target.value);
    };
    const categoryWeightChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onUpdateCategory('weight', event.target.value);
    };

    

    const addAssignment = () => {
        const newAssignment: AssignmentType = { 
            id: uuidv4(),
            assignmentName: '',
            grade: null,
        };
        onUpdateCategory('assignments', [...category.assignments, newAssignment]);
    };

    return (
        <div className={style.category}>
            
            <div className={style.categoryHeader}>
                <input 
                    className={style.categoryName} 
                    id="categoryName"
                    type="text"
                    placeholder="Category Name"
                    value={category.categoryName}
                    onChange={categoryNameChangeHandler}    
                />

                <input 
                    className={style.categoryWeight} 
                    id="categoryWeight"
                    type="number"
                    placeholder="Weight"
                    value={category.weight !== null ? category.weight : ''}
                    onChange={categoryWeightChangeHandler}    
                />

                <button onClick={onDeleteCategory} className={style.deleteButton}>
                    Delete
                </button>
            </div>

            <hr className={style.line}/>

            <div className={style.assignmentList} >
                <div>
                    {category.assignments.map((assignment) => (
                    <div key={assignment.id}>
                        <Assignment
                            assignment={assignment}
                            onUpdate={(field, value) => onUpdateAssignment(category.id, assignment.id, field, value)}
                            onDelete={() => onDeleteAssignment(category.id, assignment.id)}
                        />
                    </div>
                    ))}
                </div>

                <button onClick={addAssignment}>Add Assignment</button>
            </div>

        </div>
    )
}
