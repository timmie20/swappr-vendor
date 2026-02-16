import { cookies } from "next/headers";

import Header from "@/components/shared/header";
import Container from "@/components/ui/container";
import AppSidebar from "@/components/shared/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />

      <div className="flex min-w-0 grow flex-col">
        <Header />

        <main className="grow pt-6 pb-8 print:py-0!">
          <Container>{children}</Container>
        </main>
      </div>
    </SidebarProvider>
  );
}
