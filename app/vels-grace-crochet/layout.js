import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vels Grace Crochet | Handmade Crochet Products",
  description:
    "Shop beautiful handmade crochet products from Vels Grace Crochet. Browse our collection of unique handcrafted items.",
};

export default function VelsGraceCrochetLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} vgc-body`}>
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}
