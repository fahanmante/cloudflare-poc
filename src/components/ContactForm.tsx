"use client";
import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { sendClarityEvent, sendClarityTag } from "@/utils/clarityHelper";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitted },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    sendGTMEvent({ event: "form_submit", form_name: "contact-us" });
    window?.clarity("event", "");
    sendClarityTag("form_submit", "contact_us");
    sendClarityEvent("contact_us_form_submit");
    console.log("Form submitted:", data);
  };

  useEffect(() => {
    if (isDirty) {
      sendGTMEvent({ event: "form_start", form_name: "contact-us" });
      sendClarityTag("form_start", "contact_us");
      sendClarityEvent("contact_us_form_start");
    }

    return () => {
      if (isDirty && !isSubmitted) {
        sendGTMEvent({ event: "form_abandon", form_name: "contact-us" });
        sendClarityTag("form_abandon", "contact_us");
        sendClarityEvent("contact_us_form_abandon");
      }
    };
  }, [isDirty, isSubmitted]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full max-w-sm"
    >
      <input
        type="text"
        placeholder="Name"
        {...register("name")}
        className="border p-2 rounded text-black"
      />

      <input
        type="email"
        {...register("email")}
        placeholder="Email"
        className="border p-2 rounded text-black"
      />

      <textarea
        placeholder="Message"
        {...register("message")}
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
