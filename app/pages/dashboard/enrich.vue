<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const { getTabsForGroup } = useDashboardTabs()
const tabs = getTabsForGroup('/dashboard/enrich')
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Enrich Forecast">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <UTabs :items="tabs" color="neutral" :content="false" />
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
