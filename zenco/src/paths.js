export const paths = {
  index: "/",
  cart: "cart",

  //zencomex
  detail: (name, search, tag) => {
    if (search && search !== "") return `/${name}?search=${search}`;
    if (tag && tag !== "") return `/${name}?tag=${tag}`;
    return name ? `/${name}` : "/san-pham";
  },
  //zencomex
  admin: {
    index: "/admin",
    login: "/admin/auth/login",
    dashboard: {
      index: "/admin/dashboard",
      banner: "/admin/dashboard/banner",
      product: "/admin/dashboard/product",
      category: "/admin/dashboard/category",
      childCategory: "/admin/dashboard/childCategory",
      general: "/admin/dashboard/general",
      partner: "/admin/dashboard/partner",
      footer: "/admin/dashboard/footer",
      news_category: "/admin/dashboard/news-category",
    },
  },

  401: "/401",
  404: "/404",
  500: "/500",

  checkout: "/checkout",
  // contact: "/contact",
  pricing: "/pricing",

  auth: {
    auth0: {
      callback: "/auth/auth0/callback",
      login: "/auth/auth0/login",
    },
    jwt: {
      login: "/auth/jwt/login",
      register: "/auth/jwt/register",
    },
    firebase: {
      login: "/auth/firebase/login",
      register: "/auth/firebase/register",
    },
    amplify: {
      confirmRegister: "/auth/amplify/confirm-register",
      forgotPassword: "/auth/amplify/forgot-password",
      login: "/auth/amplify/login",
      register: "/auth/amplify/register",
      resetPassword: "/auth/amplify/reset-password",
    },
  },
  authDemo: {
    forgotPassword: {
      classic: "/auth-demo/forgot-password/classic",
      modern: "/auth-demo/forgot-password/modern",
    },
    login: {
      classic: "/auth-demo/login/classic",
      modern: "/auth-demo/login/modern",
    },
    register: {
      classic: "/auth-demo/register/classic",
      modern: "/auth-demo/register/modern",
    },
    resetPassword: {
      classic: "/auth-demo/reset-password/classic",
      modern: "/auth-demo/reset-password/modern",
    },
    verifyCode: {
      classic: "/auth-demo/verify-code/classic",
      modern: "/auth-demo/verify-code/modern",
    },
  },
  dashboard: {
    index: "/dashboard",
    academy: {
      index: "/dashboard/academy",
      courseDetails: "/dashboard/academy/courses/:courseId",
    },
    account: "/dashboard/account",
    analytics: "/dashboard/analytics",
    blank: "/dashboard/blank",
    blog: {
      index: "/dashboard/blog",
      postDetails: "/dashboard/blog/:postId",
      postCreate: "/dashboard/blog/create",
    },
    calendar: "/dashboard/calendar",
    chat: "/dashboard/chat",
    crypto: "/dashboard/crypto",
    customers: {
      index: "/dashboard/customers",
      details: "/dashboard/customers/:customerId",
      edit: "/dashboard/customers/:customerId/edit",
    },
    ecommerce: "/dashboard/ecommerce",
    fileManager: "/dashboard/file-manager",
    invoices: {
      index: "/dashboard/invoices",
      details: "/dashboard/invoices/:orderId",
    },
    jobs: {
      index: "/dashboard/jobs",
      create: "/dashboard/jobs/create",
      companies: {
        details: "/dashboard/jobs/companies/:companyId",
      },
    },
    kanban: "/dashboard/kanban",
    logistics: {
      index: "/dashboard/logistics",
      fleet: "/dashboard/logistics/fleet",
    },
    mail: "/dashboard/mail",
    orders: {
      index: "/dashboard/orders",
      details: "/dashboard/orders/:orderId",
    },
    products: {
      index: "/dashboard/products",
      create: "/dashboard/products/create",
    },
    social: {
      index: "/dashboard/social",
      profile: "/dashboard/social/profile",
      feed: "/dashboard/social/feed",
    },
  },
  components: {
    index: "/components",
    dataDisplay: {
      detailLists: "/components/data-display/detail-lists",
      tables: "/components/data-display/tables",
      quickStats: "/components/data-display/quick-stats",
    },
    lists: {
      groupedLists: "/components/lists/grouped-lists",
      gridLists: "/components/lists/grid-lists",
    },
    forms: "/components/forms",
    modals: "/components/modals",
    charts: "/components/charts",
    buttons: "/components/buttons",
    typography: "/components/typography",
    colors: "/components/colors",
    inputs: "/components/inputs",
  },
  docs: {
    analytics: {
      configuration: "/docs/analytics-configuration",
      eventTracking: "/docs/analytics-event-tracking",
      introduction: "/docs/analytics-introduction",
    },
    auth: {
      amplify: "/docs/auth-amplify",
      auth0: "/docs/auth-auth0",
      firebase: "/docs/auth-firebase",
      jwt: "/docs/auth-jwt",
    },
    changelog: "/docs/changelog",
    contact: "/docs/contact",
    dependencies: "/docs/dependencies",
    deployment: "/docs/deployment",
    environmentVariables: "/docs/environment-variables",
    gettingStarted: "/docs/getting-started",
    guards: {
      auth: "/docs/guards-auth",
      guest: "/docs/guards-guest",
      roleBased: "/docs/guards-role-based",
    },
    furtherSupport: "/docs/further-support",
    internationalization: "/docs/internationalization",
    mapbox: "/docs/mapbox",
    redux: "/docs/redux",
    routing: "/docs/routing",
    rtl: "/docs/rtl",
    serverCalls: "/docs/server-calls",
    settings: "/docs/settings",
    theming: "/docs/theming",
    welcome: "/docs/welcome",
  },
};
