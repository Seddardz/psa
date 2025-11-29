// src/app/dashboard/[username]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  TrendingUp,
  Users,
  Activity,
  LogOut,
  Settings,
  Bell,
  Menu,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderKanban,
  Target,
  Calendar,
} from "lucide-react";

export default function UserDashboard() {
  const router = useRouter();
  const params = useParams();
  const username = params.username as string;
  const [userData, setUserData] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userDataMap: any = {
      user1: {
        name: "Marie Dubois",
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
        name: "Thomas Martin",
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
        name: "Sophie Laurent",
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
        name: "Lucas Bernard",
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
        name: "Emma Petit",
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

  const SidebarContent = () => (
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
        {[
          { icon: BarChart3, label: "Tableau de bord", active: true },
          { icon: FolderKanban, label: "Projets" },
          { icon: Target, label: "Objectifs" },
          { icon: Calendar, label: "Calendrier" },
          { icon: Users, label: "Équipe" },
          { icon: Settings, label: "Paramètres" },
        ].map((item, i) => (
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

      <div className="p-4">
        <Card className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950 dark:to-violet-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-2">🎉 Nouveau !</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Découvrez nos nouvelles fonctionnalités d'analyse
            </p>
            <Button size="sm" variant="outline" className="w-full h-8 text-xs">
              En savoir plus
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const completionRate = Math.round(
    (userData.stats.completed / userData.stats.tasks) * 100
  );

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
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600"></span>
              </Button>

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
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Bonjour, {userData.name.split(" ")[0]} 👋
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {userData.role} • Voici un aperçu de votre activité
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {[
              {
                title: "Projets actifs",
                value: userData.stats.projects,
                icon: FolderKanban,
                color: "from-blue-500 to-cyan-500",
                trend: "+12%",
              },
              {
                title: "Total des tâches",
                value: userData.stats.tasks,
                icon: Activity,
                color: "from-violet-500 to-purple-500",
                trend: "+8%",
              },
              {
                title: "Tâches terminées",
                value: userData.stats.completed,
                icon: CheckCircle2,
                color: "from-green-500 to-emerald-500",
                trend: "+15%",
              },
              {
                title: "En cours",
                value: userData.stats.inProgress,
                icon: Clock,
                color: "from-orange-500 to-red-500",
                trend: "-3%",
              },
            ].map((stat, i) => (
              <Card
                key={i}
                className="relative overflow-hidden group hover:shadow-lg transition-all"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {stat.title}
                    </CardTitle>
                    <div
                      className={`h-10 w-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="text-xs">
                      {stat.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Progress Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Performance
                </CardTitle>
                <CardDescription>Votre progression ce mois-ci</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Taux de complétion
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        {completionRate}%
                      </span>
                    </div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-violet-600 rounded-full transition-all duration-500"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-900 dark:text-green-100">
                          Terminées
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {userData.stats.completed}
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="text-xs font-medium text-orange-900 dark:text-orange-100">
                          En cours
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                        {userData.stats.inProgress}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-violet-600" />
                  Activité récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity: any, i: number) => (
                    <div key={i} className="flex gap-3">
                      <div
                        className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          activity.type === "success"
                            ? "bg-green-100 dark:bg-green-950"
                            : activity.type === "warning"
                            ? "bg-orange-100 dark:bg-orange-950"
                            : "bg-blue-100 dark:bg-blue-950"
                        }`}
                      >
                        {activity.type === "success" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : activity.type === "warning" ? (
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        ) : (
                          <Activity className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
