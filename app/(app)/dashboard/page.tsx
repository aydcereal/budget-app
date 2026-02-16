'use client'
import { formatCurrency } from "@/lib/format";
import { supabase } from "@/lib/supabase/supaBaseClient";
import { useEffect } from "react";
import { useState } from "react";
export default function Home() {

const [debtList, setDebtList] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

type DebtRow = {
  id: string;
  name: string;
  balance: number;
  apr: number;
  min_payment: number;
  created_at: string;
};



useEffect(()=>{
  const loadDebts = async () =>{
  setLoading(true);
  setError(null);
  
  const {data: {user}, error: userError} = await supabase.auth.getUser();
  if(userError || !user){
    setError("Not Logged in");
    setLoading(false);
    return;
        }
  
  const {data, error} = await supabase
  .from("debts")
  .select("id, name, balance, apr, min_payment, created_at")
  .order("created_at", {ascending: false})
  
  if(error){
    setError(error.message);
    setDebtList([]);
    setLoading(false);
    return;
        }
  
       
  
  setDebtList((data ?? []) as DebtRow[]);
  setLoading(false);
  
        
}
loadDebts();
},[])

console.log(debtList);


const totalDebt = debtList.reduce((acc, current) => acc + current.balance, 0)




  return (
    <div className="flex flex-col">
        <h1 className="text-2xl text-left text-black font-bold text-center mx-20">Dashboard</h1>
        
        <div className="flex flex-row justify-evenly mx-20 mt-5">
            <div className="flex flex-col items-center justify-center bg-gray-50 w-92 h-88 rounded-md shadow-custom">
              <h1 className="text-black text-4xl p-5">Total Debt</h1>
              <h1 className="text-black text-5xl p-5">{formatCurrency(totalDebt)}</h1>
            </div>

            <div className="flex flex-col items-center justify-center bg-gray-50 w-92 h-88 rounded-md shadow-custom">
              <h1 className="text-black text-4xl p-5">Spent This Month</h1>
              <h1 className="text-black text-5xl p-5">$7,000</h1>
            </div>
        </div>
    <div className="flex flex-col bg-gray-50 items-center rounded-md shadow-custom p-15 mx-20 mt-5  ">
        <h1 className="text-center text-3xl text-black">Payoff Projection Chart</h1>
        
    </div>

    <div className="flex flex-col bg-gray-50 items-center rounded-md shadow-custom p-15 mx-20 mt-5 ">
        <h1 className="text-center text-3xl text-black">Top Spending Categories</h1>
        
    </div>

    </div>
    
    
  );
}
