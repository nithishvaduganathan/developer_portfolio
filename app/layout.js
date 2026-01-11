import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nithish Vaduganathan | Python & AI Developer Portfolio",
  description:
    "Portfolio of Nithish Vaduganathan, a Python and AI Developer specializing in machine learning, NLP, Flask, and full-stack web development. Explore projects, skills, and experience.",
  verification: {
    google: "Fw-kfqU4pOvSaknhy19YJIkjHM8Yyj4fn9ThHKfG3cE",
  },
 other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Nithish Vaduganathan",
      url: "https://nithishvaduganathan.vercel.app",
      jobTitle: "Python & AI Developer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Thiruvarur",
        addressRegion: "Tamil Nadu",
        addressCountry: "India",
      },
      sameAs: [
        "https://github.com/nithishvaduganathan",
        "https://www.linkedin.com/in/nithishvaduganathan",
      ],
    }),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
