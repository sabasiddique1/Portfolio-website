"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

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
    const numberOfParticles = Math.min(width, height) / 8 // More particles

    // Colors based on theme
    const getColors = () => {
      return theme === "dark"
        ? ["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.2)"]
        : ["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.05)", "rgba(0, 0, 0, 0.08)"]
    }

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
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

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle =
              theme === "dark" ? `rgba(255, 255, 255, ${opacity * 0.15})` : `rgba(0, 0, 0, ${opacity * 0.1})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      connect()
      requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" style={{ opacity: 0.6 }} />
}
