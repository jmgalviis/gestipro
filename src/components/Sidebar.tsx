import {useState} from "react";
import {
    Banknote,
    ChevronLeft, CreditCard,
    Eye,
    FileQuestion,
    FileText,
    Menu,
    MessageSquare,
    Umbrella,
    Users,
    Users2,
    Warehouse,
    Wrench,
    Building,
    Building2
} from "lucide-react";

const sidebarOptions = [
    { name: "Usuarios", icon: Users, path: "/usuarios" },
    { name: "Unidades", icon: Building2, path: "/unidades" },
    { name: "Unidades Privadas", icon: Building, path: "/unidades-privadas" },
    { name: "Visitas", icon: Eye, path: "/visitas" },
    { name: "Zonas Comunes", icon: Warehouse, path: "/zonas" },
    { name: "Reservas Zonas Comunes", icon: Warehouse, path: "/reservas" },
    { name: "Gestión de Seguros", icon: Umbrella, path: "/seguros" },
    { name: "Mantenimientos", icon: Wrench, path: "/mantenimientos" },
    { name: "Archivos", icon: FileText, path: "/archivos" },
    { name: "Asamblea", icon: Users2, path: "/asambleas" },
    { name: "Gestión de PQRS", icon: FileQuestion, path: "/pqrs" },
    { name: "Comunicaciones Internas", icon: MessageSquare, path: "/mensajes" },
    { name: "Cartera", icon: CreditCard, path: "/carteras" },
    { name: "Cuotas de Administración", icon: Banknote, path: "/cuotas" },
]

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className={`bg-white ${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out`}>
            <div className="flex items-center justify-between p-4">
                <h2 className={`font-semibold text-blue-800 ${sidebarOpen ? 'block' : 'hidden'}`}>GESTIPRO PH</h2>
                <button className="p-1 rounded-full hover:bg-gray-200" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <ChevronLeft className="h-4 w-4 text-blue-600"/> :
                        <Menu className="h-4 w-4 text-blue-600"/>}
                </button>
            </div>
            <nav className="space-y-2 p-2">
                {sidebarOptions.map((option, index) => (
                    <a key={index} href={option.path}
                            className="w-full flex items-center p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                        <option.icon className="h-4 w-4 mr-2"/>
                        <span className={sidebarOpen ? 'block' : 'hidden'}>{option.name}</span>
                    </a>
                ))}
            </nav>
        </div>
    )
}