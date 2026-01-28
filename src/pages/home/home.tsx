import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="h-full bg-slate-100 dark:bg-slate-900">{t("nav.home")}</div>
  );
}
