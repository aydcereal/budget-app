"use client";
import { useState } from "react";
import { debts } from "@/types/debt";
import Modal from "@/components/Modal";


export default function Debts() {
const [debtList, setDebtList] = useState(debts);
const [open, setOpen] = useState(false);

function handleAddDebt(newDebt: any){
      setDebtList((prev)=> [...prev, newDebt]);
      setOpen(false);
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
      <table className="w-full border-collapse">
      <thead>
        <tr className="bg-primary-accent text-xl text-primary-text border-b border-gray-400">
          <th className="p-3 text-left">Name</th>
          <th className="p-2 text-center">Balance</th>
          <th className="p-2 text-center">APR</th>
          <th className="p-2 text-center">Min Payment</th>
          <th className="p-2 text-center">Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {debtList.map((debt)=>(
          <tr key={debt.id} className="bg-primary-accent/10 border-b-2 text-primary-text border-gray-400">
            <td className="p-2 ">{debt.name}</td>
            <td className="p-2 text-center">${debt.balance}</td>
            <td className="p-2 text-center">{debt.apr}%</td>
            <td className="p-2 text-center">${debt.minPayment}</td>
            <td className="p-2 text-center space-x-2">
                <button className=" hover:underline">
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
      title="Add New Debt"
      onClose={()=> setOpen(false)}
      >

        <AddDebtForm onCancel={()=> setOpen(false)} onSave={handleAddDebt}/>
      </Modal>
    
    </div>
  );

  
}

function AddDebtForm({ 
  onCancel, onSave, 
}: { 
  onCancel: () => void;
  onSave: (debt: any) => void; 
}) {
  const [form, setForm] = useState({
    name:"",
    balance: "",
    apr:"", 
    minPayment:"",
  })
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setForm({
      ...form, 
      [e.target.name]: e.target.value,
    })
  }
  function handleSubmit(e: React.FormEvent){
    e.preventDefault();

    console.log(form.name,Number(form.balance), Number(form.apr),Number(form.minPayment) )
    onSave({
      id: crypto.randomUUID(),
      name: form.name,
      balance: Number(form.balance),
      apr: Number(form.apr),
      minPayment: Number(form.minPayment),
    })
  }
  
  return (
    <form className="space-y-4">
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

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded bg-primary-accent px-4 py-2 text-foreground"
        >
          Save
        </button>
      </div>
    </form>
  );
}

