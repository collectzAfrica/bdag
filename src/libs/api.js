import { database } from "@/config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const sendContactForm = async (data) => {
  // addDoc(
  //   collection(database, "wallets"),
  //   {
  //     data: data,
  //   },
  //   { merge: true }
  // );

  return fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
};
