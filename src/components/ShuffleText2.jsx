'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'


// Japanese Katakana and Hiragana characters for shuffling
const japaneseCharacters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンあいうえおかきくけこさしすせそ'

const getRandomJapaneseChar = () => {
  const randomIndex = Math.floor(Math.random() * japaneseCharacters.length)
  return japaneseCharacters[randomIndex]
}

const ShuffleText2 = ({ text, className }) => {
  const [displayText, setDisplayText] = useState([])
  const timeoutsRef = useRef([])
  const intervalsRef = useRef([])

  useEffect(() => {
 
    clearAllTimers()
    setDisplayText(Array(text.length).fill(''))
    text.split('').forEach((char, index) => {
      const timeout = setTimeout(() => {
        // For spaces, update immediately
        if (char === ' ') {
          setDisplayText(prev => {
            const newArr = [...prev]
            newArr[index] = ' '
            return newArr
          })
          return
        }

   
        let shuffles = 0
        const numShuffles = 5      
        const shuffleInterval = 80 

        const interval = setInterval(() => {
          shuffles++
          setDisplayText(prev => {
            const newArr = [...prev]
            newArr[index] = getRandomJapaneseChar()
            return newArr
          })

          if (shuffles >= numShuffles) {
            clearInterval(interval)
            setDisplayText(prev => {
              const newArr = [...prev]
              newArr[index] = char
              return newArr
            })
          }
        }, shuffleInterval)
        
        intervalsRef.current.push(interval)
      }, index * 100) // Each letter begins after 100ms delay (Speed adjusted for Japanese)
      
      timeoutsRef.current.push(timeout)
    })
    return () => {
      clearAllTimers()
    }
  }, [text])

  const clearAllTimers = () => {
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    timeoutsRef.current = []
    intervalsRef.current.forEach(interval => clearInterval(interval))
    intervalsRef.current = []
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {displayText.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3
            }
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {char === '' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default ShuffleText2