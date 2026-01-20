import "../../app/globals.css";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
        <div className="min-h-screen bg-gray-950 text-white flex  justify-center p-6">
            {children}
        </div>
        
      
  );
}
