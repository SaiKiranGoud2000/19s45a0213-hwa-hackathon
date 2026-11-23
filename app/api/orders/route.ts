import { NextResponse } from "next/server";

type OrderItem = {
  id: string;
  product: string;
  sizeLabel: string;
  price: number;
  qty: number;
};

type Order = {
  orderNumber: string;
  name: string;
  email: string;
  total: number;
  items: OrderItem[];
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const orders: Order[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { name, email, phone, address, items } = body as {
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      items?: OrderItem[];
    };

    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (typeof email !== "string" || !isValidEmail(email.trim())) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    if (typeof phone !== "string" || !/^[0-9]{10}$/.test(phone)) {
      return NextResponse.json({ error: "A valid 10-digit phone number is required" }, { status: 400 });
    }

    if (typeof address !== "string" || address.trim().length < 5) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "At least one item is required" }, { status: 400 });
    }

    const cleanedItems: OrderItem[] = items.map((item) => ({
      id: String(item?.id ?? ""),
      product: String(item?.product ?? ""),
      sizeLabel: String(item?.sizeLabel ?? ""),
      price: Number(item?.price ?? 0),
      qty: Number(item?.qty ?? 0),
    }));

    for (const item of cleanedItems) {
      if (!item.id || !item.product || !item.sizeLabel) {
        return NextResponse.json({ error: "Every item must have an id, product and size" }, { status: 400 });
      }
      if (!Number.isFinite(item.price) || item.price <= 0) {
        return NextResponse.json({ error: "Every item must have a valid price" }, { status: 400 });
      }
      if (!Number.isInteger(item.qty) || item.qty < 1) {
        return NextResponse.json({ error: "Every item must have a valid quantity" }, { status: 400 });
      }
    }

    const orderNumber = "PC-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const total = cleanedItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    orders.push({ orderNumber, name: name.trim(), email: email.trim(), total, items: cleanedItems });

    return NextResponse.json({ orderNumber, total, items: cleanedItems, email: email.trim() }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "The order could not be created. Please try again." }, { status: 400 });
  }
}
