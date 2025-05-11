"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { Download, FileType, ExternalLink } from "lucide-react"
import Image from "next/image"

interface ModelViewerProps {
  src: string
  alt?: string
  imageSrc?: string
}

export default function ModelViewer({ src, alt = "3D Model", imageSrc }: ModelViewerProps) {
  const { isDarkMode } = useTheme()

  // Get file extension
  const fileExtension = src.split(".").pop()?.toUpperCase() || "MODEL"

  // Get file name
  const fileName = src.split("/").pop() || "model file"

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">{alt}</h3>
          <Button asChild variant="outline" size="sm">
            <a href={src} download>
              <Download className="h-4 w-4 mr-2" />
              Download
            </a>
          </Button>
        </div>
      </div>

      <div className="w-full relative">
        {/* Preview image if available */}
        {imageSrc ? (
          <div className="relative h-[400px]">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={`Preview of ${alt}`}
              fill
              style={{ objectFit: "contain" }}
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="h-[300px] flex flex-col items-center justify-center p-6 text-center">
            <FileType className="h-16 w-16 mb-4 text-purple-500" />
            <h4 className="text-xl font-semibold mb-2">{fileExtension} File</h4>
            <p className="mb-4">{fileName}</p>
            <p className="text-sm opacity-75 mb-6">
              3D model viewer requires Three.js to be installed. You can download the file and view it in a 3D
              application.
            </p>

            {/* External viewer options */}
            <div className="space-y-2">
              <p className="text-sm font-medium">View with external tools:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {fileExtension === "STL" && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={`https://viewstl.com/?url=${encodeURIComponent(src)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      ViewSTL.com
                    </a>
                  </Button>
                )}
                {fileExtension === "OBJ" && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={`https://3dviewer.net/#model=${encodeURIComponent(src)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      3DViewer.net
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
