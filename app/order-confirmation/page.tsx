import Link from "next/link";
import { Suspense } from "react";

type OrderConfirmationProps = {
  searchParams: Promise<{
    order?: string;
    total?: string;
    email?: string;
    name?: string;
    items?: string;
  }>;
};

async function OrderConfirmationContent({ searchParams }: OrderConfirmationProps) {
  const params = await searchParams;
  const order = typeof params.order === "string" ? params.order : "";
  const total = typeof params.total === "string" ? params.total : "0";
  const email = typeof params.email === "string" ? params.email : "";
  const name = typeof params.name === "string" ? params.name : "";
  const itemsParam = typeof params.items === "string" ? params.items : "[]";

  const orderedItems = JSON.parse(itemsParam) as Array<{
    id: string;
    product: string;
    sizeLabel: string;
    price: number;
    qty: number;
  }>;

  const orderedItemsList = Array.isArray(orderedItems) ? orderedItems : [];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between px-4 py-5 sm:px-8">
        <Link href="/" className="text-xl font-bold text-sky-600">PawClock</Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-sky-600">Home</Link>
          <Link href="/product" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600">Shop the PawClock Tower</Link>
          <Link href="/cart" className="text-sm font-medium text-slate-700 hover:text-sky-600">Cart</Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-8">
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-12">
          <svg
            className="mx-auto h-16 w-16 text-sky-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Order Confirmed</h1>
          <p className="mt-2 text-slate-600">Thank you, {name}. Your order has been placed.</p>
          <p className="mt-4 text-2xl font-bold text-sky-600">{order}</p>
          <p className="mt-2 text-sm text-slate-600">Order total: Rs. {total}</p>
          {email ? <p className="mt-1 text-sm text-slate-600">We will email you at {email}</p> : null}

          <div className="mt-8 text-left">
            <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
            {orderedItemsList.length > 0 ? (
              orderedItemsList.map((item) => (
                <div key={item.id} className="mt-3 flex items-center justify-between border-b border-slate-100 py-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.product}</p>
                    <p className="text-sm text-slate-600">{item.sizeLabel}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">Rs. {item.price * item.qty}</p>
                    <p className="text-sm text-slate-600">Qty: {item.qty}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-3 text-sm text-slate-600">No items were ordered.</p>
            )}
          </div>

          <Link href="/" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-sky-500 px-8 text-base font-semibold text-white hover:bg-sky-600">Back to shop</Link>
        </div>
      </main>
    </div>
  );
}

export default function OrderConfirmationPage({ searchParams }: OrderConfirmationProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <p className="text-lg font-medium text-slate-600">Loading your order...</p>
        </div>
      }
    >
      <OrderConfirmationContent searchParams={searchParams} />
    </Suspense>
  );
}
