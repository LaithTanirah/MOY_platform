import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";

interface UserInfoCardProps {
  name: string;
}

export default function UserInfoCard({ name }: UserInfoCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      className="group relative overflow-hidden rounded-2xl
      border border-blue-400/70 dark:border-blue-300/40
      bg-gradient-to-br
      from-blue-200/90 via-white/90 to-blue-300/70
      dark:from-blue-300/20 dark:via-slate-900/70 dark:to-blue-200/20
      backdrop-blur-xl
      shadow-xl hover:shadow-2xl
      transition-all duration-500 ease-out
      hover:-translate-y-1.5 hover:border-primary/40"
    >
      <CardContent className="relative px-6 py-2">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full 
              bg-white/90 dark:bg-slate-800/80
              backdrop-blur-md 
              flex items-center justify-center 
              ring-4 ring-primary/20 
              shadow-md"
            >
              <User className="h-8 w-8 text-primary" />
            </div>

            <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-primary/80">
              {t("reservation.sections.personal")}
            </p>

            <h3 className="text-xl font-bold text-foreground tracking-wide">
              {t("shared.beneficiaryName")}
            </h3>

            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
