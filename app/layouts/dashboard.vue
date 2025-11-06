<script setup lang="ts">
const { links } = useDashboardTabs()
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar id="quiver-dashboard" resizable collapsible :min-size="15" :default-size="18" :max-size="25">
      <template #header="{ collapsed }">
        <NuxtLink to="/" class="flex items-center gap-2" :class="collapsed ? 'justify-center p-2' : 'px-3 py-2'">
          <UIcon name="i-ph-lightning-duotone" class="size-6 text-primary" />
          <span v-if="!collapsed" class="font-bold text-lg">Quiver</span>
        </NuxtLink>
      </template>

      <template #default="{ collapsed }">
        <SideNav :items="links" :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>
