import dbConnect from '@/lib/mongodb';
import Church from '@/models/Church';
import User from '@/models/User';
import mongoose from 'mongoose';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Start a session for the transaction
  const session = await mongoose.startSession();
  try {
    await dbConnect();
    const body = await request.json();
    const { churchData, adminData } = body;
    // Start the transaction
    await session.startTransaction();
    // Check if church email already exists
    const existingChurchEmail = await Church.findOne({
      email: churchData.email,
    }).session(session);
    if (existingChurchEmail) {
      await session.abortTransaction();
      return NextResponse.json(
        { error: 'Church with this email already exists' },
        { status: 400 },
      );
    }
    // Check if church phone number already exists
    const existingChurchPhone = await Church.findOne({
      phoneNumber: churchData.phoneNumber,
    }).session(session);
    if (existingChurchPhone) {
      await session.abortTransaction();
      return NextResponse.json(
        { error: 'Church with this phone number already exists' },
        { status: 400 },
      );
    }
    // Check if admin email already exists
    const existingUserEmail = await User.findOne({
      email: adminData.email,
    }).session(session);
    if (existingUserEmail) {
      await session.abortTransaction();
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 },
      );
    }
    // Check if admin phone number already exists
    const existingUserPhone = await User.findOne({
      phoneNumber: adminData.phoneNumber,
    }).session(session);
    if (existingUserPhone) {
      await session.abortTransaction();
      return NextResponse.json(
        { error: 'User with this phone number already exists' },
        { status: 400 },
      );
    }
    // Create church within the transaction
    const church = new Church(churchData);
    await church.save({ session });
    // Create admin user within the transaction
    const admin = new User({
      churchId: church._id,
      email: adminData.email,
      password: adminData.password,
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      role: adminData.role,
      phoneNumber: adminData.phoneNumber,
    });
    await admin.save({ session });
    // Commit the transaction
    await session.commitTransaction();
    return NextResponse.json(
      {
        message: 'Church and admin user created successfully',
        churchId: church._id,
        userId: admin._id,
      },
      { status: 201 },
    );
  } catch (error) {
    // Abort the transaction on any error
    await session.abortTransaction();
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  } finally {
    // Always end the session
    await session.endSession();
  }
}
