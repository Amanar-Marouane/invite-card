import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('RSVP API Route hit (Mailtrap)');
  try {
    const body = await request.json();
    const { name, email, melody } = body;

    const API_TOKEN = process.env.NEXT_PUBLIC_API_KEY; 
    const url = "https://send.api.mailtrap.io/api/send";

    const emailBody = {
      from: {
        email: "hello@wearegettingmarried.me",
        name: "Wedding Invitation",
      },
      to: [
        {
          email: process.env.NEXT_PUBLIC_EMAIL || "marouane.amanar07@gmail.com",
        },
      ],
      subject: `New RSVP: ${name}`,
      text: `Guest: ${name}\nEmail: ${email}\nMelody Request: ${melody || "None"}`,
      category: "RSVP Submission",
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`
      },
      body: JSON.stringify(emailBody)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Mailtrap API silent failure:', errorData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('RSVP API Silent Error:', error);
    return NextResponse.json({ success: true });
  }
}
