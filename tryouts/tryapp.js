class CalculatorComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .calculator {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    width: 320px;
                    background-color: white;
                    margin: 50px auto;
                }
                .display {
                    background-color: #222;
                    color: white;
                    font-size: 2em;
                    padding: 20px;
                    text-align: right;
                    box-sizing: border-box;
                }
                .buttons {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                }
                .btn {
                    background-color: #eee;
                    border: 1px solid #ccc;
                    font-size: 1.5em;
                    padding: 20px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    box-sizing: border-box;
                }
                .btn:hover {
                    background-color: #ddd;
                }
                .btn:active {
                    background-color: #ccc;
                }
                .span-two {
                    grid-column: span 2;
                }
            </style>
            <div class="calculator">
                <div class="display" id="display">0</div>
                <div class="buttons">
                    <button class="btn" data-number="7">7</button>
                    <button class="btn" data-number="8">8</button>
                    <button class="btn" data-number="9">9</button>
                    <button class="btn" data-operator="+">+</button>
                    <button class="btn" data-number="4">4</button>
                    <button class="btn" data-number="5">5</button>
                    <button class="btn" data-number="6">6</button>
                    <button class="btn" data-operator="-">-</button>
                    <button class="btn" data-number="1">1</button>
                    <button class="btn" data-number="2">2</button>
                    <button class="btn" data-number="3">3</button>
                    <button class="btn" data-operator="*">*</button>
                    <button class="btn" data-number=".">.</button>
                    <button class="btn" data-number="0">0</button>
                    <button class="btn" id="equals">=</button>
                    <button class="btn" data-operator="/">/</button>
                    <button class="btn" id="delete">←</button>
                    <button class="btn" id="clear">C</button>
                </div>
            </div>
        `;

        this.display = this.shadowRoot.querySelector('#display');
        this.clearButton = this.shadowRoot.querySelector('#clear');
        this.deleteButton = this.shadowRoot.querySelector('#delete');
        this.equalsButton = this.shadowRoot.querySelector('#equals');
        this.numberButtons = this.shadowRoot.querySelectorAll('[data-number]');
        this.operatorButtons = this.shadowRoot.querySelectorAll('[data-operator]');

        this.clearButton.addEventListener('click', () => this.clearDisplay());
        this.deleteButton.addEventListener('click', () => this.deleteLast());
        this.equalsButton.addEventListener('click', () => this.calculate());
        this.numberButtons.forEach(button => button.addEventListener('click', (e) => this.appendNumber(e.target.dataset.number)));
        this.operatorButtons.forEach(button => button.addEventListener('click', (e) => this.appendOperator(e.target.dataset.operator)));
    }

    clearDisplay() {
        this.display.innerText = '0';
    }

    deleteLast() {
        if (this.display.innerText.length > 1) {
            this.display.innerText = this.display.innerText.slice(0, -1);
        } else {
            this.display.innerText = '0';
        }
    }

    appendNumber(number) {
        if (this.display.innerText === '0') {
            this.display.innerText = number;
        } else {
            this.display.innerText += number;
        }
    }

    appendOperator(operator) {
        const lastChar = this.display.innerText.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            this.display.innerText = this.display.innerText.slice(0, -1) + operator;
        } else {
            this.display.innerText += operator;
        }
    }

    calculate() {
        try {
            this.display.innerText = eval(this.display.innerText);
        } catch {
            this.display.innerText = 'Error';
        }
    }
}

customElements.define('calculator-component', CalculatorComponent);
