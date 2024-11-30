import connectMongoDB from '../../../libs/mongodb';
import User from '../../../models/UserSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    await connectMongoDB();
    try {
        const users = await User.find();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error); 
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const { userId, username, email, password, courses } = await request.json();
    if (!userId || !username || !email || !password) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await connectMongoDB();
    try {
        await User.create({ userId, username, email, password, courses });
        return NextResponse.json({message: 'Item added successfully'}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}
