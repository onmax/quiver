import type { NavigationMenuItem as NuxtNavigationMenuItem } from '@nuxt/ui'

export interface NavigationMenuItem extends NuxtNavigationMenuItem {
  open?: boolean
}
