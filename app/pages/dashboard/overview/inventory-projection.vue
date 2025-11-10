<script setup lang="ts">
const today = new Date()

// Generate chart data (18 months: 12 historical + 6 projected)
const chartData = Array.from({ length: 18 }, (_, i) => {
  const date = new Date(today)
  date.setMonth(date.getMonth() - 11 + i)
  const period = date.toISOString().slice(0, 7)
  
  // Historical data (first 12 months)
  const isHistorical = i < 12
  // Projected data (last 6 months)
  const isProjected = i >= 12
  
  return {
    period,
    onStockHistorical: isHistorical ? Math.floor(800 + Math.sin(i * 0.5) * 200) : null,
    onStockProjected: isProjected ? Math.floor(800 - (i - 12) * 30 + Math.sin(i) * 50) : null,
    incomingOrders: Math.floor(250 + Math.cos(i * 0.4) * 100)
  }
})

const categories = {
  onStockHistorical: { name: 'On stock (Historical)', color: 'rgb(var(--ui-primary))' },
  onStockProjected: { name: 'On stock (Projected)', color: 'rgb(34 197 94)' },
  incomingOrders: { name: 'Incoming orders', color: 'rgb(251 191 36)' }
}

const xFormatter = (i: number) => {
  const item = chartData[i]
  if (!item) return ''
  const date = new Date(item.period + '-01')
  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

// Demand date stats
const demandStats = [
  { label: 'Open Sales Orders', value: '71 Pcs' },
  { label: 'Avg. Weekly Demand', value: '0.9 Pcs' },
  { label: 'Avg. Monthly Demand', value: '3.8 Pcs' },
  { label: 'Avg. Yearly Demand', value: '46 Pcs' }
]

// Inventory table data
const inventoryTable = [
  { sku: 'BL40166', name: 'Frame 42 Open Module', onHand: 401, incoming: 0, projected: 380, demand: 45, coverage: '8.4 months' },
  { sku: '9398939-Q20TZZZZ', name: 'Harbour Side Dining Chair', onHand: 2303, incoming: 500, projected: 2100, demand: 85, coverage: '24.7 months' },
  { sku: '9397939-Q204ZZZZ', name: 'Harbour Side Dining Chair (Alt)', onHand: 1232, incoming: 0, projected: 1150, demand: 35, coverage: '32.9 months' },
  { sku: '9396004-031Hk00ZZ', name: 'Harbour Lounge Chair', onHand: 1340, incoming: 300, projected: 1500, demand: 28, coverage: '47.9 months' },
  { sku: 'BL40360', name: 'Frame 42 With Door', onHand: 454, incoming: 200, projected: 550, demand: 22, coverage: '20.6 months' }
]

const filters = {
  productLifeCycle: ref('All'),
  productGroup: ref('All'),
  productType: ref('All'),
  vendor: ref('All'),
  sku: ref('')
}

const productLifeCycles = ['All', 'Active', 'Phase Out', 'New']
const productGroups = ['All', 'Furniture', 'Lighting', 'Accessories']
</script>

<template>
  <div class="space-y-6">
    <!-- Filters -->
    <UCard>
      <div class="flex flex-wrap items-center gap-4">
        <UButton variant="outline" icon="i-ph-arrow-clockwise" size="sm">Refresh</UButton>
        
        <USelect v-model="filters.productLifeCycle.value" :items="productLifeCycles" placeholder="Product life cycle" class="w-48" />
        <USelect v-model="filters.productGroup.value" :items="productGroups" placeholder="Product Group" class="w-40" />
        <USelect v-model="filters.productType.value" :items="['All', 'Type A', 'Type B']" placeholder="Product Type" class="w-40" />
        <USelect v-model="filters.vendor.value" :items="['All', 'Vendor 1', 'Vendor 2']" placeholder="Vendor" class="w-40" />
        <UInput v-model="filters.sku.value" placeholder="SKU:" class="w-48" />
      </div>
    </UCard>

    <!-- Chart -->
    <UCard>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Inventory</h3>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="size-3 rounded bg-primary"></div>
              <span class="text-sm">On stock (Historical)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="size-3 rounded bg-green-400" style="background: repeating-linear-gradient(90deg, var(--color-green-400) 0, var(--color-green-400) 5px, transparent 5px, transparent 9px)"></div>
              <span class="text-sm">On stock (Projected)</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="size-3 rounded bg-amber-400"></div>
              <span class="text-sm">Incoming orders</span>
            </div>
          </div>
        </div>

        <LineChart
          :data="chartData"
          :height="300"
          :categories="categories"
          :x-formatter="xFormatter"
          :x-grid-line="true"
          :y-grid-line="true"
          :hide-legend="true"
        />
      </div>
    </UCard>

    <!-- Demand Date Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UCard v-for="stat in demandStats" :key="stat.label">
        <div class="space-y-1">
          <p class="text-xs text-muted">{{ stat.label }}:</p>
          <p class="text-xl font-semibold">{{ stat.value }}</p>
        </div>
      </UCard>
    </div>

    <!-- Location & Stock Policy -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-ph-map-pin" class="text-muted" />
            <span class="font-semibold">Location</span>
          </div>
        </template>
        <USelect :items="['Europe', 'North America', 'Asia']" model-value="Europe" />
      </UCard>

      <UCard>
        <template #header>
          <span class="font-semibold">Stock Policy</span>
        </template>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm">Stock Policy:</span>
            <span class="font-semibold">Make to stock</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Avg. Price:</span>
            <span class="font-semibold">3450 Kr.</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">COGS:</span>
            <span class="font-semibold">1,457kr.</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Lead time:</span>
            <span class="font-semibold">90 days</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">ROP:</span>
            <span class="font-semibold">1,200 pcs</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Order Qnt:</span>
            <span class="font-semibold">13 pcs</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm">Safe Stock:</span>
            <span class="font-semibold">11 pcs</span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Inventory Table -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Inventory Details</h3>
      </template>

      <UTable :data="inventoryTable" :columns="[
        { accessorKey: 'sku', header: 'SKU' },
        { accessorKey: 'name', header: 'Product' },
        { accessorKey: 'onHand', header: 'On Hand' },
        { accessorKey: 'incoming', header: 'Incoming' },
        { accessorKey: 'projected', header: 'Projected' },
        { accessorKey: 'demand', header: 'Avg Demand' },
        { accessorKey: 'coverage', header: 'Coverage' }
      ]">
        <template #sku-data="{ row }">
          <span class="font-mono text-sm">{{ row.sku }}</span>
        </template>

        <template #onHand-data="{ row }">
          <span class="font-semibold">{{ row.onHand }}</span>
        </template>

        <template #incoming-data="{ row }">
          <UBadge v-if="row.incoming > 0" color="green" variant="subtle">{{ row.incoming }}</UBadge>
          <span v-else class="text-muted">-</span>
        </template>

        <template #coverage-data="{ row }">
          <UBadge :color="parseFloat(row.coverage) > 12 ? 'green' : parseFloat(row.coverage) > 6 ? 'amber' : 'red'" variant="subtle">
            {{ row.coverage }}
          </UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
