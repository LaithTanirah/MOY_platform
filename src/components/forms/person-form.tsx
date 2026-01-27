import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useNavigate } from "react-router-dom";

export default function PersonForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handeleServiceBtn = () => {
    navigate("/services");
  };

  return (
    <div
      className={cn("rounded-2xl shadow-lg overflow-hidden", className)}
      {...props}
    >
      {/* HEADER */}
      <div className="flex gap-5 bg-primary text-white px-8 pt-6 pb-4">
        <div className="mx- mb-4 flex size-16 items-center justify-center rounded-full bg-white/20">
          <User className="h-10 w-10" />
        </div>

        <div className=" ">
          <h1 className="text-2xl font-bold">{t("profile.personal")}</h1>
          <p className="mt-1 text-sm opacity-90">
            {t("profile.individual.account")}
          </p>
        </div>
      </div>

      {/* FORM */}
      <Card className="rounded-none shadow-none">
        <CardContent className="p-6">
          <form>
            <FieldGroup>
              {/* first row */}
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* name */}
                <Field>
                  <FieldLabel htmlFor="name">
                    {t("profile.individual.name")}
                  </FieldLabel>
                  <Input
                    id="name"
                    value="name"
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </Field>

                {/* ID number */}
                <Field>
                  <FieldLabel htmlFor="id">
                    {t("profile.individual.idNumber")}
                  </FieldLabel>
                  <Input
                    id="id"
                    value="123"
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </Field>
              </FieldGroup>

              {/* second row */}
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* email */}
                <Field>
                  <FieldLabel htmlFor="email">
                    {t("profile.individual.email")}
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                  />
                </Field>

                {/* phone number */}
                <Field>
                  <FieldLabel htmlFor="phone">
                    {t("profile.individual.phone")}
                  </FieldLabel>
                  <Input id="phone" type="tel" placeholder="077 123 4567" />
                </Field>
              </FieldGroup>

              {/* 3rd row */}
              <FieldGroup>
                <Field orientation="horizontal">
                  <Checkbox
                    id="member-checkbox"
                    name="member"
                    checked={checked}
                    onCheckedChange={(value) => setChecked(value as boolean)}
                  />
                  <FieldLabel htmlFor="member-checkbox">
                    {t("profile.individual.membership")}
                  </FieldLabel>
                </Field>

                {/* membership number */}
                <Field>
                  <FieldLabel htmlFor="membership-number">
                    {t("profile.individual.membershipNumber")}
                  </FieldLabel>
                  {checked ? (
                    <Input
                      id="embership-number"
                      type="number"
                      value=""
                      placeholder="173543"
                      required
                    />
                  ) : (
                    <Input
                      id="embership-number"
                      readOnly
                      className="bg-muted cursor-not-allowed"
                    />
                  )}
                </Field>
              </FieldGroup>

              <hr className="border-border" />

              {/* 4th row */}
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* birth date */}
                <Field>
                  <FieldLabel htmlFor="birth">
                    {t("profile.individual.birth")}
                  </FieldLabel>
                  <Input
                    id="birth"
                    value="11/03/1995"
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </Field>

                {/* civil number */}
                <Field>
                  <FieldLabel htmlFor="civil">
                    {t("profile.individual.civil")}
                  </FieldLabel>
                  <Input
                    id="civil"
                    value="12312"
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </Field>
              </FieldGroup>

              {/* 5th row */}
              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* gender */}
                <Field>
                  <FieldLabel htmlFor="gender">
                    {t("profile.individual.gender")}
                  </FieldLabel>
                  <Input
                    id="gender"
                    value="male"
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </Field>

                {/* Social status */}
                <Field>
                  <FieldLabel htmlFor="socialStatus">
                    {t("profile.individual.socialStatus")}
                  </FieldLabel>
                  <Input
                    id="socialStatus"
                    value="single"
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </Field>
              </FieldGroup>

              {/* Residence details */}
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="ResidenceDetails">
                    {t("profile.individual.ResidenceDetails")}
                  </FieldLabel>
                  <Textarea
                    id="ResidenceDetails"
                    value=". . ."
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </Field>
              </FieldGroup>

              {/* Residence validity */}
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="residenceValidity">
                    {t("profile.individual.residenceValidity")}
                  </FieldLabel>
                  <Input
                    id="residenceValidity"
                    value="13/12/2025"
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </Field>
              </FieldGroup>

              {/* Passport details */}
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="PassportDetails">
                    {t("profile.individual.PassportDetails")}
                  </FieldLabel>
                  <Textarea
                    id="PassportDetails"
                    value=". . ."
                    readOnly
                    className="bg-muted cursor-not-allowed"
                  />
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
        {/* Buttons */}
        <CardFooter className="flex gap-5">
          <Button className="px-5 sm:px-10">
            {t("profile.individual.edit")}
          </Button>
          <Button
            className="px-5 sm:px-10 bg-green-700 hover:bg-green-600"
            onClick={handeleServiceBtn}
          >
            {t("profile.individual.service")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
