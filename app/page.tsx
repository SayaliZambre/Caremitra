"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import {
  Heart,
  Users,
  Calendar,
  FileText,
  Shield,
  Phone,
  Star,
  ArrowRight,
  Menu,
  X,
  Activity,
  CheckCircle,
  Stethoscope,
  Pill,
  Brain,
  Zap,
  Award,
  MessageCircle,
  Video,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setIsVisible(true)}
      className="text-3xl font-bold text-blue-600"
    >
      {count.toLocaleString()}
      {suffix}
    </motion.div>
  )
}

// Floating Animation Component
function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// Medical Particle Background
function MedicalParticleBackground() {
  const particles = Array.from({ length: 30 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute opacity-20"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          {particle % 4 === 0 && <Heart className="w-4 h-4 text-red-300" />}
          {particle % 4 === 1 && <Stethoscope className="w-4 h-4 text-blue-300" />}
          {particle % 4 === 2 && <Pill className="w-4 h-4 text-green-300" />}
          {particle % 4 === 3 && <Activity className="w-4 h-4 text-purple-300" />}
        </motion.div>
      ))}
    </div>
  )
}

export default function CareMintraHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const { scrollYProgress } = useScroll()
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -300])
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
      },
    },
  }

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Cancer Survivor",
      content:
        "CareMitra helped me track my treatment journey and connected me with other survivors. The support was invaluable.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Diabetes Patient",
      content:
        "The personalized diet plans and medication reminders have completely transformed how I manage my diabetes.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Heart Patient",
      content: "Emergency SOS feature saved my life. The instant connection to medical help gave me peace of mind.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Medical Background */}
      <MedicalParticleBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 z-50 origin-left"
        style={{ scaleX: pathLength }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-40 border-b border-blue-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                }}
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg"
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  CareMitra
                </span>
                <div className="text-xs text-gray-500 -mt-1">Healthcare Reimagined</div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { name: "Home", href: "#home" },
                { name: "Services", href: "#services" },
                { name: "Doctors", href: "#doctors" },
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    color: "#2563eb",
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group"
                >
                  {item.name}
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>

            <div className="hidden md:flex space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
                  Patient Login
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg">
                  Get Started
                </Button>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <motion.div style={{ y: yRange }} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div variants={itemVariants} className="mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5,
                  }}
                >
                  <Badge className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 hover:from-blue-200 hover:to-green-200 mb-6 px-4 py-2">
                    🏥 India's Most Trusted Healthcare Platform
                  </Badge>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                >
                  Empowering{" "}
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent bg-300%"
                  >
                    Chronic Care
                  </motion.span>
                  <br />
                  Patients Across India
                </motion.h1>

                <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Comprehensive healthcare management for patients with chronic conditions. Track treatments, access
                  government schemes, connect with survivors, and get emergency support - all in one platform.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(37, 99, 235, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4 rounded-full shadow-xl relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      Start Your Health Journey
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </motion.div>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-red-200 text-red-600 hover:bg-red-50 text-lg px-8 py-4 rounded-full bg-transparent relative overflow-hidden group shadow-lg"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Phone className="mr-2 w-5 h-5" />
                      </motion.div>
                      Emergency SOS
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8">
                  {[
                    { number: 100000, label: "Patients Helped", suffix: "+" },
                    { number: 500, label: "Partner Hospitals", suffix: "+" },
                    { number: 24, label: "Hour Support", suffix: "/7" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <FloatingElement>
                <motion.div
                  whileHover={{ rotateY: 10, rotateX: 5 }}
                  className="bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-white opacity-10"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 50%, white 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 50%, white 0%, transparent 50%)",
                      ],
                    }}
                    transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                  />

                  <div className="grid grid-cols-2 gap-6 relative z-10">
                    {[
                      {
                        icon: Activity,
                        title: "Health Tracking",
                        desc: "AI-powered vitals monitoring",
                        color: "from-red-400 to-pink-400",
                      },
                      {
                        icon: Users,
                        title: "Community Support",
                        desc: "Connect with survivors",
                        color: "from-blue-400 to-cyan-400",
                      },
                      {
                        icon: Shield,
                        title: "Government Schemes",
                        desc: "Access financial support",
                        color: "from-green-400 to-emerald-400",
                      },
                      {
                        icon: Zap,
                        title: "Emergency Care",
                        desc: "Instant medical assistance",
                        color: "from-yellow-400 to-orange-400",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + index * 0.2 }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                      >
                        <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                          <CardContent className="p-4">
                            <motion.div
                              className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-3`}
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                            >
                              <feature.icon className="w-6 h-6 text-white" />
                            </motion.div>
                            <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                            <p className="text-blue-100 text-xs">{feature.desc}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </FloatingElement>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                CareMitra?
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed specifically for Indian patients with chronic conditions
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Insights",
                description: "Smart health recommendations based on your condition and progress",
                color: "purple",
              },
              {
                icon: Smartphone,
                title: "Mobile-First Design",
                description: "Optimized for smartphones with offline capabilities",
                color: "blue",
              },
              {
                icon: MessageCircle,
                title: "Multi-Language Support",
                description: "Available in Hindi, English, and 10+ regional languages",
                color: "green",
              },
              {
                icon: Award,
                title: "Certified Platform",
                description: "HIPAA compliant and approved by Indian medical authorities",
                color: "orange",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-100 to-${feature.color}-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg`}
                    >
                      <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Comprehensive{" "}
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent bg-300%"
              >
                Healthcare Services
              </motion.span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage chronic conditions effectively
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Treatment Tracking",
                description: "Smart reminders for chemotherapy, dialysis, insulin, and medications",
                features: ["Personalized schedules", "Progress monitoring", "Side effect tracking"],
                color: "blue",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: FileText,
                title: "Government Schemes",
                description: "Discover and apply for financial support programs",
                features: ["Scheme finder", "Application assistance", "Status tracking"],
                color: "green",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Users,
                title: "Survivor Community",
                description: "Connect with others who share your journey",
                features: ["Success stories", "Peer support", "Expert guidance"],
                color: "purple",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Activity,
                title: "Health Monitoring",
                description: "Track vitals and symptoms with AI insights",
                features: ["Daily logging", "Trend analysis", "Doctor reports"],
                color: "red",
                gradient: "from-red-500 to-orange-500",
              },
              {
                icon: Pill,
                title: "Nutrition Planning",
                description: "Disease-specific diet plans and meal tracking",
                features: ["Custom meal plans", "Nutritionist support", "Recipe suggestions"],
                color: "yellow",
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                icon: Phone,
                title: "Emergency Support",
                description: "24/7 emergency assistance with location sharing",
                features: ["SOS button", "Medical history sharing", "Family alerts"],
                color: "red",
                gradient: "from-red-600 to-pink-600",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 50,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5`}
                    transition={{ duration: 0.3 }}
                  />

                  <CardHeader className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: idx * 0.3 }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </motion.div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Patient{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Success Stories
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from patients who transformed their health journey with CareMitra
            </motion.p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 mb-6 italic">
                "{testimonials[activeTestimonial].content}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-green-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">{testimonials[activeTestimonial].name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonials[activeTestimonial].name}</div>
                  <div className="text-sm text-gray-600">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === activeTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(45deg, #2563eb, #7c3aed, #16a34a)",
              "linear-gradient(45deg, #16a34a, #2563eb, #7c3aed)",
              "linear-gradient(45deg, #7c3aed, #16a34a, #2563eb)",
              "linear-gradient(45deg, #2563eb, #7c3aed, #16a34a)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 40px rgba(255,255,255,0.8)",
                  "0 0 20px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Ready to Transform Your Health Journey?
            </motion.h2>

            <motion.p
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join over 100,000 patients who trust CareMitra for their chronic care management
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(255,255,255,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-4 rounded-full font-semibold relative overflow-hidden group shadow-2xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  Start Free Trial
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-10 py-4 rounded-full font-semibold bg-transparent relative overflow-hidden group shadow-2xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100"
                    initial={{ y: "100%" }}
                    whileHover={{ y: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Video className="mr-2 w-5 h-5" />
                    Watch Demo
                  </span>
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="mt-8 text-blue-100 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              ✓ No credit card required • ✓ 30-day free trial • ✓ Cancel anytime
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-white py-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <span className="text-xl font-bold">CareMitra</span>
                  <div className="text-xs text-gray-400">Healthcare Reimagined</div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering chronic care patients across India with comprehensive healthcare management solutions.
              </p>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                  <motion.div
                    key={social}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors duration-300"
                  >
                    <div className="w-4 h-4 bg-gray-400 rounded-full" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Services",
                items: ["Treatment Tracking", "Government Schemes", "Community Support", "Emergency Care"],
              },
              {
                title: "Support",
                items: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
              },
              {
                title: "Contact",
                items: [
                  "📞 1800-CARE-MITRA",
                  "✉️ support@caremitra.in",
                  "📍 Mumbai, Maharashtra",
                  "🇮🇳 Serving All India",
                ],
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.items.map((item, idx) => (
                    <motion.li
                      key={idx}
                      whileHover={{ x: 5, color: "#60a5fa" }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="cursor-pointer"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>&copy; 2024 CareMitra Healthcare Solutions Pvt. Ltd. All rights reserved.</p>
            <p className="text-sm mt-2">Registered with Ministry of Health & Family Welfare, Government of India</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
