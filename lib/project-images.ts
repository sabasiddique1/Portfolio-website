// Server-only: uses the filesystem. Call it from server components (app/page.tsx, app/projects/page.tsx), never from "use client" files.
import { existsSync } from "fs"
import { join } from "path"
import { projects } from "@/constants/projects"

/**
 * Which project `image` paths actually exist under public/.
 * Checked at render time on the server so cards can show a neutral
 * placeholder instead of a broken image until the PNGs are added.
 */
export function getAvailableProjectImages(): string[] {
  return projects
    .map((p) => p.image)
    .filter((image): image is string => Boolean(image))
    .filter((image) => existsSync(join(process.cwd(), "public", image)))
}
