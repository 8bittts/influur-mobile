export async function generateAIResponse(prompt: string) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    })

    if (!response.ok) {
      throw new Error('Failed to get response')
    }

    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.error)
    }

    return data.content
  } catch (error) {
    console.error('Error getting AI response:', error)
    throw error
  }
} 