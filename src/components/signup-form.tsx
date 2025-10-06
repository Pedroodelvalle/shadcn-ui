"use client";

import {Link} from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {useTranslations} from "next-intl"
import {z} from "zod"
import {useZodErrorMap} from "@/components/zod-intl"
import {useState} from "react"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("signup")
  const tc = useTranslations("common")
  const errorMap = useZodErrorMap()
  const schema = z
    .object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: useTranslations("zod")("passwords_mismatch"),
      path: ["confirmPassword"],
    })
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      confirmPassword: String(formData.get("confirm-password") || ""),
    }
    const parsed = schema.safeParse(data, {errorMap})
    if (!parsed.success) {
      const fieldErrors: {
        name?: string
        email?: string
        password?: string
        confirmPassword?: string
      } = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof typeof fieldErrors
        fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    // submit
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("title")}</CardTitle>
          <CardDescription>
            {t("desc")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">{t("fullName")}</FieldLabel>
                <Input id="name" name="name" type="text" placeholder="John Doe" required />
                {errors.name ? (
                  <FieldDescription className="text-destructive">{errors.name}</FieldDescription>
                ) : null}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">{tc("email")}</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {errors.email ? (
                  <FieldDescription className="text-destructive">{errors.email}</FieldDescription>
                ) : null}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">{tc("password")}</FieldLabel>
                    <Input id="password" name="password" type="password" required />
                    {errors.password ? (
                      <FieldDescription className="text-destructive">{errors.password}</FieldDescription>
                    ) : null}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">{t("confirmPassword")}</FieldLabel>
                    <Input id="confirm-password" name="confirm-password" type="password" required />
                    {errors.confirmPassword ? (
                      <FieldDescription className="text-destructive">{errors.confirmPassword}</FieldDescription>
                    ) : null}
                  </Field>
                </Field>
                <FieldDescription>
                  {t("minLength")}
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">{t("cta")}</Button>
                <FieldDescription className="text-center">
                  {t("haveAccount")} {" "}
                  <Link href="/login" className="underline-offset-4 hover:underline">
                    {t("signIn")}
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        {t("agree")} <a href="#">{tc("terms")}</a> {" "}
        e <a href="#">{tc("privacy")}</a>.
      </FieldDescription>
    </div>
  )
}
