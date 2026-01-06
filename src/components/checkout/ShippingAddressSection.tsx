import { Input } from "../../shared/Input";
import type { CheckoutFormData } from "../../types/checkout.types";
import type { Status } from "../../types/status.types";

type ShippingAddressSectionProps = {
  formData: CheckoutFormData;
  errors: Partial<Record<keyof CheckoutFormData, string>>;
  formStatus: Status;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
};

export function ShippingAddressSection({
  formData,
  errors,
  formStatus,
  onChange,
}: ShippingAddressSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Delivery Address
      </h2>

      <div className="space-y-4">
        <Input
          id="addressLine1"
          label="Street Address"
          type="text"
          value={formData.addressLine1}
          onChange={(e) => onChange("addressLine1", e.target.value)}
          error={errors.addressLine1}
          formStatus={formStatus}
          placeholder="123 Main St"
        />

        <Input
          id="addressLine2"
          label="Apt, Suite, etc. (Optional)"
          type="text"
          value={formData.addressLine2 || ""}
          onChange={(e) => onChange("addressLine2", e.target.value)}
          error={errors.addressLine2}
          formStatus={formStatus}
          placeholder="Apt 4B"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="city"
            label="City"
            type="text"
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            error={errors.city}
            formStatus={formStatus}
            placeholder="New York"
          />

          <Input
            id="state"
            label="State"
            type="text"
            value={formData.state}
            onChange={(e) => onChange("state", e.target.value.toUpperCase())}
            error={errors.state}
            formStatus={formStatus}
            placeholder="NY"
          />
        </div>

        <Input
          id="zipCode"
          label="ZIP Code"
          type="text"
          value={formData.zipCode}
          onChange={(e) => onChange("zipCode", e.target.value)}
          error={errors.zipCode}
          formStatus={formStatus}
          placeholder="10001"
        />
      </div>
    </div>
  );
}
