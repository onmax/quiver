# Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create dashboard section with sidebar navigation and catch-all route

**Architecture:** Use Nuxt UI Dashboard components (UDashboardGroup, UDashboardSidebar) with nested navigation. Catch-all route displays current path. Layout based on nuxt-dashboard-2 template pattern.

**Tech Stack:** Nuxt 4, Nuxt UI, Phosphor duotone icons, TypeScript

---

## Task 1: Create Dashboard Layout

**Files:**
- Create: `app/layouts/dashboard.vue`

**Step 1: Create dashboard layout file**

Create `app/layouts/dashboard.vue` with complete sidebar navigation:

```vue
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const links = ref<NavigationMenuItem[][]>([
  [
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
  ]
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
        <UNavigationMenu :items="links[0]!" :collapsed="collapsed" orientation="vertical" />
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>
```

**Step 2: Commit layout file**

```bash
git add app/layouts/dashboard.vue
git commit -m "add dashboard layout w/ sidebar nav"
```

---

## Task 2: Create Catch-All Route

**Files:**
- Create: `app/pages/dashboard/[...slug].vue`

**Step 1: Create catch-all route page**

Create `app/pages/dashboard/[...slug].vue`:

```vue
<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const path = computed(() => route.path)
</script>

<template>
  <UDashboardPanel>
    <UDashboardSection>
      <div class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 class="text-4xl font-bold">{{ path }}</h1>
        <p class="text-muted">This page is under construction</p>
      </div>
    </UDashboardSection>
  </UDashboardPanel>
</template>
```

**Step 2: Commit catch-all route**

```bash
git add app/pages/dashboard
git commit -m "add dashboard catch-all route"
```

---

## Task 3: Test Navigation

**Step 1: Start dev server**

```bash
pnpm dev
```

Expected: Server starts at http://localhost:3000

**Step 2: Navigate to dashboard**

Visit: http://localhost:3000/dashboard/overview/forecast

Expected:
- Sidebar visible with navigation items
- Main content shows "/dashboard/overview/forecast"
- Sidebar collapsible/resizable works

**Step 3: Test multiple routes**

Visit:
- http://localhost:3000/dashboard/enrich/historical-data
- http://localhost:3000/dashboard/settings/inventory-management
- http://localhost:3000/dashboard/developer/api-docs

Expected: Each shows correct path in h1

**Step 4: Test sidebar navigation**

Click different sidebar items

Expected: Routes change, path updates in h1

---

## Task 4: Type Check & Build

**Step 1: Run type check**

```bash
pnpm typecheck
```

Expected: No errors

**Step 2: Run build**

```bash
pnpm build
```

Expected: Build succeeds

**Step 3: Final commit**

```bash
git add .
git commit -m "dashboard: complete implementation"
```

---

## Verification Checklist

- [ ] Dashboard layout renders with sidebar
- [ ] Sidebar has 6 groups with correct icons
- [ ] All navigation items clickable
- [ ] Catch-all route displays current path
- [ ] Sidebar collapsible works
- [ ] Sidebar resizable works
- [ ] Type check passes
- [ ] Build succeeds
- [ ] All changes committed
