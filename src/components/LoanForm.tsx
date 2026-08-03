import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { LoanInput } from "@/lib/loan-predict";

type Props = {
  values: LoanInput;
  onChange: (values: LoanInput) => void;
  onSubmit: () => void;
  onReset: () => void;
};

const money = (n: number) => "₹" + n.toLocaleString("en-IN");

function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  step = 100000,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function LoanForm({ values, onChange, onSubmit, onReset }: Props) {
  const set = <K extends keyof LoanInput>(key: K, v: number) => onChange({ ...values, [key]: v });

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Credit profile
        </h3>
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <Label htmlFor="cibil">CIBIL score</Label>
            <span className="font-mono text-lg font-semibold text-primary">{values.cibil_score}</span>
          </div>
          <Slider
            id="cibil"
            min={300}
            max={900}
            step={1}
            value={[values.cibil_score]}
            onValueChange={([v]) => set("cibil_score", v ?? 300)}
          />
          <p className="text-xs text-muted-foreground">
            The strongest driver in the model (88% of decision weight).
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <Label htmlFor="term">Loan term</Label>
            <span className="font-mono text-sm font-semibold text-primary">
              {values.loan_term} years
            </span>
          </div>
          <Slider
            id="term"
            min={2}
            max={20}
            step={2}
            value={[values.loan_term]}
            onValueChange={([v]) => set("loan_term", v ?? 2)}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <Label htmlFor="dep">Dependents</Label>
            <span className="font-mono text-sm font-semibold text-primary">
              {values.no_of_dependents}
            </span>
          </div>
          <Slider
            id="dep"
            min={0}
            max={5}
            step={1}
            value={[values.no_of_dependents]}
            onValueChange={([v]) => set("no_of_dependents", v ?? 0)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Loan &amp; income
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="income"
            label="Annual income"
            hint={money(values.income_annum)}
            value={values.income_annum}
            onChange={(v) => set("income_annum", v)}
          />
          <NumberField
            id="amount"
            label="Loan amount requested"
            hint={money(values.loan_amount)}
            value={values.loan_amount}
            onChange={(v) => set("loan_amount", v)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Assets
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            id="res"
            label="Residential assets"
            value={values.residential_assets_value}
            onChange={(v) => set("residential_assets_value", v)}
          />
          <NumberField
            id="com"
            label="Commercial assets"
            value={values.commercial_assets_value}
            onChange={(v) => set("commercial_assets_value", v)}
          />
          <NumberField
            id="lux"
            label="Luxury assets"
            value={values.luxury_assets_value}
            onChange={(v) => set("luxury_assets_value", v)}
          />
          <NumberField
            id="bank"
            label="Bank assets"
            value={values.bank_asset_value}
            onChange={(v) => set("bank_asset_value", v)}
          />
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg">
          Check eligibility
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}