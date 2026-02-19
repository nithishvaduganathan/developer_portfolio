import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import ScrollProgress from "./components/helper/scroll-progress";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
});

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
      url: "https://nithishvaduganathan.tech",
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

export const viewport = {
  themeColor: "#0a192f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ToastContainer />
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen">
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
