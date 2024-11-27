'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus, Calendar, Clock, MapPin, Users, FileText, Bell, CheckSquare } from 'lucide-react'

export default function Asambleas() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idAsamblea: '',
        nombreTitulo: '',
        tipoAsamblea: '',
        fechaAsamblea: '',
        horaInicio: '',
        horaFin: '',
        lugar: '',
        asistentesConfirmados: '',
        quorum: '',
        agenda: '',
        votaciones: '',
        documentacion: null as File | null,
        notificacionesEnviadas: '',
        tareasDerivadasIds: '',
    })

    const [asambleas, setAsambleas] = useState([
        { idAsamblea: 'A001', nombreTitulo: 'Asamblea General Ordinaria 2023', tipoAsamblea: 'Ordinaria', fechaAsamblea: '2023-03-15', horaInicio: '19:00', horaFin: '21:00', lugar: 'Salón Social', asistentesConfirmados: '45', quorum: '65.5', agenda: 'Aprobación de presupuesto, Elección de administrador', votaciones: '2', documentacion: 'acta_A001.pdf', notificacionesEnviadas: '2023-02-15, 2023-03-01', tareasDerivadasIds: 'T001, T002' },
        { idAsamblea: 'A002', nombreTitulo: 'Asamblea Extraordinaria - Reparaciones Urgentes', tipoAsamblea: 'Extraordinaria', fechaAsamblea: '2023-06-10', horaInicio: '18:00', horaFin: '20:00', lugar: 'Zoom (Virtual)', asistentesConfirmados: '38', quorum: '55.8', agenda: 'Aprobación de cuota extraordinaria para reparaciones', votaciones: '1', documentacion: 'acta_A002.pdf', notificacionesEnviadas: '2023-05-25, 2023-06-05', tareasDerivadasIds: 'T003' },
        { idAsamblea: 'A003', nombreTitulo: 'Asamblea General Ordinaria 2022', tipoAsamblea: 'Ordinaria', fechaAsamblea: '2022-03-20', horaInicio: '18:30', horaFin: '21:30', lugar: 'Salón Social', asistentesConfirmados: '50', quorum: '72.3', agenda: 'Informe de gestión, Aprobación de estados financieros', votaciones: '3', documentacion: 'acta_A003.pdf', notificacionesEnviadas: '2022-02-20, 2022-03-05', tareasDerivadasIds: 'T004, T005, T006' },
        { idAsamblea: 'A004', nombreTitulo: 'Asamblea Extraordinaria - Cambio de Reglamento', tipoAsamblea: 'Extraordinaria', fechaAsamblea: '2023-09-05', horaInicio: '19:00', horaFin: '21:00', lugar: 'Salón Social', asistentesConfirmados: '42', quorum: '61.2', agenda: 'Modificación del reglamento de propiedad horizontal', votaciones: '1', documentacion: 'acta_A004.pdf', notificacionesEnviadas: '2023-08-20, 2023-08-30', tareasDerivadasIds: 'T007' },
        { idAsamblea: 'A005', nombreTitulo: 'Asamblea Informativa - Proyecto de Seguridad', tipoAsamblea: 'Extraordinaria', fechaAsamblea: '2023-11-12', horaInicio: '18:00', horaFin: '19:30', lugar: 'Zoom (Virtual)', asistentesConfirmados: '35', quorum: '51.0', agenda: 'Presentación del nuevo sistema de seguridad', votaciones: '0', documentacion: 'presentacion_A005.pdf', notificacionesEnviadas: '2023-10-28, 2023-11-07', tareasDerivadasIds: '' },
    ])

    const [filteredAsambleas, setFilteredAsambleas] = useState(asambleas)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = asambleas.filter(asamblea =>
            Object.values(asamblea).some(value =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredAsambleas(results)
        setCurrentPage(1)
    }, [searchTerm, asambleas])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredAsambleas.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredAsambleas.length / itemsPerPage)

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData(prevState => ({
                ...prevState,
                documentacion: e.target.files ? e.target.files[0] : null
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newAsamblea = {
            ...formData,
            documentacion: formData.documentacion ? formData.documentacion.name : null,
        }
        setAsambleas([...asambleas, newAsamblea])
        setIsModalOpen(false)
        setFormData({
            idAsamblea: '',
            nombreTitulo: '',
            tipoAsamblea: '',
            fechaAsamblea: '',
            horaInicio: '',
            horaFin: '',
            lugar: '',
            asistentesConfirmados: '',
            quorum: '',
            agenda: '',
            votaciones: '',
            documentacion: null,
            notificacionesEnviadas: '',
            tareasDerivadasIds: '',
        })
    }

    const handleEdit = (idAsamblea: string) => {
        console.log('Editar asamblea:', idAsamblea)
    }

    const handleDelete = (idAsamblea: string) => {
        console.log('Eliminar asamblea:', idAsamblea)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de Asambleas</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Agregar Asamblea
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar asambleas..."
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lugar</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quórum</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((asamblea) => (
                            <tr key={asamblea.idAsamblea}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asamblea.idAsamblea}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asamblea.nombreTitulo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asamblea.tipoAsamblea}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asamblea.fechaAsamblea}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asamblea.lugar}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asamblea.quorum}%</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(asamblea.idAsamblea)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(asamblea.idAsamblea)}
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredAsambleas.length)}</span> de{' '}
                                    <span className="font-medium">{filteredAsambleas.length}</span> resultados
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
                                            Agregar Nueva Asamblea
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idAsamblea">
                                                        ID Asamblea*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idAsamblea"
                                                        name="idAsamblea"
                                                        type="text"
                                                        placeholder="ID Asamblea"
                                                        required
                                                        value={formData.idAsamblea}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="nombreTitulo">
                                                        Nombre o Título*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="nombreTitulo"
                                                        name="nombreTitulo"
                                                        type="text"
                                                        placeholder="Nombre o Título de la Asamblea"
                                                        required
                                                        value={formData.nombreTitulo}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="tipoAsamblea">
                                                        Tipo de Asamblea*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="tipoAsamblea"
                                                        name="tipoAsamblea"
                                                        required
                                                        value={formData.tipoAsamblea}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione el tipo</option>
                                                        <option value="Ordinaria">Ordinaria</option>
                                                        <option value="Extraordinaria">Extraordinaria</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="fechaAsamblea">
                                                        Fecha de la Asamblea*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="fechaAsamblea"
                                                        name="fechaAsamblea"
                                                        type="date"
                                                        required
                                                        value={formData.fechaAsamblea}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="flex space-x-4">
                                                    <div className="flex-1">
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
                                                    <div className="flex-1">
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
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="lugar">
                                                        Lugar*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="lugar"
                                                        name="lugar"
                                                        type="text"
                                                        placeholder="Lugar de la Asamblea"
                                                        required
                                                        value={formData.lugar}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="asistentesConfirmados">
                                                        Asistentes Confirmados*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="asistentesConfirmados"
                                                        name="asistentesConfirmados"
                                                        type="number"
                                                        placeholder="Número de asistentes confirmados"
                                                        required
                                                        value={formData.asistentesConfirmados}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="quorum">
                                                        Quórum (%)*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="quorum"
                                                        name="quorum"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Porcentaje de quórum"
                                                        required
                                                        value={formData.quorum}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="agenda">
                                                        Agenda*
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="agenda"
                                                        name="agenda"
                                                        placeholder="Lista de puntos a tratar"
                                                        required
                                                        value={formData.agenda}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="votaciones">
                                                        Votaciones
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="votaciones"
                                                        name="votaciones"
                                                        type="text"
                                                        placeholder="Resultados de votaciones"
                                                        value={formData.votaciones}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="documentacion">
                                                        Documentación
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="documentacion"
                                                        name="documentacion"
                                                        type="file"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="notificacionesEnviadas">
                                                        Notificaciones Enviadas
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="notificacionesEnviadas"
                                                        name="notificacionesEnviadas"
                                                        type="text"
                                                        placeholder="Fechas de notificaciones (separadas por comas)"
                                                        value={formData.notificacionesEnviadas}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="tareasDerivadasIds">
                                                        Tareas Derivadas
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="tareasDerivadasIds"
                                                        name="tareasDerivadasIds"
                                                        type="text"
                                                        placeholder="IDs de tareas derivadas (separados por comas)"
                                                        value={formData.tareasDerivadasIds}
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