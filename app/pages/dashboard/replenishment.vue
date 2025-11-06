<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const router = useRouter()
const { getTabsForGroup } = useDashboardTabs()

const tabs = getTabsForGroup('/dashboard/replenishment')

const activeTab = computed(() => {
  const currentPath = route.path
  const found = tabs.find(tab => currentPath === tab.to)
  return found?.to
})

function onTabChange(value: string) {
  router.push(value)
}
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Replenishment">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <UTabs :model-value="activeTab" :items="tabs" color="neutral" :content="false" @update:model-value="onTabChange" />
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
