"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import { motion } from "framer-motion"

interface ResumePreviewProps {
  resumeUrl?: string
  children: React.ReactNode
}

export function ResumePreview({ resumeUrl, children }: ResumePreviewProps) {
  const [open, setOpen] = useState(false)
  // Use Sabasiddique_frontendresume.pdf from public folder
  const resumePath = resumeUrl || process.env.NEXT_PUBLIC_RESUME_URL || "/Sabasiddique_frontendresume.pdf"

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = resumePath
    link.download = "Saba_Siddique_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0 z-[100]">
        <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Resume Preview
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto relative bg-background">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <iframe
              src={`${resumePath}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-0"
              title="Resume Preview"
              style={{ 
                minHeight: "100%",
                width: "100%",
                display: "block"
              }}
              loading="lazy"
            />
          </motion.div>
        </div>

        <DialogFooter className="px-6 py-4 border-t flex-row justify-between sm:justify-between">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="sm:min-w-[100px]"
          >
            Close
          </Button>
          <Button
            onClick={handleDownload}
            className="sm:min-w-[150px] bg-primary hover:bg-primary/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

