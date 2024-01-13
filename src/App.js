import React from "react"
import Divvy from "./components/Divvy"



function App() {
  //have an array of objects with a num and some coloring boolean properties in state
  const [numsSelectArray, setnumsSelectArray] = React.useState([])
  const [numsBubbleArray, setnumsBubbleArray] = React.useState([])
  const [numsMergeArray, setnumsMergeArray] = React.useState([])
  
  //sleep func to slow down algos and show the divs being looked at
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  
  //generates the random height divs to be sorted and places them in object and then into the arrays in state
  function generateRandom(){
    const tempArray = []
    for (let i = 0; i < 6; i++){
      const tempNum = Math.floor(Math.random() * 100) + 1
      const newObj = {num: tempNum, isSelected: false, isSorted: false, isDone: false, index: i}
      tempArray.push(newObj)
    }
    //iniitalize the random 25 heights into state for each sort method
    setnumsSelectArray(JSON.parse(JSON.stringify(tempArray)))
    setnumsBubbleArray(JSON.parse(JSON.stringify(tempArray)))
    setnumsMergeArray(JSON.parse(JSON.stringify(tempArray)))
  }
  
  function startSort(){
    beginSelectionSort()
    beginBubbleSort()
    beginMergeSort()
  }

  
  async function beginSelectionSort(){
    //run selection sort algo and highlight the starting min val and then the querying through the 
    //rest of the vals to check for min, could highlight when finding a dif local min
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
        await sleep(50)
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
    //run bubble sort algo and highlight the two vals being compared as it bubbles up
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
        await sleep(50)
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
  }

  let copyMergeNums; 

  function beginMergeSort(){
    copyMergeNums = JSON.parse(JSON.stringify(numsMergeArray))
    const finalSorted = mergeSortHelper(copyMergeNums)
    // console.log("final numsMerge")
    // console.log(numsMergeArray)
    for (let i = 0; i < copyMergeNums.length; i++){
      copyMergeNums[i].isDone = true
      setnumsMergeArray([...copyMergeNums])
    }
    // setnumsMergeArray([...finalSorted])
    console.log(numsMergeArray)
  }

  function mergeSortHelper(array){
    if (array.length < 2){
      return array
    }
    const mid = Math.floor(array.length / 2)
    const leftSplit = mergeSortHelper(array.slice(0, mid))
    const rightSplit = mergeSortHelper(array.slice(mid))
    return mergerHelper(leftSplit, rightSplit)
  }

  function mergerHelper(leftArray, rightArray){
    const sortedArray = []
    //find the min index to know what index to is your start and then the sorted array each gets +1 as you loop through
    // const firstCombinedArray = [...leftArray, ...rightArray]
    while (leftArray.length && rightArray.length){
      
      if (leftArray[0].num <= rightArray[0].num){
        
        leftArray[0].isSelected = true
        // await sleep(250)
        leftArray[0].isSelected = false
        sortedArray.push(leftArray.shift())
        
      } else {
        rightArray[0].isSelected = true
        // await sleep(250)
        rightArray[0].isSelected = false
        sortedArray.push(rightArray.shift())
        
      }
    }
    // console.log("sorted array")
    // console.log(sortedArray)
    // console.log("left array")
    // console.log([...leftArray])
    // console.log("right array")
    // console.log([...rightArray])
    const combinedArray = [...sortedArray, ...leftArray, ...rightArray]
    console.log("combined array")
    console.log(combinedArray)
    //use min and max indices to generate list slices in order to update the state
    console.log("indices")
    var minIndex = combinedArray[0].index
    
    var maxIndex = combinedArray[0].index
    
    combinedArray.forEach((obj) => {
      var index = obj.index
      if (index > maxIndex){
        maxIndex = index
      }
      if (index < minIndex){
        minIndex = index
      }
    })
    console.log(minIndex)
    console.log(maxIndex)
    const lSlice = numsMergeArray.slice(0, minIndex)
    const rSlice = numsMergeArray.slice(maxIndex + 1)
    const updateArray = [...lSlice, ...combinedArray, ...rSlice]
    console.log(updateArray)
    setnumsMergeArray([...updateArray])
    console.log("numsMerge")
    console.log(numsMergeArray)
    // setnumsMergeArray(prevVal => {
    //   // console.log(prevVal)
    //   return [...lSlice, ...combinedArray, ...rSlice]
    // })
    

   
    // console.log("numsarray")
    // console.log(numsMergeArray)
    return combinedArray
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
