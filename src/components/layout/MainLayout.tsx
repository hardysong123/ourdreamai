import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Sidebar />
      <Header />
      <main className="lg:ml-[220px] pt-[60px] min-h-screen">
        {children}
      </main>
    </div>
  );
}
