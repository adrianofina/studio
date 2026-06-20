import { useState, Children } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StepperProps {
  children: React.ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  backButtonText?: string;
  nextButtonText?: string;
  className?: string;
}

export function Step({ children }: { children: React.ReactNode }) {
  return <div className="stepper-step">{children}</div>;
}

export function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  className = '',
}: StepperProps) {
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const isLastStep = currentStep === totalSteps;
  const isCompleted = currentStep > totalSteps;

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    } else {
      updateStep(totalSteps + 1);
    }
  };

  return (
    <div className={`stepper-container ${className}`} style={{ padding: '1rem' }}>
      {/* Step indicators */}
      <div
        className="stepper-indicators"
        style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}
      >
        {stepsArray.map((_, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isComplete = stepNum < currentStep;
          return (
            <div
              key={idx}
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isActive ? '#B000FF' : isComplete ? '#2D1B36' : 'rgba(255,255,255,0.05)',
                border: isActive ? '2px solid #B000FF' : '1px solid rgba(255,255,255,0.06)',
                color: isActive ? '#fff' : isComplete ? '#fff' : 'rgba(255,255,255,0.3)',
                fontSize: '0.75rem',
                fontWeight: 600,
                transition: 'all 0.3s ease',
              }}
            >
              {isComplete ? '✓' : stepNum}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', minHeight: '100px' }}>
        <AnimatePresence mode="wait" custom={direction}>
          {!isCompleted && (
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ x: direction >= 0 ? 30 : -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction >= 0 ? -30 : 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {stepsArray[currentStep - 1]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {!isCompleted && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          <button
            onClick={handleBack}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: '#aaa',
              cursor: 'pointer',
              fontSize: '0.85rem',
              transition: 'all 0.3s',
              opacity: currentStep === 1 ? 0.3 : 1,
              pointerEvents: currentStep === 1 ? 'none' : 'auto',
            }}
          >
            {backButtonText}
          </button>
          <button
            onClick={handleNext}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '0.75rem',
              background: '#B000FF',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.3s',
            }}
          >
            {isLastStep ? 'Complete' : nextButtonText}
          </button>
        </div>
      )}
    </div>
  );
}

export default Stepper;
