"use client"

import type React from "react"
import type { ComponentType } from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Send, Github, Linkedin, ArrowUpRight } from "lucide-react"
import { SiKaggle } from "react-icons/si"
import emailjs from "@emailjs/browser"
import { mailto, site } from "@/constants/site"

const EMAILJS_SERVICE_ID = "service_fy30kuj"
const EMAILJS_TEMPLATE_ID = "template_rifrg0i"
const EMAILJS_PUBLIC_KEY = "p-NcX4hQ1c0erpCWd"

type ProfileLink = {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
  external: boolean
}

const profileLinks: ProfileLink[] = [
  { label: "Email", href: mailto, icon: Mail, external: false },
  { label: "GitHub profile", href: site.links.github, icon: Github, external: true },
  { label: "Kaggle profile", href: site.links.kaggle, icon: SiKaggle, external: true },
  { label: "LinkedIn profile", href: site.links.linkedin, icon: Linkedin, external: true },
]

export function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200 || result.text === "OK") {
        toast({
          title: "Email sent successfully!",
          description: "Thank you for your message. I'll get back to you soon.",
        });

        setFormData({ name: "", email: "", message: "" });
        if (formRef.current) {
          formRef.current.reset();
        }
      }
    } catch (error: any) {
      console.error("EmailJS error:", error);
      let errorTitle = "Failed to send email";
      let errorMessage = "Something went wrong. Please try again later.";

      // Check for specific error messages from EmailJS
      if (error?.text) {
        const errorText = error.text;
        // Handle Gmail API connection issues
        if (errorText.includes("Gmail_API")) {
          if (errorText.includes("Invalid grant")) {
            errorTitle = "Email service needs reconnection";
            errorMessage = "The Gmail account needs to be reconnected in EmailJS. Please contact the site administrator.";
          } else if (errorText.includes("insufficient authentication scopes")) {
            errorTitle = "Email service permissions issue";
            errorMessage = "The Gmail account doesn't have sufficient permissions. Please reconnect with all required permissions in EmailJS dashboard.";
          } else {
            errorTitle = "Email service configuration issue";
            errorMessage = "There's an issue with the email service configuration. Please contact the site administrator.";
          }
        } else {
          errorMessage = errorText;
        }
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.text) {
        errorMessage = error.response.text;
      }

      toast({
        title: errorTitle,
        description: errorMessage,
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
              {site.contact.heading}
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
            {site.contact.line}
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-2xl">
          <motion.form
            ref={formRef}
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
              <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <span>{site.email}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {profileLinks.map(({ label, href, icon: Icon, external }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2 px-4 py-4 rounded-2xl hover:bg-muted/50 transition-colors"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <ArrowUpRight
                    className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
