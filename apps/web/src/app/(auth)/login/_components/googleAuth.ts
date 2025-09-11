export const googleAuth = async (code: string) => {
  const res = await fetch(
    `http://localhost:8000/api/v1/auth/oauth2/google?code=${code}`
  );
  const data = await res.json();
  console.log(data);
  return data;
};
