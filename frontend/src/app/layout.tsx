import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata = {
  title: "Simple Blog",
  description: "Blog app with Next.js and FastAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
