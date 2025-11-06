<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const router = useRouter()
const { getTabsForGroup } = useDashboardTabs()

const tabs = getTabsForGroup('/dashboard/overview')

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
      <UDashboardNavbar title="Overview">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <UTabs :model-value="activeTab" class="max-w-2xl" :items="tabs" color="neutral" :content="false" @update:model-value="onTabChange" />
        </div>
        <NuxtPage />
      </div>
    </template>
  </UDashboardPanel>
</template>
