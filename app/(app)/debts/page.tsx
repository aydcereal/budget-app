"use client";
import { useState } from "react";
import { useEffect } from "react";
import { formatCurrency } from "@/lib/format";
import { supabase } from "@/lib/supabase/supaBaseClient";
import Modal from "@/components/Modal";

type DebtInsert = {
  name: string;
  balance: number;
  apr: number;
  min_payment: number;
}

type DebtRow = {
  id: string;
  name: string;
  balance: number;
  apr: number;
  min_payment: number;
  created_at: string;
};

type saveData = DebtRow | DebtInsert;


export default function Debts() {
const [debtList, setDebtList] = useState<any[]>([]);
const [selectedDebt, setSelectedDebt] = useState<DebtRow |null>(null);
const [loading, setLoading] = useState(true);
const [open, setOpen] = useState(false);
const [error, setError] = useState<string | null>(null);

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



  async function handleDeleteDebt(id: string){
    setError(null);

    const {error} = await supabase
    .from("debts")
    .delete()
    .eq("id", id)

    if(error){
      setError(error.message);
      return
    }

    setDebtList((prev)=> prev.filter((d)=> d.id !== id))
  }



async function handleAddDebt(debt: saveData){

  console.log(debt)
  
    const {
      data: {user},
      error: userError,
    } = await supabase.auth.getUser();

    if(userError || !user){
      throw new Error("Not logged in")   ;  
    }

    let query = supabase.from("debts")

    if('id' in debt){
      const {data, error} = await query
      .update(debt)
      .eq('id', debt.id)
      .select()
      .single()

      if(error) throw(error);

      setDebtList((prev)=> prev.map((d)=> (d.id === data.id ? data : d)));
      
      setOpen(false);
      return data;
    }else{
      const {data, error} = await query
    .insert({
      user_id: user.id,
      name: debt.name,
      balance: debt.balance,
      apr: debt.apr,
      min_payment: debt.min_payment,
    })
    .select()
    .single();

    if (error){
      console.error(error);
      throw error;
    }

    setDebtList((prev)=> [data, ...prev]);
    console.log(debt)
    setOpen(false); 
    return data;
    
    }
    
  }

  return (
    <div>
    <h1 className="text-2xl text-left text-black font-bold text-center">Debts</h1>
    <div className="flex justify-end text-primary-text m-4">
      <button 
        onClick={()=> setOpen(true)}
        className="rounded-full bg-primary-accent/10 py-2 px-4 border border-primary-accent hover:bg-primary-accent hover:text-foreground">+ Add new debt</button>
    </div>
    <div className="mx-auto max-w-6xl bg-white rounded-lg shadow-custom p-4">
      {loading && <p className="m-4">Loading debts...</p>}
      {error && <p className="m-4 text-red-600">{error}</p>}

      <table className="w-full border-collapse">
      <thead>
        <tr className="bg-primary-accent text-xl text-primary-text border-b border-gray-400">
          <th className="p-3 text-left">Name</th>
          <th className="p-2 text-left">Balance</th>
          <th className="p-2 text-left">APR</th>
          <th className="p-2 text-left">Min Payment</th>
          <th className="p-2 text-center">Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {debtList.map((debt)=>(
          <tr key={debt.id} className="bg-primary-accent/10 border-b-2 text-primary-text border-gray-400">
            <td className="p-2 ">{debt.name}</td>
            <td className="p-2 ">{formatCurrency(debt.balance)}</td>
            <td className="p-2 text-left">{debt.apr}%</td>
            <td className="p-2 text-left">{formatCurrency(debt.min_payment)}</td>
            <td className="p-2 text-center space-x-2">
                <button 
                  onClick={()=> {
                      setOpen(true)
                      setSelectedDebt(debt)
                    
                  }}
                  className=" hover:underline">
                  Edit
                </button>
                
              </td>

          </tr>
        ))}
      </tbody>
    </table>
    </div>
    <Modal
      open={open}
      title={selectedDebt ? "Edit Debt" : "Add New Debt"}
      onClose={()=> {
        setOpen(false)
        setSelectedDebt(null)
      }}
      >

        <AddDebtForm 
          onCancel={()=> {
            setOpen(false)
            setSelectedDebt(null)
          }} 
          onSave={handleAddDebt}
          initialData={selectedDebt}
          onDelete={selectedDebt ? () => handleDeleteDebt(selectedDebt.id): undefined}
          />
      </Modal>
    
    </div>
  );

  
}

function AddDebtForm({ 
  onCancel, onSave, initialData,onDelete,
}: { 
  onCancel: () => void;
  onSave: (debt: saveData) => void | Promise<void> ; 
  initialData: DebtRow | null; 
  onDelete?: ()=> void; 
  
}) {
  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    balance: initialData?.balance.toString() ?? "",
    apr: initialData?.apr.toString() ?? "", 
    minPayment: initialData?.min_payment.toString() ??"",
  })
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setForm({
      ...form, 
      [e.target.name]: e.target.value,
    })
  }
  function handleSubmit(e: React.FormEvent){
    e.preventDefault();

    const payload = {
      name: form.name,
      balance: Number(form.balance), 
      apr: Number(form.apr),
      min_payment: Number(form.minPayment)
    }

    if(initialData){
      onSave({
        id: initialData.id,
        ...payload,

      })
    }else{
      onSave(payload)
    }

    
  }
  
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm text-secondary-text mb-1">
          Debt Name
        </label>
        <input name="name" value={form.name} onChange={handleChange} className="bg-gray-100 border-black text-black w-full rounded border p-2" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-secondary-text mb-1">
            Balance
          </label>
          <input name="balance" value={form.balance} onChange={handleChange} className="bg-gray-100 border-black text-black w-full rounded border p-2" />
        </div>

        <div>
          <label className="block text-sm text-secondary-text mb-1">
            APR %
          </label>
          <input name="apr" value={form.apr} onChange={handleChange} className="bg-gray-100 border-black text-black w-full rounded border p-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-secondary-text mb-1">
          Min Payment
        </label>
        <input name="minPayment" value={form.minPayment} onChange={handleChange} className="bg-gray-100 border-black text-black w-full rounded border p-2" />
      </div>
      {initialData && onDelete ?(
        <button
          type="button"
          onClick={() =>{
            if(confirm("Are you sure you want to delete this debt?")){
              onDelete();
              onCancel();
            }
          }}
          className="text-highlight hover: underline font-medium"
        >
          Delete Debt 
        </button>
      ): (
        <div/>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded border px-4 py-2 bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded bg-primary-accent/50 hover:bg-primary-accent px-4 py-2 text-foreground">
          Save
        </button>
      </div>
    </form>
  );
}

