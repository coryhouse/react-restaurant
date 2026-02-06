import { Input } from "../../shared/Input";
import type { CheckoutFormData } from "../../types/checkout.types";
import type { Status } from "../../types/status.types";

type CustomerInfoSectionProps = {
  formData: CheckoutFormData;
  errors: Partial<Record<keyof CheckoutFormData, string>>;
  formStatus: Status;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
};

export function CustomerInfoSection({
  formData,
  errors,
  formStatus,
  onChange,
}: CustomerInfoSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Contact Information
      </h2>

      <div className="space-y-4">
        <Input
          id="customerName"
          label="Full Name"
          type="text"
          value={formData.customerName}
          onChange={(e) => onChange("customerName", e.target.value)}
          error={errors.customerName}
          formStatus={formStatus}
        />

        <Input
          id="customerEmail"
          label="Email"
          type="email"
          value={formData.customerEmail}
          onChange={(e) => onChange("customerEmail", e.target.value)}
          error={errors.customerEmail}
          formStatus={formStatus}
        />

        <Input
          id="customerPhone"
          label="Phone (Optional)"
          type="phone"
          value={formData.customerPhone || ""}
          onChange={(e) => onChange("customerPhone", e.target.value)}
          error={errors.customerPhone}
          formStatus={formStatus}
        />
      </div>
    </div>
  );
}
