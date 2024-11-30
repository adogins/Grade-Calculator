import connectMongoDB from '../../../../../../../../libs/mongodb';
import User from '../../../../../../../../models/UserSchema';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: { userId: string; courseId: string; categoryId: string };
}

// GET: Retrieve a specific category
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

        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
    }
}

// PUT: Update a specific category
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { userId, courseId, categoryId } = params;
    const { categoryName, weight } = await request.json();
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

        category.categoryName = categoryName || category.categoryName;
        category.weight = weight !== undefined ? weight : category.weight;

        await user.save();
        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

// DELETE: Remove a specific category
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

        const categoryIndex = course.categories.findIndex((cat) => cat.categoryId === categoryId);
        if (categoryIndex === -1) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        course.categories.splice(categoryIndex, 1); // Remove the category
        await user.save();

        return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}
