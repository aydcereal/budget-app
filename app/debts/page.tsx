"use client";
import { useState } from "react";
import { debts } from "@/types/debt";
import Modal from "@/components/Modal";

export default function Debts() {
const [debtList, setDebtList] = useState(debts);
const [open, setOpen] = useState(false);

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
        {debts.map((debtList)=>(
          <tr key={debtList.id} className="bg-primary-accent/10 border-b-2 text-primary-text border-gray-400">
            <td className="p-2 ">{debtList.name}</td>
            <td className="p-2 text-center">${debtList.balance}</td>
            <td className="p-2 text-center">{debtList.apr}%</td>
            <td className="p-2 text-center">${debtList.minPayment}</td>
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
      onClose={()=> setOpen(false)}>

        <AddDebtForm onCancel={()=> setOpen(false)}/>
      </Modal>
    
    </div>
  );
}

function AddDebtForm({ onCancel }: { onCancel: () => void }) {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm text-secondary-text mb-1">
          Debt Name
        </label>
        <input className="bg-gray-100 border-black text-black w-full rounded border p-2" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-secondary-text mb-1">
            Balance
          </label>
          <input className="bg-gray-100 border-black text-black w-full rounded border p-2" />
        </div>

        <div>
          <label className="block text-sm text-secondary-text mb-1">
            APR %
          </label>
          <input className="bg-gray-100 border-black text-black w-full rounded border p-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-secondary-text mb-1">
          Min Payment
        </label>
        <input className="bg-gray-100 border-black text-black w-full rounded border p-2" />
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
          className="rounded bg-primary-accent px-4 py-2 text-foreground"
        >
          Save
        </button>
      </div>
    </form>
  );
}

