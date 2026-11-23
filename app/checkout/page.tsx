"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  } else if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[0-9]{10}$/.test(values.phone.trim())) {
    errors.phone = "Please enter a valid 10-digit phone number";
  }

  if (!values.address.trim()) {
    errors.address = "Address is required";
  } else if (values.address.trim().length < 5) {
    errors.address = "Please enter a valid address";
  }

  return errors;
}

export default function CheckoutPage() {
  const [values, setValues] = useState<FormValues>(initialValues);

  const errors: FormErrors = validate(values);

  const isValid = Object.keys(errors).length === 0;

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }
    // Order placed - the cart would be cleared here in a full build.
    setValues(initialValues);
  };

  const fieldError = (field: keyof FormValues) =>
    errors[field] ? <p className="mt-1 text-sm font-medium text-red-600">{errors[field]}</p> : null;

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
        <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>

        <form onSubmit={onSubmit} noValidate className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-6">
            <div>
              <label htmlFor="checkout-name" className="text-sm font-semibold text-slate-900">Full Name</label>
              <input
                id="checkout-name"
                name="name"
                type="text"
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
              {fieldError("name")}
            </div>

            <div>
              <label htmlFor="checkout-email" className="text-sm font-semibold text-slate-900">Email</label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
              {fieldError("email")}
            </div>

            <div>
              <label htmlFor="checkout-phone" className="text-sm font-semibold text-slate-900">Phone Number</label>
              <input
                id="checkout-phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
              {fieldError("phone")}
            </div>

            <div>
              <label htmlFor="checkout-address" className="text-sm font-semibold text-slate-900">Address</label>
              <input
                id="checkout-address"
                name="address"
                type="text"
                value={values.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
              />
              {fieldError("address")}
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto">
            <button
              type="submit"
              disabled={!isValid}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-sky-500 px-8 text-base font-semibold text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-sky-200 sm:w-auto"
            >
              Place Order
            </button>
            <Link href="/" className="text-center text-sm font-medium text-slate-600 hover:text-sky-600">Back to shop</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
