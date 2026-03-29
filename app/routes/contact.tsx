// app/routes/contact.tsx
import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Users,
  Home,
} from 'lucide-react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const officeLocations = [
    {
      name: 'Head Office',
      address: 'Plot 1234, Aminu Kano Crescent, Wuse 2, Abuja FCT',
      phone: '+234 801 234 5678',
      email: 'info@zertekrealty.ng',
      hours: 'Monday - Friday: 8:00 AM - 6:00 PM',
      saturday: 'Saturday: 10:00 AM - 2:00 PM',
      sunday: 'Sunday: Closed',
    },
    {
      name: 'Maitama Branch',
      address: 'Suite 45, Maitama Mall, Gana Street, Maitama, Abuja',
      phone: '+234 802 345 6789',
      email: 'maitama@zertekrealty.ng',
      hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
      saturday: 'Saturday: 10:00 AM - 1:00 PM',
      sunday: 'Sunday: Closed',
    },
    {
      name: 'Gwarinpa Branch',
      address: 'Shop 12, Gwarinpa Shopping Complex, 1st Avenue, Abuja',
      phone: '+234 803 456 7890',
      email: 'gwarinpa@zertekrealty.ng',
      hours: 'Monday - Friday: 9:00 AM - 5:00 PM',
      saturday: 'Saturday: 10:00 AM - 1:00 PM',
      sunday: 'Sunday: Closed',
    },
  ];

  const faqs = [
    {
      question: 'How do I schedule a property viewing?',
      answer:
        'You can schedule a viewing by calling our office, sending an email, or using the contact form. Our agents will get back to you within 24 hours to confirm the appointment.',
    },
    {
      question: 'What documents do I need to buy a property?',
      answer:
        "You'll need a valid ID, proof of funds, and a completed offer form. For Nigerian properties, you'll also need a Tax Identification Number (TIN). Our agents will guide you through the entire process.",
    },
    {
      question: 'Do you offer property management services?',
      answer:
        'Yes! We offer comprehensive property management services including tenant screening, rent collection, maintenance, and property inspections. Contact us for a free consultation.',
    },
    {
      question: 'How long does it take to sell a property?',
      answer:
        'The timeline varies depending on location, price, and market conditions. On average, properties in prime Abuja locations sell within 3-6 months. We use strategic marketing to ensure the best price and fastest sale.',
    },
    {
      question: 'Are you licensed real estate agents?',
      answer:
        'Yes, all our agents are fully licensed by the Real Estate Developers Association of Nigeria (REDAN) and the Federal Estate and Business Brokers Board (FETBB).',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get In Touch With Us
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Have questions about buying, selling, or renting property in Abuja?
            Our team of experts is here to help you every step of the way.
          </p>
        </div>
      </div>

      {/* Quick Contact Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={24} className="text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">24/7 Phone Support</h3>
            <p className="text-gray-600 mb-2">+234 801 234 5678</p>
            <p className="text-sm text-gray-500">Emergency inquiries only</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={24} className="text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-2">info@zertekrealty.ng</p>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWhatsapp size={24} className="text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">WhatsApp Chat</h3>
            <p className="text-gray-600 mb-2">+234 809 012 3456</p>
            <p className="text-sm text-gray-500">
              Quick response during business hours
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and we'll get back to you shortly.
            </p>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <CheckCircle2
                  size={48}
                  className="text-green-600 mx-auto mb-3"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="+234 801 234 5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="Buying">
                        I'm interested in buying a property
                      </option>
                      <option value="Selling">
                        I want to sell my property
                      </option>
                      <option value="Renting">I'm looking to rent</option>
                      <option value="Valuation">
                        Property valuation request
                      </option>
                      <option value="General">General inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your property needs or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Office Locations */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Offices
              </h2>
              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 last:border-0 pb-5 last:pb-0"
                  >
                    <h3 className="font-bold text-gray-900 mb-2">
                      {office.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2 text-gray-600">
                        <MapPin
                          size={16}
                          className="text-green-600 mt-0.5 shrink-0"
                        />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={14} className="text-green-600" />
                        <a
                          href={`tel:${office.phone}`}
                          className="hover:text-green-600"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={14} className="text-green-600" />
                        <a
                          href={`mailto:${office.email}`}
                          className="hover:text-green-600"
                        >
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-2 text-gray-600">
                        <Clock size={14} className="text-green-600 mt-0.5" />
                        <div>
                          <p>{office.hours}</p>
                          <p>{office.saturday}</p>
                          <p>{office.sunday}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Connect With Us
              </h2>
              <p className="text-gray-600 mb-4">
                Follow us on social media for the latest property listings and
                updates.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label="Facebook"
                >
                  <FaFacebook
                    size={18}
                    className="text-gray-600 group-hover:text-white"
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label="Twitter"
                >
                  <FaTwitter
                    size={18}
                    className="text-gray-600 group-hover:text-white"
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label="Instagram"
                >
                  <FaInstagram
                    size={18}
                    className="text-gray-600 group-hover:text-white"
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-100 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin
                    size={18}
                    className="text-gray-600 group-hover:text-white"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about buying, selling, and
              renting properties in Abuja.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Find Us Here</h2>
              <p className="text-gray-600 mt-1">
                Visit our head office in Wuse 2, Abuja
              </p>
            </div>
            <div className="h-96 bg-gray-200 relative">
              <iframe
                title="Zertek Realty Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.827391449543!2d7.487755!3d9.081999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0c2f3e9e5b7f%3A0x2f8b5e9c7a6d4e3!2sWuse%202%2C%20Abuja%2C%20Nigeria!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Business Hours & Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Building2 size={20} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">500+</p>
            <p className="text-sm text-gray-600">Properties Listed</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users size={20} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">20+</p>
            <p className="text-sm text-gray-600">Expert Agents</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Home size={20} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">98%</p>
            <p className="text-sm text-gray-600">Client Satisfaction</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock size={20} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">24h</p>
            <p className="text-sm text-gray-600">Response Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
