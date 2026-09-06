import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download } from 'lucide-react';

interface SnowGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POSTER_PATH = encodeURI('/展板.jpg');
const PDF_PATH = encodeURI('/雪山萌卫队IP策划案.pdf.pdf');

export const SnowGuardModal: React.FC<SnowGuardModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-4xl bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-2 bg-white border-2 border-black rounded-full hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
            >
              <X size={20} />
            </button>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6 bg-[#FDFBF7]">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-black leading-tight">
                  雪山萌卫队 IP 策划案
                </h1>
                <p className="text-sm md:text-base font-medium text-gray-600">
                  展板预览 + PDF 下载
                </p>
              </div>

              <div className="border-4 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                <img
                  src={POSTER_PATH}
                  alt="雪山萌卫队展板"
                  className="w-full h-auto block"
                />
              </div>

              <a
                href={PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="neo-button w-full flex items-center justify-center gap-2"
              >
                <Download size={18} /> 下载策划案 PDF
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
