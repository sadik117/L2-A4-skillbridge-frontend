const test = async () => {
  const res = await fetch("https://skill-bridge-server-beta.vercel.app/api/auth/sign-in/social", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider: "google", callbackURL: "https://skill-bridge-connect.vercel.app" })
  });
  console.log(res.status);
  console.log(await res.text());
};
test();
