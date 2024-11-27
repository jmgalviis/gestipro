'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus, DollarSign, Calendar, User, Home, FileText, CreditCard, Bell, ClipboardList } from 'lucide-react'

export default function Carteras() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idTransaccion: '',
        tipoTransaccion: '',
        propietarioResidente: '',
        unidadAsociada: '',
        concepto: '',
        montoTotalFacturado: '',
        fechaEmision: '',
        fechaVencimiento: '',
        montoPagado: '',
        estadoPago: '',
        recargos: '',
        metodoPago: '',
        historialPagos: '',
        notificacionesEnviadas: '',
        observaciones: ''
    })

    const [transacciones, setTransacciones] = useState([
        { idTransaccion: 'T001', tipoTransaccion: 'Factura', propietarioResidente: 'Juan Pérez', unidadAsociada: 'Apto 101', concepto: 'Cuota de administración', montoTotalFacturado: 250000, fechaEmision: '2023-06-01', fechaVencimiento: '2023-06-15', montoPagado: 250000, estadoPago: 'Pagado', recargos: 0, metodoPago: 'Transferencia', historialPagos: '2023-06-10: $250000', notificacionesEnviadas: '2023-06-05, 2023-06-12', observaciones: '' },
        { idTransaccion: 'T002', tipoTransaccion: 'Factura', propietarioResidente: 'María Gómez', unidadAsociada: 'Casa 05', concepto: 'Cuota de administración', montoTotalFacturado: 300000, fechaEmision: '2023-06-01', fechaVencimiento: '2023-06-15', montoPagado: 150000, estadoPago: 'Parcial', recargos: 0, metodoPago: 'Tarjeta', historialPagos: '2023-06-08: $150000', notificacionesEnviadas: '2023-06-05, 2023-06-12', observaciones: 'Pago parcial realizado' },
        { idTransaccion: 'T003', tipoTransaccion: 'Multa', propietarioResidente: 'Carlos Rodríguez', unidadAsociada: 'Apto 305', concepto: 'Infracción de parqueo', montoTotalFacturado: 100000, fechaEmision: '2023-06-05', fechaVencimiento: '2023-06-20', montoPagado: 0, estadoPago: 'Pendiente', recargos: 0, metodoPago: '', historialPagos: '', notificacionesEnviadas: '2023-06-10, 2023-06-17', observaciones: 'Parqueo en zona prohibida' },
        { idTransaccion: 'T004', tipoTransaccion: 'Factura', propietarioResidente: 'Ana Martínez', unidadAsociada: 'Casa 12', concepto: 'Cuota de administración', montoTotalFacturado: 280000, fechaEmision: '2023-06-01', fechaVencimiento: '2023-06-15', montoPagado: 0, estadoPago: 'Vencido', recargos: 28000, metodoPago: '', historialPagos: '', notificacionesEnviadas: '2023-06-05, 2023-06-12, 2023-06-19', observaciones: 'Recargo del 10% aplicado' },
        { idTransaccion: 'T005', tipoTransaccion: 'Pago', propietarioResidente: 'Luis Sánchez', unidadAsociada: 'Apto 402', concepto: 'Cuota extraordinaria', montoTotalFacturado: 500000, fechaEmision: '2023-05-15', fechaVencimiento: '2023-06-30', montoPagado: 500000, estadoPago: 'Pagado', recargos: 0, metodoPago: 'Efectivo', historialPagos: '2023-06-25: $500000', notificacionesEnviadas: '2023-06-20', observaciones: 'Pago anticipado' },
    ])

    const [filteredTransacciones, setFilteredTransacciones] = useState(transacciones)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = transacciones.filter(transaccion =>
            Object.values(transaccion).some(value =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredTransacciones(results)
        setCurrentPage(1)
    }, [searchTerm, transacciones])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredTransacciones.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredTransacciones.length / itemsPerPage)

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
        const newTransaccion = {
            ...formData,
            montoTotalFacturado: parseFloat(formData.montoTotalFacturado),
            montoPagado: formData.montoPagado ? parseFloat(formData.montoPagado) : 0,
            recargos: formData.recargos ? parseFloat(formData.recargos) : 0,
        }
        setTransacciones([...transacciones, newTransaccion])
        setIsModalOpen(false)
        setFormData({
            idTransaccion: '',
            tipoTransaccion: '',
            propietarioResidente: '',
            unidadAsociada: '',
            concepto: '',
            montoTotalFacturado: '',
            fechaEmision: '',
            fechaVencimiento: '',
            montoPagado: '',
            estadoPago: '',
            recargos: '',
            metodoPago: '',
            historialPagos: '',
            notificacionesEnviadas: '',
            observaciones: ''
        })
    }

    const handleEdit = (idTransaccion: string) => {
        console.log('Editar transacción:', idTransaccion)
    }

    const handleDelete = (idTransaccion: string) => {
        console.log('Eliminar transacción:', idTransaccion)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de Cartera</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Agregar Transacción
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar transacciones..."
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propietario</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepto</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((transaccion) => (
                            <tr key={transaccion.idTransaccion}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaccion.idTransaccion}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaccion.tipoTransaccion}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaccion.propietarioResidente}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaccion.unidadAsociada}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaccion.concepto}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaccion.montoTotalFacturado.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaccion.estadoPago}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(transaccion.idTransaccion)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(transaccion.idTransaccion)}
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredTransacciones.length)}</span> de{' '}
                                    <span className="font-medium">{filteredTransacciones.length}</span> resultados
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
                                            Agregar Nueva Transacción
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idTransaccion">
                                                        ID Transacción*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idTransaccion"
                                                        name="idTransaccion"
                                                        type="text"
                                                        placeholder="ID Transacción"
                                                        required
                                                        value={formData.idTransaccion}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="tipoTransaccion">
                                                        Tipo de Transacción*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="tipoTransaccion"
                                                        name="tipoTransaccion"
                                                        required
                                                        value={formData.tipoTransaccion}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione el tipo</option>
                                                        <option value="Factura">Factura</option>
                                                        <option value="Pago">Pago</option>
                                                        <option value="Multa">Multa</option>
                                                        <option value="Recargo">Recargo</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="propietarioResidente">
                                                        Propietario/Residente*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="propietarioResidente"
                                                        name="propietarioResidente"
                                                        type="text"
                                                        placeholder="Nombre del propietario o residente"
                                                        required
                                                        value={formData.propietarioResidente}
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
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="concepto">
                                                        Concepto*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="concepto"
                                                        name="concepto"
                                                        type="text"
                                                        placeholder="Ej: Cuota de administración"
                                                        required
                                                        value={formData.concepto}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="montoTotalFacturado">
                                                        Monto Total Facturado*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="montoTotalFacturado"
                                                        name="montoTotalFacturado"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Monto total"
                                                        required
                                                        value={formData.montoTotalFacturado}
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
                                                        <option value="Pagado">Pagado</option>
                                                        <option value="Pendiente">Pendiente</option>
                                                        <option value="Vencido">Vencido</option>
                                                        <option value="Parcial">Parcial</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="recargos">
                                                        Recargos
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="recargos"
                                                        name="recargos"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Recargos"
                                                        value={formData.recargos}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="metodoPago">
                                                        Método de Pago
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="metodoPago"
                                                        name="metodoPago"
                                                        type="text"
                                                        placeholder="Ej: Transferencia, tarjeta, efectivo"
                                                        value={formData.metodoPago}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="historialPagos">
                                                        Historial de Pagos
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="historialPagos"
                                                        name="historialPagos"
                                                        placeholder="Lista de pagos realizados"
                                                        value={formData.historialPagos}
                                                        onChange={handleInputChange}
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
                                                        placeholder="Notas adicionales sobre la transacción"
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