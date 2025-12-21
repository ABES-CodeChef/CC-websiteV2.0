'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

/**
 * ShuffleText Component
 * @param {string} text - The string to be animated
 * @param {string} className - Tailwind or CSS classes for styling
 */

const hindiCharacters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンあいうえおかきくけこさしすせそ'

const getRandomHindiChar = () => {
  const randomIndex = Math.floor(Math.random() * hindiCharacters.length)
  return hindiCharacters[randomIndex]
}

const ShuffleText = ({ text, className }) => {
  // initialize safely in case `text` is undefined
  const [displayText, setDisplayText] = useState(() => (text ? text.split('') : []))
  const timeoutsRef = useRef([])

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    timeoutsRef.current = []
  }

  // keep displayText in sync if `text` prop changes and clear timeouts on unmount
  useEffect(() => {
    setDisplayText(text ? text.split('') : [])
    return () => {
      clearAllTimeouts()
    }
  }, [text])

  const handleMouseEnter = () => {
    clearAllTimeouts()

    // 1. Set initial "scrambled" state
    const scrambled = text.split('').map(ch =>
      ch !== ' ' ? getRandomHindiChar() : ' '
    )
    setDisplayText(scrambled)

    // 2. Gradually reveal original characters
    for (let i = 0; i < text.length; i++) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => {
          const newArr = [...prev]
          newArr[i] = text[i]
          return newArr
        })
      }, i * 100) // 100ms delay per character
      timeoutsRef.current.push(timeout)
    }
  }

  const handleMouseLeave = () => {
    clearAllTimeouts()
    setDisplayText(text.split(''))
  }

  return (
    <motion.span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      style={{ display: 'inline-block' }}
      className={className}
    >
      {displayText.map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </motion.span>
  )
}

export default ShuffleText