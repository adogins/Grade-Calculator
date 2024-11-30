import connectMongoDB from '../../../../../libs/mongodb';
import User from '../../../../../models/UserSchema';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: { userId: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { userId } = params;
    await connectMongoDB();
    try {
        const user = await User.findById(userId).select('courses');
        if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user.courses, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
      }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
    const { userId } = params;
    await connectMongoDB();
    try {
        const newCourse = await request.json();
        const user = await User.findById(params.userId);
        if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        user.courses.push(newCourse);
        await user.save();
        return NextResponse.json(newCourse, { status: 201 });
      } catch (error) {
        return NextResponse.json({ error: 'Failed to add course' }, { status: 500 });
      }
}