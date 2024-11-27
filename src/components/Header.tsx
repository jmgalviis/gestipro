import {LogOut, Settings, User, UserCircle} from "lucide-react";
import {useState} from "react";

export default function Header() {
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    return (
        <header className="bg-white border-b border-gray-200 p-4 flex justify-end items-center">
            <div className="relative">
                <button
                    className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen}
                >
                    <UserCircle className="h-6 w-6 text-blue-600"/>
                </button>
                {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                            <div className="flex items-center">
                                <User className="h-4 w-4 mr-2"/>
                                Perfil
                            </div>
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                            <div className="flex items-center">
                                <Settings className="h-4 w-4 mr-2"/>
                                Configuraciones
                            </div>
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                            <div className="flex items-center">
                                <LogOut className="h-4 w-4 mr-2"/>
                                Cerrar sesión
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </header>
    )
}