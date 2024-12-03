import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  courses: Course[]; // Array of classes
}

interface Course {
  courseName: string;
  courseNumber: string;
  professor: string;
  syllabus: string;
  image: string;
  finalGrade: number; 
  categories: Category[]; // Array of categories
}

interface Category {
  categoryName: string;
  weight: number; // Percentage weight of this category
  assignments: Assignment[]; // Array of assignments
}

interface Assignment {
  assignmentName: string;
  grade: number;
}

// Mongoose Schemas

const AssignmentSchema = new Schema<Assignment>({
  assignmentName: { type: String, required: true },
  grade: { type: Number, required: true },
});

const CategorySchema = new Schema<Category>({
  categoryName: { type: String, required: true },
  weight: { type: Number, required: true },
  assignments: { type: [AssignmentSchema], default: [] },
});

const CourseSchema = new Schema<Course>({
  courseName: { type: String, required: true },
  courseNumber: { type: String, required: true },
  professor: { type: String, required: true },
  syllabus: { type: String, required: true },
  image: { type: String, required: true },
  finalGrade: { type: Number, required: true},
  categories: { type: [CategorySchema], default: [] },
});

const UserSchema = new Schema<IUser>({
  name: {type: String, required: true},
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  courses: { type: [CourseSchema], default: [] },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;


