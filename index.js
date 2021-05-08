const FSM = require('./finite-state-machine');

const createTransitionsFromStateAndSymbols = (symbols, targetState) => symbols.reduce((acc, curValue) => ({
  ...acc,
  [curValue]: targetState
}), {});

const createTargetTransitions = (targetStates) => ({
  ...createTransitionsFromStateAndSymbols(V1, targetStates[0]),
  ...createTransitionsFromStateAndSymbols(V2, targetStates[1]),
  ...createTransitionsFromStateAndSymbols(V3, targetStates[2]),
})

const V1 = 'qazwsxedcrfvtgbyhnujmikolp'.split('');
const V2 = '!@#$%^&*()'.split('');
const V3 = '1234567890'.split('');

// alphabet
const V = [...V1, ...V2, ...V3];

// possible states
const Q = ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];

//initial state
const S = 'q0';

//Finite state
const F = ['q10'];

const transitions = {
  q0: createTargetTransitions(['q1', 'q4', 'q7']),
  q1: createTargetTransitions(['q1', 'q2', 'q3']),
  q2: createTargetTransitions(['q2', 'q2', 'q10']),
  q3: createTargetTransitions(['q3', 'q10', 'q3']),
  q4: createTargetTransitions(['q5', 'q4', 'q6']),
  q5: createTargetTransitions(['q5', 'q5', 'q10']),
  q6: createTargetTransitions(['q10', 'q6', 'q6']),
  q7: createTargetTransitions(['q8', 'q9', 'q7']),
  q8: createTargetTransitions(['q8', 'q10', 'q8']),
  q9: createTargetTransitions(['q10', 'q9', 'q9']),
  q10: createTargetTransitions(['q10', 'q10', 'q10']),
}

// console.log(transitions)

const fsm = new FSM(V, Q, S, F, transitions)

console.log(fsm.test('aba')) // false
console.log(fsm.test('343b')) // false
console.log(fsm.test('343$@')) // false
console.log(fsm.test('ab%a4')) // true
console.log(fsm.test('a323%#')) // true

