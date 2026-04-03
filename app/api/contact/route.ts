import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  CONTACT_EMAIL = "menelaos.pone1@gmail.com",
} = process.env

if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
  console.warn("Missing email config environment variables: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const name = (body.name || "").trim()
    const email = (body.email || "").trim()
    const message = (body.message || "").trim()
    const honeypot = (body.honeypot || "").trim()

    if (honeypot) {
      // Bot trap
      return NextResponse.json({ error: "Bot detected" }, { status: 400 })
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required field" }, { status: 400 })
    }

    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json({ error: "Email server not configured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: Number(EMAIL_PORT) === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"Portfolio Contact Form" <${EMAIL_USER}>`,
      to: CONTACT_EMAIL,
      subject: `New contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br />")}</p>`,
      replyTo: email,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact route error", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    )
  }
}
