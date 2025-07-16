// Manager.js
import React, { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import { Eye, EyeOff } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addEntry, deleteEntry, enableEntry, loadData } from '../../redux/slice/passwordSlice'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {
  const [masterPassword, setMasterPassword] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [formData, setFormData] = useState({ website: '', username: '', password: '' })
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [showPasswordsInTable, setShowPasswordsInTable] = useState(false)

  const dispatch = useDispatch()
  const activeData = useSelector(state => state.passwords.activeData)
  const disabledData = useSelector(state => state.passwords.disabledData)

  const encryptPassword = (password, key) => {
    return CryptoJS.AES.encrypt(password, key).toString()
  }

  const decryptPassword = (ciphertext, key) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, key)
      return bytes.toString(CryptoJS.enc.Utf8)
    } catch {
      return ''
    }
  }

  const handleUnlock = () => {
    if (!masterPassword) {
      alert('Please enter your master password')
      return
    }

    const stored = localStorage.getItem('unlokpass-data')
    if (stored) {
      const parsed = JSON.parse(stored)
      dispatch(loadData(parsed))
    }

    setIsUnlocked(true)
  }

  useEffect(() => {
    if (isUnlocked) {
      localStorage.setItem('unlokpass-data', JSON.stringify({
        active: activeData,
        disabled: disabledData
      }))
    }
  }, [activeData, disabledData, isUnlocked])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const duplicate = activeData.find(entry =>
      entry.website === formData.website.trim() &&
      entry.username === formData.username.trim()
    )
    if (duplicate) {
      alert('Entry already exists!')
      return
    }

    const newEntry = {
      id: uuidv4(),
      website: formData.website.trim(),
      username: formData.username.trim(),
      password: encryptPassword(formData.password, masterPassword),
    }

    dispatch(addEntry(newEntry))
    setFormData({ website: '', username: '', password: '' })
  }

  const handleDelete = (id) => {
    dispatch(deleteEntry(id))
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4 text-amber-600 text-center">Enter Master Password</h2>
          <input
            type="password"
            value={masterPassword}
            onChange={e => setMasterPassword(e.target.value)}
            placeholder="Master Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            onClick={handleUnlock}
            className="w-full bg-amber-500 text-white font-semibold py-3 rounded-lg hover:bg-amber-600 transition"
          >
            Unlock Vault
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-white flex flex-col px-4 py-10">
      {/* Add Entry Form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-600">UnlokPass</h1>
            <p className="text-xl sm:text-2xl text-gray-600 mt-2 font-medium">Secure your secrets effortlessly</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Website Field */}
            <div>
              <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-1">
                Website / Service
              </label>
              <input
                id="website"
                type="text"
                value={formData.website}
                onChange={handleChange}
                placeholder="e.g. github.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>

            {/* Username and Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
                  Username / Email
                </label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPasswordInput ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordInput(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-500"
                    tabIndex={-1}
                  >
                    {showPasswordInput ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
              >
                Add Password
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Quick Access Vault - Top 5 */}
      <div className="mt-12 max-w-5xl mx-auto">
        <div className="flex justify-between items-center px-4 pt-4">
          <h2 className="text-xl font-bold text-gray-800">🔐 Quick Access Vault</h2>
          <button
            onClick={() => setShowPasswordsInTable(prev => !prev)}
            className="flex items-center text-amber-600 hover:text-amber-800 text-sm font-medium"
          >
            {showPasswordsInTable ? <EyeOff size={18} className="mr-1" /> : <Eye size={18} className="mr-1" />}
            {showPasswordsInTable ? 'Hide Passwords' : 'Show Passwords'}
          </button>
        </div>

        <div className="overflow-auto mt-4 bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Website</th>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Password</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activeData.slice(0, 5).map(entry => (
                <tr key={entry.id}>
                  <td className="px-6 py-4">{entry.website}</td>
                  <td className="px-6 py-4">{entry.username}</td>
                  <td className="px-6 py-4">
                    {showPasswordsInTable ? decryptPassword(entry.password, masterPassword) : '********'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {activeData.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center px-6 py-4 text-gray-500">No active entries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Manager
