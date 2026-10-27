<script lang="ts">
  import { CTA_SECTION_ID } from '$lib/data/homepage';
  import Hero from '$lib/components/hero/Hero.svelte';
  import CtaSection from '$lib/components/cta/CtaSection.svelte';
  import CustomerTestimonials from '$lib/components/marketing/CustomerTestimonials.svelte';
  import ContentSection from '$lib/components/marketing/ContentSection.svelte';
  import SummaryWidget from '$lib/components/marketing/illustrations/SummaryWidget.svelte';
  import AcceptChangesWidget from '$lib/components/marketing/illustrations/AcceptChangesWidget.svelte';
  import ApprovalWidget from '$lib/components/marketing/illustrations/ApprovalWidget.svelte';
  import IntegrationsGrid from '$lib/components/marketing/IntegrationsGrid.svelte';
  import SectionNav from '$lib/components/site/SectionNav.svelte';

  type Section = { id: string; title: string; navLabel?: string };

  const overview = { id: 'overview', label: 'Back to the start' };
  const sections = {
    intro: { id: 'intro', title: 'Your sales stall at the finish line' },
    upload: { id: 'upload', title: 'No law degree required' },
    accept: { id: 'accept', title: 'Make preapproved changes' },
    respond: { id: 'respond', title: 'Skip the back-and-forth' },
    integrations: {
      id: 'integrations',
      title: 'Works with the tools you already use',
      navLabel: 'Integrations'
    },
    customers: { id: 'customers', title: 'Close more deals faster', navLabel: 'Testimonials' }
  } satisfies Record<string, Section>;
  const pageSections = [
    overview,
    ...Object.values(sections).map(({ id, title, navLabel }: Section) => ({
      id,
      label: navLabel ?? title
    }))
  ];
</script>

<svelte:head>
  <title>Dinu keeps contracts moving</title>
  <meta name="description" content="Let sales reps handle contract negotiation" />
</svelte:head>

<SectionNav sections={pageSections} cover={CTA_SECTION_ID} />

<main>
  <Hero id={overview.id} />

  <div class="homepage-content flex flex-col">
    <div class="intro-section">
      <ContentSection id={sections.intro.id} title={sections.intro.title}>
        {#snippet body()}
          <p>Today, when a buyer sends back a redlined contract, your reps are stuck waiting on legal. Deals that should be closing get caught in a slow and expensive review back-and-forth.</p>
          <p>Give reps the guardrails to safely handle more of the contract process themselves and keep deals moving quickly toward signature.</p>
        {/snippet}
      </ContentSection>
      <img
        src="/dinu-dinosaur-edge.svg"
        alt=""
        aria-hidden="true"
        width="240"
        height="290"
        class="edge-dinosaur"
      />
    </div>

    <ContentSection id={sections.upload.id} title={sections.upload.title}>
      {#snippet body()}
        <p>Help reps understand how to negotiate your contract. Explain each clause in plain English, and guide reps through negotiations on the clauses buyers often push back on.</p>
      {/snippet}
      <SummaryWidget />
    </ContentSection>

    <ContentSection id={sections.accept.id} title={sections.accept.title}>
      {#snippet body()}
        <p>Reps apply standard concessions directly to the contract. And easily escalate anything outside those limits.</p>
      {/snippet}
      <AcceptChangesWidget />
    </ContentSection>

    <ContentSection id={sections.respond.id} title={sections.respond.title}>
      {#snippet body()}
        <p>When a change needs sign-off, reps ask the right person on your team for approval with one click.</p>
      {/snippet}
      <ApprovalWidget />
    </ContentSection>

    <ContentSection id={sections.integrations.id} title={sections.integrations.title}>
      {#snippet body()}
        <p>Make contract negotiations fit into your existing workflows. Dinu connects to the tools your team already uses.</p>
      {/snippet}
      <IntegrationsGrid />
    </ContentSection>

    <ContentSection id={sections.customers.id} title={sections.customers.title} maxWidth={986.1}>
      {#snippet body()}
        <p>See how sales teams use Dinu to let their sales reps handle more negotiations themselves, speed up their sales cycles and to increase rep productivity.</p>
      {/snippet}
      <CustomerTestimonials />
    </ContentSection>
  </div>
  <CtaSection id={CTA_SECTION_ID} />
</main>

<style>
  .homepage-content {
    --section-gap: 150px;
    gap: var(--section-gap);
  }

  .intro-section {
    position: relative;
  }

  .edge-dinosaur {
    display: none;
    position: absolute;
    /* Center in the section gap, lifted 10px for visual alignment. */
    top: calc(100% + var(--section-gap) / 2 - 10px);
    right: 0;
    width: 106.4px;
    height: auto;
    transform: translateY(-50%);
    pointer-events: none;
    user-select: none;
  }

  @media (min-width: 40rem) {
    .homepage-content {
      --section-gap: 190px;
    }
  }

  @media (min-width: 64rem) {
    .edge-dinosaur {
      display: block;
    }
  }
</style>
