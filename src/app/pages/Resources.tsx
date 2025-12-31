import { motion } from "motion/react";
import { X } from "lucide-react";
import { useState, KeyboardEvent } from "react";

interface ResourcesProps {
    selectedEnvironment: string;
    selectedResources: string[];
    onUpdateResources: (resources: string[]) => void;
    onNext: () => void;
    onBack: () => void;
}

const environmentTools: Record<string, string[]> = {
    desk: [
        "Laptop",
        "Python",
        "JavaScript",
        "Excel",
        "Figma",
        "Notion",
        "Tablet",
        "Headphones",
    ],
    workshop: [
        "Hammer & Nails",
        "Power Drill",
        "3D Printer",
        "Wood",
        "Screwdriver Set",
        "Soldering Iron",
        "Arduino",
        "Pliers",
    ],
    outdoors: [
        "Camera",
        "Garden Tools",
        "Running Shoes",
        "Sketchbook",
        "Binoculars",
        "Compass",
        "Bike",
        "Drone",
    ],
    home: [
        "Sewing Machine",
        "Yarn & Needles",
        "Kitchen Mixer",
        "Ingredients",
        "Cleaning Supplies",
        "Paint Set",
        "Toolbox",
        "Fabrics",
    ],
    inspiration: [
        "Watercolor Set",
        "Journal",
        "Mood Board",
        "Music",
        "Canvas",
        "Pencils",
        "Books",
        "Whiteboard",
    ],
};

export function Resources({
                              selectedEnvironment,
                              selectedResources,
                              onUpdateResources,
                              onNext,
                              onBack,
                          }: ResourcesProps) {
    const [inputValue, setInputValue] = useState("");

    const currentPopularResources = environmentTools[selectedEnvironment] || [
        "Laptop",
        "Notebook",
        "Phone",
    ];

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            e.preventDefault();
            if (!selectedResources.includes(inputValue.trim())) {
                onUpdateResources([...selectedResources, inputValue.trim()]);
            }
            setInputValue("");
        }
    };

    const addResource = (resource: string) => {
        if (!selectedResources.includes(resource)) {
            onUpdateResources([...selectedResources, resource]);
        }
    };

    const removeResource = (resource: string) => {
        onUpdateResources(selectedResources.filter((r) => r !== resource));
    };

    return (
        <>
            <title>NextProject | Resources</title>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto px-6 py-16"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-3"
                >
                    What tools do you have on hand?
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-muted-foreground mb-12"
                >
                    Add your available resources so we can suggest relevant projects for your{" "}
                    <span className="text-primary font-medium">{selectedEnvironment}</span>{" "}
                    space.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type and press Enter to add..."
                            className="w-full px-6 py-5 text-lg border-2 border-border rounded-2xl bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                        />
                    </div>

                    {selectedResources.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-wrap gap-3 mt-6"
                        >
                            {selectedResources.map((resource, index) => (
                                <motion.div
                                    key={resource}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full"
                                >
                                    <span>{resource}</span>
                                    <button
                                        onClick={() => removeResource(resource)}
                                        className="hover:bg-primary/80 rounded-full p-0.5 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-sm text-muted-foreground mb-4">
                        Suggested tools for this space:
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {currentPopularResources.map((resource, index) => {
                            const isSelected = selectedResources.includes(resource);
                            return (
                                <motion.button
                                    key={resource}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.05 * index }}
                                    onClick={() => addResource(resource)}
                                    disabled={isSelected}
                                    className={`px-5 py-2.5 rounded-full border-2 transition-all duration-300 ${
                                        isSelected
                                            ? "border-border bg-muted text-muted-foreground cursor-not-allowed"
                                            : "border-border bg-card hover:border-primary hover:bg-primary/10 hover:shadow-md"
                                    }`}
                                >
                                    {resource}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                <div className="flex justify-between items-center mt-16">
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={onBack}
                        className="px-8 py-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Back
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: selectedResources.length > 0 ? 1 : 0.3 }}
                        onClick={onNext}
                        disabled={selectedResources.length === 0}
                        className="px-12 py-4 bg-primary text-white rounded-full hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:cursor-not-allowed"
                    >
                        Continue
                    </motion.button>
                </div>
            </motion.div>
        </>
    );
}