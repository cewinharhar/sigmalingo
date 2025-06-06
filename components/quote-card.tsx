import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface QuoteCardProps {
  quote: {
    text: string;
    author: string;
  };
}

export const QuoteCard = ({ quote }: QuoteCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <Card className="relative p-8 md:p-12 bg-white/90 backdrop-blur-sm border-2">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="relative w-8 h-8">
            <Image
              src="/mascot_sigma.png"
              alt="Mascot"
              width={32}
              height={32}
            />
          </div>
        </div>
        <blockquote className="space-y-6">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl md:text-3xl font-serif text-neutral-800 italic text-center leading-relaxed"
          >
            "{quote.text}"
          </motion.p>
          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-right text-neutral-600 font-medium"
          >
            — {quote.author}
          </motion.footer>
        </blockquote>
      </Card>
    </motion.div>
  );
};
