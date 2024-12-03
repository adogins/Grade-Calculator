import connectMongoDB from '../../../libs/mongodb';
import User from '../../../models/UserSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs";

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
    const { userId, name, username, email, password, courses = [] } = await request.json();
    if ( !name || !username || !email || !password) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    await connectMongoDB();
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
        userId,
        name,
        username,
        email,
        password: hashedPassword,
        courses
    }

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] }).lean();
        if (existingUser) {
            return NextResponse.json({ error: 'Username or email already exists'}, { status: 400 });
        }

        const createdUser = await User.create(newUser);
        return NextResponse.json({ message: 'User created successfully', user: createdUser, password: password}, {status: 201 });
        //await User.create(newUser);
        //return NextResponse.json({message: 'Item added successfully'}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}
