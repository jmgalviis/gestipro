'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, Building, ChevronRight } from 'lucide-react'

export default function LoginUno() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Login attempt with:', { email, password, rememberMe })
    }

    const features = [
        'Gestión de pagos',
        'Reserva de áreas comunes',
        'Comunicación eficiente',
        'Reportes en tiempo real'
    ]

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Columna izquierda */}
            <div className="hidden lg:flex w-1/2 bg-blue-600 text-white p-12 flex-col justify-between relative overflow-hidden">
                <div className="z-10">
                    <h1 className="text-4xl font-bold mb-4">GestiPro PH</h1>
                    <p className="text-xl mb-8">Gestión inteligente para propiedades horizontales</p>
                </div>
                <div className="z-10">
                    <h2 className="text-2xl font-semibold mb-4">Características principales:</h2>
                    <ul className="space-y-2">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <ChevronRight className="mr-2" size={20} />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <Building className="absolute -bottom-20 -right-20 text-blue-500 opacity-20" size={300} />
            </div>

            {/* Columna derecha */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido de vuelta</h2>
                        <p className="text-gray-600">Ingresa a tu cuenta para gestionar tu propiedad</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="usuario@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Recordarme
                                </label>
                            </div>
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ¿No tienes una cuenta?{' '}
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
                            >
                                Contacta al administrador
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}