import React from 'react';
import clsx from 'clsx';

type Step = {
  title: string;
  subtitle?: string;
};

type Props = {
  steps: Step[];
  activeIndex: number;
};

const Stepper: React.FC<Props> = ({ steps, activeIndex }) => {
  return (
    <div style={{ marginTop: '16px', display: 'flex', position: 'relative', marginBottom: '24px' }}>
      <div style={{ position: 'absolute', bottom: '0', height: '6px', width: '100%', backgroundColor: '#F7F7F7', borderRadius: '3px' }}>
        <div 
          style={{
            position: 'absolute',
            top: '2px',
            bottom: '2px',
            height: '2px',
            width: `${(100 / steps.length) * activeIndex}%`,
            backgroundColor: '#2359AA',
            borderRadius: '3px',
          }}
        />
      </div>

      {steps.map((item, index) => {
        const isActive = index < activeIndex;

        return (
          <div key={index} style={{ width: '100%', position: 'relative', height: '50px' }}>
            <div
              className={clsx('step-title', {
                'step-title-active': isActive,
                'step-title-inactive': !isActive,
              })}
            >
              {index + 1}. {item.title}
            </div>
            {item.subtitle && (
              <div style={{ fontSize: '12px', color: '#999999', marginTop: '4px' }}>
                {item.subtitle}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;