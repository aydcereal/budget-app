import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
        <h1 className="text-2xl text-left text-black font-bold text-center mx-20">Dashboard</h1>
        
        <div className="flex flex-row justify-evenly mx-20 mt-5">
            <div className="flex flex-col items-center justify-center bg-gray-50 w-92 h-88 rounded-md shadow-custom">
              <h1 className="text-black text-4xl p-5">Total Debt</h1>
              <h1 className="text-black text-5xl p-5">$20,000</h1>
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
