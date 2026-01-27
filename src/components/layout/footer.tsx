import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <div className="h-20 bg-slate-100 dark:bg-slate-800 py-6 flex-1">
      <div className="flex justify-between px-9">
        <div className="flex text-muted-foreground gap-1">
          <p>{t("footer.rights")}</p>
          <span>
            <span className="text-xs text-muted-foreground relative -top-2">
              ©
            </span>
            {new Date().getFullYear()}
          </span>
          <p>{t("appName")}</p>
        </div>
      </div>
    </div>
  );
}
