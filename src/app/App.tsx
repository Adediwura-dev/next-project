import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { ProgressBar } from "../components/ProgressBar.tsx";
import { Environment } from "@/app/pages/Environment.tsx";
import { Resources } from "@/app/pages/Resources.tsx";
import { TimeEnergy } from "@/app/pages/TimeEnergy.tsx";
import { Goal } from "@/app/pages/Goal.tsx";
import { ResultsDashboard } from "@/app/pages/ResultsDashboard";
import {Meteors} from "@/components/ui/meteors.tsx";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const [environment, setEnvironment] = useState("");
  const [resources, setResources] = useState<string[]>([]);
  const [timeCommitment, setTimeCommitment] = useState("");
  const [energy, setEnergy] = useState("");
  const [goal, setGoal] = useState("");

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setShowResults(false);
    setEnvironment("");
    setResources([]);
    setTimeCommitment("");
    setEnergy("");
    setGoal("");
  };

  if (showResults) {
    return (
      <ResultsDashboard
        environment={environment}
        resources={resources}
        timeCommitment={timeCommitment}
        energy={energy}
        goal={goal}
        onUpdateEnvironment={setEnvironment}
        onUpdateResources={setResources}
        onUpdateTime={setTimeCommitment}
        onUpdateEnergy={setEnergy}
        onUpdateGoal={setGoal}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
            <Meteors number={20} />
        </div>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <div className="container mx-auto min-h-screen flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <Environment
              key="step1"
              selectedEnvironment={environment}
              onSelect={setEnvironment}
              onNext={handleNext}
            />
          )}

          {currentStep === 2 && (
            <Resources
              key="step2"
              selectedEnvironment={environment}
              selectedResources={resources}
              onUpdateResources={setResources}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <TimeEnergy
              key="step3"
              selectedTime={timeCommitment}
              selectedEnergy={energy}
              onSelectTime={setTimeCommitment}
              onSelectEnergy={setEnergy}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && (
            <Goal
              key="step4"
              selectedGoal={goal}
              onSelect={setGoal}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}