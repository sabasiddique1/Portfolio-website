"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Send, Github, Linkedin, ArrowUpRight } from "lucide-react"
import { SiKaggle, SiDiscord, SiNotion, SiMedium } from "react-icons/si"
import emailjs from "@emailjs/browser"

export function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  //
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)
  //
  //   try {
  //     const result = await emailjs.send(
  //         "service_vdlakiq",
  //         "template_rifrg0i",
  //         {
  //           name: formData.name,
  //           email: formData.email,
  //           message: formData.message,
  //         },
  //         "p-NcX4hQ1c0erpCWd"
  //     )
  //
  //     toast({
  //       title: "Message sent!",
  //       description: "Thank you for your message. I'll get back to you soon.",
  //     })
  //     setFormData({ name: "", email: "", message: "" })
  //   } catch (error) {
  //     toast({
  //       title: "Oops!",
  //       description: "Something went wrong. Please try again later.",
  //       variant: "destructive",
  //     })
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
          "service_vdlakiq",
          "template_rifrg0i",
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
          "p-NcX4hQ1c0erpCWd"
      );

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
      e.currentTarget.reset(); // Optional but helpful

    } catch (error) {
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const inputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl space-y-4 text-center"
        >
          <div className="inline-block">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl relative"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              Let&apos;s Work Together
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.h2>
          </div>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind? Get in touch and let&apos;s create something amazing.
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-2xl">
          <motion.form
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.div variants={inputVariants}>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                />
              </motion.div>
              <motion.div variants={inputVariants}>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                />
              </motion.div>
              <motion.div variants={inputVariants}>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                />
              </motion.div>
            </div>
            <motion.div variants={inputVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" className="w-full relative overflow-hidden group" disabled={isSubmitting} size="lg">
                <span className="relative z-10 flex items-center">
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        className="ml-2"
                      >
                        <Send className="h-4 w-4" />
                      </motion.span>
                    </>
                  )}
                </span>
                <motion.span
                  className="absolute inset-0 bg-primary/20 z-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </Button>
            </motion.div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-col items-center space-y-6"
          >
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span>sabasiddique001@gmail.com</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="mailto:sabasiddique001@gmail.com"
                className="group flex items-center gap-2 px-4 py-4 rounded-2xl hover:bg-muted/50 transition-colors"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="https://github.com/sabasiddique1"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-4 rounded-2xl hover:bg-muted/50 transition-colors"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="https://www.kaggle.com/sabasiddiquedev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-4 rounded-2xl hover:bg-muted/50 transition-colors"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <SiKaggle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-4 rounded-2xl hover:bg-muted/50 transition-colors"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <SiDiscord className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/sabaa-siddique-26b6a31a5"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-4 rounded-2xl hover:bg-muted/50 transition-colors"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="https://probable-kite-c21.notion.site/WorkFolio-24535d194ff08006a22cd3113cf94263"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-4 rounded-2xl hover:bg-muted/50 transition-colors"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <SiNotion className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a
                href="https://medium.com/@sabasiddique001"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-4 rounded-2xl hover:bg-muted/50 transition-colors"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <SiMedium className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
