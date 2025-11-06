<script setup lang="ts">
import type { NavigationMenuItem } from '~/components/SideNav/types'

const links = ref<NavigationMenuItem[]>([
  {
      icon: 'i-ph-squares-four-duotone',
      label: 'Overview',
      open: true,
      children: [
        { to: '/dashboard/overview/forecast', icon: 'i-ph-chart-line-up-duotone', label: 'Forecast Dashboard' },
        { to: '/dashboard/overview/sales', icon: 'i-ph-chart-bar-duotone', label: 'Sales Dashboard' },
        { to: '/dashboard/overview/product-list', icon: 'i-ph-list-bullets-duotone', label: 'Product List' },
        { to: '/dashboard/overview/inventory-projection', icon: 'i-ph-trend-up-duotone', label: 'Inventory Projection' },
        { to: '/dashboard/overview/inventory-health', icon: 'i-ph-heart-duotone', label: 'Inventory Health' },
        { to: '/dashboard/overview/order-suggestions', icon: 'i-ph-lightbulb-duotone', label: 'Order Suggestions' }
      ]
    },
    {
      icon: 'i-ph-arrows-clockwise-duotone',
      label: 'Replenishment',
      children: [
        { to: '/dashboard/replenishment/order-suggestion', icon: 'i-ph-shopping-cart-duotone', label: 'Order Suggestion' },
        { to: '/dashboard/replenishment/supplier-forecast', icon: 'i-ph-truck-duotone', label: 'Supplier Forecast' }
      ]
    },
    {
      icon: 'i-ph-database-duotone',
      label: 'Enrich forecast',
      children: [
        { to: '/dashboard/enrich/historical-data', icon: 'i-ph-clock-clockwise-duotone', label: 'Historical Data' },
        { to: '/dashboard/enrich/promotions-events', icon: 'i-ph-megaphone-duotone', label: 'Promotions & Events' }
      ]
    },
    {
      icon: 'i-ph-users-three-duotone',
      label: 'Collaboration',
      children: [
        { to: '/dashboard/collaboration/new-product', icon: 'i-ph-sparkle-duotone', label: 'New Product Introduction' },
        { to: '/dashboard/collaboration/scenario-planning', icon: 'i-ph-graph-duotone', label: 'Scenario Planning' },
        { to: '/dashboard/collaboration/sop', icon: 'i-ph-handshake-duotone', label: 'S&OP' }
      ]
    },
    {
      icon: 'i-ph-gear-duotone',
      label: 'Settings',
      children: [
        { to: '/dashboard/settings/inventory-management', icon: 'i-ph-package-duotone', label: 'Inventory Management' },
        { to: '/dashboard/settings/product-segmentation', icon: 'i-ph-tree-structure-duotone', label: 'Product Segmentation' },
        { to: '/dashboard/settings/product-settings', icon: 'i-ph-sliders-duotone', label: 'Product Settings' }
      ]
    },
    {
      icon: 'i-ph-code-duotone',
      label: 'Developer Access',
      children: [
        { to: '/dashboard/developer/api-docs', icon: 'i-ph-book-open-duotone', label: 'API Documentation' }
      ]
    }
])
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar id="quiver-dashboard" resizable collapsible :min-size="11.5" :default-size="11.5" :max-size="16">
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
