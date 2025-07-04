"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, FileText, Activity, Users, Bell, Settings, Heart, Clock, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const [appointments, setAppointments] = useState([])
  const [medicalRecords, setMedicalRecords] = useState([])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  CareMitra
                </span>
                <div className="text-xs text-gray-500 -mt-1">Healthcare Dashboard</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here's your health overview for today</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Upcoming Appointments", value: "3", icon: Calendar, color: "blue" },
            { title: "Medical Records", value: "12", icon: FileText, color: "green" },
            { title: "Health Score", value: "85%", icon: Activity, color: "purple" },
            { title: "Family Members", value: "4", icon: Users, color: "orange" },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Upcoming Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      doctor: "Dr. Sarah Johnson",
                      specialty: "Cardiologist",
                      date: "Today, 2:00 PM",
                      type: "Video Call",
                    },
                    {
                      doctor: "Dr. Michael Chen",
                      specialty: "Neurologist",
                      date: "Tomorrow, 10:30 AM",
                      type: "In-Person",
                    },
                    {
                      doctor: "Dr. Emily Davis",
                      specialty: "General Physician",
                      date: "Dec 15, 3:00 PM",
                      type: "Video Call",
                    },
                  ].map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{appointment.date}</span>
                          </div>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Medical Records */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span>Recent Medical Records</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Blood Test Results",
                      date: "Dec 10, 2024",
                      doctor: "Dr. Sarah Johnson",
                      type: "Lab Result",
                    },
                    {
                      title: "Prescription - Metformin",
                      date: "Dec 8, 2024",
                      doctor: "Dr. Michael Chen",
                      type: "Prescription",
                    },
                    {
                      title: "Annual Checkup Report",
                      date: "Dec 5, 2024",
                      doctor: "Dr. Emily Davis",
                      type: "Checkup",
                    },
                  ].map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{record.title}</h4>
                        <p className="text-sm text-gray-600">by {record.doctor}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600">{record.date}</span>
                          <Badge variant="outline">{record.type}</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: "Book Appointment", icon: Calendar, color: "blue" },
                  { title: "Add Record", icon: FileText, color: "green" },
                  { title: "Emergency Call", icon: Phone, color: "red" },
                  { title: "Find Doctor", icon: MapPin, color: "purple" },
                ].map((action, index) => (
                  <Button
                    key={action.title}
                    variant="outline"
                    className="h-20 flex-col space-y-2 hover:bg-gray-50 bg-transparent"
                  >
                    <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                    <span className="text-sm">{action.title}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
