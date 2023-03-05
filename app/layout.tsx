import Footer from "../components/layout/Footer";
import "./globals.css";
import Header from "../components/layout/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-screen flex flex-col">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="flex flex-col flex-1">
        <Header />
        <main className="flex flex-col flex-1 p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
