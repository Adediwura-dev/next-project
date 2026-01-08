import {useState} from "react";
import {motion} from "motion/react";
import {RotateCcw, Frown} from "lucide-react";
import {useQuery} from "@tanstack/react-query";

import {Button} from "@/components/ui/button.tsx";
import {ProjectCard} from "../../components/ProjectCard";
import {FilterSidebar} from "../../components/FilterSidebar";
import {Meteors} from "@/components/ui/meteors";
import {ProjectDetailModal} from "@/components/ProjectDetailModal";
import {generateProjects} from "@/lib/ai-service";

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

interface Params {
    environment: string;
    resources: string[];
    timeCommitment: string;
    energy: string;
    goal: string;
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
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        data: projects = [],
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useQuery<Project[], Error>({
        queryKey: ["projects", environment, resources, timeCommitment, energy, goal],
        queryFn: () =>
            fetchProjects({
                environment,
                resources,
                timeCommitment,
                energy,
                goal
            }),
        retry: false,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
    });

    const showLoading = isLoading || isFetching;

    async function fetchProjects(params: Params): Promise<Project[]> {
        const projects = await generateProjects(params);
        return projects;
    }

    return (
        <>
            <title >NextProject | Result</title >

            <ProjectDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={selectedProject}
            />

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="min-h-screen bg-background relative overflow-hidden"
            >
                <div className="absolute inset-0 pointer-events-none">
                    <Meteors number={20}/>
                </div >

                {/* Header */}
                <div className="border-b border-border bg-card/50 backdrop-blur-sm relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center">
                                    <img
                                        src="/images/next-project.webp"
                                        alt="logo"
                                        className="w-15 h-15 rounded-2xl"
                                    />
                                </div >
                                <div >
                                    <h1 className="text-xl sm:text-2xl font-bold">
                                        Your AI Personalized Projects
                                    </h1 >
                                    <p className="text-muted-foreground">
                                        {showLoading
                                            ? "Consulting the AI..."
                                            : `${projects.length} projects curated for you`}
                                    </p >
                                </div >
                            </div >

                            <button
                                onClick={onRestart}
                                className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 border-2 border-border bg-card rounded-xl hover:border-primary hover:shadow-md transition-all"
                            >
                                <RotateCcw className="w-4 h-4"/>
                                <span className="text-sm font-medium">Start Over</span >
                            </button >
                        </div >
                    </div >
                </div >

                {/* Content */}
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
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

                    <div className="lg:col-span-3">
                        {showLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-64 bg-card/30 rounded-2xl animate-pulse"
                                    />
                                ))}
                            </div >
                        ) : projects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {projects.map((project, index) => (
                                    <ProjectCard
                                        key={project.id ?? index}
                                        project={project}
                                        index={index}
                                        onSelect={(p) => {
                                            setSelectedProject(p);
                                            setIsModalOpen(true);
                                        }}
                                    />
                                ))}
                            </div >
                        ) : (
                            <div className="text-center py-20 bg-card/30 rounded-3xl border border-border border-dashed">
                                <Frown className="w-12 h-12 text-muted-foreground mx-auto mb-4"/>

                                <h3 className="text-xl font-medium mb-2">
                                    {isError ? "Something went wrong" : "No projects found"}
                                </h3 >

                                {isError && !isFetching && (
                                    <p className="text-muted-foreground mb-4">
                                        {error?.message ?? "Failed to fetch projects"}
                                    </p >
                                )}

                                <Button
                                    onClick={() => refetch()}
                                    disabled={isFetching}
                                    type="button"
                                    className="inline-flex items-center gap-2 px-5 py-3 border rounded-xl disabled:opacity-50"
                                >
                                    <RotateCcw
                                        className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
                                    />
                                    {isFetching ? "Retrying..." : "Retry"}
                                </Button >
                            </div >
                        )}
                    </div >
                </div >
            </motion.div >
        </>
    );
}