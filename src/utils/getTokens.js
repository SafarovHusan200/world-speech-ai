export const getTokens = async (code) => {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code: code,
      client_id:
        "329961613669-in9rlgg2a9dojff05bmiimkvrfhupp7g.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri: "https://world-speech-ai.netlify.app/auth/login",
      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    console.log("Access Token:", data.access_token);
    console.log("Refresh Token:", data.refresh_token);
  } else {
    console.error("Error:", data);
  }
};
