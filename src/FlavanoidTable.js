import React from 'react'

const FlavanoidTable = ({ flavanoidData }) => {

    // Extract unique class values
    const classValues = [...new Set(flavanoidData.map(item => item.class))];
    
    // Create an object to store the data in the desired format
    const tableData = {};
    flavanoidData.forEach(item => {
        tableData[item.class] = {
            mean: item.mean,
            median: item.median,
            mode: item.mode,
        };
    });
    

    return (
        <div>
            <h4>Flavanoid Stats</h4>
            <table>
                <thead>
                    <tr>
                        <th>Measures</th>
                        {classValues.map(classValue => (
                            <th key={classValue}>Class {classValue}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Flavanoid Mean</td>
                        {classValues.map(classValue => (
                            <td key={classValue}>{tableData[classValue].mean}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Flavanoid Median</td>
                        {classValues.map(classValue => (
                            <td key={classValue}>{tableData[classValue].median}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Flavanoid Mode</td>
                        {classValues.map(classValue => (
                            <td key={classValue}>{tableData[classValue].mode}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default FlavanoidTable