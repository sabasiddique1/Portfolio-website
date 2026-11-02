import { ImageResponse } from "next/og"
import { site } from "@/constants/site"

export const alt = site.seo.ogImageAlt
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const host = new URL(site.url).host

// Renders with the font bundled in next/og, so nothing is fetched at render time. Colours match the site tokens.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#04080a",
          color: "#fcfcfe",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.05, letterSpacing: "-0.02em" }}>{site.name}</div>
          <div style={{ marginTop: 20, fontSize: 48, color: "#59cfa8" }}>{site.role}</div>
          <div style={{ marginTop: 32, fontSize: 28, color: "#a5a7a9" }}>
            Agentic AI · Machine learning · AI security
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#828486" }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: "#59cfa8" }} />
          {host}
        </div>
      </div>
    ),
    size
  )
}
