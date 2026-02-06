import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
  Row,
  Column,
  Hr,
} from "@react-email/components";
import type { Order, OrderItem } from "@prisma/client";

type ReceiptEmailProps = {
  order: Order & { items: OrderItem[] };
};

export function ReceiptEmail({ order }: ReceiptEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Order Confirmation */}
          <Heading style={h1}>Order Confirmed!</Heading>
          <Text style={text}>
            Thank you for your order, {order.customerName}!
          </Text>
          <Text style={text}>
            Order Number: <strong>{order.orderNumber}</strong>
          </Text>

          {/* Order Items */}
          <Section style={orderSection}>
            <Heading style={h2}>Order Details</Heading>

            {order.items.map((item) => (
              <Row key={item.id} style={itemRow}>
                <Column>
                  <Text style={itemName}>{item.foodName}</Text>
                  <Text style={itemQuantity}>
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </Text>
                </Column>
                <Column style={itemPriceColumn}>
                  <Text style={itemTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={hr} />

            {/* Totals */}
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Subtotal:</Text>
              </Column>
              <Column style={totalValueColumn}>
                <Text style={totalValue}>${order.subtotal.toFixed(2)}</Text>
              </Column>
            </Row>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Tax:</Text>
              </Column>
              <Column style={totalValueColumn}>
                <Text style={totalValue}>${order.tax.toFixed(2)}</Text>
              </Column>
            </Row>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabelBold}>Total:</Text>
              </Column>
              <Column style={totalValueColumn}>
                <Text style={totalValueBold}>${order.total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Shipping Address */}
          <Section style={addressSection}>
            <Heading style={h2}>Delivery Address</Heading>
            <Text style={address}>
              {order.addressLine1}
              {order.addressLine2 && (
                <>
                  <br />
                  {order.addressLine2}
                </>
              )}
              <br />
              {order.city}, {order.state} {order.zipCode}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Contact us at support@reactbistro.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "16px 0",
  padding: "0 40px",
  textAlign: "center" as const,
};

const h2 = {
  color: "#374151",
  fontSize: "20px",
  fontWeight: "600",
  margin: "24px 0 16px",
};

const text = {
  color: "#6b7280",
  fontSize: "16px",
  lineHeight: "24px",
  padding: "0 40px",
  textAlign: "center" as const,
};

const orderSection = {
  padding: "24px 40px",
};

const itemRow = {
  marginBottom: "16px",
};

const itemName = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1f2937",
  margin: "0 0 4px",
};

const itemQuantity = {
  fontSize: "14px",
  color: "#6b7280",
  margin: 0,
};

const itemPriceColumn = {
  width: "100px",
  textAlign: "right" as const,
  verticalAlign: "top" as const,
};

const itemTotal = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1f2937",
  margin: 0,
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "24px 0",
};

const totalRow = {
  marginBottom: "8px",
};

const totalLabel = {
  fontSize: "14px",
  color: "#6b7280",
  margin: 0,
};

const totalValue = {
  fontSize: "14px",
  color: "#1f2937",
  margin: 0,
};

const totalValueColumn = {
  textAlign: "right" as const,
};

const totalLabelBold = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#1f2937",
  margin: 0,
};

const totalValueBold = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#16a34a",
  margin: 0,
};

const addressSection = {
  padding: "24px 40px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  margin: "0 40px",
};

const address = {
  fontSize: "14px",
  color: "#374151",
  lineHeight: "20px",
  margin: 0,
};

const footer = {
  padding: "32px 40px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  color: "#9ca3af",
  margin: 0,
};
