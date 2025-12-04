"use client"; // for Next.js App Router (if using)
import { sendGTMEvent } from "@next/third-parties/google";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Clarity from "@microsoft/clarity";
import { sendClarityEvent, sendClarityTag } from "../utils/clarityHelper";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    watch,
    handleSubmit,
    formState: { isDirty, isSubmitted },
  } = useForm<any>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      altEmail: "",
      phone: "",
      address: "",
    },
  });
  const formData = watch();

  const nextStepAnalytics = (nextStep: number) => {
    sendGTMEvent({
      event: "form_step",
      step_number: nextStep,
      form_name: "meet-us",
    });
    sendClarityTag("form_step", ["meet-us", `${nextStep}`]);
    sendClarityEvent(`meet_us_form_step_${nextStep}`);
  };

  const nextStep = () => {
    setStep((prev) => {
      const nextStep = prev + 1;
      nextStepAnalytics(nextStep);
      return nextStep;
    });
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (isDirty) {
      sendGTMEvent({
        event: "form_start",
        form_name: "meet-us",
        step_number: 1,
      });
      sendClarityTag("form_start", ["meet-us", "1"]);
      sendClarityEvent("meet_us_form_start");
    }
  }, [isDirty]);

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    sendGTMEvent({
      event: "form_submit",
      form_name: "meet-us",
      step_number: step,
    });
    sendClarityTag("form_submit", ["meet-us", `${step}`]);
    sendClarityEvent("meet_us_form_submit");
    alert("Form submitted! 🎉\n" + JSON.stringify(data, null, 2));
  };

  const getDisbaledValue = () => {
    if (step === 1) {
      return !(formData?.firstName && formData?.lastName);
    } else if (step === 2) {
      return !(formData?.email && formData?.altEmail);
    } else if (step === 3) {
      return !(formData?.phone && formData?.address);
    }
    return false;
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Step {step} of 4</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              required
              className="border p-2 rounded text-black"
            />
            <label>Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              required
              className="border p-2 rounded text-black"
            />
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col">
            <label>Email Address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              required
              className="border p-2 rounded text-black"
            />
            <label>Alternative Email</label>
            <input
              type="email"
              {...register("altEmail", { required: true })}
              className="border p-2 rounded text-black"
            />
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col">
            <label>Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: true })}
              className="border p-2 rounded text-black"
            />
            <label>Address</label>
            <textarea
              {...register("address", { required: true })}
              required
              className="border p-2 rounded text-black"
            />
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col">
            <h3>Review Your Details</h3>
            <p>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Alt Email:</strong> {formData.altEmail}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Address:</strong> {formData.address}
            </p>
          </div>
        )}

        <div style={{ display: "flex", marginTop: "20px", gap: "10px" }}>
          {step > 1 && (
            <button
              className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
              type="button"
              onClick={prevStep}
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button
              className={`${
                getDisbaledValue()
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              } p-2 rounded text-white`}
              type="button"
              onClick={nextStep}
              disabled={getDisbaledValue()}
            >
              Next
            </button>
          )}
          {step === 4 && (
            <button
              className="bg-green-600 hover:bg-green-700 p-2 rounded text-white"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
