import Link from "next/link";

export default function Sidebar(){
    return(
        <aside className="w-64 primay-accent text-white p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-6 font-main">DebtBuddy</h1>
            <nav className="flex flex-col gap-4">
                <Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link>
                <Link href="/debts" className="hover:text-blue-400">Debts</Link>
                <Link href="/transactions" className="hover:text-blue-400">Transactions</Link>
                <Link href="/budget" className="hover:text-blue-400">Budget</Link>
                <Link href="/reports" className="hover:text-blue-400">Reports</Link>
                <hr className="my-4 border-gray-300" />
                <Link href="/settings" className="hover:text-blue-400">Settings</Link>
            </nav>

        </aside>
    );
        
    
    
}