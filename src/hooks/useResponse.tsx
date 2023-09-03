import React, { useState } from 'react';

// This hook is a utility hook (not exported),
// which stores UI for response from user code to this package
// Obj key:function_name -> value:ReactNode
const useResponseUI = (initialState?: Record<string, React.ReactNode>) => {
  const [responses, setResponses] = useState<Record<string, React.ReactNode>>(
    initialState || {}
  );

  return {
    responses,
    setResponses,
  };
};

export default useResponseUI;
