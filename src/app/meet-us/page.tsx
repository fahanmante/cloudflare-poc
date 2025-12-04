import { Metadata } from "next";
import MultiStepForm from "../../components/MultiStepForm";

export const metadata: Metadata = {
  title: "Meet Us",
};

export default function MeetUsPage() {
  return (
    <div className="flex flex-col grow gap-5 w-full h-screen items-center justify-center">
      <h1>Multi-Step Form Demo</h1>
      <MultiStepForm />
    </div>
  );
}
