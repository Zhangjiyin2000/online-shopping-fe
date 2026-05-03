src/app/
  auth/
    login/
    register/

  user/
    home/
    products/
      product-list/
      product-detail/
    orders/
      order-list/
      order-detail/
    watchlist/
    stats/
      top-items/

  admin/
    dashboard/
    products/
      product-management/
      product-form/
      product-detail/
    orders/
      order-management/
      order-detail/
    stats/
      admin-stats/

  core/
    interceptors/
      auth.interceptor.ts
    guards/
      auth.guard.ts
      admin.guard.ts

  api/
    auth.service.ts
    user-product.service.ts
    user-order.service.ts
    watchlist.service.ts
    user-stats.service.ts
    admin-product.service.ts
    admin-order.service.ts
    admin-stats.service.ts

  models/
    product.model.ts
    order.model.ts
    stats.model.ts
    user.model.ts

  shared/
    components/
      navbar/
      loading/
      error-message/