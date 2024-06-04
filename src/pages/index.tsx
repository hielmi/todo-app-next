import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import HomeView from "@/components/views/Home";
import HomeLayout from "@/components/layouts/HomeLayout";
import AppProvider from "@/Context/indext";

export default function Home() {
  return (
    <SessionProvider>
      <Head>
        <title>TodoKu</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppProvider>
        <HomeLayout>
          <HomeView />
        </HomeLayout>
      </AppProvider>
    </SessionProvider>
  );
}
