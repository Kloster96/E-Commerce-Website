import { NextRequest, NextResponse } from 'next/server';

// Credenciales del admin - cambiar en producción
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const response = NextResponse.json({
        success: true,
        message: 'Login exitoso',
      });

      // Crear cookie de sesión
      const sessionData = Buffer.from(
        JSON.stringify({ username, loginAt: Date.now() })
      ).toString('base64');

      response.cookies.set('admin_session', sessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 horas
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Credenciales incorrectas' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: 'Sesión cerrada',
  });
  response.cookies.delete('admin_session');
  return response;
}
