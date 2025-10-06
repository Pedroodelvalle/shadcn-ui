"use client";
import {z} from "zod";
import {useTranslations} from "next-intl";
import {useMemo} from "react";

export function useZodErrorMap() {
  const t = useTranslations("zod");

  const errorMap = useMemo<z.ZodErrorMap>(() => {
    return (issue, ctx) => {
      switch (issue.code) {
        case z.ZodIssueCode.invalid_type:
          return {message: t("required")};
        case z.ZodIssueCode.invalid_string:
          if (issue.validation === "email") {
            return {message: t("email_invalid")};
          }
          break;
        case z.ZodIssueCode.too_small:
          if (issue.minimum && issue.type === "string") {
            return {message: t("password_min", {min: Number(issue.minimum)})};
          }
          break;
      }
      return {message: ctx.defaultError};
    };
  }, [t]);

  return errorMap;
}


