import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const phoneNumber = "+923408566694"; // Apna number dalo with country code (Pakistan = 92)
  const message = "Hi! I'm interested in your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3), 0 0 15px rgba(37,211,102,0.4)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M12.031 2.016c-5.531 0-9.984 4.453-9.984 9.984 0 1.781 0.469 3.469 1.313 4.969l-1.313 5.016 5.156-1.266c1.5 0.844 3.141 1.266 4.828 1.266 5.531 0 9.984-4.453 9.984-9.984s-4.453-9.984-9.984-9.984zM12.031 18.984c-1.5 0-2.953-0.375-4.219-1.078l-0.281-0.141-3.094 0.75 0.844-2.953-0.141-0.281c-0.797-1.313-1.219-2.813-1.219-4.359 0-4.641 3.797-8.438 8.438-8.438s8.438 3.797 8.438 8.438-3.797 8.438-8.438 8.438zM16.641 13.969c-0.234-0.141-1.359-0.656-1.547-0.75-0.234-0.094-0.375-0.094-0.563 0.094-0.188 0.188-0.703 0.891-0.844 1.031-0.141 0.141-0.281 0.188-0.516 0.047-0.234-0.141-1.031-0.375-1.969-1.219-0.703-0.656-1.219-1.453-1.359-1.688-0.141-0.234 0-0.375 0.094-0.516 0.094-0.141 0.234-0.328 0.328-0.469 0.094-0.141 0.141-0.281 0.234-0.469 0.094-0.188 0.047-0.328-0.047-0.469-0.094-0.141-0.844-2.016-1.125-2.766-0.281-0.703-0.563-0.609-0.797-0.609-0.188 0-0.422 0-0.609 0-0.234 0-0.609 0.094-0.938 0.469-0.328 0.375-1.266 1.219-1.266 2.953 0 1.734 1.266 3.422 1.453 3.656 0.188 0.234 2.484 3.844 6.094 5.344 3.609 1.5 3.609 1.031 4.266 0.938 0.656-0.094 2.016-0.844 2.297-1.641 0.281-0.797 0.281-1.453 0.188-1.594-0.094-0.141-0.328-0.234-0.563-0.375z"/>
      </svg>
    </motion.a>
  );
};

export default WhatsAppButton;