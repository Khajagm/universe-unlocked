"use client"

import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { Download, FileType, ExternalLink, CuboidIcon as Cube } from "lucide-react"

interface ModelViewerProps {
  src?: string
  alt?: string
  imageSrc?: string
  externalURL?: string
}

export default function ModelViewer({ src, alt = "3D Model", imageSrc, externalURL }: ModelViewerProps) {
  const { isDarkMode } = useTheme()

  // Get file extension and name if we have a src
  const fileExtension = src ? src.split(".").pop()?.toUpperCase() || "MODEL" : "MODEL"
  const fileName = src ? src.split("/").pop() || "model file" : "model file"

  // Check if external tools are available for this file type
  const hasExternalTools = src && (fileExtension === "STL" || fileExtension === "OBJ")

  // If we have both external URL and src, show split layout
  if (externalURL && src) {
    return (
      <div
        className={`rounded-lg overflow-hidden shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          {/* Download Section */}
          <div
            className={`p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
          >
            <Download className="h-16 w-16 mb-4 text-purple-500" />
            <h3 className="text-xl font-semibold mb-3">Download the Model</h3>
            <p className="text-sm opacity-75 mb-6 max-w-xs">
              Download the {fileExtension} file to explore or 3D print your own model.
            </p>
            <Button asChild variant="outline" size="lg">
              <a href={src} download>
                <Download className="h-4 w-4 mr-2" />
                Download {fileExtension}
              </a>
            </Button>

            {/* External viewer options - only show if tools are available */}
            {hasExternalTools && (
              <div className="mt-6 space-y-2">
                <p className="text-xs font-medium opacity-75">Or view online:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {fileExtension === "STL" && (
                    <Button asChild variant="ghost" size="sm">
                      <a
                        href={`https://viewstl.com/?url=${encodeURIComponent(src)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        ViewSTL
                      </a>
                    </Button>
                  )}
                  {fileExtension === "OBJ" && (
                    <Button asChild variant="ghost" size="sm">
                      <a
                        href={`https://3dviewer.net/#model=${encodeURIComponent(src)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        3DViewer
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Experience Section */}
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <ExternalLink className="h-16 w-16 mb-4 text-purple-500" />
            <h3 className="text-xl font-semibold mb-3">Interactive Experience</h3>
            <p className="text-sm opacity-75 mb-6 max-w-xs">
              Explore this cosmic object in an immersive 3D experience that opens in a new window.
            </p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <a href={externalURL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Experience
              </a>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // If we only have external URL, show just that
  if (externalURL && !src) {
    return (
      <div
        className={`rounded-lg overflow-hidden shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
          <ExternalLink className="h-16 w-16 mb-4 text-purple-500" />
          <h3 className="text-xl font-semibold mb-3">Interactive Experience</h3>
          <p className="text-sm opacity-75 mb-6 max-w-md">
            Explore this cosmic object in an immersive 3D experience that opens in a new window.
          </p>
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <a href={externalURL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Experience
            </a>
          </Button>
        </div>
      </div>
    )
  }

  // If we only have src file, show download section
  if (src && !externalURL) {
    return (
      <div
        className={`rounded-lg overflow-hidden shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
          {/* Preview image if available */}
          {imageSrc ? (
            <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
              <img
                src={imageSrc || "/placeholder.svg"}
                alt={`Preview of ${alt}`}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <Cube className="h-16 w-16 mb-4 text-purple-500" />
          )}

          <h3 className="text-xl font-semibold mb-3">Download the Model</h3>
          <p className="text-sm opacity-75 mb-2">{fileName}</p>
          <p className="text-sm opacity-75 mb-6 max-w-md">
            Download the {fileExtension} file to explore in a 3D application or prepare for 3D printing.
          </p>

          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 mb-4">
            <a href={src} download>
              <Download className="h-4 w-4 mr-2" />
              Download {fileExtension}
            </a>
          </Button>

          {/* External viewer options - only show if tools are available */}
          {hasExternalTools && (
            <div className="space-y-2">
              <p className="text-xs font-medium opacity-75">Or view online:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {fileExtension === "STL" && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={`https://viewstl.com/?url=${encodeURIComponent(src)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
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
                      <ExternalLink className="h-3 w-3 mr-1" />
                      3DViewer.net
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Fallback - no model available
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
        <FileType className="h-16 w-16 mb-4 text-purple-500" />
        <h3 className="text-xl font-semibold mb-3">No Model Available</h3>
        <p className="text-sm opacity-75">No 3D model file is available for this item.</p>
      </div>
    </div>
  )
}
