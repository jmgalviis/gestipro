'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react'

export default function Seguros() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idSeguro: '',
        numeropoliza: '',
        tipoSeguro: '',
        aseguradora: '',
        fechaInicio: '',
        fechaVencimiento: '',
        montoAsegurado: '',
        prima: '',
        cobertura: '',
        exclusiones: '',
        estado: '',
        recordatorios: '',
        siniestrosRegistrados: ''
    })

    const [seguros, setSeguros] = useState([
        { idSeguro: 'S001', numeropoliza: 'POL-001', tipoSeguro: 'Incendios', aseguradora: 'Seguros XYZ', fechaInicio: '2023-01-01', fechaVencimiento: '2023-12-31', montoAsegurado: 1000000, prima: 50000, cobertura: 'Daños por incendio y eventos naturales', exclusiones: 'Daños por negligencia', estado: 'Vigente', recordatorios: '2023-12-01', siniestrosRegistrados: 'Ninguno' },
        { idSeguro: 'S002', numeropoliza: 'POL-002', tipoSeguro: 'Responsabilidad Civil', aseguradora: 'Aseguradora ABC', fechaInicio: '2023-02-15', fechaVencimiento: '2024-02-14', montoAsegurado: 500000, prima: 30000, cobertura: 'Daños a terceros', exclusiones: 'Daños intencionales', estado: 'Vigente', recordatorios: '2024-01-15', siniestrosRegistrados: '1 reclamo en 2023' },
        { idSeguro: 'S003', numeropoliza: 'POL-003', tipoSeguro: 'Inundaciones', aseguradora: 'Seguros 123', fechaInicio: '2023-03-01', fechaVencimiento: '2024-02-29', montoAsegurado: 750000, prima: 40000, cobertura: 'Daños por inundaciones y filtraciones', exclusiones: 'Daños por falta de mantenimiento', estado: 'En renovación', recordatorios: '2024-02-01', siniestrosRegistrados: 'Ninguno' },
        { idSeguro: 'S004', numeropoliza: 'POL-004', tipoSeguro: 'Todo Riesgo', aseguradora: 'Mega Seguros', fechaInicio: '2023-04-01', fechaVencimiento: '2024-03-31', montoAsegurado: 2000000, prima: 100000, cobertura: 'Cobertura integral de la propiedad', exclusiones: 'Desgaste normal', estado: 'Vigente', recordatorios: '2024-03-01', siniestrosRegistrados: '2 reclamos menores' },
        { idSeguro: 'S005', numeropoliza: 'POL-005', tipoSeguro: 'Equipos Electrónicos', aseguradora: 'Tech Seguros', fechaInicio: '2023-05-15', fechaVencimiento: '2024-05-14', montoAsegurado: 300000, prima: 25000, cobertura: 'Daños a equipos electrónicos comunes', exclusiones: 'Robo sin evidencia de forzamiento', estado: 'Vigente', recordatorios: '2024-04-15', siniestrosRegistrados: 'Ninguno' },
    ])

    const [filteredSeguros, setFilteredSeguros] = useState(seguros)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = seguros.filter(seguro =>
            Object.values(seguro).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredSeguros(results)
        setCurrentPage(1)
    }, [searchTerm, seguros])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredSeguros.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredSeguros.length / itemsPerPage)

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
        setSeguros([...seguros, formData])
        setIsModalOpen(false)
        setFormData({
            idSeguro: '',
            numeropoliza: '',
            tipoSeguro: '',
            aseguradora: '',
            fechaInicio: '',
            fechaVencimiento: '',
            montoAsegurado: '',
            prima: '',
            cobertura: '',
            exclusiones: '',
            estado: '',
            recordatorios: '',
            siniestrosRegistrados: ''
        })
    }

    const handleEdit = (idSeguro: string) => {
        console.log('Editar seguro:', idSeguro)
    }

    const handleDelete = (idSeguro: string) => {
        console.log('Eliminar seguro:', idSeguro)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de Seguros</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Agregar Seguro
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar seguros..."
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Seguro</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número de Póliza</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Seguro</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aseguradora</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Vencimiento</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((seguro) => (
                            <tr key={seguro.idSeguro}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{seguro.idSeguro}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seguro.numeropoliza}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seguro.tipoSeguro}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seguro.aseguradora}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seguro.fechaVencimiento}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seguro.estado}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(seguro.idSeguro)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(seguro.idSeguro)}
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredSeguros.length)}</span> de{' '}
                                    <span className="font-medium">{filteredSeguros.length}</span> resultados
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
                                            Registrar Nuevo Seguro
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idSeguro">
                                                        ID Seguro*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idSeguro"
                                                        name="idSeguro"
                                                        type="text"
                                                        placeholder="ID Seguro"
                                                        required
                                                        value={formData.idSeguro}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="numeropoliza">
                                                        Número de Póliza*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="numeropoliza"
                                                        name="numeropoliza"
                                                        type="text"
                                                        placeholder="Número de Póliza"
                                                        required
                                                        value={formData.numeropoliza}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="tipoSeguro">
                                                        Tipo de Seguro*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="tipoSeguro"
                                                        name="tipoSeguro"
                                                        type="text"
                                                        placeholder="Tipo de Seguro"
                                                        required
                                                        value={formData.tipoSeguro}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="aseguradora">
                                                        Aseguradora*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="aseguradora"
                                                        name="aseguradora"
                                                        type="text"
                                                        placeholder="Aseguradora"
                                                        required
                                                        value={formData.aseguradora}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="fechaInicio">
                                                        Fecha de Inicio*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="fechaInicio"
                                                        name="fechaInicio"
                                                        type="date"
                                                        required
                                                        value={formData.fechaInicio}
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
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="montoAsegurado">
                                                        Monto Asegurado*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="montoAsegurado"
                                                        name="montoAsegurado"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Monto Asegurado"
                                                        required
                                                        value={formData.montoAsegurado}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="prima">
                                                        Prima*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="prima"
                                                        name="prima"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Prima"
                                                        required
                                                        value={formData.prima}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="cobertura">
                                                        Cobertura*
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="cobertura"
                                                        name="cobertura"
                                                        placeholder="Cobertura"
                                                        required
                                                        value={formData.cobertura}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="exclusiones">
                                                        Exclusiones
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="exclusiones"
                                                        name="exclusiones"
                                                        placeholder="Exclusiones"
                                                        value={formData.exclusiones}
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
                                                        <option value="Vigente">Vigente</option>
                                                        <option value="Vencido">Vencido</option>
                                                        <option value="En renovación">En renovación</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="recordatorios">
                                                        Recordatorios*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="recordatorios"
                                                        name="recordatorios"
                                                        type="date"
                                                        required
                                                        value={formData.recordatorios}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="siniestrosRegistrados">
                                                        Siniestros Registrados
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="siniestrosRegistrados"
                                                        name="siniestrosRegistrados"
                                                        placeholder="Siniestros Registrados"
                                                        value={formData.siniestrosRegistrados}
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