"use client";
import { ChangeEvent, useEffect, useRef } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { sendClarityEvent, sendClarityTag } from "@/utils/clarityHelper";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const startedFields = useRef<Set<string>>(new Set());

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    sendGTMEvent({ event: "form_submit", form_name: "contact_us" });
    sendClarityTag("form_submit", "contact_us");
    sendClarityEvent("contact_us_form_submit");
    console.log("Form submitted:", data);
  };

  useEffect(() => {
    if (isDirty) {
      sendGTMEvent({ event: "form_start", form_name: "contact_us" });
      sendClarityTag("form_start", "contact_us");
      sendClarityEvent("contact_us_form_start");
    }
  }, [isDirty]);

  const trackFieldStart = (fieldName: string, value: any) => {
    if (!startedFields.current.has(fieldName) && value && value !== "") {
      startedFields.current.add(fieldName);
      sendGTMEvent({
        event: "form_field_start",
        form_name: "contact_us",
        field_name: fieldName,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full max-w-sm"
    >
      <input
        type="text"
        placeholder="Name"
        {...register("name", {
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            trackFieldStart("name", event?.target?.value);
          },
        })}
        className="border p-2 rounded text-black"
      />

      <input
        type="email"
        {...register("email", {
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            trackFieldStart("email", event?.target?.value);
          },
        })}
        placeholder="Email"
        className="border p-2 rounded text-black"
      />

      <textarea
        placeholder="Message"
        {...register("message", {
          onChange: (event: ChangeEvent<HTMLInputElement>) => {
            trackFieldStart("message", event?.target?.value);
          },
        })}
        className="border p-2 rounded text-black"
        rows={4}
      />

      <button
        type="submit"
        className={"p-2 rounded text-white bg-blue-600 hover:bg-blue-700"}
      >
        Submit
      </button>
      <Link href="/">Home</Link>
    </form>
  );
}
