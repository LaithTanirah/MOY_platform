import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useTranslation } from "react-i18next";
import z from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formSchema = (t: any) =>
  z.object({
    otp: z
      .string()
      .length(6, t("errors.length", { len: 6 }))
      .regex(/^\d*$/, t("errors.digitsOnly")),
  });

export default function OTP() {
  const { t } = useTranslation();
  const schema = formSchema(t);
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const result = schema.safeParse({ otp });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");

    // call API

    navigate("/auth/login");
  };

  return (
    <Card className="w-full max-w-md shadow-lg bg-slate-100 dark:bg-slate-900">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t("otp.title")}</CardTitle>
        <CardDescription>{t("otp.description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* OTP Input */}
        <div dir="ltr" className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        {/* Verify Button */}
        <Button className="w-full" onClick={handleSubmit}>
          {t("otp.verify")}
        </Button>

        <div className="text-center text-md">{t("otp.warrant")}</div>

        {/* Resend */}
        <div className="text-center text-sm text-muted-foreground">
          <button className="text-primary hover:underline cursor-pointer">
            {t("otp.resend")}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
