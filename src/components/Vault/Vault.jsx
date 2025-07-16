// Vault.js
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enableEntry } from '../../redux/slice/passwordSlice'
import CryptoJS from 'crypto-js'
import { Eye, EyeOff } from 'lucide-react'

const Vault = ({ masterPassword }) => {
  const dispatch = useDispatch()
  const { activeData, disabledData } = useSelector(state => state.passwords)

  const [showPasswords, setShowPasswords] = useState(false)

  const decryptPassword = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, masterPassword)
      return bytes.toString(CryptoJS.enc.Utf8)
    } catch {
      return ''
    }
  }

  const handleEnable = (id) => {
    dispatch(enableEntry(id))
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🔐 Full Vault</h1>
        <button
          onClick={() => setShowPasswords(prev => !prev)}
          className="flex items-center text-amber-600 hover:text-amber-800 text-sm font-medium"
        >
          {showPasswords ? <EyeOff size={18} className="mr-1" /> : <Eye size={18} className="mr-1" />}
          {showPasswords ? 'Hide Passwords' : 'Show Passwords'}
        </button>
      </div>

      {/* Active Entries */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">🟢 Active Passwords</h2>
        <div className="overflow-auto bg-white shadow border rounded-lg">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Website</th>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Password</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activeData.map(entry => (
                <tr key={entry.id}>
                  <td className="px-6 py-4">{entry.website}</td>
                  <td className="px-6 py-4">{entry.username}</td>
                  <td className="px-6 py-4">
                    {showPasswords ? decryptPassword(entry.password) : '********'}
                  </td>
                </tr>
              ))}
              {activeData.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">No active entries.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disabled Entries */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">🔴 Disabled Passwords</h2>
        <div className="overflow-auto bg-white shadow border rounded-lg">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">Website</th>
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Password</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {disabledData.map(entry => (
                <tr key={entry.id}>
                  <td className="px-6 py-4">{entry.website}</td>
                  <td className="px-6 py-4">{entry.username}</td>
                  <td className="px-6 py-4">
                    {showPasswords ? decryptPassword(entry.password) : '********'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEnable(entry.id)}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Enable
                    </button>
                  </td>
                </tr>
              ))}
              {disabledData.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">No disabled entries.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Vault
