import React, { Component } from 'react';

import styled from 'styled-components';

import StepList from './StepList';
import Step from './Step';
import Summary from './Summary';
import { Buttons, NextButton, BackButton } from './Buttons';


const Stepper = styled.div`
  min-height: 40%;
  width: 40%;

  background-color: #353737;

  border-radius: 2.5em;

  padding: 1em; 
`;

class StepComponent extends Component {

  constructor(props) {
    super(props);

    const totalSteps = this.props.steps.length > 0 ? this.props.steps.length : 0;

    this.state = {
      currentStep: 0,
      totalSteps,
      answers: []
    };
  }

  isLastStep() {
    return this.state.currentStep === this.state.totalSteps;
  }

  goToPreviousStep = () => {
    this.setState({ 
      currentStep: this.state.currentStep - 1 
    });
  };

  goToNextStep = () => {
    const step = this.state.currentStep + 1
    this.setState({ 
      currentStep: this.state.currentStep < this.state.totalSteps ? step : this.state.totalSteps
    });
  };

  handleOptionChoise = (answer) => {
    const answers = this.state.answers;
    answers[this.state.currentStep] = answer;
    this.setState({
      answers
    })
  }

  render() {
    console.log(this.state.answers);
    return (
      <Stepper>
        <StepList currentStep={this.state.currentStep}>
          {
            this.isLastStep() 
            ? <Summary answers={this.state.answers}/>
            : this.props.steps.map(step => {
                return <Step 
                  data={step} 
                  key={step.question} 
                  onChoise={this.handleOptionChoise}
                  defaultOption={this.state.answers[this.state.currentStep]}/>
              }) 
          }
        </StepList>
        <Buttons>
          <BackButton 
            onClick={this.goToPreviousStep}
            disabled={this.state.currentStep === 0}
          >
            Back
          </BackButton>
          <NextButton 
            onClick={this.goToNextStep }
            disabled={this.state.currentStep === this.state.totalSteps}
          >
            Next
          </NextButton>
        </Buttons>
      </Stepper>
    );
  }
}

export default StepComponent;