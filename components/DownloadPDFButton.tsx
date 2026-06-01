"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import QuizPDFDocument from "./QuizPDF";

export default function DownloadPDFButton({
  quizData,
}: {
  quizData: QuizAttempt;
}) {
  return (
    <PDFDownloadLink
      document={<QuizPDFDocument quizData={quizData} />}
      fileName={`quiz-report-${quizData.companion_id}.pdf`}
    >
      {({ loading }) => (
        <button className="btn-primary" disabled={loading}>
          <Download size={18} />
          {loading ? "Generating..." : "Download PDF"}
        </button>
      )}
    </PDFDownloadLink>
  );
}
