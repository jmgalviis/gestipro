'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí iría la lógica de autenticación
        navigate('/');
        console.log('Login attempt with:', { email, password })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-700">GestiPro PH</h1>
                    <p className="text-gray-500">Software de Propiedad Horizontal</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label htmlFor="email" className="text-sm font-medium text-gray-600 block mb-1">
                            Correo Electrónico
                        </label>
                        <div className="flex items-center">
                            <User className="absolute left-3 top-[38px] text-blue-600" size={18} />
                            <input
                                type="email"
                                id="email"
                                className="pl-10 w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="usuario@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="text-sm font-medium text-gray-600 block mb-1">
                            Contraseña
                        </label>
                        <div className="flex items-center">
                            <Lock className="absolute left-3 top-[38px] text-blue-600" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="pl-10 w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                                Recordarme
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}