"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCoffee, FaTimes, FaCheckCircle } from "react-icons/fa";

const PRESETS = [49, 99, 199, 499];
const DEFAULT_AMOUNT = 99;
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 50000;
const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let checkoutPromise = null;
function loadCheckout() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (!checkoutPromise) {
    checkoutPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = CHECKOUT_SRC;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => {
        checkoutPromise = null;
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  return checkoutPromise;
}

async function readJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

/**
 * Buy Me a Coffee nav button.
 * variant="desktop" -> gradient pill with label, variant="mobile" -> compact round icon.
 * Opens a small popover with preset amounts, then Razorpay Checkout.
 */
export default function CoffeeButton({ variant = "desktop", onOpen }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const keyIdRef = useRef("");

  useEffect(() => setMounted(true), []);

  const finalAmount = custom !== "" ? Number(custom) : amount;
  const amountValid =
    Number.isInteger(finalAmount) && finalAmount >= MIN_AMOUNT && finalAmount <= MAX_AMOUNT;

  const close = useCallback(() => {
    if (status === "loading") return;
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setError("");
      setPaymentId("");
    }, 250);
  }, [status]);

  const openPopover = () => {
    onOpen?.();
    setOpen(true);
    loadCheckout(); // warm up the script
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const pay = async () => {
    if (!amountValid || status === "loading") return;
    setStatus("loading");
    setError("");

    try {
      const loaded = await loadCheckout();
      if (!loaded || !window.Razorpay) throw new Error("Could not load Razorpay. Check your connection.");

      if (!keyIdRef.current) {
        const keyRes = await fetch("/api/razorpay/key", { cache: "no-store" });
        const keyData = await readJson(keyRes);
        if (!keyRes.ok || !keyData.keyId) throw new Error(keyData.error || "Payments are not available right now.");
        keyIdRef.current = keyData.keyId;
      }

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, name: name.trim() }),
      });
      const order = await readJson(orderRes);
      if (!orderRes.ok || !order.orderId) throw new Error(order.error || "Could not start the payment.");

      const rzp = new window.Razorpay({
        key: keyIdRef.current,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Ayush Yadav",
        description: "Buy me a coffee ☕",
        image: `${window.location.origin}/profile.png`,
        prefill: name.trim() ? { name: name.trim() } : undefined,
        notes: { purpose: "Buy Me a Coffee" },
        theme: { color: "#3b82f6" },
        handler: async (response) => {
          setPaymentId(response.razorpay_payment_id || "");
          try {
            const vRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const v = await readJson(vRes);
            if (!vRes.ok || !v.verified) {
              console.warn("Coffee payment verification failed:", v.error);
            }
          } catch (e) {
            console.warn("Coffee payment verification request failed:", e);
          }
          setStatus("success");
        },
        modal: {
          ondismiss: () => setStatus((s) => (s === "loading" ? "idle" : s)),
        },
      });

      rzp.on("payment.failed", (resp) => {
        setError(resp?.error?.description || "Payment failed. Please try again.");
        setStatus("error");
      });

      rzp.open();
    } catch (e) {
      setError(e.message || "Something went wrong.");
      setStatus("error");
    }
  };

  const trigger =
    variant === "mobile" ? (
      <motion.button
        type="button"
        onClick={openPopover}
        className="relative w-9 h-9 flex items-center justify-center rounded-full text-white bg-[image:var(--accent-gradient)] shadow-[0_4px_16px_rgba(139,92,246,0.35)] cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Buy me a coffee"
      >
        <FaCoffee className="text-[0.9rem]" />
      </motion.button>
    ) : (
      <motion.button
        type="button"
        onClick={openPopover}
        className="relative inline-flex items-center justify-center gap-2 w-9 h-9 lg:w-auto lg:h-auto lg:px-4 lg:py-2 rounded-full text-white text-[0.8rem] font-[600] uppercase tracking-[1.2px] bg-[image:var(--accent-gradient)] shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:shadow-[0_6px_28px_rgba(139,92,246,0.5)] transition-shadow duration-300 cursor-pointer whitespace-nowrap"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Buy me a coffee"
        title="Buy me a coffee"
      >
        <FaCoffee className="text-[0.9rem]" />
        <span className="hidden lg:inline">Coffee</span>
      </motion.button>
    );

  const popover = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="coffee-overlay"
          className="fixed inset-0 z-[2000] flex items-start justify-center md:justify-end px-4 pt-24 md:pr-[max(1rem,calc((100vw-900px)/2))] bg-black/40 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Buy me a coffee"
            className="relative w-full max-w-[340px] rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-[var(--shadow-lg)] p-5 overflow-hidden"
            initial={{ y: -12, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -12, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[image:var(--accent-gradient)]" />

            <button
              type="button"
              onClick={close}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <FaTimes />
            </button>

            {status === "success" ? (
              <div className="text-center py-4">
                <FaCheckCircle className="mx-auto text-[2.5rem] text-emerald-500 mb-3" />
                <h3 className="text-[1.15rem] font-[700] mb-1">Thank you! ☕</h3>
                <p className="text-[0.9rem] text-[var(--text-secondary)]">
                  Your coffee means a lot. I really appreciate the support.
                </p>
                {paymentId && (
                  <p className="mt-3 text-[0.75rem] text-[var(--text-secondary)] break-all">
                    Payment ID: {paymentId}
                  </p>
                )}
                <button
                  type="button"
                  onClick={close}
                  className="mt-5 w-full py-2.5 rounded-full text-white font-[600] bg-[image:var(--accent-gradient)] cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4 pr-8">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full text-white bg-[image:var(--accent-gradient)] shrink-0">
                    <FaCoffee />
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-[700] leading-tight">Buy me a coffee</h3>
                    <p className="text-[0.8rem] text-[var(--text-secondary)]">Support my work with a small tip</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-3">
                  {PRESETS.map((p) => {
                    const active = custom === "" && amount === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setAmount(p);
                          setCustom("");
                        }}
                        className={`py-2 rounded-xl text-[0.9rem] font-[600] border transition-all duration-200 cursor-pointer ${
                          active
                            ? "text-white border-transparent bg-[image:var(--accent-gradient)] shadow-[var(--shadow-glow)]"
                            : "border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)]"
                        }`}
                      >
                        ₹{p}
                      </button>
                    );
                  })}
                </div>

                <label className="block mb-3">
                  <span className="sr-only">Custom amount</span>
                  <div className="flex items-center rounded-xl border border-[var(--border-color)] focus-within:border-[var(--accent-primary)] transition-colors px-3">
                    <span className="text-[var(--text-secondary)] font-[600]">₹</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={MIN_AMOUNT}
                      max={MAX_AMOUNT}
                      step={1}
                      placeholder="Other amount"
                      value={custom}
                      onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, "").slice(0, 5))}
                      className="w-full bg-transparent outline-none py-2.5 px-2 text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                    />
                  </div>
                </label>

                <label className="block mb-4">
                  <span className="sr-only">Your name (optional)</span>
                  <input
                    type="text"
                    maxLength={60}
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[var(--border-color)] focus:border-[var(--accent-primary)] bg-transparent outline-none py-2.5 px-3 text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] transition-colors"
                  />
                </label>

                {error && (
                  <p className="mb-3 text-[0.8rem] text-red-500" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={pay}
                  disabled={!amountValid || status === "loading"}
                  className="w-full py-3 rounded-full text-white font-[600] tracking-[0.5px] bg-[image:var(--accent-gradient)] shadow-[0_4px_20px_rgba(139,92,246,0.35)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-opacity"
                >
                  {status === "loading"
                    ? "Opening Razorpay…"
                    : amountValid
                      ? `Pay ₹${finalAmount}`
                      : `Enter ₹${MIN_AMOUNT}–₹${MAX_AMOUNT}`}
                </button>

                <p className="mt-3 text-center text-[0.7rem] text-[var(--text-secondary)]">
                  Secured by Razorpay · UPI, cards, netbanking
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {trigger}
      {mounted && createPortal(popover, document.body)}
    </>
  );
}
