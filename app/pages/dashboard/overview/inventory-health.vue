<script setup lang="ts">
// Health categories with colors
const healthCategories = [
  { key: 'stockOut', label: 'Stock-Out Risk', color: 'rgb(168, 85, 247)', value: 32, inventory: 1849, avgDemand: 370, inventoryValue: 832050, healthyValue: 2344530, notHealthyValue: 0 },
  { key: 'healthy', label: 'Healthy', color: 'rgb(74, 222, 128)', value: 1130, inventory: 40750, avgDemand: 8150, inventoryValue: 18434109, healthyValue: 18434109, notHealthyValue: 0 },
  { key: 'overStock', label: 'Over-stocked', color: 'rgb(251, 191, 36)', value: 825, inventory: 20609, avgDemand: 4122, inventoryValue: 9302903, healthyValue: 3903084, notHealthyValue: 5399819 },
  { key: 'deadStock', label: 'Dead-stock', color: 'rgb(251, 113, 133)', value: 398, inventory: 10890, avgDemand: 2178, inventoryValue: 4900534, healthyValue: 675504, notHealthyValue: 4225030 }
]

// Calculate totals
const totals = {
  skus: healthCategories.reduce((sum, cat) => sum + cat.value, 0),
  inventory: healthCategories.reduce((sum, cat) => sum + cat.inventory, 0),
  avgDemand: healthCategories.reduce((sum, cat) => sum + cat.avgDemand, 0),
  inventoryValue: healthCategories.reduce((sum, cat) => sum + cat.inventoryValue, 0),
  healthyValue: healthCategories.reduce((sum, cat) => sum + cat.healthyValue, 0),
  notHealthyValue: healthCategories.reduce((sum, cat) => sum + cat.notHealthyValue, 0)
}

// Stacked bar chart data
const currentStockHealth = {
  stockOut: 32.4,
  healthy: 18.2,
  overStock: 9.3,
  deadStock: 4.9
}

const expectedStock = {
  stockOut: 22.4,
  healthy: 18.2,
  overStock: 0,
  deadStock: 0
}

// Detailed inventory breakdown
const inventoryDetails = ref([
  { category: 'Stock out risk', skus: 32, expanded: false, items: [
    { name: 'Lamps', skus: 230, inventory: 2450, avgDemand: 143, inventoryValue: 465896, healthyValue: 132430, notHealthyValue: 333466 },
    { name: 'Dining tables', skus: 57, inventory: 752, avgDemand: 34, inventoryValue: 1090400, healthyValue: 98986, notHealthyValue: 991414 },
    { name: 'Chairs', skus: 111, inventory: 2794, avgDemand: 168, inventoryValue: 1257399, healthyValue: 241505, notHealthyValue: 1019398 }
  ]},
  { category: 'Healthy', skus: 1130, expanded: false, items: [] },
  { category: 'Over-stock', skus: 825, expanded: false, items: [
    { name: 'Boheim (200-204)', skus: 1, inventory: 560, avgDemand: 32, inventoryValue: 252434, healthyValue: 43500, notHealthyValue: 208934 },
    { name: 'Alterix bar chair (200-305)', skus: 1, inventory: 543, avgDemand: 18, inventoryValue: 244883, healthyValue: 78040, notHealthyValue: 166843 },
    { name: 'Harbour dinning chair (454-403)', skus: 1, inventory: 235, avgDemand: 13, inventoryValue: 129356, healthyValue: 44540, notHealthyValue: 84816 }
  ]},
  { category: 'Dead-stock', skus: 398, expanded: true, items: [
    { name: 'Lamps', skus: 230, inventory: 2450, avgDemand: 143, inventoryValue: 465896, healthyValue: 132430, notHealthyValue: 333466 },
    { name: 'Dining tables', skus: 57, inventory: 752, avgDemand: 34, inventoryValue: 1090400, healthyValue: 98986, notHealthyValue: 991414 },
    { name: 'Chairs', skus: 111, inventory: 2794, avgDemand: 168, inventoryValue: 1257399, healthyValue: 241505, notHealthyValue: 1019398 }
  ]}
])

const filters = {
  productLifeCycle: ref('All'),
  productGroup: ref('All'),
  productType: ref('All'),
  vendor: ref('All'),
  sku: ref('')
}

function toggleCategory(index: number) {
  inventoryDetails.value[index].expanded = !inventoryDetails.value[index].expanded
}

function formatCurrency(value: number) {
  return `DKK ${(value / 1000000).toFixed(1)}M`
}

