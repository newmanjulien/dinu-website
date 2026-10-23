<script lang="ts">
  import Hero from '$lib/components/hero/Hero.svelte';
  import CtaSection from '$lib/components/cta/CtaSection.svelte';
  import CustomerTestimonials from '$lib/components/features/CustomerTestimonials.svelte';
  import ContentSection from '$lib/components/ui/ContentSection.svelte';
  import SummaryWidget from '$lib/components/features/SummaryWidget.svelte';
  import AcceptChangesWidget from '$lib/components/features/AcceptChangesWidget.svelte';
  import ApprovalWidget from '$lib/components/features/ApprovalWidget.svelte';
  import IntegrationsGrid from '$lib/components/features/IntegrationsGrid.svelte';
  import SectionNav from '$lib/components/site/SectionNav.svelte';

  const pageSections = [
    { id: 'overview', label: 'Back to the start' },
    { id: 'intro', label: 'Overwhelmed by redlined contracts' },
    { id: 'upload', label: 'Help reps understand every clause' },
    { id: 'accept', label: 'Negotiate with preapproved changes' },
    { id: 'respond', label: 'Always keep moving' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'customers', label: 'Testimonials' }
  ];
</script>

<svelte:head>
  <title>Keep sales contracts moving</title>
  <meta name="description" content="Let sales reps handle contract negotiation" />
</svelte:head>

<SectionNav sections={pageSections} cover="cta" />

<main>
  <Hero id="overview" />

  <div class="homepage-content flex flex-col gap-[150px] sm:gap-[190px]">
    <ContentSection id="intro" title="Your sales stall at the finish line">
      {#snippet body()}
        <p>When a buyer sends back a redlined contract, your reps are stuck waiting on legal. Deals that should be closing get caught in a slow and expensive review process.</p>
        <p>Give reps the guardrails to safely handle more of the contract process themselves and keep deals moving quickly toward signature.</p>
      {/snippet}
    </ContentSection>

    <ContentSection id="upload" title="No law degree required" maxWidth={988}>
      {#snippet body()}
        <p>Explain each clause in plain English, and guide reps through negotiations on the clauses buyers often push back on.</p>
      {/snippet}
      <SummaryWidget />
    </ContentSection>

    <ContentSection id="accept" title="Negotiate with preapproved changes" maxWidth={988}>
      {#snippet body()}
        <p>Reps apply standard concessions directly to the contract and escalate anything outside those limits.</p>
      {/snippet}
      <AcceptChangesWidget />
    </ContentSection>

    <ContentSection id="respond" title="Skip the back-and-forth" maxWidth={988}>
      {#snippet body()}
        <p>When a change needs sign-off, reps ask the right person on your team for approval with one click.</p>
      {/snippet}
      <ApprovalWidget />
    </ContentSection>

    <ContentSection id="integrations" title="Works with the tools you already use" maxWidth={988}>
      {#snippet body()}
        <p>Connect your product data to Loops. Start by backfilling contacts with a CSV upload, then keep contacts up to date with an integration.</p>
      {/snippet}
      <IntegrationsGrid />
    </ContentSection>

    <ContentSection id="customers" title="Close more deals faster">
      {#snippet body()}
        <p>See how sales teams use Agreed to handle more negotiations themselves and shorten their sales cycles.</p>
      {/snippet}
      <CustomerTestimonials />
    </ContentSection>
  </div>
  <CtaSection id="cta" />
</main>
