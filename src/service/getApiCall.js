const GetAPiCall = async (url, accessToken) => {
  const baseurl = "http://localhost:8000/api/";
  try {
    const response = await fetch(`${baseurl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const responseStatus = response.status;
      if (responseStatus === 401) {
        try {
          console.log("I am here");
          const refreshToken = localStorage.getItem("refreshToken");

          console.log("refresh token", refreshToken);
          console.log("stringyfy refresh token", JSON.stringify(refreshToken));
          const response = await fetch(`${baseurl}refresh-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken: refreshToken,
            }),
          });
          const data = await response.json();
          console.log('401 data', data);
          if (response.ok) {
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", data.accessToken.accessToken);
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

export default GetAPiCall;
