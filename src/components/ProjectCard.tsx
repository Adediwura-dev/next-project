import { motion } from "motion/react";
import {Zap, Clock, TrendingUp, Sparkles, BookOpen} from "lucide-react";

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        matchReason: string;
        difficulty: string;
        environment: string;
        energy: string;
        timeCommitment: string;
    };
    index: number;
    onSelect: (project: any) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
    const difficultyColors = {
        Beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        Intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        Advanced: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    };

    const difficultyClass = difficultyColors[project.difficulty as keyof typeof difficultyColors] || difficultyColors.Beginner;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-border flex flex-col h-full"
        >

            <div className="p-6 flex flex-col h-full">
                <div className="mb-4">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-xs font-medium text-primary border border-primary/20 rounded-full"
                    >
                        <Sparkles className="w-3 h-3" />
                        <span>{project.matchReason}</span>
                    </motion.div>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-foreground leading-tight">{project.title}</h3>

                <div className="flex flex-wrap gap-2 mb-6">
                    <div className={`px-3 py-1 rounded-full text-xs border flex items-center ${difficultyClass}`}>
                        <TrendingUp className="inline w-3 h-3 mr-1" />
                        {project.difficulty}
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs bg-accent/20 text-accent border border-accent/30 flex items-center">
                        <Zap className="inline w-3 h-3 mr-1" />
                        {project.energy}
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs bg-secondary/20 text-secondary border border-secondary/30 flex items-center">
                        <Clock className="inline w-3 h-3 mr-1" />
                        {project.timeCommitment}
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={() => onSelect(project)}
                        className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 font-medium group"
                    >
                        Start Guide
                        <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}