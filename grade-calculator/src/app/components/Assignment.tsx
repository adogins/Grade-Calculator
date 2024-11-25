import { useState, ChangeEvent, FormEvent } from 'react';
import style from "./Assignment.module.css";

type AssignmentProps = {
    assignment: {
        id: number;
        name: string;
        grade: number | null;
    };
    onUpdate: (field: 'name' | 'grade', value: string) => void;
    onDelete: () => void; 
};

export default function Assignment({ assignment, onUpdate, onDelete }: AssignmentProps) {

    const assignmentNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onUpdate('name', event.target.value);
    };
    const assignmentGradeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onUpdate('grade', event.target.value);
    };

    return (
        <div className={style.assignment}>
            <input 
                    className={style.assignmentName} 
                    id="assignmentName"
                    type="text"
                    placeholder="Assignment Name"
                    value={assignment.name}
                    onChange={assignmentNameChangeHandler}    
                />

                <input 
                    className={style.assignmentGrade} 
                    id="assignmentGrade"
                    type="number"
                    placeholder="Grade"
                    value={assignment.grade !== null ? assignment.grade : ''}
                    onChange={assignmentGradeChangeHandler}    
                />

                <button onClick={onDelete} className={style.deleteButton}>
                    Delete
                </button>

        </div>
    )
}