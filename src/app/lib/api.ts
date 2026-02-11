// ============================================================================
// Type Definitions
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  localizationCode?: string;
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  localizationCode?: string;
  message: string;
  errors?: Record<string, string[]>;
}

// ============================================================================
// Configuration & Helpers
// ============================================================================

const BASE_URL = (import.meta as any).env?.VITE_API_URL || "";

function buildUrl(path: string): string {
  if (!BASE_URL) return "";
  return `${BASE_URL.replace(/\/$/, "")}${path.startsWith("/") ? "" : "/"}${path}`;
}

function getAcceptLanguage(): string {
  try {
    const lang = localStorage.getItem("maqraa_lang");
    if (lang) return lang;
    const nav = (navigator as any).language || (navigator as any).userLanguage;
    return nav ? (nav.split("-")[0] as string) : "en";
  } catch {
    return "en";
  }
}

function getAccessToken(): string {
  return localStorage.getItem("maqraa_token") || "";
}

function setTokens(access?: string, refresh?: string): void {
  if (access) localStorage.setItem("maqraa_token", access);
  if (refresh) localStorage.setItem("maqraa_refresh_token", refresh);
}

async function parseJsonSafe(res: Response): Promise<any> {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }
  try {
    return await res.text();
  } catch {
    return null;
  }
}

async function refreshTokens(): Promise<boolean> {
  const refresh = localStorage.getItem("maqraa_refresh_token");
  if (!refresh) return false;
  const url = buildUrl("/auth/refresh");
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": getAcceptLanguage(),
      },
      body: JSON.stringify({ refresh_token: refresh }),
    });
    const body = await parseJsonSafe(res);
    if (res.ok && body && (body as ApiResponse<any>).success) {
      const data = (body as ApiResponse<any>).data || {};
      if (data.access_token || data.refresh_token) {
        setTokens(data.access_token || data.token, data.refresh_token);
      }
      return true;
    }
  } catch (err) {
    // ignore
  }
  return false;
}

async function request<T = any>(
  path: string,
  opts: RequestInit = {},
  auth = true,
  retry = true,
): Promise<ApiResponse<T>> {
  const url = buildUrl(path);
  if (!url)
    return {
      success: false,
      statusCode: 0,
      localizationCode: "",
      message: "API base URL not configured",
      data: null as any,
    };

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Accept-Language": getAcceptLanguage(),
  };

  // Merge user headers
  if (opts.headers) {
    Object.assign(headers, opts.headers as Record<string, string>);
  }

  if (auth) {
    const token = getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const requestInit: RequestInit = { ...opts, headers };

  let res: Response;
  try {
    res = await fetch(url, requestInit);
  } catch (err) {
    throw {
      success: false,
      statusCode: 0,
      message: "Network error",
      errors: {},
    } as ApiErrorResponse;
  }

  const body = await parseJsonSafe(res);

  // If unauthorized, try refresh then retry once
  if (res.status === 401 && auth && retry) {
    const ok = await refreshTokens();
    if (ok) {
      return request<T>(path, opts, auth, false);
    }
  }

  if (!body) {
    if (!res.ok)
      throw {
        success: false,
        statusCode: res.status,
        message: res.statusText,
        errors: {},
      } as ApiErrorResponse;
    return {
      success: true,
      statusCode: res.status,
      localizationCode: "",
      message: "",
      data: null as any,
    } as ApiResponse<T>;
  }

  // Standard API envelope expected
  if ((body as any).success === false) {
    throw body as ApiErrorResponse;
  }

  // If success true, return as ApiResponse
  return body as ApiResponse<T>;
}

// ============================================================================
// API Client
// ============================================================================

export const api = {
  isEnabled: () => !!BASE_URL,

  // Auth
  async register(payload: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    return request(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      },
      false,
    );
  },

  async login(payload: { email: string; password: string }) {
    return request(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      },
      false,
    );
  },

  async refresh(payload: { refresh_token: string }) {
    return request(
      "/auth/refresh",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      },
      false,
    );
  },

  async info() {
    return request("/auth/info", { method: "GET" }, true);
  },

  // Upload (multipart)
  async uploadFile(file: File) {
    const form = new FormData();
    form.append("file", file);
    // do not set Content-Type; browser sets it with boundary
    return request(
      "/teachers/documents/upload/",
      {
        method: "POST",
        body: form as any,
      },
      true,
    );
  },

  // Teacher profile setup
  async saveTeacherProfileSetup(payload: any) {
    return request(
      "/teachers/profile-setup/",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      },
      true,
    );
  },

  async getTeacherProfileSetups() {
    return request("/teachers/profile-setup/", { method: "GET" }, true);
  },

  // Teacher application
  async submitTeacherApplication(payload: any) {
    return request(
      "/teachers/application/",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      },
      true,
    );
  },

  async getTeacherApplications() {
    return request("/teachers/application/status/", { method: "GET" }, true);
  },

  // Admin Applications
  async getAdminApplications(status?: number) {
    const query = status ? `?status=${status}` : "";
    return request(`/admin/applications/${query}`, { method: "GET" }, true);
  },

  async getAdminApplicationDetail(id: number) {
    return request(`/admin/applications/${id}/`, { method: "GET" }, true);
  },

  async approveTeacherApplication(
    id: number,
    payload: {
      action: 1 | 2 | 3;
      admin_notes?: string;
      rejection_reason?: string;
      required_documents?: string[];
    },
  ) {
    return request(
      `/admin/applications/${id}/approve/`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      },
      true,
    );
  },

  // Admin Services
  async getAdminTeacherServices(status?: number) {
    const query = status ? `?status=${status}` : "";
    return request(`/admin/teacher-services/${query}`, { method: "GET" }, true);
  },

  async approveTeacherService(
    id: number,
    payload: {
      action: "approve" | "adjust_rate" | "reject";
      admin_notes?: string;
      admin_final_rate?: string;
    },
  ) {
    return request(
      `/admin/teacher-services/${id}/approve/`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      },
      true,
    );
  },
};

export default api;
