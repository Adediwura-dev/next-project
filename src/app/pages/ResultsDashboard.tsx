import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { RotateCcw, Frown } from "lucide-react";
import { ProjectCard } from "../../components/ProjectCard.tsx";
import { FilterSidebar } from "../../components/FilterSidebar.tsx";
import { Meteors } from "@/components/ui/meteors";
import { generateProjects } from "@/lib/ai-service.ts";
import { ProjectDetailModal } from "@/components/ProjectDetailModal.tsx";

interface Project {
    id: string;
    title: string;
    matchReason: string;
    difficulty: string;
    environment: string;
    energy: string;
    timeCommitment: string;
    requiredResources: string[];
    goal: string;
}

interface ResultsDashboardProps {
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
    onRestart: () => void;
}

export function ResultsDashboard({
                                     environment,
                                     resources,
                                     timeCommitment,
                                     energy,
                                     goal,
                                     onUpdateEnvironment,
                                     onUpdateResources,
                                     onUpdateTime,
                                     onUpdateEnergy,
                                     onUpdateGoal,
                                     onRestart,
                                 }: ResultsDashboardProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const hasFetchedRef = useRef(false);
    const cacheKeyRef = useRef<string | null>(null);

    const handleOpenProject = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    useEffect(() => {
        let isMounted = true;

        const fetchProjects = async () => {
            const cacheKey = JSON.stringify({
                environment,
                resources,
                timeCommitment,
                energy,
                goal,
            });

            if (hasFetchedRef.current && cacheKeyRef.current === cacheKey) {
                return;
            }

            hasFetchedRef.current = true;
            cacheKeyRef.current = cacheKey;

            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                if (isMounted) {
                    setProjects(JSON.parse(cached));
                    setIsLoading(false);
                }
                return;
            }

            try {
                setIsLoading(true);

                const aiResults = await generateProjects({
                    environment,
                    resources,
                    timeCommitment,
                    energy,
                    goal,
                });

                if (isMounted) {
                    setProjects(aiResults);
                    localStorage.setItem(cacheKey, JSON.stringify(aiResults));
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchProjects();

        return () => {
            isMounted = false;
        };
    }, [environment, resources, timeCommitment, energy, goal]);

    return (
        <>
            <title>NextProject | Result</title>

            <ProjectDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={selectedProject}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-background relative overflow-hidden"
            >
                {/* Meteors Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <Meteors number={20} />
                </div>

                {/* Header */}
                <div className="border-b border-border bg-card/50 backdrop-blur-sm relative z-10">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center mb-4">
                                    <img
                                        src="/src/assets/images/next-project.webp"
                                        alt="logo"
                                        className="w-15 h-15 rounded-2xl"
                                    />
                                </div>
                                <div>
                                    <h1 className="mb-1 text-2xl font-bold">
                                        Your AI Personalized Projects
                                    </h1>
                                    <p className="text-muted-foreground">
                                        {isLoading
                                            ? "Consulting the AI"
                                            : `${projects.length} projects curated for you`}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={onRestart}
                                className="flex items-center gap-2 px-6 py-3 border-2 border-border bg-card rounded-xl hover:border-primary hover:shadow-md transition-all"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Start Over
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <FilterSidebar
                                environment={environment}
                                resources={resources}
                                timeCommitment={timeCommitment}
                                energy={energy}
                                goal={goal}
                                onUpdateEnvironment={onUpdateEnvironment}
                                onUpdateResources={onUpdateResources}
                                onUpdateTime={onUpdateTime}
                                onUpdateEnergy={onUpdateEnergy}
                                onUpdateGoal={onUpdateGoal}
                            />
                        </div>

                        {/* Project Grid */}
                        <div className="lg:col-span-3">
                            {isLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div
                                            key={i}
                                            className="h-64 bg-card/30 rounded-2xl animate-pulse border border-border/50"
                                        />
                                    ))}
                                </div>
                            ) : projects.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {projects.map((project, index) => (
                                        <ProjectCard
                                            key={project.id || index}
                                            project={project}
                                            index={index}
                                            onSelect={handleOpenProject}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-card/30 rounded-3xl border border-border border-dashed">
                                    <Frown className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-xl font-medium mb-2">
                                        No projects found
                                    </h3>
                                    <p className="text-muted-foreground max-w-md mx-auto">
                                        The AI couldn't generate projects for this
                                        combination. Try adjusting your filters.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
