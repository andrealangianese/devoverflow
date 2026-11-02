"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/route";
import { SignInSchema, SignUpSchema } from "@/lib/validation";

interface AuthFormProps {
  formType: "SIGN_IN" | "SIGN_UP";
}

type AuthFormValues = z.infer<typeof SignInSchema> | z.infer<typeof SignUpSchema>;

const AuthForm = ({ formType }: AuthFormProps) => {
  const schema = formType === "SIGN_IN" ? SignInSchema : SignUpSchema;
  const form = useForm<AuthFormValues>({
    resolver: standardSchemaResolver(schema),
    defaultValues:
      formType === "SIGN_IN"
        ? { email: "", password: "" }
        : { username: "", name: "", email: "", password: "" },
  });

  const handleSubmit: SubmitHandler<AuthFormValues> = () => {
    toast.info("Email and password authentication is not configured yet", {
      description: "Please use Google or GitHub to sign in.",
    });
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";
  const fields: ("username" | "name" | "email" | "password")[] =
    formType === "SIGN_UP" ? ["username", "name", "email", "password"] : ["email", "password"];

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
      <FieldGroup>
        {fields.map((fieldName) => (
          <Controller
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="paragraph-medium text-dark400_light700">
                  {field.name === "email" ? "Email Address" : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type={field.name === "password" ? "password" : field.name === "email" ? "email" : "text"}
                  autoComplete={
                    field.name === "password"
                      ? formType === "SIGN_IN"
                        ? "current-password"
                        : "new-password"
                      : field.name === "email"
                        ? "email"
                        : "name"
                  }
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border"
                />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        ))}
      </FieldGroup>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="primary-gradient paragraph-medium rounded-2 font-inter text-light-900! min-h-12 w-full px-4 py-3"
      >
        {form.formState.isSubmitting ? (formType === "SIGN_IN" ? "Signing In..." : "Signing Up...") : buttonText}
      </Button>

      {formType === "SIGN_IN" ? (
        <p>
          Don&apos;t have an account?{" "}
          <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient">
            Sign up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient">
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
