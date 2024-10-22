'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Upload, Image as ImageIcon } from 'lucide-react'
import AssetViewer from '@/components/AssetViewer'

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [generatedAsset, setGeneratedAsset] = useState<string | null>(null)

  const handleGenerate = async () => {
    // Placeholder for API call
    console.log('Generating asset with:', prompt || image)
    // Simulating API response with the provided URL
    setGeneratedAsset('https://demo.sirv.com/model.glb')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Generate 3D Asset</h1>
      <Tabs defaultValue="text">
        <TabsList className="mb-4">
          <TabsTrigger value="text">Text Prompt</TabsTrigger>
          <TabsTrigger value="image">Image Input</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <Card className="p-6">
            <Label htmlFor="prompt">Enter your prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Describe the 3D asset you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mt-2 mb-4"
            />
            <Button onClick={handleGenerate}>Generate</Button>
          </Card>
        </TabsContent>
        <TabsContent value="image">
          <Card className="p-6">
            <Label htmlFor="image-upload">Upload an image</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="mt-2 mb-4"
            />
            <Button onClick={handleGenerate} disabled={!image}>
              Generate from Image
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
      {generatedAsset && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Generated Asset</h2>
          <AssetViewer assetUrl={generatedAsset} />
        </div>
      )}
    </div>
  )
}