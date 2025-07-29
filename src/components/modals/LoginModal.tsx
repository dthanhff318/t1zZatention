import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LoginBlock from "@/components/login-block/LoginBlock";

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
	const backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	};

	const modalVariants = {
		hidden: { opacity: 0, scale: 0.9, y: 20 },
		visible: { opacity: 1, scale: 1, y: 0 },
		exit: { opacity: 0, scale: 0.9, y: 20 },
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						className="fixed inset-0 bg-black/50 z-[10000]"
						variants={backdropVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={onClose}
					/>

					{/* Modal */}
					<motion.div
						className="fixed inset-0 flex items-center justify-center z-[10001] pointer-events-none"
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<motion.div
							className="bg-primary border border-border-primary rounded-lg shadow-xl max-w-md w-full mx-4 pointer-events-auto"
							variants={modalVariants}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="flex items-center justify-between p-6 border-b border-border-primary">
								<h2 className="text-xl font-semibold text-text-primary">
									Sign In
								</h2>
								<motion.button
									onClick={onClose}
									className="p-2 rounded-lg hover:bg-border-secondary/50 transition-colors"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<X size={20} className="text-text-secondary" />
								</motion.button>
							</div>

							{/* Content */}
							<div className="p-6">
								<p className="text-text-secondary text-sm mb-6 text-center">
									Choose your preferred sign-in method
								</p>
								<LoginBlock />
							</div>
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default LoginModal;