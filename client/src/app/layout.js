"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {store} from "@/app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night">
      <Provider store={store}>
        <body className={inter.className}>
          <ToastContainer />
          <Navbar />
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
