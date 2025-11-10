export interface Product {
  id: number
  sku: string
  name: string
  category: string
  stock: number
  price: number
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  lastUpdated: string
}

export interface SalesData {
  npiTotal: number
  npiToDate: number
  salesToDate: number
  onHand: number
  openPOs: number
  salesIndex: number
  monthsStock: number
  monthsActual: number
}

export interface ProductWithSales extends Product {
  sales: SalesData
}

export const useDashboardData = () => {
  const products = useState<ProductWithSales[]>('dashboard-products', () => [
    { id: 1, sku: 'BL40166', name: 'Frame 42 Open Module / Frame - Smoke Oak', category: 'Furniture', stock: 401, price: 2450, status: 'In Stock', lastUpdated: '2024-03-15', sales: { npiTotal: 575, npiToDate: 132, salesToDate: 456, onHand: 401, openPOs: 0, salesIndex: 348, monthsStock: 4.5, monthsActual: 2.3 } },
    { id: 2, sku: '9398939-Q20TZZZZ', name: 'Harbour Side Dining Chair, Chrome Star Base', category: 'Furniture', stock: 2303, price: 3450, status: 'In Stock', lastUpdated: '2024-03-14', sales: { npiTotal: 1300, npiToDate: 453, salesToDate: 854, onHand: 2303, openPOs: 0, salesIndex: 218, monthsStock: 3.4, monthsActual: 1.6 } },
    { id: 3, sku: '9397939-Q204ZZZZ', name: 'Harbour Side Dining Chair, Chrome Star Base (Alt)', category: 'Furniture', stock: 1232, price: 3450, status: 'In Stock', lastUpdated: '2024-03-13', sales: { npiTotal: 430, npiToDate: 120, salesToDate: 167, onHand: 1232, openPOs: 0, salesIndex: 138, monthsStock: 4.4, monthsActual: 3.8 } },
    { id: 4, sku: '9396004-031Hk00ZZ', name: 'Harbour Lounge Chair, Black Star Base', category: 'Furniture', stock: 1340, price: 4200, status: 'In Stock', lastUpdated: '2024-03-12', sales: { npiTotal: 430, npiToDate: 120, salesToDate: 138, onHand: 1340, openPOs: 0, salesIndex: 110, monthsStock: 5.4, monthsActual: 4.9 } },
    { id: 5, sku: 'BL40360', name: 'Frame 42 With Door / Frame - Oak', category: 'Furniture', stock: 454, price: 2800, status: 'In Stock', lastUpdated: '2024-03-11', sales: { npiTotal: 250, npiToDate: 98, salesToDate: 103, onHand: 454, openPOs: 0, salesIndex: 102, monthsStock: 4.4, monthsActual: 5.4 } },
    { id: 6, sku: '9391004-030600ZZ', name: 'Harbour Dining Chair, Black Star Base', category: 'Furniture', stock: 407, price: 2950, status: 'In Stock', lastUpdated: '2024-03-10', sales: { npiTotal: 280, npiToDate: 95, salesToDate: 125, onHand: 407, openPOs: 0, salesIndex: 132, monthsStock: 3.8, monthsActual: 3.2 } },
    { id: 7, sku: '9391100-030600ZZ', name: 'Harbour Dining Chair, Black Star Base (Variant)', category: 'Furniture', stock: 154, price: 2950, status: 'Low Stock', lastUpdated: '2024-03-09', sales: { npiTotal: 180, npiToDate: 75, salesToDate: 95, onHand: 154, openPOs: 0, salesIndex: 127, monthsStock: 2.1, monthsActual: 1.6 } },
    { id: 8, sku: '1800360', name: 'JWDA Table Lamp, Small Alabaster White', category: 'Lighting', stock: 1345, price: 1400, status: 'In Stock', lastUpdated: '2024-03-08', sales: { npiTotal: 650, npiToDate: 245, salesToDate: 380, onHand: 1345, openPOs: 0, salesIndex: 155, monthsStock: 4.7, monthsActual: 3.5 } },
    { id: 9, sku: '1501307-D40E0ZZZ', name: 'Mingle Sofa, Sheepskin Dark Stained Oak', category: 'Furniture', stock: 430, price: 14572, status: 'In Stock', lastUpdated: '2024-03-07', sales: { npiTotal: 120, npiToDate: 45, salesToDate: 68, onHand: 430, openPOs: 0, salesIndex: 151, monthsStock: 6.8, monthsActual: 6.3 } },
    { id: 10, sku: '9391000-0001ZZZZ', name: 'Harbour Dining Chair, Black Star Base (Base)', category: 'Furniture', stock: 454, price: 2950, status: 'In Stock', lastUpdated: '2024-03-06', sales: { npiTotal: 290, npiToDate: 102, salesToDate: 118, onHand: 454, openPOs: 0, salesIndex: 116, monthsStock: 4.2, monthsActual: 3.8 } }
  ])

  // Computed values for KPIs
  const totalSales = computed(() => {
    return products.value.reduce((sum, p) => sum + p.sales.salesToDate * p.price, 0)
  })

  const totalPieces = computed(() => {
    return products.value.reduce((sum, p) => sum + p.sales.salesToDate, 0)
  })

  const inventoryBalance = computed(() => {
    return products.value.reduce((sum, p) => sum + p.stock * p.price, 0)
  })

  const totalInventoryPieces = computed(() => {
    return products.value.reduce((sum, p) => sum + p.stock, 0)
  })

  const totalProducts = computed(() => products.value.length)

  const inStockCount = computed(() => {
    return products.value.filter(p => p.status === 'In Stock').length
  })

  const lowStockCount = computed(() => {
    return products.value.filter(p => p.status === 'Low Stock').length
  })

  const totalValue = computed(() => {
    return products.value.reduce((sum, p) => sum + (p.stock * p.price), 0)
  })

  // Sales table data for dashboard
  const salesTableData = computed(() => {
    return products.value.map(p => ({
      id: p.id,
      link: 'Details',
      sku: p.sku,
      name: p.name,
      npiTotal: p.sales.npiTotal,
      npiToDate: p.sales.npiToDate,
      salesToDate: p.sales.salesToDate,
      onHand: p.sales.onHand,
      openPOs: p.sales.openPOs,
      salesIndex: p.sales.salesIndex,
      monthsStock: p.sales.monthsStock,
      monthsActual: p.sales.monthsActual
    }))
  })

  return {
    products,
    totalSales,
    totalPieces,
    inventoryBalance,
    totalInventoryPieces,
    totalProducts,
    inStockCount,
    lowStockCount,
    totalValue,
    salesTableData
  }
}
