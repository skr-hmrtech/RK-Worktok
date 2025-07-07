import { URLS } from "./UrlList";

const ApiService = async (url, type, data = {}, formData = false, baseUrl = URLS.BASE_URL_V5) => {
  const headers = {
    'x-api-key': URLS.API_KEY,
    ...(!formData && { 'Content-Type': 'application/json' }),
  };

  const requestOptions = {
    method: type,
    headers,
    body: formData ? data : JSON.stringify(data),
    redirect: 'follow',
  };

  if (requestOptions.method === 'GET' || requestOptions.method === 'DELETE') {
    delete requestOptions.body;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000); // ⏱ 20 seconds timeout
  requestOptions.signal = controller.signal;

  try {
    const response = await fetch(`${baseUrl}/${url}`, requestOptions);
    clearTimeout(timeout); // ✅ Clear timeout if request succeeds

    const jsonRes = await response.json();

    if (!response.ok) {
      console.error('API Error:', jsonRes);
      console.error(jsonRes?.msg ?? jsonRes?.message ?? 'Server Error, API not found.');
    }

    return jsonRes;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('⏱ API Request Timeout (exceeded 20s)');
    } else {
      console.error('API Error:', error);
    }

    return {
      ack: 0,
      message: 'API request failed or timed out',
    };
  }
};

export default ApiService;
