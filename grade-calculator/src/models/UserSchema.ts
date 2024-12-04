import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  userId: string;
  name: string;
  username: string;
  email: string;
  password: string;
  courses: Course[];
}

interface Course {
  courseId: string;
  courseName: string;
  courseNumber: string;
  professor: string;
  syllabus: string;
  image: string;
  finalGrade: number; 
  categories: Category[];
}

interface Category {
  categoryId: string;
  categoryName: string;
  weight: number;
  assignments: Assignment[];
}

interface Assignment {
  assignmentId: string;
  assignmentName: string;
  grade: number;
}

// Mongoose Schemas

const AssignmentSchema = new Schema<Assignment>({
  assignmentId: { type: String, required: true },
  assignmentName: { type: String, required: true },
  grade: { type: Number, required: true },
});

const CategorySchema = new Schema<Category>({
  categoryId: { type: String, required: true },
  categoryName: { type: String, required: true },
  weight: { type: Number, required: true },
  assignments: { type: [AssignmentSchema], default: [] },
});

const CourseSchema = new Schema<Course>({
  courseId: { type: String, required: true },
  courseName: { type: String, required: true },
  courseNumber: { type: String, required: true },
  professor: { type: String, required: true },
  syllabus: { type: String, required: true },
  image: { type: String, required: true },
  finalGrade: { type: Number, required: true},
  categories: { type: [CategorySchema], default: [] },
});

const UserSchema = new Schema<IUser>({
  userId: { type: String, required: true },
  name: {type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: { type: [CourseSchema], default: [] },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;