class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (!config) throw Error('Error: The config is not set');
      this.config = config;
      this.onFSM = config.initial;
      this.history = [this.onFSM];
      this.historyPoint = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.onFSM;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (this.config.states[state]) {
        this.onFSM = state;
        this.historyPoint ++;
        if (this.history[this.historyPoint]) this.history.splice(this.historyPoint);
        this.history.push(state);
      } 
      else throw Error('Error: Status not supported');
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      let nextState=this.config.states[this.onFSM].transitions[event];
      if (!nextState) throw Error('Error: Invalid event');
      this.changeState(nextState);   
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.onFSM = this.config.initial;
      this.history.push(this.onFSM);
      this.historyPoint ++;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      if (!event) return Object.keys(this.config.states);
      let states = [];
      for(let state of Object.keys(this.config.states)){
        if (this.config.states[state].transitions[event]) states.push(state);
      }
      return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (!this.history[this.historyPoint - 1]) return false;
      this.historyPoint --;
      this.onFSM = this.history[this.historyPoint];
      return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (!this.history[this.historyPoint + 1]) return false;
      this.historyPoint ++;
      this.onFSM = this.history[this.historyPoint];
      return true; 
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.history = [this.onFSM];
      this.historyPoint = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
