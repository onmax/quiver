<script setup lang="ts">
// Order suggestions data
const orderSuggestions = ref([
  { id: 1, sku: 'BL40166', name: 'Frame 42 Open Module / Frame - Smoke Oak', currentStock: 45, rop: 120, suggestedQty: 300, leadTime: '90 days', priority: 'High', supplier: 'Audo Copenhagen' },
  { id: 2, sku: '9398939-Q20TZZZZ', name: 'Harbour Side Dining Chair, Chrome Star Base', currentStock: 89, rop: 150, suggestedQty: 500, leadTime: '60 days', priority: 'High', supplier: 'Norm Architects' },
  { id: 3, sku: '9397939-Q204ZZZZ', name: 'Harbour Side Dining Chair (Alternative)', currentStock: 156, rop: 200, suggestedQty: 250, leadTime: '60 days', priority: 'Medium', supplier: 'Norm Architects' },
  { id: 4, sku: '9396004-031Hk00ZZ', name: 'Harbour Lounge Chair, Black Star Base', currentStock: 210, rop: 180, suggestedQty: 200, leadTime: '75 days', priority: 'Low', supplier: 'Menu' },
  { id: 5, sku: 'BL40360', name: 'Frame 42 With Door / Frame - Oak', currentStock: 78, rop: 100, suggestedQty: 350, leadTime: '90 days', priority: 'High', supplier: 'Audo Copenhagen' },
  { id: 6, sku: '9391004-030600ZZ', name: 'Harbour Dining Chair, Black Star Base', currentStock: 134, rop: 160, suggestedQty: 280, leadTime: '60 days', priority: 'Medium', supplier: 'Norm Architects' },
  { id: 7, sku: '9391100-030600ZZ', name: 'Harbour Dining Chair Variant', currentStock: 67, rop: 140, suggestedQty: 400, leadTime: '60 days', priority: 'High', supplier: 'Norm Architects' },
  { id: 8, sku: '1800360', name: 'JWDA Table Lamp, Small Alabaster White', currentStock: 189, rop: 200, suggestedQty: 150, leadTime: '45 days', priority: 'Low', supplier: 'Menu' }
])

const selectedItems = ref<number[]>([])
const filters = {
  priority: ref('All'),
  supplier: ref('All'),
  search: ref('')
}

const priorities = ['All', 'High', 'Medium', 'Low']
const suppliers = ['All', 'Audo Copenhagen', 'Norm Architects', 'Menu']

const filteredSuggestions = computed(() => {
  return orderSuggestions.value.filter(item => {
    const matchesPriority = filters.priority.value === 'All' || item.priority === filters.priority.value
    const matchesSupplier = filters.supplier.value === 'All' || item.supplier === filters.supplier.value
    const matchesSearch = item.name.toLowerCase().includes(filters.search.value.toLowerCase()) || 
                         item.sku.toLowerCase().includes(filters.search.value.toLowerCase())
    
    return matchesPriority && matchesSupplier && matchesSearch
  })
})

const totalSuggestedQty = computed(() => {
  return selectedItems.value.reduce((sum, id) => {
    const item = orderSuggestions.value.find(i => i.id === id)
    return sum + (item?.suggestedQty || 0)
  }, 0)
})

const highPriorityCount = computed(() => orderSuggestions.value.filter(i => i.priority === 'High').length)

function toggleAll() {
  if (selectedItems.value.length === filteredSuggestions.value.length) {
    selectedItems.value = []
  } else {
    selectedItems.value = filteredSuggestions.value.map(i => i.id)
  }
}

function createPurchaseOrder() {
  if (selectedItems.value.length === 0) {
    alert('Please select at least one item')
    return
  }
  alert(`Creating purchase order for ${selectedItems.value.length} items (Total: ${totalSuggestedQty.value} units)`)
}

