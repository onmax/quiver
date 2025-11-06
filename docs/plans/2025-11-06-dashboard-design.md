# Dashboard Design

Date: 2025-11-06

## Overview

Create dashboard section with sidebar navigation using Nuxt UI components, matching nuxt-dashboard-2 template layout.

## Structure

**Files:**
- `app/layouts/dashboard.vue` - Dashboard layout with sidebar
- `app/pages/dashboard/[...slug].vue` - Catch-all route displaying current path

## Sidebar Navigation

**Groups:**

1. **Overview**
   - Forecast Dashboard
   - Sales Dashboard
   - Product List
   - Inventory Projection
   - Inventory Health
   - Order Suggestions

2. **Replenishment**
   - Order Suggestion
   - Supplier Forecast

3. **Enrich forecast**
   - Historical Data
   - Promotions & Events

4. **Collaboration**
   - New Product Introduction
   - Scenario Planning
   - S&OP

5. **Settings**
   - Inventory Management
   - Product Segmentation
   - Product Settings

6. **Developer Access**
   - API Documentation

## Technical Details

- **Layout:** UDashboardGroup + UDashboardSidebar
- **Icons:** Phosphor duotone (`i-ph-*-duotone`)
- **Sidebar:** Resizable, collapsible
- **Navigation:** UNavigationMenu with nested children
- **Catch-all:** Displays route path in h1

## Routes

All routes follow pattern: `/dashboard/[group]/[page]`

Examples:
- `/dashboard/overview/forecast`
- `/dashboard/enrich/historical-data`
- `/dashboard/settings/inventory-management`
