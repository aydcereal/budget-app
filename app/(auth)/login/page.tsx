"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supaBaseClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const[email, setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[msg, setMsg] = useState<string>("");

    const router = useRouter();

    async function handleLogin(e: React.FormEvent){
        e.preventDefault();

        setMsg("");

        const{data, error} = await supabase.auth.signInWithPassword({
            email:email,
            password: password,
        });

        if(error) {
            setMsg(error.message)
        }else if(data.user !== null){
            router.push("/dashboard")
        }
        
    }

    return (

        <div className="mx-auto max-w-md ">
            <h1 className="text-6xl text-center font-bold mb-10 p-5">DebtBuddy</h1>
                <form onSubmit={handleLogin} className="space-y-3">
                    <input 
                        className="w-full bg-foreground placeholder:text-secondary-text text-background text-[24px] rounded-xl border mb-5 p-2"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        className="w-full bg-foreground placeholder:text-secondary-text text-background text-[24px] rounded-xl border mb-10 p-2"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />

                    <button className="w-full rounded-lg bg-primary-accent/50 hover:bg-primary-accent hover:-translate-y-0.5 transition-all text-[24px] px-4 py-2 text-background mb-10">
                        Login
                    </button>
                    <div className="relative flex my-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                        <span className="flex-shrink px-2 text-[24px]">Or continue with</span>
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    <div className="flex m-5 justify-evenly gap-2">
                        <Image
                        src="/apple.png"
                        alt="Apple Logo"
                        width={80}
                        height={80}
                        />

                        <Image
                        src="/google.png"
                        alt="Google Logo"
                        width={80}
                        height={80}
                        />

                        <Image
                        src="/facebook.png"
                        alt="Facebook Logo"
                        width={80}
                        height={80}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Link href="/signUp" className=" text-[24px]">Sign Up</Link>
                    </div>
                    
                    
                        
                </form>
                {msg && <p className="mt-3 text-sm">{msg}</p>}
            
        </div>
    )
}