import "./globals.css";
import Header from "@/components/Header"; // Importa o Header

export const metadata = {
  title: "Canella Survey",
  description: "Ajude-nos a melhorar com sua avaliação!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
      <Header /> {/* Adiciona o Header como parte do layout */}
        {children}
        </body>
    </html>
  );
}