import type { ReactNode } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 bg-page p-8">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
