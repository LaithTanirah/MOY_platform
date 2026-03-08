import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Briefcase, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/components/ui/file-upload";
import { z } from "zod";

const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

const fileValidation = (t: any) =>
  z
    .instanceof(File, { message: t("errors.required") })
    .refine((file) => allowedTypes.includes(file.type), {
      message: t("errors.invalidFileType", { types: "PDF, JPG, PNG" }),
    });

const formSchema = (t: any) =>
  z.object({
    investmentType: z.array(z.string()).min(1, t("errors.required")),
    investmentLocation: z
      .string()
      .min(1, t("errors.required"))
      .max(200, t("errors.max", { len: 200 })),
    investmentDuration: z.string().regex(/^\d{1,4}$/, t("errors.digitsOnly")),
    financialProposal: z.string().regex(/^\d{1,15}$/, t("errors.digitsOnly")),
    operationalPlan: fileValidation(t),
    feasibilityStudy: fileValidation(t),
    presentation: fileValidation(t),
    financialSolvency: fileValidation(t),
  });

type InvestmentFormData = z.infer<ReturnType<typeof formSchema>>;

export default function InvestmentForm({ className }: { className?: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = formSchema(t);

  const [form, setForm] = useState<Partial<InvestmentFormData>>({
    investmentType: [],
    investmentLocation: "",
    investmentDuration: "",
    financialProposal: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openTypes, setOpenTypes] = useState(false);

  function validate() {
    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 1500));

    navigate("/user/confirmation-message", {
      state: {
        descKey: "confirmationMassage.descForInvestment",
        step1Key: "confirmationMassage.step1ForInvestment",
        title: "confirmationMassage.titleForInvestment",
      },
    });

    setIsSubmitting(false);
  }

  return (
    <div
      dir={t("dir")}
      className={cn(
        "rounded-2xl shadow-xl overflow-hidden bg-background",
        className,
      )}
    >
      {/* HEADER */}
      <div className="flex items-center gap-4 bg-primary text-white px-6 py-10">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
          <Briefcase className="h-7 w-7" />
        </div>

        <div>
          <h1 className="text-xl font-bold">
            {t("reservation.investment.title")}
          </h1>
          <p className="text-sm opacity-90 mt-1">
            {t("reservation.investment.subtitle")}
          </p>
        </div>
      </div>

      <Card className="rounded-none shadow-none border-0 bg-card">
        <CardContent className="p-6 bg-muted/30">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-6">
              {/* USER CARD */}
              <Card
                className="
                            group relative overflow-hidden rounded-2xl
                            border border-border
                            bg-background/70
                            backdrop-blur-xl
                            shadow-md
                            transition-all duration-500
                            hover:-translate-y-1 hover:shadow-2xl
                          "
              >
                {/* gradient border glow */}
                <div
                  className="
                              absolute inset-0 rounded-2xl opacity-0
                              bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30
                              blur-xl transition duration-500
                              group-hover:opacity-100
                            "
                />

                {/* glass overlay */}
                <div
                  className="
                              absolute inset-0 rounded-2xl
                              bg-gradient-to-br from-transparent via-primary/5 to-transparent
                              opacity-0 group-hover:opacity-100
                              transition duration-500
                            "
                />

                <CardContent className="relative px-6 py-4">
                  <div className="flex items-center gap-6">
                    {/* avatar */}
                    <div className="relative">
                      <div
                        className="
                                    w-16 h-16 rounded-full
                                    bg-primary/10
                                    flex items-center justify-center
                                    ring-4 ring-primary/20
                                    shadow-sm
                                    transition group-hover:scale-105
                                  "
                      >
                        <User className="h-8 w-8 text-primary" />
                      </div>

                      {/* status */}
                      <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />
                    </div>

                    {/* text */}
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-widest text-primary/80">
                        {t("reservation.sections.personal")}
                      </p>

                      <h3 className="text-xl font-bold text-foreground tracking-wide">
                        {t("shared.beneficiaryName")}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        ليث احمد ابراهيم تنيره
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* DETAILS */}
              <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
                <h2 className="text-lg font-semibold mb-6">
                  {t("reservation.investment.sections.details")}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <Field>
                    <FieldLabel>
                      {t("reservation.investment.fields.investmentType")}
                      <span className="text-destructive">*</span>
                    </FieldLabel>

                    <div
                      className={cn(
                        "border rounded-xl overflow-hidden bg-background",
                        errors.investmentType && "border-red-500",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenTypes(!openTypes)}
                        className="flex items-center justify-between w-full h-9 px-3"
                      >
                        <span className="text-sm">
                          {form.investmentType?.length
                            ? `${form.investmentType.length} ${t(
                                "reservation.investment.selected",
                              )}`
                            : t("reservation.placeholders.select")}
                        </span>
                      </button>

                      <div
                        className={cn(
                          "grid grid-cols-2 gap-3 px-4 transition-all",
                          openTypes
                            ? "max-h-96 py-4 opacity-100"
                            : "max-h-0 opacity-0",
                        )}
                      >
                        {Object.entries(
                          t("reservation.investment.options.investmentType", {
                            returnObjects: true,
                          }) as Record<string, string>,
                        ).map(([key, value]) => {
                          const selected = form.investmentType?.includes(key);

                          return (
                            <label
                              key={key}
                              className={cn(
                                "flex items-center gap-2 p-2 rounded-md cursor-pointer border",
                                selected
                                  ? "bg-primary/10 border-primary"
                                  : "hover:bg-muted/70 border-transparent",
                              )}
                            >
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={(e) => {
                                  const checked = e.target.checked;

                                  setForm((prev) => {
                                    const current = prev.investmentType || [];

                                    return {
                                      ...prev,
                                      investmentType: checked
                                        ? [...current, key]
                                        : current.filter((v) => v !== key),
                                    };
                                  });
                                }}
                              />

                              <span className="text-sm">{value}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <FieldError>{errors.investmentType}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>
                      {t("reservation.investment.fields.investmentLocation")}
                    </FieldLabel>

                    <Input
                      maxLength={200}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          investmentLocation: e.target.value,
                        })
                      }
                    />

                    <FieldError>{errors.investmentLocation}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>
                      {t("reservation.investment.fields.investmentDuration")}
                    </FieldLabel>

                    <Input
                      inputMode="numeric"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          investmentDuration: e.target.value,
                        })
                      }
                    />

                    <FieldError>{errors.investmentDuration}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>
                      {t("reservation.investment.fields.financialProposal")}
                    </FieldLabel>

                    <Input
                      inputMode="numeric"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          financialProposal: e.target.value,
                        })
                      }
                    />

                    <FieldError>{errors.financialProposal}</FieldError>
                  </Field>
                </div>
              </div>

              {/* DOCUMENTS */}
              <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
                <h2 className="text-lg font-semibold mb-6">
                  {t("reservation.investment.sections.documents")}
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <FileUpload
                    id="operationalPlan"
                    label={t("reservation.investment.fields.operationalPlan")}
                    file={form.operationalPlan as File}
                    error={errors.operationalPlan}
                    onChange={(file) =>
                      setForm((prev) => ({ ...prev, operationalPlan: file }))
                    }
                  />

                  <FileUpload
                    id="feasibilityStudy"
                    label={t("reservation.investment.fields.feasibilityStudy")}
                    file={form.feasibilityStudy as File}
                    error={errors.feasibilityStudy}
                    onChange={(file) =>
                      setForm((prev) => ({ ...prev, feasibilityStudy: file }))
                    }
                  />

                  <FileUpload
                    id="presentation"
                    label={t("reservation.investment.fields.presentation")}
                    file={form.presentation as File}
                    error={errors.presentation}
                    onChange={(file) =>
                      setForm((prev) => ({ ...prev, presentation: file }))
                    }
                  />

                  <FileUpload
                    id="financialSolvency"
                    label={t("reservation.investment.fields.financialSolvency")}
                    file={form.financialSolvency as File}
                    error={errors.financialSolvency}
                    onChange={(file) =>
                      setForm((prev) => ({
                        ...prev,
                        financialSolvency: file,
                      }))
                    }
                  />
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 pt-2">
                <Button
                  type="submit"
                  className="flex-1 h-11 text-base font-semibold"
                >
                  {isSubmitting
                    ? t("reservation.actions.isSubmitting")
                    : t("reservation.actions.submit")}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  className="h-11 px-8"
                  onClick={() => navigate(-1)}
                >
                  {t("common.cancel")}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
