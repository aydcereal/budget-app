"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supaBaseClient";
import Image from "next/image";
import Link from "next/link";

export default function signUp(){
    const[email, setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[msg, setMsg] = useState<string>("");

    async function handleSignUp(e: React.FormEvent){
        e.preventDefault();
        setMsg("");

        const{error} = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if(error) setMsg(error.message);
        else setMsg("Check your email for the sign-in link");
    }

    return (

        <div className="mx-auto max-w-md ">
            <Link href={"/dashboard"}><h1 className="text-6xl text-center font-bold mb-10 p-5">DebtBuddy</h1></Link>
            
                <form onSubmit={handleSignUp} className="space-y-3">
                    <input 
                        className="w-full bg-foreground placeholder:text-secondary-text text-background text-[24px] rounded-xl border mb-5 p-2"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <input 
                        className="w-full bg-foreground placeholder:text-secondary-text text-background text-[24px] rounded-xl border mb-5 p-2"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <input 
                        className="w-full bg-foreground placeholder:text-secondary-text text-background text-[24px] rounded-xl border mb-10 p-2"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />

                    <button className="w-full rounded-lg bg-primary-accent/50 hover:bg-primary-accent hover:-translate-y-0.5 transition-all text-[24px] px-4 py-2 text-background mb-10">
                        Sign Up
                    </button>
                    <div className="flex justify-center">
                        <Link href="/login" className=" text-[24px]">Login</Link>
                    </div>
                    
                    
                    
                        
                </form>
                {msg && <p className="mt-3 text-sm">{msg}</p>}
            
        </div>
    )
}