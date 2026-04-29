import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';

export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar showMenuButton onMenuClick={() => setMobileOpen(true)} />

      <div className="flex-1 flex w-full">
        <div className="hidden lg:block sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
          <Sidebar />
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-72 bg-sidebar border-sidebar-border">
            <div className="pt-12">
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <footer className="border-t border-border py-6 px-6 text-center text-sm text-muted-foreground">
        <p>Central de Conhecimento da F&#225;cil Inform&#225;tica</p>
      </footer>
    </div>
  );
};
