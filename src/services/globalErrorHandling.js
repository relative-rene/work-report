
window.onerror = function (message, source, lineno, colno, error) {
    // Log the error details or send them to a logging service
    console.error('Error:', message);
    console.error('Source:', source);
    console.error('Line Number:', lineno);
    console.error('Column Number:', colno);
    console.error('Error Object:', error);
    const errorData = {
        message,
        source,
        lineno,
        colno,
        error: error ? error.stack : null
    }


    // TODO send Error to Logging Service via HTTP request

    // Return true to prevent the default browser error handling
    return true;
};


// Setup global error handling for Unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Additional logging or error handling can be added here
  });
  
  // Example of a Promise that is not handled
  const unhandledPromise = new Promise((resolve, reject) => {
    reject(new Error('This Promise is not handled'));
  });
  
  // Uncomment the line below to see the global error handling in action
  // unhandledPromise.then(result => console.log(result));
  
  // Example of a Promise with proper error handling
  const handledPromise = new Promise((resolve, reject) => {
    reject(new Error('This Promise is handled'));
  });
  
  handledPromise
    .then(result => console.log(result))
    .catch(error => console.error('Error:', error));