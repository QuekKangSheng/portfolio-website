"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  error?: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [state, setState] = useState<FormState>({ status: "idle" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setState({ status: "error", error: "Please fill in all fields." });
      return;
    }

    setState({ status: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message.");

      setState({ status: "success" });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setState({
        status: "error",
        error: "Something went wrong. Please try again or email me directly.",
      });
    }
  };

  const reset = () => setState({ status: "idle" });

  return { formData, state, handleChange, handleSubmit, reset };
}