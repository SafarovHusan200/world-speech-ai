export const getTokens = async (code) => {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/api/auth/callback/google",
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

// Misol uchun, auth code ni olingandan so'ng chaqirish:
