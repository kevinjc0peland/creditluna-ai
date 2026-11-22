const main = document.querySelector('#main');
const nav = document.querySelector('#primary-nav');
const menuToggle = document.querySelector('.menu-toggle');
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const icon = (name) => {
  const icons = {
    sparkle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Zm7 13 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" fill="currentColor"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M12 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    compass: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m20.5 11.5-3 7-6 2 3-7 6-2Z" fill="currentColor"/><circle cx="16" cy="16" r="1.5" fill="currentColor"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    moon: '<svg viewBox="0 0 28 28" aria-hidden="true"><path d="M19.7 3.4a11.8 11.8 0 1 0 6.1 19.8A12.7 12.7 0 0 1 19.7 3.4Z" fill="currentColor"/></svg>'
  };
  return icons[name] || '';
};

function route() {
  const page = location.hash.replace(/^#\/?/, '') || 'home';
  document.querySelectorAll('.primary-nav a').forEach(link => link.classList.toggle('active', link.getAttribute('href')?.startsWith('#') && link.hash === `#${page}`));
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  const views = { home: renderHome, how: renderHow, tools: renderTools, utilization: renderUtilization, pricing: renderPricing, chat: renderChat, letters: renderLetters, build: renderBuild, cfpb: () => renderEscalate("cfpb"), bbb: () => renderEscalate("bbb"), tracker: renderTracker, drafts: renderDraftsPrint, terms: renderLegal, privacy: renderLegal, disclaimer: renderLegal, about: renderTrust, limits: renderTrust, faq: renderTrust };
  (views[page] || renderHome)(page);
  attachLimitCounters(main);
  window.scrollTo(0, 0);
}

function renderHome() {
  main.innerHTML = `
    <section class="hero shell">
      <div class="hero-copy">
        <div class="eyebrow"><span class="eyebrow-dot"></span> Credit, a little clearer</div>
        <h1>A calmer way to<br><em>find your next step.</em></h1>
        <p class="hero-lede">Understand what’s on your credit report. Get organized. Move forward at your own pace—with a guide that keeps you in control.</p>
        <div class="hero-actions"><a class="button button-lavender" href="#letters">Create a letter draft <span>${icon('arrow')}</span></a><a class="text-link" href="#how">See how CreditLuna works <span aria-hidden="true">↓</span></a></div>
        <div class="hero-proof"><div class="mini-avatars" aria-hidden="true"><span>✦</span><span>☾</span><span>✳</span></div><span>Plain language. Your decisions. Your next step.</span></div>
      </div>
      <div class="hero-art" role="img" aria-label="Illustration of the moon above a calm horizon">
        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="star star-a" aria-hidden="true">✦</div><div class="star star-b" aria-hidden="true">·</div><div class="star star-c" aria-hidden="true">✧</div>
        <div class="moon-disc"><div class="moon-shadow"></div><span class="moon-spark" aria-hidden="true">✦</span></div>
        <div class="horizon"></div>
        <div class="hero-note"><span class="note-icon">${icon('compass')}</span><span><strong>One clear next step</strong><small>Start with what you know.</small></span><span class="note-arrow">↗</span></div>
        <div class="art-caption">A little light goes a long way.</div>
      </div>
    </section>

    <section class="trust-strip shell"><div><span class="trust-mark">${icon('check')}</span><span>Self-directed tools</span></div><div><span class="trust-mark">${icon('check')}</span><span>No score promises</span></div><div><span class="trust-mark">${icon('check')}</span><span>Your letters stay yours</span></div></section>

    <section class="section section-soft" id="how"><div class="shell"><div class="section-heading centered"><div class="eyebrow">A thoughtful way forward</div><h2>Make sense of it.<br><em>Then choose what’s next.</em></h2><p>Credit can feel like a lot. Luna helps break it into smaller, more manageable steps—without making decisions for you.</p></div>
      <div class="steps-grid"><article class="step-card"><div class="step-number">01 <span aria-hidden="true">✦</span></div><div class="step-icon lavender-icon">${icon('compass')}</div><h3>Get oriented</h3><p>Learn how to read common credit-report details and what questions may be worth checking.</p><a href="#tools" class="card-link">Explore learning tools ${icon('arrow')}</a></article><article class="step-card"><div class="step-number">02 <span aria-hidden="true">✦</span></div><div class="step-icon teal-icon">${icon('sparkle')}</div><h3>Prepare your draft</h3><p>Use your own facts to make an editable letter draft, then review every detail yourself.</p><a href="#letters" class="card-link">Open letter workspace ${icon('arrow')}</a></article><article class="step-card"><div class="step-number">03 <span aria-hidden="true">✦</span></div><div class="step-icon peach-icon">${icon('moon')}</div><h3>Keep your place</h3><p>Use a simple follow-up reminder to stay organized. It’s a check-in, not a legal deadline.</p><a href="#letters" class="card-link">Make a draft ${icon('arrow')}</a></article></div>
    </div></section>

    <section class="section shell tool-feature" id="tools"><div class="feature-visual"><div class="visual-card"><div class="visual-top"><span class="visual-label">YOUR NEXT STEP</span><span class="visual-phase">☾ &nbsp; crescent</span></div><div class="visual-lines"><i></i><i></i><i></i></div><div class="visual-task"><span class="task-check">${icon('check')}</span><span><strong>Check the details</strong><small>Compare the item with your records</small></span></div><div class="visual-progress"><span></span></div><small class="progress-caption">One step at a time</small><span class="visual-star">✦</span></div><div class="visual-orb"></div></div><div class="feature-copy"><div class="eyebrow">Tools that put you in the driver's seat</div><h2>Useful tools.<br><em>No magic promises.</em></h2><p>CreditLuna is designed for self-help and learning—not to dispute items for you or decide what belongs on your report.</p><ul class="check-list"><li>${icon('check')} Editable letters you review and send yourself</li><li>${icon('check')} Plain-English learning and general Q&A</li><li>${icon('check')} Gentle organization for your own next steps</li><li>${icon('check')} <a href="#utilization">Free utilization calculator</a></li></ul><a class="button button-ink" href="#tools">Explore free tools <span>${icon('arrow')}</span></a></div></section>

    <section class="section shell ladder-teaser"><div class="eyebrow">Your next step, when you need it</div><h2>The escalation ladder</h2><p>${COPY.ladderTeaser}</p><a class="button button-outline" href="#cfpb">Explore the escalation ladder ${icon("arrow")}</a></section>

    <section class="section affiliate-section"><div class="shell affiliate-card home-build-teaser"><div class="affiliate-symbol">↗</div><div><div class="eyebrow">A partner option to explore</div><h2>Building credit, one step at a time.</h2><p>Learn how secured cards work and review the details of a Credit Builder Card option before deciding whether it fits your needs.</p><a class="button button-ink teaser-link" href="#build">Explore the Credit Builder Card <span>${icon('arrow')}</span></a><p class="affiliate-disclosure"><strong>Affiliate disclosure:</strong> CreditLuna may earn a commission if you apply through the Credit Builder Card partner link on the Build credit page, at no extra cost to you.</p></div><span class="affiliate-seal">YOUR TRUST<br>COMES FIRST</span></div></section>

    <section class="section pricing-preview" id="pricing"><div class="shell"><div class="section-heading centered"><div class="eyebrow">An early look at plans</div><h2>Start with clarity.<br><em>Choose what fits later.</em></h2><p>Plans below are planning hypotheses, not offers. Paid plans are not available in this prototype and require legal review before launch.</p></div><div class="pricing-grid"><article class="price-card"><span class="plan-label">A good place to begin</span><h3>Free</h3><p class="price">$0 <span>forever</span></p><ul><li>Learning hub & glossary</li><li>General Q&A in template mode</li><li>One letter draft workspace</li></ul><a href="#letters" class="button button-outline">Try the free tool</a></article><article class="price-card featured-price"><span class="plan-label">Planning hypothesis</span><h3>Luna Plus</h3><p class="price">~$19 <span>/ month</span></p><ul><li>Expanded learning tools</li><li>Organized drafts & reminders</li><li>More educational Q&A</li></ul><button class="button button-muted" disabled>Not available yet</button></article><article class="price-card"><span class="plan-label">Planning hypothesis</span><h3>Luna Complete</h3><p class="price">~$39 <span>/ month</span></p><ul><li>More room for your projects</li><li>Additional learning modules</li><li>Enhanced organization tools</li></ul><button class="button button-muted" disabled>Not available yet</button></article></div><p class="pricing-footnote">Prices are illustrative only—not an offer, subscription, or promise of a credit outcome. Counsel must review the product and business model before any paid plan is offered.</p></div></section>

    <section class="closing-cta"><div class="shell closing-inner"><div class="closing-moon">${icon('moon')}</div><div><div class="eyebrow">A steady next step</div><h2>Start with what you know.</h2><p>Bring your own facts. Review your draft. Decide for yourself what happens next.</p></div><a href="#letters" class="button button-lavender">Make a letter draft ${icon('arrow')}</a></div></section>
    <section class="disclaimer-bar shell"><span class="disclaimer-icon">i</span><p><strong>Important:</strong> CreditLuna provides education and self-help tools, not credit repair or legal advice. We do not contact bureaus, creditors, furnishers, or collectors for you. No score increase, deletion, approval, investigation result, or timing is guaranteed. Dispute only information you believe is inaccurate or incomplete.</p><a href="#disclaimer">Full disclaimer</a></section>`;
}

function renderBuild() {
  main.innerHTML = `
    <section class="page-hero shell build-hero">
      <div class="eyebrow">A credit-building option</div>
      <h1>Build credit,<br><em>with the details in view.</em></h1>
      <p>A secured card works much like a regular credit card, but you provide a cash deposit that helps secure the account. You make purchases and repay the card balance; the deposit is not your spending balance. Issuers may report account activity to credit bureaus, which can help establish a payment history. Reporting practices and credit outcomes vary.</p>
    </section>
    <section class="section section-soft build-section">
      <div class="shell build-layout">
        <article class="build-card">
          <div class="build-card-top"><span class="build-card-mark">☾</span><span class="tile-tag">Partner option</span></div>
          <div class="eyebrow">Credit Builder Card</div>
          <h2>A secured card with a refundable deposit.</h2>
          <p class="build-card-intro">Here are the key details stated on the partner’s page:</p>
          <ul class="build-facts">
            <li><span>${icon('check')}</span><span>Secured credit card</span></li>
            <li><span>${icon('check')}</span><span>$200 deposit to open</span></li>
            <li><span>${icon('check')}</span><span>Reports to all 3 credit bureaus</span></li>
            <li><span>${icon('check')}</span><span>No credit check</span></li>
            <li><span>${icon('check')}</span><span>Deposit fully refundable, per the partner’s page</span></li>
          </ul>
          <a class="button button-lavender build-cta" href="https://apply.creditbuildercard.com/FRHELIUMBALLOONS?cd=1&" target="_blank" rel="sponsored noopener noreferrer">See Credit Builder Card <span>${icon('arrow')}</span></a>
          <p class="build-terms-note">Review the issuer's full terms, fees and APR on their application page before applying. Results vary and no credit score outcome is guaranteed.</p>
          <p class="affiliate-disclosure build-disclosure"><strong>Affiliate disclosure:</strong> CreditLuna may earn a commission if you apply through this link, at no extra cost to you.</p>
        </article>
        <aside class="build-fit-card">
          <div class="eyebrow">Think it through</div>
          <h2>Is a secured card right for you?</h2>
          <div class="fit-list"><h3>Potential upsides</h3><ul><li>May offer a way to use a credit card while working on credit history.</li><li>Reported on-time payments may contribute to payment history.</li><li>The partner says its opening deposit is refundable.</li></ul></div>
          <div class="fit-list fit-list-caution"><h3>Things to consider</h3><ul><li>The deposit ties up cash while the account is open.</li><li>Fees or interest can add cost; review the complete terms and APR.</li><li>Late or missed payments may hurt credit, and outcomes vary.</li></ul></div>
          <p class="fit-footnote">Compare products and consider whether you can afford the deposit and pay on time. A card is optional—not a guaranteed route to a particular score.</p>
        </aside>
      </div>
    </section>
    ${ladderSection()}
    <section class="disclaimer-bar shell"><span class="disclaimer-icon">i</span><p>CreditLuna provides general education, not financial advice. The issuer makes the final decision on its products and terms. Verify all details directly with the issuer before applying.</p><a href="#disclaimer">Full disclaimer</a></section>`;
}

function renderHow() {
  main.innerHTML = `<section class="page-hero shell"><div class="eyebrow">The CreditLuna approach</div><h1>Clear steps.<br><em>You stay in control.</em></h1><p>CreditLuna helps you understand and organize. You decide what fits your situation and take any action yourself.</p><a class="button button-lavender" href="#letters">Try the letter tool ${icon('arrow')}</a></section><section class="section section-soft"><div class="shell steps-grid how-grid"><article class="step-card"><div class="step-number">01 <span aria-hidden="true">✦</span></div><h3>Learn the basics</h3><p>Explore plain-language guides and understand what details to compare against your own records.</p></article><article class="step-card"><div class="step-number">02 <span aria-hidden="true">✦</span></div><h3>Draft with your facts</h3><p>Choose a letter type and enter only the information needed. The draft does not invent claims or legal conclusions.</p></article><article class="step-card"><div class="step-number">03 <span aria-hidden="true">✦</span></div><h3>Review and choose</h3><p>Check every field, edit as needed, and decide independently whether and how to send the letter. We never send it.</p></article></div></section><section class="disclaimer-bar shell"><span class="disclaimer-icon">i</span><p>Educational and organizational tools only. Not legal advice, financial advice, or credit repair. No outcomes are guaranteed.</p><a href="#disclaimer">Read the limits</a></section>`;
}

function renderTools() {
  const checklists = window.creditlunaDownloads || {};
  const checklistLinks = ['first-dispute-checklist', 'sold-debt-checklist']
    .filter(key => Object.hasOwn(checklists, key))
    .map(key => {
      const title = key === 'first-dispute-checklist' ? 'First Dispute Checklist' : 'Sold Debt Checklist';
      return `<a class="card-link" href="/downloads/${key}.pdf" download="creditluna-${key}.pdf" target="_blank" rel="noopener noreferrer">${title} (PDF) ${icon('arrow')}</a>`;
    }).join('');
  main.innerHTML = `<section class="page-hero shell"><div class="eyebrow">The tool shelf</div><h1>A little clarity,<br><em>right when you need it.</em></h1><p>Free, self-directed tools to help you learn and get organized. No report upload, bureau connection, or third-party submission.</p></section><section class="section section-soft"><div class="shell tool-list-grid"><article class="tool-tile"><div class="tool-tile-icon">${icon('compass')}</div><span class="tile-tag">Available now</span><h2>Letter workspace</h2><p>Create a personal, editable draft for a bureau dispute, debt validation, goodwill request, or pay-for-delete inquiry.</p><a class="card-link" href="#letters">Open the workspace ${icon('arrow')}</a></article><article class="tool-tile"><div class="tool-tile-icon">${icon('sparkle')}</div><span class="tile-tag">Template mode</span><h2>Ask Luna</h2><p>Get plain-language explanations of common credit concepts. Please don’t share sensitive personal data.</p><a class="card-link" href="#chat">Ask a question ${icon('arrow')}</a></article><article class="tool-tile"><div class="tool-tile-icon">${icon('moon')}</div><span class="tile-tag">Learning guide</span><h2>Check before you act</h2><p>Compare report details with your own records. A question or flag is not proof that an item is wrong.</p><a class="card-link" href="#how">See how it works ${icon('arrow')}</a></article><article class="tool-tile"><div class="tool-tile-icon">%</div><span class="tile-tag">Free calculator</span><h2>Credit utilization calculator</h2><p>See your revolving balances versus limits and explore a pay-down scenario. Your numbers stay in this browser.</p><a class="card-link" href="#utilization">Open the calculator ${icon('arrow')}</a></article>${checklistLinks ? `<article class="tool-tile checklist-tool-tile"><div class="tool-tile-icon">↓</div><span class="tile-tag">Free, printable</span><h2>Free checklists</h2><p>Free, one page, printable. No sign-up needed.</p><div class="checklist-tool-links">${checklistLinks}</div><a class="card-link" href="/blog">Read the guides ${icon('arrow')}</a></article>` : ''}<article class="tool-tile unavailable-tile"><div class="tool-tile-icon">✧</div><span class="tile-tag">Not in this prototype</span><h2>Report analysis</h2><p>PDF uploads and automated report analysis are intentionally not available. No report data is requested here.</p><span class="muted-link">Designed with privacy in mind</span></article></div></section><section class="disclaimer-bar shell"><span class="disclaimer-icon">i</span><p>CreditLuna does not determine whether information is legally inaccurate or contact any third party on your behalf.</p><a href="#disclaimer">Full disclaimer</a></section>`;
}

const UTILIZATION_STORAGE_KEY = 'creditluna-utilization-v1';
const UTILIZATION_MAX_CENTS = 10000000000;

function parseUtilizationMoney(raw) {
  const value = String(raw).replace(/[$,\s]/g, '');
  if (!value) return { cents: null };
  if (!/^(?:\d+)(?:\.\d{1,2})?$/.test(value)) return { error: 'Enter a nonnegative dollar amount with at most two decimal places.' };
  const [dollars, fraction = ''] = value.split('.');
  const cents = Number(dollars) * 100 + Number(fraction.padEnd(2, '0'));
  if (!Number.isSafeInteger(cents) || cents > UTILIZATION_MAX_CENTS) return { error: 'Maximum allowed is $100,000,000 per field.' };
  return { cents };
}

function parseUtilizationTarget(raw) {
  const value = String(raw).replace(/[%,\s]/g, '');
  if (!/^(?:\d+)(?:\.\d{1,2})?$/.test(value) || Number(value) > 100) {
    return { error: 'Enter a target from 0% to 100%, with at most two decimal places.' };
  }
  return { value: Number(value) };
}

function utilizationMoney(cents) {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function utilizationLabel(percent) {
  return percent === null ? 'no limit reported, cannot calculate' : `${percent.toFixed(2)}%`;
}

function utilizationRow(index, account) {
  return `<div class="util-account" data-row="${index}">
    <div class="util-account-head"><h3>Card ${index + 1}</h3><button type="button" class="util-remove" data-remove="${index}" aria-label="Remove card ${index + 1}">Remove</button></div>
    <div class="util-fields"><div><label for="util-name-${index}">Card nickname</label><input id="util-name-${index}" data-field="name" autocomplete="off" value="${escapeHTML(account.name)}" placeholder="e.g. Everyday card"></div>
    <div><label for="util-limit-${index}">Credit limit ($)</label><input id="util-limit-${index}" data-field="limit" type="text" inputmode="decimal" autocomplete="off" value="${escapeHTML(account.limit)}" placeholder="e.g. $2,000"><span class="util-field-error" data-error="limit" role="alert"></span></div>
    <div><label for="util-balance-${index}">Current / statement balance ($)</label><input id="util-balance-${index}" data-field="balance" type="text" inputmode="decimal" autocomplete="off" value="${escapeHTML(account.balance)}" placeholder="e.g. $350"><span class="util-field-error" data-error="balance" role="alert"></span></div></div>
    <p class="util-account-result" data-result="${index}"></p>
  </div>`;
}

function renderUtilization() {
  main.innerHTML = `<section class="page-hero shell util-hero"><a class="back-link" href="#tools">← Back to tools</a><div class="eyebrow">A free, private calculator</div><h1>See your credit<br><em>utilization clearly.</em></h1><p>Add up to 10 revolving accounts to compare balances with limits and explore pay-down scenarios. Calculations happen here in your browser—nothing is sent to CreditLuna.</p></section>
  <section class="section section-soft util-section"><div class="shell util-layout"><div class="util-panel"><h2>Your revolving accounts</h2><p>Use the balance you want to explore. The balance reported to credit bureaus may differ from your live balance.</p><div id="util-accounts"></div>
  <div class="util-actions"><button type="button" class="button button-outline" id="util-add">+ Add an account</button><button type="button" class="button button-outline" id="util-save">Save to this browser</button><button type="button" class="button button-outline" id="util-clear">Clear</button></div>
  <p class="util-note">Your numbers stay in this browser. Nothing is stored unless you click “Save to this browser.” Saved values can be removed with Clear; avoid saving on a shared device.</p><p id="util-status" role="status" aria-live="polite"></p></div>
  <div class="util-panel"><div class="eyebrow">Your snapshot</div><h2>Overall utilization</h2><strong class="util-big" id="util-overall" aria-live="polite">—</strong><p id="util-totals">Add an account with a credit limit to get started.</p><p class="util-warning" id="util-warning" role="status"></p>
  <div class="util-planner"><h2>Pay-down planner</h2><label for="util-target">Target overall utilization (%)</label><input id="util-target" type="text" inputmode="decimal" value="30" aria-describedby="util-target-help"><p id="util-target-help" class="util-note">30% is a commonly cited rule of thumb, not an official threshold or a guarantee. Change it to explore a different target.</p><p class="util-field-error" id="util-target-error" role="alert"></p>
  <p id="util-paydown" aria-live="polite">Add an account with a limit to plan a pay-down.</p><div id="util-split"></div>
  <label for="util-whatif">What if I pay ($)</label><input id="util-whatif" type="text" inputmode="decimal" placeholder="e.g. $100"><p class="util-field-error" id="util-whatif-error" role="alert"></p><div id="util-whatif-result" aria-live="polite"></div></div></div></div></section>
  <section class="section shell util-explain"><h2>What do these numbers mean?</h2><p>Credit utilization compares a revolving account’s balance with its credit limit. Overall utilization here is the sum of balances divided by the sum of limits for accounts with a positive limit. Accounts without a reported limit are excluded from the totals, including any balance on them. This is an illustration, not the calculation a lender must use.</p><p>Card issuers report balances to credit bureaus on their own schedule, typically around the statement closing date; the reported statement balance may be different from your balance today. Check with your issuer for its reporting practice. <a href="https://www.myfico.com/credit-education/blog/carry-credit-card-balance-myth" target="_blank" rel="noopener noreferrer">myFICO explains statement reporting</a>.</p><p>Different lenders use different scoring models and information. FICO says amounts owed includes utilization, including overall and individual accounts. No tool, payment, or target guarantees any score change; this calculator does not estimate a score.</p>
  <aside class="util-sources"><h3>Read it yourself · sources verified October 28, 2026</h3><ul><li><a href="https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-and-keep-a-good-credit-score-en-318/" target="_blank" rel="noopener noreferrer">CFPB: How do I get and keep a good credit score?</a> — balances versus limits.</li><li><a href="https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/understand-your-credit-score/" target="_blank" rel="noopener noreferrer">CFPB: Understand your credit score</a> — different scores and scoring formulas.</li><li><a href="https://www.myfico.com/credit-education/whats-in-your-credit-score" target="_blank" rel="noopener noreferrer">myFICO: What's in your credit score?</a> — amounts owed and utilization.</li><li><a href="https://www.myfico.com/credit-education/blog/accounts-credit-utilization-ratio" target="_blank" rel="noopener noreferrer">myFICO: Accounts that affect utilization</a> — overall and individual rates.</li><li><a href="https://www.myfico.com/credit-education/blog/carry-credit-card-balance-myth" target="_blank" rel="noopener noreferrer">myFICO: Carrying a balance myth</a> — statement closing date and reporting.</li></ul><p>None of these sources establishes 30% as an official score threshold or promises a result.</p></aside></section>
  <section class="disclaimer-bar shell"><span class="disclaimer-icon">i</span><p>Educational tool. Not legal or financial advice. Results are estimates; your lenders and scoring models may differ.</p></section>`;
  const accounts = document.querySelector('#util-accounts');
  const target = document.querySelector('#util-target');
  const whatif = document.querySelector('#util-whatif');
  let rows = [{ name: '', limit: '', balance: '' }];
  try {
    const saved = JSON.parse(localStorage.getItem(UTILIZATION_STORAGE_KEY));
    if (Array.isArray(saved) && saved.length && saved.length <= 10 && saved.every(row => row && typeof row.name === 'string' && typeof row.limit === 'string' && typeof row.balance === 'string')) {
      rows = saved.map(row => ({ name: row.name.slice(0, 60), limit: row.limit.slice(0, 30), balance: row.balance.slice(0, 30) }));
      document.querySelector('#util-status').textContent = 'Loaded values previously saved in this browser.';
    }
  } catch (_) { /* Storage may be unavailable or contain invalid saved data. */ }
  function drawRows() {
    accounts.innerHTML = rows.map((row, index) => utilizationRow(index, row)).join('');
    document.querySelector('#util-add').disabled = rows.length >= 10;
    update();
  }
  function update() {
    const parsed = rows.map((row, index) => {
      const limit = parseUtilizationMoney(row.limit);
      const balance = parseUtilizationMoney(row.balance);
      const element = accounts.querySelector(`[data-row="${index}"]`);
      element.querySelector('[data-error="limit"]').textContent = limit.error || '';
      element.querySelector('[data-error="balance"]').textContent = balance.error || '';
      const limitCents = limit.cents || 0;
      const balanceCents = balance.cents || 0;
      element.querySelector('[data-result]').textContent = limit.error || balance.error ? 'Fix the amounts above to calculate.' : limitCents ? `Utilization: ${utilizationLabel(utilizationPercent(balanceCents, limitCents))}` : 'no limit reported, cannot calculate';
      return { limitCents, balanceCents, error: limit.error || balance.error };
    });
    const targetValue = parseUtilizationTarget(target.value);
    const whatifValue = parseUtilizationMoney(whatif.value);
    document.querySelector('#util-target-error').textContent = targetValue.error || '';
    document.querySelector('#util-whatif-error').textContent = whatifValue.error || '';
    const valid = !parsed.some(row => row.error);
    const summary = valid ? utilizationSummary(parsed) : null;
    document.querySelector('#util-overall').textContent = summary ? utilizationLabel(summary.overallPercent) : '—';
    document.querySelector('#util-totals').textContent = summary && summary.totalLimitCents ? `${utilizationMoney(summary.totalBalanceCents)} in balances ÷ ${utilizationMoney(summary.totalLimitCents)} in credit limits.` : valid ? 'Add an account with a positive credit limit to get started.' : 'Fix the highlighted amounts to calculate.';
    document.querySelector('#util-warning').textContent = summary && summary.excludedCount ? `${summary.excludedCount} account(s) with no positive limit are excluded from totals and plans, even if they have a balance.` : '';
    const plan = summary && summary.totalLimitCents && !targetValue.error ? paydownPlan(parsed, targetValue.value) : null;
    document.querySelector('#util-paydown').textContent = plan ? `${utilizationMoney(plan.amountCents)} to pay to reach ${targetValue.value}% or lower (estimate, assuming limits and balances do not change otherwise).` : 'Add an account with a positive limit and a valid target to plan a pay-down.';
    document.querySelector('#util-split').innerHTML = plan && plan.amountCents ? `<h3>Suggested split · highest utilization first</h3><ul>${plan.paymentsCents.map((amount, index) => amount ? `<li>${escapeHTML(rows[index].name || `Card ${index + 1}`)}: ${utilizationMoney(amount)}</li>` : '').join('')}</ul>` : '';
    const scenario = summary && summary.totalLimitCents && !whatifValue.error && whatifValue.cents !== null ? whatIfPayment(parsed, whatifValue.cents) : null;
    document.querySelector('#util-whatif-result').innerHTML = scenario ? `<strong>After ${utilizationMoney(scenario.appliedCents)} applied: ${utilizationLabel(scenario.summary.overallPercent)} overall</strong>${whatifValue.cents > scenario.appliedCents ? '<p>Payment exceeds the included balances; the extra is not applied.</p>' : ''}<ul>${scenario.summary.perAccount.map((percent, index) => `<li>${escapeHTML(rows[index].name || `Card ${index + 1}`)}: ${utilizationLabel(percent)}</li>`).join('')}</ul><p class="util-note">Estimated split uses highest-utilization accounts first; it does not include accounts with no limit.</p>` : '';
  }
  accounts.addEventListener('input', event => {
    const input = event.target;
    const row = input.closest('[data-row]');
    if (!row || !input.dataset.field) return;
    rows[Number(row.dataset.row)][input.dataset.field] = input.value;
    update();
  });
  accounts.addEventListener('click', event => {
    const button = event.target.closest('[data-remove]');
    if (!button) return;
    rows.splice(Number(button.dataset.remove), 1);
    drawRows();
  });
  document.querySelector('#util-add').addEventListener('click', () => {
    if (rows.length >= 10) return;
    rows.push({ name: '', limit: '', balance: '' });
    drawRows();
    accounts.querySelector(`[data-row="${rows.length - 1}"] input`).focus();
  });
  document.querySelector('#util-save').addEventListener('click', () => {
    if (rows.some(row => parseUtilizationMoney(row.limit).error || parseUtilizationMoney(row.balance).error)) {
      document.querySelector('#util-status').textContent = 'Correct the highlighted amounts before saving.';
      return;
    }
    try {
      localStorage.setItem(UTILIZATION_STORAGE_KEY, JSON.stringify(rows));
      document.querySelector('#util-status').textContent = 'Saved to this browser only.';
    } catch (_) { document.querySelector('#util-status').textContent = 'Browser storage is unavailable; nothing was saved.'; }
  });
  document.querySelector('#util-clear').addEventListener('click', () => {
    try { localStorage.removeItem(UTILIZATION_STORAGE_KEY); } catch (_) { /* The in-memory inputs can still be cleared. */ }
    rows = [{ name: '', limit: '', balance: '' }];
    target.value = '30';
    whatif.value = '';
    drawRows();
    document.querySelector('#util-status').textContent = 'Cleared calculator inputs and this browser’s saved calculator values.';
  });
  target.addEventListener('input', update);
  whatif.addEventListener('input', update);
  drawRows();
}

function renderPricing() {
  renderHome();
  requestAnimationFrame(() => document.querySelector('#pricing')?.scrollIntoView());
}

// COUNSEL REVIEW REQUIRED: review and edit all statutory language here before use.
const LEGAL_TEXT = Object.freeze({
  bureauReinvestigation: 'I request that you conduct a reasonable reinvestigation of this disputed information, free of charge, as required by § 611(a)(1). Because this information is disputed, please flag it as disputed in my file. Note that under § 623 of the FCRA, 15 U.S.C. § 1681s-2(b), once a furnisher is notified of a dispute it may not continue reporting the information without noting that it is disputed.',
  bureauDeletion: 'If your reinvestigation cannot verify that this information is accurate and complete, § 611(a)(5) requires you to promptly delete it from my credit report. If the information is modified rather than deleted, please send me the details of the change.',
  bureauResults: 'Please send me written notice of the results within five business days of completing the reinvestigation, as required by § 611(a)(6)(A), including: a free copy of my updated report if the dispute results in a change, and the description of the procedure used to determine the accuracy of the information - including the business name, address, and telephone number of any furnisher contacted - required by § 611(a)(6)(B)(iii).',
  bureauStatement: 'If the reinvestigation does not resolve this dispute, I reserve the right to file a brief statement of dispute for inclusion in my file under § 611(b).',
  bureauAsks: Object.freeze({
    delinquency: 'Please correct the date of first delinquency to [month/year]. If you cannot verify it, delete the item under § 611(a)(5), and recompute the seven-year reporting window from the correct date.',
    balance: 'Please correct the balance to $[amount]. If you cannot verify it, delete the item under § 611(a)(5).',
    status: 'Please correct the account status to reflect that this is a collection account and not an open account.',
    duplicate: 'This account appears twice with different account numbers. Delete the duplicate tradeline.',
    notmine: 'This account is not mine. Please provide the application or business records used to establish it, or delete the item.',
    balanceVerify: 'Please verify the balance reported and provide an itemized explanation of how it was calculated. If you cannot verify it, delete the item under § 611(a)(5).'
  }),
  // Prior-dispute sentence pieces: each piece is added only when the user filled in that field.
  priorHistory: Object.freeze({
    lead: 'I previously disputed this item',
    dates: ' on [dates]',
    method: ' by [method]',
    proof: ' (reference number [proof])',
    responses: Object.freeze({
      verified: 'the response was that the information was verified',
      deleted: 'the response was that the information was deleted',
      updated: 'the response was that the information was updated',
      none: 'I have not received a response',
      other: 'I received a response'
    }),
    responseDate: ' on [date]',
    noneDate: ' as of [date]',
    responseDateOnly: '; I received a response on [date]',
    note: ' ([note])'
  }),
  validation: Object.freeze({
    opening: 'This account is disputed. I request validation of the debt described below under § 809(b) of the Fair Debt Collection Practices Act, 15 U.S.C. § 1692g(b), and I ask that you stop collection and reporting activity until you provide it.',
    lead: 'Please send me:',
    bullets: Object.freeze([
      'an itemized accounting of the debt: principal, interest, fees, and payments applied;',
      'the name and address of the original creditor and the amount owed to it when the debt was assigned or sold;',
      'if the debt was sold: a copy of the bill of sale or purchase agreement showing the transfer to you, and the sale date; and whether you issued or intend to issue a Form 1099-C (cancellation of debt) for this account, and if so, the date and amount reported;',
      'if the debt was assigned: the assignment agreement or written authorization to collect on the original creditor\'s behalf;',
      'the original account agreement or contract, and the complete payment history;'
    ]),
    chargeOff: 'if the account was charged off: the charge-off date and the balance at charge-off, and the name and address of the creditor that charged it off;',
    fees: 'the basis and authority for each charge;',
    reporting: 'the date of first delinquency you are reporting, and every credit bureau you report to.',
    closing: 'Please report this account as disputed to each bureau you report to, as required by § 623(a)(3) of the FCRA, 15 U.S.C. § 1681s-2(a)(3). If you cannot validate the debt as described, please cease collection and reporting and close your file.'
  })
});

const BUREAU_RECIPIENTS = Object.freeze({
  equifax: { name: 'Equifax Information Services LLC', address: 'P.O. Box 740256, Atlanta, GA 30374-0256' },
  experian: { name: 'Experian', address: 'P.O. Box 4500, Allen, TX 75013' },
  transunion: { name: 'TransUnion Consumer Solutions', address: 'P.O. Box 2000, Chester, PA 19016-2000' }
});

function renderLetters() {
  const today = new Date();
  const dateValue = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  main.innerHTML = `
    <section class="letter-page shell">
      <div class="letter-intro">
        <a class="back-link" href="#tools">← Back to tools</a>
        <div class="eyebrow">Your letter workspace</div>
        <h1>Put your question<br><em>into your own words.</em></h1>
        <p>Create a draft using details you provide. It stays in this browser—a copy is saved in this device’s local storage with your Case Tracker item. CreditLuna does not submit, mail, or send it.</p>
        <div class="privacy-chip">${icon('check')} No full SSN or full account number needed</div>
      </div>
      <div class="letter-workspace">
        <form id="letter-form" class="letter-form">
          <div class="form-section-head"><span class="form-step">01</span><div><h2>Choose the kind of letter</h2><p>Pick the purpose that best fits what you want to ask.</p></div></div>
          <label class="field-label" for="letter-type">Letter type</label>
          <select id="letter-type" name="letterType" required><option value="bureau">Bureau dispute</option><option value="validation">Debt validation request</option><option value="goodwill">Goodwill request</option><option value="paydelete">Pay-for-delete inquiry</option></select>
          <div class="type-hint" id="type-hint">For asking a credit bureau to review information you believe may be inaccurate or incomplete.</div>

          <div class="form-section-head section-gap"><span class="form-step">02</span><div><h2>Who is it for?</h2><p>Enter the recipient details you have verified.</p></div></div>
          <label class="field-label" for="recipient-kind">Recipient type</label>
          <select id="recipient-kind" name="recipientKind"><option value="credit bureau">Credit bureau</option><option value="creditor or furnisher">Creditor or furnisher</option><option value="debt collector">Debt collector</option></select>
          <div id="bureau-suggestion-fields">
            <label class="field-label spaced-label" for="bureau-suggestion">Bureau mailing-address suggestion</label>
            <select id="bureau-suggestion" name="bureauSuggestion"><option value="">Choose a suggestion (optional)</option><option value="equifax">Equifax</option><option value="experian">Experian</option><option value="transunion">TransUnion</option></select>
            <p class="field-help">Suggestions are for convenience only. Verify the current mailing address on the bureau’s official website before use.</p>
          </div>
          <div class="field-grid">
            <div class="field"><label class="field-label" for="recipient-name">Organization name</label><input id="recipient-name" name="recipientName" required data-max="150" placeholder="Enter recipient's verified name"></div>
            <div class="field"><label class="field-label" for="recipient-address">Recipient mailing address <span class="required-marker" aria-hidden="true">*</span><span class="sr-only"> required</span></label><input id="recipient-address" name="recipientAddress" required aria-required="true" aria-describedby="recipient-address-error" data-max="300" placeholder="Verify and edit this address"><p class="reason-error" id="recipient-address-error" role="alert" hidden></p></div>
          </div>

          <div class="form-section-head section-gap"><span class="form-step">03</span><div><h2>Describe the item</h2><p>Use only facts you have checked. Never include a full SSN or full account number.</p></div></div>
          <label class="field-label" for="item">Account or item description</label>
          <textarea id="item" name="item" required data-max="1000" rows="2" placeholder="For example: store card ending in 1234"></textarea>
          <div id="bureau-reason-fields">
          <label class="field-label spaced-label" for="reason-type">Reason type</label>
          <select id="reason-type" name="reasonType"><option value="other">Other</option><option value="delinquency">Date of first delinquency missing or wrong</option><option value="balance">Wrong balance</option><option value="status">Status reported wrong (collection shown open)</option><option value="duplicate">Duplicate tradeline</option><option value="notmine">Item not mine</option></select>
          <div class="field" id="delinquency-field" hidden><label class="field-label spaced-label" for="correct-delinquency">Correct month/year</label><input id="correct-delinquency" name="correctDelinquency" type="month"></div>
          <div class="field" id="balance-field" hidden><label class="review-consent balance-choice"><input id="balance-unknown" name="balanceUnknown" type="checkbox"><span>I don't know the correct amount; ask them to verify and explain the balance</span></label><div id="balance-amount-field"><label class="field-label" for="correct-balance">Correct amount ($)</label><input id="correct-balance" name="correctBalance" type="number" min="0" step="0.01" placeholder="For example: 240.00"><p class="field-help">Enter the amount your records show, or tick the box above if you don't know it.</p><label class="review-consent" id="zero-confirm-wrap" hidden><input id="confirm-zero" name="confirmZeroBalance" type="checkbox"><span>I confirm the correct balance is $0.00.</span></label></div></div>
          </div>
          <div id="reason-fields"><label class="field-label spaced-label" for="reason">What specific fact should they review?</label>
          <textarea id="reason" name="reason" required minlength="30" data-max="3000" rows="4" aria-describedby="reason-help reason-error" placeholder="Explain what detail is wrong or incomplete and what your records show."></textarea>
          <p class="field-help" id="reason-help">Give a specific factual reason (at least 30 characters): “account not mine; I never opened it,” “wrong balance; my statement shows $240,” or “wrong date of last activity; my records show May 2022.” Avoid vague text such as “please investigate.”</p>
          <p class="reason-error" id="reason-error" role="alert" hidden></p>
          <p class="field-help">Do not dispute information you know is accurate. Do not include SSNs, full account numbers, or someone else’s personal information.</p></div>
          <div id="validation-options" hidden><label class="review-consent"><input id="claimed-fees" name="claimedFees" type="checkbox"><span>Interest or fees are being claimed</span></label><label class="review-consent"><input id="collector-reporting" name="collectorReporting" type="checkbox"><span>The collector is reporting this account</span></label><label class="review-consent"><input id="charged-off" name="chargedOff" type="checkbox"><span>The account was charged off</span></label></div>

          <div id="prior-history-fields">
          <div class="form-section-head section-gap"><span class="form-step">04</span><div><h2>Prior dispute history <span class="optional">optional</span></h2><p>Only if you disputed this item before. The letter adds one factual sentence built only from what you enter here; blank fields are left out.</p></div></div>
          <fieldset class="choice-row"><legend class="field-label">Have you disputed this before?</legend><label class="inline-choice"><input type="radio" name="priorDisputed" value="no" checked> No</label><label class="inline-choice"><input type="radio" name="priorDisputed" value="yes"> Yes</label></fieldset>
          <div id="prior-details" hidden>
            <div class="field-grid">
              <div class="field"><label class="field-label" for="prior-date">Prior dispute date</label><input id="prior-date" name="priorDate" type="date" max="${dateValue}"></div>
              <div class="field"><label class="field-label" for="prior-date-2">Another prior dispute date <span class="optional">optional</span></label><input id="prior-date-2" name="priorDate2" type="date" max="${dateValue}"></div>
            </div>
            <div class="field-grid">
              <div class="field"><label class="field-label" for="prior-method">How you sent it</label><select id="prior-method" name="priorMethod"><option value="">Not provided</option><option value="certified mail">Certified mail</option><option value="postal mail">Postal mail</option><option value="online dispute">Online dispute</option><option value="phone">Phone</option><option value="other means">Other</option></select></div>
              <div class="field"><label class="field-label" for="prior-proof">Proof (e.g. certified mail number) <span class="optional">optional</span></label><input id="prior-proof" name="priorProof" data-max="120" autocomplete="off" placeholder="For example: 9407 1000 0000 0000 0000 00"></div>
            </div>
            <div class="field-grid">
              <div class="field"><label class="field-label" for="prior-response">Response received</label><select id="prior-response" name="priorResponse"><option value="">Not provided</option><option value="verified">Verified</option><option value="deleted">Deleted</option><option value="updated">Updated</option><option value="none">No response</option><option value="other">Other</option></select></div>
              <div class="field"><label class="field-label" for="prior-response-date" id="prior-response-date-label">Response date</label><input id="prior-response-date" name="priorResponseDate" type="date" max="${dateValue}"></div>
            </div>
            <label class="field-label spaced-label" for="prior-note">Short note about the response <span class="optional">optional</span></label>
            <textarea id="prior-note" name="priorNote" data-max="300" rows="2" placeholder="For example: letter said the balance was reported correctly"></textarea>
            <div class="prior-preview"><strong>Sentence that will be added to your letter:</strong> <span id="prior-preview-text" aria-live="polite"></span></div>
          </div>
          </div>

          <div class="form-section-head section-gap"><span class="form-step">05</span><div><h2>File identifiers and enclosures</h2><p>Include only details and copies you are comfortable providing.</p></div></div>
          <div class="field-grid">
            <div class="field"><label class="field-label" for="last-four">Last four of SSN <span class="optional">optional</span></label><input id="last-four" name="lastFour" inputmode="numeric" data-max="4" pattern="[0-9]{4}" placeholder="4 digits only" autocomplete="off"><p class="field-help">never enter a full SSN. Leave blank if you prefer not to include it.</p></div>
            <div class="field"><label class="field-label" for="date-of-birth">Date of birth <span class="optional">optional</span></label><input id="date-of-birth" name="dateOfBirth" type="date" autocomplete="bday"></div>
          </div>
          <p class="field-help">The file-identifiers line will also include your current address from the return-address section below.</p>
          <label class="field-label spaced-label" for="enclosures">Enclosures (one per line)</label>
          <textarea id="enclosures" name="enclosures" required data-max="1500" rows="3">Copy of ID
Proof of address
Copy of the report page with the item marked</textarea>
          <p class="field-help">Edit this list to match the copies you choose to include. Keep originals and do not include anything unnecessary.</p>

          <div class="form-section-head section-gap"><span class="form-step">06</span><div><h2>Your return details</h2><p>Your information will be used only to format this draft in your browser.</p></div></div>
          <div class="field-grid">
            <div class="field"><label class="field-label" for="full-name">Your name</label><input id="full-name" name="fullName" autocomplete="name" required data-max="150" placeholder="Full name"></div>
            <div class="field"><label class="field-label" for="email">Email <span class="optional">optional</span></label><input id="email" name="email" type="email" autocomplete="email" data-max="254" placeholder="you@example.com"></div>
          </div>
          <label class="field-label spaced-label" for="return-address">Your current mailing address</label>
          <input id="return-address" name="returnAddress" autocomplete="street-address" required data-max="200" placeholder="Street address">
          <div class="field-grid three-col">
            <div class="field"><label class="field-label" for="city">City</label><input id="city" name="city" autocomplete="address-level2" required data-max="80"></div>
            <div class="field"><label class="field-label" for="state">State</label><input id="state" name="state" autocomplete="address-level1" required data-max="30" placeholder="State"></div>
            <div class="field"><label class="field-label" for="zip">ZIP code</label><input id="zip" name="zip" autocomplete="postal-code" required data-max="15"></div>
          </div>
          <label class="field-label spaced-label" for="send-date">Date you plan to send <span class="optional">editable</span></label>
          <input id="send-date" name="sendDate" type="date" required value="${dateValue}">
          <p class="field-help">This date is used only to show an optional 30-day organizational check-in. It is not a legal deadline calculation.</p>
          <label class="review-consent"><input id="review-confirm" type="checkbox" required><span>I understand this is an editable draft I must verify, edit, sign, and send myself. CreditLuna will not send it for me.</span></label>
          <button class="button button-ink form-submit" type="submit">Create my draft <span>${icon('arrow')}</span></button>
          <p class="form-disclaimer">Educational self-help only—not legal advice or credit repair. No score increase, removal, or response is guaranteed.</p>
          <p class="counsel-note">Template language, not legal advice; have counsel review before use in a paid product.</p>
        </form>
        <aside class="letter-side">
          <div class="side-note"><div class="side-note-icon">${icon('sparkle')}</div><h3>Keep it accurate.</h3><p>Only include facts you believe are correct and can explain. Do not dispute information you know is accurate. If you’re unsure, pause and check your records first.</p></div>
          <div class="side-note side-note-outline"><div class="side-note-icon">☾</div><h3>You stay in control.</h3><p>Review the recipient, dates, facts, and supporting documents. Choose your own submission method.</p><a href="#disclaimer">Read the full disclaimer</a></div>
          <div class="side-reminder">${icon('moon')}<p><strong>A reminder, not a deadline.</strong><br>Your follow-up date is an organizational check-in only.</p></div>
        </aside>
      </div>
      <div id="letter-result" class="letter-result" hidden></div>
    </section>`;

  document.querySelector('#letter-type').addEventListener('change', updateTypeHint);
  document.querySelector('#recipient-kind').addEventListener('change', updateBureauSuggestion);
  document.querySelector('#reason-type').addEventListener('change', updateReasonFields);
  document.querySelector('#balance-unknown').addEventListener('change', updateReasonFields);
  document.querySelector('#correct-balance').addEventListener('input', updateZeroConfirm);
  document.querySelectorAll('#prior-history-fields input, #prior-history-fields select, #prior-history-fields textarea').forEach(field => field.addEventListener(field.tagName === 'SELECT' || field.type === 'radio' || field.type === 'date' ? 'change' : 'input', updatePriorHistory));
  updateTypeHint();
  updatePriorHistory();
  document.querySelector('#bureau-suggestion').addEventListener('change', fillBureauSuggestion);
  document.querySelector('#reason').addEventListener('input', validateReason);
  const recipientAddress = document.querySelector('#recipient-address');
  recipientAddress.addEventListener('input', validateRecipientAddress);
  recipientAddress.addEventListener('invalid', () => validateRecipientAddress());
  validateRecipientAddress(false);
  document.querySelector('#letter-form').addEventListener('submit', createLetter);
}

function updateBureauSuggestion() {
  const isBureau = document.querySelector('#recipient-kind').value === 'credit bureau';
  document.querySelector('#bureau-suggestion-fields').hidden = !isBureau;
  if (!isBureau) {
    const suggestion = document.querySelector('#bureau-suggestion');
    const bureau = BUREAU_RECIPIENTS[suggestion.value];
    if (bureau) {
      const name = document.querySelector('#recipient-name');
      const address = document.querySelector('#recipient-address');
      if (name.value === bureau.name) setFieldValue(name, '');
      if (address.value === bureau.address) setFieldValue(address, '');
    }
    suggestion.value = '';
  }
}

function fillBureauSuggestion(event) {
  if (document.querySelector('#recipient-kind').value !== 'credit bureau') return;
  const bureau = BUREAU_RECIPIENTS[event.currentTarget.value];
  if (!bureau) return;
  setFieldValue(document.querySelector('#recipient-name'), bureau.name);
  setFieldValue(document.querySelector('#recipient-address'), bureau.address);
}

function setFieldValue(field, value) {
  field.value = value;
  field.dispatchEvent(new Event('input', { bubbles: true }));
}

function reasonValidationMessage(value) {
  const reason = value.trim().toLowerCase().replace(/[.!?]+$/, '').trim();
  if (reason.length < 30) return 'Please add more detail (at least 30 characters) explaining what is wrong and what your records show.';
  const vagueClaim = /^(account |this account |item |this item |information )?(is )?(not mine|wrong|incorrect|inaccurate|please investigate|please fix)( account| item| balance| date| information)?/.test(reason);
  const factualDetail = /\b(my records|my statement|my account|never opened|did not open|should be|shows|dated|reported|statement dated|\$|20\d{2}|paid on|closed on)\b/i.test(value);
  if (vagueClaim && !factualDetail) {
    return 'That reason is too vague. Describe the specific detail in dispute and, if possible, what your records show.';
  }
  return '';
}

function validateRecipientAddress(showError = true) {
  const field = document.querySelector('#recipient-address');
  const message = field.value.trim() ? '' : "Please enter the recipient's mailing address before creating your letter.";
  field.setCustomValidity(message);
  if (showError) {
    const error = document.querySelector('#recipient-address-error');
    error.textContent = message;
    error.hidden = !message;
  }
  return !message;
}

function validateReason() {
  const field = document.querySelector('#reason');
  const message = reasonValidationMessage(field.value);
  field.setCustomValidity(message);
  const error = document.querySelector('#reason-error');
  error.textContent = message;
  error.hidden = !message;
  return !message;
}
const typeHints = {
  bureau: 'For asking a credit bureau to review information you believe may be inaccurate or incomplete.',
  validation: 'A request for information about a debt for you to review. This does not determine whether the debt is valid or change any deadlines.',
  goodwill: 'A courtesy request asking a creditor to consider an adjustment. The creditor may decline, and accurate information may remain.',
  paydelete: 'An inquiry about whether a creditor or collector would consider written settlement terms. There is no guarantee they will agree.'
};

const standardEnclosures = 'Copy of ID\nProof of address\nCopy of the report page with the item marked';
const validationEnclosures = 'the credit report page with the item marked';

function updateReasonFields() {
  const reasonType = document.querySelector('#reason-type').value;
  for (const [type, fieldId, inputId] of [
    ['delinquency', 'delinquency-field', 'correct-delinquency'],
    ['balance', 'balance-field', 'correct-balance']
  ]) {
    const visible = reasonType === type;
    document.querySelector(`#${fieldId}`).hidden = !visible;
    document.querySelector(`#${inputId}`).required = visible && document.querySelector('#letter-type').value === 'bureau' && !(inputId === 'correct-balance' && document.querySelector('#balance-unknown').checked);
  }
  const unknown = document.querySelector('#balance-unknown').checked;
  const amount = document.querySelector('#correct-balance');
  document.querySelector('#balance-amount-field').hidden = unknown;
  amount.disabled = unknown;
  if (unknown) amount.value = '';
  updateZeroConfirm();
}

function updateZeroConfirm() {
  const amount = document.querySelector('#correct-balance');
  const isZero = !amount.disabled && amount.value.trim() !== '' && Number(amount.value) === 0;
  const confirmZero = document.querySelector('#confirm-zero');
  document.querySelector('#zero-confirm-wrap').hidden = !isZero;
  confirmZero.required = isZero && document.querySelector('#letter-type').value === 'bureau' && document.querySelector('#reason-type').value === 'balance';
  if (!isZero) confirmZero.checked = false;
}

function updatePriorHistory() {
  const form = document.querySelector('#letter-form');
  const data = Object.fromEntries(new FormData(form).entries());
  const yes = data.priorDisputed === 'yes';
  document.querySelector('#prior-details').hidden = !yes;
  document.querySelector('#prior-response-date-label').textContent = data.priorResponse === 'none' ? 'Checked as of (date)' : 'Response date';
  document.querySelector('#prior-preview-text').textContent = priorHistorySentence({ ...data, letterType: 'bureau' }) || 'Nothing yet.';
}

function updateTypeHint() {
  const select = document.querySelector('#letter-type');
  document.querySelector('#type-hint').textContent = typeHints[select.value];
  const validation = select.value === 'validation';
  const recipient = document.querySelector('#recipient-kind');
  if (validation) recipient.value = 'debt collector';
  else if (select.value === 'bureau') recipient.value = 'credit bureau';
  else if (recipient.value === 'credit bureau') recipient.value = 'creditor or furnisher';
  updateBureauSuggestion();
  document.querySelector('#validation-options').hidden = !validation;
  document.querySelector('#prior-history-fields').hidden = !PRIOR_HISTORY_TYPES.includes(select.value);
  document.querySelector('#bureau-reason-fields').hidden = select.value !== 'bureau';
  document.querySelector('#reason-fields').hidden = validation;
  const reason = document.querySelector('#reason');
  reason.required = !validation;
  if (validation) {
    reason.setCustomValidity('');
    document.querySelector('#reason-error').hidden = true;
  }
  updateReasonFields();
  const enclosures = document.querySelector('#enclosures');
  if (validation && enclosures.value === standardEnclosures) setFieldValue(enclosures, validationEnclosures);
  if (!validation && enclosures.value === validationEnclosures) setFieldValue(enclosures, standardEnclosures);
}

function bureauAsk(data) {
  const ask = LEGAL_TEXT.bureauAsks[data.reasonType];
  if (!ask) return '';
  if (data.reasonType === 'delinquency') {
    const [year, month] = data.correctDelinquency.split('-').map(Number);
    return ask.replace('[month/year]', `${monthNames[month - 1]} ${year}`);
  }
  if (data.reasonType === 'balance') {
    const amount = correctedBalance(data);
    if (amount === null) return LEGAL_TEXT.bureauAsks.balanceVerify;
    return ask.replace('[amount]', amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  }
  return ask;
}

// A corrected amount is used only when entered; $0 additionally needs the user's explicit confirmation.
function correctedBalance(data) {
  if (data.balanceUnknown) return null;
  const raw = String(data.correctBalance ?? '').trim();
  if (!raw) return null;
  const amount = Number(raw);
  if (!Number.isFinite(amount) || amount < 0) return null;
  if (amount === 0 && !data.confirmZeroBalance) return null;
  return amount;
}

const PRIOR_HISTORY_TYPES = Object.freeze(['bureau', 'validation']);

function fill(template, values) {
  return template.replace(/\[([a-z]+)\]/g, (token, key) => (Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : token));
}

function cleanText(value) {
  return String(value ?? '').trim().replace(/[.\s]+$/, '');
}

function priorHistorySentence(data) {
  if (!PRIOR_HISTORY_TYPES.includes(data.letterType) || data.priorDisputed !== 'yes') return '';
  const text = LEGAL_TEXT.priorHistory;
  const dates = [data.priorDate, data.priorDate2].filter(validDate).map(formatDate);
  let sentence = text.lead;
  if (dates.length) sentence += fill(text.dates, { dates: dates.join(' and ') });
  if (cleanText(data.priorMethod)) sentence += fill(text.method, { method: cleanText(data.priorMethod) });
  if (cleanText(data.priorProof)) sentence += fill(text.proof, { proof: cleanText(data.priorProof) });
  const response = text.responses[data.priorResponse];
  const responseDate = validDate(data.priorResponseDate) ? formatDate(data.priorResponseDate) : '';
  if (response) {
    sentence += `; ${response}`;
    if (responseDate) sentence += fill(data.priorResponse === 'none' ? text.noneDate : text.responseDate, { date: responseDate });
  } else if (responseDate) {
    sentence += fill(text.responseDateOnly, { date: responseDate });
  }
  if (cleanText(data.priorNote)) sentence += fill(text.note, { note: cleanText(data.priorNote) });
  return `${sentence}.`;
}

function letterCaseFacts(data) {
  const facts = { recipientKind: data.recipientKind || '', recipientAddress: data.recipientAddress || '', item: data.item || '', plannedSendDate: data.sendDate || '' };
  if (data.letterType === 'bureau') {
    facts.reasonType = data.reasonType || 'other';
    if (data.reasonType === 'delinquency') facts.correctDelinquency = data.correctDelinquency || '';
    if (data.reasonType === 'balance') {
      const amount = correctedBalance(data);
      facts.balanceRequest = amount === null ? 'verify and explain' : amount.toFixed(2);
    }
  }
  if (PRIOR_HISTORY_TYPES.includes(data.letterType) && data.priorDisputed === 'yes') {
    Object.assign(facts, { priorDisputed: 'yes', priorDate: data.priorDate || '', priorDate2: data.priorDate2 || '', priorMethod: data.priorMethod || '', priorProof: (data.priorProof || '').trim(), priorResponse: data.priorResponse || '', priorResponseDate: data.priorResponseDate || '', priorNote: (data.priorNote || '').trim(), priorSentence: priorHistorySentence(data) });
  } else {
    facts.priorDisputed = PRIOR_HISTORY_TYPES.includes(data.letterType) ? 'no' : '';
  }
  return facts;
}

function validationBody(data, prior = '') {
  const text = LEGAL_TEXT.validation;
  const bullets = [...text.bullets];
  if (data.chargedOff) bullets.splice(3, 0, text.chargeOff);
  if (data.claimedFees) bullets.push(text.fees);
  if (data.collectorReporting) bullets.push(text.reporting);
  return `${text.opening}${prior ? `\n\n${prior}` : ''}\n\n${text.lead}\n* ${bullets.join('\n* ')}\n\n${text.closing}`;
}

function formatDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return `${monthNames[month - 1]} ${day}, ${year}`;
}

function addDays(value, days) {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function composeLetter(data) {
  const labels = { bureau: 'Request to review credit report information', validation: 'Request for information about an account', goodwill: 'Goodwill request regarding account history', paydelete: 'Inquiry about possible written settlement terms' };
  const openers = {
    bureau: `I am writing to ask you to review the item described below, which appears on my credit report. I believe the item may be inaccurate or incomplete for the reason I describe here. Please review the information and any supporting documents I choose to include, and share the result through your usual process.`,
    goodwill: `I understand that account history may accurately reflect past events. I am writing to respectfully ask whether you would consider a courtesy adjustment to the account history described below. I understand you may decline, and I appreciate your consideration.`,
    paydelete: `I am writing to ask whether you would consider discussing written settlement terms for the account described below. Before making any payment, I would need to review any proposed terms in writing. I understand you may decline, and this inquiry does not guarantee an agreement or a change to any reporting.`
  };
  const cityState = `${data.city}, ${data.state} ${data.zip}`;
  const email = data.email ? `\n${data.email}` : '';
  const identifiers = `Last four of SSN: ${data.lastFour || '[not provided]'}\nDate of birth: ${data.dateOfBirth ? formatDate(data.dateOfBirth) : '[not provided]'}\nCurrent address: ${data.returnAddress}, ${cityState}`;
  const prior = priorHistorySentence(data);
  const legalParagraphs = data.letterType === 'bureau' ? `\n\n${[LEGAL_TEXT.bureauReinvestigation, LEGAL_TEXT.bureauDeletion, LEGAL_TEXT.bureauResults, LEGAL_TEXT.bureauStatement].join('\n\n')}` : '';
  const reasonParagraph = data.letterType === 'validation' ? '' : `My reason or request: ${data.reason}`;
  const ask = data.letterType === 'bureau' ? bureauAsk(data) : '';
  const body = data.letterType === 'validation' ? validationBody(data, prior) : `${openers[data.letterType]}\n\n${reasonParagraph}${ask ? `\n\n${ask}` : ''}${prior ? `\n\n${prior}` : ''}${legalParagraphs}`;
  const enclosures = data.enclosures.split('\n').map(item => item.trim()).filter(Boolean).map(item => `- ${item}`).join('\n');
  const closingNote = data.letterType === 'validation' ? '' : 'Please send any response to the mailing address above. I will review this editable draft, verify the details, and decide whether and how to send it.\n\n';
  const letter = `${data.fullName}\n${data.returnAddress}\n${cityState}${email}\n\n${formatDate(data.sendDate)}\n\n${data.recipientName}\n${data.recipientAddress}\n\nSubject: ${labels[data.letterType]}\nItem: ${data.item}\n\nFile identifiers:\n${identifiers}\n\nDear ${data.recipientName}:\n\n${body}\n\n${closingNote}Sincerely,\n\n${data.fullName}\n\nEnclosures:\n${enclosures}`;
  return letter;
}

function createLetter(event) {
  event.preventDefault();
  const form = event.currentTarget;
  validateRecipientAddress();
  if (form.elements.letterType.value === 'bureau' || form.elements.letterType.value === 'goodwill' || form.elements.letterType.value === 'paydelete') validateReason();
  updateZeroConfirm();
  if (!withinLimits(form) || !form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const letter = composeLetter(data);
  const result = document.querySelector('#letter-result');
  const followUp = addDays(data.sendDate, 30);
  result.hidden = false;
  result.innerHTML = `<div class="result-heading"><div><div class="eyebrow">Your draft is ready</div><h2>Review and edit every detail before using it.</h2></div><div class="reminder-date">${icon('moon')}<span><small>30-day organizational check-in</small><strong>${formatDate(followUp)}</strong></span></div></div><div class="result-alert"><strong>Not a legal deadline:</strong> This reminder is based only on the date you entered. Timing rules can vary; check current official guidance for your situation.</div><div class="letter-preview"><label class="sr-only" for="letter-text">Editable letter draft</label><textarea id="letter-text" aria-label="Editable letter draft" spellcheck="true"></textarea></div><div class="result-actions"><button class="button button-ink" id="download-letter" type="button">Download .txt <span>${icon('arrow')}</span></button><button class="button button-outline" id="print-letter" type="button">Print draft</button><button class="text-link" id="copy-letter" type="button">Copy text</button></div><p class="result-footnote" id="letter-save-status" role="status" aria-live="polite"></p><p class="result-footnote">This editable draft was generated in your browser. A copy (including your edits in the box above) is saved only in this browser’s local storage with your Case Tracker item; it is not sent to CreditLuna. Verify names, dates, recipient address on the bureau’s official site, facts, legal text, and attachments. Template language, not legal advice; have counsel review before use in a paid product. CreditLuna did not send this letter.</p>`;
  const preview = document.querySelector('#letter-text');
  preview.value = letter;
  const caseId = addCase({ type: data.letterType, company: data.recipientName, createdDate: todayISO(), ...letterCaseFacts(data), draftText: letter });
  document.querySelector('#letter-save-status').innerHTML = caseId ? 'Saved to your <a href="#tracker">Case Tracker</a> as Drafted (this browser only).' : 'Browser storage unavailable; this draft was not saved to your Case Tracker. Download or copy it before leaving.';
  let saveTimer = null;
  preview.addEventListener('input', () => {
    if (!caseId) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => updateCase(caseId, { draftText: preview.value }), 400);
  });
  document.querySelector('#download-letter').addEventListener('click', () => {
    const blob = new Blob([preview.value], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = draftFilename(data.letterType, data.recipientName);
    link.click();
    URL.revokeObjectURL(link.href);
  });
  document.querySelector('#print-letter').addEventListener('click', () => window.print());
  document.querySelector('#copy-letter').addEventListener('click', async (copyEvent) => {
    try {
      await navigator.clipboard.writeText(preview.value);
      copyEvent.currentTarget.textContent = 'Copied';
    } catch {
      copyEvent.currentTarget.textContent = 'Copy not available';
    }
  });
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const DRAFT_TYPE_SLUGS = Object.freeze({ bureau: 'bureau-dispute', validation: 'debt-validation', goodwill: 'goodwill', paydelete: 'pay-for-delete', cfpb: 'cfpb-complaint', bbb: 'bbb-complaint' });

function slugify(value, maxLength = 40) {
  return String(value ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, maxLength).replace(/-+$/, '');
}

function fileStamp(date = new Date()) {
  const pad = number => String(number).padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}`;
}

function draftFilename(type, recipient, date = new Date()) {
  const kind = DRAFT_TYPE_SLUGS[type] || slugify(type, 30) || 'draft';
  return `creditluna-${kind}-${slugify(recipient) || 'recipient'}-${fileStamp(date)}.txt`;
}

function limitState(length, max) {
  if (length > max) return { level: 'over', message: `${length.toLocaleString('en-US')} / ${max.toLocaleString('en-US')} characters: ${(length - max).toLocaleString('en-US')} over the limit. Please shorten this; nothing has been cut.` };
  if (length >= Math.floor(max * 0.9)) return { level: 'near', message: `${length.toLocaleString('en-US')} / ${max.toLocaleString('en-US')} characters: ${(max - length).toLocaleString('en-US')} left.` };
  return { level: 'ok', message: `${length.toLocaleString('en-US')} / ${max.toLocaleString('en-US')} characters` };
}

// Limits are soft: text is never cut; a visible counter warns near the limit and blocks submit when over.
function attachLimitCounters(root = document) {
  root.querySelectorAll('[data-max]').forEach(field => {
    if (field.dataset.counterReady) return;
    field.dataset.counterReady = 'true';
    const max = Number(field.dataset.max);
    const counter = document.createElement('p');
    counter.className = 'char-counter';
    counter.id = `${field.id || field.name}-counter`;
    counter.setAttribute('aria-live', 'polite');
    field.insertAdjacentElement('afterend', counter);
    field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), counter.id].filter(Boolean).join(' '));
    const update = () => {
      const state = limitState(field.value.length, max);
      counter.textContent = state.message;
      counter.classList.toggle('near-limit', state.level === 'near');
      counter.classList.toggle('over-limit', state.level === 'over');
      field.classList.toggle('field-over-limit', state.level === 'over');
    };
    field.addEventListener('input', update);
    field.addEventListener('change', update);
    update();
  });
}

function withinLimits(form) {
  const over = [...form.querySelectorAll('[data-max]')].find(field => !field.disabled && !field.closest('[hidden]') && field.value.length > Number(field.dataset.max));
  if (!over) return true;
  over.dispatchEvent(new Event('input'));
  over.focus();
  over.scrollIntoView({ behavior: 'smooth', block: 'center' });
  return false;
}

function renderChat() {
  main.innerHTML = `<section class="chat-page shell"><div class="chat-intro"><div class="eyebrow">A question on your mind?</div><h1>Ask Luna.<br><em>Learn at your pace.</em></h1><p>Plain-language education about common credit topics—not advice for your specific legal or financial situation.</p></div><div class="chat-layout"><aside class="chat-sidebar"><div class="sidebar-moon">${icon('moon')}</div><h2>Good questions start small.</h2><p>Try asking about a general credit concept, report sections, or how to organize your next step.</p><div class="suggestion-title">Try a prompt</div><button class="suggestion" data-prompt="What does credit utilization mean?">What does utilization mean? <span>↗</span></button><button class="suggestion" data-prompt="How can I prepare to review a credit report?">How do I review a report? <span>↗</span></button><button class="suggestion" data-prompt="What should I check before disputing an item?">What to check before a dispute? <span>↗</span></button><div class="privacy-reminder">${icon('check')} Please don’t share SSNs, full account numbers, or another person’s information.</div></aside><section class="chat-panel" aria-label="Conversation with Luna"><div class="chat-panel-head"><div class="luna-avatar">${icon('moon')}</div><div><strong>Luna</strong><small>Credit education guide</small></div><span class="mode-pill" id="mode-pill">Template mode</span></div><div id="chat-messages" class="chat-messages" aria-live="polite"><div class="chat-message luna-message"><div class="message-avatar">${icon('moon')}</div><div class="message-content"><p>Hi, I’m Luna. I can help explain general credit concepts and organize questions to check. What would you like to understand?</p><small>Educational information only—not legal or financial advice.</small></div></div></div><form id="chat-form" class="chat-composer"><label class="sr-only" for="chat-input">Your question</label><textarea id="chat-input" rows="2" data-max="2000" placeholder="Ask a general question…" required></textarea><div class="composer-bottom"><span>Keep personal details private · 2,000 character limit</span><button type="submit" class="send-button" aria-label="Send message">${icon('arrow')}</button></div></form><p class="chat-disclaimer">Luna can make mistakes. Verify important information with official sources. No score or outcome is guaranteed.</p></section></div></section>`;
  document.querySelectorAll('.suggestion').forEach(button => button.addEventListener('click', () => {
    const input = document.querySelector('#chat-input');
    input.value = button.dataset.prompt;
    input.focus();
  }));
  document.querySelector('#chat-form').addEventListener('submit', sendChat);
}

function appendMessage(kind, text, extra = '') {
  const container = document.querySelector('#chat-messages');
  const node = document.createElement('div');
  node.className = `chat-message ${kind === 'user' ? 'user-message' : 'luna-message'}`;
  const avatar = document.createElement('div');
  avatar.className = kind === 'user' ? 'user-avatar' : 'message-avatar';
  avatar.textContent = kind === 'user' ? 'You' : '☾';
  const content = document.createElement('div');
  content.className = 'message-content';
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  content.append(paragraph);
  if (extra) {
    const note = document.createElement('small');
    note.textContent = extra;
    content.append(note);
  }
  node.append(avatar, content);
  container.append(node);
  container.scrollTop = container.scrollHeight;
}

async function sendChat(event) {
  event.preventDefault();
  const input = document.querySelector('#chat-input');
  const message = input.value.trim();
  if (!message || !withinLimits(event.currentTarget)) return;
  appendMessage('user', message);
  input.value = '';
  const button = document.querySelector('.send-button');
  button.disabled = true;
  const loading = document.createElement('div');
  loading.className = 'chat-loading';
  loading.textContent = 'Luna is gathering a clear answer…';
  document.querySelector('#chat-messages').append(loading);
  try {
    const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
    appendMessage('luna', data.reply, data.notice || (data.mode === 'template' ? 'Template mode · no AI provider connected' : 'AI response · review important information'));
    document.querySelector('#mode-pill').textContent = data.mode === 'template' ? 'Template mode' : 'AI connected';
  } catch (error) {
    appendMessage('luna', error.message || 'I couldn’t reach the chat service. Please try again later.');
  } finally {
    loading.remove();
    button.disabled = false;
    input.focus();
  }
}

const legalPages = {
  terms: {
    title: 'Terms of Use',
    intro: `These Terms of Use ("Terms") are between you and CREDITLUNA AI LLC ("CreditLuna," "we," "us"). By using creditluna.com or our educational self-help tools, you agree to these Terms and our <a href="#privacy">Privacy Policy</a>.`,
    sections: [
      ['1. The service', `CreditLuna helps you review your own credit reports, learn about credit rights, and prepare editable letters, complaint narratives, and case-tracker entries. There are no user accounts, payments, credit report pulls, or identity-verification services today. Letters and complaint drafts are generated in your browser; case-tracker entries are saved in your browser’s localStorage. CreditLuna does not receive these drafts or case entries. You review, edit, sign, and send each letter and file each complaint yourself. We never contact credit bureaus, furnishers, collectors, the CFPB, or the BBB on your behalf. <strong>CreditLuna is not a credit repair organization, a law firm, or a financial advisor. Nothing we produce is legal or financial advice.</strong>`],
      ['2. No guarantee of results', `No one can lawfully guarantee that an item will be removed from your credit report or that your score will improve. Under the Fair Credit Reporting Act (15 U.S.C. 1681 et seq.), you may dispute information you believe is inaccurate or incomplete; accurate negative information generally may remain for up to seven years, and bankruptcy information for up to ten years. You can dispute information yourself with credit bureaus for free. Our tools are an aid, not a promise of any result, response, or timing.`],
      ['3. Eligibility', `You must be at least 18 to use the service. We do not offer user accounts. Do not enter a full SSN or full account number. An optional letter field asks only for the last four of SSN, entered in your browser; the draft is not sent to CreditLuna.`],
      ['4. Automated content and your responsibility', `Letter templates, complaint drafts, case-tracker reminders, and chat responses may contain errors or omissions. Chat currently uses templates; it is not an individualized professional assessment. You are responsible for checking every fact, recipient address, citation, deadline, and draft before using it. You choose whether and how to sign and send a letter or file a complaint. Do not submit disputes you know to be false or claim identity theft without a truthful basis. Reminders are organizational check-ins, not legal deadlines.`],
      ['5. Intellectual property and acceptable use', `The site, its content, and its software are owned by CreditLuna or its licensors. You may use them for your own personal, non-commercial purposes. Do not scrape, resell, reverse engineer, interfere with the service, violate anyone’s rights, or use the service to break the law. Your own facts and the letters you draft remain yours to review and use.`],
      ['6. Disclaimers and limitation of liability', `The service is provided “as is” and “as available,” without warranties to the fullest extent permitted by law. To the fullest extent permitted by law, CREDITLUNA AI LLC is not liable for indirect, incidental, special, or consequential damages. Our total liability for claims arising from the service is limited to $100. This provision does not limit liability that cannot legally be limited; have qualified counsel review these terms before launch.`],
      ['7. Affiliate links', `The Build credit page includes a link to a Credit Builder Card partner. CreditLuna may earn a commission if you apply through that link, at no extra cost to you. The partner operates its own site and decides its product terms. Review the partner’s disclosures before applying; no approval or credit-score outcome is guaranteed.`],
      ['8. Changes to these Terms', `We may update these Terms as our tools change. We will update the “Last updated” date shown above. Review the current version when you use the service; continued use after an update means you accept the revised Terms, to the extent permitted by law.`],
      ['9. Governing law and contact', `These Terms are governed by the laws of [governing state], without regard to conflict-of-law rules, except where applicable law requires otherwise. Questions: contact@creditluna.com. Mailing address: [mailing address].`]
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    intro: `This Privacy Policy explains how CREDITLUNA AI LLC ("CreditLuna," "we," "us") handles information in today’s educational self-help tools at creditluna.com.`,
    sections: [
      ['Information in your browser', `You enter your own information to generate editable letters and complaint narratives in your browser. A letter may include your name, mailing address, date of birth, and the optional last four of SSN; do not enter a full SSN or full account number. The case tracker saves case details, dates, any prior-dispute history you enter, and a copy of each generated letter or complaint draft (including your edits) in localStorage on your device, not on CreditLuna servers. You can also copy, print, or download drafts. We do not pull credit reports, verify identities, or receive these draft fields or case-tracker entries. There are no user accounts or payments today.`],
      ['Chat messages', `Ask Luna uses a third-party AI model to generate answers. When you send a message in chat, it is sent through CreditLuna’s server to an AI provider so a response can be produced. CreditLuna does not keep chat history on its own server, but the AI provider may process or retain messages under its own terms [counsel to confirm provider retention terms]. Our hosting setup may also briefly keep your IP address in memory to limit message volume. Please do not type your SSN, full account numbers, dates of birth or other sensitive details into chat. Answers are general education, may contain errors, and are not legal or financial advice.`],
      ['Hosting logs and use', `Our hosting provider handles basic server logs, such as IP address and browser information, when you access the site or send a chat message. This information is used to deliver, maintain, and protect the site. We do not have a user-account record to link to your browser-only case data. Hosting-log retention depends on the provider’s settings; contact us with questions about the current period.`],
      ['Sharing and affiliate link', `We do not send your browser-generated letters, complaint drafts, or locally stored case entries to CreditLuna servers, bureaus, furnishers, collectors, the CFPB, or the BBB. Our hosting provider processes the information needed to serve the site and basic request logs. The Build credit page links to an independent Credit Builder Card partner, and CreditLuna may earn a commission if you apply through it. When you follow that link, you leave our site; the partner’s own privacy policy applies to information you give them.`],
      ['Your choices and retention', `You can edit, copy, print, or download a draft while it is open. You can export or delete case-tracker entries using the tracker controls, or clear this site’s localStorage through your browser settings. Clearing browser data or using a different device may erase your locally saved cases. We do not keep a server-side copy to recover them. You can ask about hosting logs at contact@creditluna.com.`],
      ['Children', `The service is intended for people 18 and older. We do not knowingly collect information from children under 18. If we learn a child has sent us information, contact contact@creditluna.com so we can review it.`],
      ['Security', `We limit the personal data handled by our servers by keeping drafts and case entries in your browser. Your device and browser settings affect the security of information stored locally. Do not use a shared device for sensitive drafts, and avoid entering full identifiers in chat. No method of storage or transmission is perfectly secure.`],
      ['Planned features', `[Planned features: accounts, payments, and credit report uploads are not available today. We will update this policy before any of these features launch.]`],
      ['Changes and contact', `We may update this policy as the product changes and will revise the “Last updated” date above. Privacy questions: contact@creditluna.com. General support: contact@creditluna.com. Mailing address: [mailing address].`]
    ]
  },
  disclaimer: { title: 'Important Disclaimer', intro: 'CreditLuna is designed as a self-directed educational and organizational tool.', sections: [['Not credit repair', 'CreditLuna does not perform credit repair, contact credit bureaus, creditors, furnishers, or collectors, or submit disputes for you. You review, verify, edit, sign, and send any letter yourself.'], ['Not professional advice', 'Information and letter drafts are educational self-help materials, not legal, financial, tax, lending, or individualized professional advice. A draft is not a legal conclusion and may not fit your circumstances.'], ['No guarantees', 'No credit-score increase, deletion, approval, investigation outcome, response, or timing is guaranteed. A 30-day follow-up reminder is an organizational check-in only, not a determination of a legal deadline.'], ['Use care', 'Only dispute information you believe is inaccurate or incomplete and can explain. Accurate, current negative information is not automatically removable. Verify facts and current processes with official sources. Consider a qualified attorney or nonprofit counselor for complex or urgent matters.']] }
};

const trustPages = {
  about: {
    title: 'About CreditLuna',
    intro: 'The CreditLuna team builds educational, do-it-yourself tools to help you understand credit information and organize your own next steps.',
    sections: [
      ['What we make', 'CreditLuna offers letter builders, a case tracker, complaint builders, a utilization calculator, plain-language guides, and Luna chat. You review your own information and choose what to do with it.'],
      ['What we do not do', 'CreditLuna is not a credit repair organization, a law firm, or a financial advisor. We do not contact credit bureaus, creditors, furnishers, or debt collectors for you. We do not promise a score change, removal, or any other outcome. Our tools are self-directed; this description is not a legal determination about the business.'],
      ['Who it is for', 'For people who want to learn about their own credit reports, compare reported details with their own records, draft their own correspondence, and keep track of their own actions.'],
      ['Read the sources yourself', 'Start with official guidance from the <a href="https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/">CFPB</a> and <a href="https://www.ftc.gov/">FTC</a>; for statutory text, see <a href="https://www.law.cornell.edu/uscode/text/15/1681i">Cornell LII’s FCRA text</a>. Check the current source before relying on any summary.'],
      ['How we make content', 'Our guides cite official sources. Content is pending attorney review, and drafts are reviewed before publishing. That review is not a substitute for advice about your situation.']
    ],
    contact: 'Operated by CREDITLUNA AI LLC. Questions? <a href="mailto:contact@creditluna.com">contact@creditluna.com</a>.'
  },
  limits: {
    title: 'How Luna AI works and its limits',
    intro: 'Luna is an AI assistant for general credit education, not an adviser for your individual situation.',
    sections: [
      ['What Luna can and cannot do', 'Luna explains general concepts, but answers can be wrong or out of date. They are not legal or financial advice. Luna cannot access your saved letters, case tracker, or documents; it only receives the text you type in chat. Luna will not promise outcomes, mail anything for you, or tell you to dispute information you know is accurate.'],
      ['What happens when you send a message', 'Ask Luna uses a third-party AI model to generate answers. When you send a message in chat, it is sent through CreditLuna’s server to an AI provider so a response can be produced. CreditLuna does not keep chat history on its own server, but the AI provider may process or retain messages under its own terms [counsel to confirm provider retention terms]. Our hosting setup may also briefly keep your IP address in memory to limit message volume. Please do not type your SSN, full account numbers, dates of birth or other sensitive details into chat. Answers are general education, may contain errors, and are not legal or financial advice.'],
      ['Why there are usage limits', 'Message limits per period help keep the service available. If the AI provider is unavailable or the daily AI limit is reached, Luna may return a general template answer instead.'],
      ['Verify an answer', 'Open the linked official sources rather than relying on Luna alone. Check the <a href="https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/">CFPB credit-report guides</a>, <a href="https://www.ftc.gov/">FTC</a>, or <a href="https://www.law.cornell.edu/uscode/text/15/1681i">FCRA text at Cornell LII</a>. For urgent or individual legal questions, speak to a licensed attorney or legal aid.']
    ]
  },
  faq: {
    title: 'FAQ',
    intro: 'Short answers about our self-directed tools. Check the linked sources for current rules.',
    sections: [
      ['Is this credit repair?', 'No credit repair service is offered here. CreditLuna provides self-directed education and tools, not disputes filed on your behalf. This is a description of the current product, not a legal classification; <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-credit-counseling-and-debt-settlement-debt-consolidation-or-credit-repair-en-1449/">read the CFPB’s comparison</a>.'],
      ['Do you send letters for me?', 'No. You review, edit, sign, and send your own drafts.'],
      ['Is it free?', 'The current tools are free; paid plans shown on the site are planning hypotheses, not available subscriptions.'],
      ['Where is my data stored?', 'Letters and complaint drafts, case tracker entries, and calculator numbers stay in this browser, not in a CreditLuna account. For chat, when you send a message in chat, it is sent through CreditLuna’s server to an AI provider so a response can be produced. CreditLuna does not keep chat history on its own server, but the AI provider may process or retain messages under its own terms [counsel to confirm provider retention terms]. See <a href="#privacy">Privacy</a>.'],
      ['Do I need an account?', 'No account is needed for the current tools.'],
      ['Will this raise my score?', 'No score change is promised. These tools help you learn and organize; results depend on your own situation.'],
      ['Can I dispute accurate items?', 'Do not dispute an item you know is accurate simply because it is negative. If an otherwise accurate item appears multiple times, that duplication can be disputed. <a href="https://www.consumerfinance.gov/ask-cfpb/is-it-possible-to-remove-accurate-negative-information-from-my-credit-report-en-1249/">See the CFPB explanation</a>.'],
      ['How long do credit bureaus have to respond?', 'Under the FCRA, a credit reporting company generally must investigate a dispute within 30 days of receiving it; extension rules exist, including some cases allowing up to 45 days. It generally has five business days after completing the investigation to notify you of the results. <a href="https://www.consumerfinance.gov/ask-cfpb/how-long-does-it-take-to-repair-an-error-on-a-credit-report-en-1339/">Check the CFPB timeline</a> and <a href="https://www.law.cornell.edu/uscode/text/15/1681i">the statute</a> for the details.'],
      ['What is a furnisher, bureau, or collector?', 'A furnisher provides information to consumer reporting companies; a bureau assembles consumer reports; a debt collector generally collects debts owed to others. Roles can overlap. See the <a href="https://www.consumerfinance.gov/rules-policy/regulations/1022/41/">furnisher definition</a>, <a href="https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/consumer-reporting-companies/">reporting companies</a>, and <a href="https://www.consumerfinance.gov/consumer-tools/debt-collection/answers/key-terms/">collector terms</a>.'],
      ['What if I get sued?', 'Do not ignore a court summons. Read the papers and respond by the required deadline; speak to a licensed attorney or local legal aid for help. <a href="https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-im-sued-by-a-debt-collector-or-creditor-en-334/">See CFPB guidance</a>.'],
      ['Who is behind this?', 'The CreditLuna team. The service is operated by CREDITLUNA AI LLC. <a href="#about">Read about us</a>.'],
      ['How do I contact you?', 'Email <a href="mailto:contact@creditluna.com">contact@creditluna.com</a>.']
    ]
  }
};

function renderTrust(page) {
  const data = trustPages[page];
  main.innerHTML = `<section class="page-hero shell legal-hero"><div class="eyebrow">The important details</div><h1>${data.title}</h1><p>${data.intro}</p></section><section class="section section-soft"><div class="shell legal-content">${data.sections.map(([title, text]) => `<article><h2>${title}</h2><p>${text}</p></article>`).join('')}${data.contact ? `<div class="legal-contact">${data.contact}</div>` : ''}<p class="trust-disclaimer">Educational information, not legal advice.</p></div></section>`;
}

function renderLegal(page) {
  const data = legalPages[page] || legalPages.disclaimer;
  const draft = page === 'terms' || page === 'privacy';
  main.innerHTML = `<section class="page-hero shell legal-hero">${draft ? '<p class="legal-draft-note">[DRAFT: pending attorney review.]</p>' : ''}<div class="eyebrow">The important details</div><h1>${data.title}</h1>${draft ? '<div class="legal-updated">Last updated: October 22, 2026</div>' : ''}<p>${data.intro}</p>${draft ? '<div class="stub-badge">Draft pending attorney review</div>' : ''}</section><section class="section section-soft"><div class="shell legal-content">${data.sections.map(([title, text]) => `<article><h2>${title}</h2><p>${text}</p></article>`).join('')}${draft ? '<div class="legal-contact"><strong>Questions?</strong><p>Contact contact@creditluna.com or write to [mailing address]. These drafts are pending attorney review.</p></div>' : '<div class="legal-contact"><strong>Questions about the prototype?</strong><p>Use <a href="#chat">Ask Luna</a> for general product questions. The chat cannot give legal advice or support individual disputes.</p></div>'}</div></section>`;
}

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});
window.addEventListener('hashchange', route);
document.querySelector('#year').textContent = new Date().getFullYear();

// COUNSEL REVIEW REQUIRED: verify all complaint, process, timeline and ladder wording before release.
const COPY = Object.freeze({
  cfpbIntro: "When a company won't fix the problem: file a CFPB complaint. The Consumer Financial Protection Bureau forwards your complaint directly to the company, which generally responds in 15 days (in some cases a company says its response is in progress and gives a final response within 60 days), and may provide a response through the CFPB process. Results vary. CreditLuna helps you write a clear, complete complaint: what happened, when, what you've already tried, and what a fair resolution looks like. Then YOU file it - we never submit anything on your behalf. You'll copy your complaint into the CFPB's secure form at consumerfinance.gov/complaint and check the box here to confirm you filed it.",
  bbbIntro: "You can also file a complaint with the Better Business Bureau. BBB complaints are forwarded to the company, and a company's BBB profile may show how it handled complaints. Response times and results vary, and a BBB complaint does not guarantee any outcome. Like the CFPB path, you write it here, then YOU file it at bbb.org. We never submit anything for you.",
  prompts: Object.freeze([
    'Which company is this complaint about? (bank, credit bureau, debt collector, or other financial company)',
    'What happened? Include dates, dollar amounts, and account numbers (partial, e.g. ending in 0151).',
    'What have you already done? (disputes sent, dates, any responses received)',
    'What would a fair resolution look like to you?'
  ]),
  cfpbAcknowledgment: 'I filed this complaint myself at consumerfinance.gov/complaint on [date].',
  bbbAcknowledgment: 'I filed this complaint myself at bbb.org on [date].',
  sentAcknowledgment: 'I sent/filed this myself on [date] and I attach or note my proof of mailing (certified mail number, or filing confirmation).',
  cfpbNote: 'The CFPB may publish your complaint narrative in its public complaint database (personal details removed). You can opt out when you file.',
  bbbNote: "The BBB is a private organization, not a government agency. Its complaints don't create legal obligations, but companies often respond to protect their public profile.",
  trackerIntro: "Your case, at a glance. Every item moves through four stages - drafted, sent, response, resolved - and only you move it. CreditLuna never sends anything, so a document only counts as 'sent' when you say you sent it. Estimated response windows and reminders are based on dates you enter, not legal deadlines.",
  noResponse: "No response logged yet - it's been [N] days. If your expected response window has passed, you may consider: [follow-up letter / escalation complaint].",
  ladderTeaser: "Some credit reporting concerns may be resolved through a dispute. If yours isn't, consider further steps and keep records of what you've done.",
  ladder: `Some credit reporting concerns may be resolved through a dispute. If yours isn't, consider further steps and keep records of what you've done.
Step 1: Dispute information you believe is inaccurate or incomplete with the credit bureaus. Generally, a bureau investigates within 30 days, with some exceptions or extensions; check current official guidance for your circumstances.
Step 2: Consider following up with the furnisher or requesting a description of the bureau's verification procedure, if applicable. Review the response and any relevant records before deciding what to do next.
Step 3: Consider filing a CFPB complaint (and optionally a BBB complaint). The CFPB generally forwards complaints to companies, which generally respond within about 15 days and may take longer in some cases. Include your documented timeline when you file. Results vary and nothing is guaranteed.
Step 4: If you suspect a legal violation or substantial harm, consider speaking with a qualified consumer protection attorney about your options and any fees. Your records may help them assess your situation; representation is not guaranteed.
CreditLuna gives you the tools and the paper trail for every step. What you do with them is always your call.`,
  privacy: 'Your case data stays in this browser on this device; nothing is sent to CreditLuna servers',
  timerLabel: 'typical response windows',
  timerDisclaimer: 'Timers are reminders from dates you enter, not legal deadlines.',
  fileStep: 'CreditLuna does not submit complaints. Copy your edited narrative, then use the official website yourself.',
  complaintFacts: 'Use your own records and edit before filing.',
  browserNote: "Your complaint draft is created in your browser. A copy is saved with its case in this browser's local storage so you can print or download all drafts later; nothing is sent to CreditLuna servers.",
  privacyDrafts: 'That includes the full text of each letter or complaint draft you create (which can contain your name, address and other details you typed) and any prior-dispute history you enter. Use "Delete all my case data" to remove it.',
  draftsExport: 'Bundle the drafts saved in this browser into one printable page (use Print, then "Save as PDF" in your browser) or one combined .txt file. Only drafts stored on this device are included.',
  reuseNote: 'CreditLuna only reuses what you typed into your Case Tracker. It never invents dates, outcomes, or facts; anything you did not enter shows as [not provided].',
  timelineReview: 'Check every line before you file; edit anything that is wrong.',
  timeline: Object.freeze({
    sent: 'On [date] I sent a [type] to [recipient] about [item] by [method].',
    filed: 'On [date] I filed a [type] about [recipient] through [method].',
    prior: 'Before my [type] to [recipient], I had already disputed [item] on [dates] by [method]. Response: [response] (date: [date]).',
    proof: 'Proof of mailing or filing: [proof].',
    response: 'On [date] I received a response: [outcome].',
    note: 'Note: [note].',
    notProvided: '[not provided]'
  })
});

const CASE_STORAGE_KEY = 'creditluna-cases-v1';
const complaintChannels = Object.freeze({
  cfpb: { name: 'CFPB', url: 'https://www.consumerfinance.gov/complaint/', intro: 'cfpbIntro', note: 'cfpbNote', acknowledgment: 'cfpbAcknowledgment' },
  bbb: { name: 'BBB', url: 'https://www.bbb.org/', intro: 'bbbIntro', note: 'bbbNote', acknowledgment: 'bbbAcknowledgment' }
});
let activeComplaintId = null;
let activeComplaintCompany = '';
const CASE_TYPE_LABELS = Object.freeze({ bureau: 'bureau dispute letter', validation: 'debt validation request', goodwill: 'goodwill request', paydelete: 'pay-for-delete inquiry', cfpb: 'CFPB complaint', bbb: 'BBB complaint' });
const PRIOR_RESPONSE_LABELS = Object.freeze({ verified: 'verified', deleted: 'deleted', updated: 'updated', none: 'no response received', other: 'other' });
const REASON_TYPE_LABELS = Object.freeze({ other: 'Other', delinquency: 'Date of first delinquency missing or wrong', balance: 'Wrong balance', status: 'Status reported wrong', duplicate: 'Duplicate tradeline', notmine: 'Item not mine' });

function caseTypeLabel(type) {
  return CASE_TYPE_LABELS[type] || String(type || 'item');
}

function provided(value) {
  return cleanText(value) || COPY.timeline.notProvided;
}

function timelineDate(value) {
  return validDate(value) ? formatDate(value) : COPY.timeline.notProvided;
}

function responseLogged(item) {
  return item.stage === 'Response' || item.stage === 'Resolved' || Boolean(cleanText(item.outcome)) || Boolean(cleanText(item.responseNote));
}

// Timeline lines are built only from fields stored on the user's own tracker items.
function timelineEntry(item) {
  const text = COPY.timeline;
  const lines = [];
  const type = caseTypeLabel(item.type);
  if (item.priorDisputed === 'yes') {
    const dates = [item.priorDate, item.priorDate2].filter(validDate).map(formatDate);
    let prior = fill(text.prior, { type, recipient: provided(item.company), item: provided(item.item), dates: dates.length ? dates.join(' and ') : text.notProvided, method: provided(item.priorMethod), response: provided(PRIOR_RESPONSE_LABELS[item.priorResponse]), date: timelineDate(item.priorResponseDate) });
    if (cleanText(item.priorProof)) prior += ` ${fill(text.proof, { proof: cleanText(item.priorProof) })}`;
    if (cleanText(item.priorNote)) prior += ` ${fill(text.note, { note: cleanText(item.priorNote) })}`;
    lines.push(prior);
  }
  const complaint = item.type === 'cfpb' || item.type === 'bbb';
  let entry = fill(complaint ? text.filed : text.sent, { date: timelineDate(item.sentDate), type, recipient: provided(item.company), item: provided(item.item), method: provided(item.method && item.method.toLowerCase()) });
  if (cleanText(item.proof)) entry += ` ${fill(text.proof, { proof: cleanText(item.proof) })}`;
  if (responseLogged(item)) {
    entry += ` ${fill(text.response, { date: timelineDate(item.responseReceivedDate), outcome: provided(item.outcome && item.outcome.toLowerCase()) })}`;
    if (cleanText(item.responseNote)) entry += ` ${fill(text.note, { note: cleanText(item.responseNote) })}`;
  }
  lines.push(entry);
  return lines;
}

function buildTimeline(cases, selectedIds) {
  const sortKey = item => (validDate(item.sentDate) ? item.sentDate : item.createdDate || '');
  return cases.filter(item => selectedIds.includes(item.id)).sort((a, b) => sortKey(a).localeCompare(sortKey(b))).flatMap(timelineEntry).join('\n');
}

function caseSummary(item) {
  const parts = [`Created ${item.createdDate || 'date not recorded'}`, item.sentDate ? `Sent ${item.sentDate}` : 'Not marked sent'];
  if (responseLogged(item)) parts.push(`Response logged: ${item.outcome || 'outcome not specified'}${item.responseReceivedDate ? ` (received ${item.responseReceivedDate})` : ''}`);
  else parts.push('No response logged');
  if (item.priorDisputed === 'yes') parts.push('Prior dispute history entered');
  return parts.join(' · ');
}

function savedDrafts(cases) {
  return cases.filter(item => typeof item.draftText === 'string' && item.draftText.trim());
}

function combinedDraftsText(drafts) {
  return drafts.map((item, index) => `===== Draft ${index + 1} of ${drafts.length} · ${caseTypeLabel(item.type)} · ${item.company || '[recipient not provided]'} · created ${item.createdDate || '[date not recorded]'} =====\n\n${item.draftText.trim()}\n`).join('\n\n');
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T12:00:00`)) && new Date(`${value}T12:00:00`).toISOString().slice(0, 10) === value;
}

function readCases() {
  try {
    const data = JSON.parse(localStorage.getItem(CASE_STORAGE_KEY) || '[]');
    return Array.isArray(data) ? data.filter(item => item && typeof item === 'object' && typeof item.id === 'string') : [];
  } catch {
    return [];
  }
}

function saveCases(cases) {
  try {
    localStorage.setItem(CASE_STORAGE_KEY, JSON.stringify(cases));
    return true;
  } catch {
    const status = document.querySelector('#case-storage-status');
    if (status) status.textContent = 'Browser storage unavailable. Your changes could not be saved. Export or copy your work before leaving.';
    return false;
  }
}

function addCase(details) {
  const item = { id: crypto.randomUUID(), ...details, stage: 'Drafted', sentDate: null, method: '', proof: '', responseDate: null, responseReceivedDate: null, outcome: '', responseNote: '', resolvedDate: null };
  if (!saveCases([...readCases(), item])) return null;
  return item.id;
}

function updateCase(id, changes) {
  const cases = readCases();
  const index = cases.findIndex(item => item.id === id);
  if (index < 0) return false;
  cases[index] = { ...cases[index], ...changes };
  return saveCases(cases);
}

function downloadText(contents, filename, type) {
  const blob = new Blob([contents], { type });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function ladderSection() {
  return `<section class="section section-soft"><div class="shell ladder-section"><div class="eyebrow">Your next steps</div><h2>The escalation ladder</h2><p class="ladder-copy">${escapeHTML(COPY.ladder)}</p><div class="result-actions"><a class="button button-outline" href="#letters">Letter workspace</a><a class="button button-outline" href="#cfpb">CFPB complaint builder</a><a class="button button-outline" href="#bbb">BBB complaint builder</a><a class="button button-outline" href="#tracker">Case tracker</a></div></div></section>`;
}

function historyPicker(cases) {
  const options = cases.length
    ? `<fieldset class="history-options"><legend class="field-label">Pick items from your Case Tracker to build a timeline</legend>${cases.map(item => `<label class="history-option"><input type="checkbox" name="historyItem" value="${escapeHTML(item.id)}"><span><strong>${escapeHTML(caseTypeLabel(item.type))} · ${escapeHTML(item.company || COPY.timeline.notProvided)}</strong><small>${escapeHTML(caseSummary(item))}</small></span></label>`).join('')}</fieldset>`
    : '<p class="field-help">No Case Tracker items in this browser yet. Type what you have done below, or <a href="#letters">create a letter</a> first.</p>';
  return `<div class="history-picker" id="history-picker"><p class="reuse-note">${escapeHTML(COPY.reuseNote)}</p>${options}<label class="field-label spaced-label" for="complaint-timeline">Timeline from your selected items <span class="optional">editable</span></label><textarea id="complaint-timeline" name="timeline" data-max="6000" rows="6" placeholder="Select items above to build a timeline from what you entered."></textarea><div class="history-tools"><button type="button" class="text-link" id="rebuild-timeline">Rebuild timeline from selected items</button><span id="timeline-status" role="status" aria-live="polite"></span></div><label class="review-consent review-step" id="timeline-review-wrap" hidden><input id="timeline-review" name="timelineReview" type="checkbox"><span><strong>Review step:</strong> ${escapeHTML(COPY.timelineReview)} I checked each line of this timeline.</span></label></div><label class="field-label spaced-label" for="complaint-2">Anything else you have done <span class="optional">in your own words</span></label>`;
}

function renderEscalate(channelName) {
  const channel = complaintChannels[channelName];
  activeComplaintId = null;
  activeComplaintCompany = '';
  const cases = readCases();
  main.innerHTML = `<section class="letter-page shell"><div class="letter-intro"><div class="eyebrow">A self-directed next step</div><h1>Write your complaint.<br><em>File it yourself.</em></h1><p>${escapeHTML(COPY[channel.intro])}</p></div>
    <div class="channel-tabs" aria-label="Complaint channels"><a href="#cfpb" class="button ${channelName === 'cfpb' ? 'button-ink' : 'button-outline'}" ${channelName === 'cfpb' ? 'aria-current="page"' : ''}>CFPB complaint</a><a href="#bbb" class="button ${channelName === 'bbb' ? 'button-ink' : 'button-outline'}" ${channelName === 'bbb' ? 'aria-current="page"' : ''}>BBB complaint</a></div>
    <div class="letter-workspace"><form class="letter-form" id="complaint-form"><div class="form-section-head"><span class="form-step">01</span><div><h2>Your facts</h2><p>${escapeHTML(COPY.complaintFacts)}</p></div></div>
    ${COPY.prompts.map((prompt, i) => i === 2 ? `<p class="field-label spaced-label">${escapeHTML(prompt)}</p>${historyPicker(cases)}<textarea id="complaint-2" name="answer2" required data-max="4000" rows="4"></textarea>` : `<label class="field-label spaced-label" for="complaint-${i}">${escapeHTML(prompt)}</label>${i === 0 ? `<input id="complaint-${i}" name="answer${i}" required data-max="200" autocomplete="off">` : `<textarea id="complaint-${i}" name="answer${i}" required data-max="4000" rows="${i === 1 ? 6 : 4}"></textarea>`}`).join('')}
    <button type="submit" class="button button-ink form-submit spaced-label">Create editable complaint</button></form><aside class="letter-side"><div class="side-note"><h3>You file this yourself.</h3><p>${escapeHTML(COPY[channel.note])}</p></div><div class="side-note side-note-outline"><h3>Keep your record</h3><p>${escapeHTML(COPY.privacy)}. ${escapeHTML(COPY.browserNote)}</p></div></aside></div>
    <div id="complaint-result" class="letter-result" hidden><div class="eyebrow">Your draft</div><h2>Review and edit before filing</h2><p class="review-step-note"><strong>Review step:</strong> ${escapeHTML(COPY.timelineReview)} ${escapeHTML(COPY.reuseNote)}</p><label class="field-label spaced-label" for="complaint-text">Editable complaint narrative</label><div class="letter-preview"><textarea id="complaint-text" spellcheck="true"></textarea></div><div class="result-actions"><button type="button" id="copy-complaint" class="button button-outline">Copy text</button><button type="button" id="download-complaint" class="button button-outline">Download .txt</button></div>
    <div class="file-step"><h3>File it yourself</h3><p>${escapeHTML(COPY.fileStep)}</p><a class="button button-ink" href="${channel.url}" target="_blank" rel="noopener noreferrer">Open ${channel.name} website ↗</a></div>
    <form id="complaint-ack-form" class="ack-form"><label class="field-label" for="complaint-file-date">Filing date</label><input id="complaint-file-date" type="date" required max="${todayISO()}"><label class="field-label spaced-label" for="complaint-proof">Filing confirmation (optional)</label><input id="complaint-proof" data-max="180" placeholder="Confirmation number or note"><label class="review-consent" for="complaint-ack"><input id="complaint-ack" type="checkbox" required><span>${escapeHTML(COPY[channel.acknowledgment])}</span></label><button class="button button-outline" type="submit">Record my filing in case tracker</button><p id="complaint-ack-status" role="status" aria-live="polite"></p></form></div></section>${ladderSection()}`;
  const timeline = document.querySelector('#complaint-timeline');
  const timelineStatus = document.querySelector('#timeline-status');
  let timelineEdited = false;
  const selectedIds = () => [...document.querySelectorAll('input[name="historyItem"]:checked')].map(box => box.value);
  const syncTimelineReview = () => {
    const hasTimeline = Boolean(timeline.value.trim());
    document.querySelector('#timeline-review-wrap').hidden = !hasTimeline;
    document.querySelector('#timeline-review').required = hasTimeline;
    if (!hasTimeline) document.querySelector('#timeline-review').checked = false;
    document.querySelector('#complaint-2').required = !hasTimeline;
  };
  const rebuildTimeline = () => {
    timeline.value = buildTimeline(readCases(), selectedIds());
    timelineEdited = false;
    document.querySelector('#timeline-review').checked = false;
    timeline.dispatchEvent(new Event('change'));
    timelineStatus.textContent = timeline.value ? 'Timeline rebuilt from your selected items. Review each line.' : '';
    syncTimelineReview();
  };
  document.querySelectorAll('input[name="historyItem"]').forEach(box => box.addEventListener('change', () => {
    if (timelineEdited && timeline.value.trim()) {
      timelineStatus.textContent = 'You edited the timeline, so it was not replaced. Use "Rebuild timeline from selected items" to update it from your selections.';
      return;
    }
    rebuildTimeline();
  }));
  document.querySelector('#rebuild-timeline').addEventListener('click', () => {
    if (timelineEdited && timeline.value.trim() && !confirm('Rebuild the timeline from your selected items? Your edits in the timeline box will be replaced.')) return;
    rebuildTimeline();
  });
  timeline.addEventListener('input', () => {
    timelineEdited = true;
    document.querySelector('#timeline-review').checked = false;
    syncTimelineReview();
  });
  syncTimelineReview();
  document.querySelector('#complaint-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    syncTimelineReview();
    if (!withinLimits(form) || !form.reportValidity()) return;
    const values = [...Array(4)].map((_, i) => form.elements[`answer${i}`].value.trim());
    values[2] = [form.elements.timeline.value.trim(), values[2]].filter(Boolean).join('\n\n');
    const narrative = `${COPY.prompts.map((prompt, i) => `${prompt}\n${values[i]}`).join('\n\n')}`;
    const result = document.querySelector('#complaint-result');
    result.hidden = false;
    result.querySelector('#complaint-text').value = narrative;
    activeComplaintCompany = values[0];
    activeComplaintId = addCase({ type: channelName, company: values[0], createdDate: todayISO(), sourceCaseIds: selectedIds(), draftText: narrative });
    result.querySelector('#complaint-ack-status').textContent = activeComplaintId ? 'Draft added to your case tracker.' : 'Browser storage unavailable; draft was not saved.';
    result.scrollIntoView({ behavior: 'smooth' });
  });
  let complaintSaveTimer = null;
  document.querySelector('#complaint-text').addEventListener('input', event => {
    if (!activeComplaintId) return;
    const id = activeComplaintId;
    const text = event.currentTarget.value;
    clearTimeout(complaintSaveTimer);
    complaintSaveTimer = setTimeout(() => updateCase(id, { draftText: text }), 400);
  });
  document.querySelector('#copy-complaint').addEventListener('click', async event => {
    try { await navigator.clipboard.writeText(document.querySelector('#complaint-text').value); event.currentTarget.textContent = 'Copied'; }
    catch { event.currentTarget.textContent = 'Copy not available'; }
  });
  document.querySelector('#download-complaint').addEventListener('click', () => downloadText(document.querySelector('#complaint-text').value, draftFilename(channelName, activeComplaintCompany), 'text/plain;charset=utf-8'));
  document.querySelector('#complaint-ack-form').addEventListener('submit', event => {
    event.preventDefault();
    const date = document.querySelector('#complaint-file-date').value;
    if (!withinLimits(event.currentTarget) || !event.currentTarget.reportValidity() || !validDate(date) || date > todayISO()) return;
    const status = document.querySelector('#complaint-ack-status');
    if (!activeComplaintId) { status.textContent = 'Draft was not saved; enable browser storage and create it again before recording.'; return; }
    if (updateCase(activeComplaintId, { stage: 'Sent', sentDate: date, method: `${channel.name} website`, proof: document.querySelector('#complaint-proof').value.trim() })) {
      status.innerHTML = 'Your filing date was recorded. <a href="#tracker">View case tracker</a>';
      event.currentTarget.querySelector('button[type="submit"]').disabled = true;
    }
  });
}

function responseWindow(type) {
  if (type === 'cfpb') return 15;
  if (type === 'bureau' || type === 'validation') return 30;
  return null;
}

function renderTimer(item) {
  const windowDays = responseWindow(item.type);
  if (!item.sentDate || !validDate(item.sentDate) || !windowDays || item.responseDate || item.stage === 'Resolved') return '';
  const elapsed = Math.max(0, Math.floor((new Date(`${todayISO()}T12:00:00`) - new Date(`${item.sentDate}T12:00:00`)) / 86400000));
  if (elapsed > windowDays) {
    const suggestion = item.type === 'cfpb' ? '<a href="#letters">follow-up letter</a>' : '<a href="#cfpb">escalation complaint</a>';
    return `<p class="timer-nudge">${COPY.noResponse.replace('[N]', String(elapsed)).replace('[follow-up letter / escalation complaint]', suggestion)}</p>`;
  }
  return `<p class="timer-countdown">${windowDays - elapsed} days remaining in ${windowDays}-day ${COPY.timerLabel} (from your entered sent date).</p>`;
}

function caseFacts(item) {
  const facts = [];
  if (item.recipientKind) facts.push(['Recipient type', item.recipientKind]);
  if (item.item) facts.push(['Account or item', item.item]);
  if (item.reasonType) facts.push(['Reason type', REASON_TYPE_LABELS[item.reasonType] || item.reasonType]);
  if (item.correctDelinquency) facts.push(['Correct month/year', item.correctDelinquency]);
  if (item.balanceRequest) facts.push(['Balance request', item.balanceRequest === 'verify and explain' ? 'Verify and explain' : `Correct to $${item.balanceRequest}`]);
  if (item.plannedSendDate) facts.push(['Planned send date', item.plannedSendDate]);
  if (item.priorDisputed === 'yes') facts.push(['Prior dispute', item.priorSentence || 'Yes']);
  return facts.length ? `<dl class="case-facts">${facts.map(([label, value]) => `<dt>${escapeHTML(label)}</dt><dd>${escapeHTML(value)}</dd>`).join('')}</dl>` : '';
}

function renderTracker() {
  const cases = readCases();
  const drafts = savedDrafts(cases);
  const missingDrafts = cases.length - drafts.length;
  main.innerHTML = `<section class="letter-page shell tracker-page"><div class="letter-intro"><div class="eyebrow">Your own paper trail</div><h1>Case tracker</h1><p>${escapeHTML(COPY.trackerIntro)}</p><p class="privacy-chip">${escapeHTML(COPY.privacy)}. ${escapeHTML(COPY.privacyDrafts)}</p><p>${escapeHTML(COPY.timerDisclaimer)}</p></div>
  <div class="result-actions tracker-actions"><button type="button" id="export-cases" class="button button-outline">Export case data (JSON)</button><button type="button" id="delete-cases" class="button button-outline danger">Delete all my case data</button></div><p id="case-storage-status" role="status" aria-live="polite"></p>
  <section class="drafts-export" aria-labelledby="drafts-export-title"><h2 id="drafts-export-title">Download all drafts</h2><p>${escapeHTML(COPY.draftsExport)}</p><p class="case-meta">${drafts.length} saved draft${drafts.length === 1 ? '' : 's'} in this browser.${missingDrafts ? ` ${missingDrafts} older item${missingDrafts === 1 ? ' has' : 's have'} no saved draft text (created before drafts were saved).` : ''}</p><div class="result-actions">${drafts.length ? '<a class="button button-ink" href="#drafts" id="open-drafts-print">Printable view (Save as PDF)</a>' : '<span class="button button-muted" aria-disabled="true">Printable view (Save as PDF)</span>'}<button type="button" id="download-all-drafts" class="button button-outline" ${drafts.length ? '' : 'disabled'}>Download all drafts (.txt)</button></div></section>
  ${cases.length ? `<div class="case-list">${cases.map(item => {
    const stage = ['Drafted', 'Sent', 'Response', 'Resolved'].includes(item.stage) ? item.stage : 'Drafted';
    return `<article class="case-card" data-case-id="${escapeHTML(item.id)}"><div class="case-top"><div><span class="eyebrow">${escapeHTML(item.type)} · Created ${escapeHTML(item.createdDate)}</span><h2>${escapeHTML(item.company)}</h2></div><span class="stage-pill">${stage}</span></div><ol class="stage-list" aria-label="Case stages">${['Drafted', 'Sent', 'Response', 'Resolved'].map(step => `<li class="${['Drafted', 'Sent', 'Response', 'Resolved'].indexOf(step) <= ['Drafted', 'Sent', 'Response', 'Resolved'].indexOf(stage) ? 'reached' : ''}">${step}</li>`).join('')}</ol>${caseFacts(item)}${typeof item.draftText === 'string' && item.draftText.trim() ? `<details class="saved-draft"><summary>View saved draft</summary><pre>${escapeHTML(item.draftText)}</pre></details>` : ''}
    ${stage === 'Drafted' ? `<form class="sent-form ack-form"><label class="field-label" for="date-${escapeHTML(item.id)}">Date you sent/filed this</label><input id="date-${escapeHTML(item.id)}" name="sentDate" type="date" required max="${todayISO()}"><label class="field-label spaced-label" for="method-${escapeHTML(item.id)}">Method</label><select id="method-${escapeHTML(item.id)}" name="method" required><option value="">Choose a method</option><option>Certified mail</option><option>Postal mail</option><option>Online filing</option><option>Other</option></select><label class="field-label spaced-label" for="proof-${escapeHTML(item.id)}">Proof of mailing or filing confirmation</label><input id="proof-${escapeHTML(item.id)}" name="proof" required data-max="180" placeholder="Certified mail number or filing confirmation"><label class="review-consent" for="ack-${escapeHTML(item.id)}"><input id="ack-${escapeHTML(item.id)}" name="ack" type="checkbox" required><span>${escapeHTML(COPY.sentAcknowledgment)}</span></label><button class="button button-ink" type="submit">Record sent</button></form>` : `<p class="case-meta">You marked this sent/filed on ${escapeHTML(item.sentDate)} · ${escapeHTML(item.method)}${item.proof ? ` · Proof: ${escapeHTML(item.proof)}` : ''}</p>${renderTimer(item)}`}
    ${stage === 'Sent' ? `<form class="response-form ack-form"><h3>Log a response</h3><label class="field-label" for="outcome-${escapeHTML(item.id)}">Outcome (optional)</label><select id="outcome-${escapeHTML(item.id)}" name="outcome"><option value="">Not specified</option><option>Verified</option><option>Deleted</option><option>Updated</option><option>Other</option></select><label class="field-label spaced-label" for="received-${escapeHTML(item.id)}">Date you received the response (optional)</label><input id="received-${escapeHTML(item.id)}" name="responseReceivedDate" type="date" max="${todayISO()}"><label class="field-label spaced-label" for="note-${escapeHTML(item.id)}">Response note</label><textarea id="note-${escapeHTML(item.id)}" name="responseNote" required data-max="3000" rows="3"></textarea><button class="button button-outline" type="submit">Log response</button></form>` : ''}
    ${stage === 'Response' || stage === 'Resolved' ? `<p class="case-meta">Response logged ${escapeHTML(item.responseDate)}${item.outcome ? ` · ${escapeHTML(item.outcome)}` : ''}${item.responseReceivedDate ? ` · Received ${escapeHTML(item.responseReceivedDate)}` : ''}</p><p class="response-note">${escapeHTML(item.responseNote)}</p>${stage === 'Response' ? '<button type="button" class="button button-outline resolve-case">Mark resolved</button>' : `<p class="case-meta">You marked this resolved on ${escapeHTML(item.resolvedDate)}</p>`}` : ''}</article>`;
  }).join('')}</div>` : '<div class="empty-cases"><h2>No case items yet</h2><p>Create a letter or complaint draft to start your paper trail.</p><a class="button button-ink" href="#letters">Create a letter</a></div>'}</section>`;
  document.querySelector('#export-cases').addEventListener('click', () => downloadText(JSON.stringify(readCases(), null, 2), 'creditluna-case-data.json', 'application/json'));
  document.querySelector('#download-all-drafts').addEventListener('click', downloadAllDrafts);
  document.querySelector('#delete-cases').addEventListener('click', () => {
    if (!confirm('Delete all case data from this browser, including saved drafts and prior-dispute history? This cannot be undone. Export first if you need a copy.')) return;
    try { localStorage.removeItem(CASE_STORAGE_KEY); renderTracker(); document.querySelector('#case-storage-status').textContent = 'All local case data deleted.'; }
    catch { document.querySelector('#case-storage-status').textContent = 'Unable to delete local case data. Check browser storage settings.'; }
  });
  document.querySelectorAll('.case-card').forEach(card => {
    const id = card.dataset.caseId;
    card.querySelector('.sent-form')?.addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      const date = form.elements.sentDate.value;
      if (!withinLimits(form) || !form.reportValidity() || !validDate(date) || date > todayISO() || !form.elements.proof.value.trim()) return;
      if (updateCase(id, { stage: 'Sent', sentDate: date, method: form.elements.method.value, proof: form.elements.proof.value.trim() })) renderTracker();
    });
    card.querySelector('.response-form')?.addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!withinLimits(form) || !form.reportValidity() || !form.elements.responseNote.value.trim()) return;
      const received = form.elements.responseReceivedDate.value;
      if (updateCase(id, { stage: 'Response', responseDate: todayISO(), responseReceivedDate: validDate(received) && received <= todayISO() ? received : null, outcome: form.elements.outcome.value, responseNote: form.elements.responseNote.value.trim() })) renderTracker();
    });
    card.querySelector('.resolve-case')?.addEventListener('click', () => {
      if (updateCase(id, { stage: 'Resolved', resolvedDate: todayISO() })) renderTracker();
    });
  });
  attachLimitCounters(main);
}

function downloadAllDrafts() {
  const drafts = savedDrafts(readCases());
  if (!drafts.length) return;
  downloadText(combinedDraftsText(drafts), `creditluna-all-drafts-${fileStamp()}.txt`, 'text/plain;charset=utf-8');
}

function renderDraftsPrint() {
  const drafts = savedDrafts(readCases());
  main.innerHTML = `<section class="drafts-print-page shell"><div class="print-toolbar"><a class="back-link" href="#tracker">← Back to case tracker</a><div class="eyebrow">All saved drafts</div><h1>Printable drafts</h1><p>${escapeHTML(COPY.draftsExport)} Each draft starts on a new page. ${escapeHTML(COPY.timelineReview)}</p><p class="privacy-chip">${escapeHTML(COPY.privacy)}</p><div class="result-actions"><button type="button" class="button button-ink" id="print-drafts" ${drafts.length ? '' : 'disabled'}>Print / Save as PDF</button><button type="button" class="button button-outline" id="download-all-drafts-print" ${drafts.length ? '' : 'disabled'}>Download all drafts (.txt)</button></div></div>${drafts.length ? drafts.map((item, index) => `<article class="print-draft"><p class="print-draft-meta">Draft ${index + 1} of ${drafts.length} · ${escapeHTML(caseTypeLabel(item.type))} · ${escapeHTML(item.company || '[recipient not provided]')} · Created ${escapeHTML(item.createdDate || '[date not recorded]')}</p><pre class="print-draft-text">${escapeHTML(item.draftText)}</pre></article>`).join('') : '<div class="empty-cases"><h2>No saved drafts yet</h2><p>Create a letter or complaint draft; a copy is saved with its Case Tracker item in this browser.</p><a class="button button-ink" href="#letters">Create a letter</a></div>'}</section>`;
  document.querySelector('#print-drafts').addEventListener('click', () => window.print());
  document.querySelector('#download-all-drafts-print').addEventListener('click', downloadAllDrafts);
}

route();
