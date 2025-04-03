import { NextResponse } from 'next/server'
import sharp from 'sharp'

// Color schemes inspired by modern social media and Gen Z aesthetics
const COLOR_SCHEMES = [
  {
    name: 'sunset',
    colors: ['#FF5F1F', '#FF3366', '#FF1493'],
    bgOpacity: 1
  },
  {
    name: 'ocean',
    colors: ['#0EA5E9', '#2563EB', '#4F46E5'],
    bgOpacity: 1
  },
  {
    name: 'forest',
    colors: ['#10B981', '#059669', '#047857'],
    bgOpacity: 1
  },
  {
    name: 'candy',
    colors: ['#EC4899', '#D946EF', '#A855F7'],
    bgOpacity: 1
  },
  {
    name: 'midnight',
    colors: ['#312E81', '#4338CA', '#6366F1'],
    bgOpacity: 0.95
  }
]

// Fun emoji combinations for different vibes
const EMOJI_SETS = [
  ['💫', '✨', '🚀'],
  ['🎯', '🎨', '💎'],
  ['🌟', '💫', '⭐'],
  ['🔥', '💪', '💯'],
  ['🎉', '🎊', '🎈']
]

// Different layout styles
const LAYOUTS = [
  'centered',
  'asymmetric',
  'diagonal',
  'minimalist',
  'dynamic'
]

// Helper function to get random item from array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

// Helper function to get random number between min and max
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const brand = searchParams.get('brand') || 'Brand'
    const payout = searchParams.get('payout') || '0'
    const likes = parseInt(searchParams.get('likes') || '0').toLocaleString()
    const comments = parseInt(searchParams.get('comments') || '0').toLocaleString()
    const shares = parseInt(searchParams.get('shares') || '0').toLocaleString()

    // Randomize design elements
    const colorScheme = getRandomItem(COLOR_SCHEMES)
    const emojiSet = getRandomItem(EMOJI_SETS)
    const layout = getRandomItem(LAYOUTS)
    const rotation = getRandomNumber(-5, 5)
    
    // Create a new image with dimensions optimized for Twitter (1200x675)
    const width = 1200
    const height = 675

    // Generate random decorative elements
    const circles = Array.from({ length: getRandomNumber(3, 6) }, () => ({
      cx: getRandomNumber(0, width),
      cy: getRandomNumber(0, height),
      r: getRandomNumber(100, 300)
    }))
    
    // Create base image with modern design based on selected layout
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Dynamic gradient background -->
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="${layout === 'diagonal' ? '100%' : '0%'}">
            ${colorScheme.colors.map((color, index) => 
              `<stop offset="${(index * 50)}%" style="stop-color:${color};stop-opacity:${colorScheme.bgOpacity}" />`
            ).join('')}
          </linearGradient>
          
          <!-- Noise texture filter -->
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0.1"/>
            <feBlend mode="overlay" in="SourceGraphic"/>
          </filter>
          
          <!-- Text effects -->
          <filter id="shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.3"/>
          </filter>
        </defs>
        
        <!-- Background with noise -->
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1"/>
        
        <!-- Random decorative circles -->
        ${circles.map(circle => `
          <circle 
            cx="${circle.cx}" 
            cy="${circle.cy}" 
            r="${circle.r}" 
            fill="white" 
            fill-opacity="${Math.random() * 0.15}"
          />
        `).join('')}
        
        <!-- Dynamic content based on layout -->
        <g filter="url(#shadow)" transform="rotate(${rotation} ${width/2} ${height/2})">
          ${layout === 'centered' ? `
            <!-- Centered Layout -->
            <g transform="translate(${width/2}, 120)">
              <rect x="-160" y="-35" width="320" height="70" rx="35" fill="white" fill-opacity="0.15"/>
              <text x="0" y="8" text-anchor="middle" font-family="Arial" font-size="36" fill="white" font-weight="bold">
                SECURED THE BAG ${emojiSet[0]}
              </text>
            </g>
          ` : layout === 'asymmetric' ? `
            <!-- Asymmetric Layout -->
            <g transform="translate(${width/3}, ${height/3})">
              <text x="0" y="0" text-anchor="start" font-family="Arial" font-size="48" fill="white" font-weight="bold">
                ${emojiSet[0]} Campaign
              </text>
              <text x="0" y="60" text-anchor="start" font-family="Arial" font-size="72" fill="white" font-weight="bold">
                Success!
              </text>
            </g>
          ` : `
            <!-- Default Dynamic Layout -->
            <g transform="translate(${width/2}, 120)">
              <text x="0" y="0" text-anchor="middle" font-family="Arial" font-size="48" fill="white" font-weight="bold">
                ${emojiSet[0]} Amazing Results ${emojiSet[1]}
              </text>
            </g>
          `}

          <!-- Brand and Earnings -->
          <g transform="translate(${width/2}, ${layout === 'asymmetric' ? height/2 : 220})">
            <text x="0" y="0" text-anchor="middle" font-family="Arial" font-size="72" fill="white" font-weight="bold">
              $${payout}
            </text>
            <text x="0" y="50" text-anchor="middle" font-family="Arial" font-size="32" fill="white" opacity="0.9">
              with ${brand}
            </text>
          </g>
          
          <!-- Engagement Stats -->
          <g transform="translate(${width/2}, ${layout === 'minimalist' ? height/2 + 100 : 380})">
            <rect x="-300" y="-40" width="600" height="80" rx="40" fill="white" fill-opacity="0.15"/>
            <text x="-180" y="10" text-anchor="middle" font-family="Arial" font-size="28" fill="white">
              ${likes} ❤️
            </text>
            <text x="0" y="10" text-anchor="middle" font-family="Arial" font-size="28" fill="white">
              ${comments} 💭
            </text>
            <text x="180" y="10" text-anchor="middle" font-family="Arial" font-size="28" fill="white">
              ${shares} 🔄
            </text>
          </g>
          
          <!-- Call to Action -->
          <g transform="translate(${width/2}, ${height - 80})">
            <text x="0" y="0" text-anchor="middle" font-family="Arial" font-size="32" fill="white" opacity="0.9">
              Start your journey at
            </text>
            <text x="0" y="40" text-anchor="middle" font-family="Arial" font-size="36" fill="white" font-weight="bold">
              influur.com ${emojiSet[2]}
            </text>
          </g>
        </g>

        <!-- Random floating emojis -->
        ${Array.from({ length: 3 }, (_, i) => `
          <text 
            x="${getRandomNumber(50, width-50)}" 
            y="${getRandomNumber(50, height-50)}" 
            font-size="${getRandomNumber(40, 64)}"
            transform="rotate(${getRandomNumber(-30, 30)} ${width/2} ${height/2})"
          >${emojiSet[i]}</text>
        `).join('')}
      </svg>
    `

    // Convert SVG to PNG using sharp
    const buffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer()

    // Return the image with proper headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${brand.toLowerCase()}-campaign-success.png"`
      },
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return new NextResponse('Error generating image', { status: 500 })
  }
} 