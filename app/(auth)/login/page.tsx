"use client";

import { useState } from "react";
import { supabase } from "@/lib/supaBaseClient";

export default function LoginPage(){
    const[email, setEmail] = useState("");
    const[msg, setMsg] = useState<string>("");

    async function handleLogin(e: React.FormEvent){
        e.preventDefault();
        setMsg("");

        const{error} = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: '${window.location.origin}/dashboard',

            },
        });

        if(error) setMsg(error.message);
        else setMsg("Check your email for the sign-in link");
    }

    return (

        <div className="mx-auto max-w-md ">
            <h1 className="text-2l font-bold mb-4">
                <form onSubmit={handleLogin} className="space-y-3">
                    <input 
                        className="w-full rounded border p-2"
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />

                    <button className="w-full rounded bg-primary-accent px-4 py-2 text-foreground">
                        Send Magic Link
                    </button>
                        
                </form>
                {msg && <p className="mt-3 text-sm">{msg}</p>}
            </h1>
        </div>
    )
}