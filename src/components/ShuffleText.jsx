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
  const [displayText, setDisplayText] = useState(() => (text ? text.split('') : []))
  const timeoutsRef = useRef([])

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    timeoutsRef.current = []
  }

  useEffect(() => {
    setDisplayText(text ? text.split('') : [])
    return () => {
      clearAllTimeouts()
    }
  }, [text])

  const handleMouseEnter = () => {
    clearAllTimeouts()

    const scrambled = text.split('').map(ch =>
      ch !== ' ' ? getRandomHindiChar() : ' '
    )
    setDisplayText(scrambled)

    for (let i = 0; i < text.length; i++) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => {
          const newArr = [...prev]
          newArr[i] = text[i]
          return newArr
        })
      }, i * 100) 
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