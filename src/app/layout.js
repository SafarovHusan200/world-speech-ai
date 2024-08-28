import ClientQueryProvider from "./hooks/ClientQueryProvider";
import "../styles/global.css";
import NextTopLoader from "nextjs-toploader";
import Head from "next/head";

export const metadata = {
  title: "World Speech AI",
  description: "Преобразуем аудио в текст: онлайн-встречи, звонки, файлы",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body>
        <NextTopLoader showSpinner={false} />
        <ClientQueryProvider>{children}</ClientQueryProvider>
      </body>
    </html>
  );
}
