"use client"
import { Header } from "./components";
import HomePage from "./components/HomePage";
import { NotificationsProvider } from "@toolpad/core/useNotifications";

export default function Home() {
  return (
    <NotificationsProvider>
      <>
        <Header />
        <HomePage />
      </>
    </NotificationsProvider>
  );
}
