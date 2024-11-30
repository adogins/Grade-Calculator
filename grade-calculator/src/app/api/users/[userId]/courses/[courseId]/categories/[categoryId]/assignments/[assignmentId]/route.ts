import connectMongoDB from '../../../../../../../../../../libs/mongodb';
import User from '../../../../../../../../../../models/UserSchema';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: { userId: string; courseId: string; categoryId: string; assignmentId: string };
}

// GET: Retrieve a specific assignment
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { userId, courseId, categoryId, assignmentId } = params;
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

        const assignment = category.assignments.find((a) => a.assignmentId === assignmentId);
        if (!assignment) {
            return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
        }

        return NextResponse.json(assignment, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch assignment' }, { status: 500 });
    }
}

// PUT: Update a specific assignment
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { userId, courseId, categoryId, assignmentId } = params;
    const { assignmentName, grade } = await request.json();
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

        const assignment = category.assignments.find((a) => a.assignmentId === assignmentId);
        if (!assignment) {
            return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
        }

        assignment.assignmentName = assignmentName || assignment.assignmentName;
        assignment.grade = grade !== undefined ? grade : assignment.grade;

        await user.save();
        return NextResponse.json(assignment, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update assignment' }, { status: 500 });
    }
}

// DELETE: Remove a specific assignment
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { userId, courseId, categoryId, assignmentId } = params;
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

        const assignmentIndex = category.assignments.findIndex((a) => a.assignmentId === assignmentId);
        if (assignmentIndex === -1) {
            return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
        }

        category.assignments.splice(assignmentIndex, 1);
        await user.save();

        return NextResponse.json({ message: 'Assignment deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete assignment' }, { status: 500 });
    }
}
