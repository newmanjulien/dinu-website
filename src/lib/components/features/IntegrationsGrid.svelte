<script lang="ts">
  const integrations = [
    { name: 'HubSpot', logo: 'hubspot' },
    { name: 'Salesforce', logo: 'salesforce' },
    { name: 'Pipedrive', logo: 'pipedrive' },
    { name: 'monday.com', logo: 'monday' },
    { name: 'Asana', logo: 'asana' },
    { name: 'Notion', logo: 'notion' },
    { name: 'Trello', logo: 'trello' },
    { name: 'Airtable', logo: 'airtable' },
    { name: 'Slack', logo: 'slack' },
    { name: 'Teams', logo: 'teams' },
    { name: 'Gong', logo: 'gong' },
    { name: 'Ironclad', logo: 'ironclad' }
  ];
</script>

<ul class="m-0 grid list-none grid-cols-1 gap-3 p-0 min-[375px]:grid-cols-2 md:grid-cols-3" aria-label="Integrations">
  {#each integrations as integration (integration.logo)}
    <li class="flex min-h-12 min-w-0 items-center gap-3 rounded-base border border-line bg-surface p-3 shadow-[0_1px_2px_rgba(32,33,36,0.04)]">
      <img
        src={`/logos/integrations/${integration.logo}.svg`}
        alt=""
        width="20"
        height="20"
        class="size-5 shrink-0 object-contain"
      />
      <span class="text-[14px] font-medium leading-5 tracking-[0.2px] text-ink-muted">{integration.name}</span>
    </li>
  {/each}
</ul>
