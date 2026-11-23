"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const images = [
  { id: "front", src: "/images/product-front.jpg", alt: "The PawClock Tower in blue and white" },
  { id: "top", src: "/images/product-top.jpg", alt: "The top of the PawClock Tower" },
  { id: "chamber", src: "/images/chamber-closeup.jpg", alt: "Close up of a chamber of the PawClock Tower" },
  { id: "playing", src: "/images/dog-using.jpg", alt: "Dog playing with the PawClock Tower" },
];

const sizes = [
  { id: "small", label: "Small", capacity: "Up to 10 kg", price: 2499, stock: "In stock" },
  { id: "medium", label: "Medium", capacity: "10 to 25 kg", price: 3499, stock: "In stock" },
  { id: "large", label: "Large", capacity: "25 kg and above", price: 4499, stock: "In stock" },
];

export default function ProductPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [imageIndex, setImageIndex] = useState(3);
  const [sizeId, setSizeId] = useState("small");

  const size = sizes.find((s) => s.id === sizeId) ?? sizes[0];
  const image = images[imageIndex];

  const chooseSize = (id: string) => {
    setSizeId(id);
  };

  const addToCart = () => {
    addItem({ id: size.id, product: "PawClock Tower", sizeLabel: size.label + " - " + size.capacity, price: size.price });
    router.push("/cart");
  };

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

      <main className="flex flex-1 flex-col px-4 py-12 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <Link href="/" className="text-sm font-medium text-sky-600 hover:text-sky-700">Back to shop</Link>
          <section className="mt-6 grid gap-10 lg:grid-cols-2">
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-sky-50">
                <Image src={image.src} alt={image.alt} width={900} height={900} priority className="h-full w-full object-cover" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {images.map((img, index) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setImageIndex(index)}
                    className={"relative aspect-square w-full overflow-hidden rounded-xl border-2 " + (index === imageIndex ? "border-sky-500" : "border-transparent")}
                  >
                    <Image src={img.src} alt={img.alt} width={200} height={200} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">PawClock Tower</h1>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-sky-700">Wind-up puzzle for dogs</p>
              <p className="mt-4 text-3xl font-bold text-slate-900">Rs. {size.price}</p>
              <p className="mt-2 text-sm text-slate-600">{size.label} - {size.stock}</p>

              <div className="mt-8">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => chooseSize(s.id)}
                    className={"flex w-full flex-col gap-1 rounded-2xl border-2 p-4 text-left transition-colors " + (s.id === sizeId ? "border-sky-500 bg-sky-50" : "border-slate-200")}
                  >
                    <span className="text-base font-semibold text-slate-900">{s.label}</span>
                    <span className="text-sm text-slate-600">{s.capacity}</span>
                    <span className="text-sm font-medium text-slate-900">Rs. {s.price}</span>
                    <span className="text-xs text-slate-600">{s.stock}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={addToCart}
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-sky-500 px-8 text-base font-semibold text-white hover:bg-sky-600 sm:w-auto"
              >
                Add to Cart
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
