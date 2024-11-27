'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus, Paperclip } from 'lucide-react'

export default function Mantenimientos() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idMantenimiento: '',
        tipoMantenimiento: '',
        elementoAsociado: '',
        descripcionActividad: '',
        fechaProgramada: '',
        horaInicio: '',
        estado: '',
        responsable: '',
        costoEstimado: '',
        costoReal: '',
        documentacionAdjunta: null as File | null,
    })

    const [mantenimientos, setMantenimientos] = useState([
        { idMantenimiento: 'M001', tipoMantenimiento: 'Preventivo', elementoAsociado: 'Ascensor 1', descripcionActividad: 'Lubricación de ascensores', fechaProgramada: '2023-06-15', horaInicio: '09:00', estado: 'Programado', responsable: 'TechElevator S.A.', costoEstimado: 500000, costoReal: null },
        { idMantenimiento: 'M002', tipoMantenimiento: 'Correctivo', elementoAsociado: 'Bomba de Agua', descripcionActividad: 'Reparación de fuga', fechaProgramada: '2023-06-10', horaInicio: '14:00', estado: 'Completado', responsable: 'Plomería Express', costoEstimado: 300000, costoReal: 350000 },
        { idMantenimiento: 'M003', tipoMantenimiento: 'Preventivo', elementoAsociado: 'Sistema Eléctrico', descripcionActividad: 'Revisión general', fechaProgramada: '2023-06-20', horaInicio: '10:00', estado: 'Programado', responsable: 'ElectriMax', costoEstimado: 400000, costoReal: null },
        { idMantenimiento: 'M004', tipoMantenimiento: 'Correctivo', elementoAsociado: 'Puerta de Garaje', descripcionActividad: 'Cambio de motor', fechaProgramada: '2023-06-12', horaInicio: '11:00', estado: 'En curso', responsable: 'Puertas Seguras Ltda.', costoEstimado: 600000, costoReal: null },
        { idMantenimiento: 'M005', tipoMantenimiento: 'Preventivo', elementoAsociado: 'Piscina', descripcionActividad: 'Limpieza y balance químico', fechaProgramada: '2023-06-18', horaInicio: '08:00', estado: 'Programado', responsable: 'AquaClean', costoEstimado: 200000, costoReal: null },
    ])

    const [filteredMantenimientos, setFilteredMantenimientos] = useState(mantenimientos)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = mantenimientos.filter(mantenimiento =>
            Object.values(mantenimiento).some(value =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredMantenimientos(results)
        setCurrentPage(1)
    }, [searchTerm, mantenimientos])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredMantenimientos.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredMantenimientos.length / itemsPerPage)

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
                documentacionAdjunta: e.target.files ? e.target.files[0] : null
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newMantenimiento = {
            ...formData,
            costoEstimado: parseFloat(formData.costoEstimado),
            costoReal: formData.costoReal ? parseFloat(formData.costoReal) : null,
        }
        setMantenimientos([...mantenimientos, newMantenimiento])
        setIsModalOpen(false)
        setFormData({
            idMantenimiento: '',
            tipoMantenimiento: '',
            elementoAsociado: '',
            descripcionActividad: '',
            fechaProgramada: '',
            horaInicio: '',
            estado: '',
            responsable: '',
            costoEstimado: '',
            costoReal: '',
            documentacionAdjunta: null,
        })
    }

    const handleEdit = (idMantenimiento: string) => {
        console.log('Editar mantenimiento:', idMantenimiento)
    }

    const handleDelete = (idMantenimiento: string) => {
        console.log('Eliminar mantenimiento:', idMantenimiento)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de Mantenimientos</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Agregar Mantenimiento
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar mantenimientos..."
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Elemento</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((mantenimiento) => (
                            <tr key={mantenimiento.idMantenimiento}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mantenimiento.idMantenimiento}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mantenimiento.tipoMantenimiento}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mantenimiento.elementoAsociado}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mantenimiento.fechaProgramada}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mantenimiento.estado}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mantenimiento.responsable}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(mantenimiento.idMantenimiento)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(mantenimiento.idMantenimiento)}
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredMantenimientos.length)}</span> de{' '}
                                    <span className="font-medium">{filteredMantenimientos.length}</span> resultados
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
                                            Registrar Nuevo Mantenimiento
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idMantenimiento">
                                                        ID Mantenimiento*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idMantenimiento"
                                                        name="idMantenimiento"
                                                        type="text"
                                                        placeholder="ID Mantenimiento"
                                                        required
                                                        value={formData.idMantenimiento}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="tipoMantenimiento">
                                                        Tipo de Mantenimiento*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="tipoMantenimiento"
                                                        name="tipoMantenimiento"
                                                        required
                                                        value={formData.tipoMantenimiento}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione un tipo</option>
                                                        <option value="Preventivo">Preventivo</option>
                                                        <option value="Correctivo">Correctivo</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="elementoAsociado">
                                                        Elemento Asociado*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="elementoAsociado"
                                                        name="elementoAsociado"
                                                        type="text"
                                                        placeholder="Elemento Asociado"
                                                        required
                                                        value={formData.elementoAsociado}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="descripcionActividad">
                                                        Descripción de la Actividad*
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="descripcionActividad"
                                                        name="descripcionActividad"
                                                        placeholder="Descripción de la Actividad"
                                                        required
                                                        value={formData.descripcionActividad}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="fechaProgramada">
                                                        Fecha Programada*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="fechaProgramada"
                                                        name="fechaProgramada"
                                                        type="date"
                                                        required
                                                        value={formData.fechaProgramada}
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
                                                        <option value="Programado">Programado</option>
                                                        <option value="En curso">En curso</option>
                                                        <option value="Completado">Completado</option>
                                                        <option value="Cancelado">Cancelado</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="responsable">
                                                        Responsable*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="responsable"
                                                        name="responsable"
                                                        type="text"
                                                        placeholder="Responsable"
                                                        required
                                                        value={formData.responsable}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="costoEstimado">
                                                        Costo Estimado*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="costoEstimado"
                                                        name="costoEstimado"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Costo Estimado"
                                                        required
                                                        value={formData.costoEstimado}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="costoReal">
                                                        Costo Real
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="costoReal"
                                                        name="costoReal"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Costo Real"
                                                        value={formData.costoReal}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="documentacionAdjunta">
                                                        Documentación Adjunta
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="documentacionAdjunta"
                                                        name="documentacionAdjunta"
                                                        type="file"
                                                        onChange={handleFileChange}
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