export default function Debts() {
  return (
    <div>
    <h1 className="text-2xl text-left text-black font-bold text-center">Debts</h1>
    <table className="table-auto">
      <thead>
        <tr className="bg-primary-accent">
          <th className="px-4 text-primary-text">Name</th>
          <th className="px-4 text-primary-text">Balance</th>
          <th className="px-4 text-primary-text">APR</th>
          <th className="px-4 text-primary-text">Min Payment</th>
          <th className="px-4 text-primary-text">Edit/Delete</th>

        </tr>
      </thead>
    </table>
    </div>
  );
}
