'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import Image from 'next/image'

export default function EditableImage({
  imagePath,
  alt = '',
  className = '',
  imgClassName = '',
  bucket = 'images',
  width = 400,
  height = 300
}: {
  imagePath: string // ex: 'hero-banner.png'
  alt?: string
  className?: string
  imgClassName?: string
  bucket?: string
  width?: number
  height?: number
}) {
  const { data: session } = useSession()
  const inputRef = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState('')
  const [uploading, setUploading] = useState(false)



  useEffect(() => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(imagePath)
  if (data?.publicUrl) {
    const updatedUrl = `${data.publicUrl}?t=${Date.now()}`
    setUrl(updatedUrl)
  }
}, [imagePath, bucket])


  const handleUpload = async (file: File) => {
    setUploading(true)

    const { error } = await supabase
      .storage
      .from(bucket)
      .upload(imagePath, file, { upsert: true })

    if (error) {
      console.error('Erreur Supabase :', error.message)
    } else {
      // Recharger l’image avec nouveau cache-busting
      const { data } = supabase.storage.from(bucket).getPublicUrl(imagePath)
      if (data?.publicUrl) {
        const updatedUrl = `${data.publicUrl}?t=${Date.now()}`
        setUrl(updatedUrl)
      }
    }

    setUploading(false)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    console.log('File selected:', file)
    if (file) handleUpload(file)
  }

  return (
    <div className={className}>
      {url ? (
        <Image
          src={url}
          alt={alt}
          width={width}
          height={height}
          className={`${session ? 'cursor-pointer hover:opacity-70 transition' : ''} ${imgClassName}`}
          onClick={() => session && inputRef.current?.click()}
        />
      ) : (
        <div className="w-[400px] h-[300px] bg-gray-100 animate-pulse rounded" />
      )}
      {uploading && <p className="text-sm text-gray-500">Upload en cours...</p>}
      {session && (
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          className="hidden"
          onChange={onFileChange}
        />
      )}
    </div>
  )
}
