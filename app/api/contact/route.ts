import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL!],

      // This is important.
      // When you click Reply in your inbox,
      // it will reply to the person who contacted you.
      replyTo: email,

      subject: `Portfolio Contact: ${name}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 24px;
        ">

          <h2 style="margin-bottom: 24px;">
            New Portfolio Message
          </h2>

          <div style="
            padding: 16px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
          ">

            <p>
              <strong>Name:</strong> ${escapeHtml(name)}
            </p>

            <p>
              <strong>Email:</strong> ${escapeHtml(email)}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <p style="
              white-space: pre-wrap;
              line-height: 1.6;
            ">
              ${escapeHtml(message)}
            </p>

          </div>

          <p style="
            margin-top: 24px;
            color: #6b7280;
            font-size: 14px;
          ">
            Sent from your personal portfolio.
          </p>

        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to send message.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}

// Prevent HTML injection
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}