interface Window {
    ethereum?: {
      request: (request: { method: string, params?: Array<any> }) => Promise<any>;
    };
  }
  