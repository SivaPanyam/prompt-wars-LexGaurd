import { db, auth } from "./firebase"
import { doc, getDoc, collection, getDocs, query, orderBy, limit, where } from "firebase/firestore"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"

const getAuthToken = async () => {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken()
  }
  return null
}

export const uploadContractFile = async (file, onProgress) => {
  const formData = new FormData()
  formData.append('file', file)
  const token = await getAuthToken()

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && onProgress) {
        const percentComplete = Math.round((event.loaded / event.total) * 100)
        onProgress(percentComplete)
      }
    })

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error(xhr.responseText || "Upload failed"))
      }
    })

    xhr.addEventListener("error", () => {
      reject(new Error("Network error during upload"))
    })

    xhr.open("POST", `${API_BASE_URL}/upload`)
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`)
    }
    xhr.send(formData)
  })
}

export const uploadContractText = async (text, title) => {
  const token = await getAuthToken()
  
  const headers = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}/upload-text`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ text, title })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "Text upload failed")
  }

  return await response.json()
}

// Fetch single analysis report
export const getAnalysisReport = async (analysisId) => {
  try {
    const docRef = doc(db, "analyses", analysisId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      throw new Error("Analysis not found")
    }
  } catch (error) {
    console.error("Error fetching analysis:", error)
    throw error
  }
}

// Fetch all analysis reports for a user
export const getAllAnalyses = async () => {
  try {
    let q;
    if (auth.currentUser) {
      q = query(
        collection(db, "analyses"),
        where("user_id", "==", auth.currentUser.uid)
      )
    } else {
      // Fallback for mock/local without auth
      q = query(collection(db, "analyses"))
    }
    
    const querySnapshot = await getDocs(q)
    
    const analyses = []
    querySnapshot.forEach((doc) => {
      analyses.push({ id: doc.id, ...doc.data() })
    })
    
    // Sort by mock date since we don't have createdAt in the schema yet
    return analyses.reverse()
  } catch (error) {
    console.error("Error fetching all analyses:", error)
    return []
  }
}
