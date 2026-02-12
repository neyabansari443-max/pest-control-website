"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSetupClient() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const Swal = (await import("sweetalert2")).default;

        try {
            const [
                { createUserWithEmailAndPassword },
                { doc, setDoc },
                { auth, db },
            ] = await Promise.all([
                import("firebase/auth"),
                import("firebase/firestore"),
                import("@/lib/firebase"),
            ]);

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: "admin",
                createdAt: new Date().toISOString(),
            });

            Swal.fire({
                icon: "success",
                title: "Admin Created!",
                text: "You can now login to the Admin Panel.",
            }).then(() => {
                router.push("/");
            });
        } catch (error: any) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-purple-900">Create Admin Account</h1>
                <form onSubmit={handleCreateAdmin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="admin@aryapest.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            placeholder="Strong password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Admin Access"}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Note: Delete this page logic after creating your account for security.
                </p>
            </div>
        </div>
    );
}
