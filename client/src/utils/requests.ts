const PORT = 3001;

export const getRequestURL = (requestPath: string) => {
  return `http://localhost:${PORT}/${requestPath}`;
};

export const submitText = async (text: string): Promise<Response> => {
  const url = getRequestURL("submit-text");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return response;
};
