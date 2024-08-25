/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";
import "../styles/globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import Link from "next/link";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [hasConsentValue, setHasConsentValue] = useState(false);

  useEffect(() => {
    setHasConsentValue(!!getCookieConsentValue());
  }, []);

  return (
    <>
      <Head>
        <meta
          key="og:title"
          property="og:title"
          content={`Icon Generator AI`}
        />
        <meta
          key="og:description"
          property="og:description"
          content="Generate beautiful icons using AI with a click of a button."
        />
        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta key="twitter:site" name="twitter:site" content="@webdevcody" />
        <meta
          key="twitter:title"
          name="twitter:title"
          content="Icon Generator AI"
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Generate beautiful icons using AI with a click of a button."
        />
      </Head>
      <SessionProvider session={session}>
        <Header />
        <div>
          <Component {...pageProps} />
        </div>
        <Footer />

        {!hasConsentValue && (
          <CookieConsent
            // enableDeclineButton
            onAccept={() => undefined}
            // onDecline={() => {
            //   setHasConsentValue(true);
            // }}
            style={{ background: "#222", color: "white" }}
            buttonText="Accept"
            declineButtonText="Reject all cookies"
            buttonStyle={{
              color: "black",
              background: "#3abff7",
              fontSize: "18px",
              borderRadius: "4px",
            }}
            // declineButtonStyle={{
            //   color: "white",
            //   background: "gray",
            //   fontSize: "18px",
            //   borderRadius: "4px",
            // }}
          >
            We use cookies for authentication purposes and stripe checkout. To
            understand how you use our site and to improve our services. By
            clicking &quot;Allow all cookies&quot;, you consent to the use of
            cookies and the processing of your personal data for these purposes.
            You may visit our{" "}
            <Link className="link" href="/cookies">
              Cookie Prefences
            </Link>{" "}
            page to learn more about the types of cookies we use and how to
            manage your preferences.
          </CookieConsent>
        )}
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
