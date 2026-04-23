import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata = {
  title: "task-manager",
  description: "Project Management Dashboard",
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