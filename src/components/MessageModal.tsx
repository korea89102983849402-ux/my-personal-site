import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Image as ImageIcon, Send, Trash2 } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to a backend
    console.log('Message:', message);
    console.log('Image:', image);
    
    // Reset and close
    setMessage('');
    setImage(null);
    onClose();
    alert('留言已发送！（假装的）');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50, rotate: 5 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50, rotate: -5 }}
            className="relative bg-white w-full max-w-lg rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header decoration */}
            <div className="bg-brand-pink h-16 border-b-4 border-black relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 grid-paper opacity-20"></div>
              <div className="absolute top-2 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 border border-black"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-xl font-black text-black flex items-center gap-2">
                  <MessageCircle size={24} /> 给我留言
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 uppercase">Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="写点什么吧..."
                    className="w-full h-32 p-4 bg-gray-50 border-2 border-black rounded-xl resize-none focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow font-medium"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 uppercase">Attach Image</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  {!image ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 border-2 border-dashed border-black rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ImageIcon size={24} />
                      </div>
                      <span className="text-sm font-bold text-gray-500">点击上传图片</span>
                    </div>
                  ) : (
                    <div className="relative w-full h-48 border-2 border-black rounded-xl overflow-hidden group">
                      <img src={image} alt="Upload preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => setImage(null)}
                          className="p-2 bg-red-500 text-white border-2 border-black rounded-full hover:scale-110 transition-transform"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-yellow border-2 border-black rounded-xl py-3 font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} /> 发送留言
                </button>
              </form>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white border-2 border-black rounded-full hover:bg-red-100 transition-colors z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none"
            >
              <X size={20} className="text-black" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
