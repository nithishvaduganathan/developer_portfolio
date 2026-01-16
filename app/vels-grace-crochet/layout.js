import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

export const metadata = {
  title: "Vels Grace Crochet | Handmade Crochet Products",
  description:
    "Shop beautiful handmade crochet products from Vels Grace Crochet. Browse our collection of unique handcrafted items.",
};

export default function VelsGraceCrochetLayout({ children }) {
  return (
    <html lang="en">
      <body className="vgc-body" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}
