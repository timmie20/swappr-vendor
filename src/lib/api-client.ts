/**
 * API Client for Swappr Vendor Backend
 *
 * This file contains placeholder functions that will be replaced with actual
 * backend API calls in the future. All functions currently return mock data
 * or throw "not implemented" errors.
 *
 * TODO: Replace these placeholders with actual API calls to the backend
 */

import axiosInstance from "@/helpers/axiosInstance";
import { getToken } from "./cookies";
import { TokenType } from "@/types/auth-types";

// ============================================================================
// AUTHENTICATION API
// ============================================================================

export async function loginVendor(email: string, password: string) {
  const data = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
  return data;
}

export async function logoutVendor() {
  const token = await getToken(TokenType.RT);
  const data = await axiosInstance.post("/auth/logout", {
    refresh_token: token!,
  });
  console.log(axiosInstance.defaults.baseURL);
  console.log("Refresh token:", token);
  return { data: { success: data.status === 201 } };
}

export async function signupVendor(
  email: string,
  password: string,
  name: string,
) {
  // TODO: Implement actual API call
  // return axiosInstance.post('/api/vendor/signup', { email, password, name });

  console.warn("signupVendor: Placeholder function called");
  return {
    data: {
      user: {
        id: "mock-user-id",
        email: email,
        name: name,
      },
      token: "mock-jwt-token",
    },
  };
}

export async function getVendorProfile() {
  // TODO: Implement actual API call
  // return axiosInstance.get('/api/vendor/profile');

  console.warn("getVendorProfile: Placeholder function called");
  return {
    data: {
      id: "mock-user-id",
      email: "vendor@swappr.com",
      name: "Mock Vendor",
      role: "vendor",
      image_url: null,
    },
  };
}

export async function updateVendorProfile(data: any) {
  // TODO: Implement actual API call
  // return axiosInstance.put('/api/vendor/profile', data);

  console.warn("updateVendorProfile: Placeholder function called");
  return { data: { ...data, success: true } };
}

// ============================================================================
// PRODUCTS API
// ============================================================================

export async function fetchVendorProducts(params?: any) {
  // TODO: Implement actual API call
  // return axiosInstance.get('/api/vendor/products', { params });

  console.warn("fetchVendorProducts: Placeholder function called");
  return {
    data: {
      products: [],
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        totalPages: 0,
        totalItems: 0,
      },
    },
  };
}

export async function fetchProductDetails(slug: string) {
  // TODO: Implement actual API call
  // return axiosInstance.get(`/api/vendor/products/${slug}`);

  console.warn("fetchProductDetails: Placeholder function called");
  return {
    data: {
      product: null,
    },
  };
}

export async function createProduct(productData: FormData) {
  // TODO: Implement actual API call
  // return axiosInstance.post('/api/vendor/products', productData);

  console.warn("createProduct: Placeholder function called");
  return {
    data: {
      product: {
        id: "mock-product-id",
        name: productData.get("name"),
        slug: productData.get("slug"),
      },
      success: true,
    },
  };
}

export async function updateProduct(id: string, productData: FormData) {
  // TODO: Implement actual API call
  // return axiosInstance.put(`/api/vendor/products/${id}`, productData);

  console.warn("updateProduct: Placeholder function called");
  return {
    data: {
      product: { id, ...Object.fromEntries(productData) },
      success: true,
    },
  };
}

export async function deleteProduct(id: string) {
  // TODO: Implement actual API call
  // return axiosInstance.delete(`/api/vendor/products/${id}`);

  console.warn("deleteProduct: Placeholder function called");
  return { data: { success: true } };
}

export async function toggleProductStatus(id: string, published: boolean) {
  // TODO: Implement actual API call
  // return axiosInstance.patch(`/api/vendor/products/${id}/status`, { published });

  console.warn("toggleProductStatus: Placeholder function called");
  return { data: { success: true, published } };
}

