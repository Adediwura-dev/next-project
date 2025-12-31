import {motion} from "motion/react";
import {Clock, Brain, Smile, Check} from "lucide-react";

interface Screen3Props {
    selectedTime: string;
    selectedEnergy: string;
    onSelectTime: (time: string) => void;
    onSelectEnergy: (energy: string) => void;
    onNext: () => void;
    onBack: () => void;
}

const timeOptions = [
    {id: "quick", label: "Quick Fix", duration: "1-2 Hours", icon: Clock},
    {id: "weekend", label: "Weekend Warrior", duration: "2 Days", icon: Clock},
    {id: "deep", label: "Deep Dive", duration: "1 Month+", icon: Clock},
];

export function TimeEnergy({
                               selectedTime,
                               selectedEnergy,
                               onSelectTime,
                               onSelectEnergy,
                               onNext,
                               onBack,
                           }: Screen3Props) {
    return (
        <>
            <title >NextProject | Time</title >


            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.4}}
                className="max-w-4xl mx-auto px-6 py-16"
            >
                <motion.h1
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.1}}
                    className="text-center mb-3"
                >
                    How much time can you commit?
                </motion.h1 >

                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2}}
                    className="text-center text-muted-foreground mb-12"
                >
                    We'll match you with projects that fit your schedule
                </motion.p >

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {timeOptions.map((option, index) => {
                        const Icon = option.icon;
                        const isSelected = selectedTime === option.id;

                        return (
                            <motion.button
                                key={option.id}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.1 * index}}
                                onClick={() => onSelectTime(option.id)}
                                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                                    isSelected
                                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                                        : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                                }`}
                            >
                                <div
                                    className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                                        isSelected ? "bg-primary" : "bg-muted"
                                    }`}
                                >
                                    <Icon className={`w-7 h-7 ${isSelected ? "text-white" : "text-foreground"}`}/>
                                </div >
                                <h3 className="mb-1">{option.label}</h3 >
                                <p className="text-muted-foreground">{option.duration}</p >

                                {isSelected && (
                                    <motion.div
                                        initial={{scale: 0}}
                                        animate={{scale: 1}}
                                        className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                                    >
                                        <Check
                                            className="w-4 h-4 text-white"
                                            strokeWidth={3}
                                        />
                                    </motion.div >
                                )}
                            </motion.button >
                        );
                    })}
                </div >

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3}}
                    className="max-w-2xl mx-auto"
                >
                    <p className="text-center text-foreground mb-6">
                        What level of brain power are you looking for?
                    </p >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.button
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.4}}
                            onClick={() => onSelectEnergy("relaxing")}
                            className={`p-6 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                                selectedEnergy === "relaxing"
                                    ? "border-secondary bg-secondary/10 shadow-lg shadow-secondary/20"
                                    : "border-border bg-card hover:border-secondary/50 hover:shadow-md"
                            }`}
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                    selectedEnergy === "relaxing" ? "bg-secondary" : "bg-muted"
                                }`}
                            >
                                <Smile className={`w-6 h-6 ${selectedEnergy === "relaxing" ? "text-white" : "text-foreground"}`}/>
                            </div >
                            <div className="text-left">
                                <h3 className="mb-1">Relaxing</h3 >
                                <p className="text-sm text-muted-foreground">Something
                                                                             chill
                                                                             and
                                                                             therapeutic</p >
                            </div >
                        </motion.button >

                        <motion.button
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.4}}
                            onClick={() => onSelectEnergy("challenging")}
                            className={`p-6 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                                selectedEnergy === "challenging"
                                    ? "border-secondary bg-secondary/10 shadow-lg shadow-secondary/20"
                                    : "border-border bg-card hover:border-secondary/50 hover:shadow-md"
                            }`}
                        >
                            <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                    selectedEnergy === "challenging" ? "bg-secondary" : "bg-muted"
                                }`}
                            >
                                <Brain className={`w-6 h-6 ${selectedEnergy === "challenging" ? "text-white" : "text-foreground"}`}/>
                            </div >
                            <div className="text-left">
                                <h3 className="mb-1">Challenging</h3 >
                                <p className="text-sm text-muted-foreground">Push
                                                                             my
                                                                             skills
                                                                             and
                                                                             learn</p >
                            </div >
                        </motion.button >
                    </div >
                </motion.div >

                <div className="flex justify-between items-center mt-16">
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
                        animate={{opacity: selectedTime && selectedEnergy ? 1 : 0.3}}
                        onClick={onNext}
                        disabled={!selectedTime || !selectedEnergy}
                        className="px-12 py-4 bg-primary text-white rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:cursor-not-allowed"
                    >
                        Continue
                    </motion.button >
                </div >
            </motion.div >
        </>
    );
}