'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus, FileText, Clock, User, Home, Phone, Mail, FileCheck, UserCheck, Calendar, Paperclip, List, ThumbsUp } from 'lucide-react'

export default function Pqrs() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idPQRS: '',
        tipoSolicitud: '',
        nombreRemitente: '',
        unidadAsociada: '',
        contacto: '',
        asunto: '',
        descripcion: '',
        estado: '',
        responsableAsignado: '',
        fechaLimite: '',
        archivosAdjuntos: null as File | null,
        historialAcciones: '',
        encuestaSatisfaccion: ''
    })

    const [pqrs, setPQRS] = useState([
        { idPQRS: 'PQRS001', tipoSolicitud: 'Queja', nombreRemitente: 'Juan Pérez', unidadAsociada: 'Apto 101', contacto: 'juan@email.com', asunto: 'Ruido excesivo', descripcion: 'Ruido constante del apartamento superior en horas de la noche', estado: 'En proceso', responsableAsignado: 'Administración', fechaLimite: '2023-06-30', archivosAdjuntos: 'audio.mp3', historialAcciones: 'Notificación enviada al residente del Apto 201', encuestaSatisfaccion: '' },
        { idPQRS: 'PQRS002', tipoSolicitud: 'Petición', nombreRemitente: 'María Gómez', unidadAsociada: 'Casa 05', contacto: '3001234567', asunto: 'Solicitud de mantenimiento', descripcion: 'Solicitud para reparar una gotera en el techo de la sala', estado: 'Recibido', responsableAsignado: 'Mantenimiento', fechaLimite: '2023-07-15', archivosAdjuntos: 'foto_gotera.jpg', historialAcciones: '', encuestaSatisfaccion: '' },
        { idPQRS: 'PQRS003', tipoSolicitud: 'Reclamo', nombreRemitente: 'Carlos Rodríguez', unidadAsociada: 'Apto 305', contacto: 'carlos@email.com', asunto: 'Cobro excesivo de administración', descripcion: 'El cobro de administración de este mes es superior al aprobado en la última asamblea', estado: 'Resuelto', responsableAsignado: 'Tesorería', fechaLimite: '2023-06-20', archivosAdjuntos: 'factura.pdf', historialAcciones: 'Revisión de facturación, Corrección del monto, Envío de nueva factura', encuestaSatisfaccion: 'Satisfecho con la resolución' },
        { idPQRS: 'PQRS004', tipoSolicitud: 'Sugerencia', nombreRemitente: 'Ana Martínez', unidadAsociada: 'Casa 12', contacto: '3109876543', asunto: 'Mejora de áreas comunes', descripcion: 'Sugerencia para instalar juegos infantiles en la zona verde', estado: 'En proceso', responsableAsignado: 'Comité de Convivencia', fechaLimite: '2023-08-01', archivosAdjuntos: '', historialAcciones: 'Propuesta presentada en reunión de comité', encuestaSatisfaccion: '' },
        { idPQRS: 'PQRS005', tipoSolicitud: 'Queja', nombreRemitente: 'Luis Sánchez', unidadAsociada: 'Apto 402', contacto: 'luis@email.com', asunto: 'Mal funcionamiento del ascensor', descripcion: 'El ascensor se detiene frecuentemente entre pisos', estado: 'Cerrado', responsableAsignado: 'Mantenimiento', fechaLimite: '2023-06-25', archivosAdjuntos: 'video_ascensor.mp4', historialAcciones: 'Revisión técnica, Reparación de falla, Prueba de funcionamiento', encuestaSatisfaccion: 'Muy satisfecho con la rápida solución' },
    ])

    const [filteredPQRS, setFilteredPQRS] = useState(pqrs)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = pqrs.filter(pqrs =>
            Object.values(pqrs).some(value =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredPQRS(results)
        setCurrentPage(1)
    }, [searchTerm, pqrs])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredPQRS.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredPQRS.length / itemsPerPage)

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
                archivosAdjuntos: e.target.files ? e.target.files[0] : null
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newPQRS = {
            ...formData,
            archivosAdjuntos: formData.archivosAdjuntos ? formData.archivosAdjuntos.name : null,
        }
        setPQRS([...pqrs, newPQRS])
        setIsModalOpen(false)
        setFormData({
            idPQRS: '',
            tipoSolicitud: '',
            nombreRemitente: '',
            unidadAsociada: '',
            contacto: '',
            asunto: '',
            descripcion: '',
            estado: '',
            responsableAsignado: '',
            fechaLimite: '',
            archivosAdjuntos: null,
            historialAcciones: '',
            encuestaSatisfaccion: ''
        })
    }

    const handleEdit = (idPQRS: string) => {
        console.log('Editar PQRS:', idPQRS)
    }

    const handleDelete = (idPQRS: string) => {
        console.log('Eliminar PQRS:', idPQRS)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de PQRS</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Agregar PQRS
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar PQRS..."
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remitente</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asunto</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Límite</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((pqrs) => (
                            <tr key={pqrs.idPQRS}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pqrs.idPQRS}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pqrs.tipoSolicitud}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pqrs.nombreRemitente}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pqrs.unidadAsociada}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pqrs.asunto}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pqrs.estado}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pqrs.fechaLimite}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(pqrs.idPQRS)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pqrs.idPQRS)}
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredPQRS.length)}</span> de{' '}
                                    <span className="font-medium">{filteredPQRS.length}</span> resultados
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
                                            Agregar Nuevo PQRS
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idPQRS">
                                                        ID PQRS*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idPQRS"
                                                        name="idPQRS"
                                                        type="text"
                                                        placeholder="ID PQRS"
                                                        required
                                                        value={formData.idPQRS}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="tipoSolicitud">
                                                        Tipo de Solicitud*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="tipoSolicitud"
                                                        name="tipoSolicitud"
                                                        required
                                                        value={formData.tipoSolicitud}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione el tipo</option>
                                                        <option value="Petición">Petición</option>
                                                        <option value="Queja">Queja</option>
                                                        <option value="Reclamo">Reclamo</option>
                                                        <option value="Sugerencia">Sugerencia</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="nombreRemitente">
                                                        Nombre del Remitente*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="nombreRemitente"
                                                        name="nombreRemitente"
                                                        type="text"
                                                        placeholder="Nombre completo"
                                                        required
                                                        value={formData.nombreRemitente}
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
                                                        placeholder="Ej: Apto 101"
                                                        required
                                                        value={formData.unidadAsociada}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="contacto">
                                                        Contacto*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="contacto"
                                                        name="contacto"
                                                        type="text"
                                                        placeholder="Teléfono y/o correo electrónico"
                                                        required
                                                        value={formData.contacto}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="asunto">
                                                        Asunto*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="asunto"
                                                        name="asunto"
                                                        type="text"
                                                        placeholder="Breve descripción"
                                                        required
                                                        value={formData.asunto}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="descripcion">
                                                        Descripción*
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="descripcion"
                                                        name="descripcion"
                                                        placeholder="Detalle del problema o solicitud"
                                                        required
                                                        value={formData.descripcion}
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
                                                        <option value="">Seleccione el estado</option>
                                                        <option value="Recibido">Recibido</option>
                                                        <option value="En proceso">En proceso</option>
                                                        <option value="Resuelto">Resuelto</option>
                                                        <option value="Cerrado">Cerrado</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="responsableAsignado">
                                                        Responsable Asignado*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="responsableAsignado"
                                                        name="responsableAsignado"
                                                        type="text"
                                                        placeholder="Persona o área a cargo"
                                                        required
                                                        value={formData.responsableAsignado}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="fechaLimite">
                                                        Fecha Límite*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="fechaLimite"
                                                        name="fechaLimite"
                                                        type="date"
                                                        required
                                                        value={formData.fechaLimite}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="archivosAdjuntos">
                                                        Archivos Adjuntos
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="archivosAdjuntos"
                                                        name="archivosAdjuntos"
                                                        type="file"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="historialAcciones">
                                                        Historial de Acciones
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="historialAcciones"
                                                        name="historialAcciones"
                                                        placeholder="Lista de acciones realizadas"
                                                        value={formData.historialAcciones}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="encuestaSatisfaccion">
                                                        Encuesta de Satisfacción
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="encuestaSatisfaccion"
                                                        name="encuestaSatisfaccion"
                                                        placeholder="Opinión del remitente sobre la resolución"
                                                        value={formData.encuestaSatisfaccion}
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