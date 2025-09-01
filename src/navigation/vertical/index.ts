// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Products',
      path: '/products',
      icon: 'tabler:building-store',
      children: [
        {
          title: 'Products',
          path: '/products',
          icon: 'tabler:building-store'
        },
        {
          title: 'Add Product',
          path: '/products/add-product',
          icon: "tabler:plus"
        },
        {
          title: 'Categories',
          path: '/products/categories',
          icon: 'tabler:category'
        },
        {
          title: 'Sub Categories',
          path: '/products/sub-categories',
          icon: 'tabler:category'
        },
        {
          title: 'Brands',
          path: '/products/brands',
          icon: 'tabler:brand-cake'
        }
      ]
    },
    {
      title: 'Orders',
      path: '/orders',
      icon: 'tabler:shopping-cart'
    },
    {
      title: 'Customers',
      path: '/user',
      icon: 'tabler:user'
    },
    {
      title: 'Manage Reviews',
      path: '/reviews',
      icon: 'tabler:star'
    },
    {
      title: 'Referrals',
      path: '/referrals',
      icon: 'tabler:star'
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: 'tabler:settings'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield'
    }
  ]
}

export default navigation
