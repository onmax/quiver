<script setup lang="ts">
const { products, totalProducts, inStockCount, lowStockCount, totalValue } = useDashboardData()

const searchQuery = ref('')
const selectedCategory = ref('All')
const selectedStatus = ref('All')

const categories = ['All', 'Furniture', 'Lighting', 'Accessories']
const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock']

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || product.category === selectedCategory.value
    const matchesStatus = selectedStatus.value === 'All' || product.status === selectedStatus.value
    
    return matchesSearch && matchesCategory && matchesStatus
  })
})

const columns = [
  { accessorKey: 'sku', header: 'SKU', enableSorting: true },
  { accessorKey: 'name', header: 'Product Name', enableSorting: true },
  { accessorKey: 'category', header: 'Category', enableSorting: true },
  { accessorKey: 'stock', header: 'Stock', enableSorting: true },
  { accessorKey: 'price', header: 'Price (Kr.)', enableSorting: true },
  { accessorKey: 'status', header: 'Status', enableSorting: true },
  { accessorKey: 'lastUpdated', header: 'Last Updated', enableSorting: true },
  { accessorKey: 'actions', header: 'Actions' }
]
</script>

<template>
  <div class="space-y-6">
    <!-- Filters -->
    <UCard>
      <div class="flex flex-wrap items-center gap-4">
        <UInput v-model="searchQuery" icon="i-ph-magnifying-glass" placeholder="Search products..." class="w-64" />
        
        <USelect v-model="selectedCategory" :items="categories" label="Category" class="w-40" />
        
        <USelect v-model="selectedStatus" :items="statuses" label="Status" class="w-40" />

        <div class="ml-auto">
          <UButton color="primary" icon="i-ph-plus">Add Product</UButton>
        </div>
      </div>
    </UCard>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UCard>
        <div class="space-y-1">
          <p class="text-xs uppercase text-muted">Total Products</p>
          <p class="text-2xl font-bold">{{ totalProducts }}</p>
        </div>
      </UCard>

      <UCard>
        <div class="space-y-1">
          <p class="text-xs uppercase text-muted">In Stock</p>
          <p class="text-2xl font-bold">{{ inStockCount }}</p>
        </div>
      </UCard>

      <UCard>
        <div class="space-y-1">
          <p class="text-xs uppercase text-muted">Low Stock</p>
          <p class="text-2xl font-bold text-amber-500">{{ lowStockCount }}</p>
        </div>
      </UCard>

      <UCard>
        <div class="space-y-1">
          <p class="text-xs uppercase text-muted">Total Value</p>
          <p class="text-2xl font-bold">{{ (totalValue / 1000).toFixed(0) }}k Kr.</p>
        </div>
      </UCard>
    </div>

    <!-- Product Table -->
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Product List ({{ filteredProducts.length }})</h3>
      </template>

      <UTable :data="filteredProducts" :columns="columns">
        <template #sku-data="{ row }">
          <span class="font-mono text-sm">{{ row.sku }}</span>
        </template>

        <template #name-data="{ row }">
          <span class="font-medium">{{ row.name }}</span>
        </template>

        <template #stock-data="{ row }">
          <span :class="row.stock < 200 ? 'text-amber-500' : ''">{{ row.stock }}</span>
        </template>

        <template #price-data="{ row }">
          <span>{{ row.price.toLocaleString() }} Kr.</span>
        </template>

        <template #status-data="{ row }">
          <UBadge 
            :color="row.status === 'In Stock' ? 'green' : row.status === 'Low Stock' ? 'amber' : 'red'" 
            variant="subtle"
          >
            {{ row.status }}
          </UBadge>
        </template>

        <template #actions-data="{ row }">
          <div class="flex items-center gap-2">
            <UButton variant="ghost" color="neutral" size="xs" icon="i-ph-eye">View</UButton>
            <UButton variant="ghost" color="neutral" size="xs" icon="i-ph-pencil">Edit</UButton>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
