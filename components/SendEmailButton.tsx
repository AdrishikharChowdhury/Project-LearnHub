"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { sendReportEmail } from "@/lib/actions/report.action";
import { Mail } from "lucide-react";

interface SendEmailButtonProps {
  year: number;
  month: number;
  label: string;
}

const SendEmailButton = ({ year, month, label }: SendEmailButtonProps) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { user } = useUser();

  const handleSend = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    setSending(true);
    try {
      await sendReportEmail(user.primaryEmailAddress.emailAddress, year, month);
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error(err);
      alert("Failed to send email. Check your Resend API key.");
    } finally {
      setSending(false);
    }
  };

  return (
    <button
      onClick={handleSend}
      disabled={sending || sent}
      className="btn-primary"
    >
      <Mail size={18} />
      {sending ? "Sending..." : sent ? "Sent!" : "Send to Email"}
    </button>
  );
};

export default SendEmailButton;
