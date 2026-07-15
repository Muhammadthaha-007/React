import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { logedInContext } from "../context/context";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useLogin from "../hooks/useLogin";

const loginSchema = z.object({
    userName: z.string().min(3, "username must be at least 3 charectors."),
    password: z.string().min(6, "Password must be at least 6 characters"),
});


function LoginForm() {
    const { logedIn, setlogedIn } = useContext(logedInContext);
    const token = localStorage.getItem("accessToken");

    const { login, isLoad } = useLogin();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userName: "",
            password: "",
        },
    })

    useEffect(() => {
        if (token) {
            navigate("/");
            return;
        }
    }, [token, navigate]);

    const handleLogin =
        async (formData) => {

            const data = await login(
                formData.userName,
                formData.password
            )

            if (data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                setlogedIn(true);
                navigate("/");
            }
        };
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="flex flex-col w-96">
                    <label htmlFor="userName">User Name:</label>
                    <input type="text" {...register("userName")} placeholder="User Name" className="rounded p-1.5 bg-white" />
                    {errors.userName && (
                        <p className="text-red-500 text-sm">
                            {errors.userName.message}
                        </p>
                    )}
                    <label htmlFor="userName">Password:</label>
                    <input type="text" {...register("password")} placeholder="Password" className="rounded p-1.5 bg-white" />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password.message}
                        </p>
                    )}
                    <button type="submit" id="bt" className="text-white rounded bg-black mt-3.5 cursor-pointer" >{isLoad ? "Loading..." : "LogIn"}</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;