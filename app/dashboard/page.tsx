import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
        <h1 className="text-2xl text-left text-black font-bold text-center">Dashboard</h1>
        
        <div className="flex flex-row">
            <div className="bg-gray-50 w-94 h-88">
              <h1 className="text-black">Total Debt</h1>
              <h1 className="text-black">$20,000</h1>
            </div>

            <div className="bg-gray-50 w-94 h-88">
              <h1 className="text-black">Total Debt</h1>
              <h1 className="text-black">$20,000</h1>
            </div>
        </div>
    
    </div>
    
  );
}
