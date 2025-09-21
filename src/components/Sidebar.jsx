import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CreditCard,
  User
} from "lucide-react";
import { Link } from "@inertiajs/react";
import logoApp from "@/images/logoParentKanal.webp";
import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  { 
    name: "Dashboard", 
    href: "/dashboard", 
    icon: Home,
    hasSubmenu: false
  },
  { 
    name: "Akademik", 
    icon: BookOpen,
    hasSubmenu: true,
    submenu: [
      { name: "Hasil Studi", href: "/akademik/hasil-studi" },
      { name: "Presensi", href: "/akademik/presensi" },
      { name: "Transkrip", href: "/akademik/transkrip" }
    ]
  },
  { 
    name: "Jadwal", 
    icon: Calendar,
    hasSubmenu: true,
    submenu: [
      { name: "Jadwal Kuliah", href: "/jadwal/jadwal-kuliah" },
      { name: "Jadwal Dosen Wali", href: "/jadwal/jadwal-dosen-wali" }
    ]
  },
  { 
    name: "Pembayaran", 
    href: "/payment", 
    icon: CreditCard,
    hasSubmenu: false
  },
  { 
    name: "Profile Mahasiswa", 
    href: "/profile", 
    icon: User,
    hasSubmenu: false
  },
];

export function Sidebar({ isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed }) {
  const [pathname, setPathname] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');
  const [openSubmenus, setOpenSubmenus] = useState({});
  const isMobile = useIsMobile();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleRouteChange = () => {
      const newPath = window.location.pathname;
      setPathname(newPath);

      // Cek submenu mana yang aktif
      const newOpenSubmenus = {};
      navigation.forEach((item) => {
        if (item.hasSubmenu) {
          const match = item.submenu.some((sub) => newPath.startsWith(sub.href));
          newOpenSubmenus[item.name] = match;
        }
      });
      setOpenSubmenus(newOpenSubmenus);
    };

    handleRouteChange();

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const toggleSubmenu = (menuName) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-primary/20 backdrop-blur-sm bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <div
        className={cn(
          "bg-sidebar border-r border-sidebar-border transition-all duration-300 fixed inset-y-0 left-0 z-50 h-screen",
          isMobile ? (isMobileOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
          isCollapsed ? "w-16" : "w-64"
        )}
        style={{ overflowY: 'auto' }} 
      >
        <div className="flex h-full flex-col">
          {/* Header Sidebar */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            {!isCollapsed && (
              <img
                src={logoApp}
                alt="Logo"
                className="h-8 w-auto dark:invert dark:brightness-0"
              />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleSidebar}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {isMobile ? (
                <X className="h-4 w-4" />
              ) : isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const isSubmenuOpen = openSubmenus[item.name];

                return (
                  <li key={item.name}>
                    {item.hasSubmenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          className={cn(
                            "flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm transition-colors",
                            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            isCollapsed && "justify-center"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            {!isCollapsed && <span>{item.name}</span>}
                          </div>
                          {!isCollapsed && (
                            isSubmenuOpen ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )
                          )}
                        </button>
                        {!isCollapsed && isSubmenuOpen && (
                          <ul className="ml-6 mt-1 space-y-1">
                            {item.submenu.map((subItem) => {
                              const isSubActive = pathname === subItem.href;
                              return (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    onClick={handleLinkClick}
                                    className={cn(
                                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                      isSubActive
                                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    )}
                                  >
                                    <span>{subItem.name}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={handleLinkClick}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isCollapsed && "justify-center"
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && <span>{item.name}</span>}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;