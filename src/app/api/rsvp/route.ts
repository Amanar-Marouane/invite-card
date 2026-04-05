import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('RSVP API Route hit');
  try {
    const body = await request.json();
    const { name, email, melody } = body;

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Using the key from .env
    const url = "https://smtp.monkeysmail.com/messages/send";

    const emailBody = {
      from: {
        email: "no-reply@monkeys.cloud",
        name: "Engagement RSVP"
      },
      to: [process.env.NEXT_PUBLIC_EMAIL || 'yorch.peraza@gmail.com'],
      subject: `New RSVP: ${name}`,
      text: `Guest: ${name}\nEmail: ${email}\nMelody Request: ${melody || 'None'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #96A58F;">New Engagement RSVP</h2>
          <p><strong>Guest Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Melody Request:</strong> ${melody || 'None'}</p>
        </div>
      `
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY as string
      },
      body: JSON.stringify(emailBody)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('MonkeysMail API silent failure:', errorData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('RSVP API Silent Error:', error);
    return NextResponse.json({ success: true });
  }
}
