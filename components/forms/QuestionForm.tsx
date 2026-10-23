"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Form, useForm } from "react-hook-form";

import { AskQuestionSchema } from "@/lib/validation";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "../ui/input";
import { useRef } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = () => {};

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-10" onSubmit={form.handleSubmit(handleCreateQuestion)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
                <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
                  Question Title <span className="text-primary-500">*</span>
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                />

                <FieldDescription className="body-regular text-light-500 mt-2.5">
                  Be specific and imagine you&apos;re asking a question to another person.
                </FieldDescription>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
                <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your problem <span className="text-primary-500">*</span>
                </FieldLabel>

                <Editor value={field.value} editorRef={editorRef} fieldChange={field.onChange} />

                <FieldDescription className="body-regular text-light-500 mt-2.5">
                  Introduce the problem and expand on what you&apos;ve put in the title.
                </FieldDescription>
              </Field>
            )}
          />{" "}
          <Controller
            control={form.control}
            name="tags"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
                <FieldLabel htmlFor={field.name} className="paragraph-semibold text-dark400_light800">
                  Tags<span className="text-primary-500">*</span>
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Add tags"
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                />
                <FieldDescription className="body-regular text-light-500 mt-2.5">
                  Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.{" "}
                </FieldDescription>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" className="primary-gradient text-light-900! w-fit">
          Ask a Question
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
