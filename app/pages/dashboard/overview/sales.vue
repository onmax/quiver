<script setup lang="ts">
const { totalSales, totalPieces, inventoryBalance, totalInventoryPieces, totalProducts, salesTableData } = useDashboardData()

const today = new Date()

// Filters
const selectedLaunch = ref('AW2023')
const dateFrom = ref('Dec 23')
const dateTo = ref('Jul 24')
const sku = ref('')
const groupByMonth = ref(true)
const showRevenue = ref(false)
const showAccumulating = ref(true)

// Generate chart data with both sales and forecast
const chartData = computed(() => {
  const data = []
  const baseDate = new Date(2024, 6, 1) // July 2024
  
  for (let i = -12; i <= 6; i++) {
    const date = new Date(baseDate)
    date.setMonth(date.getMonth() + i)
    const period = date.toISOString().slice(0, 7)
    
    data.push({
      period,
      sales: i <= 0 ? Math.floor(300 + (Math.sin(i) * 50) + i * 10) : null,
      npiForecast: i >= 0 ? Math.floor(400 + (Math.cos(i) * 40) + i * 20) : null
    })
  }
  return data
})

const chartCategories = {
  sales: { name: 'Sales', color: 'rgb(var(--ui-primary))' },
  npiForecast: { name: 'NPI Forecast', color: 'rgb(34 197 94)' }
}

const xFormatter = (i: number) => {
  const item = chartData.value[i]
  if (!item) return ''
  const date = new Date(item.period + '-01')
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).replace(' ', ' ')
}

// Table columns
const columns = [
  { accessorKey: 'link', header: 'Link' },
  { accessorKey: 'sku', header: 'SKU' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'npiTotal', header: 'NPI Forecast (total)' },
  { accessorKey: 'npiToDate', header: 'NPI Forecast (to date)' },
  { accessorKey: 'salesToDate', header: 'Sales (to date)' },
  { accessorKey: 'onHand', header: 'On hand' },
  { accessorKey: 'openPOs', header: 'Open POs' },
  { accessorKey: 'salesIndex', header: 'Sales Index (NPI vs Actual)' },
  { accessorKey: 'monthsStock', header: 'Month of Stock' },
  { accessorKey: 'monthsActual', header: 'Months of Stock (Actual sales)' }
]

const launches = ['AW2023', 'SS2024', 'AW2024']
</script>

<template>
  <div class="space-y-6">
    <!-- Filters Bar -->
    <UCard>
      <div class="flex flex-wrap items-center gap-3">
        <USelect v-model="selectedLaunch" :items="launches" class="w-32" size="sm" />
        
        <span class="text-sm text-muted">Date range:</span>
        <UInput v-model="dateFrom" placeholder="Dec 23" class="w-24" size="sm" />
        <span class="text-sm text-muted">to</span>
        <UInput v-model="dateTo" placeholder="Jul 24" class="w-24" size="sm" />

        <UInput v-model="sku" placeholder="SKU:" class="w-40" size="sm" />

        <div class="flex items-center gap-3 ml-auto text-sm">
          <label class="flex items-center gap-2 cursor-pointer">
            <UCheckbox v-model="groupByMonth" />
            <span>Group by Month</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <UCheckbox v-model="showRevenue" />
            <span>Show Revenue</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <UCheckbox v-model="showAccumulating" />
            <span>Show Accumulating</span>
          </label>
        </div>

        <UButton color="primary" icon="i-ph-upload" size="sm">Upload launch</UButton>
      </div>
    </UCard>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UCard>
        <div class="space-y-2">
          <p class="text-xs uppercase text-muted font-medium">Total Sales</p>
          <p class="text-3xl font-bold">{{ totalSales.toLocaleString() }} Kr.</p>
          <p class="text-sm text-muted">{{ totalPieces.toLocaleString() }} pcs.</p>
        </div>
        <template #footer>
          <div class="flex items-center justify-between">
            <UBadge color="amber" variant="subtle" size="sm">82%</UBadge>
          </div>
        </template>
      </UCard>

      <UCard>
        <div class="space-y-2">
          <p class="text-xs uppercase text-muted font-medium">Inventory Balance</p>
          <p class="text-3xl font-bold">{{ inventoryBalance.toLocaleString() }} Kr.</p>
          <p class="text-sm text-muted">{{ totalInventoryPieces.toLocaleString() }} pcs.</p>
        </div>
        <template #footer>
          <div class="flex items-center justify-between">
            <UBadge color="green" variant="subtle" size="sm">3.4</UBadge>
          </div>
        </template>
      </UCard>

      <UCard>
        <div class="space-y-2">
          <p class="text-xs uppercase text-muted font-medium"># SKUs</p>
          <p class="text-3xl font-bold">{{ totalProducts }} Pcs.</p>
        </div>
      </UCard>

      <UCard>
        <div class="space-y-2">
          <p class="text-xs uppercase text-muted font-medium">Launch</p>
          <p class="text-3xl font-bold">2.5 months ago</p>
        </div>
      </UCard>
    </div>

    <!-- Chart -->
    <UCard>
      <div class="space-y-4">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <div class="size-3 rounded-full bg-primary"></div>
            <span class="text-sm">Sales</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="size-3 rounded-full bg-green-500"></div>
            <span class="text-sm">NPI Forecast</span>
          </div>
        </div>

        <LineChart
          :data="chartData"
          :height="320"
          :categories="chartCategories"
          :x-formatter="xFormatter"
          :hide-legend="true"
          :x-grid-line="true"
          :y-grid-line="true"
          :y-num-ticks="5"
          :curve-type="CurveType.MonotoneX"
        />
      </div>
    </UCard>

    <!-- Data Table -->
    <UCard>
      <UTable :data="salesTableData" :columns="columns">
        <template #link-data="{ row }">
          <UButton variant="link" color="primary" size="xs">{{ row.link }}</UButton>
        </template>
        <template #salesIndex-data="{ row }">
          <UBadge :color="row.salesIndex > 200 ? 'green' : row.salesIndex > 100 ? 'amber' : 'red'" variant="subtle">
            {{ row.salesIndex }}
          </UBadge>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
