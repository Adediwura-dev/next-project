"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Meteor = {
    left: number;
    top: number;
    delay: number;
    duration: number;
};

export const Meteors = ({
                            number = 20,
                            className,
                        }: {
    number?: number;
    className?: string;
}) => {
    const meteors = useMemo<Meteor[]>(() => {
        if (typeof window === "undefined") return [];

        const width = window.innerWidth;
        const height = window.innerHeight;

        return Array.from({ length: number }).map(() => {
            const duration = Math.random() * 5 + 5; // 5–10s

            return {
                left: Math.random() * width,
                top: Math.random() * height,
                duration,
                delay: -Math.random() * duration, // 🔥 negative delay
            };
        });
    }, [number]);

    return (
        <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {meteors.map((meteor, idx) => (
                <span
                    key={idx}
                    className={cn(
                        "pointer-events-none absolute h-0.5 w-0.5 rounded-full bg-slate-400",
                        "animate-meteor-effect",
                        "before:absolute before:top-1/2 before:h-[1px] before:w-[70px]",
                        "before:-translate-y-1/2 before:bg-gradient-to-r",
                        "before:from-slate-400 before:to-transparent",
                        className
                    )}
                    style={{
                        left: meteor.left,
                        top: meteor.top,
                        animationDuration: `${meteor.duration}s`,
                        animationDelay: `${meteor.delay}s`,
                    }}
                />
            ))}
        </motion.div>
    );
};
