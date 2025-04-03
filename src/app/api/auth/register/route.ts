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
    const { name, email, password } = body

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    }

    users.push(newUser)

    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    )
  }
} 