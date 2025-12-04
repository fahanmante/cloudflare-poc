"use client"; // for Next.js App Router (if using)
import { sendGTMEvent } from "@next/third-parties/google";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Clarity from "@microsoft/clarity";

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

  const nextStep = () => {
    sendGTMEvent({
      event: "form_step",
      step_number: step + 1,
      form_name: "meet-us",
    });
    Clarity.setTag("form_step", ["meet-us", `${step + 1}`]);
    setStep((prev) => prev + 1);
  };
  const prevStep = () => {
    sendGTMEvent({
      event: "form_step",
      step_number: step - 1,
      form_name: "meet-us",
    });
    Clarity.setTag("form_step", ["meet-us", `${step - 1}`]);
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (isDirty) {
      sendGTMEvent({
        event: "form_start",
        form_name: "meet-us",
        step_number: 1,
      });
      Clarity.setTag("form_start", ["meet-us", "1"]);
    }
  }, [isDirty]);

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    sendGTMEvent({
      event: "form_submit",
      form_name: "meet-us",
      step_number: step,
    });
    Clarity.setTag("form_submit", ["meet-us", `${step}`]);
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
