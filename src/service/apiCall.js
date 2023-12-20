const ApiCall = async (endpoint, body) => {
  const baseurl = "http://localhost:8000/api/";
  try {
    const response = await fetch(`${baseurl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const responseStatus = response.status;
      if (responseStatus === 401) {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const response = await fetch(`${baseurl}refresh-token`, {
            method: postMessage,
            headers: {
              "Content-Type": "application/json",
            },
            body: refreshToken,
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", data.accessToken);
          }
        } catch (error) {
          console.log(error);
          return error;
        }
      }
    } else {
      // const data = await response.json();
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default ApiCall;
