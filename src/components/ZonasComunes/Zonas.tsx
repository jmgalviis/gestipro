'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react'

export default function Zonas() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idZonaComun: '',
        nombreZona: '',
        torreAsociada: '',
        capacidadMaxima: '',
        horariosUso: '',
        estado: '',
        reglasUso: '',
        frecuenciaMantenimiento: '',
        equipamiento: '',
        ultimaFechaMantenimiento: ''
    })

    const [zonasComunes, setZonasComunes] = useState([
        { idZonaComun: 'ZC001', nombreZona: 'Salón Social', torreAsociada: 'Torre A', capacidadMaxima: 50, horariosUso: 'Lunes a domingo, 8:00 AM - 10:00 PM', estado: 'Disponible', reglasUso: 'No se permite fumar, no mascotas', frecuenciaMantenimiento: 'Semanal', equipamiento: 'Mesas, sillas, proyector', ultimaFechaMantenimiento: '2023-05-10' },
        { idZonaComun: 'ZC002', nombreZona: 'Gimnasio', torreAsociada: '', capacidadMaxima: 20, horariosUso: 'Lunes a sábado, 5:00 AM - 11:00 PM', estado: 'Disponible', reglasUso: 'Uso de toalla obligatorio', frecuenciaMantenimiento: 'Diaria', equipamiento: 'Máquinas de cardio, pesas', ultimaFechaMantenimiento: '2023-05-14' },
        { idZonaComun: 'ZC003', nombreZona: 'Piscina', torreAsociada: '', capacidadMaxima: 30, horariosUso: 'Lunes a domingo, 7:00 AM - 9:00 PM', estado: 'En mantenimiento', reglasUso: 'Uso de gorro de baño obligatorio', frecuenciaMantenimiento: 'Semanal', equipamiento: 'Sillas de playa, parasoles', ultimaFechaMantenimiento: '2023-05-12' },
        { idZonaComun: 'ZC004', nombreZona: 'Sala de Juegos', torreAsociada: 'Torre B', capacidadMaxima: 15, horariosUso: 'Lunes a domingo, 10:00 AM - 8:00 PM', estado: 'Disponible', reglasUso: 'Menores de 12 años acompañados por un adulto', frecuenciaMantenimiento: 'Quincenal', equipamiento: 'Mesa de billar, ping pong, juegos de mesa', ultimaFechaMantenimiento: '2023-05-05' },
        { idZonaComun: 'ZC005', nombreZona: 'Terraza', torreAsociada: 'Torre C', capacidadMaxima: 40, horariosUso: 'Lunes a domingo, 8:00 AM - 11:00 PM', estado: 'Disponible', reglasUso: 'No se permite música alta después de las 9:00 PM', frecuenciaMantenimiento: 'Mensual', equipamiento: 'Parrilla, mesas, sillas', ultimaFechaMantenimiento: '2023-04-30' },
    ])

    const [filteredZonasComunes, setFilteredZonasComunes] = useState(zonasComunes)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = zonasComunes.filter(zona =>
            Object.values(zona).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredZonasComunes(results)
        setCurrentPage(1)
    }, [searchTerm, zonasComunes])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredZonasComunes.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredZonasComunes.length / itemsPerPage)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const renderPageNumbers = () => {
        let pages = []
        let startPage = Math.max(1, currentPage - 1)
        let endPage = Math.min(totalPages, startPage + 3)

        if (endPage - startPage < 3) {
            startPage = Math.max(1, endPage - 3)
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 mx-1 rounded ${
                        currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    {i}
                </button>
            )
        }

        return pages
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setZonasComunes([...zonasComunes, formData])
        setIsModalOpen(false)
        setFormData({
            idZonaComun: '',
            nombreZona: '',
            torreAsociada: '',
            capacidadMaxima: '',
            horariosUso: '',
            estado: '',
            reglasUso: '',
            frecuenciaMantenimiento: '',
            equipamiento: '',
            ultimaFechaMantenimiento: ''
        })
    }

    const handleEdit = (idZonaComun: string) => {
        console.log('Editar zona común:', idZonaComun)
    }

    const handleDelete = (idZonaComun: string) => {
        console.log('Eliminar zona común:', idZonaComun)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de Zonas Comunes</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Agregar Zona Común
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar zonas comunes..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Zona Común</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de la Zona</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Torre Asociada</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidad Máxima</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((zona) => (
                            <tr key={zona.idZonaComun}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{zona.idZonaComun}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{zona.nombreZona}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{zona.torreAsociada || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{zona.capacidadMaxima}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{zona.estado}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(zona.idZonaComun)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(zona.idZonaComun)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Anterior
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Siguiente
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredZonasComunes.length)}</span> de{' '}
                                    <span className="font-medium">{filteredZonasComunes.length}</span> resultados
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Anterior</span>
                                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    {renderPageNumbers()}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <span className="sr-only">Siguiente</span>
                                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Registrar Nueva Zona Común
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idZonaComun">
                                                        ID Zona Común*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idZonaComun"
                                                        name="idZonaComun"
                                                        type="text"
                                                        placeholder="ID Zona Común"
                                                        required
                                                        value={formData.idZonaComun}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="nombreZona">
                                                        Nombre de la Zona*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="nombreZona"
                                                        name="nombreZona"
                                                        type="text"
                                                        placeholder="Ej.: Salón Social, Gimnasio"
                                                        required
                                                        value={formData.nombreZona}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="torreAsociada">
                                                        Torre Asociada
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="torreAsociada"
                                                        name="torreAsociada"
                                                        type="text"
                                                        placeholder="Torre Asociada (si aplica)"
                                                        value={formData.torreAsociada}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="capacidadMaxima">
                                                        Capacidad Máxima*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="capacidadMaxima"
                                                        name="capacidadMaxima"
                                                        type="number"
                                                        placeholder="Capacidad máxima de personas"
                                                        required
                                                        value={formData.capacidadMaxima}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="horariosUso">
                                                        Horarios de Uso*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="horariosUso"
                                                        name="horariosUso"
                                                        type="text"
                                                        placeholder="Ej.: Lunes a viernes, 8:00 AM - 8:00 PM"
                                                        required
                                                        value={formData.horariosUso}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="estado">
                                                        Estado*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="estado"
                                                        name="estado"
                                                        required
                                                        value={formData.estado}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione un estado</option>
                                                        <option value="Disponible">Disponible</option>
                                                        <option value="En mantenimiento">En mantenimiento</option>
                                                        <option value="No disponible">No disponible</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="reglasUso">
                                                        Reglas de Uso*
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="reglasUso"
                                                        name="reglasUso"
                                                        placeholder="Ej.: No se permite fumar"
                                                        required
                                                        value={formData.reglasUso}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="frecuenciaMantenimiento">
                                                        Frecuencia de Mantenimiento
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="frecuenciaMantenimiento"
                                                        name="frecuenciaMantenimiento"
                                                        type="text"
                                                        placeholder="Ej.: Semanal, mensual"
                                                        value={formData.frecuenciaMantenimiento}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="equipamiento">
                                                        Equipamiento
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="equipamiento"
                                                        name="equipamiento"
                                                        placeholder="Ej.: Mesas, sillas, proyector"
                                                        value={formData.equipamiento}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="ultimaFechaMantenimiento">
                                                        Última Fecha de Mantenimiento
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="ultimaFechaMantenimiento"
                                                        name="ultimaFechaMantenimiento"
                                                        type="date"
                                                        value={formData.ultimaFechaMantenimiento}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleSubmit}
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}