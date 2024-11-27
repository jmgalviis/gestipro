'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react'

export default function Reservas() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idReserva: '',
        zonaComun: '',
        usuarioReserva: '',
        fechaReserva: '',
        horaInicio: '',
        horaFin: '',
        estado: '',
        cantidadAsistentes: '',
        tarifa: '',
        notas: ''
    })

    const [reservas, setReservas] = useState([
        { idReserva: 'R001', zonaComun: 'Salón Social', usuarioReserva: 'Juan Pérez', fechaReserva: '2023-05-20', horaInicio: '14:00', horaFin: '18:00', estado: 'Confirmada', cantidadAsistentes: 20, tarifa: 50000, notas: 'Celebración de cumpleaños' },
        { idReserva: 'R002', zonaComun: 'Gimnasio', usuarioReserva: 'María Gómez', fechaReserva: '2023-05-21', horaInicio: '08:00', horaFin: '09:00', estado: 'Pendiente', cantidadAsistentes: 1, tarifa: 0, notas: '' },
        { idReserva: 'R003', zonaComun: 'Piscina', usuarioReserva: 'Carlos Rodríguez', fechaReserva: '2023-05-22', horaInicio: '10:00', horaFin: '12:00', estado: 'Confirmada', cantidadAsistentes: 4, tarifa: 20000, notas: 'Clase de natación' },
        { idReserva: 'R004', zonaComun: 'Sala de Juegos', usuarioReserva: 'Ana Martínez', fechaReserva: '2023-05-23', horaInicio: '16:00', horaFin: '18:00', estado: 'Cancelada', cantidadAsistentes: 6, tarifa: 15000, notas: 'Cancelado por enfermedad' },
        { idReserva: 'R005', zonaComun: 'Terraza', usuarioReserva: 'Luis Sánchez', fechaReserva: '2023-05-24', horaInicio: '19:00', horaFin: '22:00', estado: 'Confirmada', cantidadAsistentes: 10, tarifa: 30000, notas: 'Cena familiar' },
    ])

    const [filteredReservas, setFilteredReservas] = useState(reservas)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = reservas.filter(reserva =>
            Object.values(reserva).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredReservas(results)
        setCurrentPage(1)
    }, [searchTerm, reservas])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredReservas.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredReservas.length / itemsPerPage)

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
        setReservas([...reservas, formData])
        setIsModalOpen(false)
        setFormData({
            idReserva: '',
            zonaComun: '',
            usuarioReserva: '',
            fechaReserva: '',
            horaInicio: '',
            horaFin: '',
            estado: '',
            cantidadAsistentes: '',
            tarifa: '',
            notas: ''
        })
    }

    const handleEdit = (idReserva: string) => {
        console.log('Editar reserva:', idReserva)
    }

    const handleDelete = (idReserva: string) => {
        console.log('Eliminar reserva:', idReserva)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de Reservas de Zonas Comunes</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Agregar Reserva
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar reservas..."
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Reserva</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zona Común</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((reserva) => (
                            <tr key={reserva.idReserva}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reserva.idReserva}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.zonaComun}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.usuarioReserva}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.fechaReserva}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${reserva.horaInicio} - ${reserva.horaFin}`}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserva.estado}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(reserva.idReserva)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(reserva.idReserva)}
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredReservas.length)}</span> de{' '}
                                    <span className="font-medium">{filteredReservas.length}</span> resultados
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
                                            Registrar Nueva Reserva
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idReserva">
                                                        ID Reserva*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idReserva"
                                                        name="idReserva"
                                                        type="text"
                                                        placeholder="ID Reserva"
                                                        required
                                                        value={formData.idReserva}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="zonaComun">
                                                        Zona Común*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="zonaComun"
                                                        name="zonaComun"
                                                        type="text"
                                                        placeholder="Zona Común"
                                                        required
                                                        value={formData.zonaComun}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="usuarioReserva">
                                                        Usuario que Reserva*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="usuarioReserva"
                                                        name="usuarioReserva"
                                                        type="text"
                                                        placeholder="Usuario que Reserva"
                                                        required
                                                        value={formData.usuarioReserva}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="fechaReserva">
                                                        Fecha de la Reserva*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="fechaReserva"
                                                        name="fechaReserva"
                                                        type="date"
                                                        required
                                                        value={formData.fechaReserva}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="horaInicio">
                                                        Hora de Inicio*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="horaInicio"
                                                        name="horaInicio"
                                                        type="time"
                                                        required
                                                        value={formData.horaInicio}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="horaFin">
                                                        Hora de Fin*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="horaFin"
                                                        name="horaFin"
                                                        type="time"
                                                        required
                                                        value={formData.horaFin}
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
                                                        <option value="Pendiente">Pendiente</option>
                                                        <option value="Confirmada">Confirmada</option>
                                                        <option value="Cancelada">Cancelada</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="cantidadAsistentes">
                                                        Cantidad de Asistentes*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="cantidadAsistentes"
                                                        name="cantidadAsistentes"
                                                        type="number"
                                                        placeholder="Cantidad de Asistentes"
                                                        required
                                                        value={formData.cantidadAsistentes}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="tarifa">
                                                        Tarifa
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="tarifa"
                                                        name="tarifa"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Tarifa"
                                                        value={formData.tarifa}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="notas">
                                                        Notas
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="notas"
                                                        name="notas"
                                                        placeholder="Notas"
                                                        value={formData.notas}
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