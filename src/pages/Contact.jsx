import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Briefcase, Code } from "lucide-react";
import Footer from "../components/Footer";
import useDisableInspect from "../hooks/useDisableInspect";

const contactDetails = [
  { icon: MapPin, title: "Location", detail: "Satna, Madhya Pradesh", link: null },
  { icon: Phone, title: "Phone", detail: "+91 8109260602", link: "tel:+918109260602" },
  { icon: Mail, title: "Email", detail: "pranawgautam@gmail.com", link: "mailto:pranawgautam@gmail.com" },
];

export default function Contact() {
  useDisableInspect();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ submitting: false, type: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, type: null });
    try {
      // Replace with your Formspree/EmailJS ID
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData),
      });
      setStatus({ submitting: false, type: res.ok ? "success" : "error" });
      if (res.ok) setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus({ submitting: false, type: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors py-16">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Contact Me</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Open for opportunities in Data Science & Backend Development.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Get in Touch</h2>
              <div className="space-y-6">
                {contactDetails.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                      {item.link ? (
                        <a href={item.link} className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">{item.detail}</a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">{item.detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700 flex gap-4">
                <a href="https://www.linkedin.com/in/pranaw-gautam9" target="_blank" rel="noreferrer" className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-gray-600 dark:text-gray-300"><Briefcase className="w-6 h-6" /></a>
                <a href="https://github.com/Pranaw108" target="_blank" rel="noreferrer" className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-900 hover:text-white transition-all text-gray-600 dark:text-gray-300"><Code className="w-6 h-6" /></a>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
            
            {status.type === 'success' && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex gap-3 border border-green-200"><CheckCircle className="w-5 h-5"/> Message sent successfully!</div>}
            {status.type === 'error' && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex gap-3 border border-red-200"><AlertCircle className="w-5 h-5"/> Failed to send. Please try emailing directly.</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" placeholder="How can I help you?" />
              </div>
              <button type="submit" disabled={status.submitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 disabled:opacity-70">
                {status.submitting ? "Sending..." : <><Send className="w-5 h-5"/> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}