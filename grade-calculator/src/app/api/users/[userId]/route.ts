import connectMongoDB from '../../../../libs/mongodb';
import User from '../../../../models/UserSchema';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
    params: { userId: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { userId } = params;
    await connectMongoDB();
    try {
        const user = await User.findById(userId);
        if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { userId } = params;
    const { username: username, email: email, password: password, courses: courses } = await request.json();
    await connectMongoDB();
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password, courses },{ new: true});
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { userId } = params;
    await connectMongoDB();
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        return NextResponse.json({ message: 'User deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
