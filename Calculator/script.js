class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.readyToReset = false
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand =''
        this.operation = undefined 
        this.readyToReset = false
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    computeSqrt() {
        let computation
        const curr = parseFloat(this.currentOperand)
        if (this.currentOperand === '' ) return
        if (curr >= 0) {computation = Math.sqrt(curr)}
        else {computation = "WRONG NUMBER"}

        this.readyToReset = true;
        this.currentOperand = computation === "WRONG NUMBER" ? "WRONG NUMBER" : Number(computation.toFixed(7));
        this.operation = undefined
        this.previousOperand = ''
    }

    chooseOperation(operation) {  
        if (this.currentOperand === '') return;

        if (this.previousOperand !== '' && this.currentOperand !== '') {
		  this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break 
            case '*':
                computation = prev * curr
                break  
            case '÷':
                computation = prev / curr
                break
            case '^':
                computation = prev ** curr
                break          
            default:
                return
        }
        this.readyToReset = true;
        this.currentOperand = computation === "WRONG NUMBER" ? "WRONG NUMBER" : Number(computation.toFixed(7));
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (this.currentOperand === "WRONG NUMBER") {
            return this.currentOperand
        }
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }     
    }

    negative() {
        if (this.currentOperand.toString().startsWith('-')) {
            this.currentOperand = this.currentOperand.toString().slice(1)
          } else {
            this.currentOperand = `-${this.currentOperand}`
          }
    }
}

const numberBottons = document.querySelectorAll('[data-number]')
const operationBottons = document.querySelectorAll('[data-operation]')
const operationSqrtBotton = document.querySelector('[data-operation-sqrt]')
const equalsBotton = document.querySelector('[data-equals]')
const deleteBotton = document.querySelector('[data-delete]')
const allClearBotton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const negativeBotton = document.querySelector('[data-negative]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberBottons.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) {
          calculator.currentOperand = "";
          calculator.readyToReset = false;
      }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        
    })
})

operationBottons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsBotton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearBotton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBotton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

negativeBotton.addEventListener('click', button => {
    calculator.negative()
    calculator.updateDisplay()
})
operationSqrtBotton.addEventListener('click', button => {
    calculator.computeSqrt()
    calculator.updateDisplay()
})