const columns = [
  { id: 'select', key: 'select', label: '' },
  { id: 'sku', key: 'sku', label: 'SKU' },
  { id: 'name', key: 'name', label: 'Product Name' },
  { id: 'supplier', key: 'supplier', label: 'Supplier' },
  { id: 'currentStock', key: 'currentStock', label: 'Current Stock' },
  { id: 'rop', key: 'rop', label: 'ROP' },
  { id: 'suggestedQty', key: 'suggestedQty', label: 'Suggested Qty' },
  { id: 'leadTime', key: 'leadTime', label: 'Lead Time' },
  { id: 'priority', key: 'priority', label: 'Priority' }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UCard>
        <div class="space-y-1">
          <p class="text-xs uppercase text-muted">Total Suggestions</p>
          <p class="text-2xl font-bold">{{ orderSuggestions.length }}</p>
        </div>
      </UCard>

      <UCard>
        <div class="space-y-1">
          <p class="text-xs uppercase text-muted">High Priority</p>
          <p class="text-2xl font-bold text-red-500">{{ highPriorityCount }}</p>
        </div>
      </UCard>

      <UCard>
        <div class="space-y-1">
          <p class="text-xs uppercase text-muted">Selected Items</p>
          <p class="text-2xl font-bold">{{ selectedItems.length }}</p>
        </div>
      </UCard>

      <UCard>
        <div class="space-y-1">
          <p class="text-xs uppercase text-muted">Total Suggested Qty</p>
          <p class="text-2xl font-bold">{{ totalSuggestedQty }}</p>
        </div>
      </UCard>
    </div>

    <!-- Filters & Actions -->
    <UCard>
      <div class="flex flex-wrap items-center gap-4">
        <UInput v-model="filters.search.value" icon="i-ph-magnifying-glass" placeholder="Search..." class="w-64" />
        
        <USelect v-model="filters.priority.value" :items="priorities" label="Priority" class="w-40" />
        
        <USelect v-model="filters.supplier.value" :items="suppliers" label="Supplier" class="w-48" />

        <div class="ml-auto flex items-center gap-2">
          <UButton variant="outline" @click="toggleAll">
            {{ selectedItems.length === filteredSuggestions.length ? 'Deselect All' : 'Select All' }}
          </UButton>
          <UButton 
            color="primary" 
            icon="i-ph-shopping-cart" 
            :disabled="selectedItems.length === 0"
            @click="createPurchaseOrder"
          >
            Create Purchase Order ({{ selectedItems.length }})
          </UButton>
        </div>
      </div>
    </UCard>

    <!-- Order Suggestions Table -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Order Suggestions ({{ filteredSuggestions.length }})</h3>
      </template>

      <UTable :rows="filteredSuggestions" :columns="columns">
        <template #select-data="{ row }">
          <UCheckbox 
            :model-value="selectedItems.includes(row.id)" 
            @update:model-value="(checked) => {
              if (checked) {
                selectedItems.push(row.id)
              } else {
                selectedItems = selectedItems.filter(id => id !== row.id)
              }
            }"
          />
        </template>

        <template #sku-data="{ row }">
          <span class="font-mono text-sm">{{ row.sku }}</span>
        </template>

        <template #name-data="{ row }">
          <span class="font-medium">{{ row.name }}</span>
        </template>

        <template #currentStock-data="{ row }">
          <UBadge 
            :color="row.currentStock < row.rop ? 'red' : 'green'" 
            variant="subtle"
          >
            {{ row.currentStock }}
          </UBadge>
        </template>

        <template #suggestedQty-data="{ row }">
          <span class="font-semibold">{{ row.suggestedQty }}</span>
        </template>

        <template #priority-data="{ row }">
          <UBadge 
            :color="row.priority === 'High' ? 'red' : row.priority === 'Medium' ? 'amber' : 'green'" 
            variant="subtle"
          >
            {{ row.priority }}
          </UBadge>
        </template>
      </UTable>
    </UCard>

    <!-- Supplier Summary -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Summary by Supplier</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="supplier in ['Audo Copenhagen', 'Norm Architects', 'Menu']" :key="supplier" class="p-4 border border-default rounded">
          <div class="space-y-2">
            <p class="font-semibold">{{ supplier }}</p>
            <div class="text-sm text-muted">
              <p>Items: {{ orderSuggestions.filter(i => i.supplier === supplier).length }}</p>
              <p>Total Qty: {{ orderSuggestions.filter(i => i.supplier === supplier).reduce((sum, i) => sum + i.suggestedQty, 0) }}</p>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
