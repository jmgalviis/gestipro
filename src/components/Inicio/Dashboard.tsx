'use client'


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Building2, DollarSign, Home, Users, Wrench, Calendar } from 'lucide-react'


const occupancyData = [
    { name: 'Ene', ocupados: 80, disponibles: 20 },
    { name: 'Feb', ocupados: 85, disponibles: 15 },
    { name: 'Mar', ocupados: 90, disponibles: 10 },
    { name: 'Abr', ocupados: 88, disponibles: 12 },
    { name: 'May', ocupados: 92, disponibles: 8 },
    { name: 'Jun', ocupados: 95, disponibles: 5 },
]

const recentProperties = [
    { id: 1, address: "Torre A, Apto 301", type: "Apartamento", status: "Ocupado" },
    { id: 2, address: "Torre B, Local 102", type: "Local Comercial", status: "Disponible" },
    { id: 3, address: "Parqueadero 45", type: "Parqueadero", status: "En mantenimiento" },
]

const pendingTasks = [
    { id: 1, task: "Reparación de ascensor Torre A", priority: "Alta" },
    { id: 2, task: "Pintura de fachada", priority: "Media" },
    { id: 3, task: "Limpieza de piscina", priority: "Baja" },
]

const upcomingEvents = [
    { id: 1, event: "Asamblea General", date: "2023-07-15" },
    { id: 2, event: "Fumigación", date: "2023-07-20" },
    { id: 3, event: "Mantenimiento de ascensores", date: "2023-07-25" },
]


export default function Dashboard() {

    return (
        <>
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                {/* Resumen general */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center justify-between pb-2">
                            <h3 className="text-sm font-medium text-gray-500">Total de Inmuebles</h3>
                            <Building2 className="h-4 w-4 text-blue-600"/>
                        </div>
                        <div className="text-2xl font-bold text-blue-800">245</div>
                        <p className="text-xs text-gray-400">20 disponibles</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center justify-between pb-2">
                            <h3 className="text-sm font-medium text-gray-500">Tasa de Ocupación</h3>
                            <Home className="h-4 w-4 text-blue-600"/>
                        </div>
                        <div className="text-2xl font-bold text-blue-800">92%</div>
                        <p className="text-xs text-gray-400">+2% desde el mes pasado</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center justify-between pb-2">
                            <h3 className="text-sm font-medium text-gray-500">Ingresos Mensuales</h3>
                            <DollarSign className="h-4 w-4 text-blue-600"/>
                        </div>
                        <div className="text-2xl font-bold text-blue-800">$125,000</div>
                        <p className="text-xs text-gray-400">+5% desde el mes pasado</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center justify-between pb-2">
                            <h3 className="text-sm font-medium text-gray-500">Total de Residentes</h3>
                            <Users className="h-4 w-4 text-blue-600"/>
                        </div>
                        <div className="text-2xl font-bold text-blue-800">780</div>
                        <p className="text-xs text-gray-400">+12 desde el mes pasado</p>
                    </div>
                </div>

                {/* Propiedades recientes y gráfico de ocupación */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">Inmuebles Recientes</h3>
                        <ul className="space-y-4">
                            {recentProperties.map((property) => (
                                <li key={property.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-600">{property.address}</p>
                                        <p className="text-sm text-gray-400">{property.type}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        property.status === 'Ocupado' ? 'bg-blue-500 text-white' :
                                            property.status === 'Disponible' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-300 text-gray-600'
                                    }`}>
                      {property.status}
                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">Ocupación de Inmuebles</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={occupancyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e8f1f2"/>
                                    <XAxis dataKey="name" stroke="#494949"/>
                                    <YAxis stroke="#494949"/>
                                    <Tooltip/>
                                    <Bar dataKey="ocupados" stackId="a" fill="#1c9bd9" name="Ocupados"/>
                                    <Bar dataKey="disponibles" stackId="a" fill="#72badc" name="Disponibles"/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Tareas pendientes, resumen financiero y próximos eventos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-blue-800">Tareas de Mantenimiento</h3>
                            <Wrench className="h-4 w-4 text-blue-600"/>
                        </div>
                        <ul className="space-y-4">
                            {pendingTasks.map((task) => (
                                <li key={task.id} className="flex justify-between items-center">
                                    <span className="text-gray-600">{task.task}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        task.priority === 'Alta' ? 'bg-blue-600 text-white' :
                                            task.priority === 'Media' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-300 text-gray-600'
                                    }`}>
                      {task.priority}
                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4">Resumen Financiero</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Ingresos totales</span>
                                <span className="font-bold text-blue-800">$150,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Gastos operativos</span>
                                <span className="font-bold text-blue-800">$50,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Mantenimiento</span>
                                <span className="font-bold text-blue-800">$20,000</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-2">
                                <span className="font-bold text-gray-600">Balance neto</span>
                                <span className="font-bold text-blue-600">$80,000</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-blue-800">Próximos Eventos</h3>
                            <Calendar className="h-4 w-4 text-blue-600"/>
                        </div>
                        <ul className="space-y-4">
                            {upcomingEvents.map((event) => (
                                <li key={event.id} className="flex justify-between items-center">
                                    <span className="text-gray-600">{event.event}</span>
                                    <span className="text-sm text-gray-400">{event.date}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}