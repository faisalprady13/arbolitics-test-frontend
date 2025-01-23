import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (!accessToken) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const urlGet = `${process.env.ARBOLITICS_API}/data/getArboliticsDataset`;
  const urlPost = `${process.env.ARBOLITICS_API}/data/getArboliticsDatasetPost`;
  const { newEndpoint, ...body } = await req.json();

  if (newEndpoint) {
    // Solution 1 for POST endpoint
    return getDataWithPost(urlPost, accessToken, body);
  } else {
    // Solution 2 for GET endpoint with body, bad practice
    return getDataWithGet(urlGet, accessToken, body);
  }
}

const getDataWithGet = async (
  url: string,
  accessToken: string,
  body: string
) => {
  const res = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: body,
  });
  return new Response(JSON.stringify(res.data.data), {
    status: 200,
  });
};

const getDataWithPost = async (
  url: string,
  accessToken: string,
  body: string
) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  return new Response(JSON.stringify(data.data), {
    status: 200,
  });
};
