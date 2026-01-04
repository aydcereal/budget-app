import { debts } from "@/types/debt";

export default function Debts() {
  return (
    <div>
    <h1 className="text-2xl text-left text-black font-bold text-center">Debts</h1>
    <div className="flex justify-end text-primary-text m-4">
      <button className="rounded-full bg-primary-accent/10 py-2 px-4 border border-primary-accent hover:bg-primary-accent hover:text-foreground">+ Add new debt</button>
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
        {debts.map((debt)=>(
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
    
    </div>
  );
}
