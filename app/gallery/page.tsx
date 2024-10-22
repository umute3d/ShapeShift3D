'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AssetViewer from '@/components/AssetViewer'

// Updated placeholder data for generated assets
const placeholderAssets = [
  { id: 1, name: 'Asset 1', url: 'https://demo.sirv.com/model.glb' },
  { id: 2, name: 'Asset 2', url: 'https://demo.sirv.com/model.glb' },
  { id: 3, name: 'Asset 3', url: 'https://demo.sirv.com/model.glb' },
]

export default function GalleryPage() {
  const [assets, setAssets] = useState(placeholderAssets.map(asset => ({ ...asset, backgroundColor: '#f3f4f6' })))

  const handleColorChange = (id: number, color: string) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, backgroundColor: color } : asset
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Asset Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <Card key={asset.id} className="overflow-hidden">
            <CardContent className="p-4">
              <AssetViewer assetUrl={asset.url} backgroundColor={asset.backgroundColor} />
            </CardContent>
            <CardFooter className="bg-gray-100 p-4 flex flex-col items-start">
              <h3 className="text-lg font-semibold mb-2">{asset.name}</h3>
              <div className="flex items-center justify-between w-full">
                <Input
                  type="color"
                  value={asset.backgroundColor}
                  onChange={(e) => handleColorChange(asset.id, e.target.value)}
                  className="w-24 h-8 p-0 border-none"
                />
                <Button variant="outline">
                  View Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}