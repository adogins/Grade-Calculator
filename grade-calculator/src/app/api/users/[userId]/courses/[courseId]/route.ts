import connectMongoDB from '../../../../../../libs/mongodb';
import User from '../../../../../../models/UserSchema';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: { userId: string; courseId: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { userId, courseId } = params;
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
        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { userId, courseId } = params;
    const updatedCourse = await request.json();
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
        Object.assign(course, updatedCourse);
        await user.save();
        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { userId, courseId } = params;
    await connectMongoDB();
    try {
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const courseIndex = user.courses.findIndex((c) => c.courseId === courseId);
        if (courseIndex === -1) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }
        user.courses.splice(courseIndex, 1);
        await user.save();
        return NextResponse.json({ message: 'Course deleted' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting course:", error);
        return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
    }
}
