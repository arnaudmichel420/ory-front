export function getQueryErrorMessage(
  error: unknown,
  fallbackMessage = "Une erreur est survenue.",
) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}
