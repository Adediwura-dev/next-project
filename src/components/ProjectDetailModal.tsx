import {useQuery} from "@tanstack/react-query";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Loader2, CheckCircle2, Lightbulb, ExternalLink} from "lucide-react";
import {FaYoutube as Youtube} from "react-icons/fa";
import {ProjectGuide, getProjectDetails} from "@/lib/ai-service.ts";
import {motion} from "motion/react";

interface ProjectDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        difficulty: string;
        timeCommitment: string;
        requiredResources: string[];
        environment: string;
    } | null;
}

export function ProjectDetailModal({
                                       isOpen,
                                       onClose,
                                       project
                                   }: ProjectDetailModalProps) {
    const {
        data: guide,
        isLoading,
        isError,
        refetch
    } = useQuery<ProjectGuide, Error>({
        queryKey: ["projectGuide", project?.title],
        queryFn: () => {
            if (!project) throw new Error("No project selected");
            return getProjectDetails(project.title, project.requiredResources, project.environment);
        },
        enabled: isOpen && !!project,
        staleTime: 1000 * 60 * 10,
        retry: false,
    });

    if (!project) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl h-[85vh] p-0 flex flex-col bg-card/95 backdrop-blur-xl border-border/50 overflow-hidden">

                <DialogHeader className="p-6 border-b border-border/40 shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge
                            variant="outline"
                            className="text-primary border-primary/20"
                        >
                            {project.difficulty}
                        </Badge >
                        <Badge variant="secondary">{project.timeCommitment}</Badge >
                    </div >
                    <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle >
                    <DialogDescription >
                        {isLoading
                            ? "Asking AI for the best way to start..."
                            : guide?.introduction}
                    </DialogDescription >
                </DialogHeader >

                <ScrollArea className="flex-1 min-h-0 p-6 pt-2">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <Loader2 className="w-10 h-10 animate-spin text-primary"/>
                            <p className="text-muted-foreground animate-pulse">Generating
                                                                               your
                                                                               custom
                                                                               guide...</p >
                        </div >
                    ) : isError ? (
                        <div className="text-center py-20 space-y-4">
                            <p className="text-red-500 font-medium">Failed to
                                                                    load
                                                                    guide.</p >
                            <Button
                                onClick={() => refetch()}
                                className="inline-flex items-center gap-2"
                            >
                                <Loader2 className="w-10 h-10 animate-spin text-primary"/>
                                Retry
                            </Button >
                        </div >
                    ) : guide ? (
                        <div className="space-y-8 pb-8">

                            {/* Steps Section */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500"/>
                                    Step-by-Step
                                </h3 >
                                <div className="space-y-4 pl-2 border-l-2 border-border/50 ml-2">
                                    {guide.steps.map((step, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{opacity: 0, x: 10}}
                                            animate={{opacity: 1, x: 0}}
                                            transition={{delay: idx * 0.1}}
                                            className="relative pl-6"
                                        >
                                            <span className="absolute -left-[21px] top-0 bg-background border border-border w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                                                {idx + 1}
                                            </span >
                                            <h4 className="font-medium text-foreground">{step.title}</h4 >
                                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                                {step.description}
                                            </p >
                                        </motion.div >
                                    ))}
                                </div >
                            </div >

                            {/* Tips Section */}
                            <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                                <h3 className="font-semibold text-amber-500 flex items-center gap-2 mb-2">
                                    <Lightbulb className="w-5 h-5"/>
                                    Pro Tips
                                </h3 >
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    {guide.tips.map((tip, idx) => (
                                        <li key={idx}>{tip}</li >
                                    ))}
                                </ul >
                            </div >

                            {/* YouTube Resources */}
                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Youtube className="w-5 h-5 text-red-500"/>
                                    Video Tutorials
                                </h3 >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {guide.youtubeQueries.map((query, idx) => (
                                        <a
                                            key={idx}
                                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all"
                                        >
                                            <div className="bg-red-500/10 p-2 rounded-full group-hover:bg-red-500/20 transition-colors">
                                                <Youtube className="w-4 h-4 text-red-600"/>
                                            </div >
                                            <div className="flex-1">
                                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Watch</p >
                                                <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                                    {query}
                                                </p >
                                            </div >
                                            <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary"/>
                                        </a >
                                    ))}
                                </div >
                            </div >
                        </div >
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <p >No guide available</p >
                        </div >
                    )}
                </ScrollArea >

                <div className="p-6 border-t border-border/40 bg-card shrink-0">
                    <Button onClick={onClose} className="w-full">
                        Close Guide
                    </Button >
                </div >
            </DialogContent >
        </Dialog >
    );
}