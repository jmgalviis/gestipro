'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

// Definición de tipos
type User = {
    id: number
    fullName: string
    documentId: string
    email: string
    phoneNumber: string
    role: string
    status: 'active' | 'inactive' | 'suspended'
}

// Componente principal de gestión de usuarios
export default function Usuarios() {
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(7)

    useEffect(() => {
        // Simular carga de usuarios desde una API
        const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            fullName: `Usuario ${i + 1}`,
            documentId: `DOC${100000 + i}`,
            email: `usuario${i + 1}@example.com`,
            phoneNumber: `+57 300 ${1000000 + i}`,
            role: i % 3 === 0 ? 'Administrador' : i % 3 === 1 ? 'Residente' : 'Guardia',
            status: i % 5 === 0 ? 'inactive' : i % 7 === 0 ? 'suspended' : 'active'
        }))
        setUsers(mockUsers)
    }, [])

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            Object.values(user).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    }, [users, searchTerm])

    const pageCount = Math.ceil(filteredUsers.length / itemsPerPage)
    const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    const addUser = (user: Omit<User, 'id'>) => {
        const newUser = { ...user, id: users.length + 1 }
        setUsers([...users, newUser])
        setIsFormOpen(false)
    }

    const updateUser = (updatedUser: User) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user))
        setSelectedUser(null)
        setIsFormOpen(false)
    }

    const deleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id))
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-600">Gestión de Usuarios</h2>
                    <button
                        onClick={() => {
                            setSelectedUser(null)
                            setIsFormOpen(true)
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <PlusIcon className="inline-block mr-2" size={16} />
                        Agregar Usuario
                    </button>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar usuarios..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre Completo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.fullName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.documentId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phoneNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' :
                            user.status === 'inactive' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => {
                                            setSelectedUser(user)
                                            setIsFormOpen(true)
                                        }}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <PencilIcon size={18} />
                                        <span className="sr-only">Editar</span>
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <TrashIcon size={18} />
                                        <span className="sr-only">Eliminar</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">{indexOfFirstItem + 1}</span> a <span className="font-medium">{Math.min(indexOfLastItem, filteredUsers.length)}</span> de{' '}
                            <span className="font-medium">{filteredUsers.length}</span> resultados
                        </p>
                    </div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Anterior</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {pageNumbers.slice(Math.max(0, currentPage - 4), Math.min(pageCount, currentPage + 3)).map((number) => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                    number === currentPage
                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(Math.min(pageCount, currentPage + 1))}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        >
                            <span className="sr-only">Siguiente</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
            {isFormOpen && (
                <UserForm
                    user={selectedUser}
                    onSave={selectedUser ? updateUser : addUser}
                    onCancel={() => {
                        setSelectedUser(null)
                        setIsFormOpen(false)
                    }}
                />
            )}
        </div>
    )
}

// Componente de formulario de usuario
function UserForm({ user, onSave, onCancel }: { user: User | null, onSave: (user: User | Omit<User, 'id'>) => void, onCancel: () => void }) {
    const [formData, setFormData] = useState(user || {
        fullName: '',
        documentId: '',
        email: '',
        phoneNumber: '',
        role: '',
        status: 'active' as const
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">{user ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="documentId" className="block text-gray-700 text-sm font-bold mb-2">Documento de Identificación</label>
                        <input
                            type="text"
                            id="documentId"
                            name="documentId"
                            value={formData.documentId}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Número de Teléfono</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Rol</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Seleccione un rol</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Residente">Residente</option>
                            <option value="Guardia">Guardia</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                            <option value="suspended">Suspendido</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                        >
                            {user ? 'Actualizar' : 'Agregar'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}