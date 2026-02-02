import React from 'react'

/**
 * Renders text with special markup tags as React elements.
 * 
 * Supported tags:
 * - <highlight>text</highlight> - renders as semibold white text
 * - <gradient>text</gradient> - renders with gradient styling
 * - <br> or <br/> - renders as a line break
 * - \n\n (double newline) - renders as paragraph break (use renderTextWithBreaks)
 * 
 * This is processed at build time by Next.js, so there's no runtime parsing overhead
 * in the final bundle - the JSX is pre-compiled.
 */

/**
 * Process a text segment for highlight tags and line breaks
 */
function processSegment(text: string, keyPrefix: string = ''): React.ReactNode[] {
  // Split by <br> or <br/> tags
  const brParts = text.split(/<br\s*\/?>/g)
  
  return brParts.flatMap((brPart, brIdx) => {
    // Process highlight tags within this segment
    const highlightParts = brPart.split(/(<highlight>.*?<\/highlight>)/g)
    const processed = highlightParts.map((hPart, hIdx) => {
      if (hPart.startsWith('<highlight>')) {
        const content = hPart.replace(/<\/?highlight>/g, '')
        return <span key={`${keyPrefix}${brIdx}-h${hIdx}`} className="font-semibold text-white/70">{content}</span>
      }
      return hPart || null
    }).filter(Boolean)
    
    // Add <br /> between segments (not after the last one)
    if (brIdx < brParts.length - 1) {
      processed.push(<br key={`${keyPrefix}br-${brIdx}`} />)
    }
    
    return processed
  })
}

export function renderHighlightedText(text: string): React.ReactNode {
  return processSegment(text)
}

export function renderGradientText(text: string): React.ReactNode {
  const parts = text.split(/(<gradient>.*?<\/gradient>)/g)
  return parts.map((part, i) => {
    if (part.startsWith('<gradient>')) {
      const content = part.replace(/<\/?gradient>/g, '')
      return <span key={i} className="gradient-text">{content}</span>
    }
    return part
  })
}

export function renderText(text: string): React.ReactNode {
  // First split by gradient tags
  const gradientParts = text.split(/(<gradient>.*?<\/gradient>)/g)
  
  return gradientParts.flatMap((part, i) => {
    if (part.startsWith('<gradient>')) {
      const content = part.replace(/<\/?gradient>/g, '')
      return <span key={`g${i}`} className="gradient-text">{content}</span>
    }
    
    // Process highlights and line breaks within non-gradient parts
    return processSegment(part, `${i}-`)
  })
}

/**
 * Renders text with paragraph breaks (\n\n becomes <br/><br/>)
 * Also supports all other tags (<highlight>, <gradient>, <br>)
 */
export function renderTextWithBreaks(text: string): React.ReactNode {
  // Split by double newlines for paragraphs
  const paragraphs = text.split(/\n\n/)
  
  if (paragraphs.length === 1) {
    return renderText(text)
  }
  
  return paragraphs.map((p, i) => (
    <React.Fragment key={i}>
      {renderText(p)}
      {i < paragraphs.length - 1 && <><br /><br /></>}
    </React.Fragment>
  ))
}
