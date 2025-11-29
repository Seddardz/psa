// src/app/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg dark:bg-slate-950/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                DashHub
              </span>
            </div>

            {/* Desktop & Mobile Navigation - Only "Commencer" button */}
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90">
                Commencer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <Badge
            className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
            variant="secondary"
          >
            ✨ Nouveau : Dashboard personnalisé pour chaque utilisateur
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-violet-900 dark:from-slate-100 dark:via-blue-100 dark:to-violet-100 bg-clip-text text-transparent">
            Gérez vos projets avec élégance
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
            Une plateforme intuitive et sécurisée pour gérer vos équipes, suivre
            vos projets et analyser vos performances en temps réel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 h-12 px-8 text-base"
              >
                Démarrer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
