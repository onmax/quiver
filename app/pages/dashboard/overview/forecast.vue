<script setup lang="ts">
// Generate data based on today's date
const today = new Date()

// Historical data - 12 months back
const historicalData = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(today)
  date.setMonth(date.getMonth() - (11 - i))
  const period = date.toISOString().slice(0, 7)
  const value = Math.floor(130 + Math.random() * 400 + i * 20)
  return { period, value }
})

// Forecast data - 6 months forward
const forecastData = Array.from({ length: 6 }, (_, i) => {
  const date = new Date(today)
  date.setMonth(date.getMonth() + i + 1)
  const period = date.toISOString().slice(0, 7)
  const value = Math.floor(350 + Math.random() * 200)
  return { period, value }
})

// Combine for chart display
const chartData = [
  ...historicalData.map(d => ({ 
    period: d.period, 
    'Historical Sales': d.value,
    'Forecast': null 
  })),
  ...forecastData.map(d => ({ 
    period: d.period, 
    'Historical Sales': null,
    'Forecast': d.value 
  }))
]

// Categories for different line colors
const categories = {
  'Historical Sales': { name: 'Historical Sales', color: 'var(--ui-primary)' },
  'Forecast': { name: 'Forecast', color: 'var(--color-amber-400)' }
}

const xFormatter = (i: number) => {
  const item = chartData[i]
  if (!item) return ''
  const date = new Date(item.period + '-01')
  return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
}

// Table data - last 6 months
const tableColumns = ['group', ...historicalData.slice(-6).map(d => d.period)]

const tableRows = [
  { group: 'Norm Architects', ...Object.fromEntries(historicalData.slice(-6).map((d, i) => [d.period, 260 + Math.floor(Math.random() * 50)])) },
  { group: 'Flemming Lassen', ...Object.fromEntries(historicalData.slice(-6).map((d, i) => [d.period, 50 + Math.floor(Math.random() * 50)])) },
  { group: 'Audo Copenhagen', ...Object.fromEntries(historicalData.slice(-6).map((d, i) => [d.period, 50 + Math.floor(Math.random() * 30)])) },
  { group: 'Mongens Lassen', ...Object.fromEntries(historicalData.slice(-6).map((d, i) => [d.period, 40 + Math.floor(Math.random() * 35)])) },
  { group: 'Jonas Wagell', ...Object.fromEntries(historicalData.slice(-6).map((d, i) => [d.period, 15 + Math.floor(Math.random() * 10)])) },
  { group: 'Ib Kofod-Larsen', ...Object.fromEntries(historicalData.slice(-6).map((d, i) => [d.period, 10 + Math.floor(Math.random() * 10)])) }
]

const tableTotals = Object.fromEntries(
  historicalData.slice(-6).map(d => [
    d.period,
    tableRows.reduce((sum, row) => sum + (row[d.period] || 0), 0)
  ])
)
</script>

<template>
  <div class="space-y-6">
    <!-- Chart -->
    <UCard>
      <div class="space-y-4">
        <div class="flex items-start justify-between">
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-wider text-muted font-medium">Sales Overview</p>
            <div class="font-semibold text-3xl text-highlighted tabular-nums">Historical & Forecast</div>
          </div>
        </div>

        <LineChart :data="chartData" :height="300" :categories="categories" :x-formatter="xFormatter" :x-grid-line="true" :curve-type="CurveType.MonotoneX" />

        <div class="flex justify-center gap-6">
          <template v-for="(cat, catKey) in categories" :key="catKey">
            <div class="flex items-center gap-2">
              <span class="rounded-full w-2 h-2 inline-block" :style="{ background: cat.color }" />
              <span class="text-muted text-xs">{{ cat.name }}</span>
            </div>
          </template>
        </div>
      </div>
    </UCard>

    <!-- Table -->
    <UCard>
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Inventory by Group</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-default">
                <th class="text-left font-semibold px-3 py-2">Group</th>
                <th v-for="col in tableColumns.slice(1)" :key="col" class="text-right font-semibold px-3 py-2">{{ new Date(col + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }) }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tableRows" :key="row.group" class="border-b border-default">
                <td class="px-3 py-2">{{ row.group }}</td>
                <td v-for="col in tableColumns.slice(1)" :key="col" class="text-right px-3 py-2 text-muted">{{ row[col] }}</td>
              </tr>
              <tr class="font-semibold">
                <td class="px-3 py-2">Total</td>
                <td v-for="col in tableColumns.slice(1)" :key="col" class="text-right px-3 py-2">{{ tableTotals[col] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </UCard>
  </div>
</template>
