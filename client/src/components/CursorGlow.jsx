import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CursorGlow() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: position.x - 5,
          y: position.y - 5,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 35,
          mass: 0.1,
        }}
      />

      <motion.div
        className="cursor-ring"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
          mass: 0.3,
        }}
      />

      <motion.div
        className="mouse-glow"
        animate={{
          x: position.x - 200,
          y: position.y - 200,
        }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 25,
        }}
      />
    </>
  );
}

export default CursorGlow;