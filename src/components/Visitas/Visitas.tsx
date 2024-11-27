'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react'

export default function Visitas() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idVisita: '',
        fechaHora: '',
        nombreVisitante: '',
        documentoIdentificacion: '',
        unidadAsociada: '',
        motivoVisita: '',
        horaEntrada: '',
        horaSalida: '',
        vehiculoAsociado: '',
        vigilanteResponsable: '',
        notasObservaciones: '',
        estadoVisita: ''
    })

    const [visitas, setVisitas] = useState([
        { idVisita: 'V001', fechaHora: '2023-05-15 10:00', nombreVisitante: 'Juan Pérez', documentoIdentificacion: 'CC 1234567', unidadAsociada: 'Apto 101', motivoVisita: 'Personal', horaEntrada: '10:05', horaSalida: '11:30', vehiculoAsociado: 'ABC123', vigilanteResponsable: 'Carlos Gómez', estadoVisita: 'Finalizada' },
        { idVisita: 'V002', fechaHora: '2023-05-15 11:30', nombreVisitante: 'María Rodríguez', documentoIdentificacion: 'CC 7654321', unidadAsociada: 'Apto 205', motivoVisita: 'Técnico', horaEntrada: '11:35', horaSalida: '', vehiculoAsociado: '', vigilanteResponsable: 'Ana Martínez', estadoVisita: 'En curso' },
        { idVisita: 'V003', fechaHora: '2023-05-15 14:00', nombreVisitante: 'Pedro Sánchez', documentoIdentificacion: 'CE 98765', unidadAsociada: 'Apto 302', motivoVisita: 'Entrega', horaEntrada: '14:05', horaSalida: '14:20', vehiculoAsociado: 'XYZ789', vigilanteResponsable: 'Luis Hernández', estadoVisita: 'Finalizada' },
        { idVisita: 'V004', fechaHora: '2023-05-16 09:00', nombreVisitante: 'Laura Torres', documentoIdentificacion: 'CC 5678901', unidadAsociada: 'Apto 401', motivoVisita: 'Personal', horaEntrada: '09:05', horaSalida: '10:15', vehiculoAsociado: '', vigilanteResponsable: 'Carlos Gómez', estadoVisita: 'Finalizada' },
        { idVisita: 'V005', fechaHora: '2023-05-16 11:00', nombreVisitante: 'Andrés López', documentoIdentificacion: 'CC 2345678', unidadAsociada: 'Apto 103', motivoVisita: 'Técnico', horaEntrada: '11:10', horaSalida: '12:30', vehiculoAsociado: 'DEF456', vigilanteResponsable: 'Ana Martínez', estadoVisita: 'Finalizada' },
        { idVisita: 'V006', fechaHora: '2023-05-16 15:30', nombreVisitante: 'Sofia Ramírez', documentoIdentificacion: 'CE 54321', unidadAsociada: 'Apto 207', motivoVisita: 'Entrega', horaEntrada: '15:35', horaSalida: '15:50', vehiculoAsociado: '', vigilanteResponsable: 'Luis Hernández', estadoVisita: 'Finalizada' },
        { idVisita: 'V007', fechaHora: '2023-05-17 10:30', nombreVisitante: 'Diego Morales', documentoIdentificacion: 'CC 9876543', unidadAsociada: 'Apto 305', motivoVisita: 'Personal', horaEntrada: '10:35', horaSalida: '', vehiculoAsociado: 'GHI789', vigilanteResponsable: 'Carlos Gómez', estadoVisita: 'En curso' },
    ])

    const [filteredVisitas, setFilteredVisitas] = useState(visitas)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = visitas.filter(visita =>
            Object.values(visita).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredVisitas(results)
        setCurrentPage(1)
    }, [searchTerm, visitas])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredVisitas.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredVisitas.length / itemsPerPage)

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
        setVisitas([...visitas, formData])
        setIsModalOpen(false)
        setFormData({
            idVisita: '',
            fechaHora: '',
            nombreVisitante: '',
            documentoIdentificacion: '',
            unidadAsociada: '',
            motivoVisita: '',
            horaEntrada: '',
            horaSalida: '',
            vehiculoAsociado: '',
            vigilanteResponsable: '',
            notasObservaciones: '',
            estadoVisita: ''
        })
    }

    const handleEdit = (idVisita: string) => {
        console.log('Editar visita:', idVisita)
    }

    const handleDelete = (idVisita: string) => {
        console.log('Eliminar visita:', idVisita)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de Visitas</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Registrar Visita
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar visitas..."
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Visita</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitante</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salida</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((visita) => (
                            <tr key={visita.idVisita}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{visita.idVisita}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visita.fechaHora}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visita.nombreVisitante}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visita.unidadAsociada}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visita.motivoVisita}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visita.horaEntrada}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visita.horaSalida || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visita.estadoVisita}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(visita.idVisita)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(visita.idVisita)}
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredVisitas.length)}</span> de{' '}
                                    <span className="font-medium">{filteredVisitas.length}</span> resultados
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
                                            Registrar Nueva Visita
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idVisita">
                                                        ID Visita*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idVisita"
                                                        name="idVisita"
                                                        type="text"
                                                        placeholder="ID Visita"
                                                        required
                                                        value={formData.idVisita}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="fechaHora">
                                                        Fecha y Hora*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="fechaHora"
                                                        name="fechaHora"
                                                        type="datetime-local"
                                                        required
                                                        value={formData.fechaHora}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="nombreVisitante">
                                                        Nombre del Visitante*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="nombreVisitante"
                                                        name="nombreVisitante"
                                                        type="text"
                                                        placeholder="Nombre completo del visitante"
                                                        required
                                                        value={formData.nombreVisitante}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="documentoIdentificacion">
                                                        Documento de Identificación*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="documentoIdentificacion"
                                                        name="documentoIdentificacion"
                                                        type="text"
                                                        placeholder="Tipo y número del documento"
                                                        required
                                                        value={formData.documentoIdentificacion}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="unidadAsociada">
                                                        Unidad Asociada*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="unidadAsociada"
                                                        name="unidadAsociada"
                                                        type="text"
                                                        placeholder="Apartamento o casa visitada"
                                                        required
                                                        value={formData.unidadAsociada}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="motivoVisita">
                                                        Motivo de la Visita*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="motivoVisita"
                                                        name="motivoVisita"
                                                        required
                                                        value={formData.motivoVisita}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione un motivo</option>
                                                        <option value="Entrega">Entrega</option>
                                                        <option value="Personal">Personal</option>
                                                        <option value="Técnico">Técnico</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="horaEntrada">
                                                        Hora de Entrada*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="horaEntrada"
                                                        name="horaEntrada"
                                                        type="time"
                                                        required
                                                        value={formData.horaEntrada}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="horaSalida">
                                                        Hora de Salida
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="horaSalida"
                                                        name="horaSalida"
                                                        type="time"
                                                        value={formData.horaSalida}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="vehiculoAsociado">
                                                        Vehículo Asociado
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="vehiculoAsociado"
                                                        name="vehiculoAsociado"
                                                        type="text"
                                                        placeholder="Detalles del vehículo"
                                                        value={formData.vehiculoAsociado}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="vigilanteResponsable">
                                                        Vigilante Responsable*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="vigilanteResponsable"
                                                        name="vigilanteResponsable"
                                                        type="text"
                                                        placeholder="Nombre del vigilante"
                                                        required
                                                        value={formData.vigilanteResponsable}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="estadoVisita">
                                                        Estado de la Visita*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="estadoVisita"
                                                        name="estadoVisita"
                                                        required
                                                        value={formData.estadoVisita}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione un estado</option>
                                                        <option value="Registrada">Registrada</option>
                                                        <option value="En curso">En curso</option>
                                                        <option value="Finalizada">Finalizada</option>
                                                        <option value="Cancelada">Cancelada</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="notasObservaciones">
                                                        Notas/Observaciones
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="notasObservaciones"
                                                        name="notasObservaciones"
                                                        placeholder="Cualquier detalle relevante"
                                                        value={formData.notasObservaciones}
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