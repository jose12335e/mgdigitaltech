import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, MessageSquareQuote } from 'lucide-react';
import { Button } from './ui/Button';
import { supabase } from '../lib/supabase';

export function TestimonialModal({ isOpen, onClose }) {
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.target);
    const formName = formData.get('name');
    const formRole = formData.get('role');
    const formText = formData.get('text');
    
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([
          { 
            name: formName, 
            role: formRole, 
            text: formText,
            is_approved: false 
          }
        ]);
        
      if (error) throw error;
      
      setFormStatus('success');
      e.target.reset();

      setTimeout(() => {
        setFormStatus('idle');
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Supabase Insert Error:', error);
      setFormStatus('idle');
      alert('Hubo un error guardando tu testimonio. Por favor intenta de nuevo.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{zIndex: 9999}}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
          className="relative w-full max-w-lg bg-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-border"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-foreground/50 hover:text-foreground hover:bg-surface-hover rounded-full transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="p-6 sm:p-8 pb-0 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary-500/10 text-primary-500 rounded-full flex items-center justify-center mb-4">
              <MessageSquareQuote size={24} />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Dejar un Testimonio</h3>
            <p className="text-foreground/70 text-sm">
              Tu opinión es súper valiosa para mí. Cuéntame brevemente cómo fue tu experiencia trabajando juntos.
            </p>
          </div>

          {/* Form Body */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Tu Nombre <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  required 
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-foreground"
                  placeholder="Ej. María Gómez"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="role" className="text-sm font-medium text-foreground">Cargo y Empresa <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="role" 
                  name="role"
                  required 
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-foreground"
                  placeholder="Ej. Directora de Marketing en XYZ"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="text" className="text-sm font-medium text-foreground">Tu Testimonio <span className="text-red-500">*</span></label>
                <textarea 
                  id="text" 
                  name="text"
                  rows="4" 
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-foreground resize-y"
                  placeholder="La plataforma superó mis expectativas..."
                ></textarea>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full disabled:opacity-50"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                >
                  {formStatus === 'idle' && <span className="flex items-center gap-2"><Send size={18} /> Enviar Testimonio</span>}
                  {formStatus === 'submitting' && 'Enviando...'}
                  {formStatus === 'success' && <span className="flex items-center gap-2"><CheckCircle2 size={18} /> ¡Gracias por tu reseña!</span>}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
