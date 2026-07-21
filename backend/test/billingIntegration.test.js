import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn(),
  },
}));

vi.mock("../model/tenantModel.js", () => ({
  createTenant: vi.fn(),
  getTenants: vi.fn(),
  getTenantById: vi.fn(),
  getTenantByUserId: vi.fn(),
  getTenantByEmail: vi.fn(),
  getTenantByInquiryId: vi.fn(),
  updateTenantPassword: vi.fn(),
  updateTenantStatus: vi.fn(),
}));

vi.mock("../model/inquiryModel.js", () => ({
  getInquiryRecordById: vi.fn(),
}));

vi.mock("../model/roomModel.js", () => ({
  getRoomById: vi.fn(),
}));

vi.mock("../service/billingService.js", () => ({
  generateBilling: vi.fn(),
}));

import bcrypt from "bcryptjs";

import {
  createTenant,
  getTenantByEmail,
  getTenantByInquiryId,
} from "../model/tenantModel.js";

import { getInquiryRecordById } from "../model/inquiryModel.js";

import { getRoomById } from "../model/roomModel.js";

import { generateBilling } from "../service/billingService.js";

import { createTenantAccount } from "../service/tenantService.js";

describe("Tenant Billing Integration", () => {
  const inquiryId = "33333333-3333-4333-8333-333333333333";

  const roomId = "22222222-2222-4222-8222-222222222222";

  const adminId = "11111111-1111-4111-8111-111111111111";

  const tenantId = "44444444-4444-4444-8444-444444444444";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create tenant and generate initial billing successfully", async () => {
    getInquiryRecordById.mockResolvedValue({
      id: inquiryId,
      status: "Approved",
    });

    getTenantByInquiryId.mockResolvedValue(null);

    getTenantByEmail.mockResolvedValue(null);

    getRoomById.mockResolvedValue({
      id: roomId,
      status: "Available",
    });

    bcrypt.hash.mockResolvedValue("hashed-password");

    createTenant.mockResolvedValue({
      tenant_id: tenantId,
      room_status: "Occupied",
    });

    generateBilling.mockResolvedValue({
      id: "55555555-5555-4555-8555-555555555555",
      tenant_id: tenantId,
      billing_type: "initial",
      total_amount: 5200,
      status: "Pending",
    });

    const result = await createTenantAccount({
      inquiryId,
      fullName: "Juan Dela Cruz",
      email: "juan@gmail.com",
      contact: "09123456789",
      roomId,
      username: "juan101",
      password: "Spartment2026",
      createdBy: adminId,
    });

    expect(generateBilling).toHaveBeenCalledWith({
      tenantId,
      billingType: "initial",
    });

    expect(result.billing.total_amount).toBe(5200);
  });

  it("should not create billing when tenant already exists", async () => {
    getInquiryRecordById.mockResolvedValue({
      id: inquiryId,
      status: "Approved",
    });

    getTenantByInquiryId.mockResolvedValue({
      id: tenantId,
    });

    await expect(
      createTenantAccount({
        inquiryId,
        fullName: "Juan Dela Cruz",
        email: "juan@gmail.com",
        roomId,
        username: "juan101",
        password: "Spartment2026",
        createdBy: adminId,
      }),
    ).rejects.toThrow(
      "A tenant account has already been created for this inquiry",
    );

    expect(generateBilling).not.toHaveBeenCalled();
  });
});
