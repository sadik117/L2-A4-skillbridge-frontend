import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { AuthInit } from "@/components/hooks/authInit";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthInit />
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
}
