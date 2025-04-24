interface JsonpOptions {
  timeout?: number;
}

export const jsonp = (url: string, options: JsonpOptions = {}): Promise<any> => {
  const timeout = options.timeout || 10000;
  const callbackName = `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
  
  return new Promise((resolve, reject) => {
    let timeoutId: number | undefined;
    
    // Create the script element
    const script = document.createElement('script');
    
    // Create the callback function
    (window as any)[callbackName] = (data: any) => {
      cleanup();
      resolve(data);
    };
    
    // Handle script load error
    script.onerror = () => {
      cleanup();
      reject(new Error('JSONP request failed'));
    };
    
    // Set timeout
    timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('JSONP request timed out'));
    }, timeout);
    
    // Add callback parameter to the URL
    const separator = url.includes('?') ? '&' : '?';
    script.src = `${url}${separator}callback=${callbackName}`;
    
    // Cleanup function
    function cleanup() {
      if (timeoutId) clearTimeout(timeoutId);
      document.body.removeChild(script);
      delete (window as any)[callbackName];
    }
    
    // Append the script to start the request
    document.body.appendChild(script);
  });
};