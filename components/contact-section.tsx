"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionTitle } from "@/components/section-title"
import { useToast } from "@/hooks/use-toast"
import { Mail, Send, Github, Linkedin, type LucideIcon } from "lucide-react"
import emailjs from "@emailjs/browser"
import { mailto, site } from "@/constants/site"

const EMAILJS_SERVICE_ID = "service_fy30kuj"
const EMAILJS_TEMPLATE_ID = "template_rifrg0i"
const EMAILJS_PUBLIC_KEY = "p-NcX4hQ1c0erpCWd"

type ProfileLink = {
  label: string
  href: string
  /** Lucide icon when one exists; otherwise `text` is shown instead. */
  icon?: LucideIcon
  text?: string
}

const profileLinks: ProfileLink[] = [
  { label: "GitHub profile", href: site.links.github, icon: Github },
  { label: "Kaggle profile", href: site.links.kaggle, text: "Kaggle" },
  { label: "LinkedIn profile", href: site.links.linkedin, icon: Linkedin },
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
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

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
    <section id="contact" ref={sectionRef} className="container py-12 md:py-[72px]">
      <SectionTitle
        title={site.contact.heading}
        icon={Mail}
        iconClassName="text-tone-teal-text"
        subtitle={site.sections.contact}
        align="center"
      />

      <motion.form
        ref={formRef}
        variants={formVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-[560px] space-y-4"
      >
        <motion.div variants={inputVariants} className="space-y-1.5">
          <label htmlFor="contact-name" className="block text-xs text-muted-foreground">
            Your Name
          </label>
          <Input id="contact-name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required />
        </motion.div>
        <motion.div variants={inputVariants} className="space-y-1.5">
          <label htmlFor="contact-email" className="block text-xs text-muted-foreground">
            Your Email
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </motion.div>
        <motion.div variants={inputVariants} className="space-y-1.5">
          <label htmlFor="contact-message" className="block text-xs text-muted-foreground">
            Your Message
          </label>
          <Textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
          />
        </motion.div>
        <motion.div variants={inputVariants}>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                Send Message
                <Send aria-hidden="true" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mx-auto mt-6 flex max-w-[560px] flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
      >
        <a href={mailto} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
          <Mail className="h-4 w-4" aria-hidden="true" />
          {site.email}
        </a>
        {profileLinks.map(({ label, href, icon: Icon, text }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center transition-colors hover:text-foreground"
          >
            {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : text}
          </a>
        ))}
      </motion.div>
    </section>
  )
}
