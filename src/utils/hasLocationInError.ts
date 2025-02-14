export default function hasLocationInError(errorResponse: { error: any[] }) {
  if (errorResponse && Array.isArray(errorResponse.error)) {
    return errorResponse.error.some((error) => "location" in error);
  }
  return false;
}
