'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus, DollarSign, Calendar, User, Home, FileText, AlertTriangle, Paperclip, Bell } from 'lucide-react'

export default function CuotasAdministracion() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idCuota: '',
        tipoCuota: '',
        propietarioUnidad: '',
        coeficienteCopropiedad: '',
        periodoFacturado: '',
        montoOrdinario: '',
        montoExtraordinario: '',
        motivoExtraordinario: '',
        actaAprobacion: '',
        fechaEmision: '',
        fechaVencimiento: '',
        estadoPago: '',
        montoPagado: '',
        recargosMora: '',
        documentosAdjuntos: null as File | null,
        notificacionesEnviadas: '',
        observaciones: ''
    })

    const [cuotas, setCuotas] = useState([
        { idCuota: 'C001', tipoCuota: 'Ordinaria', propietarioUnidad: 'Juan Pérez - Apto 101', coeficienteCopropiedad: 0.05, periodoFacturado: 'Enero 2024', montoOrdinario: 250000, montoExtraordinario: 0, motivoExtraordinario: '', actaAprobacion: '', fechaEmision: '2023-12-25', fechaVencimiento: '2024-01-10', estadoPago: 'Pendiente', montoPagado: 0, recargosMora: 0, documentosAdjuntos: 'factura_C001.pdf', notificacionesEnviadas: '2023-12-26, 2024-01-05', observaciones: '' },
        { idCuota: 'C002', tipoCuota: 'Extraordinaria', propietarioUnidad: 'María Gómez - Casa 05', coeficienteCopropiedad: 0.08, periodoFacturado: 'Enero 2024', montoOrdinario: 400000, montoExtraordinario: 200000, motivoExtraordinario: 'Reparación del ascensor', actaAprobacion: 'ACTA-2023-12', fechaEmision: '2023-12-25', fechaVencimiento: '2024-01-15', estadoPago: 'Parcial', montoPagado: 400000, recargosMora: 0, documentosAdjuntos: 'factura_C002.pdf', notificacionesEnviadas: '2023-12-26, 2024-01-10', observaciones: 'Pago parcial realizado' },
        { idCuota: 'C003', tipoCuota: 'Ordinaria', propietarioUnidad: 'Carlos Rodríguez - Apto 305', coeficienteCopropiedad: 0.06, periodoFacturado: 'Enero 2024', montoOrdinario: 300000, montoExtraordinario: 0, motivoExtraordinario: '', actaAprobacion: '', fechaEmision: '2023-12-25', fechaVencimiento: '2024-01-10', estadoPago: 'Pagado', montoPagado: 300000, recargosMora: 0, documentosAdjuntos: 'factura_C003.pdf', notificacionesEnviadas: '2023-12-26', observaciones: '' },
        { idCuota: 'C004', tipoCuota: 'Ordinaria', propietarioUnidad: 'Ana Martínez - Casa 12', coeficienteCopropiedad: 0.07, periodoFacturado: 'Enero 2024', montoOrdinario: 350000, montoExtraordinario: 0, motivoExtraordinario: '', actaAprobacion: '', fechaEmision: '2023-12-25', fechaVencimiento: '2024-01-10', estadoPago: 'Vencido', montoPagado: 0, recargosMora: 35000, documentosAdjuntos: 'factura_C004.pdf', notificacionesEnviadas: '2023-12-26, 2024-01-05, 2024-01-12', observaciones: 'Recargo del 10% aplicado' },
        { idCuota: 'C005', tipoCuota: 'Extraordinaria', propietarioUnidad: 'Luis Sánchez - Apto 402', coeficienteCopropiedad: 0.04, periodoFacturado: 'Enero 2024', montoOrdinario: 200000, montoExtraordinario: 100000, motivoExtraordinario: 'Pintura de fachada', actaAprobacion: 'ACTA-2023-11', fechaEmision: '2023-12-25', fechaVencimiento: '2024-01-20', estadoPago: 'Pendiente', montoPagado: 0, recargosMora: 0, documentosAdjuntos: 'factura_C005.pdf', notificacionesEnviadas: '2023-12-26, 2024-01-15', observaciones: '' },
    ])

    const [filteredCuotas, setFilteredCuotas] = useState(cuotas)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = cuotas.filter(cuota =>
            Object.values(cuota).some(value =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredCuotas(results)
        setCurrentPage(1)
    }, [searchTerm, cuotas])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredCuotas.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredCuotas.length / itemsPerPage)

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
                documentosAdjuntos: e.target.files ? e.target.files[0] : null
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newCuota = {
            ...formData,
            coeficienteCopropiedad: parseFloat(formData.coeficienteCopropiedad),
            montoOrdinario: parseFloat(formData.montoOrdinario),
            montoExtraordinario: formData.montoExtraordinario ? parseFloat(formData.montoExtraordinario) : 0,
            montoPagado: formData.montoPagado ? parseFloat(formData.montoPagado) : 0,
            recargosMora: formData.recargosMora ? parseFloat(formData.recargosMora) : 0,
            documentosAdjuntos: formData.documentosAdjuntos ? formData.documentosAdjuntos.name : null,
        }
        setCuotas([...cuotas, newCuota])
        setIsModalOpen(false)
        setFormData({
            idCuota: '',
            tipoCuota: '',
            propietarioUnidad: '',
            coeficienteCopropiedad: '',
            periodoFacturado: '',
            montoOrdinario: '',
            montoExtraordinario: '',
            motivoExtraordinario: '',
            actaAprobacion: '',
            fechaEmision: '',
            fechaVencimiento: '',
            estadoPago: '',
            montoPagado: '',
            recargosMora: '',
            documentosAdjuntos: null,
            notificacionesEnviadas: '',
            observaciones: ''
        })
    }

    const handleEdit = (idCuota: string) => {
        console.log('Editar cuota:', idCuota)
    }

    const handleDelete = (idCuota: string) => {
        console.log('Eliminar cuota:', idCuota)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de Cuotas de Administración</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Agregar Cuota
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar cuotas..."
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propietario/Unidad</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((cuota) => (
                            <tr key={cuota.idCuota}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cuota.idCuota}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cuota.tipoCuota}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cuota.propietarioUnidad}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cuota.periodoFacturado}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${(cuota.montoOrdinario + (cuota.montoExtraordinario || 0)).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cuota.estadoPago}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(cuota.idCuota)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cuota.idCuota)}
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredCuotas.length)}</span> de{' '}
                                    <span className="font-medium">{filteredCuotas.length}</span> resultados
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
                                            Agregar Nueva Cuota de Administración
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idCuota">
                                                        ID Cuota*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idCuota"
                                                        name="idCuota"
                                                        type="text"
                                                        placeholder="ID Cuota"
                                                        required
                                                        value={formData.idCuota}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="tipoCuota">
                                                        Tipo de Cuota*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="tipoCuota"
                                                        name="tipoCuota"
                                                        required
                                                        value={formData.tipoCuota}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione el tipo</option>
                                                        <option value="Ordinaria">Ordinaria</option>
                                                        <option value="Extraordinaria">Extraordinaria</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="propietarioUnidad">
                                                        Propietario/Unidad Asociada*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="propietarioUnidad"
                                                        name="propietarioUnidad"
                                                        type="text"
                                                        placeholder="Nombre del propietario - Unidad"
                                                        required
                                                        value={formData.propietarioUnidad}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="coeficienteCopropiedad">
                                                        Coeficiente de Copropiedad*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="coeficienteCopropiedad"
                                                        name="coeficienteCopropiedad"
                                                        type="number"
                                                        step="0.0001"
                                                        placeholder="Ej: 0.05"
                                                        required
                                                        value={formData.coeficienteCopropiedad}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="periodoFacturado">
                                                        Período Facturado*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="periodoFacturado"
                                                        name="periodoFacturado"
                                                        type="text"
                                                        placeholder="Ej: Enero 2024"
                                                        required
                                                        value={formData.periodoFacturado}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="montoOrdinario">
                                                        Monto Ordinario*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="montoOrdinario"
                                                        name="montoOrdinario"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Monto ordinario"
                                                        required
                                                        value={formData.montoOrdinario}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="montoExtraordinario">
                                                        Monto Extraordinario
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="montoExtraordinario"
                                                        name="montoExtraordinario"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Monto extraordinario"
                                                        value={formData.montoExtraordinario}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="motivoExtraordinario">
                                                        Motivo Extraordinario
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="motivoExtraordinario"
                                                        name="motivoExtraordinario"
                                                        type="text"
                                                        placeholder="Motivo de la cuota extraordinaria"
                                                        value={formData.motivoExtraordinario}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="actaAprobacion">
                                                        Acta de Aprobación
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="actaAprobacion"
                                                        name="actaAprobacion"
                                                        type="text"
                                                        placeholder="Número de acta de aprobación"
                                                        value={formData.actaAprobacion}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="fechaEmision">
                                                        Fecha de Emisión*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="fechaEmision"
                                                        name="fechaEmision"
                                                        type="date"
                                                        required
                                                        value={formData.fechaEmision}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="fechaVencimiento">
                                                        Fecha de Vencimiento*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="fechaVencimiento"
                                                        name="fechaVencimiento"
                                                        type="date"
                                                        required
                                                        value={formData.fechaVencimiento}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="estadoPago">
                                                        Estado del Pago*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="estadoPago"
                                                        name="estadoPago"
                                                        required
                                                        value={formData.estadoPago}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione el estado</option>
                                                        <option value="Pendiente">Pendiente</option>
                                                        <option value="Pagado">Pagado</option>
                                                        <option value="Vencido">Vencido</option>
                                                        <option value="Parcial">Parcial</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="montoPagado">
                                                        Monto Pagado
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="montoPagado"
                                                        name="montoPagado"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Monto pagado"
                                                        value={formData.montoPagado}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="recargosMora">
                                                        Recargos por Mora
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="recargosMora"
                                                        name="recargosMora"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Recargos por mora"
                                                        value={formData.recargosMora}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="documentosAdjuntos">
                                                        Documentos Adjuntos
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="documentosAdjuntos"
                                                        name="documentosAdjuntos"
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
                                                        placeholder="Fechas de notificaciones enviadas"
                                                        value={formData.notificacionesEnviadas}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="observaciones">
                                                        Observaciones
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="observaciones"
                                                        name="observaciones"
                                                        placeholder="Notas adicionales sobre la cuota"
                                                        value={formData.observaciones}
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