// ============================================================================
// ORDERS API
// ============================================================================

export async function fetchVendorOrders(params?: any) {
  // TODO: Implement actual API call
  // return axiosInstance.get('/api/vendor/orders', { params });

  console.warn("fetchVendorOrders: Placeholder function called");
  return {
    data: {
      orders: [],
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        totalPages: 0,
        totalItems: 0,
      },
    },
  };
}

export async function fetchOrderDetails(id: string) {
  // TODO: Implement actual API call
  // return axiosInstance.get(`/api/vendor/orders/${id}`);

  console.warn("fetchOrderDetails: Placeholder function called");
  return {
    data: {
      order: null,
    },
  };
}

export async function updateOrderStatus(id: string, status: string) {
  // TODO: Implement actual API call
  // return axiosInstance.patch(`/api/vendor/orders/${id}/status`, { status });

  console.warn("updateOrderStatus: Placeholder function called");
  return { data: { success: true, status } };
}

// ============================================================================
// SWAP REQUESTS API (NEW FOR SWAPPR)
// ============================================================================

export async function fetchSwapRequests(params?: any) {
  // TODO: Implement actual API call
  // return axiosInstance.get('/api/vendor/swap-requests', { params });

  console.warn("fetchSwapRequests: Placeholder function called");
  return {
    data: {
      swapRequests: [],
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        totalPages: 0,
        totalItems: 0,
      },
    },
  };
}

export async function fetchSwapRequestDetails(id: string) {
  // TODO: Implement actual API call
  // return axiosInstance.get(`/api/vendor/swap-requests/${id}`);

  console.warn("fetchSwapRequestDetails: Placeholder function called");
  return {
    data: {
      swapRequest: {
        id,
        customerId: "mock-customer-id",
        customerName: "John Doe",
        currentDevice: {
          brand: "Apple",
          model: "iPhone 12",
          storage: "128GB",
          condition: "Good",
          estimatedValue: 45000,
        },
        desiredDevice: {
          brand: "Apple",
          model: "iPhone 14",
          storage: "256GB",
          price: 85000,
        },
        status: "pending",
        createdAt: new Date().toISOString(),
      },
    },
  };
}

export async function updateSwapRequestStatus(
  id: string,
  status: string,
  notes?: string,
) {
  // TODO: Implement actual API call
  // return axiosInstance.patch(`/api/vendor/swap-requests/${id}/status`, { status, notes });

  console.warn("updateSwapRequestStatus: Placeholder function called");
  return { data: { success: true, status } };
}

export async function processSwapRequest(id: string, data: any) {
  // TODO: Implement actual API call
  // return axiosInstance.post(`/api/vendor/swap-requests/${id}/process`, data);

  console.warn("processSwapRequest: Placeholder function called");
  return { data: { success: true, ...data } };
}

// ============================================================================
// CUSTOMERS API
// ============================================================================

export async function fetchVendorCustomers(params?: any) {
  // TODO: Implement actual API call
  // return axiosInstance.get('/api/vendor/customers', { params });

  console.warn("fetchVendorCustomers: Placeholder function called");
  return {
    data: {
      customers: [],
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        totalPages: 0,
        totalItems: 0,
      },
    },
  };
}

export async function fetchCustomerDetails(id: string) {
  // TODO: Implement actual API call
  // return axiosInstance.get(`/api/vendor/customers/${id}`);

  console.warn("fetchCustomerDetails: Placeholder function called");
  return {
    data: {
      customer: null,
    },
  };
}

// ============================================================================
// CATEGORIES API
// ============================================================================

export async function fetchCategories(params?: any) {
  // TODO: Implement actual API call
  // return axiosInstance.get('/api/vendor/categories', { params });

  console.warn("fetchCategories: Placeholder function called");
  return {
    data: {
      categories: [],
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        totalPages: 0,
        totalItems: 0,
      },
    },
  };
}

