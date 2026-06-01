import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 50, fontSize: 10, fontFamily: "Helvetica" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  topicText: { fontSize: 18, fontWeight: "bold" },
  badgeAndDate: { alignItems: "flex-end" },
  badge: {
    backgroundColor: "#000",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 9,
    borderRadius: 16,
  },
  submittedText: { fontSize: 9, color: "#666", marginTop: 4 },
  hr: { borderBottomWidth: 1, borderBottomColor: "#ddd", marginVertical: 10 },
  questionBlock: { marginBottom: 14 },
  questionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  questionNumber: { fontSize: 11, fontWeight: "bold", marginRight: 4 },
  questionText: { fontSize: 11, fontWeight: "bold", flex: 1 },
  optionsList: { flexDirection: "column", gap: 2 },
  optionRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    maxWidth: "70%",
    borderRadius: 8,
  },
  optionCorrect: { backgroundColor: "#22c55e", color: "#fff", borderColor: "#22c55e" },
  optionWrong: { backgroundColor: "#ef4444", color: "#fff", borderColor: "#ef4444" },
  optionNormal: { backgroundColor: "#f9fafb" },
  optionText: { fontSize: 10 },
  explanationBlock: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 8,
    fontSize: 10,
    marginTop: 6,
    maxWidth: "70%",
    borderRadius: 8,
  },
  explanationText: { color: "#fff" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  summaryText: { fontSize: 11, fontWeight: "bold" },
});

const alphaOptions = ["(a)", "(b)", "(c)", "(d)"];

const QuizPDFDocument = ({ quizData }: { quizData: QuizAttempt }) => {
  const companion = Array.isArray(quizData.companions)
    ? quizData.companions[0]
    : quizData.companions;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <Text style={styles.topicText}>Topic: {companion.topic}</Text>
          <View style={styles.badgeAndDate}>
            <Text style={styles.badge}>{companion.subject}</Text>
            <Text style={styles.submittedText}>
              Submitted: {new Date(quizData.created_at).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.hr} />

        {quizData.questions.map((q, idx) => (
          <View key={idx} style={styles.questionBlock}>
            <View style={styles.questionHeader}>
              <Text style={styles.questionNumber}>{idx + 1}.</Text>
              <Text style={styles.questionText}>{q.question}</Text>
            </View>
            <View style={styles.optionsList}>
              {q.options.map((opt, optidx) => {
                let optionStyle = styles.optionNormal;
                if (optidx === q.correctAnswer) {
                  optionStyle = { ...optionStyle, ...styles.optionCorrect };
                } else if (optidx === q.my_answer && q.my_answer !== q.correctAnswer) {
                  optionStyle = { ...optionStyle, ...styles.optionWrong };
                }
                return (
                  <View key={optidx} style={[styles.optionRow, optionStyle]}>
                    <Text style={styles.optionText}>
                      {alphaOptions[optidx]} {opt}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.explanationBlock}>
              <Text style={styles.explanationText}>Explanation: {q.explanation}</Text>
            </View>
          </View>
        ))}

        <View style={styles.hr} />

        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>
            Correct Answers: {quizData.correct_answers}
          </Text>
          <Text style={styles.summaryText}>
            Percentage Obtained: {quizData.score}%
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default QuizPDFDocument;
