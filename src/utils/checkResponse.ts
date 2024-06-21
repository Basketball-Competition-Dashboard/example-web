export async function checkResponse(response: Response): Promise<boolean> {
  if (!response.ok) {
    let message: string | undefined;
    try {
      message = (
        await response
          .json()
          .catch(() => ({ message: response.statusText }))
      ).message;
    } catch (error) {
      message = `${error}`;
    }
    message = message || 'Unknown error';
    alert(`Error ${response.status} - ${message}`);
    return false;
  }
  return true;
}
