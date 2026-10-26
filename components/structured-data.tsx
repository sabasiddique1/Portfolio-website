import { aiProjects } from "@/constants/projects"
import { site } from "@/constants/site"

const personRef = { "@type": "Person", name: site.name, url: site.url }

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: "Rawalpindi", addressCountry: "PK" },
  sameAs: [site.links.linkedin, site.links.github, site.links.kaggle, site.links.orcid],
  knowsAbout: [...site.seo.keywords],
  worksFor: { "@type": "Organization", name: site.employer.name },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Fatima Jinnah Women University" },
    { "@type": "EducationalOrganization", name: "Atomcamp × NUST" },
  ],
}

const webSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  author: personRef,
}

/** Stack entries that are languages (not frameworks), for SoftwareSourceCode.programmingLanguage. */
const LANGUAGES = ["Python", "TypeScript", "JavaScript", "Node.js"]

const sourceCode = aiProjects
  .filter((project) => project.githubUrl)
  .map((project) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    codeRepository: project.githubUrl,
    programmingLanguage: project.technologies.find((tech) => LANGUAGES.includes(tech)) ?? project.technologies[0],
    author: personRef,
    url: `${site.url}/projects/${project.slug}`,
  }))

/** Escapes "<" so the JSON can never close the script tag early. */
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}

/** Server component: one JSON-LD block per schema, rendered once from the root layout. */
export function StructuredData() {
  return (
    <>
      <JsonLd data={person} />
      <JsonLd data={webSite} />
      {sourceCode.map((entry) => (
        <JsonLd key={entry.url} data={entry} />
      ))}
    </>
  )
}
