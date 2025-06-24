import { URLS } from "./UrlList";

const ApiService = async (url, type, data = {}, formData = false, baseUrl = URLS.BASE_URL_V5) => {
  const headers = {
    'x-api-key': URLS.API_KEY,
    ...(!formData && { 'Content-Type': 'application/json' })
  }

  const requestOptions = {
    method: type,
    headers,
    body: formData ? data : JSON.stringify(data),
    redirect: 'follow',
  }

  if (requestOptions.method === 'GET' || requestOptions.method === 'DELETE') {
    delete requestOptions.body
  }

  try {
    const response = await fetch(`${baseUrl}/${url}`, requestOptions)
    const jsonRes = await response.json()

    if (!response.ok) {
      console.error('API Error:', jsonRes)
      console.error(jsonRes?.msg ?? jsonRes?.message ?? 'Server Error, API not found.')
    }

    return jsonRes
  } catch (error) {
    console.error('API Error:', error)
    return {
      ack: 0,
    }
  }
}

export default ApiService
