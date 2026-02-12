// dynamic import removed
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Setup | Arya Pest Control",
    robots: "noindex, nofollow",
};

import AdminSetupClient from "../../components/admin/AdminSetupClient";

export default function AdminSetupPage() {
    return <AdminSetupClient />;
}
