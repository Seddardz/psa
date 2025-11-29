// src/app/dashboard/[username]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BarChart3,
  LogOut,
  Settings,
  Menu,
  Sparkles,
  FolderKanban,
  Target,
  Calendar,
  LucideIcon,
} from "lucide-react";

// Types pour les données utilisateur
interface RecentActivity {
  title: string;
  time: string;
  type: "success" | "info" | "warning";
}

interface UserStats {
  projects: number;
  tasks: number;
  completed: number;
  inProgress: number;
}

interface UserData {
  name: string;
  role: string;
  stats: UserStats;
  recentActivity: RecentActivity[];
}

interface UserDataMap {
  [key: string]: UserData;
}

interface NavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

export default function UserDashboard() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userDataMap: UserDataMap = {
      user1: {
        name: "Acceuil",
        role: "Chef de Projet",
        stats: {
          projects: 12,
          tasks: 48,
          completed: 35,
          inProgress: 13,
        },
        recentActivity: [
          { title: "Projet Alpha terminé", time: "Il y a 2h", type: "success" },
          {
            title: "Réunion d'équipe planifiée",
            time: "Il y a 5h",
            type: "info",
          },
          { title: "Nouveau membre ajouté", time: "Hier", type: "info" },
        ],
      },
      user2: {
        name: "Doctor",
        role: "Développeur Senior",
        stats: {
          projects: 8,
          tasks: 32,
          completed: 28,
          inProgress: 4,
        },
        recentActivity: [
          { title: "Code review effectué", time: "Il y a 1h", type: "success" },
          { title: "Bug critique résolu", time: "Il y a 3h", type: "success" },
          { title: "Pull request créée", time: "Il y a 6h", type: "info" },
        ],
      },
      user3: {
        name: "Cnas",
        role: "Designer UX/UI",
        stats: {
          projects: 15,
          tasks: 56,
          completed: 42,
          inProgress: 14,
        },
        recentActivity: [
          { title: "Maquette validée", time: "Il y a 30min", type: "success" },
          { title: "Prototype partagé", time: "Il y a 4h", type: "info" },
          { title: "Feedback client reçu", time: "Hier", type: "warning" },
        ],
      },
      user4: {
        name: "Labo",
        role: "Analyste Business",
        stats: {
          projects: 20,
          tasks: 64,
          completed: 51,
          inProgress: 13,
        },
        recentActivity: [
          {
            title: "Rapport mensuel généré",
            time: "Il y a 1h",
            type: "success",
          },
          { title: "KPIs mis à jour", time: "Il y a 3h", type: "info" },
          { title: "Analyse terminée", time: "Hier", type: "success" },
        ],
      },
      user5: {
        name: "Assoc",
        role: "Marketing Manager",
        stats: {
          projects: 10,
          tasks: 40,
          completed: 30,
          inProgress: 10,
        },
        recentActivity: [
          { title: "Campagne lancée", time: "Il y a 2h", type: "success" },
          { title: "Contenu publié", time: "Il y a 5h", type: "info" },
          { title: "Metrics analysées", time: "Hier", type: "info" },
        ],
      },
    };

    setUserData(userDataMap[username]);
  }, [username]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Chargement...</p>
        </div>
      </div>
    );
  }

  const SidebarContent = () => {
    const navItems: NavItem[] = [
      { icon: BarChart3, label: "Tableau de bord", active: true },
      { icon: FolderKanban, label: "Projets" },
      { icon: Target, label: "Objectifs" },
      { icon: Calendar, label: "Calendrier" },
      { icon: Settings, label: "Paramètres" },
    ];

    return (
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">DashHub</span>
          </div>
        </div>

        <Separator />

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <Separator />
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col border-r bg-white dark:bg-slate-900">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-lg dark:bg-slate-900/80">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                  <SidebarContent />
                </SheetContent>
              </Sheet>

              <div className="lg:hidden flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold">DashHub</span>
              </div>

              <div className="hidden lg:block">
                <h1 className="text-xl font-semibold">Tableau de bord</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2 sm:px-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-violet-600 text-white text-sm">
                        {userData.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium">
                      {userData.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{userData.name}</p>
                      <p className="text-xs text-slate-500">{username}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8"></main>
      </div>
    </div>
  );
}
