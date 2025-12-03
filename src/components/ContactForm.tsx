"use client";
import { useEffect, useState } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";
import Clarity from "@microsoft/clarity";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isDisabled = !form.name || !form.email || !form.message;

  const handleChange = (e: any) => {
    if (isDirty === false) {
      setIsDirty(true);
    }
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendGTMEvent({ event: "form_submit", form_name: "contact-us" });
    window?.clarity("event", "");
    Clarity.setTag("form_submit", "contact_us");
    setIsSubmitted(true);
    console.log("Form submitted:", form);
  };

  useEffect(() => {
    if (isDirty) {
      sendGTMEvent({ event: "form_start", form_name: "contact-us" });
      Clarity.setTag("form_start", "contact_us");
    }

    return () => {
      if (isDirty && !isSubmitted) {
        sendGTMEvent({ event: "form_abandon", form_name: "contact-us" });
        Clarity.setTag("form_abandon", "contact_us");
      }
    };
  }, [isDirty, isSubmitted]);
  console.log("here::", Clarity);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full max-w-sm"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded text-black"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 rounded text-black"
      />

      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        className="border p-2 rounded text-black"
        rows={4}
      />

      <button
        type="submit"
        disabled={isDisabled}
        className={`p-2 rounded text-white ${
          isDisabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Submit
      </button>
      <Link href="/">Home</Link>
    </form>
  );
}
