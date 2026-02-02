import { NextRequest, NextResponse } from 'next/server'

const LOOPS_API_KEY = process.env.LOOPS_API_KEY
const LOOPS_API_URL = 'https://app.loops.so/api/v1/contacts/create'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!LOOPS_API_KEY) {
      console.error('LOOPS_API_KEY is not configured')
      // In development, just return success
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Would have sent email to Loops:', email)
        return NextResponse.json({ success: true, message: 'Email captured (dev mode)' })
      }
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Send to Loops API
    const response = await fetch(LOOPS_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        source: 'scope_landing_page',
        subscribed: true,
        userGroup: 'scope_browser_waitlist',
        // Add any custom fields you have in Loops
        // customField: 'value',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Loops API error:', response.status, errorData)
      
      // Handle duplicate email (already subscribed)
      if (response.status === 409) {
        return NextResponse.json({ 
          success: true, 
          message: 'Already subscribed' 
        })
      }
      
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed' 
    })

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
