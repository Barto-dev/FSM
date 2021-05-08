class FSM {
  /**
   *
   * @param {String[]} alphabet
   * @param {String[]} states
   * @param {String} currentState
   * @param {String[]} finiteStates
   * @param {Object} transitions
   */
  constructor(alphabet, states, currentState, finiteStates, transitions) {
    this.alphabet = alphabet;
    this.states = states;
    this.initialState = currentState;
    this.currentState = currentState;
    this.finiteStates = finiteStates;
    this.transitions = transitions;
  }

  // Проверяем на наличие символа в переходе
  _checkExistTransition(state, symbol) {
    return (this.transitions[state] && this.transitions[state][symbol])
  }

  _changeState(symbol) {
    if (this._checkExistTransition(this.currentState, symbol)) {
      this.currentState = this.transitions[this.currentState][symbol]
    } else {
     throw new Error(`No transitions from ${this.currentState} by ${symbol}`)
    }
  }

  _checkBelongAlphabet(symbol) {
    if (this.alphabet.includes(symbol)) {
      return true
    } else {
      throw new Error(`Unknown symbol ${symbol}`)
    }
  }

  test(value) {
    this.currentState = this.initialState;
    for (let symbol of value) {
      this._checkBelongAlphabet(symbol);
      this._changeState(symbol)
      // console.log(this.currentState)
    }

    return this.finiteStates.includes(this.currentState)
  }
}

module.exports = FSM;
