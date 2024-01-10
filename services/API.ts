type FetchOptions = {
  method: string;
  headers?: { [key: string]: string };
  body?: string;
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error('No Network Response!');
  }
  return await response.json();
};

export const apiRequest = async <T>(
  url: string,
  options: FetchOptions = { method: 'GET' }
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    const data: T = await handleResponse(response);
    return data;
  } catch (error) {
    throw new Error('There was a problem with the fetch operation: ' + error);
  }
};
