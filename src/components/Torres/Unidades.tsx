'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Unidades() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idTorre: '',
        nombreTorre: '',
        numeroPisos: '',
        areaTotalConstruida: '',
        coeficienteTotal: '',
        zonasComunes: '',
        numeroTotalApartamentos: '',
        ascensores: '',
        serviciosAsociados: ''
    })

    const [torres, setTorres] = useState([
        { idTorre: 'T001', nombreTorre: 'Torre A', numeroPisos: 20, areaTotalConstruida: 15000, coeficienteTotal: 1.0 },
        { idTorre: 'T002', nombreTorre: 'Torre B', numeroPisos: 15, areaTotalConstruida: 12000, coeficienteTotal: 0.8 },
        { idTorre: 'T003', nombreTorre: 'Torre C', numeroPisos: 18, areaTotalConstruida: 13500, coeficienteTotal: 0.9 },
        { idTorre: 'T004', nombreTorre: 'Torre D', numeroPisos: 22, areaTotalConstruida: 16000, coeficienteTotal: 1.1 },
        { idTorre: 'T005', nombreTorre: 'Torre E', numeroPisos: 16, areaTotalConstruida: 12500, coeficienteTotal: 0.85 },
        { idTorre: 'T006', nombreTorre: 'Torre F', numeroPisos: 19, areaTotalConstruida: 14000, coeficienteTotal: 0.95 },
        { idTorre: 'T007', nombreTorre: 'Torre G', numeroPisos: 21, areaTotalConstruida: 15500, coeficienteTotal: 1.05 },
        { idTorre: 'T008', nombreTorre: 'Torre H', numeroPisos: 17, areaTotalConstruida: 13000, coeficienteTotal: 0.88 },
        { idTorre: 'T009', nombreTorre: 'Torre I', numeroPisos: 23, areaTotalConstruida: 16500, coeficienteTotal: 1.15 },
        { idTorre: 'T010', nombreTorre: 'Torre J', numeroPisos: 14, areaTotalConstruida: 11500, coeficienteTotal: 0.75 },
    ])

    const [filteredTorres, setFilteredTorres] = useState(torres)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = torres.filter(torre =>
            Object.values(torre).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredTorres(results)
        setCurrentPage(1)
    }, [searchTerm, torres])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredTorres.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredTorres.length / itemsPerPage)

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setTorres([...torres, formData])
        setIsModalOpen(false)
        setFormData({
            idTorre: '',
            nombreTorre: '',
            numeroPisos: '',
            areaTotalConstruida: '',
            coeficienteTotal: '',
            zonasComunes: '',
            numeroTotalApartamentos: '',
            ascensores: '',
            serviciosAsociados: ''
        })
    }

    const handleEdit = (idTorre: string) => {
        console.log('Editar torre:', idTorre)
    }

    const handleDelete = (idTorre: string) => {
        console.log('Eliminar torre:', idTorre)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Registro de Torres</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        Agregar Torre
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar torres..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                </div>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Torre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Torre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número de Pisos</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área Total Construida</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coeficiente Total</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((torre) => (
                            <tr key={torre.idTorre}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{torre.idTorre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{torre.nombreTorre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{torre.numeroPisos}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{torre.areaTotalConstruida} m²</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{torre.coeficienteTotal}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(torre.idTorre)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(torre.idTorre)}
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredTorres.length)}</span> de{' '}
                                    <span className="font-medium">{filteredTorres.length}</span> resultados
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
                                            Registrar Nueva Torre
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idTorre">
                                                        ID Torre*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idTorre"
                                                        name="idTorre"
                                                        type="text"
                                                        placeholder="ID Torre"
                                                        required
                                                        value={formData.idTorre}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="nombreTorre">
                                                        Nombre Torre*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="nombreTorre"
                                                        name="nombreTorre"
                                                        type="text"
                                                        placeholder="Nombre Torre"
                                                        required
                                                        value={formData.nombreTorre}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="numeroPisos">
                                                        Número de Pisos*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="numeroPisos"
                                                        name="numeroPisos"
                                                        type="number"
                                                        placeholder="Número de Pisos"
                                                        required
                                                        value={formData.numeroPisos}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="areaTotalConstruida">
                                                        Área Total Construida (m²)
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="areaTotalConstruida"
                                                        name="areaTotalConstruida"
                                                        type="number"
                                                        placeholder="Área Total Construida"
                                                        value={formData.areaTotalConstruida}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="coeficienteTotal">
                                                        Coeficiente Total*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="coeficienteTotal"
                                                        name="coeficienteTotal"
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Coeficiente Total"
                                                        required
                                                        value={formData.coeficienteTotal}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="zonasComunes">
                                                        Zonas Comunes Relacionadas
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="zonasComunes"
                                                        name="zonasComunes"
                                                        type="text"
                                                        placeholder="Ej.: Piscina, gimnasio"
                                                        value={formData.zonasComunes}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="numeroTotalApartamentos">
                                                        Número Total de Apartamentos*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="numeroTotalApartamentos"
                                                        name="numeroTotalApartamentos"
                                                        type="number"
                                                        placeholder="Número Total de Apartamentos"
                                                        required
                                                        value={formData.numeroTotalApartamentos}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="ascensores">
                                                        Ascensores
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="ascensores"
                                                        name="ascensores"
                                                        type="number"
                                                        placeholder="Número de Ascensores"
                                                        value={formData.ascensores}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="serviciosAsociados">
                                                        Servicios Asociados
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="serviciosAsociados"
                                                        name="serviciosAsociados"
                                                        type="text"
                                                        placeholder="Ej.: Sensores de humo, cámaras"
                                                        value={formData.serviciosAsociados}
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