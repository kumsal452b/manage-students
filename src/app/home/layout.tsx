import { Inter } from "next/font/google";
import LandMainPage from "../components/landMainPage";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LandMainPage>{children}</LandMainPage>
      </body>
    </html>
  );
}
