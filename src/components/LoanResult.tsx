import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FEATURE_LABELS, type LoanPrediction } from "@/lib/loan-predict";

const fmt = (feature: string, v: number) =>
  feature === "cibil_score" || feature === "loan_term" || feature === "no_of_dependents"
    ? String(v)
    : "₹" + v.toLocaleString("en-IN");

export function LoanResult({ result }: { result: LoanPrediction }) {
  const pct = Math.round((result.approved ? result.confidence : 1 - result.confidence) * 100);

  return (
    <div className="rise-in space-y-6">
      <div
        className={`flex items-center justify-between gap-4 rounded-xl border p-4 ${
          result.approved
            ? "border-success/30 bg-success/10"
            : "border-destructive/30 bg-destructive/10"
        }`}
      >
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Model decision</p>
          <p
            className={`mt-1 text-3xl font-bold tracking-tight ${
              result.approved ? "text-success" : "text-destructive"
            }`}
          >
            {result.approved ? "Approved" : "Rejected"}
          </p>
        </div>
        <Badge variant={result.approved ? "default" : "destructive"} className="shrink-0">
          {pct}% confidence
        </Badge>
      </div>

      <div className="space-y-2">
        <Progress value={pct} />
        <p className="text-xs text-muted-foreground">
          Based on {result.samples} similar applicants in the training data.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Why — decision path
        </h3>
        <ol className="space-y-2 border-l-2 border-border pl-4">
          {result.path.map((step, i) => (
            <li
              key={i}
              className="relative rounded-md border border-border bg-muted/40 px-3 py-2 text-sm before:absolute before:-left-[21px] before:top-1/2 before:h-2 before:w-2 before:-translate-y-1/2 before:rounded-full before:bg-accent"
            >
              <span className="font-medium">{FEATURE_LABELS[step.feature]}</span>{" "}
              <span className="font-mono text-muted-foreground">
                {fmt(step.feature, step.value)}
              </span>{" "}
              <span className="text-muted-foreground">
                {step.went === "left" ? "≤" : ">"} {fmt(step.feature, Math.round(step.threshold))}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}