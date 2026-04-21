export async function getErrorMessage(
  error: unknown,
  fallbackMessage = "Une erreur est survenue.",
) {
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "message" in error.data &&
    typeof error.data.message === "string"
  ) {
    return error.data.message;
  }

  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response instanceof Response
  ) {
    try {
      const data = await error.response.clone().json();

      if (
        data &&
        typeof data === "object" &&
        "message" in data &&
        typeof data.message === "string" &&
        data.message.trim()
      ) {
        return data.message;
      }

      if (
        data &&
        typeof data === "object" &&
        "detail" in data &&
        typeof data.detail === "string" &&
        data.detail.trim()
      ) {
        return data.detail;
      }
    } catch {
      // Keep the generic fallback below if the response body cannot be parsed.
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}
