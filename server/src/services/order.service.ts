import {
  PrismaClient,
  type Order,
  type OrderItem,
  PaymentStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

type CreateOrderInput = {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  items: Array<{
    foodId: string;
    foodName: string;
    foodImage: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  paymentStatus: PaymentStatus;
};

export async function createOrder(
  data: CreateOrderInput,
): Promise<Order & { items: OrderItem[] }> {
  // Generate unique order number
  const orderNumber = await generateOrderNumber();

  const order = await prisma.order.create({
    data: {
      orderNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      subtotal: data.subtotal,
      tax: data.tax,
      total: data.total,
      paymentStatus: data.paymentStatus,
      items: {
        create: data.items.map((item) => ({
          foodId: item.foodId,
          foodName: item.foodName,
          foodImage: item.foodImage,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  return order;
}

export async function getOrderById(
  orderId: string,
): Promise<(Order & { items: OrderItem[] }) | null> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  return order;
}

export async function updateOrderPaymentStatus(
  orderId: string,
  paymentStatus: PaymentStatus,
  stripePaymentId?: string,
): Promise<Order & { items: OrderItem[] }> {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus,
      paymentMethod: stripePaymentId ? "stripe" : undefined,
      stripePaymentId,
      fulfilledAt: paymentStatus === "PAID" ? new Date() : undefined,
    },
    include: { items: true },
  });

  return order;
}

async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();

  // Get the count of orders this year
  const startOfYear = new Date(year, 0, 1);
  const count = await prisma.order.count({
    where: {
      createdAt: {
        gte: startOfYear,
      },
    },
  });

  // Sequential number (padded to 6 digits)
  const sequential = (count + 1).toString().padStart(6, "0");

  return `ORD-${year}-${sequential}`;
}
