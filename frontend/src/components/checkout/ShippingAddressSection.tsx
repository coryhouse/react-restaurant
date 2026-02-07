import { Input } from "../../shared/Input";
import { Select } from "../../shared/Select";
import type { CheckoutFormData } from "../../types/checkout.types";
import type { Status } from "../../types/status.types";

type ShippingAddressSectionProps = {
  formData: CheckoutFormData;
  errors: Partial<Record<keyof CheckoutFormData, string>>;
  formStatus: Status;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
};

const usStates = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

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
        />

        <Input
          id="addressLine2"
          label="Apt, Suite, etc. (Optional)"
          type="text"
          value={formData.addressLine2 || ""}
          onChange={(e) => onChange("addressLine2", e.target.value)}
          error={errors.addressLine2}
          formStatus={formStatus}
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
          />

          <Select
            id="state"
            label="State"
            value={formData.state}
            onChange={(e) => onChange("state", e.target.value)}
            error={errors.state}
            formStatus={formStatus}
          >
            <option value="">Select a state</option>
            {usStates.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </Select>
        </div>

        <Input
          id="zipCode"
          label="ZIP Code"
          type="text"
          value={formData.zipCode}
          onChange={(e) => onChange("zipCode", e.target.value)}
          error={errors.zipCode}
          formStatus={formStatus}
        />
      </div>
    </div>
  );
}
