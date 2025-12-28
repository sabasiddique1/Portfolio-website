"use client"

import { projects } from "@/constants/projects"

export function StructuredData() {
  const baseUrl = "https://your-portfolio-domain.com" // TODO: Replace with actual domain

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sabaa Siddique",
    jobTitle: "Front-End Developer & UI/UX Designer",
    description: "Front-End Developer with 2+ years building high-performance web apps. Expert in React, Next.js, TypeScript.",
    url: baseUrl,
    sameAs: [
      "https://github.com/sabasiddique1", // TODO: Verify GitHub URL
      "https://www.linkedin.com/in/your-profile", // TODO: Add LinkedIn URL
    ],
    email: "sabasiddique001@gmail.com",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "UI/UX Design",
      "Front-End Development",
      "Web Development",
      "Tailwind CSS",
      "Node.js",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sabaa Siddique Portfolio",
    url: baseUrl,
    description: "Portfolio website showcasing front-end development projects and expertise",
    author: {
      "@type": "Person",
      name: "Sabaa Siddique",
    },
  }

  const creativeWorks = projects
    .filter((p) => p.featured)
    .slice(0, 5)
    .map((project) => ({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: project.title,
      description: project.description,
      url: project.demoUrl !== "#" ? project.demoUrl : `${baseUrl}/projects/${project.slug}`,
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      creator: {
        "@type": "Person",
        name: "Sabaa Siddique",
      },
    }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {creativeWorks.map((work, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(work) }}
        />
      ))}
    </>
  )
}

