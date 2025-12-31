import {motion} from "motion/react";
import {X, Laptop, Wrench, TreePine, Home, Brain, Smile} from "lucide-react";

interface FilterSidebarProps {
    environment: string;
    resources: string[];
    timeCommitment: string;
    energy: string;
    goal: string;
    onUpdateEnvironment: (env: string) => void;
    onUpdateResources: (resources: string[]) => void;
    onUpdateTime: (time: string) => void;
    onUpdateEnergy: (energy: string) => void;
    onUpdateGoal: (goal: string) => void;
}

const environmentIcons = {
    desk: Laptop,
    workshop: Wrench,
    outdoors: TreePine,
    home: Home,
};

export function FilterSidebar({
                                  environment,
                                  resources,
                                  timeCommitment,
                                  energy,
                                  goal,
                                  onUpdateResources,
                                  onUpdateTime,
                                  onUpdateEnergy,
                                  onUpdateGoal,
                              }: FilterSidebarProps) {
    const removeResource = (resource: string) => {
        onUpdateResources(resources.filter((r) => r !== resource));
    };

    const EnvironmentIcon = environmentIcons[environment as keyof typeof environmentIcons];

    return (
        <motion.div
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            className="bg-card rounded-2xl p-6 shadow-md border border-border sticky top-24"
        >
            <h2 className="mb-6">Filters</h2 >

            <div className="space-y-6">
                {/* Environment */}
                <div >
                    <label className="text-sm text-muted-foreground mb-2 block">Environment</label >
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                        {EnvironmentIcon &&
                          <EnvironmentIcon className="w-5 h-5 text-foreground"/>}
                        <span className="capitalize">{environment.replace("_", " / ")}</span >
                    </div >
                </div >

                {/* Resources */}
                <div >
                    <label className="text-sm text-muted-foreground mb-2 block">Resources</label >
                    <div className="flex flex-wrap gap-2">
                        {resources.map((resource) => (
                            <div
                                key={resource}
                                className="flex items-center gap-2 px-3 py-1.5 bg-primary/20 text-primary rounded-full text-sm border border-primary/30"
                            >
                                <span >{resource}</span >
                                <button
                                    onClick={() => removeResource(resource)}
                                    className="hover:bg-primary/30 rounded-full p-0.5"
                                >
                                    {resources.length > 1 &&
                                      <X className="w-3 h-3"/>}
                                </button >
                            </div >
                        ))}
                    </div >
                </div >

                {/* Time Commitment */}
                <div >
                    <label className="text-sm text-muted-foreground mb-2 block">Time
                                                                                Available</label >
                    <select
                        value={timeCommitment}
                        onChange={(e) => onUpdateTime(e.target.value)}
                        className="w-full p-3 bg-muted rounded-xl border-2 border-border focus:border-primary outline-none text-foreground transition-colors"
                    >
                        <option value="quick">1-2 Hours</option >
                        <option value="weekend">2 Days</option >
                        <option value="deep">1 Month+</option >
                    </select >
                </div >

                {/* Energy Level */}
                <div >
                    <label className="text-sm text-muted-foreground mb-2 block">Energy
                                                                                Level</label >
                    <div className="flex gap-2">
                        <button
                            onClick={() => onUpdateEnergy("relaxing")}
                            className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                                energy === "relaxing"
                                    ? "border-secondary bg-secondary/10"
                                    : "border-border hover:border-secondary/50"
                            }`}
                        >
                            <Smile className="w-5 h-5 mx-auto mb-1"/>
                            <span className="text-sm">Relaxing</span >
                        </button >
                        <button
                            onClick={() => onUpdateEnergy("challenging")}
                            className={`flex-1 p-3 rounded-xl border-2 transition-all ${
                                energy === "challenging"
                                    ? "border-secondary bg-secondary/10"
                                    : "border-border hover:border-secondary/50"
                            }`}
                        >
                            <Brain className="w-5 h-5 mx-auto mb-1"/>
                            <span className="text-sm">Challenging</span >
                        </button >
                    </div >
                </div >

                {/* Goal */}
                <div >
                    <label className="text-sm text-muted-foreground mb-2 block">Goal</label >
                    <select
                        value={goal}
                        onChange={(e) => onUpdateGoal(e.target.value)}
                        className="w-full p-3 bg-muted rounded-xl border-2 border-border focus:border-primary outline-none text-foreground transition-colors"
                    >
                        <option value="learn">Learn a new skill</option >
                        <option value="portfolio">Build portfolio</option >
                        <option value="solve">Solve a problem</option >
                        <option value="fun">Just for fun</option >
                    </select >
                </div >
            </div >

            <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                    Showing projects matched to your preferences. Adjust filters
                    to see different options.
                </p >
            </div >
        </motion.div >
    );
}