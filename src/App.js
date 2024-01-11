import React from "react"
import Divvy from "./components/Divvy"


function App() {

  //have an array of objects with a num and some coloring boolean properties in state
  const [numsSelectArray, setnumsSelectArray] = React.useState([])
  const [numsBubbleArray, setnumsBubbleArray] = React.useState([])
  const [numsMergeArray, setnumsMergeArray] = React.useState([])
  
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  
  //generates the random height divs to be sorted and places them in object and then into the arrays in state
  function generateRandom(){
    const tempArray = []
    for (let i = 0; i < 25; i++){
      const tempNum = Math.floor(Math.random() * 100) + 1
      const newObj = {num: tempNum, isSelected: false, isSorted: false, isDone: false}
      tempArray.push(newObj)
    }
    setnumsSelectArray(JSON.parse(JSON.stringify(tempArray)))
    setnumsBubbleArray(JSON.parse(JSON.stringify(tempArray)))
    setnumsMergeArray(JSON.parse(JSON.stringify(tempArray)))
  }
  

  function startSort(){
    beginSelectionSort()
    beginBubbleSort()
    // beginMergeSort()
  }

  
  async function beginSelectionSort(){
    const copyNums = numsSelectArray.slice()
    for (let i = 0; i < copyNums.length - 1; i++){
      var minVal = copyNums[i].num
      var minIndex = i
      copyNums[i].isSelected = true
      setnumsSelectArray([...copyNums])
      for (let j = i + 1; j < copyNums.length; j++){
        copyNums[j].isSelected = true
        setnumsSelectArray([...copyNums])
        var testVal = copyNums[j].num
        var testIndex = j
        if (testVal < minVal) {
          minVal = testVal
          minIndex = testIndex
        }
        await sleep(100)
        copyNums[j].isSelected = false
        setnumsSelectArray([...copyNums])
        
      }
      var temp = copyNums[i]
      copyNums[i].isSelected = false
      copyNums[i] = copyNums[minIndex]
      copyNums[i].isSorted = true
      copyNums[minIndex] = temp
      setnumsSelectArray([...copyNums])
    }
    for (let i = 0; i < copyNums.length; i++){
      copyNums[i].isDone = true
      setnumsSelectArray([...copyNums])
    }
  }
  
  async function beginBubbleSort(){
    const copyBubNums = numsBubbleArray.slice()
    var continueFlag = true
    while (continueFlag){
      var swaps = 0;
      var pointer = 0
      while (pointer < copyBubNums.length - 1) {
        var val1 = copyBubNums[pointer].num
        var val2 = copyBubNums[pointer + 1].num
        copyBubNums[pointer].isSelected = true
        copyBubNums[pointer + 1].isSelected = true
        setnumsBubbleArray([...copyBubNums])
        if (val1 > val2) {
          swaps += 1
          copyBubNums[pointer + 1].num = val1
          copyBubNums[pointer].num = val2
          setnumsBubbleArray([...copyBubNums])
          
        }
        await sleep(250)
        copyBubNums[pointer].isSelected = false
        copyBubNums[pointer + 1].isSelected = false
        setnumsBubbleArray([...copyBubNums])
        pointer += 1
      }
      if (swaps === 0){
        continueFlag = false
      }
    }
    for (let i = 0; i < copyBubNums.length; i++){
      copyBubNums[i].isDone = true
      setnumsBubbleArray([...copyBubNums])
    }
    console.log("here2")
  }

  async function beginMergeSort(){
    const copyNums = numsMergeArray
    mergeSortHelper(copyNums)
    for (let i = 0; i < copyNums.length; i++){
      copyNums[i].isDone = true
      setnumsBubbleArray([...copyNums])
    }

  }

  function mergeSortHelper(array){
    if (array.length < 2){
      return array
    }
    const mid = Math.floor(array.length / 2)
    const leftSplit = array.slice(0, mid)
    const rightSplit = array.slice(mid)
    return mergerHelper(mergeSortHelper(leftSplit), mergeSortHelper(rightSplit))
  }

  async function mergerHelper(leftArray, rightArray){
    const sortedArray = []
    while (leftArray.length && rightArray.length){
      
      if (leftArray[0].num <= rightArray[0].num){
        leftArray[0].isSelected = true
        await sleep(250)
        leftArray[0].isSelected = false
        sortedArray.push(leftArray.shift())
        
      } else {
        rightArray[0].isSelected = true
        await sleep(250)
        rightArray[0].isSelected = false
        sortedArray.push(rightArray.shift())
        
      }
    }
    // console.log([...sortedArray, ...leftArray, ...rightArray])
    console.log("here")
    return [...sortedArray, ...leftArray, ...rightArray]

  }


  return (
    <div className="App">
      <h1>Sydney's Sorter</h1>
      <button onClick={generateRandom}>Generate Random</button>
      <br></br>
      <button onClick={startSort}>Simultaneous Sort</button>
      <button onClick={beginSelectionSort}>Selection Sort</button>
      <button onClick={beginBubbleSort}>Bubble Sort</button>
      <button onClick={beginMergeSort}>Merge Sort</button>
      <div className="big-div">
        <div className="sorter-div">
          <h3>Selection Sort</h3>
          <div id="selection-sort-div">
              {numsSelectArray.map((num, index) => <Divvy isSorted={num.isSorted} isSelected={num.isSelected} isDone={num.isDone} key={index} height={num.num} index={index} />)}
          </div>
        </div>
        <div className="sorter-div">
          <h3>Bubble Sort</h3>
          <div id="bubble-sort-div">
          {numsBubbleArray.map((num, index) => <Divvy isSorted={num.isSorted} isSelected={num.isSelected} isDone={num.isDone} key={index} height={num.num} index={index} />)}
          </div>
        </div>
        <div className="sorter-div">
          <h3>Merge Sort</h3>
          <div id="merge-sort-div">
          {numsMergeArray.map((num, index) => <Divvy isSorted={num.isSorted} isSelected={num.isSelected} isDone={num.isDone} key={index} height={num.num} index={index} />)}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
