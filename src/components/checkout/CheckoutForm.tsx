import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { orderMutations } from "../../query-factories/orders";
import { Button } from "../../shared/Button";
import type { CartItem } from "../../types/cart.types";
import {
  type CheckoutFormData,
  checkoutFormSchema,
} from "../../types/checkout.types";
import type { Status } from "../../types/status.types";
import { CustomerInfoSection } from "./CustomerInfoSection";
import { ShippingAddressSection } from "./ShippingAddressSection";

type CheckoutFormProps = {
  items: CartItem[];
};

export function CheckoutForm({ items }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({});
  const [formStatus, setFormStatus] = useState<Status>("idle");

  const checkoutMutation = useMutation(orderMutations.createCheckout());

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Validate with Zod
    const result = checkoutFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof CheckoutFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setFormStatus("submitted");
      return;
    }

    try {
      const response = await checkoutMutation.mutateAsync({
        ...formData,
        items,
      });

      // Redirect to Stripe Checkout
      window.location.href = response.url;
    } catch {
      setFormStatus("submitted");
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <CustomerInfoSection
        formData={formData}
        errors={errors}
        formStatus={formStatus}
        onChange={handleChange}
      />

      <ShippingAddressSection
        formData={formData}
        errors={errors}
        formStatus={formStatus}
        onChange={handleChange}
      />

      <Button
        type="submit"
        className="w-full font-bold"
        size="lg"
        disabled={checkoutMutation.isPending}
      >
        {checkoutMutation.isPending ? "Processing..." : "Continue to Payment"}
      </Button>
    </form>
  );
}
