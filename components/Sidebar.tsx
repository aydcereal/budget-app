import Link from "next/link";

export default function Sidebar(){
    return(
        <aside className="w-64 text-white p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-6 font-main">DebtBuddy</h1>
            <nav className="flex flex-col gap-4 ">
                <Link href="/dashboard" className="flex p-1 text-[var(--color-foreground)] hover:text-[var(--color-primary-accent)]">
                    <span className="material-symbols-outlined px-2">
                    dashboard_2
                    </span>Dashboard
                </Link>
                <Link href="/debts" className="flex p-1 text-[var(--color-foreground)] hover:text-[var(--color-primary-accent)]">
                <span className="material-symbols-outlined px-2">money_bag</span>
                Debts
                </Link>
                <Link href="/transactions" className="flex p-1 text-[var(--color-foreground)] hover:text-[var(--color-primary-accent)]">
                <span className="material-symbols-outlined px-2">currency_exchange</span>
                Transactions</Link>
                <Link href="/budget" className="flex p-1 text-[var(--color-foreground)] hover:text-[var(--color-primary-accent)]">
                <span className="material-symbols-outlined px-2">calculate</span>
                Budget</Link>
                <Link href="/reports" className="flex p-1 text-[var(--color-foreground)] hover:text-[var(--color-primary-accent)]">
                <span className="material-symbols-outlined px-2">analytics</span>
                Reports</Link>
                <hr className="my-4 border-gray-300" />
                <Link href="/settings" className="flex p-1 text-[var(--color-foreground)] hover:text-[var(--color-primary-accent)]">
                <span className="material-symbols-outlined px-2">settings</span>
                Settings</Link>
            </nav>

        </aside>
    );
        
    
    
}