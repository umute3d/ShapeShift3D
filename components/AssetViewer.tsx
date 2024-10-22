'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface AssetViewerProps {
  assetUrl: string
  backgroundColor?: string
}

export default function AssetViewer({ assetUrl, backgroundColor = '#f3f4f6' }: AssetViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(300, 300)
    renderer.setClearColor(backgroundColor, 1)
    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    camera.position.z = 5
    controls.update()

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(0, 1, 0)
    scene.add(directionalLight)

    const loader = new GLTFLoader()
    loader.load(
      assetUrl,
      (gltf) => {
        scene.add(gltf.scene)
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(gltf.scene)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 5 / maxDim
        gltf.scene.scale.setScalar(scale)
        
        gltf.scene.position.sub(center.multiplyScalar(scale))
        
        camera.position.z = 5
        controls.update()
      },
      undefined,
      (error) => {
        console.error('An error occurred loading the 3D model:', error)
        setError('Failed to load 3D model')
      }
    )

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [assetUrl, backgroundColor])

  if (error) {
    return <div className="w-full aspect-square flex items-center justify-center bg-gray-100 text-red-500">{error}</div>
  }

  return <div ref={mountRef} className="w-full aspect-square" style={{ backgroundColor }} />
}