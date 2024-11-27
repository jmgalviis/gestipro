'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus, Mail, AlertCircle, Star, Paperclip, Eye, Archive, ChevronDown, ChevronUp } from 'lucide-react'

export default function Mensajes() {
    const [isModalOpen, setIsModalOpen] = useState<'new' | 'edit' | false>(false)
    const [expandedMessage, setExpandedMessage] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        idMensaje: '',
        tipoComunicacion: '',
        remitente: '',
        destinatarios: '',
        asunto: '',
        cuerpoMensaje: '',
        fechaHoraEnvio: '',
        estado: '',
        prioridad: '',
        archivosAdjuntos: null as File | null,
        confirmacionLectura: '',
        categoriasEtiquetas: ''
    })
    const [editingMessage, setEditingMessage] = useState<typeof formData | null>(null)

    const [mensajes, setMensajes] = useState([
        { idMensaje: 'M001', tipoComunicacion: 'Aviso', remitente: 'Administrador - Juan Pérez', destinatarios: 'Todos los residentes', asunto: 'Corte de agua programado', cuerpoMensaje: 'Se informa que habrá un corte de agua programado el día 20 de junio de 2023 desde las 9:00 AM hasta las 2:00 PM. Por favor, tomen las precauciones necesarias y almacenen agua para su uso durante este período. Agradecemos su comprensión y paciencia mientras realizamos estas importantes tareas de mantenimiento.', fechaHoraEnvio: '2023-06-15 09:00', estado: 'Enviado', prioridad: 'Alta', archivosAdjuntos: 'cronograma.pdf', confirmacionLectura: '', categoriasEtiquetas: 'Mantenimiento, Servicios' },
        { idMensaje: 'M002', tipoComunicacion: 'Notificación', remitente: 'Seguridad - María Gómez', destinatarios: 'Propietarios', asunto: 'Actualización de protocolos de seguridad', cuerpoMensaje: 'Se han actualizado los protocolos de seguridad del edificio. Los cambios incluyen nuevos procedimientos para el ingreso de visitantes y la implementación de un sistema de cámaras mejorado. Por favor, revisen el documento adjunto para familiarizarse con estas actualizaciones. Su cooperación es fundamental para mantener la seguridad de nuestra comunidad.', fechaHoraEnvio: '2023-06-16 14:30', estado: 'Leído', prioridad: 'Media', archivosAdjuntos: 'nuevos_protocolos.pdf', confirmacionLectura: '2023-06-16 15:45', categoriasEtiquetas: 'Seguridad' },
        { idMensaje: 'M003', tipoComunicacion: 'Mensaje directo', remitente: 'Residente - Carlos Rodríguez', destinatarios: 'Administración', asunto: 'Solicitud de reparación', cuerpoMensaje: 'Solicito una reparación urgente en mi apartamento debido a una fuga de agua en el baño principal. El problema comenzó ayer por la noche y está causando daños en el piso. Agradecería una pronta atención a este asunto para evitar mayores perjuicios. Estoy disponible en cualquier momento para permitir el acceso a los técnicos.', fechaHoraEnvio: '2023-06-17 10:15', estado: 'No leído', prioridad: 'Alta', archivosAdjuntos: 'fotos_dano.jpg', confirmacionLectura: '', categoriasEtiquetas: 'Mantenimiento, Urgente' },
        { idMensaje: 'M004', tipoComunicacion: 'Aviso', remitente: 'Comité de Convivencia - Ana Martínez', destinatarios: 'Todos los residentes', asunto: 'Recordatorio de normas de convivencia', cuerpoMensaje: 'Se recuerda a todos los residentes las normas de convivencia establecidas en nuestro reglamento interno. En particular, queremos hacer énfasis en el respeto a los horarios de silencio, el uso adecuado de las áreas comunes y la correcta disposición de residuos. El cumplimiento de estas normas contribuye a mantener un ambiente armónico y agradable para todos.', fechaHoraEnvio: '2023-06-18 11:00', estado: 'Enviado', prioridad: 'Media', archivosAdjuntos: 'normas_convivencia.pdf', confirmacionLectura: '', categoriasEtiquetas: 'Convivencia' },
        { idMensaje: 'M005', tipoComunicacion: 'Notificación', remitente: 'Administrador - Juan Pérez', destinatarios: 'Propietarios', asunto: 'Convocatoria Asamblea Extraordinaria', cuerpoMensaje: 'Se convoca a todos los propietarios a una Asamblea Extraordinaria que se llevará a cabo el día 30 de junio de 2023 a las 7:00 PM en el salón comunal. Los temas a tratar incluyen la aprobación de un proyecto de remodelación del lobby y la discusión sobre la implementación de un nuevo sistema de reciclaje. Es importante contar con su participación para tomar decisiones que beneficien a toda la comunidad.', fechaHoraEnvio: '2023-06-19 16:00', estado: 'Leído', prioridad: 'Alta', archivosAdjuntos: 'convocatoria_asamblea.pdf', confirmacionLectura: '2023-06-19 17:30', categoriasEtiquetas: 'Asamblea, Importante' },
    ])

    const [filteredMensajes, setFilteredMensajes] = useState(mensajes)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = mensajes.filter(mensaje =>
            Object.values(mensaje).some(value =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredMensajes(results)
        setCurrentPage(1)
    }, [searchTerm, mensajes])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredMensajes.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredMensajes.length / itemsPerPage)

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
        const newMensaje = {
            ...formData,
            fechaHoraEnvio: isModalOpen === 'new' ? new Date().toISOString().replace('T', ' ').substring(0, 16) : formData.fechaHoraEnvio,
            estado: isModalOpen === 'new' ? 'Enviado' : formData.estado,
            archivosAdjuntos: formData.archivosAdjuntos ? formData.archivosAdjuntos.name : null,
        }

        if (isModalOpen === 'edit') {
            setMensajes(mensajes.map(m => m.idMensaje === newMensaje.idMensaje ? newMensaje : m))
            setFilteredMensajes(filteredMensajes.map(m => m.idMensaje === newMensaje.idMensaje ? newMensaje : m))
        } else {
            setMensajes([...mensajes, newMensaje])
            setFilteredMensajes([...filteredMensajes, newMensaje])
        }

        setIsModalOpen(false)
        setEditingMessage(null)
        setFormData({
            idMensaje: '',
            tipoComunicacion: '',
            remitente: '',
            destinatarios: '',
            asunto: '',
            cuerpoMensaje: '',
            fechaHoraEnvio: '',
            estado: '',
            prioridad: '',
            archivosAdjuntos: null,
            confirmacionLectura: '',
            categoriasEtiquetas: ''
        })
    }

    const handleView = (idMensaje: string) => {
        setExpandedMessage(expandedMessage === idMensaje ? null : idMensaje)
    }

    const handleEdit = (idMensaje: string) => {
        const messageToEdit = mensajes.find(m => m.idMensaje === idMensaje)
        if (messageToEdit) {
            setEditingMessage(messageToEdit)
            setFormData(messageToEdit)
            setIsModalOpen('edit')
        }
    }

    const handleDelete = (idMensaje: string) => {
        if (confirm('¿Está seguro de que desea eliminar este mensaje?')) {
            setMensajes(mensajes.filter(m => m.idMensaje !== idMensaje))
            setFilteredMensajes(filteredMensajes.filter(m => m.idMensaje !== idMensaje))
        }
    }

    const handleArchive = (idMensaje: string) => {
        console.log('Archivar mensaje:', idMensaje)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de Comunicaciones Internas</h1>
                    <button
                        onClick={() => {
                            setIsModalOpen('new')
                            setEditingMessage(null)
                            setFormData({
                                idMensaje: '',
                                tipoComunicacion: '',
                                remitente: '',
                                destinatarios: '',
                                asunto: '',
                                cuerpoMensaje: '',
                                fechaHoraEnvio: '',
                                estado: '',
                                prioridad: '',
                                archivosAdjuntos: null,
                                confirmacionLectura: '',
                                categoriasEtiquetas: ''
                            })
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Nuevo Mensaje
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar mensajes..."
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remitente</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asunto</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((mensaje) => (
                            <>
                                <tr key={mensaje.idMensaje} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {mensaje.estado === 'No leído' && <Mail className="h-5 w-5 text-blue-500" />}
                                        {mensaje.estado === 'Leído' && <Mail className="h-5 w-5 text-gray-400" />}
                                        {mensaje.estado === 'Enviado' && <Mail className="h-5 w-5 text-green-500" />}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mensaje.remitente}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            {mensaje.prioridad === 'Alta' && <AlertCircle className="h-4 w-4 text-red-500 mr-2" />}
                                            {mensaje.asunto}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mensaje.fechaHoraEnvio}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleView(mensaje.idMensaje)} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                            {expandedMessage === mensaje.idMensaje ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                        </button>
                                        <button onClick={() => handleEdit(mensaje.idMensaje)} className="text-blue-600 hover:text-blue-900 mr-2">
                                            <Pencil className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleArchive(mensaje.idMensaje)} className="text-yellow-600 hover:text-yellow-900 mr-2">
                                            <Archive className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleDelete(mensaje.idMensaje)} className="text-red-600 hover:text-red-900">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                                {expandedMessage === mensaje.idMensaje && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 bg-gray-50">
                                            <div className="text-sm text-gray-900">
                                                <p className="font-bold mb-2">Tipo de Comunicación: {mensaje.tipoComunicacion}</p>
                                                <p className="font-bold mb-2">Destinatarios: {mensaje.destinatarios}</p>
                                                <p className="font-bold mb-2">Cuerpo del Mensaje:</p>
                                                <p className="mb-4">{mensaje.cuerpoMensaje}</p>
                                                <p className="font-bold mb-2">Prioridad: {mensaje.prioridad}</p>
                                                {mensaje.archivosAdjuntos && (
                                                    <p className="mb-2">
                                                        <span className="font-bold">Archivos Adjuntos:</span> {mensaje.archivosAdjuntos}
                                                    </p>
                                                )}
                                                {mensaje.confirmacionLectura && (
                                                    <p className="mb-2">
                                                        <span className="font-bold">Confirmación de Lectura:</span> {mensaje.confirmacionLectura}
                                                    </p>
                                                )}
                                                {mensaje.categoriasEtiquetas && (
                                                    <p>
                                                        <span className="font-bold">Categorías y Etiquetas:</span> {mensaje.categoriasEtiquetas}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredMensajes.length)}</span> de{' '}
                                    <span className="font-medium">{filteredMensajes.length}</span> resultados
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

            {isModalOpen !== false && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            {isModalOpen === 'new' ? 'Nuevo Mensaje' : 'Editar Mensaje'}
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idMensaje">
                                                        ID Mensaje*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idMensaje"
                                                        name="idMensaje"
                                                        type="text"
                                                        placeholder="ID Mensaje"
                                                        required
                                                        value={formData.idMensaje}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="tipoComunicacion">
                                                        Tipo de Comunicación*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="tipoComunicacion"
                                                        name="tipoComunicacion"
                                                        required
                                                        value={formData.tipoComunicacion}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione el tipo</option>
                                                        <option value="Aviso">Aviso</option>
                                                        <option value="Notificación">Notificación</option>
                                                        <option value="Mensaje directo">Mensaje directo</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="remitente">
                                                        Remitente*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="remitente"
                                                        name="remitente"
                                                        type="text"
                                                        placeholder="Nombre y rol del remitente"
                                                        required
                                                        value={formData.remitente}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="destinatarios">
                                                        Destinatarios*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="destinatarios"
                                                        name="destinatarios"
                                                        type="text"
                                                        placeholder="Lista de destinatarios o grupos"
                                                        required
                                                        value={formData.destinatarios}
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
                                                        placeholder="Asunto del mensaje"
                                                        required
                                                        value={formData.asunto}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="cuerpoMensaje">
                                                        Cuerpo del Mensaje*
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="cuerpoMensaje"
                                                        name="cuerpoMensaje"
                                                        placeholder="Detalle completo de la comunicación"
                                                        required
                                                        rows={4}
                                                        value={formData.cuerpoMensaje}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="prioridad">
                                                        Prioridad
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="prioridad"
                                                        name="prioridad"
                                                        value={formData.prioridad}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione la prioridad</option>
                                                        <option value="Alta">Alta</option>
                                                        <option value="Media">Media</option>
                                                        <option value="Baja">Baja</option>
                                                    </select>
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
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="categoriasEtiquetas">
                                                        Categorías y Etiquetas
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="categoriasEtiquetas"
                                                        name="categoriasEtiquetas"
                                                        type="text"
                                                        placeholder="Categorías y etiquetas separadas por comas"
                                                        value={formData.categoriasEtiquetas}
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
                                    Enviar
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