import { useEffect, useState } from 'react';
import { WINE_DATA } from './data/windeData'
import FlavanoidTable from './FlavanoidTable';
import GammaTable from './GammaTable';

function App() {
  // console.log(WINE_DATA)
  const [flavanoidData, setFlavanoidData] = useState([])
  const [gammaData, setgammaData] = useState([])
  const [classValues, setClassValues] = useState([])
  const [tableData, setTableData] = useState({})
  useEffect(() => {
    prepareFlavanoidStats(WINE_DATA)
    prepareGammaStats(WINE_DATA)
  }, [])

  // Group data by alcohol class
  const groupByClass = (data, property) => {
    const classStats = {}
    data.forEach(item => {
      const alcoholClass = item.Alcohol
      if (!classStats[alcoholClass]) {
        classStats[alcoholClass] = []
      }
      if (property == 'Flavanoids') {
        classStats[alcoholClass].push(item.Flavanoids)
      } else {
        classStats[alcoholClass].push(item.Gamma)
      }
    })
    return classStats
  }

  // Calucate mean
  const calculateMean = (data) => {
    const mean = data.reduce((acc, val) => acc + val, 0) / data.length
    return mean
  }

  // Calculate median
  const calculateMedian = (data) => {
    data.sort((a, b) => a - b);
    const median = data.length % 2 === 0
      ? (data[data.length / 2 - 1] + data[data.length / 2]) / 2
      : data[Math.floor(data.length / 2)];
    return median
  }

  // Calculate mode
  const calculateMode = (data) => {
    const modeMap = {};
    let maxCount = 0;
    let mode = null;
    data.forEach(val => {
      if (!modeMap[val]) {
        modeMap[val] = 1;
      } else {
        modeMap[val]++;
      }
      if (modeMap[val] > maxCount) {
        maxCount = modeMap[val];
        mode = val;
      }
    });
    return mode
  }

  const prepareFlavanoidStats = (windeData) => {
    // Creating an object to store class-wise statistics
    const classStats = groupByClass(windeData, 'Flavanoids')
    const flavanoidArray = []

    // Calculate mean, median, and mode for each class
    for (const alcoholClass in classStats) {
      if (classStats.hasOwnProperty(alcoholClass)) {
        const values = classStats[alcoholClass];

        const mean = calculateMean(values)
        const median = calculateMedian(values)
        const mode = calculateMode(values)

        let obj = {
          class: alcoholClass,
          mean: parseFloat(mean).toFixed(3),
          median: parseFloat(median).toFixed(3),
          mode: parseFloat(mode).toFixed(3)
        }
        flavanoidArray.push(obj)
      }
    }
    setFlavanoidData(flavanoidArray)
  }

  const prepareGammaStats = (windeData) => {
    // Calculate "Gamma" for each data point and add it as a new property
    windeData.forEach(item => {
      item.Gamma = (item.Ash * item.Hue) / item.Magnesium;
    });

    // Create an object to store class-wise statistics
    const classStats = groupByClass(windeData, 'Gamma')
    const gammaArray = []

    // Calculate mean, median, and mode for "Gamma" within each class
    for (const alcoholClass in classStats) {
      if (classStats.hasOwnProperty(alcoholClass)) {
        const values = classStats[alcoholClass]

        const mean = calculateMean(values)
        const median = calculateMedian(values)
        const mode = calculateMode(values)

        let obj = {
          class: alcoholClass,
          mean: parseFloat(mean).toFixed(3),
          median: parseFloat(median).toFixed(3),
          mode: parseFloat(mode).toFixed(3)
        }
        gammaArray.push(obj)
      }
    }
    setgammaData(gammaArray)
  }

  return (
    <div className="App">
      <h1>Wine Stats</h1>
      <FlavanoidTable flavanoidData={flavanoidData}/>
      <GammaTable gammaData={gammaData}/>
    </div>
  );
}

export default App;
