import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return <div className="h-full">{t("nav.home")}</div>;
}
