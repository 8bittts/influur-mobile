import { NextResponse } from "next/server"

// In a real app, this would be a database
let users = [
  {
    id: "test",
    email: "test@test.com",
    password: "test",
    name: "Test User",
  },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const user = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
} 