import axios from 'axios'

export const uploadSingleImage = async (file: File) => {
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  try {
    const res = await axios.post('http://localhost:3000/upload/single-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return res.data
  } catch (err) {
    console.error(err)

    return null
  }
}
