"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !mounted) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let isAnimating = true

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Particles configuration
    const particlesArray: Particle[] = []
    // Fewer, more subtle particles in light mode
    const getIsDark = () => {
      if (resolvedTheme === "dark") return true
      if (resolvedTheme === "light") return false
      if (typeof document !== "undefined") {
        return document.documentElement.classList.contains("dark")
      }
      return false
    }
    const numberOfParticles = getIsDark()
      ? Math.floor(Math.min(width, height) / 7)
      : Math.floor(Math.min(width, height) / 12) // Fewer particles in light mode

    // Colors based on effective theme (handles initial load correctly)
    const getColors = () => {
      // Check theme reliably - prioritize resolvedTheme
      let isDark = false
      
      if (resolvedTheme === "dark") {
        isDark = true
      } else if (resolvedTheme === "light") {
        isDark = false
      } else if (resolvedTheme === "system" || resolvedTheme == null) {
        // Check system preference or DOM class
        if (typeof document !== "undefined") {
          isDark = document.documentElement.classList.contains("dark")
        } else if (typeof window !== "undefined") {
          isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        }
      }
      
      return isDark
        ? ["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.2)"]
        : ["rgba(0, 0, 0, 0.08)", "rgba(0, 0, 0, 0.05)", "rgba(0, 0, 0, 0.06)"]
    }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string = ""
      angle: number
      spin: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.angle = Math.random() * 360
        this.spin = Math.random() * 0.2 - 0.1
        const colors = getColors()
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      updateColor() {
        const colors = getColors()
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.angle += this.spin

        if (this.x > width) this.x = 0
        else if (this.x < 0) this.x = width

        if (this.y > height) this.y = 0
        else if (this.y < 0) this.y = height
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate((this.angle * Math.PI) / 180)
        ctx.fillStyle = this.color
        ctx.beginPath()

        // Draw different shapes based on size
        if (this.size < 2) {
          // Small particles are circles
          ctx.arc(0, 0, this.size, 0, Math.PI * 2)
        } else if (this.size < 3.5) {
          // Medium particles are squares
          ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size)
        } else {
          // Large particles are triangles
          ctx.beginPath()
          ctx.moveTo(0, -this.size)
          ctx.lineTo(this.size, this.size)
          ctx.lineTo(-this.size, this.size)
          ctx.closePath()
        }

        ctx.fill()
        ctx.restore()
      }
    }

    const init = () => {
      particlesArray.length = 0
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    const connect = () => {
      if (!ctx) return
      const maxDistance = 120

      // Get theme state reliably
      let isDark = false
      
      if (resolvedTheme === "dark") {
        isDark = true
      } else if (resolvedTheme === "light") {
        isDark = false
      } else if (resolvedTheme === "system" || resolvedTheme == null) {
        // Check system preference or DOM class
        if (typeof document !== "undefined") {
          isDark = document.documentElement.classList.contains("dark")
        } else if (typeof window !== "undefined") {
          isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        }
      }

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${opacity * 0.15})`
              : `rgba(0, 0, 0, ${opacity * 0.08})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    let animationFrameId: number | null = null
    
    const animate = () => {
      if (!ctx || !isAnimating) return
      // Clear with transparent background
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      connect()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Small delay to ensure canvas is ready
    const initTimeout = setTimeout(() => {
      init()
      animate()
    }, 50)

    return () => {
      isAnimating = false
      clearTimeout(initTimeout)
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [resolvedTheme, mounted])

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          opacity: 1,
          zIndex: 0,
          backgroundColor: 'transparent'
        }} 
      />
    )
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none" 
      style={{ 
        opacity: 1,
        zIndex: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
      }} 
    />
  )
}
