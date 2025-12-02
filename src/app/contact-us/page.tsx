import ContactForm from "@/components/ContactForm";

export default function ContactUsPage() {
  return (
    <div className="flex flex-col grow gap-5 w-full h-screen items-center justify-center">
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
}
