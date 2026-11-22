// Standalone, browser-only calculations. Amounts are integer cents; percentages are display values.
function utilizationPercent(balanceCents, limitCents) {
  return limitCents > 0 ? balanceCents / limitCents * 100 : null;
}

function utilizationSummary(accounts) {
  const perAccount = accounts.map(account => utilizationPercent(account.balanceCents, account.limitCents));
  const included = accounts.filter(account => account.limitCents > 0);
  const totalLimitCents = included.reduce((sum, account) => sum + account.limitCents, 0);
  const totalBalanceCents = included.reduce((sum, account) => sum + account.balanceCents, 0);
  return {
    perAccount,
    totalLimitCents,
    totalBalanceCents,
    overallPercent: utilizationPercent(totalBalanceCents, totalLimitCents),
    excludedCount: accounts.length - included.length
  };
}

function paydownPlan(accounts, targetPercent) {
  if (!Number.isFinite(targetPercent) || targetPercent < 0 || targetPercent > 100) {
    throw new RangeError('Target must be between 0% and 100%.');
  }
  const summary = utilizationSummary(accounts);
  if (!summary.totalLimitCents) return { amountCents: 0, paymentsCents: accounts.map(() => 0), summary };
  // Round the permitted balance DOWN to cents so the result never exceeds the target.
  const allowedCents = Math.floor(summary.totalLimitCents * targetPercent / 100 + 1e-9);
  let remaining = Math.max(0, summary.totalBalanceCents - allowedCents);
  const paymentsCents = accounts.map(() => 0);
  const order = accounts.map((account, index) => ({ account, index }))
    .filter(({ account }) => account.limitCents > 0 && account.balanceCents > 0)
    .sort((a, b) => utilizationPercent(b.account.balanceCents, b.account.limitCents) - utilizationPercent(a.account.balanceCents, a.account.limitCents) || a.index - b.index);
  for (const { account, index } of order) {
    paymentsCents[index] = Math.min(remaining, account.balanceCents);
    remaining -= paymentsCents[index];
    if (!remaining) break;
  }
  return { amountCents: summary.totalBalanceCents - allowedCents > 0 ? summary.totalBalanceCents - allowedCents : 0, paymentsCents, summary };
}

function whatIfPayment(accounts, paymentCents) {
  if (!Number.isSafeInteger(paymentCents) || paymentCents < 0) throw new RangeError('Payment must be a nonnegative amount in cents.');
  const total = utilizationSummary(accounts).totalBalanceCents;
  // Use the same highest-utilization-first allocation as the target planner.
  const ordered = accounts.map((account, index) => ({ account, index }))
    .filter(({ account }) => account.limitCents > 0 && account.balanceCents > 0)
    .sort((a, b) => utilizationPercent(b.account.balanceCents, b.account.limitCents) - utilizationPercent(a.account.balanceCents, a.account.limitCents) || a.index - b.index);
  const paymentsCents = accounts.map(() => 0);
  let remaining = Math.min(paymentCents, total);
  for (const { account, index } of ordered) {
    paymentsCents[index] = Math.min(remaining, account.balanceCents);
    remaining -= paymentsCents[index];
    if (!remaining) break;
  }
  const updated = accounts.map((account, index) => ({ ...account, balanceCents: account.balanceCents - paymentsCents[index] }));
  return { paymentsCents, summary: utilizationSummary(updated), appliedCents: Math.min(paymentCents, total) };
}
