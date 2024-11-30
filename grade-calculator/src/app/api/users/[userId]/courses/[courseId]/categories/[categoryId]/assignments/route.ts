import connectMongoDB from '../../../../../../../../../libs/mongodb';
import User from '../../../../../../../../../models/UserSchema';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: { userId: string; courseId: string; categoryId: string };
}

// GET: Retrieve all assignments in a category
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { userId, courseId, categoryId } = params;
    await connectMongoDB();

    try {
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const course = user.courses.find((c) => c.courseId === courseId);
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        const category = course.categories.find((cat) => cat.categoryId === categoryId);
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json(category.assignments, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 });
    }
}

// POST: Add a new assignment to a category
export async function POST(request: NextRequest, { params }: RouteParams) {
    const { userId, courseId, categoryId } = params;
    const { assignmentId, assignmentName, grade } = await request.json();
    await connectMongoDB();

    try {
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const course = user.courses.find((c) => c.courseId === courseId);
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        const category = course.categories.find((cat) => cat.categoryId === categoryId);
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        const newAssignment = { assignmentId, assignmentName, grade };
        category.assignments.push(newAssignment);

        await user.save();
        return NextResponse.json(newAssignment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add assignment' }, { status: 500 });
    }
}
