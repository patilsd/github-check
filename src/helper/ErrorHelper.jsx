// helper/errorHelper.js
export const getErrorMessage = (error) => {
    // Check if the error has a response (i.e., from the server)
    if (error.response) {
      // If the response has data, try to extract a meaningful error message
      return error.response.data?.errorMessage || "An unknown error occurred.";
    }
    
    // Check if it's a network error (i.e., no response)
    if (error.request) {
      return "Network error. Please check your internet connection.";
    }
  
    // Generic fallback for unexpected errors
    return error.message || "An error occurred. Please try again.";
  };
  