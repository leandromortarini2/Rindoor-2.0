// _app.js

import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Persist navigation state when changing routes
    const handleRouteChange = (url) => {
      localStorage.setItem("auth0:nextjs:url", url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <Auth0Provider
      domain={process.env.AUTH0_ISSUER_BASE_URL}
      clientId={process.env.AUTH0_CLIENT_ID}
      redirectUri={process.env.AUTH0_BASE_URL}
      audience="https://api.example.com"
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
