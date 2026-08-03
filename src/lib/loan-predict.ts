import model from "./loan-model.json";

export type LoanInput = {
  no_of_dependents: number;
  income_annum: number;
  loan_amount: number;
  loan_term: number;
  cibil_score: number;
  residential_assets_value: number;
  commercial_assets_value: number;
  luxury_assets_value: number;
  bank_asset_value: number;
};

type Node =
  | { leaf: true; p: number; n: number }
  | { leaf: false; f: keyof LoanInput; thr: number; l: number; r: number };

export type PathStep = { feature: keyof LoanInput; threshold: number; value: number; went: "left" | "right" };

export type LoanPrediction = {
  approved: boolean;
  /** Probability of approval, 0-1 */
  confidence: number;
  samples: number;
  path: PathStep[];
};

const nodes = model.nodes as unknown as Node[];

export const featureImportances = model.importances as Record<keyof LoanInput, number>;

/**
 * Evaluates the decision tree exported from the training notebook
 * (DecisionTreeClassifier, max_depth=5 — ~97% test accuracy).
 * Leaf probability `p` is the probability of the "Rejected" class.
 */
export function predictLoan(input: LoanInput): LoanPrediction {
  let i = 0;
  const path: PathStep[] = [];

  for (let guard = 0; guard < 64; guard++) {
    const node = nodes[i];
    if (!node) break;
    if (node.leaf) {
      const rejectP = node.p;
      return {
        approved: rejectP <= 0.5,
        confidence: 1 - rejectP,
        samples: node.n,
        path,
      };
    }
    const value = input[node.f];
    const went = value <= node.thr ? "left" : "right";
    path.push({ feature: node.f, threshold: node.thr, value, went });
    i = went === "left" ? node.l : node.r;
  }

  return { approved: false, confidence: 0, samples: 0, path };
}

export const FEATURE_LABELS: Record<keyof LoanInput, string> = {
  no_of_dependents: "Dependents",
  income_annum: "Annual income",
  loan_amount: "Loan amount",
  loan_term: "Loan term (years)",
  cibil_score: "CIBIL score",
  residential_assets_value: "Residential assets",
  commercial_assets_value: "Commercial assets",
  luxury_assets_value: "Luxury assets",
  bank_asset_value: "Bank assets",
};