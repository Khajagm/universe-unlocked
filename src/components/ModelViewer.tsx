"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ModelViewerProps {
  src: string
  alt?: string
}

export default function ModelViewer({ src, alt = "3D Model" }: ModelViewerProps) {
  const { isDarkMode } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Dynamically import Three.js and related libraries
    const loadModel = async () => {
      try {
        const THREE = await import("three")
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls")
        const { STLLoader } = await import("three/examples/jsm/loaders/STLLoader")
        const { OBJLoader } = await import("three/examples/jsm/loaders/OBJLoader")

        // Create scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(isDarkMode ? 0x1f2937 : 0xf3f4f6)

        // Create camera
        const camera = new THREE.PerspectiveCamera(
          75,
          containerRef.current!.clientWidth / containerRef.current!.clientHeight,
          0.1,
          1000,
        )
        camera.position.z = 5

        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight)
        containerRef.current!.appendChild(renderer.domElement)

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(0, 1, 1)
        scene.add(directionalLight)

        // Add controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.25

        // Load model based on file extension
        let loader
        if (src.endsWith(".stl")) {
          loader = new STLLoader()
          loader.load(
            src,
            (geometry) => {
              const material = new THREE.MeshPhongMaterial({
                color: 0x7e22ce, // Purple color to match theme
                specular: 0x111111,
                shininess: 200,
              })
              const mesh = new THREE.Mesh(geometry, material)

              // Center the model
              geometry.computeBoundingBox()
              const boundingBox = geometry.boundingBox!
              const center = new THREE.Vector3()
              boundingBox.getCenter(center)
              mesh.position.set(-center.x, -center.y, -center.z)

              // Scale model to fit view
              const size = new THREE.Vector3()
              boundingBox.getSize(size)
              const maxDim = Math.max(size.x, size.y, size.z)
              const scale = 3 / maxDim
              mesh.scale.set(scale, scale, scale)

              scene.add(mesh)
              setIsLoaded(true)
            },
            undefined,
            (error) => {
              console.error("Error loading STL model:", error)
              setError("Failed to load STL model")
            },
          )
        } else if (src.endsWith(".obj")) {
          loader = new OBJLoader()
          loader.load(
            src,
            (object) => {
              // Apply material to all meshes
              object.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  child.material = new THREE.MeshPhongMaterial({
                    color: 0x7e22ce, // Purple color to match theme
                    specular: 0x111111,
                    shininess: 200,
                  })
                }
              })

              // Center and scale the model
              const box = new THREE.Box3().setFromObject(object)
              const center = new THREE.Vector3()
              box.getCenter(center)
              object.position.set(-center.x, -center.y, -center.z)

              const size = new THREE.Vector3()
              box.getSize(size)
              const maxDim = Math.max(size.x, size.y, size.z)
              const scale = 3 / maxDim
              object.scale.set(scale, scale, scale)

              scene.add(object)
              setIsLoaded(true)
            },
            undefined,
            (error) => {
              console.error("Error loading OBJ model:", error)
              setError("Failed to load OBJ model")
            },
          )
        } else {
          setError("Unsupported model format. Please use .stl or .obj files.")
          return
        }

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate)
          controls.update()
          renderer.render(scene, camera)
        }
        animate()

        // Handle window resize
        const handleResize = () => {
          if (!containerRef.current) return
          camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        }
        window.addEventListener("resize", handleResize)

        // Cleanup
        return () => {
          window.removeEventListener("resize", handleResize)
          if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
            containerRef.current.removeChild(renderer.domElement)
          }
          renderer.dispose()
        }
      } catch (err) {
        console.error("Error initializing 3D viewer:", err)
        setError("Failed to initialize 3D viewer. Your browser may not support WebGL.")
      }
    }

    loadModel()
  }, [src, isDarkMode])

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

      <div ref={containerRef} className="w-full h-[500px] relative">
        {!isLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-center">
              <p>Loading 3D model...</p>
              <p className="text-sm mt-2">This may take a moment</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-red-500 mb-2">{error}</p>
              <p>
                You can still{" "}
                <a href={src} download className="text-purple-500 hover:text-purple-400 underline">
                  download the model
                </a>{" "}
                to view in a 3D application.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
