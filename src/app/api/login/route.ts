import { cookies } from 'next/headers';

interface AuthRequestBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const { email, password }: AuthRequestBody = await req.json();
  const url = `${process.env.ARBOLITICS_API}/auth/login`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
  const data = res.data;

  if (!data.accessToken) {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
    });
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: 'accessToken',
    value: data.accessToken,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return new Response(JSON.stringify({ name: data.name }), {
    status: 200,
  });
}
