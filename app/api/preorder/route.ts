import { NextResponse } from 'next/server';

// Interface for form data
interface PreorderFormData {
  name: string;
  email: string;
  quantity: number;
  message: string;
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const data: PreorderFormData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Add timestamp
    data.timestamp = new Date().toISOString();

    // Send to Google Sheets API
    const response = await fetch('https://script.google.com/macros/s/AKfycbxJ5fctLxkrhlEMlm4lzH_J5iGPJ9etxZhfRb3wPkmqNOBJsORMUqXJUr4L4gcIfUt1Qg/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      },
      mode: 'cors',
      body: JSON.stringify(data),
      // Increase timeout for slow cold starts
      signal: AbortSignal.timeout(20000),
    });

    // Enhanced debugging
    console.log('Request details:', {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API detailed error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      // More specific error messages based on status
      if (response.status === 403) {
        throw new Error('Access to Google Sheet denied. Please check deployment settings.');
      } else if (response.status === 404) {
        throw new Error('Google Sheet endpoint not found. Please verify the URL.');
      } else {
        throw new Error(`Failed to submit to database: ${response.status} ${response.statusText}\n${errorText}`);
      }
    }

    const responseData = await response.json();
    console.log('Google Sheets API Success Response:', responseData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Preorder submission error:', {
      name: error instanceof Error ? error.name : 'Unknown error',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Check if it's an abort error (timeout)
    if (error instanceof DOMException && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out. Please try again.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit preorder. Please try again later.' },
      { status: 500 }
    );
  }
} 