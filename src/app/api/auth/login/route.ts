// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 5 utilisateurs avec leurs credentials
const VALID_USERS = {
  user1: { password: '1234', name: 'Acceuil' },
  user2: { password: '1234', name: 'Doctor' },
  user3: { password: '1234', name: 'Cnas' },
  user4: { password: '1234', name: 'Labo' },
  user5: { password: '1234', name: 'Assoc' },
};

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Vérifier si l'utilisateur existe et le mot de passe est correct
    const user = VALID_USERS[username as keyof typeof VALID_USERS];
    
    if (user && user.password === password) {
      const response = NextResponse.json(
        { 
          success: true, 
          message: 'Login successful',
          username,
          name: user.name
        },
        { status: 200 }
      );

      // Créer les cookies d'authentification
      response.cookies.set('auth-token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      response.cookies.set('username', username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
