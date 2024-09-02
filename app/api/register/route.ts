import prisma from '@/libs/prismaDb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export const POST = async(request: Request) => {
    try {
        const body = await request.json();
        const {email, name, password} = body;

        if (!email || !name || !password) {
            return new NextResponse('Invalid Info', {status: 400});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });

        return NextResponse.json(user, {status: 200})
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Server Error', {status: 500});
    }    
}