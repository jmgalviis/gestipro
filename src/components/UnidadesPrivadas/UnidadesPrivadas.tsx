'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react'

export default function UnidadesPrivadas() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idApartamento: '',
        numeroNombre: '',
        torreAsociada: '',
        piso: '',
        area: '',
        coeficientePropiedad: '',
        propietario: '',
        estadoOcupacion: '',
        numeroHabitaciones: '',
        numeroBanos: '',
        parqueaderosAsignados: '',
        historialOcupacion: '',
        saldoFinanciero: '',
        documentosAdjuntos: null
    })

    const [apartamentos, setApartamentos] = useState([
        { idApartamento: 'A001', numeroNombre: '101', torreAsociada: 'Torre A', piso: 1, area: 75.5, coeficientePropiedad: 0.015, propietario: 'Juan Pérez', estadoOcupacion: 'Ocupado' },
        { idApartamento: 'A002', numeroNombre: '202', torreAsociada: 'Torre B', piso: 2, area: 85.0, coeficientePropiedad: 0.017, propietario: 'María Gómez', estadoOcupacion: 'Desocupado' },
        { idApartamento: 'A003', numeroNombre: '303', torreAsociada: 'Torre A', piso: 3, area: 90.5, coeficientePropiedad: 0.018, propietario: 'Carlos Rodríguez', estadoOcupacion: 'Ocupado' },
        { idApartamento: 'A004', numeroNombre: '404', torreAsociada: 'Torre C', piso: 4, area: 100.0, coeficientePropiedad: 0.020, propietario: 'Ana Martínez', estadoOcupacion: 'Ocupado' },
        { idApartamento: 'A005', numeroNombre: '505', torreAsociada: 'Torre B', piso: 5, area: 110.5, coeficientePropiedad: 0.022, propietario: 'Luis Sánchez', estadoOcupacion: 'Desocupado' },
        { idApartamento: 'A006', numeroNombre: '606', torreAsociada: 'Torre A', piso: 6, area: 95.0, coeficientePropiedad: 0.019, propietario: 'Elena Torres', estadoOcupacion: 'Ocupado' },
        { idApartamento: 'A007', numeroNombre: '707', torreAsociada: 'Torre C', piso: 7, area: 105.5, coeficientePropiedad: 0.021, propietario: 'Pedro Ramírez', estadoOcupacion: 'Ocupado' },
        { idApartamento: 'A008', numeroNombre: '808', torreAsociada: 'Torre B', piso: 8, area: 115.0, coeficientePropiedad: 0.023, propietario: 'Sofia López', estadoOcupacion: 'Desocupado' },
        { idApartamento: 'A009', numeroNombre: '909', torreAsociada: 'Torre A', piso: 9, area: 120.5, coeficientePropiedad: 0.024, propietario: 'Diego Hernández', estadoOcupacion: 'Ocupado' },
        { idApartamento: 'A010', numeroNombre: '1010', torreAsociada: 'Torre C', piso: 10, area: 130.0, coeficientePropiedad: 0.026, propietario: 'Laura Díaz', estadoOcupacion: 'Ocupado' },
    ])

    const [filteredApartamentos, setFilteredApartamentos] = useState(apartamentos)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = apartamentos.filter(apartamento =>
            Object.values(apartamento).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredApartamentos(results)
        setCurrentPage(1)
    }, [searchTerm, apartamentos])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredApartamentos.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredApartamentos.length / itemsPerPage)

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                documentosAdjuntos: e.target.files?.[0] || null
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setApartamentos([...apartamentos, formData])
        setIsModalOpen(false)
        setFormData({
            idApartamento: '',
            numeroNombre: '',
            torreAsociada: '',
            piso: '',
            area: '',
            coeficientePropiedad: '',
            propietario: '',
            estadoOcupacion: '',
            numeroHabitaciones: '',
            numeroBanos: '',
            parqueaderosAsignados: '',
            historialOcupacion: '',
            saldoFinanciero: '',
            documentosAdjuntos: null
        })
    }

    const handleEdit = (idApartamento: string) => {
        console.log('Editar apartamento:', idApartamento)
    }

    const handleDelete = (idApartamento: string) => {
        console.log('Eliminar apartamento:', idApartamento)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de Apartamentos</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Agregar Apartamento
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar apartamentos..."
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Apartamento</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número/Nombre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Torre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Piso</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área (m²)</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coeficiente</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propietario</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((apartamento) => (
                            <tr key={apartamento.idApartamento}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{apartamento.idApartamento}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apartamento.numeroNombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apartamento.torreAsociada}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apartamento.piso}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apartamento.area}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apartamento.coeficientePropiedad.toFixed(3)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apartamento.propietario}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apartamento.estadoOcupacion}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(apartamento.idApartamento)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(apartamento.idApartamento)}
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredApartamentos.length)}</span> de{' '}
                                    <span className="font-medium">{filteredApartamentos.length}</span> resultados
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
                                            Registrar Nuevo Apartamento
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idApartamento">
                                                        ID Apartamento*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idApartamento"
                                                        name="idApartamento"
                                                        type="text"
                                                        placeholder="ID Apartamento"
                                                        required
                                                        value={formData.idApartamento}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="numeroNombre">
                                                        Número o Nombre del Apartamento*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="numeroNombre"
                                                        name="numeroNombre"
                                                        type="text"
                                                        placeholder="Ej.: 101, A-5"
                                                        required
                                                        value={formData.numeroNombre}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="torreAsociada">
                                                        Torre Asociada*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="torreAsociada"
                                                        name="torreAsociada"
                                                        type="text"
                                                        placeholder="Torre Asociada"
                                                        required
                                                        value={formData.torreAsociada}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="piso">
                                                        Piso*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="piso"
                                                        name="piso"
                                                        type="number"
                                                        placeholder="Piso"
                                                        required
                                                        value={formData.piso}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="area">
                                                        Área (m²)*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="area"
                                                        name="area"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Área en m²"
                                                        required
                                                        value={formData.area}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="coeficientePropiedad">
                                                        Coeficiente de Propiedad*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="coeficientePropiedad"
                                                        name="coeficientePropiedad"
                                                        type="number"
                                                        step="0.001"
                                                        placeholder="Ej.: 0.015"
                                                        required
                                                        value={formData.coeficientePropiedad}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="propietario">
                                                        Propietario*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="propietario"
                                                        name="propietario"
                                                        type="text"
                                                        placeholder="Nombre del propietario"
                                                        required
                                                        value={formData.propietario}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="estadoOcupacion">
                                                        Estado de Ocupación*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="estadoOcupacion"
                                                        name="estadoOcupacion"
                                                        required
                                                        value={formData.estadoOcupacion}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione un estado</option>
                                                        <option value="Ocupado">Ocupado</option>
                                                        <option value="Desocupado">Desocupado</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="numeroHabitaciones">
                                                        Número de Habitaciones
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="numeroHabitaciones"
                                                        name="numeroHabitaciones"
                                                        type="number"
                                                        placeholder="Número de habitaciones"
                                                        value={formData.numeroHabitaciones}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="numeroBanos">
                                                        Número de Baños
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="numeroBanos"
                                                        name="numeroBanos"
                                                        type="number"
                                                        placeholder="Número de baños"
                                                        value={formData.numeroBanos}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="parqueaderosAsignados">
                                                        Parqueaderos Asignados
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="parqueaderosAsignados"
                                                        name="parqueaderosAsignados"
                                                        type="number"
                                                        placeholder="Número de parqueaderos"
                                                        value={formData.parqueaderosAsignados}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="historialOcupacion">
                                                        Historial de Ocupación
                                                    </label>
                                                    <textarea
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="historialOcupacion"
                                                        name="historialOcupacion"
                                                        placeholder="Historial de ocupaciones anteriores"
                                                        value={formData.historialOcupacion}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="saldoFinanciero">
                                                        Saldo Financiero
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="saldoFinanciero"
                                                        name="saldoFinanciero"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Saldo financiero"
                                                        value={formData.saldoFinanciero}
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
                                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Submit
                                                </button>
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