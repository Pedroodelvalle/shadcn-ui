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
  FieldSeparator,
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
  const schema = z.object({
    email: z.string().email(),
  })
  const [errors, setErrors] = useState<{
    email?: string
  }>({})
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      email: String(formData.get("email") || ""),
    }
    const parsed = schema.safeParse(data, {errorMap})
    if (!parsed.success) {
      const fieldErrors: {
        email?: string
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
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  {t("withGoogle")}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                {tc("orContinueWith")}
              </FieldSeparator>
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
      <FieldDescription className="px-6 text-center text-sm font-light">
        {t("agree")} <a href="#">{tc("terms")}</a> {" "}
        e <a href="#">{tc("privacy")}</a>.
      </FieldDescription>
    </div>
  )
}