function formatNumber(value: number) {
  return value.toLocaleString()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Filters -->
    <UCard>
      <div class="flex flex-wrap items-center gap-4">
        <UButton variant="outline" icon="i-ph-arrow-clockwise" size="sm">Refresh</UButton>
        
        <USelect v-model="filters.productLifeCycle.value" :items="['All', 'Active', 'Phase Out']" placeholder="Product life cycle" class="w-48" />
        <USelect v-model="filters.productGroup.value" :items="['All', 'Furniture', 'Lighting']" placeholder="Product Group" class="w-40" />
        <USelect v-model="filters.productType.value" :items="['All', 'Type A', 'Type B']" placeholder="Product Type" class="w-40" />
        <USelect v-model="filters.vendor.value" :items="['All', 'Vendor 1', 'Vendor 2']" placeholder="Vendor" class="w-40" />
        <UInput v-model="filters.sku.value" placeholder="SKU:" class="w-48" />
      </div>
    </UCard>

    <!-- Legend -->
    <UCard>
      <div class="flex items-center justify-center gap-6">
        <div v-for="cat in healthCategories" :key="cat.key" class="flex items-center gap-2">
          <div class="size-4 rounded" :style="{ background: cat.color }"></div>
          <span class="text-sm">{{ cat.label }}</span>
        </div>
      </div>
    </UCard>

    <!-- Stacked Bars -->
    <div class="space-y-4">
      <UCard>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold">Current Stock Health</span>
            <span class="text-sm font-semibold">DKK 32.4M</span>
          </div>
          <div class="flex h-12 rounded overflow-hidden">
            <div 
              v-for="cat in healthCategories" 
              :key="cat.key" 
              :style="{ 
                width: `${(cat.inventoryValue / totals.inventoryValue) * 100}%`, 
                background: cat.color 
              }"
              class="flex items-center justify-center text-xs font-semibold text-white"
            >
              {{ formatCurrency(cat.inventoryValue) }}
            </div>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold">Expected stock</span>
            <span class="text-sm font-semibold">DKK 22.4M</span>
          </div>
          <div class="flex h-12 rounded overflow-hidden">
            <div 
              :style="{ 
                width: `${(healthCategories[0].inventoryValue / totals.inventoryValue) * 100}%`, 
                background: healthCategories[0].color 
              }"
              class="flex items-center justify-center text-xs font-semibold text-white"
            >
              {{ formatCurrency(healthCategories[0].inventoryValue) }}
            </div>
            <div 
              :style="{ 
                width: `${(healthCategories[1].inventoryValue / totals.inventoryValue) * 100}%`, 
                background: healthCategories[1].color 
              }"
              class="flex items-center justify-center text-xs font-semibold text-white"
            >
              {{ formatCurrency(healthCategories[1].inventoryValue) }}
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Summary Table -->
    <UCard>
      <UTable 
        :rows="[...healthCategories, { key: 'total', label: 'Total', ...totals }]" 
        :columns="[
          { id: 'label', key: 'label', label: 'Group' },
          { id: 'value', key: 'value', label: '# SKU' },
          { id: 'inventory', key: 'inventory', label: 'Inventory (Qty)' },
          { id: 'avgDemand', key: 'avgDemand', label: 'Average demand (Qty)' },
          { id: 'inventoryValue', key: 'inventoryValue', label: 'Inventory value (DKK)' },
          { id: 'healthyValue', key: 'healthyValue', label: 'Healthy value (DKK)' },
          { id: 'notHealthyValue', key: 'notHealthyValue', label: 'Not healthy (DKK)' }
        ]"
      >
        <template #label-data="{ row }">
          <div class="flex items-center gap-2">
            <div v-if="row.color" class="size-3 rounded" :style="{ background: row.color }"></div>
            <span :class="row.key === 'total' ? 'font-bold' : ''">{{ row.label }}</span>
          </div>
        </template>

        <template #value-data="{ row }">
          <span :class="row.key === 'total' ? 'font-bold' : ''">{{ formatNumber(row.value || row.skus) }}</span>
        </template>

        <template #inventory-data="{ row }">
          <span :class="row.key === 'total' ? 'font-bold' : ''">{{ formatNumber(row.inventory) }}</span>
        </template>

        <template #avgDemand-data="{ row }">
          <span :class="row.key === 'total' ? 'font-bold' : ''">{{ formatNumber(row.avgDemand) }}</span>
        </template>

        <template #inventoryValue-data="{ row }">
          <span :class="row.key === 'total' ? 'font-bold' : ''">{{ formatNumber(row.inventoryValue) }}</span>
        </template>

        <template #healthyValue-data="{ row }">
          <span :class="row.key === 'total' ? 'font-bold' : ''">{{ formatNumber(row.healthyValue) }}</span>
        </template>

        <template #notHealthyValue-data="{ row }">
          <span :class="row.key === 'total' ? 'font-bold' : ''">{{ formatNumber(row.notHealthyValue) }}</span>
        </template>
      </UTable>
    </UCard>

    <!-- Detailed Breakdown -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Detailed Inventory Breakdown</h3>
      </template>

      <div class="space-y-2">
        <div v-for="(detail, index) in inventoryDetails.value" :key="index" class="border border-default rounded">
          <button 
            @click="toggleCategory(index)"
            class="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <UIcon :name="detail.expanded ? 'i-ph-caret-down' : 'i-ph-caret-right'" />
              <span class="font-semibold" :class="detail.category.includes('Stock out') ? 'text-purple-500' : detail.category === 'Healthy' ? 'text-green-500' : detail.category === 'Over-stock' ? 'text-amber-500' : 'text-rose-400'">
                {{ detail.category }}
              </span>
            </div>
            <UBadge variant="subtle">{{ detail.skus }} SKUs</UBadge>
          </button>

          <div v-if="detail.expanded && detail.items.length > 0" class="px-4 pb-4">
            <UTable 
              :rows="detail.items" 
              :columns="[
                { id: 'name', key: 'name', label: 'Name' },
                { id: 'skus', key: 'skus', label: '# SKU' },
                { id: 'inventory', key: 'inventory', label: 'Inventory (Qty)' },
                { id: 'avgDemand', key: 'avgDemand', label: 'Average demand (Qty)' },
                { id: 'inventoryValue', key: 'inventoryValue', label: 'Inventory value (DKK)' },
                { id: 'healthyValue', key: 'healthyValue', label: 'Healthy value (DKK)' },
                { id: 'notHealthyValue', key: 'notHealthyValue', label: 'Not healthy (DKK)' }
              ]"
            />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
