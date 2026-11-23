"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, setQty, removeItem, total } = useCart();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between px-4 py-5 sm:px-8">
        <Link href="/" className="text-xl font-bold text-sky-600">PawClock</Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-sky-600">Home</Link>
          <Link href="/product" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600">Shop the PawClock Tower</Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center rounded-2xl bg-sky-50 px-8 py-16 text-center">
            <p className="text-lg font-semibold text-slate-900">Your cart is empty</p>
            <p className="mt-2 text-sm text-slate-600">
              No worries - your dog is still winding down. Add the PawClock Tower and give them a puzzle.
            </p>
            <Link href="/" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-sky-500 px-8 text-base font-semibold text-white hover:bg-sky-600">Back to shop</Link>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-b-0">
                <div>
                  <p className="font-semibold text-slate-900">{item.product}</p>
                  <p className="text-sm text-slate-600">{item.sizeLabel}</p>
                  <p className="text-sm font-medium text-slate-900">Rs. {item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.qty - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-sky-50"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center text-base font-semibold text-slate-900">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.qty + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-sky-50"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex items-center justify-between">
              <p className="text-lg font-semibold text-slate-900">Total</p>
              <p className="text-2xl font-bold text-slate-900">Rs. {total}</p>
            </div>
            <div className="mt-6">
              <Link href="/checkout" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-sky-500 px-8 text-base font-semibold text-white hover:bg-sky-600 sm:w-auto">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