export async function createCategory(data: any) {
  // TODO: Implement actual API call
  // return axiosInstance.post('/api/vendor/categories', data);

  console.warn("createCategory: Placeholder function called");
  return { data: { category: { id: "mock-id", ...data }, success: true } };
}

export async function updateCategory(id: string, data: any) {
  // TODO: Implement actual API call
  // return axiosInstance.put(`/api/vendor/categories/${id}`, data);

  console.warn("updateCategory: Placeholder function called");
  return { data: { category: { id, ...data }, success: true } };
}

export async function deleteCategory(id: string) {
  // TODO: Implement actual API call
  // return axiosInstance.delete(`/api/vendor/categories/${id}`);

  console.warn("deleteCategory: Placeholder function called");
  return { data: { success: true } };
}

// ============================================================================
// COUPONS API
// ============================================================================

export async function fetchCoupons(params?: any) {
  // TODO: Implement actual API call
  // return axiosInstance.get('/api/vendor/coupons', { params });

  console.warn("fetchCoupons: Placeholder function called");
  return {
    data: {
      coupons: [],
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        totalPages: 0,
        totalItems: 0,
      },
    },
  };
}

export async function createCoupon(data: any) {
  // TODO: Implement actual API call
  // return axiosInstance.post('/api/vendor/coupons', data);

  console.warn("createCoupon: Placeholder function called");
  return { data: { coupon: { id: "mock-id", ...data }, success: true } };
}

export async function updateCoupon(id: string, data: any) {
  // TODO: Implement actual API call
  // return axiosInstance.put(`/api/vendor/coupons/${id}`, data);

  console.warn("updateCoupon: Placeholder function called");
  return { data: { coupon: { id, ...data }, success: true } };
}

export async function deleteCoupon(id: string) {
  // TODO: Implement actual API call
  // return axiosInstance.delete(`/api/vendor/coupons/${id}`);

  console.warn("deleteCoupon: Placeholder function called");
  return { data: { success: true } };
}

// ============================================================================
// STAFF API
// ============================================================================

export async function fetchStaff(params?: any) {
  // TODO: Implement actual API call
  // return axiosInstance.get('/api/vendor/staff', { params });

  console.warn("fetchStaff: Placeholder function called");
  return {
    data: {
      staff: [],
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        totalPages: 0,
        totalItems: 0,
      },
    },
  };
}

export async function updateStaff(id: string, data: any) {
  // TODO: Implement actual API call
  // return axiosInstance.put(`/api/vendor/staff/${id}`, data);

  console.warn("updateStaff: Placeholder function called");
  return { data: { staff: { id, ...data }, success: true } };
}

export async function deleteStaff(id: string) {
  // TODO: Implement actual API call
  // return axiosInstance.delete(`/api/vendor/staff/${id}`);

  console.warn("deleteStaff: Placeholder function called");
  return { data: { success: true } };
}

// ============================================================================
// NOTIFICATIONS API
// ============================================================================

export async function fetchNotifications(params?: any) {
  // TODO: Implement actual API call
  // return axiosInstance.get('/api/vendor/notifications', { params });

  console.warn("fetchNotifications: Placeholder function called");
  return {
    data: {
      notifications: [],
      unreadCount: 0,
    },
  };
}

export async function markNotificationAsRead(id: string) {
  // TODO: Implement actual API call
  // return axiosInstance.patch(`/api/vendor/notifications/${id}/read`);

  console.warn("markNotificationAsRead: Placeholder function called");
  return { data: { success: true } };
}

// ============================================================================
// DASHBOARD ANALYTICS API
// ============================================================================

export async function fetchDashboardAnalytics() {
  // TODO: Implement actual API call
  // return axiosInstance.get('/api/vendor/analytics/dashboard');

  console.warn("fetchDashboardAnalytics: Placeholder function called");
  return {
    data: {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingSwapRequests: 0,
      recentOrders: [],
      recentSwapRequests: [],
      topProducts: [],
    },
  };
}
