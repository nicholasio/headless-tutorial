import { AppMiddleware } from '@10up/headless-next/middlewares';
import { NextResponse } from 'next/server';

const COOKIE_NAME = 'bucket-navigation';
const BUCKETS = ['spa', 'mpa'];
const getBucket = () => BUCKETS[Math.floor(Math.random() * BUCKETS.length)];

export async function middleware(req) {
	const response = await AppMiddleware(req);

	if (!response.redirected) {
		const url = req.nextUrl;
		const bucket = req.cookies.get(COOKIE_NAME) || getBucket();

		response.cookies.set(COOKIE_NAME, bucket);
		url.searchParams.set('navigation', bucket);

		req.nextUrl.searchParams.set('navigation', bucket);
		return NextResponse.rewrite(req.nextUrl, response);
	}

	return response;
}
