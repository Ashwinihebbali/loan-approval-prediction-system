import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoanForm } from "@/components/LoanForm";
import { LoanResult } from "@/components/LoanResult";
import {
  FEATURE_LABELS,
  featureImportances,
  predictLoan,
  type LoanInput,
  type LoanPrediction,
} from "@/lib/loan-predict";

const DEFAULTS: LoanInput = {
  no_of_dependents: 2,
  income_annum: 5000000,
  loan_amount: 15000000,
  loan_term: 10,
  cibil_score: 600,
  residential_assets_value: 5600000,
  commercial_assets_value: 3700000,
  luxury_assets_value: 14600000,
  bank_asset_value: 4600000,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Loan Approval Predictor — Instant Eligibility Decisions" },
      {
        name: "description",
        content:
          "Check loan eligibility instantly with a decision-tree model trained on 4,269 applications (97% accuracy). See the approval decision and the reasons behind it.",
      },
      { property: "og:title", content: "Loan Approval Predictor — Instant Eligibility Decisions" },
      {
        property: "og:description",
        content:
          "Enter credit score, income, loan amount and assets to get an approved or rejected decision with an explained decision path.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [values, setValues] = useState<LoanInput>(DEFAULTS);
  const [result, setResult] = useState<LoanPrediction | null>(null);

  const topFactors = Object.entries(featureImportances)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-background">
      <header
        className="relative overflow-hidden px-6 py-16 text-primary-foreground sm:py-24"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-accent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Credit decisioning
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Loan Approval Prediction System
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed opacity-90 sm:text-lg">
            A decision-tree classifier trained on 4,269 real applications decides whether an
            applicant should be granted a loan — with 97% test accuracy and a fully explained
            decision path.
          </p>
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {[
              ["97%", "Test accuracy"],
              ["96.7%", "5-fold CV accuracy"],
              ["9", "Input criteria"],
            ].map(([v, k]) => (
              <div
                key={k}
                className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-3 backdrop-blur"
              >
                <dt className="text-2xl font-bold sm:text-3xl">{v}</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-wide opacity-80">{k}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-6 px-6 py-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <Card className="panel rise-in border-border/70">
          <CardContent className="pt-6">
            <h2 className="mb-1 text-xl font-semibold tracking-tight">Applicant details</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Nine criteria, evaluated locally in your browser by the trained model.
            </p>
            <LoanForm
              values={values}
              onChange={setValues}
              onSubmit={() => setResult(predictLoan(values))}
              onReset={() => {
                setValues(DEFAULTS);
                setResult(null);
              }}
            />
          </CardContent>
        </Card>

        <div className="space-y-6 lg:sticky lg:top-6">
          <Card className="panel rise-in border-border/70">
            <CardContent className="pt-6">
              <h2 className="mb-6 text-xl font-semibold tracking-tight">Prediction</h2>
              {result ? (
                <LoanResult result={result} />
              ) : (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
                  <div className="mx-auto mb-3 h-10 w-10 rounded-full border border-border bg-card" />
                  <p className="text-sm text-muted-foreground">
                    Fill in the applicant details and run the check to see the model's decision and
                    the criteria that drove it.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/70">
            <CardContent className="pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                What the model weighs most
              </h2>
              <ul className="mt-4 space-y-3">
                {topFactors.map(([feature, weight]) => (
                  <li key={feature}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span>{FEATURE_LABELS[feature as keyof LoanInput]}</span>
                      <span className="font-mono text-muted-foreground">
                        {(weight * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full transition-[width] duration-700"
                        style={{
                          width: `${Math.max(weight * 100, 1)}%`,
                          background: "var(--gradient-accent)",
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="mt-6 border-t border-border bg-card/60 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
          <p className="text-sm">
            <span className="text-muted-foreground">Developed by </span>
            <span className="font-semibold text-primary">Ashwini Vishal</span>
          </p>
          <p className="max-w-xl text-xs text-muted-foreground">
            Predictions come from the exported decision tree (max depth 5) from the training
            notebook and run entirely in the browser. For guidance only — not a lending decision.
          </p>
        </div>
      </footer>
    </main>
  );
}
