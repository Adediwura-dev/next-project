import {motion} from "motion/react";
import {Laptop, Wrench, TreePine, Home, Sparkles, Check} from "lucide-react";

interface Screen1Props {
    selectedEnvironment: string;
    onSelect: (environment: string) => void;
    onNext: () => void;
}

const environments = [
    {
        id: "desk",
        label: "At my Desk",
        icon: Laptop,
        description: "Perfect for digital projects"
    },
    {
        id: "workshop",
        label: "In the Workshop/Garage",
        icon: Wrench,
        description: "Build physical creations"
    },
    {
        id: "outdoors",
        label: "Outdoors",
        icon: TreePine,
        description: "Nature and fresh air"
    },
    {
        id: "home",
        label: "Kitchen/Home",
        icon: Home,
        description: "Cooking and crafts"
    },
    {
        id: "inspiration",
        label: "Inspiration",
        icon: Sparkles,
        description: "Creative and imaginative space"
    },
];

export function Environment({
                                selectedEnvironment,
                                onSelect,
                                onNext
                            }: Screen1Props) {
    return (
        <>
            <title>NextProject | Home</title>
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                transition={{duration: 0.4}}
                className="max-w-4xl mx-auto px-6 py-16"
            >
                {/* Logo and Welcome */}
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                    className="flex flex-col items-center mb-12"
                >
                    <div className="w-25 h-25 bg-white rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                        <img
                            src={"/src/assets/images/next-project.webp"}
                            alt={"logo"}
                        />
                    </div >
                    <motion.h2
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                        className="text-foreground mb-2"
                    >
                        Welcome to NextProject
                    </motion.h2 >
                    <motion.p
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.3}}
                        className="text-muted-foreground"
                    >
                        Let's find your perfect project
                    </motion.p >
                </motion.div >

                <motion.h1
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.1}}
                    className="text-center mb-3"
                >
                    Where will you be creating?
                </motion.h1 >

                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.2}}
                    className="text-center text-muted-foreground mb-16"
                >
                    This helps us understand what space you have available
                </motion.p >

                <div className="grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {environments.map((env, index) => {
                        const Icon = env.icon;
                        const isSelected = selectedEnvironment === env.id;

                        return (
                            <motion.button
                                key={env.id}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.1 * index}}
                                onClick={() => onSelect(env.id)}
                                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
                                    isSelected
                                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                                        : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                                }`}
                            >
                                <div
                                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                                        isSelected ? "bg-primary" : "bg-muted"
                                    }`}
                                >
                                    <Icon className={`w-8 h-8 ${isSelected ? "text-white" : "text-foreground"}`}/>
                                </div >
                                <h3 className="mb-2">{env.label}</h3 >
                                <p className="text-muted-foreground">{env.description}</p >

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

                <div className="flex justify-center">
                    <motion.button
                        initial={{opacity: 0}}
                        animate={{opacity: selectedEnvironment ? 1 : 0.3}}
                        onClick={onNext}
                        disabled={!selectedEnvironment}
                        className="px-12 py-4 bg-primary text-white rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:cursor-not-allowed"
                    >
                        Continue
                    </motion.button >
                </div >
            </motion.div >
        </>
    );
}