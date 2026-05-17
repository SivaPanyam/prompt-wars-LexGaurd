import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { UploadCloud, File as FileIcon, X, CheckCircle2, Type } from "lucide-react"
import { uploadContractFile, uploadContractText } from "../services/api"

export default function UploadContract() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("file") // "file" or "text"
  
  // File State
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  // Text State
  const [pastedText, setPastedText] = useState("")
  const [textTitle, setTextTitle] = useState("Pasted Contract")

  // Common State
  const [error, setError] = useState("")

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setError("")
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError("")
    }
  }

  const handleFileUpload = async () => {
    if (!file) return
    setIsUploading(true)
    setError("")
    setUploadProgress(0)
    
    try {
      const result = await uploadContractFile(file, (progress) => {
        setUploadProgress(progress)
      })
      // Ensure we hit 100% before redirecting
      setUploadProgress(100)
      setTimeout(() => {
        navigate(`/dashboard/contracts?id=${result.analysis_id}`, { state: { report: result.report } })
      }, 500)
    } catch (err) {
      setError(err.message || "Failed to upload file")
      setIsUploading(false)
    }
  }

  const handleTextUpload = async () => {
    if (!pastedText.trim()) {
      setError("Please paste some text before analyzing.")
      return
    }
    
    setIsUploading(true)
    setError("")
    setUploadProgress(10) // Simulate start
    
    try {
      // Simulate fake progress for UX
      const interval = setInterval(() => {
        setUploadProgress(p => p < 90 ? p + 10 : p)
      }, 300)

      const result = await uploadContractText(pastedText, textTitle)
      
      clearInterval(interval)
      setUploadProgress(100)
      setTimeout(() => {
        navigate(`/dashboard/contracts?id=${result.analysis_id}`, { state: { report: result.report } })
      }, 500)
    } catch (err) {
      setError(err.message || "Failed to upload text")
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-on-surface">Upload Contract</h2>
        <p className="text-sm text-on-surface-variant">Upload or paste a legal document for multi-agent analysis.</p>
      </div>

      <div className="flex space-x-1 bg-surface-container-low p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("file")}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "file" 
              ? "bg-surface shadow text-on-surface" 
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <FileIcon className="w-4 h-4 mr-2" />
          File Upload
        </button>
        <button
          onClick={() => setActiveTab("text")}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "text" 
              ? "bg-surface shadow text-on-surface" 
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <Type className="w-4 h-4 mr-2" />
          Paste Text
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{activeTab === "file" ? "Document Upload" : "Paste Contract Text"}</CardTitle>
          <CardDescription>
            {activeTab === "file" 
              ? "Supported formats: PDF, DOCX, TXT. Max size: 25MB." 
              : "Paste the raw text of the contract below."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 p-3 text-sm text-error bg-error/10 border border-error/20 rounded-md">{error}</div>}

          {activeTab === "file" && (
            <>
              {!file ? (
                <div 
                  className="border-2 border-dashed border-outline-variant rounded-xl p-12 text-center hover:bg-surface-container-low transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UploadCloud className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-on-surface mb-1">Click or drag file to this area to upload</h3>
                  <p className="text-sm text-on-surface-variant">
                    LexGuard will automatically OCR, extract text, and begin risk analysis.
                  </p>
                  <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-outline-variant rounded-lg bg-surface-container-lowest">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded flex items-center justify-center">
                        <FileIcon className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-on-surface-variant">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    {!isUploading && (
                      <button onClick={() => setFile(null)} className="text-outline hover:text-error transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {isUploading ? (
                    <ProcessingState progress={uploadProgress} />
                  ) : (
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setFile(null)}>Cancel</Button>
                      <Button onClick={handleFileUpload}>Start AI Analysis</Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {activeTab === "text" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Document Title (e.g. Acme NDA)"
                value={textTitle}
                onChange={(e) => setTextTitle(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container border border-outline-variant rounded-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isUploading}
              />
              <textarea
                className="w-full h-64 p-3 bg-surface-container border border-outline-variant rounded-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Paste contract text here..."
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                disabled={isUploading}
              ></textarea>
              
              {isUploading ? (
                <ProcessingState progress={uploadProgress} />
              ) : (
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setPastedText("")}>Clear</Button>
                  <Button onClick={handleTextUpload}>Start AI Analysis</Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ProcessingState({ progress }) {
  return (
    <div className="space-y-2 mt-6 border-t border-outline-variant/30 pt-6">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-primary flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          AI Agents processing...
        </span>
        <span className="text-on-surface-variant">{progress}%</span>
      </div>
      <div className="w-full bg-surface-container-high rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-200" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4 text-xs text-on-surface-variant">
        <div className={`flex items-center gap-1 ${progress > 30 ? 'text-green-600' : ''}`}>
          {progress > 30 ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-outline"></div>}
          Extracting text
        </div>
        <div className={`flex items-center gap-1 ${progress > 60 ? 'text-green-600' : ''}`}>
          {progress > 60 ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-outline"></div>}
          Identifying clauses
        </div>
        <div className={`flex items-center gap-1 ${progress > 90 ? 'text-green-600' : ''}`}>
          {progress > 90 ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-outline"></div>}
          Scoring risks
        </div>
      </div>
    </div>
  )
}
