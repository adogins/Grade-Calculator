import connectMongoDB from '../../../../../../../libs/mongodb';
import User from '../../../../../../../models/UserSchema';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: { userId: string; courseId: string };
}

// GET: Retrieve all categories for a specific course
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

        return NextResponse.json(course.categories, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

// POST: Add a new category to a specific course
export async function POST(request: NextRequest, { params }: RouteParams) {
    const { userId, courseId } = params;
    const { categoryId, categoryName, weight } = await request.json();
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

        const newCategory = {
            categoryId,
            categoryName,
            weight,
            assignments: [],
        };

        course.categories.push(newCategory);
        await user.save();

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add category' }, { status: 500 });
    }
}
