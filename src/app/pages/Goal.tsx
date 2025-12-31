import {motion} from "motion/react";
import {Lightbulb, Briefcase, Target, Heart, Check} from "lucide-react";

interface Screen4Props {
    selectedGoal: string;
    onSelect: (goal: string) => void;
    onNext: () => void;
    onBack: () => void;
}

const goals = [
    {
        id: "learn",
        label: "Learn a new skill from scratch",
        description: "Start your journey in something completely new",
        icon: Lightbulb,
    },
    {
        id: "portfolio",
        label: "Build something for my Portfolio",
        description: "Create impressive work to showcase your abilities",
        icon: Briefcase,
    },
    {
        id: "solve",
        label: "Solve a specific problem I have",
        description: "Address a real challenge or need in your life",
        icon: Target,
    },
    {
        id: "fun",
        label: "Just for fun / De-stress",
        description: "Enjoy the process without pressure or expectations",
        icon: Heart,
    },
];

export function Goal({selectedGoal, onSelect, onNext, onBack}: Screen4Props) {
    return (
        <>
            <title >NextProject | Goal</title >
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.4}}
                className="max-w-3xl mx-auto px-6 py-16"
            >
                <motion.h1
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.1}}
                    className="text-center mb-3"
                >
                    What's the goal of this project?
                </motion.h1 >

                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2}}
                    className="text-center text-muted-foreground mb-12"
                >
                    Understanding your motivation helps us find the perfect
                    match
                </motion.p >

                <div className="space-y-4 mb-12">
                    {goals.map((goal, index) => {
                        const Icon = goal.icon;
                        const isSelected = selectedGoal === goal.id;

                        return (
                            <motion.button
                                key={goal.id}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: 0.1 * index}}
                                onClick={() => onSelect(goal.id)}
                                className={`w-full relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                                    isSelected
                                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                                        : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                            isSelected ? "bg-primary" : "bg-muted"
                                        }`}
                                    >
                                        <Icon className={`w-7 h-7 ${isSelected ? "text-white" : "text-foreground"}`}/>
                                    </div >

                                    <div className="flex-1">
                                        <h3 className="mb-1">{goal.label}</h3 >
                                        <p className="text-muted-foreground">{goal.description}</p >
                                    </div >

                                    {isSelected && (
                                        <motion.div
                                            initial={{scale: 0}}
                                            animate={{scale: 1}}
                                            className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0"
                                        >
                                            <Check
                                                className="w-4 h-4 text-white"
                                                strokeWidth={3}
                                            />
                                        </motion.div >
                                    )}
                                </div >
                            </motion.button >
                        );
                    })}
                </div >

                <div className="flex justify-between items-center">
                    <motion.button
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        onClick={onBack}
                        className="px-8 py-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Back
                    </motion.button >

                    <motion.button
                        initial={{opacity: 0}}
                        animate={{opacity: selectedGoal ? 1 : 0.3}}
                        onClick={onNext}
                        disabled={!selectedGoal}
                        className="px-12 py-4 bg-primary text-white rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:cursor-not-allowed"
                    >
                        See My Projects
                    </motion.button >
                </div >
            </motion.div >
        </>
    );
}