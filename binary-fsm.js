const FSM = require('./finite-state-machine');


const fsm = new FSM(['0', '1'], ['q0', 'q1'], 'q0', ['q1'], {
  q0: {
    '0': 'q1',
    '1': 'q1'
  },
  q1: {
    '0': 'q1',
    '1': 'q1'
  },
})

console.log(fsm.test('000011111'))
