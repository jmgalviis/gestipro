'use client'

import { useState, useEffect } from 'react'
import { Pencil, Trash2, ChevronLeft, ChevronRight, Search, Plus, Paperclip, Tag } from 'lucide-react'

export default function Archivos() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        idArchivo: '',
        nombreArchivo: '',
        tipoDocumento: '',
        fechaCreacion: '',
        fechaSubida: '',
        usuarioSubio: '',
        permisosAcceso: '',
        estado: '',
        formatoArchivo: '',
        etiquetas: '',
        fechaVencimiento: '',
        documentosRelacionados: '',
        archivo: null as File | null,
    })

    const [archivos, setArchivos] = useState([
        { idArchivo: 'A001', nombreArchivo: 'Acta Asamblea General 2023', tipoDocumento: 'Acta', fechaCreacion: '2023-03-15', fechaSubida: '2023-03-20', usuarioSubio: 'Admin1', permisosAcceso: 'Público', estado: 'Vigente', formatoArchivo: 'PDF', etiquetas: 'asamblea, 2023', fechaVencimiento: '', documentosRelacionados: 'A002' },
        { idArchivo: 'A002', nombreArchivo: 'Presupuesto Anual 2023', tipoDocumento: 'Presupuesto', fechaCreacion: '2023-01-10', fechaSubida: '2023-01-15', usuarioSubio: 'Admin2', permisosAcceso: 'Administración', estado: 'Vigente', formatoArchivo: 'XLSX', etiquetas: 'presupuesto, 2023', fechaVencimiento: '2023-12-31', documentosRelacionados: 'A001' },
        { idArchivo: 'A003', nombreArchivo: 'Reglamento Interno', tipoDocumento: 'Reglamento', fechaCreacion: '2022-05-01', fechaSubida: '2022-05-05', usuarioSubio: 'Admin1', permisosAcceso: 'Público', estado: 'Vigente', formatoArchivo: 'PDF', etiquetas: 'reglamento, normativa', fechaVencimiento: '', documentosRelacionados: '' },
        { idArchivo: 'A004', nombreArchivo: 'Contrato Mantenimiento Ascensores', tipoDocumento: 'Contrato', fechaCreacion: '2023-02-01', fechaSubida: '2023-02-03', usuarioSubio: 'Admin2', permisosAcceso: 'Administración', estado: 'Vigente', formatoArchivo: 'PDF', etiquetas: 'contrato, ascensores', fechaVencimiento: '2024-01-31', documentosRelacionados: '' },
        { idArchivo: 'A005', nombreArchivo: 'Planos Edificio', tipoDocumento: 'Plano', fechaCreacion: '2020-01-15', fechaSubida: '2020-01-20', usuarioSubio: 'Admin1', permisosAcceso: 'Privado', estado: 'Vigente', formatoArchivo: 'JPG', etiquetas: 'planos, arquitectura', fechaVencimiento: '', documentosRelacionados: '' },
    ])

    const [filteredArchivos, setFilteredArchivos] = useState(archivos)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const itemsPerPage = 7

    useEffect(() => {
        const results = archivos.filter(archivo =>
            Object.values(archivo).some(value =>
                value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredArchivos(results)
        setCurrentPage(1)
    }, [searchTerm, archivos])

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredArchivos.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredArchivos.length / itemsPerPage)

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
                archivo: e.target.files ? e.target.files[0] : null
            }))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newArchivo = {
            ...formData,
            fechaSubida: new Date().toISOString().split('T')[0], // Set current date as upload date
        }
        setArchivos([...archivos, newArchivo])
        setIsModalOpen(false)
        setFormData({
            idArchivo: '',
            nombreArchivo: '',
            tipoDocumento: '',
            fechaCreacion: '',
            fechaSubida: '',
            usuarioSubio: '',
            permisosAcceso: '',
            estado: '',
            formatoArchivo: '',
            etiquetas: '',
            fechaVencimiento: '',
            documentosRelacionados: '',
            archivo: null,
        })
    }

    const handleEdit = (idArchivo: string) => {
        console.log('Editar archivo:', idArchivo)
    }

    const handleDelete = (idArchivo: string) => {
        console.log('Eliminar archivo:', idArchivo)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-600">Gestión de Archivos</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Agregar Archivo
                    </button>
                </div>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Buscar archivos..."
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
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Subida</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permisos</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((archivo) => (
                            <tr key={archivo.idArchivo}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{archivo.idArchivo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{archivo.nombreArchivo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{archivo.tipoDocumento}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{archivo.fechaSubida}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{archivo.permisosAcceso}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{archivo.estado}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button
                                        onClick={() => handleEdit(archivo.idArchivo)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <Pencil className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(archivo.idArchivo)}
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
                                    Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredArchivos.length)}</span> de{' '}
                                    <span className="font-medium">{filteredArchivos.length}</span> resultados
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
                                            Agregar Nuevo Archivo
                                        </h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="idArchivo">
                                                        ID Archivo*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="idArchivo"
                                                        name="idArchivo"
                                                        type="text"
                                                        placeholder="ID Archivo"
                                                        required
                                                        value={formData.idArchivo}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="nombreArchivo">
                                                        Nombre del Archivo*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="nombreArchivo"
                                                        name="nombreArchivo"
                                                        type="text"
                                                        placeholder="Nombre del Archivo"
                                                        required
                                                        value={formData.nombreArchivo}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="tipoDocumento">
                                                        Tipo de Documento*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="tipoDocumento"
                                                        name="tipoDocumento"
                                                        type="text"
                                                        placeholder="Tipo de Documento"
                                                        required
                                                        value={formData.tipoDocumento}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="fechaCreacion">
                                                        Fecha de Creación*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="fechaCreacion"
                                                        name="fechaCreacion"
                                                        type="date"
                                                        required
                                                        value={formData.fechaCreacion}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="usuarioSubio">
                                                        Usuario que Subió el Archivo*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="usuarioSubio"
                                                        name="usuarioSubio"
                                                        type="text"
                                                        placeholder="Usuario que Subió el Archivo"
                                                        required
                                                        value={formData.usuarioSubio}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="permisosAcceso">
                                                        Permisos de Acceso*
                                                    </label>
                                                    <select
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="permisosAcceso"
                                                        name="permisosAcceso"
                                                        required
                                                        value={formData.permisosAcceso}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Seleccione los permisos</option>
                                                        <option value="Público">Público</option>
                                                        <option value="Administración">Administración</option>
                                                        <option value="Privado">Privado</option>
                                                    </select>
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
                                                        <option value="Vigente">Vigente</option>
                                                        <option value="Vencido">Vencido</option>
                                                        <option value="Archivado">Archivado</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="formatoArchivo">
                                                        Formato del Archivo*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="formatoArchivo"
                                                        name="formatoArchivo"
                                                        type="text"
                                                        placeholder="Formato del Archivo"
                                                        required
                                                        value={formData.formatoArchivo}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="etiquetas">
                                                        Etiquetas
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="etiquetas"
                                                        name="etiquetas"
                                                        type="text"
                                                        placeholder="Etiquetas (separadas por comas)"
                                                        value={formData.etiquetas}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="fechaVencimiento">
                                                        Fecha de Vencimiento
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="fechaVencimiento"
                                                        name="fechaVencimiento"
                                                        type="date"
                                                        value={formData.fechaVencimiento}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="documentosRelacionados">
                                                        Documentos Relacionados
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="documentosRelacionados"
                                                        name="documentosRelacionados"
                                                        type="text"
                                                        placeholder="IDs de documentos relacionados (separados por comas)"
                                                        value={formData.documentosRelacionados}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="archivo">
                                                        Archivo*
                                                    </label>
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="archivo"
                                                        name="archivo"
                                                        type="file"
                                                        required
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