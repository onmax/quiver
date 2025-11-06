import type { NavigationMenuItem } from '~/components/SideNav/types'

export function useDashboardTabs() {
  const links: NavigationMenuItem[] = [
    { icon: 'i-ph-squares-four-duotone', label: 'Overview', open: true, children: [
      { to: '/dashboard/overview/forecast', icon: 'i-ph-chart-line-up-duotone', label: 'Forecast Dashboard' },
      { to: '/dashboard/overview/sales', icon: 'i-ph-chart-bar-duotone', label: 'Sales Dashboard' },
      { to: '/dashboard/overview/product-list', icon: 'i-ph-list-bullets-duotone', label: 'Product List' },
      { to: '/dashboard/overview/inventory-projection', icon: 'i-ph-trend-up-duotone', label: 'Inventory Projection' },
      { to: '/dashboard/overview/inventory-health', icon: 'i-ph-heart-duotone', label: 'Inventory Health' },
      { to: '/dashboard/overview/order-suggestions', icon: 'i-ph-lightbulb-duotone', label: 'Order Suggestions' }
    ]},
    { icon: 'i-ph-arrows-clockwise-duotone', label: 'Replenishment', children: [
      { to: '/dashboard/replenishment/order-suggestion', icon: 'i-ph-shopping-cart-duotone', label: 'Order Suggestion' },
      { to: '/dashboard/replenishment/supplier-forecast', icon: 'i-ph-truck-duotone', label: 'Supplier Forecast' }
    ]},
    { icon: 'i-ph-database-duotone', label: 'Enrich forecast', children: [
      { to: '/dashboard/enrich/historical-data', icon: 'i-ph-clock-clockwise-duotone', label: 'Historical Data' },
      { to: '/dashboard/enrich/promotions-events', icon: 'i-ph-megaphone-duotone', label: 'Promotions & Events' }
    ]},
    { icon: 'i-ph-users-three-duotone', label: 'Collaboration', children: [
      { to: '/dashboard/collaboration/new-product', icon: 'i-ph-sparkle-duotone', label: 'New Product Introduction' },
      { to: '/dashboard/collaboration/scenario-planning', icon: 'i-ph-graph-duotone', label: 'Scenario Planning' },
      { to: '/dashboard/collaboration/sop', icon: 'i-ph-handshake-duotone', label: 'S&OP' }
    ]},
    { icon: 'i-ph-gear-duotone', label: 'Settings', children: [
      { to: '/dashboard/settings/inventory-management', icon: 'i-ph-package-duotone', label: 'Inventory Management' },
      { to: '/dashboard/settings/product-segmentation', icon: 'i-ph-tree-structure-duotone', label: 'Product Segmentation' },
      { to: '/dashboard/settings/product-settings', icon: 'i-ph-sliders-duotone', label: 'Product Settings' }
    ]},
    { icon: 'i-ph-code-duotone', label: 'Developer Access', children: [
      { to: '/dashboard/developer/api-docs', icon: 'i-ph-book-open-duotone', label: 'API Documentation' }
    ]}
  ]

  const getTabsForGroup = (groupPath: string) => {
    const group = links.find(link => link.children?.some(child => child.to?.startsWith(groupPath)))
    if (!group?.children) return []

    return group.children.map(child => ({
      label: child.label,
      to: child.to
    }))
  }

  return { links, getTabsForGroup }
}
