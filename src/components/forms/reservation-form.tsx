// src/components/reservation-form.tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Users, Building2, ClipboardList } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Option = { value: string; label: string };
type FacilityType = "" | "room" | "tent" | "suite" | "chalet";

function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <select
      id={id}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "border-input dark:bg-input/30 h-9 w-full rounded-md border bg-transparent px-3 text-base shadow-xs outline-none transition-[color,box-shadow] md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      {placeholder ? (
        <option value="" className="dark:text-black">
          {placeholder}
        </option>
      ) : null}
      {options.map((o) => (
        <option key={o.value} value={o.value} className="dark:text-black">
          {o.label}
        </option>
      ))}
    </select>
  );
}

function daysBetween(from: string, to: string) {
  if (!from || !to) return 0;
  const d1 = new Date(from);
  const d2 = new Date(to);
  const diff = d2.getTime() - d1.getTime();
  if (Number.isNaN(diff)) return 0;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
}

export default function ReservationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation();

  const [serviceType, setServiceType] = useState("");
  const [house, setHouse] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [beneficiaries, setBeneficiaries] = useState("1");

  const [facility, setFacility] = useState<FacilityType>("");
  const [availableCapacity] = useState("15");

  const [requiredRooms, setRequiredRooms] = useState("1");
  const [requiredTents, setRequiredTents] = useState("1");
  const [requiredSuites, setRequiredSuites] = useState("1");
  const [requiredChalets, setRequiredChalets] = useState("1");

  const [activityPlan, setActivityPlan] = useState("");
  const [groupLeader, setGroupLeader] = useState("");
  const [participantsInfo, setParticipantsInfo] = useState("");

  const showFacilitySection = serviceType === "accommodation";
  const showActivitySection = serviceType === "activity";
  const showCapacity = showFacilitySection && facility !== "";

  const serviceOptions: Option[] = useMemo(
    () => [
      {
        value: "accommodation",
        label: t("reservation.options.service.accommodation"),
      },
      { value: "activity", label: t("reservation.options.service.activity") },
    ],
    [t],
  );

  const houseOptions: Option[] = useMemo(
    () => [
      {
        value: "petra-wadi-musa",
        label: t("reservation.options.house.petraWadiMusa"),
      },
      { value: "ajloun", label: t("reservation.options.house.ajloun") },
      { value: "aqaba", label: t("reservation.options.house.aqaba") },
    ],
    [t],
  );

  const facilityOptions: Option[] = useMemo(
    () => [
      { value: "room", label: t("reservation.options.facility.room") },
      { value: "chalet", label: t("reservation.options.facility.chalet") },
      { value: "tent", label: t("reservation.options.facility.tent") },
      { value: "suite", label: t("reservation.options.facility.suite") },
    ],
    [t],
  );

  const durationDays = useMemo(
    () => daysBetween(fromDate, toDate),
    [fromDate, toDate],
  );

  const activeCountKey = useMemo(() => {
    if (!showFacilitySection) return "";
    if (facility === "room") return "room";
    if (facility === "tent") return "tent";
    if (facility === "suite") return "suite";
    if (facility === "chalet") return "chalet";
    return "";
  }, [facility, showFacilitySection]);

  const activeCountLabel = useMemo(() => {
    if (activeCountKey === "room") return t("reservation.fields.requiredRooms");
    if (activeCountKey === "tent") return t("reservation.fields.requiredTents");
    if (activeCountKey === "suite")
      return t("reservation.fields.requiredSuites");
    if (activeCountKey === "chalet")
      return t("reservation.fields.requiredChalets");
    return "";
  }, [activeCountKey, t]);

  const activeCountValue = useMemo(() => {
    if (activeCountKey === "room") return requiredRooms;
    if (activeCountKey === "tent") return requiredTents;
    if (activeCountKey === "suite") return requiredSuites;
    if (activeCountKey === "chalet") return requiredChalets;
    return "";
  }, [
    activeCountKey,
    requiredRooms,
    requiredTents,
    requiredSuites,
    requiredChalets,
  ]);

  function setActiveCountValue(v: string) {
    if (activeCountKey === "room") setRequiredRooms(v);
    else if (activeCountKey === "tent") setRequiredTents(v);
    else if (activeCountKey === "suite") setRequiredSuites(v);
    else if (activeCountKey === "chalet") setRequiredChalets(v);
  }

  function resetFacilityCounts() {
    setRequiredRooms("1");
    setRequiredTents("1");
    setRequiredSuites("1");
    setRequiredChalets("1");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div
      className={cn("rounded-2xl shadow-lg overflow-hidden", className)}
      {...props}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between bg-primary text-white px-8 pt-6 pb-4">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-white/20">
            <ClipboardList className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t("reservation.title")}</h1>
            <p className="mt-1 text-sm opacity-90">
              {t("reservation.subtitle")}
            </p>
          </div>
        </div>

        <div className="flex size-12 items-center justify-center rounded-full bg-white/20">
          <Building2 className="h-6 w-6" />
        </div>
      </div>

      {/* FORM */}
      <Card className="rounded-none shadow-none">
        <CardContent className="p-6">
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">
                    {t("reservation.sections.booking")}
                  </h2>
                </div>
              </div>

              {/* First row */}
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Youth House */}
                <Field>
                  <FieldLabel htmlFor="house">
                    {t("reservation.fields.youthHouse")}
                  </FieldLabel>
                  <Select
                    id="house"
                    value={house}
                    onChange={setHouse}
                    options={houseOptions}
                    placeholder={t("reservation.placeholders.select")}
                  />
                </Field>

                {/* Service Type */}
                <Field>
                  <FieldLabel htmlFor="serviceType">
                    {t("reservation.fields.serviceType")}
                  </FieldLabel>
                  <Select
                    id="serviceType"
                    value={serviceType}
                    onChange={(v) => {
                      setServiceType(v);
                      if (v !== "accommodation") {
                        setFacility("");
                        resetFacilityCounts();
                      }
                    }}
                    options={serviceOptions}
                    placeholder={t("reservation.placeholders.select")}
                  />
                </Field>
              </FieldGroup>

              {/* Second row */}
              <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="fromDate">
                    {t("reservation.fields.fromDate")}
                  </FieldLabel>
                  <Input
                    id="fromDate"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="toDate">
                    {t("reservation.fields.toDate")}
                  </FieldLabel>
                  <Input
                    id="toDate"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="duration">
                    {t("reservation.fields.durationDays")}
                  </FieldLabel>
                  <Input
                    id="duration"
                    value={String(durationDays)}
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </Field>
              </FieldGroup>

              {/* Third row */}
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="beneficiaries">
                    {t("reservation.fields.beneficiaries")}
                  </FieldLabel>
                  <Input
                    id="beneficiaries"
                    type="number"
                    min={1}
                    value={beneficiaries}
                    onChange={(e) => setBeneficiaries(e.target.value)}
                    required
                  />
                </Field>
              </FieldGroup>

              <hr className="border-border" />

              {/* SECTION: Facility */}
              {showFacilitySection && (
                <>
                  <hr />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h2 className="text-lg font-semibold">
                        {t("reservation.sections.facility")}
                      </h2>
                    </div>
                  </div>

                  <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="facility">
                        {t("reservation.fields.facilityType")}
                      </FieldLabel>
                      <Select
                        id="facility"
                        value={facility}
                        onChange={(v) => {
                          const fv = v as FacilityType;
                          setFacility(fv);
                          if (!fv) resetFacilityCounts();
                        }}
                        options={facilityOptions}
                        placeholder={t("reservation.placeholders.select")}
                      />
                    </Field>

                    {showCapacity && (
                      <Field>
                        <FieldLabel htmlFor="availableCapacity">
                          {t("reservation.fields.availableCapacity")}
                        </FieldLabel>
                        <Input
                          id="availableCapacity"
                          value={availableCapacity}
                          readOnly
                          className="bg-muted cursor-not-allowed"
                        />
                      </Field>
                    )}
                  </FieldGroup>

                  {activeCountKey !== "" && (
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="requiredCount">
                          {activeCountLabel}
                        </FieldLabel>
                        <Input
                          id="requiredCount"
                          type="number"
                          min={1}
                          value={activeCountValue}
                          onChange={(e) => setActiveCountValue(e.target.value)}
                          required
                        />
                      </Field>
                    </FieldGroup>
                  )}
                </>
              )}

              {/* SECTION: Activity */}
              {showActivitySection && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-primary" />
                      <h2 className="text-lg font-semibold">
                        {t("reservation.sections.activity")}
                      </h2>
                    </div>
                  </div>

                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="activityPlan">
                        {t("reservation.fields.activityPlan")}
                      </FieldLabel>
                      <Textarea
                        id="activityPlan"
                        placeholder={t("reservation.placeholders.activityPlan")}
                        value={activityPlan}
                        onChange={(e) => setActivityPlan(e.target.value)}
                      />
                    </Field>
                  </FieldGroup>

                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="groupLeader">
                        {t("reservation.fields.groupLeader")}
                      </FieldLabel>
                      <Input
                        id="groupLeader"
                        placeholder={t("reservation.placeholders.groupLeader")}
                        value={groupLeader}
                        onChange={(e) => setGroupLeader(e.target.value)}
                        required
                      />
                    </Field>
                  </FieldGroup>

                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="participantsInfo">
                        {t("reservation.fields.participantsInfo")}
                      </FieldLabel>
                      <Textarea
                        id="participantsInfo"
                        placeholder={t(
                          "reservation.placeholders.participantsInfo",
                        )}
                        value={participantsInfo}
                        onChange={(e) => setParticipantsInfo(e.target.value)}
                      />
                    </Field>
                  </FieldGroup>
                </>
              )}
            </FieldGroup>
          </form>
        </CardContent>
        {/* Buttons */}
        <CardFooter className="flex flex-wrap items-center gap-5">
          <Button type="submit" className="flex-1 py-6 text-base">
            {t("reservation.actions.submit")}
          </Button>
          <Button type="button" variant="secondary" className="px-10">
            {t("common.cancel")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
