export function getGoogleOAuth2Url() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const {
    NEXT_PUBLIC_GOOGLE_OAUTH2_REDIRECT_URL,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  } = process.env;

  if (
    !NEXT_PUBLIC_GOOGLE_OAUTH2_REDIRECT_URL ||
    !NEXT_PUBLIC_GOOGLE_CLIENT_ID
  ) {
    throw new Error("Missing Google OAuth2 environment variables");
  }

  const params: Record<string, string> = {
    redirect_uri: NEXT_PUBLIC_GOOGLE_OAUTH2_REDIRECT_URL,
    client_id: NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  return `${rootUrl}?${new URLSearchParams(params).toString()}`;
}
